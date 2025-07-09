import { ArrowDown, Menu, Minus, Plus, ShoppingCart, X } from "lucide-react";
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../components/ui/toast";
import { useToast } from "../hooks/use-toast";
import { Anton, Inter } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const createColorSystem = (isDark: boolean) => ({
  primary: "#CCFF00",
  primaryHover: "#B8E600",
  secondary: "#FFFF00",

  black: "#000000",
  white: "#FFFFFF",
  gray: isDark
    ? {
        50: "#0A0A0A",
        100: "#1A1A1A",
        200: "#2D2D2D",
        300: "#404040",
        400: "#525252",
        500: "#737373",
        600: "#A3A3A3",
        700: "#D4D4D4",
        800: "#E5E5E5",
        900: "#F5F5F5",
      }
    : {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },

  success: isDark ? "#34D399" : "#10B981",
  error: isDark ? "#F87171" : "#EF4444",
  warning: isDark ? "#FBBF24" : "#F59E0B",
  info: isDark ? "#60A5FA" : "#3B82F6",

  background: {
    primary: isDark ? "#0A0A0A" : "#FFFFFF",
    secondary: isDark ? "#1A1A1A" : "#F9FAFB",
    dark: isDark ? "#E5E7EB" : "#000000",
    accent: "#CCFF00",
    card: isDark ? "#1A1A1A" : "#FFFFFF",
    elevated: isDark ? "#2D2D2D" : "#F9FAFB",
  },

  text: {
    primary: isDark ? "#E5E7EB" : "#000000",
    secondary: isDark ? "#A3A3A3" : "#4B5563",
    muted: isDark ? "#737373" : "#6B7280",
    light: isDark ? "#525252" : "#9CA3AF",
    inverse: isDark ? "#0A0A0A" : "#FFFFFF",
    accent: "#CCFF00",
  },

  border: {
    light: isDark ? "#2D2D2D" : "#E5E7EB",
    medium: isDark ? "#404040" : "#D1D5DB",
    dark: isDark ? "#525252" : "#9CA3AF",
    accent: "#CCFF00",
    primary: isDark ? "#A3A3A3" : "#000000",
  },
});

const applyColorVariables = (isDark: boolean) => {
  if (typeof window !== "undefined") {
    const themeColors = createColorSystem(isDark);
    const root = document.documentElement;

    root.style.setProperty("--color-primary", themeColors.primary);
    root.style.setProperty("--color-primary-hover", themeColors.primaryHover);
    root.style.setProperty("--color-secondary", themeColors.secondary);

    root.style.setProperty("--color-black", themeColors.black);
    root.style.setProperty("--color-white", themeColors.white);
    root.style.setProperty("--color-gray-50", themeColors.gray[50]);
    root.style.setProperty("--color-gray-100", themeColors.gray[100]);
    root.style.setProperty("--color-gray-200", themeColors.gray[200]);
    root.style.setProperty("--color-gray-300", themeColors.gray[300]);
    root.style.setProperty("--color-gray-400", themeColors.gray[400]);
    root.style.setProperty("--color-gray-500", themeColors.gray[500]);
    root.style.setProperty("--color-gray-600", themeColors.gray[600]);
    root.style.setProperty("--color-gray-700", themeColors.gray[700]);
    root.style.setProperty("--color-gray-800", themeColors.gray[800]);
    root.style.setProperty("--color-gray-900", themeColors.gray[900]);

    root.style.setProperty("--color-success", themeColors.success);
    root.style.setProperty("--color-error", themeColors.error);
    root.style.setProperty("--color-warning", themeColors.warning);
    root.style.setProperty("--color-info", themeColors.info);

    root.style.setProperty(
      "--color-bg-primary",
      themeColors.background.primary
    );
    root.style.setProperty(
      "--color-bg-secondary",
      themeColors.background.secondary
    );
    root.style.setProperty("--color-bg-dark", themeColors.background.dark);
    root.style.setProperty("--color-bg-accent", themeColors.background.accent);
    root.style.setProperty("--color-bg-card", themeColors.background.card);
    root.style.setProperty(
      "--color-bg-elevated",
      themeColors.background.elevated
    );

    root.style.setProperty("--color-text-primary", themeColors.text.primary);
    root.style.setProperty(
      "--color-text-secondary",
      themeColors.text.secondary
    );
    root.style.setProperty("--color-text-muted", themeColors.text.muted);
    root.style.setProperty("--color-text-light", themeColors.text.light);
    root.style.setProperty("--color-text-inverse", themeColors.text.inverse);
    root.style.setProperty("--color-text-accent", themeColors.text.accent);

    root.style.setProperty("--color-border-light", themeColors.border.light);
    root.style.setProperty("--color-border-medium", themeColors.border.medium);
    root.style.setProperty("--color-border-dark", themeColors.border.dark);
    root.style.setProperty("--color-border-accent", themeColors.border.accent);
    root.style.setProperty(
      "--color-border-primary",
      themeColors.border.primary
    );
  }
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  description: string;
  details: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type Theme = "light" | "dark";
type Category =
  | "All"
  | "T-Shirts"
  | "Outerwear"
  | "Dresses"
  | "Footwear"
  | "Sweaters"
  | "Bottoms";
type ActiveSection =
  | "home"
  | "newCollection"
  | "products"
  | "about"
  | "newsletter"
  | "contact";

const getCartFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const getThemeFromStorage = (): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme as Theme;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
};

const products: Product[] = [
  {
    id: 1,
    name: "Signature Cotton T-Shirt",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Our signature cotton t-shirt with a minimalist design and premium feel.",
    details:
      "Crafted from 100% organic cotton, this t-shirt offers unparalleled comfort and breathability. Features a fitted silhouette and durable stitching for long-lasting wear.",
    category: "T-Shirts",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1622290291467-3f93d038d4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Timeless denim jacket with a modern fit.",
    details:
      "A wardrobe staple featuring a button-front closure, chest pockets, and adjustable cuffs. Made from high-quality denim with a subtle stretch for comfort and durability.",
    category: "Outerwear",
  },
  {
    id: 3,
    name: "Linen Blend Dress",
    price: 89.99,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYSRHHQRR6U2kLkzHRmaX1KbwXc4bQFlLCuGKMGOxia0yg0XY5veVrCg5w4MwTJruOUcSpUQcTS4aCxn3kCdZ1HcGDkqHep4OS-Q8s2n0pNaSpDJO_VATC9Q",
    hoverImage:
      "https://images.unsplash.com/photo-1619191163428-4a7d0799b8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Elegant linen blend dress perfect for summer.",
    details:
      "Lightweight and breathable, this dress features a relaxed fit with a subtle texture. Ideal for both casual outings and dressier occasions.",
    category: "Dresses",
  },
  {
    id: 4,
    name: "Minimalist Sneakers",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Clean and modern sneakers for everyday wear.",
    details:
      "Designed with a minimalist aesthetic, these sneakers feature a lightweight sole and breathable upper material. Perfect for pairing with any outfit.",
    category: "Footwear",
  },
  {
    id: 5,
    name: "Oversized Sweater",
    price: 69.99,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRGVRGLiQSqRP3Uqity8Ks0wRp2yv9QywrIrDD3qD-psItG4ZUijyB6amqqLRBMK0-nurkgj4GQuSdFrwSNFYp3K56ZFkZ3k8SO2EAjRcEteLId_YIdBf7Cjw",
    hoverImage:
      "https://images.unsplash.com/photo-1631541909061-71e349d1f203?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Cozy oversized sweater for colder days.",
    details:
      "Made from a soft blend of materials, this sweater offers warmth and comfort. Features a relaxed fit with ribbed cuffs and hem for a polished look.",
    category: "Sweaters",
  },
  {
    id: 6,
    name: "High Waist Trousers",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1583496702414-c3372525c6ce?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1565790603015-1e60e41cf63e?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Stylish high-waisted trousers with a tailored fit.",
    details:
      "These trousers feature a high waist design with belt loops and a zipper closure. Crafted from premium materials for a smooth feel and lasting durability.",
    category: "Bottoms",
  },
];

const newCollectionProducts: Product[] = [
  {
    id: 101,
    name: "Cyber Punk Hoodie",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1620799139834-6b8f844e5320?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Futuristic hoodie with neon accents and cyberpunk aesthetic.",
    details:
      "Made with high-tech fabric featuring LED strips and glow-in-the-dark elements. Perfect for the digital age.",
    category: "Outerwear",
  },
  {
    id: 102,
    name: "Metallic Bomber Jacket",
    price: 149.99,
    image:
      "https://www.oneteaspoon.com.au/cdn/shop/files/25691_SILVER_STANDARD_02_3d85f3c5-9899-4117-8d4c-1579b7bd1279.jpg?crop=center&height=826&v=1699597855&width=996",
    hoverImage:
      "https://images.unsplash.com/photo-1586195584790-b7b6a7dbba77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Reflective metallic bomber with future-forward design.",
    details:
      "Constructed with reflective metallic material and oversized fit. Features asymmetric zippers and tech-wear details.",
    category: "Outerwear",
  },
  {
    id: 103,
    name: "Holographic Crop Top",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1620799140747-b90f5dbc4f6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Iridescent crop top that changes color with movement.",
    details:
      "Made with holographic fabric that shifts between multiple colors. Features a fitted silhouette and futuristic cut.",
    category: "T-Shirts",
  },
  {
    id: 104,
    name: "Neon Platform Boots",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "LED-enhanced platform boots for the modern rebel.",
    details:
      "Features built-in LED lights, shock-absorbing soles, and waterproof construction. Perfect for night adventures.",
    category: "Footwear",
  },
  {
    id: 105,
    name: "Tech Cargo Pants",
    price: 119.99,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/5d1741d1-8b14-4818-ba0b-f1fbaaf4ff0e/M+NK+TCH+WVN+CARGO+PANT.png",
    hoverImage:
      "https://images.unsplash.com/photo-1586195556839-47c60c7ac27d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Multi-pocket cargo pants with tech-wear functionality.",
    details:
      "Features multiple zip pockets, adjustable straps, and water-resistant fabric. Designed for urban exploration.",
    category: "Bottoms",
  },
  {
    id: 106,
    name: "Geometric Mesh Dress",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Avant-garde mesh dress with geometric cutouts.",
    details:
      "Constructed with architectural precision featuring geometric mesh panels and sculptural silhouette.",
    category: "Dresses",
  },
];

const categories: Category[] = [
  "All",
  "T-Shirts",
  "Outerwear",
  "Dresses",
  "Footwear",
  "Sweaters",
  "Bottoms",
];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  appClass: string;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  appClass: `min-h-screen ${inter.className}`,
});
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedTheme = getThemeFromStorage();
    setTheme(storedTheme);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const hasStoredTheme = localStorage.getItem("theme");
      if (!hasStoredTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, [isHydrated]);

  const toggleTheme = (): void => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const appClass = useMemo(() => {
    const bgColor = theme === "light" ? "bg-white" : "bg-[#0A0A0A]";
    const textColor = theme === "light" ? "text-black" : "text-[#E5E7EB]";

    return `min-h-screen ${inter.className} ${bgColor} ${textColor}`;
  }, [theme]);

  useEffect(() => {
    if (!isHydrated) return;

    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      applyColorVariables(theme === "dark");
    }
  }, [theme, isHydrated]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, appClass }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const useThemeColors = () => {
  const { theme } = useTheme();
  return useMemo(() => createColorSystem(theme === "dark"), [theme]);
};
interface ProductsContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cartItemQuantity: number;
  addToCart: (product: Product, quantity?: number) => void;
  setCartItemQuantity: (quantity: number) => void;
  removeFromCart: (productId: number) => void;
  handleCartItemQuantityChange: (
    productId: number,
    newQuantity: number
  ) => void;
  totalPriceInCart: number;
}
const ProductsContext = createContext<ProductsContextType>({
  cart: [],
  setCart: () => null,
  selectedProduct: null,
  selectedCategory: "All",
  setSelectedCategory: () => null,
  showCart: false,
  setShowCart: () => null,
  cartItemQuantity: 0,
  addToCart: () => null,
  setCartItemQuantity: () => null,
  removeFromCart: () => null,
  handleCartItemQuantityChange: () => null,
  totalPriceInCart: 0,
  setSelectedProduct: () => null,
});
const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(1);

  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product, quantity: number = 1): void => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } else {
      const updatedCart = [...cart, { product, quantity }];
      setCart(updatedCart);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }

    if (showWishlist) {
      setShowWishlist(false);
    }
    if (!showCart) {
      setShowCart(true);
    }
  };

  const removeFromCart = (productId: number): void => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const updateCartItemQuantity = (
    productId: number,
    newQuantity: number
  ): void => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const totalPriceInCart = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCartItemQuantityChange = (
    productId: number,
    newQuantity: number
  ): void => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(productId, newQuantity);
  };

  return (
    <ProductsContext.Provider
      value={{
        cart,
        setCart,
        selectedProduct,
        selectedCategory,
        setSelectedCategory,
        showCart,
        setShowCart,
        cartItemQuantity,
        setSelectedProduct,
        addToCart,
        setCartItemQuantity,
        removeFromCart,
        handleCartItemQuantityChange,
        totalPriceInCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
interface LayoutContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  topRef: React.RefObject<HTMLDivElement>;
  homeRef: React.RefObject<HTMLDivElement>;
  productsRef: React.RefObject<HTMLDivElement>;
  newCollectionRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  blogSection: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement>) => void;
  scrollToTop: () => void;
}
const LayoutContext = createContext<LayoutContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => null,
  activeSection: "home",
  setActiveSection: () => null,
  topRef: { current: null },
  homeRef: { current: null },
  productsRef: { current: null },
  newCollectionRef: { current: null },
  aboutRef: { current: null },
  blogSection: { current: null },
  contactRef: { current: null },
  scrollToSection: () => null,
  scrollToTop: () => null,
});
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const homeRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const newCollectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const blogSection = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (): void => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement>
  ): void => {
    setIsMobileMenuOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + 200;

      const aboutSection = aboutRef.current?.offsetTop || 0;
      const productsSection = productsRef.current?.offsetTop || 0;
      const newCollectionSection = newCollectionRef.current?.offsetTop || 0;
      const blogSectionTop = blogSection.current?.offsetTop || 0;
      const contactSection = contactRef.current?.offsetTop || 0;

      if (scrollPosition < aboutSection) {
        setActiveSection("home");
      } else if (scrollPosition < productsSection) {
        setActiveSection("about");
      } else if (scrollPosition < newCollectionSection) {
        setActiveSection("products");
      } else if (scrollPosition < blogSectionTop) {
        setActiveSection("newCollection");
      } else if (scrollPosition < contactSection) {
        setActiveSection("newsletter");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        activeSection,
        setActiveSection,
        topRef,
        homeRef,
        productsRef,
        newCollectionRef,
        aboutRef,
        blogSection,
        scrollToSection,
        scrollToTop,
        contactRef,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
interface CartItemProps {
  product: Product;
  quantity: number;
}
const CartItem = ({ product, quantity }: CartItemProps) => {
  const { handleCartItemQuantityChange, removeFromCart } = useProducts();
  const themeColors = useThemeColors();

  return (
    <div
      key={product.id}
      className="flex items-center gap-6 border-b-2 border-gray-200 dark:border-gray-600 pb-6"
    >
      <div className="w-20 h-24 bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-1 right-1 px-2 py-1 text-xs font-black ${anton.className}`}
          style={{
            backgroundColor: themeColors.primary,
            color: themeColors.black,
          }}
        >
          ${product.price.toFixed(0)}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-black text-base text-black dark:text-white mb-2">
          {product.name.toUpperCase()}
        </h3>
        <p
          className={`text-sm text-gray-600 dark:text-gray-400 mb-4 ${inter.className}`}
        >
          {product.category}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              handleCartItemQuantityChange(product.id, quantity - 1)
            }
            className="p-2 transition-colors"
            style={{
              background: themeColors.white,
              color: themeColors.black,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = themeColors.primary;
              e.currentTarget.style.color = themeColors.black;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = themeColors.white;
              e.currentTarget.style.color = themeColors.black;
            }}
          >
            <Minus size={18} color={themeColors.black} />
          </button>
          <span className="w-12 text-center font-black text-base text-black dark:text-white">
            {quantity}
          </span>
          <button
            onClick={() =>
              handleCartItemQuantityChange(product.id, quantity + 1)
            }
            className="p-2 transition-colors"
            style={{
              background: themeColors.white,
              color: themeColors.black,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = themeColors.primary;
              e.currentTarget.style.color = themeColors.black;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = themeColors.white;
              e.currentTarget.style.color = themeColors.black;
            }}
          >
            <Plus size={18} color={themeColors.black} />
          </button>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(product.id)}
        className="text-red-500 hover:text-red-700 transition-colors p-2"
      >
        <X size={20} />
      </button>
    </div>
  );
};
const Cart = () => {
  const { cart, setShowCart, totalPriceInCart } = useProducts();
  const { toast } = useToast();
  const themeColors = useThemeColors();
  const { theme } = useTheme();

  return (
    <>
      <div className="space-y-6 mb-10 pt-4">
        {cart.length === 0 ? (
          <div
            className={`text-center py-8 text-gray-500 dark:text-gray-400 ${inter.className}`}
          >
            Loading cart...
          </div>
        ) : (
          cart.map(({ product, quantity }) => (
            <CartItem key={product.id} product={product} quantity={quantity} />
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div
          className="border-t-2 pt-8"
          style={{ borderTopColor: themeColors.primary }}
        >
          <div className="flex justify-between items-center mb-8">
            <span
              className={`font-black text-xl tracking-wide ${anton.className}`}
              style={{ color: themeColors.text.primary }}
            >
              TOTAL:
            </span>
            <span
              className={`font-black text-2xl ${anton.className}`}
              style={{ color: themeColors.text.primary }}
            >
              ${totalPriceInCart.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Checkout functionality is being developed!",
                duration: 3000,
              });
              setShowCart(false);
            }}
            className={`w-full py-5 font-black text-lg transition-all transform hover:scale-105 tracking-wide ${anton.className}`}
            style={{
              background:
                theme === "dark" ? themeColors.black : themeColors.primary,
              color: theme === "dark" ? themeColors.primary : themeColors.black,
              border: "none",
              boxShadow: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = themeColors.primary;
              e.currentTarget.style.color = themeColors.black;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                theme === "dark" ? themeColors.black : themeColors.primary;
              e.currentTarget.style.color =
                theme === "dark" ? themeColors.primary : themeColors.black;
            }}
          >
            CHECKOUT
          </button>
        </div>
      )}
    </>
  );
};
const CartSidebar = () => {
  const { cart, showCart, setShowCart } = useProducts();
  const themeColors = useThemeColors();

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCart]);

  return (
    <>
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[50]"
          onClick={() => setShowCart(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 z-[60] transform transition-transform duration-300 ease-in-out ${
          showCart ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-[#1A1A1A] shadow-xl border-l-4`}
        style={{ borderLeftColor: themeColors.primary }}
      >
        <div className="p-4 sm:p-8 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-black dark:text-white tracking-wide">
              CART
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-black dark:text-white hover:text-black dark:hover:text-black p-2 transition-colors sm:hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div
              className={`text-center py-8 text-gray-500 dark:text-gray-400 text-lg ${inter.className}`}
            >
              Your cart is empty
            </div>
          ) : (
            <Cart />
          )}
        </div>
      </div>
    </>
  );
};
const MobileMenuSidebar = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    scrollToSection,
    activeSection,
    homeRef,
    productsRef,
    newCollectionRef,
    aboutRef,
    blogSection,
    contactRef,
  } = useLayout();
  const themeColors = useThemeColors();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMenuItemClick = (sectionRef: RefObject<HTMLDivElement>) => {
    scrollToSection(sectionRef);
    setIsMobileMenuOpen(false);
  };

  const getMenuButtonStyles = (isActive: boolean) => ({
    className: `w-full text-left py-4 px-6 font-black text-lg transition-all transform hover:scale-105 tracking-wide ${
      isActive
        ? "text-black"
        : "hover:text-black text-black dark:text-white dark:hover:text-black"
    }`,
    style: {
      backgroundColor: isActive ? themeColors.primary : "transparent",
    },
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = themeColors.primary;
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = "transparent";
      }
    },
  });

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[50]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 w-72 z-[60] transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-[#1A1A1A] shadow-xl border-r-4`}
        style={{ borderRightColor: themeColors.primary }}
      >
        <div className="p-8 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-black dark:text-white tracking-wide">
              MENU
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black dark:text-white hover:text-black dark:hover:text-black p-3 transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={28} />
            </button>
          </div>
          <nav className="space-y-6">
            <button
              onClick={() => handleMenuItemClick(homeRef)}
              {...getMenuButtonStyles(activeSection === "home")}
            >
              HOME
            </button>
            <button
              onClick={() => handleMenuItemClick(newCollectionRef)}
              {...getMenuButtonStyles(activeSection === "newCollection")}
            >
              NEW COLLECTION
            </button>
            <button
              onClick={() => handleMenuItemClick(productsRef)}
              {...getMenuButtonStyles(activeSection === "products")}
            >
              CATALOG
            </button>
            <button
              onClick={() => handleMenuItemClick(aboutRef)}
              {...getMenuButtonStyles(activeSection === "about")}
            >
              ABOUT BRAND
            </button>
            <button
              onClick={() => handleMenuItemClick(blogSection)}
              {...getMenuButtonStyles(activeSection === "newsletter")}
            >
              BLOG
            </button>
            <button
              onClick={() => handleMenuItemClick(contactRef)}
              {...getMenuButtonStyles(activeSection === "contact")}
            >
              CONTACT US
            </button>
            <ToggleThemeButton />
          </nav>
        </div>
      </div>
    </>
  );
};
interface HeaderNavItemProps {
  title: string;
  sectionRef: RefObject<HTMLDivElement>;
}
const HeaderNavItem = ({ title, sectionRef }: HeaderNavItemProps) => {
  const { scrollToSection, activeSection } = useLayout();
  const themeColors = useThemeColors();

  const isActive =
    (title === "NEW COLLECTION" && activeSection === "newCollection") ||
    (title === "CATALOG" && activeSection === "products") ||
    (title === "ABOUT BRAND" && activeSection === "about") ||
    (title === "BLOG" && activeSection === "newsletter") ||
    (title === "CONTACT US" && activeSection === "contact");

  return (
    <button
      onClick={() => scrollToSection(sectionRef)}
      className={`font-medium text-xs lg:text-sm transition-all hover:scale-105 tracking-wide px-4 h-full flex items-center ${
        isActive
          ? "text-black"
          : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-black"
      }`}
      style={{
        backgroundColor: isActive ? themeColors.primary : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = themeColors.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      {title}
    </button>
  );
};
const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const themeColors = useThemeColors();

  return (
    <button
      onClick={toggleTheme}
      className="w-full h-full flex items-center justify-center text-black dark:text-white hover:text-black dark:hover:text-black transition-all px-6"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = themeColors.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )}
    </button>
  );
};

const PromoBanner = () => {
  const themeColors = useThemeColors();
  return (
    <div
      className="text-black py-2 overflow-hidden"
      style={{ backgroundColor: themeColors.primary }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-sm font-black tracking-wide mx-8">
          *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR
          NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION
          *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR
          NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION
          *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR
          NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION
          *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR
          NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION
          *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR
          NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION
          *** OPEN FOR NEW COLLECTION *** OPEN FOR NEW COLLECTION *** OPEN FOR
          NEW
        </span>
      </div>
    </div>
  );
};

const Header = () => {
  const { cart, setShowCart } = useProducts();
  const {
    setIsMobileMenuOpen,
    productsRef,
    newCollectionRef,
    aboutRef,
    blogSection,
    scrollToTop,
    scrollToSection,
    contactRef,
  } = useLayout();
  const themeColors = useThemeColors();

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0A0A0A] backdrop-blur-md">
      <PromoBanner />

      <div className="border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-stretch h-16 justify-between">
          <div className="flex items-stretch">
            <button
              className="lg:hidden px-4 text-black dark:text-white hover:text-black dark:hover:text-black transition-colors flex items-center h-full"
              style={
                {
                  "--hover-bg": themeColors.primary,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={scrollToTop}
              className="text-lg font-black tracking-wider hover:scale-110 transition-transform text-black dark:text-white md:border-r border-gray-300 dark:border-gray-600 px-6 flex items-center gap-2 h-full"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-black dark:text-white"
              >
                <path
                  d="M3 12 L9 6 L9 9 L15 3 L21 9 L15 15 L15 12 L9 18 Z"
                  fill="currentColor"
                  className="text-black dark:text-white"
                />
                <path
                  d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12"
                  stroke={themeColors.primary}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="7" r="1" fill={themeColors.primary} />
                <circle cx="17" cy="17" r="1" fill={themeColors.primary} />
              </svg>
              <span>COLLISION</span>
            </button>
            <div className="hidden lg:block border-r border-gray-300 dark:border-gray-600 flex items-center h-full">
              <ToggleThemeButton />
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 flex items-center justify-center">
              <nav className="hidden lg:flex items-stretch h-full">
                <HeaderNavItem
                  title="NEW COLLECTION"
                  sectionRef={newCollectionRef}
                />
                <HeaderNavItem title="CATALOG" sectionRef={productsRef} />
                <HeaderNavItem title="ABOUT BRAND" sectionRef={aboutRef} />
                <HeaderNavItem title="BLOG" sectionRef={blogSection} />
                <HeaderNavItem title="CONTACT US" sectionRef={contactRef} />
              </nav>
            </div>

            <div className="flex items-stretch">
              <button
                onClick={() => setShowCart(true)}
                className="border-l border-gray-300 dark:border-gray-600 px-6 flex items-center h-full gap-2 hover:text-black dark:text-white dark:hover:text-black transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="sm:hidden">
                  <ShoppingCart />({totalItemsInCart})
                </span>
                <span className="hidden sm:block font-medium">
                  CART ({totalItemsInCart})
                </span>
              </button>
              <button
                onClick={() => scrollToSection(productsRef)}
                className="hidden lg:block bg-black dark:bg-white text-white dark:text-black px-6 font-bold hover:scale-105 transition-all hover:bg-gray-900 dark:hover:bg-gray-200 flex items-center h-full"
              >
                SHOP ALL NEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const { homeRef } = useLayout();
  return (
    <section
      ref={homeRef}
      className="relative bg-white dark:bg-[#0A0A0A] py-0 overflow-hidden"
    >
      <div className="container mx-12 my-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
          <div className="space-y-8 w-full">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black leading-[0.85] text-black dark:text-white">
              Feel young,
              <br />
              be unstoppable.
            </h1>

            <h3 className="text-base font-normal text-gray-600 dark:text-gray-400 leading-relaxed w-full -ml-10 sm:ml-0 p-8">
              From concept to execution, we craft timeless identities that
              resonate with our audience.
            </h3>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end h-80 lg:h-96">
            <div className="absolute top-16 right-16 z-10 transform -rotate-45">
              <svg
                width="200"
                height="150"
                viewBox="0 0 200 150"
                fill="currentColor"
                className="text-black dark:text-white"
              >
                <path
                  d="M 90 80 Q 82 68 74 57 Q 66 46 58 37 Q 50 28 48 20 Q 48 12 54 10 Q 60 10 66 16 Q 72 22 78 30 Q 84 38 88 48 Q 92 58 91 68 Q 90 74 90 80 Z"
                  fill="currentColor"
                />
                <circle cx="68" cy="25" r="1.5" fill="white" opacity="0.8" />
                <circle cx="75" cy="35" r="1" fill="white" opacity="0.6" />
                <circle cx="82" cy="45" r="1.2" fill="white" opacity="0.7" />
                <path
                  d="M 70 30 Q 73 32 76 30 Q 79 28 82 30"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M 78 40 Q 81 42 84 40 Q 87 38 90 40"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M 118 78 Q 126 66 134 56 Q 142 46 150 36 Q 158 26 160 18 Q 160 10 154 8 Q 148 8 142 14 Q 136 20 130 28 Q 124 36 120 46 Q 116 56 117 66 Q 118 72 118 78 Z"
                  fill="currentColor"
                />
                <circle cx="148" cy="25" r="1.5" fill="white" opacity="0.8" />
                <circle cx="141" cy="35" r="1" fill="white" opacity="0.6" />
                <circle cx="134" cy="45" r="1.2" fill="white" opacity="0.7" />
                <path
                  d="M 146 30 Q 143 32 140 30 Q 137 28 134 30"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M 138 40 Q 135 42 132 40 Q 129 38 126 40"
                  stroke="white"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M 65 95 Q 65 80 68 72 Q 74 66 85 63 Q 100 60 115 63 Q 126 66 132 72 Q 135 80 135 95 Q 135 108 130 112 Q 120 108 100 107 Q 80 108 70 112 Q 65 108 65 95 Z"
                  fill="currentColor"
                />
                <circle cx="75" cy="105" r="1.2" fill="white" opacity="0.7" />
                <circle cx="82" cy="110" r="1" fill="white" opacity="0.6" />
                <circle cx="88" cy="106" r="0.8" fill="white" opacity="0.8" />
                <circle cx="95" cy="109" r="1.1" fill="white" opacity="0.5" />
              </svg>
            </div>
            <div
              className="absolute -top-12 -right-20 h-full opacity-30 transform rotate-45"
              style={{ height: "calc(100% + 3rem)" }}
            >
              <svg
                width="200"
                height="450"
                viewBox="0 0 200 450"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="M60,420 L80,400 L120,400 L140,420 L140,460 L120,480 L80,480 L60,460 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,380 L80,360 L120,360 L140,380 L140,420 L120,440 L80,440 L60,420 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,340 L80,320 L120,320 L140,340 L140,380 L120,400 L80,400 L60,380 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,300 L80,280 L120,280 L140,300 L140,340 L120,360 L80,360 L60,340 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,260 L80,240 L120,240 L140,260 L140,300 L120,320 L80,320 L60,300 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,220 L80,200 L120,200 L140,220 L140,260 L120,280 L80,280 L60,260 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,180 L80,160 L120,160 L140,180 L140,220 L120,240 L80,240 L60,220 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,140 L80,120 L120,120 L140,140 L140,180 L120,200 L80,200 L60,180 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,100 L80,80 L120,80 L140,100 L140,140 L120,160 L80,160 L60,140 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,60 L80,40 L120,40 L140,60 L140,100 L120,120 L80,120 L60,100 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,20 L80,0 L120,0 L140,20 L140,60 L120,80 L80,80 L60,60 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M60,-20 L80,-40 L120,-40 L140,-20 L140,20 L120,40 L80,40 L60,20 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useProducts();
  const themeColors = useThemeColors();

  const handleCardClick = () => {
    addToCart(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-[#1A1A1A] border border-black dark:border-gray-600 transition-all duration-300 transform h-full flex flex-col cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = themeColors.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = themeColors.black;
      }}
    >
      <div className="relative overflow-hidden aspect-[4/5] flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div
        className="flex-1 flex flex-col border-t border-black dark:border-gray-600 transition-colors"
        style={
          {
            "--group-hover-bg": themeColors.primary,
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          const parent = e.currentTarget.closest(".group");
          if (parent) {
            e.currentTarget.style.backgroundColor = themeColors.primary;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <div className="flex-1 p-8 flex justify-between items-center">
          <div className="flex flex-col items-start justify-center flex-1">
            <h4 className="font-black text-xl md:text-2xl mb-2 text-black dark:text-white leading-tight tracking-wide text-left">
              {product.name.toUpperCase()}
            </h4>
            <p
              className={`text-base font-semibold text-gray-600 dark:text-gray-400 ${inter.className}`}
            >
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const ProductsSection = () => {
  const { selectedCategory, setSelectedCategory } = useProducts();
  const { productsRef } = useLayout();
  const themeColors = useThemeColors();
  const { theme } = useTheme();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section
      ref={productsRef}
      className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A]"
    >
      <div className="w-full">
        <div className="text-center mb-20 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-black dark:text-white">
            COLLECTION
          </h2>
          <p
            className={`text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed ${inter.className}`}
          >
            Curated pieces that define the streets and echo through the culture
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-20 px-4">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 font-black text-base md:text-lg transition-all transform hover:scale-105 tracking-wide`}
                style={{
                  backgroundColor: isActive
                    ? themeColors.primary
                    : theme === "dark"
                    ? themeColors.background.elevated
                    : themeColors.black,
                  color: isActive
                    ? themeColors.black
                    : theme === "dark"
                    ? themeColors.text.primary
                    : themeColors.white,
                  boxShadow: isActive
                    ? "0 2px 8px 0 rgba(0,0,0,0.10)"
                    : undefined,
                }}
              >
                {category.toUpperCase()}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-full">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewCollectionSection = () => {
  const { newCollectionRef } = useLayout();
  const themeColors = useThemeColors();

  return (
    <section
      ref={newCollectionRef}
      className="py-20 md:py-32 bg-black dark:bg-[#1A1A1A] text-white"
    >
      <div className="w-full">
        <div className="text-center mb-20 px-4">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8"
            style={{ color: themeColors.primary }}
          >
            NEW COLLECTION
          </h2>
          <p
            className={`text-xl md:text-2xl font-medium text-gray-300 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed ${inter.className}`}
          >
            Discover our newest pieces featuring futuristic designs and
            cutting-edge technology. The future of fashion is here.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-full bg-white dark:bg-[#0A0A0A]">
          {newCollectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { aboutRef } = useLayout();
  const themeColors = useThemeColors();

  return (
    <section
      ref={aboutRef}
      className="relative overflow-hidden flex flex-col gap-0 h-full w-full"
    >
      <img
        alt="model front"
        className="absolute left-0 sm:left-[15%] -top-5 sm:-top-10 scale[50%] lg:left-[50px] lg:top-0 lg:scale-[100%] z-20"
        src="https://i.ibb.co/JjxqGxKh/Chat-GPT-Image-5-de-jul-de-2025-23-34-15.png"
      />
      <img
        alt="model back"
        className="hidden xl:block absolute left-[30%] -top-0 scale-[100%] z-40"
        src="https://i.ibb.co/zWGsBW1v/Chat-GPT-Image-5-de-jul-de-2025-23-33-03.png"
      />
      <img
        alt="model side"
        className="hidden lg:block absolute top-0 scale-[100%] -right-[100px] z-20"
        src="https://i.ibb.co/KcGFwFtg/Chat-GPT-Image-5-de-jul-de-2025-23-35-02.png"
      />
      <div className="max-h-[300px] lg:max-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1700901555562-952f0008a11f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwc2t5fGVufDB8fDB8fHww"
          className="w-full h-full object-cover"
          alt="Sky with Clouds"
        />
      </div>
      <div
        className="py-4 border border-t-1 border-b-1 border-l-0 border-r-0 border-gray-600 dark:border-gray-500 z-50 sm:z-10"
        style={{ backgroundColor: themeColors.primary }}
      >
        <div className="flex items-center justify-between px-8 h-full">
          <span
            className="font-black text-sm tracking-wider"
            style={{ color: themeColors.black }}
          >
            SCROLL DOWN
          </span>
          <span
            className="font-black text-sm tracking-wider"
            style={{ color: themeColors.black }}
          >
            <ArrowDown size={24} />
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-[#0A0A0A] text-black dark:text-white flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between w-full px-8 py-12 z-30">
        <div className="w-full lg:w-[50%] space-y-4">
          <p className="text-xs font-black text-black dark:text-white tracking-wider uppercase">
            OUR VALUES
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-black dark:text-white leading-none">
            Our vision
            <br />
            is to connect with
            <br />
            the world trough
          </h2>
        </div>
        <div className="w-full lg:w-[25%] space-y-4 border border-l-0 lg:border-l-1 border-r-0 border-t-1 lg:border-t-0 border-b-0 border-gray-600 dark:border-gray-500 pl-0 lg:pl-8 pt-8 lg:pt-0">
          <h3 className="text-xl font-black text-black dark:text-white tracking-wider uppercase">
            THE STORY OF FOUNDATION
          </h3>
          <p
            className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${inter.className}`}
          >
            Filled with a spirit of fun and freedom, it makes sense that
            Collision was founded on a 1990s road trip that spanned California,
            New Mexico and beyond. Influenced by the experimental and eclectic
            style sensibilities that echoed through the UK in the late 80s,
            founders followed their sense of adventure across America, building
            up their unique vision.
          </p>
        </div>
      </div>
    </section>
  );
};
const BlogSection = () => {
  const { blogSection } = useLayout();
  const themeColors = useThemeColors();

  return (
    <section
      ref={blogSection}
      className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A]"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 text-black dark:text-white">
            STAY CONNECTED
          </h2>
          <p
            className={`text-xl md:text-2xl mb-12 font-medium text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed ${inter.className}`}
          >
            Join our community for exclusive drops, behind-the-scenes content,
            and early access to collections.
          </p>
          <form className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-8 py-5 border-2 border-black dark:border-white bg-white dark:bg-[#1A1A1A] text-black dark:text-white text-lg focus:outline-none ${inter.className}`}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = themeColors.primary;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = themeColors.black;
              }}
            />
            <button
              type="submit"
              className="px-10 py-5 text-black font-black text-lg transition-all transform hover:scale-105 hover:skew-x-2 tracking-wide"
              style={{ backgroundColor: themeColors.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primary;
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
interface FooterSectionProps {
  title: string;
  items: {
    label: string;
    onClick: () => void;
  }[];
}
const FooterSection = ({ title, items }: FooterSectionProps) => {
  const themeColors = useThemeColors();
  return (
    <div>
      <h3
        className="text-xl font-black mb-8 tracking-wide"
        style={{ color: themeColors.primary }}
      >
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            <button
              onClick={item.onClick}
              className={`text-gray-400 transition-colors text-base ${inter.className}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = themeColors.text.secondary;
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Footer = () => {
  const {
    scrollToTop,
    scrollToSection,
    productsRef,
    aboutRef,
    contactRef,
    blogSection,
  } = useLayout();
  const { setSelectedCategory } = useProducts();
  const { toast } = useToast();
  const themeColors = useThemeColors();

  const handleSocialMediaClick = (platform: string) => {
    toast({
      title: "Coming Soon",
      description: `${platform} integration is being developed!`,
      duration: 3000,
    });
  };

  return (
    <footer
      className="py-20 bg-black text-white border-t-4"
      style={{ borderTopColor: themeColors.primary }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <button
              onClick={scrollToTop}
              className="text-3xl font-black tracking-tight mb-8 hover:scale-110 transition-transform"
            >
              <span className="text-white">COLLISION</span>
            </button>
            <p
              className={`text-gray-400 mb-4 text-lg leading-relaxed ${inter.className}`}
            >
              Connecting with the world through streetwear culture.
            </p>
          </div>
          <FooterSection
            title="COLLECTION"
            items={categories.map((category) => ({
              label: category.toUpperCase(),
              onClick: () => {
                setSelectedCategory(category);
                scrollToSection(productsRef);
              },
            }))}
          />
          <FooterSection
            title="COMPANY"
            items={[
              {
                label: "ABOUT US",
                onClick: () => scrollToSection(aboutRef),
              },
              {
                label: "BLOG",
                onClick: () => scrollToSection(blogSection),
              },
              {
                label: "CONTACT",
                onClick: () => scrollToSection(contactRef),
              },
            ]}
          />
          <FooterSection
            title="CONNECT"
            items={[
              {
                label: "INSTAGRAM",
                onClick: () => handleSocialMediaClick("Instagram"),
              },
              {
                label: "TIKTOK",
                onClick: () => handleSocialMediaClick("TikTok"),
              },
              {
                label: "TWITTER",
                onClick: () => handleSocialMediaClick("Twitter"),
              },
            ]}
          />
        </div>
        <div className="border-t border-gray-800 pt-12 text-center text-gray-400">
          <p className={`text-base ${inter.className}`}>
            &copy; {new Date().getFullYear()} COLLISION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
const ContactSection = () => {
  const { contactRef } = useLayout();
  const themeColors = useThemeColors();
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Coming Soon",
      description: "This functionality is being developed!",
      duration: 3000,
    });
  };

  return (
    <section
      ref={contactRef}
      className="py-20 md:py-32 bg-gray-50 dark:bg-[#1A1A1A]"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 text-black dark:text-white">
            CONTACT US
          </h2>
          <p
            className={`text-xl md:text-2xl mb-12 font-medium text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed ${inter.className}`}
          >
            We are here to help you with any questions or concerns you may have.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-black dark:text-white mb-6">
                GET IN TOUCH
              </h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast();
                }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full px-6 py-4 border-2 border-black dark:border-white bg-white dark:bg-[#2D2D2D] text-black dark:text-white text-lg focus:outline-none ${inter.className}`}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = themeColors.primary;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = themeColors.black;
                  }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full px-6 py-4 border-2 border-black dark:border-white bg-white dark:bg-[#2D2D2D] text-black dark:text-white text-lg focus:outline-none ${inter.className}`}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = themeColors.primary;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = themeColors.black;
                  }}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className={`w-full px-6 py-4 border-2 border-black dark:border-white bg-white dark:bg-[#2D2D2D] text-black dark:text-white text-lg focus:outline-none resize-none ${inter.className}`}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = themeColors.primary;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = themeColors.black;
                  }}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-4 text-black font-black text-lg transition-all transform hover:scale-105 tracking-wide"
                  style={{ backgroundColor: themeColors.primary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeColors.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = themeColors.primary;
                  }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-black dark:text-white mb-6">
                CONTACT INFO
              </h3>
              <div className="space-y-6 text-left">
                <div
                  className="bg-white dark:bg-[#2D2D2D] p-6 border-l-4"
                  style={{ borderLeftColor: themeColors.primary }}
                >
                  <h4 className="font-black text-lg text-black dark:text-white mb-2">
                    EMAIL
                  </h4>
                  <button
                    onClick={showToast}
                    className="text-gray-600 dark:text-gray-400 transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text.secondary;
                    }}
                  >
                    hello@collision.com
                  </button>
                </div>
                <div
                  className="bg-white dark:bg-[#2D2D2D] p-6 border-l-4"
                  style={{ borderLeftColor: themeColors.primary }}
                >
                  <h4 className="font-black text-lg text-black dark:text-white mb-2">
                    PHONE
                  </h4>
                  <button
                    onClick={showToast}
                    className="text-gray-600 dark:text-gray-400 transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text.secondary;
                    }}
                  >
                    +1 (555) 123-4567
                  </button>
                </div>
                <div
                  className="bg-white dark:bg-[#2D2D2D] p-6 border-l-4"
                  style={{ borderLeftColor: themeColors.primary }}
                >
                  <h4 className="font-black text-lg text-black dark:text-white mb-2">
                    ADDRESS
                  </h4>
                  <button
                    onClick={showToast}
                    className="text-gray-600 dark:text-gray-400 transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text.secondary;
                    }}
                  >
                    123 Fashion Street
                    <br />
                    New York, NY 10001
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const Sidebar = () => {
  return (
    <>
      <CartSidebar />
      <MobileMenuSidebar />
    </>
  );
};
const StoreContent = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <NewCollectionSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};
const CustomToaster = () => {
  const { toasts } = useToast();
  const themeColors = useThemeColors();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            style={{
              backgroundColor: themeColors.background.card,
              borderColor: themeColors.border.medium,
              color: themeColors.text.primary,
            }}
            className="border-2 shadow-xl"
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle
                  style={{ color: themeColors.text.primary }}
                  className="font-black"
                >
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription
                  style={{ color: themeColors.text.secondary }}
                  className={`${inter.className}`}
                >
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose
              style={{
                color: themeColors.text.muted,
                backgroundColor: themeColors.background.elevated,
                borderColor: themeColors.border.light,
              }}
              className="border rounded-md hover:bg-opacity-80"
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
const MainApp = () => {
  const { topRef } = useLayout();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div
        className={`min-h-screen bg-white text-black ${inter.variable} ${anton.variable}`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div
            className={`text-2xl font-black text-black tracking-wide ${anton.className}`}
          >
            COLLISION
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-white text-black ${inter.variable} ${anton.variable}`}
    >
      <div ref={topRef} />
      <Sidebar />
      <Header />
      <StoreContent />
      <Footer />
      <CustomToaster />
    </div>
  );
};
export default function FashionStore() {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <LayoutProvider>
          <MainApp />
        </LayoutProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
}
