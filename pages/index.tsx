/* eslint-disable @next/next/no-page-custom-font */

import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { Montserrat, Roboto } from "next/font/google";
import { toast, Toaster } from "sonner";
import { TfiPackage } from "react-icons/tfi";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdOutlineComment, MdOutlineLocalPostOffice } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const NAV_LINKS = [
  { name: "Shop", href: "#" },
  { name: "Collections", href: "#" },
  { name: "Pages", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Features", href: "#" },
];

const COLLECTIONS = [
  {
    title: "Summer collection",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    href: "#",
    highlight: false,
  },
  {
    title: "Women collection",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    href: "#",
    highlight: true,
  },
  {
    title: "Men's hoodies",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    href: "#",
    highlight: false,
  },
  {
    title: "Limited sale",
    image: "",
    href: "#",
    highlight: false,
    sale: true,
  },
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Crewneck Sweatshirt",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    price: 49.99,
    rating: 4.5,
    colors: ["#232326", "#ececec", "#ef4444"],
    href: "#",
    isNew: true,
  },
  {
    id: 2,
    name: "Classic Tee",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    price: 29.99,
    rating: 4.0,
    colors: ["#dad9d3", "#232326"],
    href: "#",
    isNew: false,
  },
  {
    id: 3,
    name: "Oversized Shirt",
    image:
      "https://images.unsplash.com/photo-1469398715555-76331a1cc0c6?auto=format&fit=crop&w=400&q=80",
    price: 59.99,
    rating: 5.0,
    colors: ["#ef4444", "#ececec"],
    href: "#",
    isNew: true,
  },
  {
    id: 4,
    name: "Linen Pants",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    price: 39.99,
    rating: 4.2,
    colors: ["#232326", "#dad9d3"],
    href: "#",
    isNew: false,
  },
  {
    id: 5,
    name: "Cotton Polo",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    price: 34.99,
    rating: 4.7,
    colors: ["#ececec", "#ef4444"],
    href: "#",
    isNew: false,
  },
  {
    id: 6,
    name: "Summer Dress",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    price: 69.99,
    rating: 4.9,
    colors: ["#dad9d3", "#232326", "#ef4444"],
    href: "#",
    isNew: true,
  },
  {
    id: 7,
    name: "Basic Hoodie",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    price: 44.99,
    rating: 4.3,
    colors: ["#232326", "#ececec"],
    href: "#",
    isNew: false,
  },
  {
    id: 8,
    name: "Relaxed Fit Shirt",
    image:
      "https://images.unsplash.com/photo-1469398715555-76331a1cc0c6?auto=format&fit=crop&w=400&q=80",
    price: 54.99,
    rating: 4.6,
    colors: ["#ef4444", "#dad9d3"],
    href: "#",
    isNew: false,
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Everything I know about midi skirts and how to wear",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    date: "09 August 2022",
    author: "Alexie Richards",
  },
  {
    id: 2,
    title: "A designer is only as good as the star who wears",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
    date: "09 August 2022",
    author: "Alexie Richards",
  },
  {
    id: 3,
    title: "Strong women and fashion",
    image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=600&q=80",
    date: "09 August 2022",
    author: "Alexie Richards",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2.927V15.5l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967c.15-.46.53-.69.95-.69z" />
        </svg>
      )}
    </div>
  );
}

function ColorDots({ colors }: { colors: string[] }) {
  return (
    <div className="flex gap-1 mt-1">
      {colors.map((color, i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full border border-gray-200 dark:border-gray-700"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  handleAddToCart,
  wishlist,
  toggleWishlist,
}: {
  product: (typeof FEATURED_PRODUCTS)[0];
  handleAddToCart: (product: (typeof FEATURED_PRODUCTS)[0]) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}) {
  return (
    <div className="bg-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-4 flex flex-col group transition hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40 duration-200">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded">
            New
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id.toString())}
          className={`absolute top-3 right-3 text-xl ${
            wishlist.includes(product.id.toString())
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {wishlist.includes(product.id.toString()) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
      <div className="mt-4 flex-1 flex flex-col">
        <a
          href={product.href}
          className={`${montserrat.className} font-extrabold text-lg md:text-xl text-foreground hover:underline leading-tight`}
        >
          {product.name}
        </a>
        <div className="flex items-center gap-3 mt-2 overflow-hidden flex-wrap">
          <span
            className={`${roboto.className} text-xl font-black text-primary`}
          >
            ${product.price.toFixed(2)}
          </span>
          <div className="overflow-hidden">
            <StarRating rating={product.rating} />
          </div>
        </div>
        <ColorDots colors={product.colors} />
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-3 bg-primary text-white text-sm px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function CollectionCard({
  collection,
}: {
  collection: (typeof COLLECTIONS)[0];
}) {
  if (collection.sale) {
    return (
      <div className="bg-primary text-white rounded-lg flex flex-col items-center justify-center p-6 min-h-[180px]">
        <span className={`${montserrat.className} text-lg font-bold mb-2`}>
          Limited Sale
        </span>
        <span className={`${roboto.className} text-2xl font-extrabold mb-2`}>
          Save up to 30% off
        </span>
        <a
          href={collection.href}
          className={`${montserrat.className} bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-gray-100 transition`}
        >
          Shop now
        </a>
      </div>
    );
  }
  return (
    <div className="relative rounded-lg overflow-hidden group min-h-[180px]">
      <img
        src={collection.image}
        alt={collection.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
      />
      <a
        href={collection.href}
        className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <span
          className={`${montserrat.className} text-white text-lg font-semibold`}
        >
          {collection.title}
        </span>
      </a>
    </div>
  );
}

function DealCountdown() {
  const [time, setTime] = useState(60 * 60 * 24 + 60 * 14 + 53); // 1 day, 14 min, 53 sec
  useEffect(() => {
    const interval = setInterval(
      () => setTime((t) => (t > 0 ? t - 1 : 0)),
      1000
    );
    return () => clearInterval(interval);
  }, []);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return (
    <div
      className={`${roboto.className} flex gap-2 text-center text-lg font-bold`}
    >
      <div>
        <div>{hours.toString().padStart(2, "0")}</div>
        <div className="text-xs font-normal">h</div>
      </div>
      <span>:</span>
      <div>
        <div>{minutes.toString().padStart(2, "0")}</div>
        <div className="text-xs font-normal">m</div>
      </div>
      <span>:</span>
      <div>
        <div>{seconds.toString().padStart(2, "0")}</div>
        <div className="text-xs font-normal">s</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(FEATURED_PRODUCTS);
  const [cartItems, setCartItems] = useState<(typeof FEATURED_PRODUCTS)[0][]>(
    []
  );
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  // Wishlist Modal state
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product: (typeof FEATURED_PRODUCTS)[0]) => {
    setCartItems((prev) => [...prev, product]);
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 3000);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const results = FEATURED_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    }

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);
  return (
    <>
      <Head>
        <title>Fashion E-Commerce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <div
        className={`${montserrat.variable} ${roboto.variable} min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        {/* Topbar */}
        {/* Removed mobile header support/location/shop line */}
        {/* Navbar */}
        <header className="w-full bg-white/90 dark:bg-gray-900/90 shadow-sm sticky top-0 z-30 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto w-full">
            <nav className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className={`${montserrat.className} text-2xl font-extrabold tracking-tight text-primary`}
                >
                  HONGO
                </a>
                <button
                  className="lg:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle Menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {menuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
                <ul
                  className={`${montserrat.className} hidden lg:flex flex-wrap gap-6 text-base font-medium`}
                >
                  {NAV_LINKS.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <svg
                    className="absolute left-2 top-1.5 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${roboto.className} rounded-full pl-7 pr-3 py-1.5 bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                </div>
                <a
                  href="#"
                  className={`${montserrat.className} hidden md:inline text-sm hover:text-primary transition-colors`}
                >
                  Account
                </a>
                <button
                  type="button"
                  onClick={() => setWishlistOpen(true)}
                  className={`${montserrat.className} relative hidden md:inline text-sm hover:text-primary transition-colors`}
                >
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setCartOpen((prev) => !prev)}
                    className={`${montserrat.className} relative inline-flex items-center gap-1 text-sm hover:text-primary transition-colors`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                      />
                      <circle cx="7" cy="21" r="1" />
                      <circle cx="17" cy="21" r="1" />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                  {cartOpen && cartItems.length > 0 && (
                    <div
                      ref={cartRef}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-40 p-4 text-sm"
                    >
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
                        {cartItems.map((item) => (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2 overflow-hidden max-w-[180px]">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div className="flex flex-col overflow-hidden">
                                <span className="line-clamp-2 max-w-[140px]">
                                  {item.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ${item.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm font-semibold">
                        <span>Total:</span>
                        <span>
                          $
                          {cartItems
                            .reduce((acc, item) => acc + item.price, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
            {wishlistOpen && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md px-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Wishlist</h3>
                    <button
                      onClick={() => setWishlistOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      &#x2715;
                    </button>
                  </div>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-10">
                      <MdOutlineFavoriteBorder className="mx-auto text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-500">Your wishlist is empty.</p>
                      <p className="text-sm text-gray-400">
                        Start adding your favorite items!
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {wishlist.map((id) => {
                        const product = FEATURED_PRODUCTS.find(
                          (p) => p.id.toString() === id
                        );
                        // Add to Cart handler for wishlist items
                        const addToCart = (
                          product: (typeof FEATURED_PRODUCTS)[0]
                        ) => {
                          setCartItems((prev) => [...prev, product]);
                          toast.success(`${product.name} added to cart`);
                        };
                        return product ? (
                          <li
                            key={id}
                            className="flex items-center gap-3 border-b pb-2"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                ${product.price.toFixed(2)}
                              </p>
                              <button
                                onClick={() => addToCart(product)}
                                className="text-sm text-blue-500 hover:underline"
                              >
                                Add to Cart
                              </button>
                            </div>
                            <button
                              onClick={() => toggleWishlist(id)}
                              className="text-red-500 hover:underline text-sm"
                            >
                              Remove
                            </button>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )}
                  <div className="mt-4 text-right">
                    <button
                      className="text-sm text-primary hover:underline"
                      onClick={() => setWishlistOpen(false)}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}
            {menuOpen && (
              <ul className="lg:hidden flex flex-col gap-4 px-4 pb-4 text-base font-medium">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="block text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="md:hidden">
                  <a
                    href="#"
                    className="block text-foreground hover:text-primary transition-colors"
                  >
                    Account
                  </a>
                </li>
                <li className="md:hidden">
                  <a
                    href="#"
                    className="block text-foreground hover:text-primary transition-colors"
                  >
                    Wishlist
                  </a>
                </li>
              </ul>
            )}
          </div>
        </header>
        {/* Hero Banner */}
        <section className="relative w-full bg-black/80 dark:bg-black/90 min-h-[380px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="relative z-10 max-w-7xl w-full flex flex-col sm:flex-col md:flex-row items-start justify-between px-4 py-16 gap-8">
            <div className="flex-1 flex flex-col gap-6">
              <span className={`${roboto.className} text-lg text-white/80`}>
                This month from $29
              </span>
              <h1
                className={`${montserrat.className} text-4xl md:text-5xl font-extrabold text-white`}
              >
                Summer overcoat
              </h1>
              <button
                onClick={scrollToProducts}
                className={`${montserrat.className} inline-block bg-primary text-white px-6 py-3 rounded font-semibold text-lg shadow hover:bg-primary/90 transition`}
              >
                Shop collection
              </button>
            </div>
            <div className="flex-1 flex justify-center sm:justify-end items-center gap-4 pt-10 sm:pt-20 md:pt-0">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
                alt="Model 1"
                className="rounded-lg w-40 md:w-56 shadow-lg object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
                alt="Model 2"
                className="rounded-lg w-40 md:w-56 shadow-lg object-cover"
              />
            </div>
          </div>
        </section>
        {/* Value Offers Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10 text-center">
          <div className="flex items-center justify-center gap-2">
            <TfiPackage className="w-8 h-8 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm">Free Shipping</span>
              <span className="text-gray-500 text-xs">Standard shipping</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RiVerifiedBadgeLine className="w-8 h-8 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm">Special Discounts</span>
              <span className="text-gray-500 text-xs">Guaranteed savings</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <HiOutlineArchiveBox className="w-8 h-8 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm">Buyers Protection</span>
              <span className="text-gray-500 text-xs">Secure payment</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MdOutlineComment className="w-8 h-8 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm">Customer service</span>
              <span className="text-gray-500 text-xs">Give us feedback</span>
            </div>
          </div>
        </section>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-14">
          {/* Collections */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {COLLECTIONS.map((col, i) => (
              <CollectionCard key={i} collection={col} />
            ))}
          </section>
          {/* Featured Products */}
          <section ref={productsRef}>
            <h2
              className={`${montserrat.className} text-3xl font-extrabold tracking-wide uppercase mb-7 text-primary`}
              style={{ letterSpacing: 2 }}
            >
              Featured products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </section>
          {/* New Arrivals */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-8 my-16">
            <div className="relative w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                alt="New Arrival"
                className="w-full h-auto max-h-[400px] object-cover rounded"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left px-4">
              <h3 className="text-3xl font-bold mb-4">
                New arrival
                <br />
                winter collection
              </h3>
              <p className="text-gray-600 mb-6">
                Lorem ipsum is simply dummy text of the printing typesetting
                industry. Lorem Ipsum has been standard dummy text.
              </p>
              <a
                href="#"
                className="inline-block bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-900 transition"
              >
                Shop the collection
              </a>
            </div>
          </section>
          {/* Deal of the Day */}
          <section className="flex justify-center bg-gradient-to-r from-[#3F3D38] via-[#48443E] to-[#3F3D38] text-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex-1 p-8 flex flex-col justify-center items-center text-center gap-4">
              <span className="text-sm text-yellow-400 font-semibold tracking-widest uppercase">
                Get 30% off on your order
              </span>
              <h3 className="text-3xl font-bold">Deal of the day!</h3>
              <DealCountdown />
              <a
                href="#"
                className="mt-4 bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-100 transition text-base"
              >
                Shop collection
              </a>
            </div>
          </section>
          {/* Blog Preview - Card Layout */}
          <section className="my-20 px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Blog of fashion</h2>
              <p className="text-gray-500 mt-2">
                The freshest and most exciting blogs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="relative rounded overflow-hidden shadow group"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-center px-4 pb-6">
                    <div className="w-full max-w-[90%] text-center">
                      <div className="bg-white bg-opacity-95 p-4 rounded-t">
                        <h4 className="text-xs text-gray-500 font-semibold mb-1">
                          FASHION
                        </h4>
                        <p className="text-sm font-medium text-gray-800 leading-snug">
                          {post.title}
                        </p>
                      </div>
                      <div className="bg-black text-white text-xs text-center px-4 py-2 uppercase tracking-wide rounded-b">
                        {post.date} | by {post.author}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Newsletter */}
          <section className="px-4">
            <div className="py-10 px-6 md:px-12 rounded text-center flex flex-col items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Subscribe to get 30% discount!
              </h2>
              <div className="relative max-w-xl w-full">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full border-b-2 border-gray-400 bg-transparent py-2 pr-24 pl-4 focus:outline-none text-gray-800 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => toast.info("Thank you for subscribing!")}
                  className="absolute right-0 top-0 bottom-0 px-4 text-sm font-medium text-gray-800"
                >
                  <MdOutlineLocalPostOffice className="inline mr-1" /> Subscribe
                </button>
              </div>
            </div>
          </section>
        </main>
        {/* Footer */}
        <footer
          className={`${roboto.className} w-full bg-muted text-gray-500 dark:text-gray-400 text-xs py-4 text-center mt-8`}
        >
          © {new Date().getFullYear()} Fashion E-Commerce. All rights reserved.
        </footer>
      </div>
      <Toaster richColors />
    </>
  );
}
