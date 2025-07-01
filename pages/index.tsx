import classNames from "classnames";
import {
  forwardRef,
  HTMLAttributes,
  memo,
  SVGAttributes,
  PropsWithChildren,
  ReactNode,
  JSXElementConstructor,
  useMemo,
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useRef,
  PointerEventHandler,
  useEffect,
} from "react";
import {
  BarChart3Icon,
  CalendarDaysIcon,
  HomeIcon,
  SettingsIcon,
  Undo2Icon,
  UsersIcon,
  WalletCardsIcon,
  DropletIcon,
  MenuIcon,
  ThermometerIcon,
  ActivityIcon,
  ChevronDownIcon,
  ChartPieIcon,
  StarIcon,
  UsersRoundIcon,
} from "lucide-react";
import { AnimatedProps, animated, useSpring, to } from "@react-spring/web";
import * as Redux from "@reduxjs/toolkit";
import * as ReactRedux from "react-redux";
import { DateTime, Duration } from "luxon";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import AvatarRyan from "@/src/assets/avatars/AvatarRyan";
import { Inter } from "next/font/google";

// ----- src/NavigationBarButton.tsx -----
interface INavigationBarButtonProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}
const NavigationBarButton = memo(
  forwardRef<HTMLDivElement, INavigationBarButtonProps>(
    function NavigationBarButton({ active = false, className, ...props }, ref) {
      return (
        <div
          ref={ref}
          className={classNames(
            {
              "bg-[#282828]": active,
            },
            "hover:bg-[#282828]",
            "rounded-lg",
            "h-12",
            "w-12",
            "cursor-pointer",
            "bg-[#080808]",
            "last:mr-0",
            "mr-2",
            // Align button icon in the middle
            "flex",
            "justify-center",
            "items-center",
            "last:xl:mb-0",
            "xl:mr-0",
            "xl:mb-2",
            className
          )}
          {...props}
        />
      );
    }
  )
);

// ----- src/Logo.tsx -----
function Logo({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  const pathClassNames = "fill-white dark:fill-gray-800";
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className)}
      fill="none"
      {...props}
    >
      <path
        d="M50 10
          A40 40 0 0 1 90 50
          L82 50
          A32 32 0 0 0 50 18
          Z"
        className={pathClassNames}
      />
      <path
        d="M90 50
          A40 40 0 0 1 50 90
          A40 40 0 0 1 10 50
          A40 40 0 0 1 50 10
          L50 18
          A32 32 0 0 0 18 50
          A32 32 0 0 0 50 82
          A32 32 0 0 0 82 50
          L90 50
          Z"
        className={pathClassNames}
      />

      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="34"
        fontFamily="Inter"
        fill="#9cc4f0"
        fontWeight="bold"
      >
        B
      </text>
    </svg>
  );
}

// ----- src/NavigationBar.tsx -----
const NavigationBar = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    function NavigationBar({ className, ...props }, ref) {
      const navItems = [
        { icon: <HomeIcon />, label: "Home" },
        { icon: <CalendarDaysIcon />, label: "Calendar" },
        { icon: <UsersIcon />, label: "Users" },
        { icon: <BarChart3Icon />, label: "Analytics" },
        { icon: <WalletCardsIcon />, label: "Wallet" },
        null,
        { icon: <SettingsIcon />, label: "Settings" },
        { icon: <Undo2Icon />, label: "Logout" },
      ];
      return (
        <div
          className={classNames(
            className,
            "p-4",
            "flex",
            "flex-row",
            "xl:flex-col",
            "bg-[#080808]",
            "text-white",
            "items-center"
          )}
          ref={ref}
          {...props}
        >
          <div className="xl:mb-6 mr-6 xl:mr-0">
            <Logo className="w-10 h-10" />
          </div>
          {navItems.map((item, index) =>
            item === null ? (
              <div key={index} className="flex-1" />
            ) : (
              <NavigationBarButton key={index}>{item.icon}</NavigationBarButton>
            )
          )}
        </div>
      );
    }
  )
);

// ----- src/Section.tsx -----
interface ISectionProps
  extends PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, "title">> {
  title: ReactNode;
}
function Section({ title, children, ...props }: ISectionProps) {
  return (
    <div className="flex flex-col gap-6" {...props}>
      <div className="text-2xl font-bold">{title}</div>
      {children}
    </div>
  );
}

// ----- src/core/Card.tsx -----
function Card({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={classNames(
        className,
        "rounded-[40px]",
        "bg-white",
        "dark:bg-gray-700",
        "p-6",
        "flex",
        "flex-col",
        "gap-4"
      )}
      {...props}
    />
  );
}
function CardTitle(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className="flex-row flex gap-4 text-lg items-center" {...props} />
  );
}
function CardBody(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className="flex flex-1 flex-col gap-4" {...props} />;
}
CardTitle.Icon = function CardTitleIcon(
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) {
  return (
    <div
      className={classNames(
        "rounded-2xl",
        "p-3",
        "bg-[#f2f2f2]",
        "text-[#737f94]",
        "dark:bg-gray-300"
      )}
      {...props}
    />
  );
};
Card.Title = CardTitle;
Card.Body = CardBody;

// ----- src/core/Carousel.tsx -----
interface ICarouselSlideProps
  extends AnimatedProps<HTMLAttributes<HTMLDivElement>> {
  active: boolean;
  index: number;
  current: number;
}
interface ICarouselSlide {
  // Receive a component
  children:
    | JSX.Element
    | null
    | ((props: Pick<ICarouselSlideProps, "current" | "index">) => JSX.Element);
}
interface ICarouselProps
  extends PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, "onChange">> {
  slides: ReadonlyArray<ICarouselSlide>;
  onChange(current: number): void;
  current: number;
  Parent: JSXElementConstructor<ICarouselSlideProps>;
}
const Carousel = memo(function Carousel({
  className,
  slides,
  current,
  Parent,
  onChange,
  ...props
}: ICarouselProps) {
  const reorderedSlides = useMemo(() => {
    const transformedSlides = slides.map((slide, index) => {
      return {
        key: index,
        active: index === current,
        index,
        current,
        slide,
      };
    });
    const nonActiveSlides = transformedSlides.filter(
      ({ index }) => index !== current
    );
    const leftSlides = nonActiveSlides.slice(0, 1);
    const rightSlides = nonActiveSlides.slice(1);
    const activeSlide =
      transformedSlides.find(({ index }) => index === current) ?? null;
    return [...leftSlides, activeSlide, ...rightSlides].map((slideInfo) => {
      if (slideInfo === null) {
        return null;
      }
      const { index, current, slide } = slideInfo;
      return (
        <Parent
          key={index}
          onClick={() => onChange(index)}
          active={index === current}
          index={index}
          current={current}
        >
          {typeof slide.children === "function"
            ? slide.children({ index, current })
            : slide.children}
        </Parent>
      );
    });
  }, [slides, onChange, Parent, current]);
  return (
    <div className={classNames(className)} {...props}>
      {reorderedSlides}
    </div>
  );
});

// ----- src/state/types.ts -----
interface IWaterConsumptionReport {
  id: string;
  // Date of the report
  date: Date;
  items: IWaterConsumptionReportItem[];
  // Temperature in Celsius
  temperature: number;
  // Pressure in Pascal
  pressure: number;
  // Water mineralization in ppm (parts per million)
  mineralization: number;
}
interface IAppConfiguration {
  temperature: {
    minimum: number;
    maximum: number;
  };
  mineralization: {
    minimum: number;
    maximum: number;
  };
  pressure: {
    minimum: number;
    maximum: number;
  };
}
interface IWaterConsumptionReportItem {
  locationId: string;
  // Consumption in milliliters
  consumption: number;
  // Kind of consumption
  kindId: string;
  // Endpoint
  endpointId: string;
}
interface IWaterConsumptionEndpoint {
  id: string;
  title: string;
  icon: "shower" | "dishes" | "faucet" | null;
}
// Water consumption kind: Drinking, cooking, bathing
interface IWaterConsumptionKind {
  id: string;
  title: string;
}
// Water consumption location: Home, office, swimming pool
interface IWaterConsumptionLocation {
  id: string;
  title: string;
}
interface IUser {
  firstName: string;
  lastName: string;
  avatarPictureUrl: string;
}

// ----- src/state/actions.ts -----
enum ActionType {
  SetConfiguration = "WaterConsumptionControlApplication/SetConfiguration",
  SetUser = "WaterConsumptionControlApplication/SetUser",
  SetWaterConsumptionKinds = "WaterConsumptionControlApplication/SetWaterConsumptionKinds",
  SetWaterConsumptionLocations = "WaterConsumptionControlApplication/SetWaterConsumptionLocations",
  SetWaterConsumptionReports = "WaterConsumptionControlApplication/SetWaterConsumptionReports",
  SetWaterConsumptionReport = "WaterConsumptionControlApplication/SetWaterConsumptionReport",
  SetWaterConsumptionEndpoints = "WaterConsumptionControlApplication/SetWaterConsumptionEndpoints",
}
interface ISetItemAction<ActionType extends string, Payload> {
  type: ActionType;
  payload: Readonly<Payload>;
}
type SetUserAction = ISetItemAction<ActionType.SetUser, IUser>;
type SetConfigurationAction = ISetItemAction<
  ActionType.SetConfiguration,
  IAppConfiguration
>;
type SetWaterConsumptionKindsAction = ISetItemAction<
  ActionType.SetWaterConsumptionKinds,
  ReadonlyArray<IWaterConsumptionKind>
>;
type SetWaterConsumptionLocationsAction = ISetItemAction<
  ActionType.SetWaterConsumptionLocations,
  ReadonlyArray<IWaterConsumptionLocation>
>;
type SetWaterConsumptionReportsAction = ISetItemAction<
  ActionType.SetWaterConsumptionReports,
  ReadonlyArray<IWaterConsumptionReport>
>;
type SetWaterConsumptionReportAction = ISetItemAction<
  ActionType.SetWaterConsumptionReport,
  IInputWaterConsumptionReport
>;
interface IInputWaterConsumptionReport
  extends Partial<Omit<IWaterConsumptionReport, "id">> {
  id: string;
}
type SetWaterConsumptionEndpointsAction = ISetItemAction<
  ActionType.SetWaterConsumptionEndpoints,
  ReadonlyArray<IWaterConsumptionEndpoint>
>;
type AppAction =
  | SetUserAction
  | SetConfigurationAction
  | SetWaterConsumptionEndpointsAction
  | SetWaterConsumptionReportAction
  | SetWaterConsumptionKindsAction
  | SetWaterConsumptionLocationsAction
  | SetWaterConsumptionReportsAction;

// ----- src/config.ts -----
const style = Object.seal(
  Object.freeze({
    colors: {
      green: "#ccf6f1",
      lightGray100: "#eff3f8",
      lightBlue100: "#e3eef3",
    },
  })
);
const defaultAppConfiguration: IAppConfiguration = Object.seal(
  Object.freeze({
    temperature: {
      maximum: 100,
      minimum: 20,
    },
    mineralization: {
      maximum: 100,
      minimum: 50,
    },
    pressure: {
      maximum: 80,
      minimum: 40,
    },
  })
);

// ----- src/core/dataTypes/map/createMap.ts -----
/**
 * Creates an immutable Map from an array of objects with `id` property.
 *
 * @param state - an array of objects with `id` property.
 * @returns an immutable Map with objects from `state` as values.
 * @example
 * const data = [
 *   { id: '1', name: 'John' },
 *   { id: '2', name: 'Jane' },
 * ];
 *
 * const map = createMap(data);
 * console.log(map.get('1').name); // John
 */
function createMap<
  T extends {
    [K2 in K]: string;
  },
  K extends keyof T = keyof T
>(state: ReadonlyArray<T>, key: K): ReadonlyMap<string, T> {
  return new Map<string, T>(state.map((item) => [item[key], item]));
}

// ----- src/core/dataTypes/map/mergeMaps.ts -----
/**
 * Merge two maps into a new map. The second map takes precedence over the
 * first map, so if there are any keys in common, the values from the second
 * map will be used in the resulting map.
 *
 * @param {ReadonlyMap<string, T>} dest The first map.
 * @param {ReadonlyMap<string, T>} src The second map.
 * @returns {ReadonlyMap<string, T>} A new map that is the result of merging
 * the two input maps.
 */
function mergeMaps<T>(
  dest: ReadonlyMap<string, T>,
  src: ReadonlyMap<string, T>
): ReadonlyMap<string, T> {
  return new Map([...Array.from(dest), ...Array.from(src)]);
}

// ----- src/state/index.ts -----
interface IAppState {
  configuration: IAppConfiguration;
  waterConsumptionReports: ReadonlyMap<string, IWaterConsumptionReport>;
  waterConsumptionKinds: ReadonlyMap<string, IWaterConsumptionKind>;
  waterConsumptionLocations: ReadonlyMap<string, IWaterConsumptionLocation>;
  waterConsumptionEndpoints: ReadonlyMap<string, IWaterConsumptionEndpoint>;
  user: IUser | null;
}
const useSelector = ReactRedux.useSelector.withTypes<IAppState>();
const useDispatch: () => (action: AppAction) => unknown =
  ReactRedux.useDispatch.withTypes<Redux.Dispatch<AppAction>>();
type ReducerMap<T> = {
  [K in keyof T]: (state: T[K] | undefined, action: AppAction) => T[K];
};
const reducer: ReducerMap<IAppState> = {
  configuration: (
    state: IAppConfiguration = defaultAppConfiguration,
    action: AppAction
  ) => {
    switch (action.type) {
      case ActionType.SetConfiguration:
        return action.payload;
    }
    return state;
  },
  user: (state: IUser | null = null, action: AppAction) => {
    switch (action.type) {
      case ActionType.SetUser:
        return action.payload;
    }
    return state;
  },
  waterConsumptionKinds: (
    state = new Map<string, IWaterConsumptionKind>(),
    action: AppAction
  ) => {
    if (action.type === ActionType.SetWaterConsumptionKinds) {
      return mergeMaps(state, createMap(action.payload, "id"));
    }
    return state;
  },
  waterConsumptionLocations: (
    state = new Map<string, IWaterConsumptionLocation>(),
    action: AppAction
  ): ReadonlyMap<string, IWaterConsumptionLocation> => {
    if (action.type === ActionType.SetWaterConsumptionLocations) {
      return mergeMaps(state, createMap(action.payload, "id"));
    }
    return state;
  },
  waterConsumptionReports: (
    state = new Map<string, IWaterConsumptionReport>(),
    action: AppAction
  ) => {
    switch (action.type) {
      case ActionType.SetWaterConsumptionReports:
        state = mergeMaps(state, createMap(action.payload, "id"));
        break;
      case ActionType.SetWaterConsumptionReport: {
        const report = state.get(action.payload.id) ?? null;
        if (report === null) {
          console.error(`Report ${action.payload.id} not found`);
          break;
        }
        state = mergeMaps(
          state,
          createMap([{ ...report, ...action.payload }], "id")
        );
        break;
      }
    }
    return state;
  },
  waterConsumptionEndpoints: (
    state = new Map<string, IWaterConsumptionEndpoint>(),
    action: AppAction
  ) => {
    if (action.type === ActionType.SetWaterConsumptionEndpoints) {
      return mergeMaps(state, createMap(action.payload, "id"));
    }
    return state;
  },
};
const Provider = ReactRedux.Provider;
function configureStore(): Redux.Store<IAppState, AppAction> {
  const waterConsumptionKinds = createMap(
    [
      { id: "drinking", title: "Drinking" },
      { id: "cooking", title: "Cooking" },
      { id: "bathing", title: "Bathing" },
    ],
    "id"
  );
  const waterConsumptionEndpoints = createMap<IWaterConsumptionEndpoint, "id">(
    [
      { id: "shower", title: "Shower", icon: "shower" },
      { id: "kitchen", title: "Kitchen", icon: "dishes" },
      { id: "faucet", title: "Faucet", icon: "faucet" },
    ],
    "id"
  );
  const waterConsumptionLocations = createMap(
    [
      { id: "home", title: "Home" },
      { id: "office", title: "Office" },
      { id: "pool", title: "Pool" },
    ],
    "id"
  );
  const generatedReports = new Array<IWaterConsumptionReport>();
  const preloadedState: IAppState = {
    configuration: defaultAppConfiguration,
    waterConsumptionEndpoints,
    waterConsumptionReports: createMap([...generatedReports], "id"),
    waterConsumptionKinds,
    waterConsumptionLocations,
    user: {
      firstName: "John",
      lastName: "Doe",
      avatarPictureUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  };
  return Redux.configureStore<IAppState, AppAction>({
    reducer,
    preloadedState,
    //Disable serialization to avoid issues with redux-persist
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

// ----- src/CardWaterConsumptionSelectorButton.tsx -----
function CardWaterConsumptionSelectorButton({
  onClick,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "flex",
        "rounded-2xl",
        "w-full",
        "items-center",
        "text-xl",
        "px-8",
        "bg-black",
        "hover:bg-gray-900",
        "text-white",
        "h-12",
        "justify-center",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "dark:bg-gray-900",
        "dark:hover:bg-gray-800",
        "dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
}

// ----- src/WaterConsumptionSelectorOption.tsx -----
const WaterConsumptionSelectorOption = memo(
  forwardRef<HTMLDivElement, ICarouselSlideProps>(
    function WaterConsumptionSelectorOption(
      { active, className, ...props },
      ref
    ) {
      return (
        <animated.div
          ref={ref}
          className={classNames(
            className,
            "p-5",
            {
              "flex-1": active,
              // If item is not active, leave the height unchanged
              "h-14": !active,
              flex: !active,
              "items-center": !active,
            },
            "xl:rounded-[30%]",
            "rounded-3xl",
            "bg-[#eff3f8]",
            "dark:bg-gray-800"
          )}
          {...props}
        />
      );
    }
  )
);

// ----- src/CardWaterConsumptionSelector.tsx -----
interface ICardUserWaterConsumptionSelectorProps
  extends HTMLAttributes<HTMLDivElement> {
  endpointId: string | null;
  onSelectEndpointId: Dispatch<SetStateAction<string | null>>;
}
function CardWaterConsumptionSelector({
  className,
  endpointId: selectedEndpointId,
  onSelectEndpointId,
  ...props
}: ICardUserWaterConsumptionSelectorProps) {
  const [slideItemIndex, setSlideItemIndex] = useState(0);
  const endpoints = useSelector(
    ({ waterConsumptionEndpoints }) => waterConsumptionEndpoints
  );
  const slides = useMemo(
    () =>
      Array.from(endpoints.values()).map((endpoint): ICarouselSlide => {
        let icon: JSX.Element | null;
        const iconClassNames = classNames("w-10");
        switch (endpoint.icon) {
          case "shower":
            icon = (
              <img
                src="https://i.postimg.cc/mkV05m8S/image.png"
                alt="Shower head"
                className={iconClassNames}
              />
            );
            break;
          case "dishes":
            icon = (
              <img
                src="https://i.postimg.cc/XvMDQMnb/image.png"
                alt="Dishes"
                className={iconClassNames}
              />
            );
            break;
          case "faucet":
            icon = (
              <img
                src="https://i.postimg.cc/jC0JBh2L/image.png"
                alt="Faucet"
                className={iconClassNames}
              />
            );
            break;
          default:
            icon = null;
        }
        const selectEndpoint = () => onSelectEndpointId(endpoint.id);
        return {
          children: ({ current, index }) => {
            return (
              <div className="flex flex-col gap-4 items-center">
                {icon}
                {current !== index ? null : (
                  <>
                    <div className="text-xl">{endpoint.title}</div>
                    <CardWaterConsumptionSelectorButton
                      disabled={selectedEndpointId === endpoint.id}
                      onClick={selectEndpoint}
                    >
                      {selectedEndpointId === endpoint.id
                        ? "Selected"
                        : "Select"}
                    </CardWaterConsumptionSelectorButton>
                  </>
                )}
              </div>
            );
          },
        };
      }),
    [endpoints, onSelectEndpointId, selectedEndpointId]
  );
  const slidesNavigator = useMemo(
    () => (
      <div className="flex flex-row w-full gap-2 justify-center">
        {slides.map((_, index) => (
          // Dots for navigating through the slides
          <div
            key={index}
            onClick={() => setSlideItemIndex(index)}
            className={classNames(
              "cursor-pointer",
              "w-2",
              "h-2",
              { "bg-gray-800": index === slideItemIndex },
              "hover:bg-gray-600",
              "rounded-full",
              "bg-gray-400",
              "dark:bg-gray-700"
            )}
          />
        ))}
      </div>
    ),
    [slides, setSlideItemIndex, slideItemIndex]
  );
  return (
    <Card className={className}>
      <div
        className={classNames(
          "flex-1",
          "flex",
          "justify-center",
          "flex-col",
          "gap-4"
        )}
        {...props}
      >
        <Carousel
          current={slideItemIndex}
          className={classNames(
            "flex",
            "flex-row",
            "gap-2",
            "w-full",
            "items-center"
          )}
          onChange={setSlideItemIndex}
          slides={slides}
          Parent={WaterConsumptionSelectorOption}
        />
        {slidesNavigator}
      </div>
    </Card>
  );
}

// ----- src/CardWelcomeUser.tsx -----
const CardWelcomeUser = memo(function CardWelcomeUser({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const currentUser = useSelector(({ user }) => user);
  if (currentUser === null) {
    return null;
  }
  return (
    <Card
      className={classNames(
        "mb-8",
        "overflow-hidden",
        "relative",
        "last:mb-8",
        className
      )}
      {...props}
    >
      <div
        className={classNames(
          "text-shadow-lg",
          "text-shadow-black",
          "z-20",
          "xl:text-shadow-none",
          "flex",
          "flex-col",
          "gap-2"
        )}
      >
        <div className="text-4xl">Hello, {currentUser.firstName}!</div>
        <div className="text-gray-500 dark:text-white">
          <div>Have a nice day.</div>
          <div>Saving the World by Saving Water!</div>
        </div>
      </div>
      <img
        className={classNames("right-0", "z-10", "top-0", "absolute", "h-full")}
        alt="Water drop avatar holding the world with in his hand with waves coming out of his feet."
        src="https://i.postimg.cc/CKmnfSxS/image.png"
      />
    </Card>
  );
});

// ----- src/WaterBottleIndicator.tsx -----
interface WaterBottleIndicatorProps extends SVGAttributes<SVGSVGElement> {
  percentage: number; // 0 to 100
}
function WaterBottleIndicator({
  percentage,
  ...props
}: WaterBottleIndicatorProps) {
  const clamped = useMemo(() => {
    return Number.isFinite(percentage)
      ? Math.max(0, Math.min(100, percentage))
      : 0;
  }, [percentage]);
  const { fillY, waveOffset } = useSpring({
    from: { fillY: 200, waveOffset: 0 },
    to: {
      fillY: 200 - (clamped / 100) * 200,
      waveOffset: 10,
    },
    config: { tension: 180, friction: 12 },
    reset: false,
  });
  const wavePath = useCallback((y: number, offset: number) => {
    const amplitude = 6;
    const wavelength = 40;
    const control = (x: number) =>
      `${x},${y + Math.sin((x + offset) / wavelength) * amplitude}`;
    const segments: string[] = [];
    for (let x = 0; x <= 150; x += 10) {
      segments.push(control(x));
    }
    return `M0,200 V${y} L ${segments.join(" L ")} V200 Z`;
  }, []);
  return (
    <svg viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Droplet Shape */}
      <path
        d="M75 0C40 50 10 90 10 130C10 170 40 200 75 200C110 200 140 170 140 130C140 90 110 50 75 0Z"
        fill="#F9FCFF"
      />

      <defs>
        <clipPath id="droplet-clip">
          <path d="M75 0C40 50 10 90 10 130C10 170 40 200 75 200C110 200 140 170 140 130C140 90 110 50 75 0Z" />
        </clipPath>
      </defs>

      {/* Animated water fill */}
      <g clipPath="url(#droplet-clip)">
        <animated.path d={to([fillY, waveOffset], wavePath)} fill="#90CAF9" />
      </g>

      {/* Face */}
      <circle cx="50" cy="95" r="5" fill="#FBCFD4" />
      <circle cx="100" cy="95" r="5" fill="#FBCFD4" />
      <circle cx="60" cy="90" r="2" fill="#1A1A1A" />
      <circle cx="90" cy="90" r="2" fill="#1A1A1A" />
      <path
        d="M63 98 Q75 108 87 98"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ----- src/selectors/filterWaterConsumptionReportByDateRange.ts -----
function filterWaterConsumptionReportByDateRange(
  state: Pick<IAppState, "waterConsumptionReports">,
  startDate: DateTime,
  endDate: DateTime
) {
  return Array.from(state.waterConsumptionReports.values()).filter((report) => {
    const reportDate = DateTime.fromJSDate(report.date);
    return (
      reportDate.toMillis() >= startDate.toMillis() &&
      reportDate.toMillis() <= endDate.toMillis()
    );
  });
}

// ----- src/selectors/calculateAverageFromReportList.ts -----
function calculateAverageFromReportList(
  reports:
    | ReadonlyArray<IWaterConsumptionReport>
    | ReadonlyMap<string, IWaterConsumptionReport>
): number {
  return Array.from(reports.values()).reduce<number>(
    (acc, report) =>
      acc +
      report.items.reduce((acc, item) => acc + item.consumption, 0) /
        ("size" in reports ? reports.size : reports.length),
    0
  );
}

// ----- src/millilitersToLiters.ts -----
function millilitersToLiters(milliliters: number) {
  return milliliters / 1000;
}

// ----- src/core/math/clamp.ts -----
/**
 * Clamps a number between a minimum and maximum value.
 *
 * @example
 * clamp(10, 5, 15) // 10
 * clamp(20, 5, 15) // 15
 * clamp(3, 5, 15) // 5
 *
 * @param value - Value to be clamped.
 * @param min - Minimum value.
 * @param max - Maximum value.
 * @returns The clamped value.
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// ----- src/CardUserWaterConsumption.tsx -----
interface ICardUserWaterConsumptionProps
  extends HTMLAttributes<HTMLDivElement> {
  endpointId: string | null;
}
function CardUserWaterConsumption({
  endpointId,
  className,
  ...props
}: ICardUserWaterConsumptionProps) {
  const reports = useSelector((state) => state.waterConsumptionReports);
  const todayReports = useMemo(
    () =>
      filterWaterConsumptionReportByDateRange(
        { waterConsumptionReports: reports },
        DateTime.now().startOf("day"),
        DateTime.now().endOf("day")
      ).map((report) => ({
        ...report,
        items: report.items.filter((i) => {
          if (endpointId === null) {
            return true;
          }
          return i.endpointId === endpointId;
        }),
      })),
    [reports, endpointId]
  );
  const totalConsumption = useMemo(
    () =>
      todayReports.reduce(
        (total, report) =>
          total + report.items.reduce((sum, item) => sum + item.consumption, 0),
        0
      ),
    [todayReports]
  );
  const averageConsumption = useMemo(
    () => calculateAverageFromReportList(todayReports),
    [todayReports]
  );
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <DropletIcon />
        </Card.Title.Icon>
        Your water consumption
      </Card.Title>
      <Card.Body className={classNames("flex", "xl:flex-row", "flex-col")}>
        <div className={classNames("flex", "gap-4", "flex-col", "flex-1")}>
          <div className="flex flex-col gap-1">
            <div className="text-gray-400">Today</div>
            {Math.ceil(millilitersToLiters(totalConsumption))} liters
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-gray-400">This month</div>
            {((averageConsumption * 30) / 1000000).toFixed(2)} m³
          </div>
        </div>
        <div>
          <WaterBottleIndicator
            className="w-40"
            percentage={
              // Water consumption percentage based on average consumption
              clamp((totalConsumption / averageConsumption) * 100, 0, 100)
            }
          />
        </div>
      </Card.Body>
    </Card>
  );
}

// ----- src/core/hooks/useDebounce.ts -----
function useDebounce<T extends unknown[]>(
  fn: (...args: T) => void,
  ms: number
): (...args: T) => void {
  const timerId = useRef<number | null>(null);
  return useCallback<(...args: T) => void>(
    (...args) => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }
      timerId.current = window.setTimeout(fn, ms, ...args);
    },
    [fn, ms]
  );
}

// ----- src/InputRange.tsx -----
interface IInputRangeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
  value: number;
  steps?: number;
  onChange(value: number): void;
  min?: number;
  max?: number;
}
interface IVector2D {
  x: number;
  y: number;
}
interface IDraggingState {
  screenX: number;
  screenY: number;
  delta: IVector2D | null;
}
const InputRange = memo(function InputRange({
  className,
  onChange,
  value,
  min = 0,
  max = 100,
  steps = 1,
  ...props
}: IInputRangeProps) {
  const draggingStateRef = useRef<IDraggingState | null>(null);
  const [internalValue, setInternalValue] = useState(value);
  const progressIndicatorStyle = useMemo(
    () => ({
      height: `${(internalValue / max) * 100}%`,
      backgroundColor: style.colors.green,
    }),
    [internalValue, max]
  );
  const onStartDrag = useCallback<PointerEventHandler<HTMLDivElement>>((e) => {
    if (draggingStateRef.current !== null) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    draggingStateRef.current = {
      screenX: e.screenX,
      screenY: e.screenY,
      delta: null,
    };
  }, []);
  const onDrag = useCallback<PointerEventHandler<HTMLDivElement>>(
    (e) => {
      const oldDraggingState = draggingStateRef.current;
      if (oldDraggingState === null) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const { screenY, screenX } = e;
      const newDraggingState = {
        ...oldDraggingState,
        screenX: screenX,
        screenY: screenY,
        delta: {
          x: oldDraggingState.screenX - screenX,
          y: oldDraggingState.screenY - screenY,
        },
      };
      // Update dragging state
      draggingStateRef.current = newDraggingState;
      const delta = newDraggingState.delta.y * steps;
      setInternalValue((oldInternalValue) =>
        clamp(oldInternalValue + delta, min, max)
      );
    },
    [setInternalValue, steps, max, min]
  );
  const updateParent = useCallback(
    (value: number) => {
      onChange(value);
    },
    [onChange]
  );
  const debounceParentUpdate = useDebounce(updateParent, 0);
  const onEndDrag = useCallback<PointerEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      draggingStateRef.current = null;
      debounceParentUpdate(internalValue);
    },
    [debounceParentUpdate, internalValue]
  );
  const debounceUpdateInternalValue = useDebounce(setInternalValue, 0);
  useEffect(() => {
    debounceUpdateInternalValue(value);
  }, [debounceUpdateInternalValue, value]);
  return (
    <div
      className={classNames(
        "rounded-full",
        "h-[16rem]",
        "w-16",
        "flex",
        "flex-col",
        "justify-end",
        "overflow-hidden",
        // "xl:h-full",
        "xl:w-16",
        "bg-[#eff3f8]",
        "dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div
        style={progressIndicatorStyle}
        className={classNames(
          "w-auto",
          "flex",
          "flex-col",
          "xl:w-full",
          "items-center",
          "rounded-full",
          "p-4",
          `bg-[${style.colors.green}]`
        )}
      >
        <div
          onPointerDown={onStartDrag}
          onPointerMove={onDrag}
          onPointerUp={onEndDrag}
          onPointerCancel={onEndDrag}
          onPointerLeave={onEndDrag}
          className={classNames(
            "p-2",
            "bg-gray-100",
            "dark:bg-gray-600",
            "bg-opacity-70",
            "rounded-md",
            "cursor-pointer"
          )}
        >
          <MenuIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
});

// ----- src/selectors/selectTodayLatestWaterConsumptionReport.ts -----
/**
 * Select the latest water consumption report for today.
 *
 * @param state - The application state
 * @returns The latest water consumption report for today, or null if there are no reports for today
 */
function selectTodayLatestWaterConsumptionReport(
  state: IAppState
): IWaterConsumptionReport | null {
  const todayReports = filterWaterConsumptionReportByDateRange(
    state,
    DateTime.now().startOf("day"),
    DateTime.now().endOf("day")
  );
  return todayReports.reduce<IWaterConsumptionReport | null>(
    (latestReport, report) =>
      latestReport === null ||
      report.date.getTime() > latestReport.date.getTime()
        ? report
        : latestReport,
    null
  );
}

// ----- src/CardTemperature.tsx -----
function CardTemperature({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const report = useSelector(selectTodayLatestWaterConsumptionReport);
  const dispatch = useDispatch();
  const temperature = useSelector(
    ({ configuration: { temperature } }) => temperature
  );
  const onChangeTemperature = useCallback(
    (newTemperature: number) => {
      if (report === null) {
        return;
      }
      dispatch({
        type: ActionType.SetWaterConsumptionReport,
        payload: {
          id: report.id,
          temperature: newTemperature,
        },
      });
    },
    [report, dispatch]
  );
  if (report === null) {
    return null;
  }
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <ThermometerIcon />
        </Card.Title.Icon>
        Temperature
      </Card.Title>
      <Card.Body>
        <div className="flex-1 flex flex-row">
          <div className="flex-1 text-lg flex items-end">
            {report.temperature.toFixed(1)} °C
          </div>
          <InputRange
            value={report.temperature}
            min={temperature.minimum}
            max={temperature.maximum}
            onChange={onChangeTemperature}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

// ----- src/CardPressure.tsx -----
function CardPressure({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const report = useSelector(selectTodayLatestWaterConsumptionReport);
  const dispatch = useDispatch();
  const pressure = useSelector(({ configuration: { pressure } }) => pressure);
  const onChangePressure = useCallback(
    (newPressure: number) => {
      if (report === null) {
        return;
      }
      dispatch({
        type: ActionType.SetWaterConsumptionReport,
        payload: {
          id: report.id,
          pressure: newPressure,
        },
      });
    },
    [report, dispatch]
  );
  if (report === null) {
    return null;
  }
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <ActivityIcon />
        </Card.Title.Icon>
        Pressure
      </Card.Title>
      <Card.Body>
        <div className="flex-1 flex flex-row">
          <div className="flex-1 text-lg flex items-end">
            {report.pressure.toFixed(1)} psi
          </div>
          <InputRange
            value={report.pressure}
            min={pressure.minimum}
            max={pressure.maximum}
            onChange={onChangePressure}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

// ----- src/core/modules/dropdown/Dropdown.tsx -----
interface DropdownProps {
  label: string;
  children: ReactNode;
}
function Dropdown({ label, children }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={classNames(
            "bg-[#f2f4f5]",
            "dark:bg-gray-800",
            "p-2",
            "gap-2",
            "flex",
            "text-sm",
            "flex-row",
            "outline-none",
            "rounded-full",
            "items-center"
          )}
        >
          <div className="flex-1">{label}</div>
          <div
            className={classNames(
              "p-1",
              "rounded-lg",
              "border-2",
              "border-[#777f93]",
              "text-[#777f93]"
            )}
          >
            <ChevronDownIcon className="w-3 h-3" />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className={classNames(
            "min-w-[10rem] bg-white border border-gray-200",
            "rounded-md shadow-md p-1 z-50"
          )}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

// ----- src/VerticalBarIndicator.tsx -----
interface IVerticalBarIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  variant: "primary" | "secondary";
  value: number;
}
function VerticalBarIndicator({
  className,
  value,
  variant,
  ...props
}: IVerticalBarIndicatorProps) {
  const style = useSpring({
    from: {
      height: "0%",
    },
    to: {
      height: `${value}%`,
    },
  });
  return (
    <div
      {...props}
      className={classNames(className, "flex", "items-end", "rounded-xl")}
    >
      <animated.div
        className={classNames(className, "rounded-xl", {
          [`bg-[#cbf6f3]`]: variant === "primary",
          [`bg-[#89b8f4]`]: variant === "secondary",
        })}
        style={style}
      />
    </div>
  );
}

// ----- src/selectors/index.ts -----
enum TimeRange {
  Day,
  Week,
  Month,
  Year,
}

// ----- src/selectors/filterReportsByDateRange.ts -----
function filterReportsByDateRange(
  reports: IWaterConsumptionReport[],
  range: TimeRange,
  startPoint: DateTime
): IWaterConsumptionReport[] {
  let start: DateTime;
  let end: DateTime;
  switch (range) {
    case TimeRange.Day:
      start = startPoint.startOf("day");
      end = startPoint.endOf("day");
      break;
    case TimeRange.Week:
      start = startPoint.startOf("week");
      end = startPoint.endOf("week");
      break;
    case TimeRange.Month:
      start = startPoint.startOf("month");
      end = startPoint.endOf("month");
      break;
    case TimeRange.Year:
      start = startPoint.startOf("year");
      end = startPoint.endOf("year");
      break;
  }
  return reports.filter((report) => {
    const dt = DateTime.fromJSDate(report.date);
    return dt >= start && dt <= end;
  });
}

// ----- src/timeRangeLabel.ts -----
function timeRangeLabel(timeRange: TimeRange) {
  let label: string;
  switch (timeRange) {
    case TimeRange.Week:
      label = "Week";
      break;
    case TimeRange.Month:
      label = "Month";
      break;
    case TimeRange.Year:
      label = "Year";
      break;
    case TimeRange.Day:
      label = "Day";
      break;
  }
  return label;
}

// ----- src/CardStatistics.tsx -----
function CardStatistics({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const reports = useSelector((state) => state.waterConsumptionReports);
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Week);
  const filteredReports = useMemo(
    () =>
      filterReportsByDateRange(
        Array.from(reports.values()),
        timeRange,
        DateTime.now()
      ),
    [reports, timeRange]
  );
  const averageConsumption = useMemo(
    () => calculateAverageFromReportList(filteredReports),
    [filteredReports]
  );
  const dropdown = useMemo(() => {
    const label = timeRangeLabel(timeRange);
    return (
      <Dropdown label={label}>
        {[TimeRange.Week, TimeRange.Month, TimeRange.Year, TimeRange.Day].map(
          (range) => (
            <DropdownMenu.Item
              key={range}
              className={classNames(
                "px-4",
                "py-2",
                "text-sm",
                "text-gray-700",
                "hover:bg-gray-100",
                "cursor-pointer",
                "rounded-md",
                "outline-none"
              )}
              onClick={() => setTimeRange(range)}
            >
              {timeRangeLabel(range)}
            </DropdownMenu.Item>
          )
        )}
      </Dropdown>
    );
  }, [timeRange]);
  const verticalIndicators = useMemo((): ReadonlyArray<number> => {
    const startTime = DateTime.now().startOf("day");
    let endTime: DateTime;
    switch (timeRange) {
      case TimeRange.Day:
        endTime = startTime.endOf("day");
        break;
      case TimeRange.Week:
        endTime = startTime.endOf("week");
        break;
      case TimeRange.Month:
        endTime = startTime.endOf("month");
        break;
      case TimeRange.Year:
        endTime = startTime.endOf("year");
        break;
    }
    const list = filterWaterConsumptionReportByDateRange(
      { waterConsumptionReports: reports },
      startTime,
      endTime
    );
    return list.slice(0, 7).map((report) => {
      const itemsAverage =
        report.items.reduce((sum, item) => sum + item.consumption, 0) /
        report.items.length;
      return itemsAverage / averageConsumption;
    });
  }, [timeRange, reports, averageConsumption]);
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <ChartPieIcon />
        </Card.Title.Icon>
        <div className="flex-1">Statistics</div>
        <div>{dropdown}</div>
      </Card.Title>
      <Card.Body className="flex xl:flex-row gap-4 flex-col">
        <div className="flex flex-[30px] flex-col gap-1">
          <div className="text-gray-500">Average</div>
          <div>{millilitersToLiters(averageConsumption).toFixed(2)} liters</div>
        </div>
        <div className="flex flex-1 flex-col xl:flex-row gap-2">
          {verticalIndicators.map((indicator, index) => (
            <VerticalBarIndicator
              key={index}
              variant={index % 2 ? "primary" : "secondary"}
              value={indicator * 100}
              className="flex-1 h-full"
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

// ----- src/RangeHorizontalIndicator.tsx -----
interface IRangeHorizontalIndicatorProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  min: number;
  max: number;
  value: number;
}
function RangeHorizontalIndicator({
  className,
  value,
  children,
  min,
  max,
  ...props
}: IRangeHorizontalIndicatorProps) {
  const safeRange = useMemo(() => {
    const range = max - min;
    return range === 0 ? 1 : range;
  }, [min, max]);
  const clampedValue = useMemo(() => {
    if (!Number.isFinite(value)) return min;
    return clamp(value, min, max);
  }, [value, min, max]);
  const percentage = useMemo(() => {
    return ((clampedValue - min) / safeRange) * 100;
  }, [clampedValue, min, safeRange]);
  const style = useSpring({
    to: { width: `${percentage}%` },
    from: { width: "0%" },
    config: { tension: 170, friction: 26 },
  });
  return (
    <div
      className={classNames(
        "bg-[#f2f4f5]",
        "rounded-2xl",
        "h-10",
        "overflow-hidden",
        "dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <animated.div
        className={classNames(
          "h-full",
          "flex",
          "pl-4",
          "rounded-2xl",
          "bg-[#ccf6f1]",
          "dark:bg-gray-600",
          "transition-all",
          "min-width-[1rem]"
        )}
        style={style}
      >
        {children}
      </animated.div>
    </div>
  );
}

// ----- src/CardWaterMineralization.tsx -----
function CardWaterMineralization({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const mineralizationRange = useSelector(
    ({ configuration }) => configuration.mineralization
  );
  const report = useSelector(selectTodayLatestWaterConsumptionReport);
  if (report === null) {
    return null;
  }
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <StarIcon />
        </Card.Title.Icon>
        Water Mineralization
      </Card.Title>
      <Card.Body>
        <RangeHorizontalIndicator
          min={mineralizationRange.minimum}
          max={mineralizationRange.maximum}
          value={report.mineralization}
        >
          <div className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-white">
            <span>{report.mineralization} ppm</span>
          </div>
        </RangeHorizontalIndicator>
      </Card.Body>
    </Card>
  );
}

// ----- src/core/hooks/useTimeout.ts -----
type TimeoutHookScheduleCallback<T extends unknown[]> = (
  fn: (...args: T) => void,
  ...args: T
) => void;
type TimeoutHookTimerCallback<T extends unknown[]> = (...args: T) => void;
type TimeoutHook<T extends unknown[]> = [
  TimeoutHookScheduleCallback<T>,
  (begin?: number, end?: number) => void
];
interface ITimeoutHookOptions {
  concurrency: number | null;
}
function useTimeout<T extends unknown[]>(
  ms: number,
  { concurrency = null }: Partial<ITimeoutHookOptions> = {}
): TimeoutHook<T> {
  const milliseconds = useMemo(() => clamp(ms, 100, Infinity), [ms]);
  const timerIds = useRef(new Set<NodeJS.Timeout | number>());
  const clear = useCallback((begin = 0, end = timerIds.current.size) => {
    const ids = Array.from(timerIds.current).slice(begin, end);
    for (const id of ids) {
      clearTimeout(id);
      timerIds.current.delete(id);
    }
  }, []);
  const schedule = useCallback(
    (fn: TimeoutHookTimerCallback<T>, ...args: T) => {
      if (concurrency !== null) {
        const overlapCount = timerIds.current.size - concurrency;
        if (overlapCount > 0) {
          clear(0, overlapCount);
        }
      }
      timerIds.current.add(setTimeout<T>(fn, milliseconds, ...args));
    },
    [milliseconds, clear, concurrency]
  );
  useEffect(() => {
    return () => clear();
  }, [clear]);
  return [schedule, clear];
}

// ----- src/core/hooks/useInterval.ts -----
function useInterval(fn: () => void, ms: number) {
  const [schedule, clear] = useTimeout(ms, {
    concurrency: 1,
  });
  const repeat = useCallback(() => {
    fn();
    schedule(repeat);
  }, [schedule, fn]);
  useEffect(() => {
    repeat();
    return () => clear();
  }, [repeat, clear]);
  return [repeat, clear];
}

// ----- src/modules/sideBar/components/UserProfileInformation.tsx -----
function UserProfileInformation({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const user = useSelector((state) => state.user);
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());
  const formatCurrentTime = useCallback(() => {
    setCurrentTime(() => DateTime.now());
  }, [setCurrentTime]);
  useInterval(formatCurrentTime, 1000 / 2);
  if (user === null) {
    return null;
  }
  return (
    <div
      className={classNames(className, "flex", "flex-row", "gap-4")}
      {...props}
    >
      <div
        className={classNames(
          "w-16",
          "h-16",
          "overflow-hidden",
          "rounded-xl",
          "bg-[#f5f8f7]",
          "dark:bg-gray-600"
        )}
      >
        {/* <AvatarRyan className="w-16 h-16" /> */}
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="text-md">
          {user.firstName} {user.lastName}
        </div>
        <div className="flex flex-row gap-2 text-sm">
          <div>{currentTime.toLocaleString(DateTime.TIME_SIMPLE)}</div>
          <div className="text-gray-500">
            {currentTime.toLocaleString(DateTime.DATE_MED)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- src/assets/avatars/AvatarOliver.tsx -----
function AvatarOliver({ className, ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#836055"
          d="M46.07 40.4c.47 7.5.94 15-11.07 15.56v9.91S31.36 68 26.5 68 18 64.52 18 64.52V45.1c-.2-1.02-.33-2.06-.41-3.12a5 5 0 0 1-.9-9.8C15.37 22.63 17.52 13 32 13c14.59 0 14.24 11.08 13.96 19.81-.04 1.15-.07 2.25-.07 3.29 0 1.4.09 2.86.18 4.3"
        ></path>
        <path
          fill="#000"
          fillOpacity="0.07"
          d="M17.59 41.98c-.16-1.97-.16-3.97-.16-5.88a47 47 0 0 1-.73-3.93 5 5 0 0 0 .89 9.81M18 45.1v19.42S21.64 68 26.5 68s8.5-2.13 8.5-2.13v-9.91q-.72.03-1.5.03c-10.79 0-14.34-4.95-15.5-10.9Z"
        ></path>
        <path
          fill="#000"
          fillOpacity="0.07"
          d="M34.93 55.96c-.46.02-.93.03-1.43.03-7.25 0-11.23-2.23-13.41-5.5.5 4.82 3.16 8.5 8.3 8.5h1.36c3.8.03 4.92.04 5.18-3.03"
        ></path>
        <rect
          width="3"
          height="2"
          x="36"
          y="41"
          fill="#000"
          fillOpacity="0.07"
          rx="1"
        ></rect>
        <rect width="40" height="23" x="7" y="60" fill="#ff4dd8" rx="9"></rect>
        <path
          fill="#1b0b47"
          d="M20.67 28.22v6.02c0 .76-.67 1.76-1.17 2.26s-2 1.5-2.85 1.5-3.54-.45-4.83-2.26c-1.28-1.8-.89-11.32 0-13.54.9-2.21 4.19-6.88 8.85-10.45a26.26 26.26 0 0 1 12.88-5.34C58.48 3.4 49.22 20.99 46 25.5c-5.5-2-9.5-2.5-16.72-1.53-7.21.99-8.01 1.99-8.6 4.24Z"
        ></path>
        <path
          fill="#66253C"
          d="M28.93 46a1 1 0 0 1 1-1h9.14a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-1.14a5 5 0 0 1-5-5"
        ></path>
        <path
          fill="#B03E67"
          d="M36.76 50.7a5 5 0 0 1-1.69.3h-1.14a5 5 0 0 1-5-4.8c.77-.29 1.9-.25 3.02-.22L33 46c2.21 0 4 1.57 4 3.5 0 .42-.09.83-.24 1.2"
        ></path>
        <path
          fill="#fff"
          d="M30 45h10v1a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1z"
        ></path>
        <g fill="#1b0b47" transform="translate(0 -1)">
          <rect width="3" height="4" x="30" y="36" rx="1.5"></rect>
          <rect width="3" height="4" x="40" y="36" rx="1.5"></rect>
        </g>
      </g>
    </svg>
  );
}

// ----- src/assets/avatars/AvatarSophia.tsx -----
function AvatarSophia({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#eeb4a4"
          d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
        ></path>
        <mask
          id="personas-a"
          width="36"
          height="44"
          x="14"
          y="13"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path
            fill="#fff"
            d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
          ></path>
        </mask>
        <g mask="url(#personas-a)">
          <path
            fill="#fff"
            d="M32 13a14 14 0 0 1 14 14v6a14 14 0 1 1-28 0v-6a14 14 0 0 1 14-14"
            opacity="0.36"
            style={{ mixBlendMode: "overlay" }}
          ></path>
        </g>
        <path
          fill="#1B0640"
          d="M24 28.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0m17.24-.6a.75.75 0 0 0-.83-.64l-4 .5a.75.75 0 0 0 .18 1.48l4-.5c.41-.05.7-.42.65-.83Z"
        ></path>
        <path
          fill="#362c47"
          d="m17.79 27.56-.71-6.6A9 9 0 0 1 26.03 11H43a9.2 9.2 0 0 1-.74 3.63 7.93 7.93 0 0 1 4.6 8.35L46 29v4.22a14 14 0 0 1-.48 3.42l-2.52.54A1 1 0 0 1 41.8 36l1.9-9.12c-1.57-2.09-2.68-5.24-3.31-9.44a9.24 9.24 0 0 1-5.7 2.77c-1.82.2-3.39.29-4.7.29-3 0-5.67-.5-8-1.5 0 2.6-.67 5.1-2 7.52L21.98 36a1 1 0 0 1-1.2 1.18l-2.51-.54a14 14 0 0 1-.48-3.42z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M19.98 34 18 24.52c1.33-2.42 2-4.93 2-7.52 2.33 1 5 1.5 8 1.5 1.31 0 2.88-.1 4.7-.29A9.24 9.24 0 0 0 41 9H24.03a9 9 0 0 0-8.95 9.97l.7 6.59v5.66a14 14 0 0 0 .49 3.42l2.52.54A1 1 0 0 0 19.98 34M44 31.22V27l.86-6.02.02-.14a7.91 7.91 0 0 0-2.42-6.73 9.3 9.3 0 0 1-3.45 4.5 17.2 17.2 0 0 0 2.7 6.27L39.8 34a1 1 0 0 0 1.2 1.18l2.52-.54a14 14 0 0 0 .48-3.42"
          clipRule="evenodd"
          opacity="0.26"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(2 2)"
        ></path>
        <path
          fill="#e24553"
          d="M27 51v.47a5 5 0 1 0 10 0V51c7.06 1.52 12.93 6.74 16 13H11c3.07-6.26 8.94-11.48 16-13"
        ></path>
        <ellipse
          cx="9"
          cy="5"
          fill="#1B0640"
          rx="2"
          ry="2.5"
          transform="translate(23 36)"
        ></ellipse>
        <path
          fill="#000"
          d="M5.29 6.24a.75.75 0 1 1 1.42-.48c.23.7.62 1 1.3 1 .66 0 1.05-.3 1.28-1a.75.75 0 1 1 1.42.48c-.42 1.3-1.37 2.01-2.7 2.01S5.72 7.54 5.3 6.24Z"
          opacity="0.36"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(24 28)"
        ></path>
      </g>
    </svg>
  );
}

// ----- src/assets/avatars/AvatarDestiny.tsx -----
function AvatarDestiny({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#eeb4a4"
          d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
        ></path>
        <mask
          id="personas-a"
          width="36"
          height="44"
          x="14"
          y="13"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path
            fill="#fff"
            d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
          ></path>
        </mask>
        <g mask="url(#personas-a)">
          <path
            fill="#fff"
            d="M32 13a14 14 0 0 1 14 14v6a14 14 0 1 1-28 0v-6a14 14 0 0 1 14-14"
            opacity="0.36"
            style={{ mixBlendMode: "overlay" }}
          ></path>
        </g>
        <path
          fill="#1B0640"
          fillRule="evenodd"
          d="M24 28.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0m13 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0"
          clipRule="evenodd"
        ></path>
        <path
          fill="#6c4545"
          fillRule="evenodd"
          d="M46 28c-2.18-2.42-3.65-5.54-4.42-9.36a19.6 19.6 0 0 1-9.08 7.86c-4.67 2-9.5 2.33-14.5 1v.53c-.73.08-1.42.34-2 .73V27.5C16 18.39 23.16 11 32 11s16 7.39 16 16.5v1.26a4.5 4.5 0 0 0-2-.73zm-9 21.31v-3.23A14.04 14.04 0 0 0 45.42 37h.08c.93 0 1.78-.28 2.5-.76V47a38.7 38.7 0 0 1-11 2.31M16 47a38.7 38.7 0 0 0 11 2.31v-3.23A14.04 14.04 0 0 1 18.58 37h-.08c-.93 0-1.79-.28-2.5-.76z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#fff"
          d="M30 9c-8.84 0-16 7.39-16 16.5v1.26c.58-.4 1.27-.65 2-.73v-.53c5 1.33 9.83 1 14.5-1a19.6 19.6 0 0 0 9.08-7.86c.77 3.82 2.24 6.94 4.42 9.36v.03c.73.08 1.42.34 2 .73V25.5C46 16.39 38.84 9 30 9"
          opacity="0.26"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(2 2)"
        ></path>
        <path
          fill="#e24553"
          d="M27 49v3a5 5 0 0 0 10 0v-3l6.65 2.05a9 9 0 0 1 6.35 8.6V64H14v-4.35a9 9 0 0 1 6.35-8.6z"
        ></path>
        <path
          fill="#000"
          d="m11 6.54-1.65.5A9 9 0 0 0 7 8.17V20h4zM15 20h4v-5.29a7.02 7.02 0 0 1-4-3.1zm8 0h4v-8.4a7.02 7.02 0 0 1-4 3.11v5.3Zm8 0h4V8.16a9 9 0 0 0-2.35-1.12L31 6.55z"
          opacity="0.4"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(11 44)"
        ></path>
        <path
          fill="#fff"
          d="M3.4 13a9 9 0 0 1 2.53-4h8.14a6.98 6.98 0 0 0 2.03 4zM39 17v3H3v-3zm-2.93-8a9 9 0 0 1 2.53 4H25.9a6.98 6.98 0 0 0 2.03-4z"
          opacity="0.17"
          style={{ mixBlendMode: "lighten" }}
          transform="translate(11 44)"
        ></path>
        <path fill="#DC5C7A" d="M28 41h8s-1 2.5-4 2.5-4-2.5-4-2.5"></path>
        <path
          fill="#F57B98"
          d="M28.39 40.22A2.1 2.1 0 0 1 32 40a2.1 2.1 0 0 1 3.61.22l.4.78h-8.02l.39-.78Z"
        ></path>
        <path
          fill="#000"
          d="M4.25 5a.75.75 0 0 1 1.5 0c0 .84.91 1.75 2.25 1.75s2.25-.91 2.25-1.75a.75.75 0 0 1 1.5 0c0 1.66-1.59 3.25-3.75 3.25S4.25 6.66 4.25 5"
          opacity="0.36"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(24 28)"
        ></path>
      </g>
    </svg>
  );
}

// ----- src/assets/avatars/AvatarAidan.tsx -----
function AvatarAidan({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      className={classNames(className)}
      {...props}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#d78774"
          d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
        ></path>
        <mask
          id="personas-a"
          width="36"
          height="44"
          x="14"
          y="13"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path
            fill="#fff"
            d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
          ></path>
        </mask>
        <g mask="url(#personas-a)">
          <path
            fill="#fff"
            d="M32 13a14 14 0 0 1 14 14v6a14 14 0 1 1-28 0v-6a14 14 0 0 1 14-14"
            opacity="0.36"
            style={{ mixBlendMode: "overlay" }}
          ></path>
        </g>
        <path
          fill="#1B0640"
          d="M23.63 28a1 1 0 0 0 .37 1.37 4.5 4.5 0 0 0 2.25.63 4.5 4.5 0 0 0 2.25-.63 1.003 1.003 0 0 0-1-1.74c-.43.25-.85.37-1.25.37s-.82-.12-1.25-.37a1 1 0 0 0-1.37.37m12 0a1 1 0 0 0 .37 1.37 4.5 4.5 0 0 0 2.25.63 4.5 4.5 0 0 0 2.25-.63 1.003 1.003 0 0 0-1-1.74 2.5 2.5 0 0 1-1.25.37c-.4 0-.82-.12-1.25-.37a1 1 0 0 0-1.37.37"
        ></path>
        <g transform="translate(2 2)">
          <path
            fill="#6c4545"
            d="m44 26-.02-.02-.3.02a2 2 0 0 1-1.8-2.88 2 2 0 0 1-2.73-2.1 2 2 0 0 1-3.3.56h-.02a1.99 1.99 0 0 1-2 2.05 2 2 0 0 1-1.75-1.04 2 2 0 0 1-3.92.33 2 2 0 0 1-3.87-.6c-.04 0-.09 0-.13-.02a2 2 0 0 1-3.67-.98c-.3-.1-.57-.2-.85-.32.02.09.02.17.02.26a2 2 0 0 1-2.74 1.86A2 2 0 0 1 16 25.8v.23a4.5 4.5 0 0 0 .58 8.97A14.04 14.04 0 0 0 25 44.08v3.06c-.25-.2-.47-.42-.65-.68-.49-.13-.96-.29-1.43-.46a3.46 3.46 0 0 1-4.54-2.3 21 21 0 0 1-.98-.7 3.46 3.46 0 0 1-3.83-3.8c-.17-.21-.34-.43-.5-.66a3.46 3.46 0 0 1-2.66-5.07l-.14-.39a3.47 3.47 0 0 1-1.08-5.96v-.01a3.47 3.47 0 0 1 .47-6.2 3.47 3.47 0 0 1 2.28-5.79 3.47 3.47 0 0 1 3.87-4.86 3.47 3.47 0 0 1 5.15-3.5 3.47 3.47 0 0 1 5.94-1.83 3.47 3.47 0 0 1 6.22 0 3.47 3.47 0 0 1 5.94 1.83 3.47 3.47 0 0 1 5.14 3.5 3.47 3.47 0 0 1 3.87 4.86 3.47 3.47 0 0 1 2.28 5.8 3.47 3.47 0 0 1 .47 6.19 3.47 3.47 0 0 1-1.08 5.97l-.14.4a3.47 3.47 0 0 1-2.66 5.06c-.16.23-.33.45-.5.66A3.46 3.46 0 0 1 42.6 43l-.98.7a3.46 3.46 0 0 1-4.54 2.3c-.47.17-.94.33-1.43.46-.18.26-.4.49-.65.68v-3.06A14.04 14.04 0 0 0 43.42 35h.08a4.5 4.5 0 0 0 .5-8.97z"
          ></path>
          <mask
            id="hairCurly-a"
            width="46"
            height="45"
            x="7"
            y="3"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}
          >
            <path
              fill="#fff"
              d="m44 26-.02-.02-.3.02a2 2 0 0 1-1.8-2.88 2 2 0 0 1-2.73-2.1 2 2 0 0 1-3.3.56h-.02a1.99 1.99 0 0 1-2 2.05 2 2 0 0 1-1.75-1.04 2 2 0 0 1-3.92.33 2 2 0 0 1-3.87-.6c-.04 0-.09 0-.13-.02a2 2 0 0 1-3.67-.98c-.3-.1-.57-.2-.85-.32.02.09.02.17.02.26a2 2 0 0 1-2.74 1.86A2 2 0 0 1 16 25.8v.23a4.5 4.5 0 0 0 .58 8.97A14.04 14.04 0 0 0 25 44.08v3.06c-.25-.2-.47-.42-.65-.68-.49-.13-.96-.29-1.43-.46a3.46 3.46 0 0 1-4.54-2.3 21 21 0 0 1-.98-.7 3.46 3.46 0 0 1-3.83-3.8c-.17-.21-.34-.43-.5-.66a3.46 3.46 0 0 1-2.66-5.07l-.14-.39a3.47 3.47 0 0 1-1.08-5.96v-.01a3.47 3.47 0 0 1 .47-6.2 3.47 3.47 0 0 1 2.28-5.79 3.47 3.47 0 0 1 3.87-4.86 3.47 3.47 0 0 1 5.15-3.5 3.47 3.47 0 0 1 5.94-1.83 3.47 3.47 0 0 1 6.22 0 3.47 3.47 0 0 1 5.94 1.83 3.47 3.47 0 0 1 5.14 3.5 3.47 3.47 0 0 1 3.87 4.86 3.47 3.47 0 0 1 2.28 5.8 3.47 3.47 0 0 1 .47 6.19 3.47 3.47 0 0 1-1.08 5.97l-.14.4a3.47 3.47 0 0 1-2.66 5.06c-.16.23-.33.45-.5.66A3.46 3.46 0 0 1 42.6 43l-.98.7a3.46 3.46 0 0 1-4.54 2.3c-.47.17-.94.33-1.43.46-.18.26-.4.49-.65.68v-3.06A14.04 14.04 0 0 0 43.42 35h.08a4.5 4.5 0 0 0 .5-8.97z"
            ></path>
          </mask>
          <g mask="url(#hairCurly-a)">
            <path
              fill="#fff"
              d="M7 3h46v44H7z"
              opacity="0.26"
              style={{ mixBlendMode: "overlay" }}
            ></path>
          </g>
        </g>
        <path
          fill="#7555ca"
          d="M27 49v3a5 5 0 0 0 10 0v-3l6.65 2.05a9 9 0 0 1 6.35 8.6V64H14v-4.35a9 9 0 0 1 6.35-8.6z"
        ></path>
        <path
          fill="#000"
          d="m11 6.54-1.65.5A9 9 0 0 0 7 8.17V20h4zM15 20h4v-5.29a7.02 7.02 0 0 1-4-3.1zm8 0h4v-8.4a7.02 7.02 0 0 1-4 3.11v5.3Zm8 0h4V8.16a9 9 0 0 0-2.35-1.12L31 6.55z"
          opacity="0.4"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(11 44)"
        ></path>
        <path
          fill="#fff"
          d="M3.4 13a9 9 0 0 1 2.53-4h8.14a6.98 6.98 0 0 0 2.03 4zM39 17v3H3v-3zm-2.93-8a9 9 0 0 1 2.53 4H25.9a6.98 6.98 0 0 0 2.03-4z"
          opacity="0.17"
          style={{ mixBlendMode: "lighten" }}
          transform="translate(11 44)"
        ></path>
        <ellipse
          cx="9"
          cy="5"
          fill="#1B0640"
          rx="2"
          ry="2.5"
          transform="translate(23 36)"
        ></ellipse>
        <path
          fill="#000"
          d="M4.25 5a.75.75 0 0 1 1.5 0c0 .84.91 1.75 2.25 1.75s2.25-.91 2.25-1.75a.75.75 0 0 1 1.5 0c0 1.66-1.59 3.25-3.75 3.25S4.25 6.66 4.25 5"
          opacity="0.36"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(24 28)"
        ></path>
      </g>
    </svg>
  );
}

// ----- src/core/Checkbox.tsx -----
interface ICheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}
function Checkbox({ checked, onChange }: ICheckboxProps) {
  const checkboxDimensions = useRef({
    width: 24,
    height: 24,
    margin: 4,
  });
  const checkboxParentDimensions = useRef({
    width: checkboxDimensions.current.width * 2.5,
    height: checkboxDimensions.current.height * 1.25,
  });
  const fromTransformProps = ["scaleX(1.5)"];
  const toTransformProps = ["scaleX(1)"];
  const style = useSpring({
    from: {
      transform: [
        checked
          ? `translateX(${checkboxDimensions.current.margin}px)`
          : `translateX(${checkboxDimensions.current.width}px)`,
        ...fromTransformProps,
      ].join(" "),
    },
    to: {
      transform: [
        checked
          ? `translateX(${
              checkboxParentDimensions.current.width -
              checkboxDimensions.current.width -
              checkboxDimensions.current.margin
            }px)`
          : `translateX(${checkboxDimensions.current.margin}px)`,
        ...toTransformProps,
      ].join(" "),
    },
  });
  const toggle = useDebounce(
    useCallback(() => {
      onChange((value) => !value);
    }, [onChange]),
    0
  );
  return (
    <div
      style={checkboxParentDimensions.current}
      className={classNames(
        { "bg-[#89b8f4]": checked, "bg-gray-200 dark:bg-gray-800": !checked },
        "transition-colors",
        "duration-300",
        "ease-in-out",
        "cursor-pointer",
        "rounded-full",
        "flex",
        "items-center",
        "justify-start",
        "relative"
      )}
      onClick={toggle}
    >
      <animated.div
        style={{
          ...style,
          width: checkboxDimensions.current.width,
          height: checkboxDimensions.current.height,
        }}
        className={classNames("rounded-full", "absolute", {
          "bg-[#f1fefe]": checked,
          "bg-gray-300 dark:bg-gray-500": !checked,
        })}
      />
    </div>
  );
}

// ----- src/modules/sideBar/components/CardWaterSavingStatus.tsx -----
function CardWaterSavingStatus({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [waterSaving, setWaterSaving] = useState(false);
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>Water Alert</Card.Title>
      <Card.Body className="items-center flex gap-4">
        <div className="flex-1">Enable auto water saving mode.</div>
        <div>
          <Checkbox checked={waterSaving} onChange={setWaterSaving} />
        </div>
      </Card.Body>
    </Card>
  );
}

// ----- src/modules/layout/AppSidebar.tsx -----
function AppSidebar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const waterConsumptionReports = useSelector(
    ({ waterConsumptionReports }) => waterConsumptionReports
  );
  const todayWaterReports = useMemo(() => {
    return filterWaterConsumptionReportByDateRange(
      { waterConsumptionReports },
      DateTime.now().startOf("day"),
      DateTime.now().endOf("day")
    );
  }, [waterConsumptionReports]);
  const todayWaterConsumption = useMemo(
    () =>
      todayWaterReports.reduce(
        (total, report) =>
          total + report.items.reduce((sum, item) => sum + item.consumption, 0),
        0
      ),
    [todayWaterReports]
  );
  const expectedDailyMaxPerPerson = 1000 * 1000; // 1000L per person in mL
  const todayAverageConsumption = useMemo(
    () => todayWaterConsumption / todayWaterReports.length,
    [todayWaterConsumption, todayWaterReports.length]
  );
  return (
    <div
      {...props}
      className={classNames(
        "xl:h-screen",
        "bg-[#e3eef3]",
        "dark:bg-gray-800",
        "xl:w-80",
        "w-full",
        "flex",
        "gap-4",
        "p-4",
        "xl:overflow-y-auto",
        className
      )}
    >
      <UserProfileInformation />

      <img
        alt="Blue avatar holding the Earth planet in his hand."
        className={classNames(
          // Mirror horizontally
          "transform",
          "scale-x-[-1]"
        )}
        src="https://i.postimg.cc/Bn4hRTd8/image.png"
      />

      <div
        className={classNames(
          "gap-4",
          "flex",
          "bg-[#eff3f8]",
          "dark:bg-gray-600",
          "p-8",
          "rounded-lg",
          "xl:items-center",
          "flex-col",
          "xl:flex-row"
        )}
      >
        <div
          className={classNames(
            "w-16",
            "xl:h-16",
            "xl:w-auto",
            "h-auto",
            "p-4",
            "bg-white",
            "dark:bg-gray-700",
            "rounded-xl"
          )}
        >
          <img
            src="https://i.postimg.cc/jC0JBh2L/image.png"
            alt="Faucet"
            // className={classNames("w-full", "xl:w-auto", "h-full", "xl:h-auto")}
            className={classNames("h-full")}
          />
        </div>
        <div className="flex-1">
          Turning off the tap while you brush your teeth can save up to 36
          liters of water per day.
        </div>
      </div>

      <Card>
        <Card.Title>
          <Card.Title.Icon>
            <UsersRoundIcon />
          </Card.Title.Icon>
          Water consumed by a family now
        </Card.Title>
        <Card.Body className="flex">
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-gray-400">This day</div>
            <div>
              {Math.floor(millilitersToLiters(todayWaterConsumption) / 1000)} m3
            </div>
            <RangeHorizontalIndicator
              min={0}
              max={expectedDailyMaxPerPerson}
              value={todayAverageConsumption}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row flex-1">
              <AvatarOliver className={classNames("w-12", "h-12")} />
              <AvatarSophia className={classNames("w-12", "h-12")} />
            </div>
            <div className="flex flex-row flex-1">
              <AvatarDestiny className={classNames("w-12", "h-12")} />
              <AvatarAidan className={classNames("w-12", "h-12")} />
            </div>
          </div>
        </Card.Body>
      </Card>

      <CardWaterSavingStatus />
    </div>
  );
}

// ----- src/core/hooks/useDuration.ts -----
interface IUseDurationHookIsExpired {
  (duration: Duration): boolean;
}
interface IUseDurationHookDifference {
  (): Duration | null;
}
interface IUseDurationHookRefreshDateTime {
  (): void;
}
/**
 * Returns a tuple of three functions related to managing a duration timer.
 * The first function, `isExpired`, takes a Luxon Duration and returns a boolean
 * indicating whether the duration has expired since the last call to the second
 * function, `refreshDateTime`. The third function, `calculateDifference`, returns
 * the Luxon Duration between the current time and the last call to `refreshDateTime`.
 * @returns A tuple of three functions: `isExpired(duration: Duration): boolean`,
 * `refreshDateTime(): void`, and `calculateDifference(): Duration`.
 */
function useDuration(): [
  IUseDurationHookIsExpired,
  IUseDurationHookRefreshDateTime,
  IUseDurationHookDifference
] {
  const lastCallRef = useRef<DateTime | null>(null);
  const calculateDifference = useCallback(() => {
    const now = DateTime.now();
    const previous = lastCallRef.current;
    return previous !== null ? now.diff(previous) : null;
  }, []);
  const refreshDateTime = useCallback(() => {
    lastCallRef.current = DateTime.now();
  }, []);
  const isExpired = useCallback(
    (duration: Duration) => {
      const elapsedTime = calculateDifference();
      if (
        elapsedTime === null ||
        elapsedTime.as("milliseconds") < duration.as("milliseconds")
      ) {
        return false;
      }
      return true;
    },
    [calculateDifference]
  );
  useEffect(() => {
    refreshDateTime();
    return () => {
      lastCallRef.current = null;
    };
  }, [refreshDateTime]);
  return [isExpired, refreshDateTime, calculateDifference];
}

// ----- src/core/math/randomInteger.ts -----
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----- src/core/math/randomFloat.ts -----
/**
 * Returns a random floating-point number between min (inclusive) and max
 * (exclusive).
 *
 * @example
 * randomFloat(0, 1) // 0.5
 */
function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// ----- src/core/shallowIsEqual.ts -----
/**
 * Checks whether two objects are equal by comparing their property values.
 * @example
 * shallowIsEqual({ foo: "bar" }, { foo: "bar" }) // true
 * shallowIsEqual({ foo: "bar" }, { bar: "foo" }) // false
 * shallowIsEqual({ foo: "bar", baz: "qux" }, { foo: "bar", baz: "qux" }) // true
 * shallowIsEqual({ foo: "bar", baz: "qux" }, { foo: "bar", baz: "quux" }) // false
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns Whether the two objects are equal.
 */
function shallowIsEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) {
    return true;
  }
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }
  const entriesA = Object.entries(a);
  const entriesB = Object.entries(b);
  if (entriesA.length !== entriesB.length) {
    return false;
  }
  for (let i = 0; i < entriesA.length; i++) {
    const [keyA, valueA] = entriesA[i];
    const [keyB, valueB] = entriesB[i];
    if (keyA !== keyB) {
      return false;
    }
    if (!Object.is(valueA, valueB)) {
      return false;
    }
  }
  return true;
}

// ----- src/core/hooks/useRandomWaterConsumptionReportGenerator.ts -----
interface IUseRandomWaterConsumptionReportGeneratorHookResult {
  (): IWaterConsumptionReport | null;
}
function useRandomWaterConsumptionReportGenerator(
  waterConsumptionReport: IWaterConsumptionReport | null = null
): IUseRandomWaterConsumptionReportGeneratorHookResult {
  const {
    waterConsumptionLocations: locations,
    waterConsumptionEndpoints,
    waterConsumptionKinds,
  } = useSelector(
    ({
      waterConsumptionLocations,
      waterConsumptionEndpoints,
      waterConsumptionKinds,
    }) => ({
      waterConsumptionLocations,
      waterConsumptionEndpoints,
      waterConsumptionKinds,
    }),
    shallowIsEqual
  );
  return useCallback(
    ({
      consumptionRate = randomFloat(1, 8),
      maximumItemCount = 32,
    }: Partial<{
      maximumItemCount: number;
      consumptionRate: number;
    }> = {}) => {
      const hourlyConsumptionInMilliliters = 10000;
      const list = {
        endpoints: Array.from(waterConsumptionEndpoints.values()),
        locations: Array.from(locations.values()),
        kinds: Array.from(waterConsumptionKinds.values()),
      };
      const location =
        list.locations[randomInteger(0, list.locations.length - 1)] ?? null;
      const endpoint =
        list.endpoints[randomInteger(0, list.endpoints.length - 1)] ?? null;
      const kind = list.kinds[randomInteger(0, list.kinds.length - 1)] ?? null;
      if (location === null || kind === null || endpoint === null) {
        console.error("location, kind, or endpoint is null: %o", {
          location,
          kind,
          endpoint,
        });
        return null;
      }
      const newReport: IWaterConsumptionReport = {
        temperature: defaultAppConfiguration.temperature.minimum,
        pressure: defaultAppConfiguration.pressure.minimum,
        mineralization: defaultAppConfiguration.mineralization.minimum,
        ...waterConsumptionReport,
        id: crypto.randomUUID(),
        date: new Date(),
        items: [],
      };
      const { items } = newReport;
      for (let i = 0; i < randomInteger(1, maximumItemCount); i++) {
        items.push({
          kindId: kind.id,
          locationId: location.id,
          consumption: hourlyConsumptionInMilliliters * consumptionRate,
          endpointId: endpoint.id,
        });
      }
      return newReport;
    },
    [
      waterConsumptionReport,
      waterConsumptionEndpoints,
      locations,
      waterConsumptionKinds,
    ]
  );
}

// ----- src/generateRandomWaterConsumptionReports.ts -----
/**
 * Generates an array of random water consumption reports based on the
 * provided parts of the application state.
 *
 * The generated reports have the following properties:
 * - id: a random UUID
 * - date: a date between the start of the current year plus 6 months and the
 *   end of the current year
 * - items: an array of 20 items, each with the following properties:
 *   - kindId: the ID of a random water consumption kind
 *   - consumption: a random value between 10 and 1000 liters
 *   - locationId: the ID of a random water consumption location
 *   - endpointId: the ID of a random water consumption endpoint
 * - temperature: the maximum temperature setting in the application
 *   configuration
 * - pressure: the maximum pressure setting in the application configuration
 * - mineralization: the maximum mineralization setting in the application
 *   configuration
 *
 * @param {{
 *   waterConsumptionEndpoints: ReadonlyMap<string, IWaterConsumptionEndpoint>,
 *   waterConsumptionKinds: ReadonlyMap<string, IWaterConsumptionKind>,
 *   waterConsumptionLocations: ReadonlyMap<string, IWaterConsumptionLocation>,
 * }} options
 * @returns {IWaterConsumptionReport[]}
 */
function generateRandomWaterConsumptionReports({
  waterConsumptionEndpoints,
  waterConsumptionKinds,
  waterConsumptionLocations,
}: Pick<
  IAppState,
  | "waterConsumptionEndpoints"
  | "waterConsumptionKinds"
  | "waterConsumptionLocations"
>): IWaterConsumptionReport[] {
  const generatedReports = new Array<IWaterConsumptionReport>();
  const startDate = DateTime.now().startOf("year");
  const endDate = DateTime.now().endOf("year");
  const LITER = 1000;
  {
    let currentDate = startDate;
    const kinds = Array.from(waterConsumptionKinds.values());
    const locations = Array.from(waterConsumptionLocations.values());
    const endpoints = Array.from(waterConsumptionEndpoints.values());
    const duration = endDate.diff(startDate);
    const hourCount = Math.floor(duration.as("days"));
    for (let i = 0; i < hourCount; i++) {
      const report: IWaterConsumptionReport = {
        id: crypto.randomUUID(),
        date: currentDate.toJSDate(),
        items: [],
        temperature: defaultAppConfiguration.temperature.maximum,
        pressure: defaultAppConfiguration.pressure.maximum,
        mineralization: defaultAppConfiguration.mineralization.maximum,
      };
      for (let i = 0; i < 8; i++) {
        const kind = kinds[randomInteger(0, waterConsumptionKinds.size - 1)];
        const location =
          locations[randomInteger(0, waterConsumptionLocations.size - 1)];
        const endpoint =
          endpoints[randomInteger(0, waterConsumptionEndpoints.size - 1)];
        report.items.push({
          kindId: kind.id,
          consumption: randomFloat(10, 100) * LITER,
          locationId: location.id,
          endpointId: endpoint.id,
        });
      }
      generatedReports.push(report);
      currentDate = currentDate.plus({ hours: 1 });
    }
  }
  return generatedReports;
}

// ----- src/PeriodicUpdate.tsx -----
/**
 * Periodically updates the store with a new random water consumption report.
 *
 * @remarks This component is a workaround for the fact that Redux doesn't
 * support dispatching actions from outside of a component lifecycle.
 *
 * Every second, it will generate a new random water consumption report and
 * dispatch an action to update the store with the new report.
 *
 * It also checks if the currently selected water consumption report has
 * changed, and if so, it will refresh its internal timer.
 *
 * Finally, it will render a GenerateReports component if no reports have been
 * generated yet, and will not render anything if reports have been generated.
 */
function PeriodicUpdate() {
  const waterConsumptionReport = useSelector(
    selectTodayLatestWaterConsumptionReport
  );
  const generateRandomWaterConsumptionReport =
    useRandomWaterConsumptionReportGenerator(waterConsumptionReport);
  const [shouldUpdateStore, refreshShouldUpdateStore] = useDuration();
  const updateStoreInterval = useRef(Duration.fromObject({ seconds: 1 }));
  const dispatch = useDispatch();
  const lastWaterConsumptionReportRef = useRef(waterConsumptionReport);
  useEffect(() => {
    if (waterConsumptionReport !== lastWaterConsumptionReportRef.current) {
      lastWaterConsumptionReportRef.current = waterConsumptionReport;
      refreshShouldUpdateStore();
    }
  }, [waterConsumptionReport, refreshShouldUpdateStore]);
  const updateStore = useCallback(() => {
    if (!shouldUpdateStore(updateStoreInterval.current)) {
      return;
    }
    // Update internal hook timer
    refreshShouldUpdateStore();
    const newReport = generateRandomWaterConsumptionReport();
    if (newReport === null) {
      return;
    }
    dispatch({
      type: ActionType.SetWaterConsumptionReports,
      payload: [newReport],
    });
  }, [
    generateRandomWaterConsumptionReport,
    shouldUpdateStore,
    dispatch,
    refreshShouldUpdateStore,
  ]);
  useInterval(updateStore, 1500);
  const [areReportsGenerated, setAreReportsGenerated] = useState(false);
  const onReportsGenerated = useCallback(() => {
    setAreReportsGenerated(true);
  }, [setAreReportsGenerated]);
  return areReportsGenerated ? null : (
    <GenerateReports onFinished={onReportsGenerated} />
  );
}
/**
 * A React component that generates random reports once and then calls the onFinished callback.
 *
 * The component will first get the current state of the water consumption endpoints, kinds, and locations
 * and then generate a new array of reports using the generateRandomWaterConsumptionReports function.
 * The generated reports will then be dispatched to the Redux store.
 *
 * The component will only generate the reports once, when it is first mounted.
 *
 * @param onFinished {() => void} A callback that will be called when the reports have been generated and added to the Redux store.
 */
function GenerateReports({ onFinished }: { onFinished: () => void }) {
  const dispatch = useDispatch();
  // Get state once statically
  const appState = useSelector(
    ({
      waterConsumptionEndpoints,
      waterConsumptionKinds,
      waterConsumptionLocations,
    }) => ({
      waterConsumptionEndpoints,
      waterConsumptionKinds,
      waterConsumptionLocations,
    }),
    shallowIsEqual
  );
  const scheduleGenerateReports = useDebounce(
    useCallback(() => {
      dispatch({
        type: ActionType.SetWaterConsumptionReports,
        payload: [...generateRandomWaterConsumptionReports(appState)],
      });
    }, [dispatch, appState]),
    1000
  );
  useEffect(() => {
    scheduleGenerateReports();
    onFinished();
  }, [scheduleGenerateReports, onFinished]);
  return null;
}

// ----- src/index.tsx -----
const inter = Inter({
  subsets: ["latin"],
});
export default function App() {
  const store = useRef(configureStore());
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(
    null
  );
  return (
    <Provider store={store.current}>
      <PeriodicUpdate />
      <div
        className={classNames(
          inter.className,
          "overflow-x-hidden",
          "flex",
          "flex-col",
          "xl:flex-row",
          "h-screen",
          "w-screen"
        )}
      >
        <NavigationBar
          className={classNames("xl:w-16", "xl:h-full", "w-full")}
        />
        <div
          className={classNames(
            "xl:flex-1",
            "p-10",
            `bg-[#eff3f8]`,
            "dark:bg-gray-800",
            // Enable horizontal scroll in mobile view
            "xl:overflow-y-auto",
            "xl:overflow-x-hidden"
          )}
        >
          <CardWelcomeUser />

          <Section title="Your home">
            <div className="xl:grid flex flex-col grid-flow-row grid-cols-3 gap-4">
              <div className="">
                <CardWaterConsumptionSelector
                  endpointId={selectedEndpointId}
                  onSelectEndpointId={setSelectedEndpointId}
                />
              </div>
              <div className="">
                <CardUserWaterConsumption endpointId={selectedEndpointId} />
              </div>
              <div className="">
                <CardTemperature />
              </div>
              <div className="">
                <CardStatistics />
              </div>
              <div className="">
                <CardWaterMineralization />
              </div>
              <div className="">
                <CardPressure />
              </div>
            </div>
          </Section>
        </div>
        <AppSidebar
          className={classNames("xl:rounded-3xl", "flex-col", "p-8")}
        />
      </div>
    </Provider>
  );
}
