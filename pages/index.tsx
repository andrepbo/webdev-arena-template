import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Search } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

// Sample blog data with full images
const blogPosts = [
  {
    id: 1,
    title: "A Tale Of Backpacking Courage Through Conflict",
    excerpt: "A Tale Of Backpacking Courage Through Conflict.",
    image: "https://i.imgur.com/G2HuAiM.png",
    category: "Tips",
    featured: true,
    date: "Dec 06, 2023",
  },
  {
    id: 2,
    title: "No Fuss, Blue Heron Bridge Snorkle and Scuba Tours",
    excerpt: "No Fuss, Blue Heron Bridge Snorkle and Scuba Tours.",
    image: "https://i.imgur.com/IipShXG.png",
    category: "Travel",
    featured: true,
    date: "Jan 12, 2024",
  },
  {
    id: 3,
    title: "Street Food Tour of Bangkok: A Culinary Adventure",
    excerpt:
      "Experience the vibrant street food culture of Bangkok with our comprehensive guide. From pad thai to mango sticky rice, explore the flavors that make this city unforgettable.",
    image:
      "https://images.unsplash.com/photo-1600066826863-4c1edc2b94a4?q=80&w=2070&auto=format&fit=crop",
    category: "Food & Culture",
    featured: false,
    date: "Feb 20, 2024",
  },
  {
    id: 4,
    title: "A Romantic Escape To Italy's Floating City",
    excerpt: "A Romantic Escape To Italy's Floating City.",
    image: "https://i.imgur.com/fZNww7a.png",
    category: "Hiking",
    featured: true,
    date: "Mar 15, 2024",
  },
  {
    id: 5, // Updated ID to avoid duplication
    title: "Solo Female Travel: Safety Tips and Best Destinations",
    excerpt:
      "Empower yourself with our comprehensive guide to solo female travel. We cover essential safety tips and highlight the top destinations that welcome women traveling alone.",
    image:
      "https://images.unsplash.com/photo-1515410763290-1e9c0cee75b7?q=80&w=2070&auto=format&fit=crop",
    category: "Destinations",
    featured: false,
    date: "Sep 13, 2024",
  },
];

// Sample sponsor data
const sponsors = [
  {
    id: 1,
    name: "TravelGear Co.",
    logo: "https://placehold.co/120x40?text=TravelGear",
  },
  {
    id: 2,
    name: "Adventure Airlines",
    logo: "https://placehold.co/120x40?text=Adventure+Air",
  },
  {
    id: 3,
    name: "World Hotels",
    logo: "https://placehold.co/120x40?text=World+Hotels",
  },
  {
    id: 4,
    name: "Backpackers Co.",
    logo: "https://placehold.co/120x40?text=Backpackers",
  },
];

// Social media links
const socialLinks = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  youtube: "https://youtube.com",
};

// Footer navigation
const footerNav = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Advertise", href: "/advertise" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  resources: [
    { name: "Travel Guides", href: "/guides" },
    { name: "Blog", href: "/blog" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Travel Tips", href: "/tips" },
  ],
  follow: [
    { name: "Instagram", href: socialLinks.instagram },
    { name: "Facebook", href: socialLinks.facebook },
    { name: "Twitter", href: socialLinks.twitter },
    { name: "YouTube", href: socialLinks.youtube },
  ],
};

// Modal Component
const SubscribeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close subscribe modal"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Join Our Travel Community
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to receive our latest travel guides, tips, and stories
          directly to your inbox. No spam, we promise!
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            required
          />
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-6 text-center">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </div>
    </div>
  );
};

export default function TravelBlog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Separate state for menu selection (visual highlight)
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [displayedPosts, setDisplayedPosts] = useState(blogPosts);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    // Show subscribe modal after 10 seconds
    const timer = setTimeout(() => {
      setIsSubscribeModalOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    "All",
    "Destinations",
    "Tips & Tricks",
    "Food & Culture",
    "Adventure",
  ];

  useEffect(() => {
    const filtered = blogPosts.filter((post) =>
      selectedCategory === "All" ? true : post.category === selectedCategory
    );
    setDisplayedPosts(filtered);
  }, [selectedCategory]);

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <img
                  src="https://i.imgur.com/DevXMXu.png"
                  alt="Travel Beyond Logo"
                  className="h-14"
                />
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  <a
                    href="#"
                    onClick={() => setSelectedMenu("Home")}
                    className={`px-3 py-2 font-medium ${
                      selectedMenu === "Home"
                        ? "text-amber-500 border-b-2 border-amber-500"
                        : "text-gray-700 hover:text-amber-500"
                    }`}
                  >
                    Home
                  </a>
                  <a
                    href="#pages"
                    onClick={() => setSelectedMenu("Pages")}
                    className={`px-3 py-2 font-medium ${
                      selectedMenu === "Pages"
                        ? "text-amber-500 border-b-2 border-amber-500"
                        : "text-gray-700 hover:text-amber-500"
                    }`}
                  >
                    Pages
                  </a>
                  <a
                    href="#travel"
                    onClick={() => setSelectedMenu("Travel")}
                    className={`px-3 py-2 font-medium ${
                      selectedMenu === "Travel"
                        ? "text-amber-500 border-b-2 border-amber-500"
                        : "text-gray-700 hover:text-amber-500"
                    }`}
                  >
                    Travel
                  </a>
                  <a
                    href="#blogs"
                    onClick={() => setSelectedMenu("Blogs")}
                    className={`px-3 py-2 font-medium ${
                      selectedMenu === "Blogs"
                        ? "text-amber-500 border-b-2 border-amber-500"
                        : "text-gray-700 hover:text-amber-500"
                    }`}
                  >
                    Blogs
                  </a>
                  <a
                    href="#shop"
                    onClick={() => setSelectedMenu("Shop")}
                    className={`px-3 py-2 font-medium ${
                      selectedMenu === "Shop"
                        ? "text-amber-500 border-b-2 border-amber-500"
                        : "text-gray-700 hover:text-amber-500"
                    }`}
                  >
                    Shop
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-4 text-gray-500">
                  <FaFacebookF className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaLinkedinIn className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaInstagram className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaTwitter className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaPinterestP className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaYoutube className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                </div>
                <div className="h-6 w-px bg-gray-300" />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-40 pl-10 pr-4 py-1.5 rounded-md bg-transparent border-none focus:outline-none focus:ring-0 text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-amber-500 cursor-pointer" />
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-amber-500 rounded-full">
                  {cartCount}
                </span>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white pb-3 px-4">
            <div className="flex flex-col space-y-1">
              <a
                href="#"
                className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"
              >
                Home
              </a>
              <a
                href="#pages"
                className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"
              >
                Pages
              </a>
              <a
                href="#travel"
                className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"
              >
                Travel
              </a>
              <a
                href="#blogs"
                className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"
              >
                Blogs
              </a>
              <a
                href="#shop"
                className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium"
              >
                Shop
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Animation */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div
                  className={`flex flex-col items-start ${
                    isLoaded ? "animate-fade-in" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-0">
                    <div
                      className="text-black text-xs tracking-wider rotate-[-90deg] origin-left whitespace-nowrap"
                      style={{ marginRight: "-44px" }}
                    >
                      Dec 06, 2023
                    </div>
                    <h1 className="text-6xl tracking-tight text-white sm:text-7xl md:text-8xl">
                      <p className="text-amber-500 text-sm font-semibold tracking-wide mb-2">
                        Adventure
                      </p>
                      <span
                        className="block text-black"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Explore, Discover, and Dive
                      </span>
                    </h1>
                  </div>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-start lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pl-12">
                    <div className="rounded-md shadow">
                      <a
                        href="#featured"
                        className="flex items-center justify-center px-8 py-3 border border-amber-500 text-base font-medium rounded-none text-amber-500 bg-white hover:bg-amber-50 md:py-4 md:text-lg md:px-10"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://i.imgur.com/XGNLCmC.jpeg"
            alt="Travel destinations around the world"
          />
        </div>
      </div>

      {/* Featured Blog Posts */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Amazing Travel Blog
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#F9F8F6] shadow-none overflow-hidden"
              >
                <div className="flex h-64">
                  <div className="flex items-center justify-center px-4 bg-[#F9F8F6]">
                    <span className="text-sm text-gray-500 rotate-[-90deg] whitespace-nowrap">
                      {post.date}
                    </span>
                  </div>
                  <div className="flex-1">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-amber-500 font-semibold">
                    {post.category}
                  </p>
                  <h3 className="text-xl font-serif text-gray-900">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="flex items-center justify-center space-x-4 my-16">
        <div className="w-24 h-1 bg-yellow-400" />
        <div className="w-24 h-1 bg-gray-100" />
      </div>

      {/* Recent Blog Posts with Filters */}
      <section id="blog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Recent Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Explore our latest travel guides and stories
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCategory === category
                    ? "bg-amber-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-amber-500 text-white px-3 py-1 text-sm font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-amber-600 font-medium hover:text-amber-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section id="tips" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Travel Tips & Advice
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Practical tips to make your journey smoother
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">?️</div>
              <h3 className="text-xl font-bold mb-2">Flight Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Book flights 54 days in advance for the best prices</li>
                <li>• Use flexible dates to find cheaper options</li>
                <li>• Choose seats with extra legroom wisely</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">?</div>
              <h3 className="text-xl font-bold mb-2">Packing Hacks</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use packing cubes to stay organized</li>
                <li>• Roll clothes to save space and reduce wrinkles</li>
                <li>• Wear bulky items on the plane</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">?</div>
              <h3 className="text-xl font-bold mb-2">Budget Travel</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use credit cards with no foreign transaction fees</li>
                <li>• Exchange some money before your trip</li>
                <li>• Use budget accommodation booking platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Stay Inspired
            </h2>
            <p className="mt-4 text-lg">
              Get our best travel stories, tips, and guides delivered to your
              inbox.
            </p>
            <form className="mt-8 sm:flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-3 placeholder-gray-400 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:max-w-xs"
                required
              />
              <button
                type="submit"
                className="mt-3 w-full px-6 py-3 font-medium text-amber-600 bg-white rounded-md hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Our Partners</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="flex items-center justify-center"
              >
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="h-10 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Who we are and what we do
              </p>
            </div>

            <div className="prose prose-amber max-w-none">
              <p className="text-xl text-gray-700 mb-6">
                We are a team of passionate travelers and storytellers dedicated
                to sharing the best travel experiences from around the world.
                Our mission is to inspire and empower travelers to explore new
                destinations, discover hidden gems, and make meaningful
                connections along the way.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-white rounded-lg">
                  <div className="text-3xl mb-2">50+</div>
                  <div className="text-gray-600">Countries Explored</div>
                </div>

                <div className="text-center p-6 bg-white rounded-lg">
                  <div className="text-3xl mb-2">100K+</div>
                  <div className="text-gray-600">Monthly Readers</div>
                </div>

                <div className="text-center p-6 bg-white rounded-lg">
                  <div className="text-3xl mb-2">10</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Travel Beyond</h3>
              <p className="text-gray-400 text-sm">
                Inspiring global adventures through stories, tips, and guides.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Company
              </h4>
              <ul className="mt-4 space-y-3">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Resources
              </h4>
              <ul className="mt-4 space-y-3">
                {footerNav.resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Follow Us
              </h4>
              <ul className="mt-4 space-y-3">
                {footerNav.follow.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Travel Beyond. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />

      {/* CSS for animations and fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap");

        * {
          font-family: "Inter", "Playfair Display", serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Playfair Display", serif !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
