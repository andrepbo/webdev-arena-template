import { useState, useEffect } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  flavors: string[];
  sizes: string[];
  imageUrl: string;
  imageAlt: string;
  description: string;
  nutrition: string;
  seller: string;
  warranty: string;
  additionalInfo: string;
  videoUrl: string;
};

type CartItem = {
  product: Product;
  flavor: string;
  size: string;
  quantity: number;
};

type RecentPurchase = {
  productTitle: string;
  customerName: string;
  location: string;
  timeAgo: string;
  flavor: string;
  size: string;
};

type Tab = {
  id: string;
  label: string;
};

const PRODUCT_DATA: Product = {
  id: "june-berry-pouch",
  title: "Limited Time Only: June Berry Seasonal Pouch - Sweet & Tart Flavor",
  price: 24.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviewCount: 2163,
  flavors: ["Sweet & Tart", "Honey Crisp", "Wild Forest"],
  sizes: ["6-pack", "12-pack", "24-pack"],
  imageUrl: "https://placehold.co/600x600",
  imageAlt: "June Berry Seasonal Pouch",
  description: `Experience the essence of early summer with our limited edition June Berry Seasonal Pouch. We've carefully selected these premium berries at the peak of their flavor to bring you an unmatched taste experience. Each bite delivers a perfect balance of sweetness and tartness, making it an irresistible treat for all. This is a rare opportunity to enjoy a truly seasonal flavor before it's gone!`,
  nutrition: `Energy: 120 kcal, Protein: 2g, Fat: 3g, Carbohydrates: 22g, Fiber: 4g`,
  seller: "Nature's Delight",
  warranty: "Freshness guaranteed",
  additionalInfo:
    "Made with sustainably sourced ingredients. No artificial flavors or preservatives.",
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

const RECENT_PURCHASES: RecentPurchase[] = [
  {
    productTitle: "June Berry Seasonal Pouch",
    customerName: "Sarah J.",
    location: "Seattle, WA",
    timeAgo: "2m ago",
    flavor: "Sweet & Tart",
    size: "12-pack",
  },
  {
    productTitle: "June Berry Seasonal Pouch",
    customerName: "Michael K.",
    location: "Portland, OR",
    timeAgo: "5m ago",
    flavor: "Wild Forest",
    size: "6-pack",
  },
  {
    productTitle: "June Berry Seasonal Pouch",
    customerName: "Emily W.",
    location: "San Francisco, CA",
    timeAgo: "8m ago",
    flavor: "Honey Crisp",
    size: "24-pack",
  },
];

const TABS: Tab[] = [
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "seasonal", label: "Seasonal" },
  { id: "best-sellers", label: "Best Sellers" },
  { id: "snacks", label: "Snacks" },
  { id: "gift-sets", label: "Gift Sets" },
  { id: "on-sale", label: "On Sale" },
];

export default function ProductDetail() {
  const [selectedTab, setSelectedTab] = useState<string>(TABS[0].id);
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    PRODUCT_DATA.flavors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    PRODUCT_DATA.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showOrderConfirmation, setShowOrderConfirmation] =
    useState<boolean>(false);
  const [recentPurchases, setRecentPurchases] =
    useState<RecentPurchase[]>(RECENT_PURCHASES);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPurchase: RecentPurchase = {
        productTitle: PRODUCT_DATA.title,
        customerName: `${faker.person.firstName()} ${faker.person
          .lastName()
          .charAt(0)}.`,
        location: `${faker.location.city()}, ${faker.location.stateAbbr()}`,
        timeAgo: `${Math.floor(Math.random() * 10) + 1}m ago`,
        flavor:
          PRODUCT_DATA.flavors[
            Math.floor(Math.random() * PRODUCT_DATA.flavors.length)
          ],
        size: PRODUCT_DATA.sizes[
          Math.floor(Math.random() * PRODUCT_DATA.sizes.length)
        ],
      };
      setRecentPurchases((prev) => [newPurchase, ...prev].slice(0, 3));
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      product: PRODUCT_DATA,
      flavor: selectedFlavor,
      size: selectedSize,
      quantity,
    };
    setCartItems((prev) => [...prev, newItem]);
    setShowOrderConfirmation(true);
  };

  const handleReturnToStore = () => {
    setShowOrderConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-orange-500 text-white py-2 text-center">
        <p>🚚 Free standard shipping on all orders over $35! 🍃</p>
      </div>
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold text-gray-800">PREMIUM DELIGHTS</div>
        <div className="relative">
          <button className="text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto py-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {showOrderConfirmation ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Successfully Added to Cart!
            </h2>
            <p className="text-gray-600 mb-6">
              {quantity} × {selectedSize} {selectedFlavor} {PRODUCT_DATA.title}
            </p>
            <button
              onClick={handleReturnToStore}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={PRODUCT_DATA.imageUrl}
                  alt={PRODUCT_DATA.imageAlt}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SALE
                </div>
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md">
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="text-orange-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    Limited time offer! Grab this seasonal treat before it's
                    gone!
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Seasonal
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                  Limited Time
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {PRODUCT_DATA.title}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {PRODUCT_DATA.rating} ({PRODUCT_DATA.reviewCount} reviews)
                </span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-orange-500">
                  ${PRODUCT_DATA.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through ml-3">
                  ${PRODUCT_DATA.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-orange-500 font-medium ml-3">
                  Save $
                  {(PRODUCT_DATA.originalPrice - PRODUCT_DATA.price).toFixed(2)}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Flavor
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_DATA.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-4 py-2 rounded-full border transition-colors ${
                        selectedFlavor === flavor
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_DATA.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border transition-colors ${
                        selectedSize === size
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center border rounded-full w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-orange-500"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center py-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-orange-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-orange-500 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 17l4 4 4-4m-4-5v9m-1 1V8a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-700">Free Shipping</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-orange-500 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-700">Easy Returns</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-orange-500 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-700">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Product Details
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p>{PRODUCT_DATA.description}</p>
          </div>
        </div>
        <div className="mt-12 bg-orange-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "These June Berry pouches are absolutely delicious! The perfect balance of sweet and tart. I buy them every season!",
                author: "Emily W.",
              },
              {
                text: "The quality is exceptional compared to other brands. I love that they're sustainably sourced too!",
                author: "Michael K.",
              },
              {
                text: "Perfect snack for on-the-go. My kids love them and I feel good about what they're eating.",
                author: "Sarah J.",
              },
            ].map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-2">"{review.text}"</p>
                <p className="text-sm font-medium text-gray-800">
                  — {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            People Who Bought This Also Liked
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Summer Sunset Pouches",
                price: 19.99,
                image: "https://placehold.co/200x200",
              },
              {
                title: "Autumn Harvest Bites",
                price: 22.99,
                image: "https://placehold.co/200x200",
              },
              {
                title: "Berry Bliss Mix",
                price: 29.99,
                image: "https://placehold.co/200x200",
              },
              {
                title: "Nature's Trail Mix",
                price: 15.99,
                image: "https://placehold.co/200x200",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-800 font-medium mb-1">
                    {product.title}
                  </h3>
                  <p className="text-orange-500 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.22.592 1.929 1.234 2.381 1.234 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.253-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; 2025 Premium Delights. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
