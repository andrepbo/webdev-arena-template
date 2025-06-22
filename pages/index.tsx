import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  Plus,
  SunMedium,
  LampDesk,
  Minus,
  Repeat,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Radio,
  Sun,
  Leaf,
  Fan,
  Snowflake,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface IDevice {
  id: number;
  brand: string;
  label: string;
  enabled: boolean;
}

interface IStat {
  label: string;
  value: string;
}

interface IRoomData {
  devices: IDevice[];
  stats: IStat[];
  chart: { name: string; value: number }[];
}

interface IRoomSelector {
  rooms: string[];
  activeRoom: string;
  setActiveRoom: React.Dispatch<React.SetStateAction<string>>;
}

interface IPowerConsumptionChart {
  data: { name: string; value: number }[];
}

// This displays a bottom navigation bar with logo, menu, and user info
const BottomNavBar = () => {
  // Track the currently active menu item
  const [activeItem, setActiveItem] = useState("Rooms");

  // Define the menu items
  const menuItems = [
    "Rooms",
    "Devices",
    "Analytics",
    "Automation",
    "Preferences",
  ];

  return (
    // Main container styled for responsiveness and dark/light modes
    <div className="mt-8 bg-gray-100 dark:bg-[#0e0e15] rounded-xl lg:rounded-full px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center shadow-inner max-w-7xl mx-auto gap-4 text-sm">
      {/* Logo section */}
      <div className="flex items-center justify-center md:justify-start gap-2">
        <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
          🏠
        </div>
        <span className="font-semibold text-gray-800 dark:text-white">
          Homsky
        </span>
      </div>

      {/* Menu items with active highlighting */}
      <div className="flex flex-wrap justify-center md:justify-center gap-6 text-gray-500 dark:text-gray-400 relative">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveItem(item)}
            className={`relative pb-1 transition-colors duration-300 font-medium ${
              activeItem === item
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-400"
            }`}
          >
            {item}
            {activeItem === item && (
              <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-blue-500 mx-auto w-full transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* User profile section with avatar and username */}
      <div className="flex items-center justify-center md:justify-end gap-2 bg-white dark:bg-zinc-800 rounded-full px-2 py-1">
        <img
          src="https://i.pravatar.cc/32"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div className="text-right">
          <div className="font-semibold text-gray-800 dark:text-white">
            Amir El Amari
          </div>
          <div className="text-gray-400 text-xs">elamircypher</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

// This component simulates a smart thermostat interface
const ThermostatCard = () => {
  // State for current temperature
  const [temperature, setTemperature] = useState(64);
  // State for selected thermostat mode
  const [mode, setMode] = useState("Cold");
  // State for whether the media player is playing (fixed true here)
  const [isPlaying] = useState(true);
  // State for displaying current time
  const [time, setTime] = useState("10:02 PM");
  // State to toggle thermostat on/off
  const [thermostatOn, setThermostatOn] = useState(true);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const suffix = hours >= 12 ? "PM" : "AM";
      const displayHour = ((hours + 11) % 12) + 1;
      setTime(`${displayHour}:${minutes} ${suffix}`);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Adjust the temperature within allowed range (50–90°F)
  const handleTemperatureChange = (delta: number) => {
    setTemperature((prev) => Math.min(90, Math.max(50, prev + delta)));
  };

  // Render button for thermostat mode selection
  const renderModeButton = (label: string, Icon: LucideIcon) => (
    <button
      key={label}
      onClick={() => setMode(label)}
      className={`w-16 h-16 flex flex-col items-center justify-center text-xs rounded-xl transition-colors ${
        mode === label ? "bg-blue-100 text-blue-600" : "bg-zinc-800 text-white"
      }`}
    >
      <Icon size={18} />
      <span className="mt-1">{label}</span>
    </button>
  );

  return (
    // Card container with dark background and white text
    <div className="bg-[#111727] text-white rounded-2xl p-6 space-y-6">
      {/* Top section showing current time and thermostat toggle */}
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold">
          <span className="text-white">{time.split(" ")[0]}</span>{" "}
          <span className="text-zinc-400">{time.split(" ")[1]}</span>
        </div>
        <div className="h-1 w-8 bg-zinc-600 rounded-full mt-3 mb-4" />
        <div className="flex justify-between w-full items-center">
          <span className="text-sm text-white font-bold">Thermostat</span>
          {/* Custom toggle switch */}
          <div
            className="w-10 h-6 rounded-full flex items-center p-1 cursor-pointer"
            style={{ backgroundColor: "#DBE9FE" }}
            onClick={() => setThermostatOn(!thermostatOn)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: "#111727",
                marginLeft: thermostatOn ? "auto" : "0",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Temperature display with circular SVG UI */}
      <div className="relative flex flex-col items-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodColor="#111727"
              />
            </filter>
          </defs>
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#3c4c5a"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#ffffff"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="471"
            strokeDashoffset="118"
            transform="rotate(90 100 100)"
          />
          {/* Knob circle */}
          <circle
            cx="40"
            cy="33"
            r="12"
            fill="#ffffff"
            filter="url(#shadow)"
            transform="rotate(90 100 100)"
          />
        </svg>

        {/* Temperature value in center */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
          {/* Glow background behind temperature */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 rounded-full blur-2xl opacity-40 z-[-1]" />

          {/* Temperature value */}
          <div className="text-6xl font-bold text-white">{temperature}°</div>
          <div className="text-sm text-zinc-300">(° Fahrenheit)</div>
        </div>

        {/* Temperature control buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => handleTemperatureChange(-1)}
            className="w-10 h-10 border border-white rounded-full flex items-center justify-center"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => handleTemperatureChange(1)}
            className="w-10 h-10 border border-white rounded-full flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Thermostat modes: Hot, Eco, Fan, Cold */}
      <div className="flex justify-between">
        {renderModeButton("Hot", Sun)}
        {renderModeButton("Eco", Leaf)}
        {renderModeButton("Fan", Fan)}
        {renderModeButton("Cold", Snowflake)}
      </div>

      {/* Music player UI */}
      <div className="bg-white rounded-2xl text-zinc-900 p-4">
        <div className="text-xs text-zinc-400">Ericdoa x Valorant</div>
        <div className="text-base font-bold text-zinc-800">
          Greater Than One
        </div>
        <div className="w-full h-1 bg-zinc-300 rounded mt-2">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: "25%" }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-zinc-400 mt-1">
          <span>0:34</span>
          <span>2:27</span>
        </div>

        {/* Media controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <Repeat size={20} className="text-zinc-600 dark:text-zinc-400" />
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <SkipBack size={20} className="text-zinc-600 dark:text-zinc-400" />
          </div>
          <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <SkipForward
              size={20}
              className="text-zinc-600 dark:text-zinc-400"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <Radio size={20} className="text-zinc-600 dark:text-zinc-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// This component displays a single statistic with a label and value.
const StatCard = ({ label, value }: IStat) => (
  // Card container with background and border styling for both light and dark modes
  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-4 shadow-inner border border-zinc-200 dark:border-zinc-700">
    {/* Statistic label */}
    <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{label}</div>

    {/* Statistic value */}
    <div className="text-2xl font-bold text-zinc-800 dark:text-white">
      {value}
    </div>
  </div>
);

// This component displays an individual smart device with its status and a toggle switch.
const DeviceCard = ({
  brand,
  label,
  enabled,
  onToggle,
}: {
  brand: string;
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  // Card container with conditional background based on enabled state
  <div
    className={`rounded-2xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 ${
      enabled ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-zinc-900"
    }`}
  >
    {/* Header with icon and toggle switch */}
    <div className="flex justify-between items-start mb-6">
      {/* Icon */}
      <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full text-zinc-400 dark:text-zinc-500">
        <LayoutGrid size={16} />
      </div>
      {/* Toggle switch to enable/disable the device */}
      <button
        onClick={onToggle}
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? "bg-blue-800 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </button>
    </div>

    {/* Device brand name */}
    <div className="text-sm text-zinc-500 dark:text-zinc-400">{brand}</div>

    {/* Device label/title */}
    <div className="text-lg font-semibold text-zinc-800 dark:text-white">
      {label}
    </div>
  </div>
);

// This component renders a bar chart to display power consumption per month.
const PowerConsumptionChart = ({ data }: IPowerConsumptionChart) => {
  return (
    // Container with styling for light and dark themes
    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-4 md:p-6 shadow-inner border border-zinc-200 dark:border-zinc-700">
      {/* Chart title */}
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">
        Power Consumption <span className="text-sm text-zinc-400">(kWh)</span>
      </h3>

      {/* Chart container */}
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap={20}
            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
          >
            {/* X Axis with custom labels and highlighting for March */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              stroke="#888"
              tick={({ x, y, payload }) => {
                const isSelected = payload.value === "Mar";
                return (
                  <text
                    x={x}
                    y={y + 10}
                    fill="#888"
                    textAnchor="middle"
                    fontWeight={isSelected ? 700 : 400}
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            {/* Y Axis with no lines */}
            <YAxis axisLine={false} tickLine={false} stroke="#888" />

            {/* Tooltip that appears on hover */}
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow">
                      {`${payload[0].value} kWh`}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Bar chart visual with individual bar coloring */}
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Mar" ? "#3B82F6" : "#BFDBFE"} // Highlight March
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// This component displays detailed information and controls for a smart lamp device
const LampCard = () => {
  return (
    // Main container for the lamp card with responsive layout and styling
    <div className="h-full flex flex-col md:flex-row w-full bg-white dark:bg-zinc-900 rounded-2xl p-4 md:p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 gap-6">
      {/* Left section: Lamp icon centered */}
      <div className="w-full md:w-1/3 flex items-center justify-center">
        <LampDesk size={128} className="text-black dark:text-white" />
      </div>

      {/* Right section: Lamp details and controls */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {/* Header with device label and more options button */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-sm text-zinc-400 dark:text-zinc-500">
              Device
            </span>
            <span className="text-lg font-bold text-zinc-800 dark:text-white leading-tight">
              Luminens LED Modern Standing Lamp
            </span>
          </div>
          {/* Icon button for more options */}
          <button
            className="aspect-square w-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-zinc-400 dark:text-zinc-500"
            aria-label="More Options"
          >
            <LayoutGrid size={20} />
          </button>
        </div>

        {/* Section showing time usage and energy consumption */}
        <div className="flex flex-col md:flex-row gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3">
          {/* Time usage stat */}
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-zinc-800 dark:text-white">
              4 H 20 M
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Time Usage
            </div>
          </div>
          {/* Divider between stats (only on md+ screens) */}
          <div className="w-px bg-zinc-300 dark:bg-zinc-700 mx-2 hidden md:block" />
          {/* Energy consumption stat */}
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-zinc-800 dark:text-white">
              72 W
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Energy Consumption
            </div>
          </div>
        </div>

        {/* Dropdowns for selecting device schedule times */}
        <div className="grid grid-cols-2 gap-3">
          {/* Time selector for when lamp turns on */}
          <div className="border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              On from
            </div>
            <select className="w-full bg-transparent text-sm font-medium text-zinc-800 dark:text-white">
              <option>06:00 PM</option>
            </select>
          </div>
          {/* Time selector for when lamp turns off */}
          <div className="border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Off at
            </div>
            <select className="w-full bg-transparent text-sm font-medium text-zinc-800 dark:text-white">
              <option>05:00 AM</option>
            </select>
          </div>
        </div>

        {/* Brightness control bar */}
        <div className="flex items-center gap-2 mt-2">
          <div className="text-blue-400">
            <SunMedium size={16} />
          </div>
          <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full"
              style={{ width: "60%" }} // Example brightness level
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// This component displays a list of room buttons and highlights the selected room
const RoomSelector = ({ rooms, activeRoom, setActiveRoom }: IRoomSelector) => (
  <>
    {rooms.map((room) => (
      // Render a button for each room
      <button
        key={room}
        onClick={() => setActiveRoom(room)} // Update active room on click
        className={`relative whitespace-nowrap transition-colors pl-1 ${
          room === activeRoom
            ? "text-2xl font-bold text-black dark:text-white flex items-center gap-2" // Active room styling
            : "text-xl font-medium text-gray-400 dark:text-gray-500" // Inactive room styling
        }`}
      >
        {/* Render a small indicator for the active room */}
        {room === activeRoom && (
          <span
            className="inline-block align-middle"
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: "#93c5fd",
              transform: "rotate(45deg)",
              marginLeft: "2px",
            }}
          ></span>
        )}
        {/* Room name text */}
        <span className="align-middle">{room}</span>
      </button>
    ))}
  </>
);

// This component renders a circular button to add a new room
const AddRoomButton = () => (
  // Prevent the button from shrinking in flex containers
  <div className="flex-shrink-0">
    <button
      // Button styling: fixed size, rounded, with background color for light and dark mode
      className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-300"
      // Accessibility label for screen readers
      aria-label="Add Room"
    >
      {/* Plus icon inside the button */}
      <Plus size={22} />
    </button>
  </div>
);

// This component handles the horizontal list of rooms and the "Add Room" button
const HeaderNav = ({
  activeRoom,
  setActiveRoom,
}: {
  activeRoom: string;
  setActiveRoom: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // List of available rooms in the smart home dashboard
  const rooms = [
    "Living Room",
    "Bed Room",
    "Kitchen",
    "Bathroom",
    "Backyard",
    "Garage",
  ];

  return (
    // Container for the room selector and add button
    <div className="flex items-center gap-6 overflow-x-auto pl-2 scrollbar-hide">
      {/* Component to render selectable room buttons */}
      <RoomSelector
        rooms={rooms}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
      />
      {/* Button to add a new room */}
      <AddRoomButton />
    </div>
  );
};

// roomData holds the configuration for each room in the smart home dashboard,
// including its devices, statistics, and power consumption chart data.
const roomData: Record<string, IRoomData> = {
  // Living Room configuration
  "Living Room": {
    devices: [
      { id: 1, brand: "Philips", label: "Ceiling Light", enabled: true },
      { id: 2, brand: "Xiaomi", label: "Air Purifier", enabled: false },
    ],
    stats: [
      { label: "Current Consumption", value: "2 kWh" },
      { label: "Humidity", value: "35%" },
      { label: "Temperature", value: "70° F" },
    ],
    chart: [
      { name: "Jan", value: 120 },
      { name: "Feb", value: 85 },
      { name: "Mar", value: 169 },
      { name: "Apr", value: 130 },
      { name: "May", value: 150 },
      { name: "Jun", value: 110 },
    ],
  },
  // Bed Room configuration
  "Bed Room": {
    devices: [
      { id: 3, brand: "Nest", label: "Thermostat", enabled: true },
      { id: 4, brand: "Sonos", label: "Speaker", enabled: false },
    ],
    stats: [
      { label: "Current Consumption", value: "1,5 kWh" },
      { label: "Humidity", value: "48,2%" },
      { label: "Temperature", value: "68° F" },
    ],
    chart: [
      { name: "Jan", value: 60 },
      { name: "Feb", value: 90 },
      { name: "Mar", value: 140 },
      { name: "Apr", value: 100 },
      { name: "May", value: 120 },
      { name: "Jun", value: 80 },
    ],
  },
  // Kitchen configuration
  Kitchen: {
    devices: [
      { id: 5, brand: "LG", label: "Refrigerator", enabled: true },
      { id: 6, brand: "Samsung", label: "Microwave", enabled: false },
    ],
    stats: [
      { label: "Current Consumption", value: "3 kWh" },
      { label: "Humidity", value: "40%" },
      { label: "Temperature", value: "60° F" },
    ],
    chart: [
      { name: "Jan", value: 140 },
      { name: "Feb", value: 110 },
      { name: "Mar", value: 190 },
      { name: "Apr", value: 160 },
      { name: "May", value: 180 },
      { name: "Jun", value: 140 },
    ],
  },
  // Bathroom configuration
  Bathroom: {
    devices: [{ id: 7, brand: "Dyson", label: "Heater", enabled: false }],
    stats: [
      { label: "Current Consumption", value: "1 kWh" },
      { label: "Humidity", value: "42%" },
      { label: "Temperature", value: "55° F" },
    ],
    chart: [
      { name: "Jan", value: 30 },
      { name: "Feb", value: 20 },
      { name: "Mar", value: 35 },
      { name: "Apr", value: 25 },
      { name: "May", value: 40 },
      { name: "Jun", value: 28 },
    ],
  },
  // Backyard configuration
  Backyard: {
    devices: [
      { id: 8, brand: "Ring", label: "Security Camera", enabled: true },
    ],
    stats: [
      { label: "Current Consumption", value: "2 kWh" },
      { label: "Humidity", value: "48%" },
      { label: "Temperature", value: "70° F" },
    ],
    chart: [
      { name: "Jan", value: 20 },
      { name: "Feb", value: 18 },
      { name: "Mar", value: 24 },
      { name: "Apr", value: 22 },
      { name: "May", value: 30 },
      { name: "Jun", value: 26 },
    ],
  },
  // Garage configuration
  Garage: {
    devices: [
      {
        id: 9,
        brand: "Chamberlain",
        label: "Garage Door Opener",
        enabled: false,
      },
    ],
    stats: [
      { label: "Current Consumption", value: "3,5 kWh" },
      { label: "Humidity", value: "42%" },
      { label: "Temperature", value: "62° F" },
    ],
    chart: [
      { name: "Jan", value: 15 },
      { name: "Feb", value: 10 },
      { name: "Mar", value: 20 },
      { name: "Apr", value: 18 },
      { name: "May", value: 25 },
      { name: "Jun", value: 22 },
    ],
  },
};

export default function SmartHomeDashboard() {
  // Set the default room and retrieve its initial data
  const defaultRoom = "Living Room";
  const defaultRoomData = roomData[defaultRoom];

  // React state hooks for room-specific data
  const [activeRoom, setActiveRoom] = useState<string>(defaultRoom);
  const [devices, setDevices] = useState<IDevice[]>(defaultRoomData.devices);
  const [stats, setStats] = useState<IStat[]>(defaultRoomData.stats);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    defaultRoomData.chart
  );

  // Update the displayed room data when the active room changes
  useEffect(() => {
    if (roomData[activeRoom]) {
      setDevices(roomData[activeRoom].devices);
      setStats(roomData[activeRoom].stats);
      setChartData(roomData[activeRoom].chart);
    }
  }, [activeRoom]);

  // Toggle a device's enabled state
  const toggleDevice = (id: number) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, enabled: !device.enabled } : device
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 max-w-7xl mx-auto">
        {/* Sidebar / Left Column */}
        <aside className="relative">
          {/* Sticky top navigation with room selector */}
          <div className="sticky top-0 z-10 w-full bg-gray-50 dark:bg-gray-950 pb-4">
            <div className="flex items-center justify-between mb-6">
              <HeaderNav
                activeRoom={activeRoom}
                setActiveRoom={setActiveRoom}
              />
            </div>
          </div>

          {/* Primary content area with cards */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="col-span-1 xl:col-span-3">
              <LampCard />
            </div>
            <div className="col-span-1 xl:col-span-2">
              <PowerConsumptionChart data={chartData} />
            </div>
          </div>

          {/* Stats overview section */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>

          {/* List of device cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                brand={device.brand}
                label={device.label}
                enabled={device.enabled}
                onToggle={() => toggleDevice(device.id)}
              />
            ))}
          </div>
        </aside>

        {/* Right Column with Thermostat */}
        <section className="space-y-6">
          <ThermostatCard />
        </section>
      </div>

      {/* Bottom navigation bar */}
      <BottomNavBar />
    </main>
  );
}
