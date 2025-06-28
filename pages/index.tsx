import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { FiTruck, FiRefreshCcw, FiShield, FiHeadphones } from "react-icons/fi";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  colors: string[];
}

interface Deal {
  id: number;
  title: string;
  description: string;
  image: string;
  endTime: Date;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: Date;
}

// Mock data
const products: Product[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    rating: 4.8,
    image: "https://placehold.co/600x600",
    colors: ["white", "black", "navy"],
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 89.99,
    rating: 4.6,
    image: "https://placehold.co/600x600",
    colors: ["blue", "black", "gray"],
  },
  {
    id: 3,
    name: "Elegant Blouse",
    price: 69.99,
    rating: 4.7,
    image: "https://placehold.co/600x600",
    colors: ["white", "pink", "beige"],
  },
  {
    id: 4,
    name: "Designer Handbag",
    price: 199.99,
    rating: 4.9,
    image: "https://placehold.co/600x600",
    colors: ["brown", "black", "red"],
  },
  {
    id: 5,
    name: "Sportswear Hoodie",
    price: 79.99,
    rating: 4.5,
    image: "https://placehold.co/600x600",
    colors: ["gray", "green", "blue"],
  },
  {
    id: 6,
    name: "Women's Dress",
    price: 129.99,
    rating: 4.7,
    image: "https://placehold.co/600x600",
    colors: ["red", "black", "yellow"],
  },
  {
    id: 7,
    name: "Men's Watch",
    price: 149.99,
    rating: 4.9,
    image: "https://placehold.co/600x600",
    colors: ["black", "brown", "silver"],
  },
  {
    id: 8,
    name: "Sneakers",
    price: 99.99,
    rating: 4.5,
    image: "https://placehold.co/600x600",
    colors: ["white", "black", "blue"],
  },
];

const deals: Deal[] = [
  {
    id: 1,
    title: "50% OFF SUMMER SALE",
    description: "Selected summer clothing",
    image: "https://placehold.co/600x400",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "SPRING COLLECTION",
    description: "New arrivals this season",
    image: "https://placehold.co/600x400",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "WINTER ESSENTIALS",
    description: "Cozy winter clothing",
    image: "https://placehold.co/600x400",
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Summer Fashion Trends 2025",
    excerpt: "Discover the hottest trends for this summer season.",
    image: "https://placehold.co/600x400",
    date: new Date(2025, 3, 15),
  },
  {
    id: 2,
    title: "How to Style a White Shirt",
    excerpt: "7 ways to wear your favorite white shirt.",
    image: "https://placehold.co/600x400",
    date: new Date(2025, 3, 10),
  },
  {
    id: 3,
    title: "Sustainable Fashion Guide",
    excerpt: "Make eco-friendly choices in your wardrobe.",
    image: "https://placehold.co/600x400",
    date: new Date(2025, 3, 5),
  },
];

const keyValues = [
  {
    icon: <FiTruck size={24} />,
    title: "Free Shipping",
    description: "On all orders above $100",
  },
  {
    icon: <FiRefreshCcw size={24} />,
    title: "30 Days Return",
    description: "Easy return policy",
  },
  {
    icon: <FiShield size={24} />,
    title: "Buyer Protection",
    description: "Secure payment methods",
  },
  {
    icon: <FiHeadphones size={24} />,
    title: "Customer Service",
    description: "24/7 support available",
  },
];

// Components
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">FASHION STORE</h1>
            </div>
            <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Women
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Men
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Accessories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Sale
              </a>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="text-gray-700 hover:text-indigo-600 p-2">
              <FaUser className="h-6 w-6" />
            </button>
            <button className="text-gray-700 hover:text-indigo-600 p-2">
              <FaHeart className="h-6 w-6" />
            </button>
            <button className="text-gray-700 hover:text-indigo-600 p-2">
              <FaShoppingCart className="h-6 w-6" />
              <span className="ml-1 font-medium">Cart</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md"
            >
              Women
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md"
            >
              Men
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md"
            >
              Accessories
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md"
            >
              Sale
            </a>
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "SUMMER SALE",
      subtitle: "GET UP TO 50% OFF",
      image: "https://placehold.co/1920x1080",
      cta: "Shop Now",
    },
    {
      title: "SPRING COLLECTION",
      subtitle: "NEW ARRIVALS THIS SEASON",
      image: "https://placehold.co/1920x1080",
      cta: "Discover More",
    },
    {
      title: "WINTER ESSENTIALS",
      subtitle: "COZY WINTER CLOTHING",
      image: "https://placehold.co/1920x1080",
      cta: "Shop Collection",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevClick = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl text-white mb-8">
                {slide.subtitle}
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
      >
        <FaChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
      >
        <FaChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex space-y-2 flex-col">
          <button className="bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <FaHeart className="h-4 w-4 text-gray-700" />
          </button>
          <button className="bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity delay-75">
            <FaShoppingCart className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-800 font-medium">{product.name}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
            <FaStar className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-900 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-1">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = deal.endTime.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deal.endTime]);

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden group">
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold">{deal.title}</h3>
          <p className="text-white/80">{deal.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="text-center">
              <div className="text-gray-800 font-bold">{timeLeft.days}</div>
              <div className="text-xs text-gray-600">Days</div>
            </div>
            <div className="text-center">
              <div className="text-gray-800 font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-gray-600">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-gray-800 font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-600">Min</div>
            </div>
            <div className="text-center">
              <div className="text-gray-800 font-bold">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-600">Sec</div>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <h3 className="text-gray-900 font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
        <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
          Read More →
        </button>
      </div>
    </div>
  );
};

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-gray-900 font-bold text-lg mb-2">Newsletter</h3>
      <p className="text-gray-600 text-sm mb-4">
        Get the latest offers and updates delivered straight to your inbox.
      </p>
      {subscribed ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

const ValueHighlights: React.FC = () => {
  return (
    <div className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyValues.map((value) => (
            <div key={value.title} className="flex items-start space-x-4">
              <div className="text-indigo-600">{value.icon}</div>
              <div>
                <h3 className="text-gray-900 font-bold">{value.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSlider />

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Limited Time Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  New Arrivals
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {products.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Todays Deal
                  </h2>
                  <DealCard deal={deals[0]} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    From The Blog
                  </h2>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>

                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>

        <ValueHighlights />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FASHION STORE</h3>
              <p className="text-gray-400">
                Your destination for quality clothing and accessories at
                affordable prices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Information</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Pinterest
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Fashion Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
