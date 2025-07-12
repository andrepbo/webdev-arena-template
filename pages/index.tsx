import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  X,
  Search,
  Menu,
  Star,
  Eye,
  Plus,
  Minus,
  Sparkles,
  Shield,
  Truck,
  Clock,
  Gift,
  Sun,
  Moon,
  MapPin,
  Package,
  Ruler,
  Tag,
  Calendar,
  User,
  CreditCard,
  CheckCircle,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  discount?: number;
  condition: string;
  brand: string;
  size: string[];
  color: string;
  material: string;
  year: string;
  dimensions?: string;
  weight?: string;
  seller: string;
  location: string;
  tags: string[];
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface HeaderMenu {
  name: string;
  id: string;
}

interface ShopLinks {
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface SimpleFooterLink {
  label: string;
  onClick?: () => void;
}

type Category =
  | "all"
  | "clothing"
  | "accessories"
  | "shoes"
  | "home"
  | "electronics";

const ThriftStore = () => {
  // Ref for search results dropdown
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  // Refs for sections
  const newArrivalsRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const saleRef = useRef<HTMLDivElement | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? "/" + v.substring(2, 4) : "");
    }
    return v;
  };

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, "").substring(0, 4);
  };

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 3) return v;
    if (v.length <= 6) return `(${v.slice(0, 3)}) ${v.slice(3)}`;
    return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6, 10)}`;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      addToast("Coming soon!", "info");
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Effect to detect click outside search results dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const products: Product[] = [
    {
      id: "1",
      name: "Vintage Denim Jacket",
      category: "clothing",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
      description:
        "Classic vintage denim jacket with authentic wash and distressed details. Perfect for layering and adding a retro touch to any outfit.",
      rating: 4.7,
      discount: 31,
      condition: "excellent",
      brand: "Levi's",
      size: ["S", "M", "L"],
      color: "Indigo Blue",
      material: "100% Cotton Denim",
      year: "1995",
      dimensions: 'Chest: 42", Length: 24"',
      weight: "1.2 lbs",
      seller: "VintageVault",
      location: "Portland, OR",
      tags: ["vintage", "denim", "jacket", "90s", "trending"],
    },
    {
      id: "2",
      name: "Leather Messenger Bag",
      category: "accessories",
      price: 149.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      description:
        "Genuine leather messenger bag with multiple compartments and adjustable strap. Shows beautiful patina from years of use.",
      rating: 4.9,
      discount: 25,
      condition: "very good",
      brand: "Coach",
      size: ["One Size"],
      color: "Cognac Brown",
      material: "Genuine Leather",
      year: "2010",
      dimensions: '15" x 11" x 4"',
      weight: "2.8 lbs",
      seller: "LeatherLegacy",
      location: "New York, NY",
      tags: ["leather", "bag", "professional", "vintage"],
    },
    {
      id: "3",
      name: "Retro Vinyl Player",
      category: "electronics",
      price: 249.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
      description:
        "Fully functional vintage-style record player with modern features including Bluetooth connectivity and USB conversion.",
      rating: 4.8,
      discount: 17,
      condition: "like new",
      brand: "Audio-Technica",
      size: ["One Size"],
      color: "Walnut Wood",
      material: "Wood & Metal",
      year: "2018",
      dimensions: '17" x 14" x 6"',
      weight: "12 lbs",
      seller: "SoundVintage",
      location: "Austin, TX",
      tags: ["electronics", "vinyl", "music", "bluetooth"],
    },
    {
      id: "4",
      name: "Bohemian Maxi Dress",
      category: "clothing",
      price: 79.99,
      originalPrice: 99.99,
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&h=500&fit=crop",
      description:
        "Flowy bohemian maxi dress with intricate embroidery and tassel details. Perfect for festivals or summer evenings.",
      rating: 4.6,
      discount: 20,
      condition: "excellent",
      brand: "Free People",
      size: ["XS", "S", "M", "L"],
      color: "Sunset Orange",
      material: "100% Cotton",
      year: "2019",
      dimensions: 'Length: 52"',
      weight: "0.8 lbs",
      seller: "BohoChic",
      location: "Los Angeles, CA",
      tags: ["boho", "dress", "summer", "embroidered"],
    },
    {
      id: "5",
      name: "Classic Oxford Shoes",
      category: "shoes",
      price: 129.99,
      originalPrice: 179.99,
      image:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&h=500&fit=crop",
      description:
        "Classic wingtip oxford shoes in excellent condition with minimal wear. Perfect for formal occasions.",
      rating: 4.5,
      discount: 28,
      condition: "very good",
      brand: "Allen Edmonds",
      size: ["8", "9", "10", "11"],
      color: "Dark Brown",
      material: "Genuine Leather",
      year: "2015",
      weight: "2.5 lbs",
      seller: "ClassicFootwear",
      location: "Boston, MA",
      tags: ["shoes", "formal", "leather", "classic"],
    },
    {
      id: "6",
      name: "Handmade Wool Rug",
      category: "home",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      description:
        "Beautiful handmade wool rug with traditional Persian design and natural dyes. A true statement piece.",
      rating: 4.9,
      discount: 25,
      condition: "like new",
      brand: "Traditional Weavers",
      size: ["5x7 ft", "6x9 ft"],
      color: "Deep Red & Blue",
      material: "100% Wool",
      year: "2020",
      dimensions: "6' x 9'",
      weight: "15 lbs",
      seller: "RugMaster",
      location: "Denver, CO",
      tags: ["home", "handmade", "persian", "wool"],
    },
  ];

  const categories: Category[] = [
    "all",
    "clothing",
    "accessories",
    "shoes",
    "home",
    "electronics",
  ];

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      (searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const showSearchResults = searchQuery.length > 0;

  const saleProducts = products.filter(
    (product) => product.discount && product.discount > 20
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const headerMenu: HeaderMenu[] = [
    { name: "New", id: "hero" },
    { name: "Categories", id: "categories" },
    { name: "Sale", id: "flash-sale" },
  ];

  const shopLinks: ShopLinks[] = [
    { label: "New Arrivals", ref: newArrivalsRef },
    { label: "Categories", ref: categoriesRef },
    { label: "Sale", ref: saleRef },
  ];

  const companyLinks: SimpleFooterLink[] = [
    { label: "About", onClick: () => addToast("Coming soon!", "info") },
    { label: "Careers", onClick: () => addToast("Coming soon!", "info") },
    { label: "Press", onClick: () => addToast("Coming soon!", "info") },
    { label: "Blog", onClick: () => addToast("Coming soon!", "info") },
  ];

  const supportLinks: SimpleFooterLink[] = [
    { label: "Help Center", onClick: () => addToast("Coming soon!", "info") },
    { label: "Track Order", onClick: () => addToast("Coming soon!", "info") },
    { label: "Returns", onClick: () => addToast("Coming soon!", "info") },
    { label: "Contact", onClick: () => addToast("Coming soon!", "info") },
  ];

  const addToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now().toString();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { id: product.id, price: product.price, quantity: 1 },
      ]);
    }
    setCartOpen(true);
    addToast("Item added to cart!", "success");
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleToggleLike = (productId: string) => {
    setLikedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCheckout = () => {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "zipCode",
      "cardNumber",
      "expiryDate",
      "cvv",
    ];
    const missingFields = requiredFields.filter(
      (field) => !checkoutData[field as keyof typeof checkoutData]
    );

    if (missingFields.length > 0) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    setTimeout(() => {
      setCartItems([]);
      setShowCheckout(false);
      setCartOpen(false);
      addToast("Purchase completed successfully! 🎉", "success");

      setCheckoutData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Sparkles className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            ThriftStore
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Loading amazing finds...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ThriftStore
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Vintage • Sustainable • Unique
                </span>
              </div>
            </motion.div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search treasures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                )}
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {headerMenu.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ y: -1 }}
                  onClick={() =>
                    item.id
                      ? scrollToSection(item.id)
                      : addToast("Coming soon!", "info")
                  }
                  className="relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  {item.name}
                  {item.name === "Sale" && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      HOT
                    </span>
                  )}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-200"></span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search vintage treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Search Results Dropdown below Header */}
      {showSearchResults && (
        <div
          ref={searchResultsRef}
          className="fixed w-full z-40 px-4 sm:px-6 lg:px-8 pt-2"
        >
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 max-w-7xl mx-auto">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 px-2">
              Found {filteredProducts.length} result(s) for &quot;{searchQuery}
              &quot;
            </h3>
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
              {Array.from(
                filteredProducts.slice(0, 8).reduce((acc, product) => {
                  const category = product.category || "Uncategorized";
                  if (!acc.has(category)) acc.set(category, []);
                  acc.get(category)!.push(product);
                  return acc;
                }, new Map<string, typeof filteredProducts>())
              ).map(([category, products]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2 px-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer transition"
                        onClick={() => {
                          setSelectedItem(product);
                          setSearchQuery("");
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-20 right-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-xl z-40 lg:hidden"
          >
            <div className="p-6">
              <nav className="space-y-2">
                {[
                  { name: "New Arrivals", id: "hero" },
                  { name: "Categories", id: "categories" },
                  { name: "Sale", id: "flash-sale" },
                ].map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (item.id) {
                        scrollToSection(item.id);
                      } else {
                        addToast("Coming soon!", "info");
                      }
                    }}
                    className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="hero"
        ref={newArrivalsRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 dark:from-indigo-800 dark:via-purple-900 dark:to-pink-800"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Vintage clothing collection"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-20 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sustainable Fashion Revolution
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                >
                  Discover
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Vintage
                  </span>
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-medium opacity-90">
                    Treasures
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-lg"
                >
                  Curated second-hand fashion and unique finds at unbeatable
                  prices. Every piece tells a story.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("categories")}
                  className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Shop Collection
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToast("Coming soon!", "info")}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                {[
                  { number: "10K+", label: "Happy Customers" },
                  { number: "50K+", label: "Items Sold" },
                  { number: "4.9★", label: "Rating" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedItem(product)}
                    >
                      <div className="aspect-square rounded-xl overflow-hidden mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1">
                        {product.name}
                      </h3>
                      <p className="text-yellow-300 font-bold">
                        ${product.price}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Guarantee",
                desc: "Every item inspected",
              },
              { icon: Truck, title: "Fast Shipping", desc: "Free over $100" },
              { icon: Clock, title: "Easy Returns", desc: "30-day policy" },
              {
                icon: Gift,
                title: "Unique Finds",
                desc: "One-of-a-kind pieces",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-4 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="flash-sale"
        ref={saleRef}
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern
              id="flash-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#flash-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-bold mb-6">
              <Zap className="h-4 w-4 mr-2" />
              LIMITED TIME OFFER
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Flash Sale
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Incredible deals on handpicked vintage items. These prices
              won&apos;t last long!
            </p>

            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { value: "23", label: "Hours" },
                  { value: "45", label: "Minutes" },
                  { value: "12", label: "Seconds" },
                  { value: "67", label: "Items Left" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
                  >
                    <div className="text-2xl font-bold text-orange-500">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {product.discount}% OFF
                  </div>
                </div>

                <button
                  onClick={() => handleToggleLike(product.id)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
                    likedItems.includes(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedItems.includes(product.id) ? "fill-current" : ""
                    }`}
                  />
                </button>

                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating}
                    </span>
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
                      {product.condition}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {product.brand}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-orange-500">
                          ${product.price}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        You save $
                        {(product.originalPrice! - product.price).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedItem(product)}
                        className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                      >
                        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory("all");
                scrollToSection("categories");
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Sale Items
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section
        id="categories"
        ref={categoriesRef}
        className="py-16 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-2xl font-medium capitalize transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-600 shadow-sm"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showSearchResults && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Collection
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Discover unique vintage pieces in our curated collection
              </p>
            </div>
          )}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {(showSearchResults ? [] : filteredProducts).map(
              (product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleLike={handleToggleLike}
                  onViewProduct={setSelectedItem}
                  isLiked={likedItems.includes(product.id)}
                  index={index}
                />
              )
            )}
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ThriftStore</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Discover unique vintage treasures and sustainable fashion that
                tells a story.
              </p>
            </div>
            {/* Shop */}
            <div>
              <h3 className="font-bold mb-6 text-gray-900 dark:text-white">
                Shop
              </h3>
              <ul className="space-y-3">
                {shopLinks.map(({ label, ref }) => (
                  <li key={label}>
                    <button
                      onClick={() =>
                        ref.current?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Support */}
            <div>
              <h3 className="font-bold mb-6 text-gray-900 dark:text-white">
                Support
              </h3>
              <ul className="space-y-2">
                {supportLinks.map(({ label, onClick }) => (
                  <li key={label}>
                    <button
                      onClick={onClick}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company */}
            <div>
              <h3 className="font-bold mb-6 text-gray-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map(({ label, onClick }) => (
                  <li key={label}>
                    <button
                      onClick={onClick}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2024 ThriftStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedItem.name}
                    </h2>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedItem.rating}
                        </span>
                      </div>
                      <span className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
                        {selectedItem.condition}
                      </span>
                      <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                        {selectedItem.brand}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800"
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                          ${selectedItem.price}
                        </span>
                        {selectedItem.originalPrice && (
                          <>
                            <span className="text-xl text-gray-500 line-through">
                              ${selectedItem.originalPrice}
                            </span>
                            <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-100 px-3 py-1 rounded-full text-sm font-medium">
                              {selectedItem.discount}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedItem.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
                          Brand:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedItem.brand}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
                          Size:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedItem.size.join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
                          Color:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedItem.color}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
                          Year:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedItem.year}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
                          Material:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedItem.material}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(selectedItem)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition-colors"
                      >
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggleLike(selectedItem.id)}
                        className={`p-4 rounded-2xl border-2 transition-colors ${
                          likedItems.includes(selectedItem.id)
                            ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        <Heart
                          className={`h-6 w-6 ${
                            likedItems.includes(selectedItem.id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-2xl"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => {
                      const product = products.find((p) => p.id === item.id);
                      if (!product) return null;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ${product.price}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                              >
                                <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <span className="w-8 text-center text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                              >
                                <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold transition-colors"
                    >
                      Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Checkout
                  </h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Full Name *"
                          value={checkoutData.name}
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Email Address *"
                          value={checkoutData.email}
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                      <div className="relative md:col-span-2">
                        <input
                          type="tel"
                          placeholder="Phone Number * (123) 456-7890"
                          value={checkoutData.phone}
                          onChange={(e) => {
                            const formatted = formatPhone(e.target.value);
                            setCheckoutData({
                              ...checkoutData,
                              phone: formatted,
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative md:col-span-2">
                        <input
                          type="text"
                          placeholder="Street Address *"
                          value={checkoutData.address}
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="City *"
                          value={checkoutData.city}
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="ZIP Code *"
                          value={checkoutData.zipCode}
                          onChange={(e) =>
                            setCheckoutData({
                              ...checkoutData,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative md:col-span-2">
                        <input
                          type="text"
                          placeholder="Card Number * (1234 5678 9012 3456)"
                          value={checkoutData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setCheckoutData({
                              ...checkoutData,
                              cardNumber: formatted,
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="MM/YY *"
                          value={checkoutData.expiryDate}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            setCheckoutData({
                              ...checkoutData,
                              expiryDate: formatted,
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="CVV *"
                          value={checkoutData.cvv}
                          onChange={(e) => {
                            const formatted = formatCVV(e.target.value);
                            setCheckoutData({
                              ...checkoutData,
                              cvv: formatted,
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <span className="absolute right-3 top-3 text-red-500">
                          *
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      {cartItems.map((item) => {
                        const product = products.find((p) => p.id === item.id);
                        if (!product) return null;
                        return (
                          <div key={item.id} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              {product.name} x {item.quantity}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              ${(product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                      <div className="border-t dark:border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-gray-900 dark:text-white">
                            Total
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    Complete Purchase
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-20 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-4 rounded-2xl shadow-lg max-w-sm ${
                toast.type === "success"
                  ? "bg-green-500 text-white"
                  : toast.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                {toast.type === "success" && (
                  <CheckCircle className="h-5 w-5" />
                )}
                {toast.type === "error" && <X className="h-5 w-5" />}
                <span className="font-medium">{toast.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProductCard = ({
  product,
  onAddToCart,
  onToggleLike,
  onViewProduct,
  isLiked,
  index,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleLike: (productId: string) => void;
  onViewProduct: (product: Product) => void;
  isLiked: boolean;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {product.discount}% OFF
          </div>
        )}
        <button
          onClick={() => onToggleLike(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400"
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating}
          </span>
          <span className="ml-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
            {product.condition}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 capitalize">
          {product.category}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
          {product.brand}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onViewProduct(product)}
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart(product)}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ThriftStore;
