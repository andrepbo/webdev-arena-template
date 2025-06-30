"use client";

import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import {
  Search,
  Bell,
  Video,
  ChevronRight,
  ArrowRight,
  User,
  Menu,
  X,
  Clock,
  Dumbbell,
  Users,
  Heart,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Target,
  TrendingUp,
  MoveUpRightIcon,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  body {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  .section-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .shadow-article {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
  
  .category-badge {
    backdrop-filter: blur(10px);
  }
  
  .text-balance {
    text-wrap: balance;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #b4e251 0%, #b4e251 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .floating {
    animation: floating 3s ease-in-out infinite;
  }
  
  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  .slide-in {
    animation: slideIn 0.6s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Home Section Component
const HomeSection = () => (
  <section
    id="home"
    className="section-container bg-white text-gray-900 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="slide-in">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            TRANSFORM YOUR
            <span className="gradient-text"> BODY</span> &
            <span className="gradient-text"> MIND</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join the ultimate fitness journey with expert trainers,
            state-of-the-art equipment, and a community that supports your
            goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-4 bg-gradient-to-r from-[#b4e251] to-lime-400 text-white rounded-full font-bold hover:scale-105 transition-transform"
              onClick={() => toast.info("Coming soon...")}
            >
              Start Free Trial
            </button>
            <button
              className="px-8 py-4 border-2 border-gray-900 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all"
              onClick={() => toast.info("Coming soon...")}
            >
              View Classes
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-4xl font-bold gradient-text">500+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text">20+</h3>
              <p className="text-gray-600">Expert Trainers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text">15+</h3>
              <p className="text-gray-600">Fitness Programs</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="floating">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
              alt="Gym"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-lime-400 to-[#b4e251] rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-4">
              <Award size={40} />
              <div className="text-white">
                <p className="font-bold text-lg">Best Gym 2024</p>
                <p className="text-sm">Fitness Excellence Award</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Service Section Component
const ServiceSection = () => {
  const services = [
    {
      icon: <Dumbbell size={40} />,
      title: "Personal Training",
      description:
        "One-on-one sessions with certified trainers tailored to your goals",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users size={40} />,
      title: "Group Classes",
      description: "Dynamic group workouts including HIIT, Yoga, and Spinning",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Heart size={40} />,
      title: "Nutrition Planning",
      description: "Customized meal plans to complement your fitness journey",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Target size={40} />,
      title: "Goal Tracking",
      description:
        "Advanced analytics to monitor your progress and achievements",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="service" className="section-container bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">OUR SERVICES</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive fitness solutions designed to help you achieve your
            goals faster and more effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover-lift"
            >
              <div
                className={`w-20 h-20 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <button
                className="mt-6 flex items-center text-blue-600 font-medium hover:gap-2 transition-all gap-1"
                onClick={() => toast.info("Coming soon...")}
              >
                Learn More <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-[#b4e251] to-lime-400 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Life?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join us today and get 50% off your first month!
          </p>
          <button
            className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
            onClick={() => toast.info("Coming soon...")}
          >
            Claim Your Offer
          </button>
        </div>
      </div>
    </section>
  );
};

// Classes Section Component
const ClassesSection = () => {
  const classes = [
    {
      name: "Morning Yoga Flow",
      time: "6:00 AM - 7:00 AM",
      trainer: "Sarah Johnson",
      level: "All Levels",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    },
    {
      name: "HIIT Bootcamp",
      time: "7:30 AM - 8:30 AM",
      trainer: "Mike Chen",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
    },
    {
      name: "Strength Training",
      time: "9:00 AM - 10:00 AM",
      trainer: "Alex Rivera",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop",
    },
    {
      name: "Dance Fitness",
      time: "5:00 PM - 6:00 PM",
      trainer: "Lisa Park",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section id="classes" className="section-container bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">
            FITNESS CLASSES
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our diverse range of classes led by expert instructors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift"
            >
              <img
                src={cls.image}
                alt={cls.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs mb-3">
                  {cls.level}
                </span>
                <h3 className="text-2xl font-bold mb-2">{cls.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 flex items-center gap-2">
                      <Clock size={16} /> {cls.time}
                    </p>
                    <p className="text-sm opacity-90 flex items-center gap-2">
                      <User size={16} /> {cls.trainer}
                    </p>
                  </div>
                  <button
                    className="bg-white text-black px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform"
                    onClick={() => toast.info("Coming soon...")}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform"
            onClick={() => toast.info("Coming soon...")}
          >
            View Full Schedule
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => (
  <section id="contact" className="section-container bg-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-5xl font-black mb-6">GET IN TOUCH</h2>
          <p className="text-xl text-gray-300 mb-8">
            Have questions? We&apos;re here to help you start your fitness
            journey.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-lime-300 rounded-full flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-lime-300 rounded-full flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-lg">info@gogym.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-lime-300 rounded-full flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-gray-400">Location</p>
                <p className="text-lg">
                  123 Fitness Street, Gym City, GC 12345
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span>5:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span>6:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span>7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-200"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-200 h-32"
                placeholder="Your message..."
              />
            </div>
            <button
              className="w-full py-4 bg-gradient-to-r from-lime-500 to-lime-300 text-white rounded-lg font-bold hover:scale-105 transition-transform"
              onClick={() => toast.info("Coming soon...")}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// About Section Component
const AboutSection = () => (
  <section id="about" className="section-container bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl text-black font-black mb-6">ABOUT GO GYM</h2>
          <p className="text-xl text-gray-600 mb-6">
            For over a decade, GO GYM has been transforming lives through
            fitness. We believe that everyone deserves access to quality
            training and support on their journey to better health.
          </p>
          <p className="text-gray-600 mb-8">
            Our state-of-the-art facility features the latest equipment, expert
            trainers, and a welcoming community that makes fitness fun and
            achievable for all levels.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <TrendingUp size={40} className="mx-auto mb-3 text-lime-500" />
              <h4 className="font-bold text-gray-600 text-lg mb-1">
                10+ Years
              </h4>
              <p className="text-gray-600 text-sm">of Excellence</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Star size={40} className="mx-auto mb-3 text-lime-500" />
              <h4 className="font-bold text-gray-600 text-lg mb-1">
                4.9/5 Rating
              </h4>
              <p className="text-gray-600 text-sm">Member Satisfaction</p>
            </div>
          </div>

          <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
            Learn More About Us
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop"
            alt="Gym Interior"
            className="rounded-2xl shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=500&fit=crop"
            alt="Training Session"
            className="rounded-2xl shadow-lg mt-8"
          />
        </div>
      </div>
    </div>
  </section>
);

// Blog Section Component (Updated to match design)
const BlogSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Main blog posts data with summaries for filtering
  const allBlogPosts = [
    {
      id: 1,
      title: "BEST FULL-BODY HOME GYM MACHINES !",
      category: "Gym",
      tags: ["Workout", "Equipment"],
      date: "22 Feb",
      image:
        "https://static.tildacdn.com/tild3162-6331-4562-b031-663632643438/_______.jpg",
      summary:
        "Discover the top-rated home gym equipment that delivers professional results. From multi-stations to compact solutions for small spaces.",
      featured: true,
      trending: true,
    },
    {
      id: 2,
      title: "READY, SET, GO! HOW TO START RUNNING TO STAY FIT",
      category: "Gym",
      tags: ["Workout", "Health"],
      excerpt:
        "Walking Is Recognized As A Safe And Effective Mode Of Exercise When The Goal Is To Improve Fitness, Health, Or Both. Something As Simple As A Daily Brisk Walk Can Help Someone...",
      expandable: [
        {
          title: "HOW TO READ GOLF GREEN GRAIN LIKE A PRO",
          icon: ChevronRight,
        },
        { title: "HOW TO WORK OUT IN A LIMITED SPACE", icon: ChevronRight },
      ],
      summary:
        "Start your running journey with expert tips on form, pacing, and building endurance. Perfect guide for beginners looking to improve fitness.",
      featured: true,
      trending: false,
    },
    {
      id: 3,
      title: "OVERCOMING LAZINESS IN SPORTS",
      category: "Gym",
      tags: ["Health", "Lifestyle"],
      date: "13 Feb",
      hint: "Hint",
      image:
        "https://cdn.shopify.com/s/files/1/1186/4290/products/Only_Curls_Satin_Lined_Baseball_Hat_Beige_Curly_Girl_Holding_Cap_V1_1200x.jpg",
      summary:
        "Mental strategies and practical tips to stay motivated and overcome workout procrastination. Build lasting exercise habits.",
      featured: true,
      trending: true,
    },
    {
      id: 4,
      title: "ATHLETIC TRAINING | SOFT AND HARD STYLES OF TRAINING",
      category: "Tutorial",
      tags: ["Workout", "Training"],
      date: "20 Feb",
      time: "5 Min",
      image:
        "https://img.freepik.com/premium-photo/full-view-sportswoman-doing-yoga-home-karamet_197531-32336.jpg",
      summary:
        "Compare different training methodologies and learn when to apply soft vs. hard training styles for optimal athletic performance.",
      featured: true,
      trending: false,
    },
    {
      id: 5,
      title: "Protein-Rich Breakfast Ideas for Athletes",
      category: "Reggie Food",
      tags: ["Diet", "Nutrition"],
      date: "19 Feb",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
      summary:
        "Start your day with these high-protein breakfast recipes designed to fuel your workouts and support muscle recovery.",
      featured: false,
      trending: true,
    },
    {
      id: 6,
      title: "Understanding Heart Rate Zones for Better Cardio",
      category: "Medical Knowledge",
      tags: ["Health", "Fitness"],
      date: "18 Feb",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      summary:
        "Learn how to train in different heart rate zones to maximize fat burning, improve endurance, and boost cardiovascular health.",
      featured: false,
      trending: false,
    },
    {
      id: 7,
      title: "The Ultimate Guide to Building Lean Muscle",
      category: "Bodybuilding",
      tags: ["Workout", "Nutrition"],
      date: "17 Feb",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop",
      summary:
        "Comprehensive guide covering workout splits, nutrition timing, and supplementation for optimal muscle growth.",
      featured: false,
      trending: true,
    },
    {
      id: 8,
      title: "Managing Exercise-Induced Asthma",
      category: "Sickness",
      tags: ["Health", "Medical"],
      date: "16 Feb",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      summary:
        "Expert advice on exercising safely with asthma, including breathing techniques and preventive measures.",
      featured: false,
      trending: false,
    },
  ];

  // Categories for filtering
  const categories = [
    { name: "Medical Knowledge", count: 12 },
    { name: "Bodybuilding", count: 8 },
    { name: "Reggie Food", count: 15 },
    { name: "Sickness", count: 6 },
    { name: "Life Style", count: 20 },
    { name: "Diet", count: 18 },
    { name: "Diseases", count: 5 },
    { name: "Healthy Food", count: 14 },
  ];

  // Trending topics with their related categories
  const trendingTopics = [
    { name: "HIIT Training", categories: ["Gym", "Workout"] },
    { name: "Protein Shakes", categories: ["Reggie Food", "Diet"] },
    { name: "Home Workouts", categories: ["Gym", "Workout"] },
    { name: "Mental Health", categories: ["Health", "Life Style"] },
    { name: "Yoga Flow", categories: ["Gym", "Health"] },
    { name: "Keto Diet", categories: ["Diet", "Healthy Food"] },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleTrendingClick = (topic: {
    name: string;
    categories: string[];
  }) => {
    // Set selected categories to the topic's related categories
    setSelectedCategories(topic.categories);
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Filter blog posts based on selected categories
  const filteredPosts =
    selectedCategories.length === 0
      ? allBlogPosts
      : allBlogPosts.filter((post) =>
          selectedCategories.some(
            (cat) => post.category === cat || post.tags?.includes(cat)
          )
        );

  // Always show the 4 main featured posts in the grid
  const mainGridPosts = allBlogPosts
    .filter((post) => post.featured)
    .slice(0, 4);

  return (
    <section id="blog" className="section-container bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Blog Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-black text-black">BLOG</h1>
          <button
            className="flex items-center text-black hover:text-gray-900 text-md bg-gray-200 p-2 md:p-5 rounded-full"
            onClick={() => toast.info("Coming soon...")}
          >
            Read Our Blog
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        {/* Trending Topics Bar (for quick access) */}
        <div className="mb-8 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-4 overflow-x-auto">
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Trending:
            </span>
            {trendingTopics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => handleTrendingClick(topic)}
                className="px-3 py-1 bg-gradient-to-r from-[#b4e251] to-lime-400 text-white rounded-full text-xs font-medium whitespace-nowrap hover:scale-105 transition-transform"
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-12">
          {/* Left Article - Full Body Gym */}
          <div className="lg:col-span-2">
            <article className="relative rounded-2xl overflow-hidden h-[700px] bg-black text-white">
              <div className="relative h-full">
                <img
                  src={mainGridPosts[0].image}
                  alt={mainGridPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute top-1 left-4 p-4 rounded-full backdrop-blur-xl">
                  🔥
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-3">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-medium category-badge">
                      Category: {mainGridPosts[0].category}
                    </span>
                    <span className="text-white/90 text-xs">
                      {mainGridPosts[0].date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-balance sm:w-2/3">
                    {mainGridPosts[0].title}
                  </h3>
                  {/* <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {mainGridPosts[0].summary}
                  </p> */}
                  {mainGridPosts[0].trending && (
                    <span className="inline-block bg-gradient-to-r from-[#b4e251] to-lime-400 px-2 py-1 rounded text-xs">
                      Trending
                    </span>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Center Article - Running */}
          <div className="lg:col-span-2 flex flex-col justify-start gap-2 h-full">
            <article className="rounded-2xl overflow-hidden bg-[#dcf2ad]">
              <div className="">
                <div className="flex items-center justify-between mb-4 px-2 pt-3 md:px-4">
                  <span className="text-black text-sm font-bold">
                    Category .
                    <span className="text-gray-800 font-medium">
                      {` `}
                      {mainGridPosts[1].category}
                    </span>
                  </span>
                  <button className="w-6 h-6  rounded-full flex items-center justify-center">
                    <MoveUpRightIcon size={14} className="text-gray-900" />
                  </button>
                </div>

                <h3 className="text-2xl font-black text-black mb-2 w-3/4 px-2 md:px-4">
                  {mainGridPosts[1].title}
                </h3>

                <p className="text-black text-xs mb-1 leading-relaxed px-2 md:px-4">
                  {mainGridPosts[1].excerpt}

                  {expandedSections.includes(99) && (
                    <p className="text-gray-600 text-sm mb-6">
                      {mainGridPosts[1].summary}
                    </p>
                  )}
                  <button
                    onClick={() => toggleSection(99)}
                    className="text-gray-600 hover:text-gray-900 text-sm mb-6 underline"
                  >
                    {` `}
                    {expandedSections.includes(99) ? "Less" : "More"}
                  </button>
                </p>

                <div className="space-y-3">
                  {mainGridPosts[1].expandable?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => toggleSection(index)}
                      className="w-full flex items-center justify-between p-4 transition-colors border-t border-gray-950"
                    >
                      <span className="text-sm font-black text-gray-900 text-start">
                        {item.title}
                      </span>
                      <ArrowRight
                        size={20}
                        className={`text-gray-950 transition-transform ${
                          expandedSections.includes(index) ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden bg-white relative">
              <div
                className="absolute h-64 md:h-full w-full object-fill bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${mainGridPosts[3].image})` }}
              >
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                  <div className="w-0 h-0 border-l-[16px] border-l-gray-900 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                </button>
              </div>

              <div className="flex flex-col gap-40 h-full relative justify-between p-2">
                {/* Content section */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-gray-600 text-xs font-black">
                    Category .
                    <span className="font-semibold">
                      {` `}
                      {mainGridPosts[3].category}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col items-start">
                  <div className="flex flex-row font-medium">
                    <span className="text-gray-500 text-xs">
                      {mainGridPosts[3].time}
                      {` . `}
                      {` `}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {mainGridPosts[3].date}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {mainGridPosts[3].title}
                  </h3>
                </div>
                {/* <p className="text-gray-600 line-clamp-2">
                  {mainGridPosts[3].summary}
                </p> */}
              </div>
            </article>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-1 flex flex-col justify-start gap-2">
            {/* Overcoming Laziness */}
            <article className="rounded-2xl relative overflow-hidden md:h-[360px] shadow-article hover-lift bg-sky-100">
              <div className="h-full relative">
                <img
                  src={mainGridPosts[2].image}
                  alt={mainGridPosts[2].title}
                  className="w-full h-full object-cover"
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 text-xs font-medium">
                      Category: {mainGridPosts[3].category}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                      {mainGridPosts[2].hint}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {mainGridPosts[2].date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {mainGridPosts[2].title}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {mainGridPosts[2].summary}
                </p>
              </div>
            </article>

            {/* Categories */}
            <div className="bg-purple-100 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2">
                {categories
                  .slice(0, showAllCategories ? categories.length : 8)
                  .map((category, index) => (
                    <button
                      key={index}
                      onClick={() => toggleCategory(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategories.includes(category.name)
                          ? "bg-purple-600 text-white"
                          : "bg-yellow-100 text-gray-700 hover:bg-yellow-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  View All Categories
                </button>
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="bg-white rounded-full p-2 hover:bg-gray-50"
                >
                  <ArrowRight
                    size={20}
                    className={`text-gray-600 transition-transform ${
                      showAllCategories ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Articles Grid (shows filtered results) */}
        {selectedCategories.length > 0 && filteredPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {filteredPosts.length} Articles Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover-lift"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {post.trending && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-[#b4e251] to-lime-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Filter Results Message */}
        {selectedCategories.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Showing {filteredPosts.length} articles in:{" "}
              {selectedCategories.join(", ")}
            </p>
            <button
              onClick={() => setSelectedCategories([])}
              className="text-[#b4e251] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="bg-gradient-to-r from-lime-500 to-lime-400 text-white px-4 py-2 rounded inline-block mb-4">
              <span className="text-2xl font-black">GO GYM</span>
            </div>
            <p className="text-gray-200 mb-4">
              Transform your body and mind with our expert trainers and
              state-of-the-art facilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-lime-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["home", "service", "classes", "contact", "blog", "about"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link}`}
                      className="text-gray-200 hover:text-white transition-colors capitalize"
                    >
                      {link === "about" ? "About Us" : link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div>
            <h3 className="text-lg font-bold mb-4 gradient-text">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li>123 Fitness Street</li>
              <li>Gym City, GC 12345</li>
              <li>+1 (555) 123-4567</li>
              <li>info@gogym.com</li>
            </ul>
          </div> */}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-lime-300">
              Stay Updated
            </h3>
            <p className="text-gray-200 mb-4">
              Get fitness tips and exclusive offers
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
              />
              <button
                className="w-full px-4 py-2 bg-gradient-to-r from-lime-600 to-lime-500 rounded-lg font-medium hover:scale-105 transition-transform"
                onClick={() => toast.info("Coming soon...")}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-gray-200 text-sm">
              © 2025 GO GYM. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </footer>
  );
};

const NotificationComponent = () => {
  const notifications = [
    {
      id: 1,
      title: "New Class Available",
      message: "HIIT Bootcamp added to Tuesday schedule",
      time: "5 min ago",
      unread: true,
      type: "class",
    },
    {
      id: 2,
      title: "Membership Renewal",
      message: "Your membership expires in 7 days",
      time: "1 hour ago",
      unread: true,
      type: "alert",
    },
    {
      id: 3,
      title: "Trainer Message",
      message: "Sarah Johnson sent you a workout plan",
      time: "3 hours ago",
      unread: false,
      type: "message",
    },
    {
      id: 4,
      title: "Achievement Unlocked",
      message: "You've completed 50 workouts!",
      time: "Yesterday",
      unread: false,
      type: "achievement",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-lime-600 to-lime-300 rounded-full text-white text-xs flex items-center justify-center">
            2
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-xl" align="end">
        <div className="bg-gradient-to-r from-[#b4e251] to-lime-400 text-white p-4">
          <h3 className="font-bold text-lg">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                notification.unread ? "bg-purple-50/50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notification.unread
                      ? "bg-gradient-to-r from-lime-400 to-lime-300"
                      : "bg-transparent"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {notification.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {notification.message}
                  </p>
                  <span className="text-gray-400 text-xs mt-2 inline-block">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Main Component
export default function FitnessBlog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "service",
        "classes",
        "contact",
        "about",
        "blog",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="bg-black text-white px-3 py-1 rounded">
                  <span className="text-xl font-bold">GO GYM</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center md:mr-auto md:ml-16">
                {["home", "service", "classes", "contact", "blog", "about"].map(
                  (section, idx) => {
                    const label = section === "about" ? "About Us" : section;
                    const isActive = activeSection === section;

                    return (
                      <React.Fragment key={section}>
                        <button
                          onClick={() => scrollToSection(section)}
                          className={`text-sm capitalize transition-colors ${
                            isActive
                              ? "text-black font-semibold"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {label}
                        </button>

                        {/* only render dot after every item except the last */}
                        {idx <
                          [
                            "home",
                            "service",
                            "classes",
                            "contact",
                            "blog",
                            "about",
                          ].length -
                            1 && (
                          <span className="mx-5 inline-block w-1 h-1 bg-black rounded-full" />
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => toast.info("Coming soon...")}
                >
                  <Search size={20} />
                </button>
                <button
                  className="text-gray-600 hover:text-gray-900 hidden md:block"
                  onClick={() => toast.info("Coming soon...")}
                >
                  <Video size={20} />
                </button>

                <NotificationComponent />

                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  onClick={() => toast.info("Coming soon...")}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm hidden md:inline">Log In</span>
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-2 space-y-1">
                {["home", "service", "classes", "contact", "blog", "about"].map(
                  (section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium capitalize ${
                        activeSection === section
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {section === "about" ? "About Us" : section}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </header>

        {/* Main Content - Add padding-top to account for fixed header */}
        <main className="pt-16">
          <HomeSection />
          <ServiceSection />
          <ClassesSection />
          <ContactSection />
          <BlogSection />
          <AboutSection />
        </main>

        <Footer />
      </div>
      <Toaster richColors />
    </>
  );
}
