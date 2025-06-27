import React, { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
// Import Google Fonts with fallback and performance configuration
import { Inter, Playfair_Display } from "next/font/google";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Navigation menu items used in the site header
const headerMenu = [
  {
    id: 1,
    href: "#",
    name: "Home",
  },
  {
    id: 2,
    href: "#pages",
    name: "Pages",
  },
  {
    id: 3,
    href: "#travel",
    name: "Travel",
  },
  {
    id: 4,
    href: "#blogs",
    name: "Blogs",
  },
  {
    id: 5,
    href: "#shop",
    name: "Shop",
  },
];

// Sample featured and recent blog posts data
const blogPosts = [
  {
    id: 1,
    title: "A Tale Of Backpacking Courage Through Conflict",
    excerpt:
      "Discover the courageous journey of backpacking through conflict zones, where adventure meets resilience.",
    image: "https://i.imgur.com/G2HuAiM.png",
    category: "Tips",
    featured: true,
    date: "Dec 06, 2023",
  },
  {
    id: 2,
    title: "No Fuss, Blue Heron Bridge Snorkle and Scuba Tours",
    excerpt:
      "Dive into the effortless experience of snorkeling and scuba tours at Blue Heron Bridge with expert guidance.",
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
    excerpt:
      "Uncover the magic of a romantic getaway in Venice, Italy's enchanting floating city.",
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
    image: "https://i.imgur.com/G2HuAiM.png",
    category: "Destinations",
    featured: false,
    date: "Sep 13, 2024",
  },
];

// Travel tips displayed in the 'Travel Tips Section'
const travelTips = [
  {
    id: 1,
    name: "Get Inspired",
  },
  {
    id: 2,
    name: "Plan Your Trip",
  },
  {
    id: 3,
    name: "Explore Locations",
  },
  {
    id: 4,
    name: "Travel Tips",
  },
];

// Sponsors logos and information
const sponsors = [
  {
    id: 1,
    name: "Zoom",
    logo: "https://i.imgur.com/s1gdhaX.png",
  },
  {
    id: 2,
    name: "Pilot",
    logo: "https://i.imgur.com/UYBwV80.png",
  },
  {
    id: 3,
    name: "Sil",
    logo: "https://i.imgur.com/IzwxxN9.png",
  },
  {
    id: 4,
    name: "Moving",
    logo: "https://i.imgur.com/OtJSj4E.png",
  },
  {
    id: 5,
    name: "Xplore",
    logo: "https://i.imgur.com/Xj5FlOU.png",
  },
  {
    id: 6,
    name: "Rocket",
    logo: "https://i.imgur.com/uoBWQCX.png",
  },
];

// Social media URLs used in header and footer
const socialLinks = {
  instagram: "https://instagram.com",
  linkedin: "https://www.linkedin.com",
  pinterest: "https://www.pinterest.com",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  youtube: "https://youtube.com",
};

// Navigation links used in footer sections
const footerNav = {
  company: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Shop", href: "/shop" },
  ],
  destinations: [
    { name: "Brazil", href: "/brazil" },
    { name: "Portugal", href: "/portugal" },
    { name: "England", href: "/england" },
    { name: "Spain", href: "/spain" },
  ],
  follow: [
    { icon: FaFacebookF, name: "Facebook", href: socialLinks.facebook },
    { icon: FaLinkedinIn, name: "Linkedin", href: socialLinks.linkedin },
    { icon: FaPinterestP, name: "Pinterest", href: socialLinks.pinterest },
    { icon: FaInstagram, name: "Instagram", href: socialLinks.instagram },
    { icon: FaTwitter, name: "Twitter", href: socialLinks.twitter },
    { icon: FaYoutube, name: "YouTube", href: socialLinks.youtube },
  ],
};

// Main component for the travel blog homepage
export default function TravelBlog() {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  // Filter posts to highlight as featured in the homepage
  const featuredPosts = blogPosts.filter((post) => post.featured);
  // Determine the most recent post for prominent display
  const recentPost = blogPosts.reduce((latest, post) =>
    new Date(post.date) > new Date(latest.date) ? post : latest
  );

  return (
    <div
      className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white`}
    >
      {/* Header with navigation menu and logo */}
      <header className="bg-white dark:bg-zinc-800 shadow-sm sticky top-0 z-50">
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
              <div className="hidden lg:block">
                <div className="flex items-center space-x-8">
                  {headerMenu.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setSelectedMenu(item.name)}
                      className={`px-3 py-2 font-medium ${
                        selectedMenu === item.name
                          ? "text-amber-500 border-b-2 border-amber-500"
                          : "text-gray-700 hover:text-amber-500 dark:text-gray-300"
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <FaFacebookF className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaLinkedinIn className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaInstagram className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaTwitter className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaPinterestP className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                  <FaYoutube className="h-4 w-4 hover:text-amber-500 cursor-pointer" />
                </div>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
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
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-amber-500 cursor-pointer dark:text-gray-300" />
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-amber-500 rounded-full">
                  {cartCount}
                </span>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-500 focus:outline-none dark:text-gray-300"
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
          <div className="lg:hidden bg-white dark:bg-zinc-800 pb-3 px-4">
            <div className="flex flex-col space-y-1">
              {headerMenu.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-500 px-3 py-2 font-medium dark:text-gray-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero section with main CTA and background image */}
      <div className="relative bg-white dark:bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className={"flex flex-col items-start"}>
                  <div className="flex items-center gap-0">
                    <div
                      className="text-black dark:text-white text-xs tracking-wider font-bold rotate-[-90deg] origin-left whitespace-nowrap"
                      style={{ marginRight: "-44px" }}
                    >
                      Dec 06, 2023
                    </div>
                    <h1 className="text-6xl tracking-tight text-white sm:text-7xl md:text-8xl">
                      <p className="text-amber-500 text-sm font-semibold tracking-wide mb-2">
                        Adventure
                      </p>
                      <span className="block text-black dark:text-white font-[var(--font-playfair)]">
                        Explore, Discover, and Dive
                      </span>
                    </h1>
                  </div>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-start lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pl-12">
                    <div className="rounded-md shadow">
                      <a
                        href="#featured"
                        className="flex items-center justify-center px-8 py-3 border border-amber-500 text-base font-medium rounded-none text-amber-500 bg-white dark:bg-zinc-900 hover:bg-amber-50 dark:hover:bg-zinc-800 md:py-4 md:text-lg md:px-10"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                  <div className="hidden lg:block absolute bottom-0 right-8 z-20 pr-4 lg:flex">
                    <img
                      src="https://i.imgur.com/bpIp8rz.png"
                      alt="Decorative"
                      className="max-w-[200px] h-auto"
                    />
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

      {/* Featured blog posts section */}
      <section id="featured" className="pt-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Amazing Travel Blog
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#F9F8F6] dark:bg-zinc-800 shadow-none overflow-hidden"
              >
                <div className="flex h-64">
                  <div className="flex items-center justify-center px-4 bg-[#F9F8F6] dark:bg-zinc-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-bold rotate-[-90deg] whitespace-nowrap">
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
                  <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider with visual separator lines */}
      <div className="flex items-center justify-center space-x-4 my-16">
        <div className="w-24 h-1 bg-yellow-400" />
        <div className="w-24 h-1 bg-gray-100 dark:bg-zinc-700" />
      </div>

      {/* Recent blog post highlighted section */}
      <section
        id="blog"
        className="w-full flex flex-col lg:flex-row lg:flex-nowrap min-h-[700px] space-y-8 lg:space-y-0"
        style={{
          backgroundImage: "url('https://i.imgur.com/MaY1rcV.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full lg:w-1/2 h-[300px] lg:h-full bg-cover bg-no-repeat bg-bottom">
          <div className="flex flex-col justify-between h-full">
            <img
              src={recentPost.image}
              alt={recentPost.title}
              className="object-cover w-full h-[70%] lg:h-[500px]"
            />
            <div className="h-1/4 flex items-center justify-center px-4 pt-6 sm:pt-8 lg:pt-12 lg:pl-8">
              <p className="text-3xl text-left">
                If you believe what I say, you will
                <br />
                get many benefits!
              </p>
            </div>
            <div className="mb-4"></div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center relative z-10 -ml-12 -mr-12">
          <img
            src="https://i.imgur.com/jR2Aai4.jpeg"
            alt="Middle Decorative Image"
            className="max-h-[500px] w-auto border-4 border-white shadow-lg transform rotate-[-6deg] -translate-y-2"
          />
        </div>
        <div className="w-full lg:w-1/2 h-[300px] lg:h-full bg-cover bg-no-repeat bg-bottom">
          <div className="flex h-full max-w-xl mx-auto px-6 items-center justify-center lg:min-h-[700px]">
            <div className="flex items-center pr-4">
              <p className="text-black dark:text-black text-xs font-bold tracking-wider rotate-[-90deg] whitespace-nowrap">
                {recentPost.date}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start text-left">
              <p className="text-sm font-semibold text-amber-500 mb-2">
                {recentPost.category}
              </p>
              <h3 className="text-3xl font-[var(--font-playfair)] text-gray-900 dark:text-black mb-4">
                {recentPost.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-600 mb-6 max-w-lg">
                {recentPost.excerpt}
              </p>
              <a
                href="#featured"
                className="px-8 py-3 border border-amber-500 text-base font-medium rounded-none text-amber-500 bg-transparent hover:bg-transparent"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips section with recent post and tips list */}
      <section
        id="tips"
        className="container mx-auto px-4 bg-[#F9F8F6] dark:bg-zinc-800 relative"
      >
        <div className="relative">
          <div className="hidden lg:block absolute top-0 right-0 translate-y-[-20%] rotate-6 border-4 border-[#E7E0DD] z-10">
            <img
              src="https://i.imgur.com/G2HuAiM.png"
              alt="Scuba Diver"
              className="object-cover h-[300px] w-auto"
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col h-full justify-start">
              <div className="flex h-full max-w-xl mx-auto px-6 items-center justify-center lg:min-h-[700px]">
                <div className="flex items-center pr-4">
                  <p className="text-black dark:text-white text-xs tracking-wider font-bold rotate-[-90deg] whitespace-nowrap">
                    {recentPost.date}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-start text-left">
                  <p className="text-sm font-semibold text-amber-500 mb-2">
                    {recentPost.category}
                  </p>
                  <h3 className="text-3xl font-[var(--font-playfair)] text-gray-900 dark:text-white mb-4">
                    {recentPost.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-lg">
                    {recentPost.excerpt}
                  </p>
                  <a
                    href="#featured"
                    className="px-8 py-3 text-base font-medium text-white bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 dark:text-zinc-900 dark:bg-yellow-300 dark:hover:bg-yellow-400"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            {/* Right-hand column: tips list */}
            <div className="flex flex-col h-full justify-end lg:pb-12">
              <div className="relative px-4 pb-4 mt-8 md:mt-16 md:static">
                <h3 className="text-3xl font-bold mb-2 dark:text-white">
                  Start Planning Your Tips
                </h3>
                <ul className="grid grid-cols-2 gap-4 font-bold text-gray-500 dark:text-gray-300">
                  {travelTips.map((tip) => (
                    <li key={tip.id} className="flex items-center space-x-2">
                      <span className="text-green-500">✳</span>
                      <span>{tip.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute bottom-[-10%] left-0 translate-x-[-40%] rotate-[-6deg] border-4 border-[#E7E0DD] z-10">
            <img
              src="https://i.imgur.com/IipShXG.png"
              alt="Scuba Diver"
              className="object-cover h-[250px] w-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured blog cards list */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl dark:text-white">
              Featured From The Blog
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#F9F8F6] dark:bg-zinc-800 shadow-none overflow-hidden"
              >
                <div className="flex h-64">
                  <div className="flex items-center justify-center px-4 bg-[#F9F8F6] dark:bg-zinc-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400 rotate-[-90deg] whitespace-nowrap">
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
                  <h3 className="text-xl font-[var(--font-playfair)] text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors logos grid */}
      <section className="py-12 bg-[#FAF8F6] dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl dark:text-white">
              Our Sponsors
            </h2>
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
                  className="h-20 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with navigation and social links */}
      <footer className="text-gray-700 dark:text-gray-300 py-12 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Explore Column */}
            <div>
              <h3 className="text-xl font-serif mb-4 dark:text-white">
                Explore
              </h3>
              <ul className="space-y-2">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo and Social Column */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://i.imgur.com/DevXMXu.png"
                alt="Logo"
                className="h-20 mb-4"
              />
              <div className="grid grid-cols-3 gap-4 text-center">
                {footerNav.follow.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center space-x-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Top Destination Column */}
            <div className="md:col-start-3 md:text-right">
              <h3 className="text-xl font-serif mb-4 dark:text-white">
                Top Destination
              </h3>
              <ul className="space-y-2">
                {footerNav.destinations.map((destination) => (
                  <li key={destination.name}>
                    <a
                      href={destination.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {destination.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-semibold">©Scuba Joey</span> is proudly
              owned by Jannatul Ferdous
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          color-scheme: light dark;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-playfair), serif !important;
        }
        body {
          font-family: var(--font-inter), sans-serif;
        }
      `}</style>
    </div>
  );
}
