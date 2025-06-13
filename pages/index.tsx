import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  Monitor,
  Smartphone,
  Palette,
  Feather,
  Figma,
  Globe,
  Star,
  Brain,
  Compass,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  Blocks,
  Sun,
  Moon,
  ShieldCheck,
  Zap,
  GraduationCap,
  Beard,
} from "lucide-react";
import { FaBehance, FaDribbble, FaPinterest } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const indexRef = useRef(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, indexRef.current + 1));
        indexRef.current += 1;
        setSpeed(100);

        if (indexRef.current === text.length) {
          setSpeed(3000);
          setIsDeleting(true);
        }
      } else {
        setDisplayText(text.substring(0, indexRef.current - 1));
        indexRef.current -= 1;
        setSpeed(50);

        if (indexRef.current === 0) {
          setSpeed(1000);
          setIsDeleting(false);
        }
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, speed]);

  return <span>{displayText}<span className="cursor-pulse">|</span></span>;
};

const CreativeStudio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredProjectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const services: Service[] = [
    {
      title: "Web Experience Design",
      description:
        "Create engaging and user-centered digital experiences that drive conversions.",
      icon: <Monitor className="w-10 h-10" />,
      features: [
        "UX/UI Design",
        "Responsive Design",
        "Prototyping",
        "User Research",
        "Accessibility",
      ],
      color: "#FF6B6B",
    },
    {
      title: "Digital Product Design",
      description:
        "Transform your product vision into reality with our comprehensive design services.",
      icon: <Smartphone className="w-10 h-10" />,
      features: [
        "Mobile Apps",
        "Web Apps",
        "Product Strategy",
        "UI Kit Development",
        "Design Systems",
      ],
      color: "#4ECDC4",
    },
    {
      title: "Brand Identity",
      description:
        "Build a distinctive brand that stands out and connects with your audience.",
      icon: <Palette className="w-10 h-10" />,
      features: [
        "Logo Design",
        "Brand Strategy",
        "Visual Identity",
        "Guidelines",
        "Collateral Design",
      ],
      color: "#FFD166",
    },
    {
      title: "Motion & Animation",
      description:
        "Bring your brand to life with engaging motion graphics and animations.",
      icon: <Play className="w-10 h-10" />,
      features: [
        "Explainer Videos",
        "Brand Films",
        "Motion Graphics",
        "Animation",
        "Interactive Elements",
      ],
      color: "#118AB2",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Lead Product Designer",
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
      bio: "With over 8 years of experience in digital product design, Alex leads our creative direction and ensures the highest quality output for our clients.",
      socials: {
        twitter: "https://twitter.com/alexmorgan",
        linkedin: "https://linkedin.com/in/alexmorgan",
        instagram: "https://instagram.com/alexmorgan.design",
      },
    },
    {
      id: 2,
      name: "Sophie Chen",
      role: "Senior UX/UI Designer",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDI%3D",
      bio: "Sophie brings her expertise in user research and interaction design to create intuitive and delightful digital experiences.",
      socials: {
        twitter: "https://twitter.com/sophiechen",
        linkedin: "https://linkedin.com/in/sophiechen",
        instagram: "https://instagram.com/sophiechen.design",
      },
    },
    {
      id: 3,
      name: "Marcus Reed",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
      bio: "Marcus oversees all creative aspects of our projects, ensuring that each deliverable maintains our high standard of innovation and excellence.",
      socials: {
        twitter: "https://twitter.com/marcusreed",
        linkedin: "https://linkedin.com/in/marcusreed",
        instagram: "https://instagram.com/marcusreed.design",
      },
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      role: "Motion Designer",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fH8y",
      bio: "Elena brings her passion for animation and storytelling to our team, creating captivating motion graphics and visual effects.",
      socials: {
        twitter: "https://twitter.com/elenarodriguez",
        linkedin: "https://linkedin.com/in/elenarodriguez",
        instagram: "https://instagram.com/elenarodriguez.motion",
      },
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "The team at Creative Studio transformed our web presence completely. Their attention to detail and user-centered approach resulted in a 200% increase in our conversion rates within the first three months.",
      clientName: "Michael Thompson",
      clientRole: "CEO",
      company: "InnovateTech",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
      id: 2,
      quote:
        "Working with Creative Studio was an absolute pleasure. They understood our brand vision and delivered a comprehensive identity system that truly resonates with our target audience.",
      clientName: "Sarah Johnson",
      clientRole: "Marketing Director",
      company: "BrandBuilders",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDI%3D",
    },
    {
      id: 3,
      quote:
        "Their motion graphics expertise brought our brand story to life in ways we never thought possible. The animation work they delivered exceeded our expectations and has become a key differentiator in our market.",
      clientName: "David Wilson",
      clientRole: "Creative Director",
      company: "Digital Frontiers",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
      id: 4,
      quote:
        "The design system they created for our product has been instrumental in maintaining brand consistency across our entire platform. Their work is both beautiful and practical.",
      clientName: "Lisa Chen",
      clientRole: "Product Manager",
      company: "Nexus Systems",
      avatar:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDI%3D",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Digital Innovators",
      description: "UX/UI Design for Tech Startup",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8Mg%3D%3D",
      link: "#",
      categories: ["UX/UI", "Web Design", "Mobile"],
      color: "#FF6B6B",
    },
    {
      id: 2,
      title: "NeoBank Mobile App",
      description: "Mobile App Design",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMGFwcCUyMGRlc2lnbnxlbnwwfHwwfHx8Mg%3D%3D",
      link: "#",
      categories: ["Mobile", "UI Design", "Fintech"],
      color: "#4ECDC4",
    },
    {
      id: 3,
      title: "Sustainable Living",
      description: "Brand Identity & Web Design",
      image:
        "https://images.unsplash.com/photo-1634942537034-253175e44d6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJyYW5kaW5nfGVufDB8fDB8fHwy",
      link: "#",
      categories: ["Branding", "Web Design", "Sustainable"],
      color: "#118AB2",
    },
    {
      id: 4,
      title: "Fitness Connect",
      description: "Motion Graphics & Animation",
      image:
        "https://images.unsplash.com/photo-1523309991873-7c5c48eaf2eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZpdG5lc3MlMjBhcHB8ZW58MHx8MHx8fDI%3D",
      link: "#",
      categories: ["Motion", "Animation", "Fitness"],
      color: "#FFD166",
    },
    {
      id: 5,
      title: "Elegance Redefined",
      description: "Luxury Brand Identity",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwYnJhbmRpbmd8ZW58MHx8MHx8fDI%3D",
      link: "#",
      categories: ["Branding", "Luxury", "Identity"],
      color: "#FF6B6B",
    },
  ];

  const clientLogos = [
    {
      id: 1,
      name: "Microsoft",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/768px-Microsoft_logo.svg.png",
    },
    {
      id: 2,
      name: "Apple",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/768px-Apple_logo_black.svg.png",
    },
    {
      id: 3,
      name: "Google",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/768px-Google_2015_logo.svg.png",
    },
    {
      id: 4,
      name: "Amazon",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/768px-Amazon_logo.svg.png",
    },
    {
      id: 5,
      name: "Spotify",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/768px-Spotify_logo_without_text.svg.png",
    },
    {
      id: 6,
      name: "Adobe",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo.svg/768px-Adobe_Acrobat_DC_logo.svg.png",
    },
    {
      id: 7,
      name: "Slack",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/768px-Slack_icon_2019.svg.png",
    },
    {
      id: 8,
      name: "Airbnb",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/768px-Airbnb_Logo_B%C3%A9lo.svg.png",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      name: false,
      email: false,
      phone: false,
    };

    if (!formData.name.trim()) {
      newErrors.name = true;
      hasErrors = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = true;
      hasErrors = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = true;
      hasErrors = true;
    }

    setFormErrors(newErrors);

    if (!hasErrors) {
      setIsFormSubmitted(true);

      setTimeout(() => {
        setIsFormSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          message: "",
        });
      }, 3000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [
      heroRef.current,
      featuredProjectsRef.current,
      servicesRef.current,
      teamRef.current,
      testimonialsRef.current,
      contactRef.current,
    ];

    sections.forEach((section) => {
      if (section) observerRef.current?.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observerRef.current?.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <header className={`fixed w-full z-50 transition-all duration-300 ${activeSection !== "hero" || isMobileMenuOpen ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <motion.div
                  className="w-6 h-6 rounded-lg bg-white dark:bg-gray-950"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                />
              </motion.div>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Creative
              </span>
              <span className="text-xl font-light text-purple-600 dark:text-purple-400">
                Studio
              </span>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {["Our Work", "Services", "Team", "Testimonials", "Contact"].map(
              (item) => (
                <motion.div
                  key={item}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    color:
                      theme === "dark"
                        ? item === "Contact"
                          ? "#FF6B6B"
                          : "#A5B4FC"
                        : item === "Contact"
                          ? "#EF4444"
                          : "#4F46E5",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    item === "Contact"
                      ? theme === "dark"
                        ? "text-red-400 hover:text-red-300"
                        : "text-red-600 hover:text-red-500"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-indigo-400"
                        : "text-gray-700 hover:text-indigo-600"
                  } font-medium transition-colors duration-200 cursor-pointer`}
                  onClick={() => {
                    const section =
                      item === "Our Work"
                        ? featuredProjectsRef
                        : item === "Services"
                          ? servicesRef
                          : item === "Team"
                            ? teamRef
                            : item === "Testimonials"
                              ? testimonialsRef
                              : contactRef;
                    section.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item}
                </motion.div>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor:
                  theme === "dark"
                    ? "rgba(99, 102, 241, 0.9)"
                    : "rgba(79, 70, 229, 0.9)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
              className={`${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              } px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer`}
            >
              Book a Call
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2 cursor-pointer"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {["Our Work", "Services", "Team", "Testimonials", "Contact"].map(
                    (item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                          x: 5,
                          color:
                            theme === "dark"
                              ? item === "Contact"
                                ? "#FF6B6B"
                                : "#A5B4FC"
                              : item === "Contact"
                                ? "#EF4444"
                                : "#4F46E5",
                        }}
                        className={`${
                          item === "Contact"
                            ? theme === "dark"
                              ? "text-red-400"
                              : "text-red-600"
                            : theme === "dark"
                              ? "text-gray-300"
                              : "text-gray-700"
                        } font-medium py-2 cursor-pointer`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          const section =
                            item === "Our Work"
                              ? featuredProjectsRef
                              : item === "Services"
                                ? servicesRef
                                : item === "Team"
                                  ? teamRef
                                  : item === "Testimonials"
                                    ? testimonialsRef
                                    : contactRef;
                          section.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        {item}
                      </motion.div>
                    )
                  )}
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(99, 102, 241, 0.9)"
                        : "rgba(79, 70, 229, 0.9)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    contactRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`${
                    theme === "dark"
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  } px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer text-center`}
                >
                  Book a Call
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: theme === "dark" ? 0.2 : 0.1 }}
            transition={{ duration: 1 }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <motion.path
                d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
                fill={`url(#gradientA-${theme})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M0,50 Q25,70 50,50 T100,50 V100 H0 Z"
                fill={`url(#gradientB-${theme})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <defs>
                <linearGradient
                  id={`gradientA-${theme}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={theme === "dark" ? "#4F46E5" : "#818CF8"}
                  />
                  <stop
                    offset="100%"
                    stopColor={theme === "dark" ? "#312E81" : "#4F46E5"}
                  />
                </linearGradient>
                <linearGradient
                  id={`gradientB-${theme}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={theme === "dark" ? "#EC4899" : "#F9A8D4"}
                  />
                  <stop
                    offset="100%"
                    stopColor={theme === "dark" ? "#9D174D" : "#EC4899"}
                  />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "bg-gray-950/80" : "bg-gray-50/80"
            }`}
          />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-3 items-center justify-center mb-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm border border-indigo-500/20 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span>Creative Excellence Award Winner 2024</span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Crafting Digital
              </span>
              <br />
              <TypewriterText text="Experiences" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`text-xl md:text-2xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } mb-10 max-w-2xl mx-auto leading-relaxed`}
            >
              We are a team of passionate designers and developers creating
              extraordinary digital experiences that blend innovation with
              creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(99, 102, 241, 0.9)"
                      : "rgba(79, 70, 229, 0.9)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => featuredProjectsRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={`${
                  theme === "dark"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                } px-10 py-4 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer`}
              >
                View Our Work
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  borderColor: theme === "dark" ? "#6366F1" : "#4F46E5",
                  color: theme === "dark" ? "#A5B4FC" : "#4F46E5",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 border-indigo-600 text-indigo-400"
                    : "bg-white hover:bg-gray-50 border-indigo-600 text-indigo-600"
                } px-10 py-4 rounded-full font-medium text-lg border transition-all duration-300 cursor-pointer`}
              >
                Start a Project
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="featuredProjects" ref={featuredProjectsRef} className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-full h-full opacity-5 dark:opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M20,0 Q40,20 60,0 T100,20 V100 H0 Z"
              fill={`url(#gridGradient-${theme})`}
            />
            <defs>
              <linearGradient
                id={`gridGradient-${theme}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#4F46E5" : "#818CF8"}
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#EC4899" : "#F9A8D4"}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent to-indigo-600 dark:to-indigo-400 w-12"
              />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`${
                  theme === "dark"
                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                    : "bg-indigo-500/5 text-indigo-600 border-indigo-500/10"
                } px-4 py-1 rounded-full text-sm border`}
              >
                Our Work
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-transparent w-12"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Featured
              </span>{" "}
              Projects
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Explore our recent work and the diverse range of creative solutions
              we've crafted for our clients.
            </motion.p>
          </motion.div>

          <div className="relative h-[600px] md:h-[800px] w-full mb-10">
            <AnimatePresence mode="wait" custom={currentSlide}>
              <motion.div
                key={`slide-${currentSlide}`}
                custom={currentSlide}
                initial={{
                  opacity: 0,
                  x: 100,
                  scale: 0.9,
                  filter: `blur(${theme === "dark" ? 5 : 2}px)`,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  x: -100,
                  scale: 0.9,
                  filter: `blur(${theme === "dark" ? 5 : 2}px)`,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="absolute inset-0 w-full h-full"
              >
                <motion.div
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={projects[currentSlide].image}
                    alt={projects[currentSlide].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      theme === "dark"
                        ? "from-gray-950 via-gray-950/80 to-transparent"
                        : "from-gray-100 via-gray-100/80 to-transparent"
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10"
                >
                  <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-2"
                      >
                        {projects[currentSlide].title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-lg text-gray-200 mb-4"
                      >
                        {projects[currentSlide].description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-wrap gap-2"
                      >
                        {projects[currentSlide].categories.map((category) => (
                          <motion.span
                            key={category}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                          >
                            {category}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.a
                      href={projects[currentSlide].link}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: projects[currentSlide].color,
                        borderColor: projects[currentSlide].color,
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className={`px-6 py-3 bg-transparent border-2 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2`}
                      style={{
                        borderColor: projects[currentSlide].color,
                        color: projects[currentSlide].color,
                      }}
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-6 mb-16"
          >
            <motion.button
              onClick={() => {
                setIsPlaying(false);
                setCurrentSlide((prev) =>
                  prev === 0 ? projects.length - 1 : prev - 1
                );
              }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                  : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
              } rounded-full flex items-center justify-center border transition-all duration-300 shadow-md cursor-pointer`}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-3">
              {projects.map((project, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentSlide(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ width: index === 0 ? "40px" : "12px" }}
                  animate={{
                    width: index === currentSlide ? "40px" : "12px",
                    height: index === currentSlide ? "12px" : "12px",
                    backgroundColor:
                      index === currentSlide
                        ? project.color
                        : theme === "dark"
                          ? "#374151"
                          : "#E5E7EB",
                  }}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => {
                setIsPlaying(false);
                setCurrentSlide((prev) =>
                  prev === projects.length - 1 ? 0 : prev + 1
                );
              }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                  : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
              } rounded-full flex items-center justify-center border transition-all duration-300 shadow-md cursor-pointer`}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/50 border-gray-200/50"
              } p-8 rounded-2xl border backdrop-blur-sm`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-3"
              >
                Creative Process
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-6`}
              >
                Our process combines research, creativity, and technical
                expertise to deliver exceptional results that exceed
                expectations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                {[
                  "Research & Discovery",
                  "Concept Development",
                  "Design & Prototyping",
                  "Testing & Iteration",
                  "Implementation",
                ].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    />
                    <motion.span
                      whileHover={{ color: theme === "dark" ? "#A5B4FC" : "#4F46E5" }}
                      className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm`}
                    >
                      {item}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/50 border-gray-200/50"
              } p-8 rounded-2xl border backdrop-blur-sm`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg"
              >
                <Compass className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-3"
              >
                Capabilities
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-6`}
              >
                We offer a comprehensive range of design services to help
                businesses grow and succeed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {[
                  { icon: Monitor, text: "Web Design" },
                  { icon: Smartphone, text: "Mobile Apps" },
                  { icon: Palette, text: "Branding" },
                  { icon: Play, text: "Motion Graphics" },
                  { icon: Blocks, text: "Product Design" },
                  { icon: Feather, text: "Illustration" },
                  { icon: Figma, text: "UX/UI Design" },
                  { icon: Globe, text: "Digital Strategy" },
                ].map(({ icon: Icon, text }) => (
                  <motion.div
                    key={text}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 hover:border-indigo-500/50"
                        : "bg-white border-gray-200 hover:border-indigo-500/50"
                    } p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 cursor-pointer`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`w-8 h-8 ${
                        theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    >
                      <Icon className="w-full h-full" />
                    </motion.div>
                    <motion.span
                      whileHover={{
                        color: theme === "dark" ? "#A5B4FC" : "#4F46E5",
                      }}
                      className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm`}
                    >
                      {text}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-12 md:gap-16"
          >
            {clientLogos.map((logo) => (
              <motion.div
                key={logo.id}
                whileHover={{ y: -5, scale: 1.1 }}
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className={`h-12 md:h-14 ${theme === "dark" ? "filter invert dark:invert-0" : ""}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section
        id="services"
        ref={servicesRef}
        className="py-32 relative overflow-hidden"
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full opacity-5 dark:opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,80 Q20,60 40,80 T80,60 V100 H0 Z"
              fill={`url(#waveGradient-${theme})`}
            />
            <defs>
              <linearGradient
                id={`waveGradient-${theme}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#EC4899" : "#F9A8D4"}
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#4F46E5" : "#818CF8"}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent to-purple-600 dark:to-purple-400 w-12"
              />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`${
                  theme === "dark"
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    : "bg-purple-500/5 text-purple-600 border-purple-500/10"
                } px-4 py-1 rounded-full text-sm border`}
              >
                What We Do
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-purple-600 dark:from-purple-400 to-transparent w-12"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Our
              </span>{" "}
              Services
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Discover the range of creative services we offer to help elevate
              your brand and achieve your business goals.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                } rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl backdrop-blur-sm`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                  className="w-20 h-20 rounded-xl mb-6 relative overflow-hidden shadow-lg"
                  style={{ backgroundColor: service.color }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-4"
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-6`}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <motion.span
                        whileHover={{ color: service.color }}
                        className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm`}
                      >
                        {feature}
                      </motion.span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    x: 5,
                    color: service.color,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className={`mt-8 text-sm font-medium flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                  onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/50 border-gray-200/50"
              } rounded-2xl border p-8 md:p-12 backdrop-blur-sm`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold mb-2"
                  >
                    Ready to transform your digital presence?
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Contact us today for a personalized consultation.
                  </motion.p>
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: theme === "dark" ? "#6366F1" : "#4F46E5",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className={`${
                    theme === "dark"
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  } px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer`}
                >
                  Start a Project
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="team" ref={teamRef} className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-full h-full opacity-5 dark:opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M80,0 Q100,20 80,40 T60,20 V100 H100 Z"
              fill={`url(#triangleGradient-${theme})`}
            />
            <defs>
              <linearGradient
                id={`triangleGradient-${theme}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#4F46E5" : "#818CF8"}
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#EC4899" : "#F9A8D4"}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent to-blue-600 dark:to-blue-400 w-12"
              />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`${
                  theme === "dark"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-blue-500/5 text-blue-600 border-blue-500/10"
                } px-4 py-1 rounded-full text-sm border`}
              >
                Our Team
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-blue-600 dark:from-blue-400 to-transparent w-12"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Meet
              </span>{" "}
              Our Team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Get to know the talented individuals behind our creative studio and
              the expertise they bring to each project.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                } rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl backdrop-blur-sm`}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-xl overflow-hidden mb-6 relative"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4"
                  >
                    <motion.div
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                      className="flex gap-3"
                    >
                      {member.socials.twitter && (
                        <motion.a
                          href={member.socials.twitter}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.socials.linkedin && (
                        <motion.a
                          href={member.socials.linkedin}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.socials.instagram && (
                        <motion.a
                          href={member.socials.instagram}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-xl font-bold mb-2"
                >
                  {member.name}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${
                    theme === "dark"
                      ? "text-indigo-400"
                      : "text-indigo-600"
                  } mb-4 font-medium`}
                >
                  {member.role}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm mb-6`}
                >
                  {member.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      x: 5,
                      color: theme === "dark" ? "#A5B4FC" : "#4F46E5",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(0);
                      featuredProjectsRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`text-xs font-medium flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    View Work
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      color: theme === "dark" ? "#EC4899" : "#DB2777",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className={`text-xs font-medium transition-colors duration-200 cursor-pointer ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Get in Touch
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" ref={testimonialsRef} className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M20,100 Q0,80 20,60 T40,80 V100 H0 Z"
              fill={`url(#zigzagGradient-${theme})`}
            />
            <defs>
              <linearGradient
                id={`zigzagGradient-${theme}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#10B981" : "#6EE7B7"}
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#3B82F6" : "#93C5FD"}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent to-green-600 dark:to-green-400 w-12"
              />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`${
                  theme === "dark"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-green-500/5 text-green-600 border-green-500/10"
                } px-4 py-1 rounded-full text-sm border`}
              >
                Testimonials
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-green-600 dark:from-green-400 to-transparent w-12"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                What
              </span>{" "}
              Clients Say
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Hear directly from our satisfied clients about their experience
              working with us.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                } rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl backdrop-blur-sm`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 relative"
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.clientName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute -bottom-1 -right-1 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-1"
                    >
                      <Star className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.div>

                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-xl font-bold"
                    >
                      {testimonial.clientName}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`${theme === "dark" ? "text-indigo-400" : "text-indigo-600"} font-medium`}
                    >
                      {testimonial.clientRole}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm`}
                    >
                      {testimonial.company}
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg opacity-20"
                  />
                  <motion.p
                    whileHover={{
                      color: theme === "dark" ? "#C4B5FD" : "#6D28D9",
                    }}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} italic leading-relaxed relative z-10`}
                  >
                    {testimonial.quote}
                  </motion.p>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg opacity-20"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={contactRef}
        className="py-32 relative overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,0 Q20,40 40,20 T60,40 T80,20 T100,40 V100 H0 Z"
              fill={`url(#squigglesGradient-${theme})`}
            />
            <defs>
              <linearGradient
                id={`squigglesGradient-${theme}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? "#F43F5E" : "#FDA4AF"}
                />
                <stop
                  offset="100%"
                  stopColor={theme === "dark" ? "#3B82F6" : "#93C5FD"}
                />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent to-red-600 dark:to-red-400 w-12"
              />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`${
                  theme === "dark"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-red-500/5 text-red-600 border-red-500/10"
                } px-4 py-1 rounded-full text-sm border`}
              >
                Get in Touch
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "auto" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-red-600 dark:from-red-400 to-transparent w-12"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                Let's
              </span>{" "}
              Connect
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Have a project in mind? Fill out the form below or reach out to
              us directly.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/50 border-gray-200/50"
              } rounded-2xl border p-8 backdrop-blur-sm`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl font-bold mb-4"
              >
                Contact Information
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-8`}
              >
                Reach out to us anytime. We love hearing from you!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-10 h-10 ${theme === "dark" ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-500/5 text-indigo-600"} rounded-full flex items-center justify-center`}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.div>
                  <motion.a
                    href="mailto:hello@creativestudio.com"
                    whileHover={{ color: theme === "dark" ? "#A5B4FC" : "#4F46E5" }}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm`}
                  >
                    hello@creativestudio.com
                  </motion.a>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-10 h-10 ${theme === "dark" ? "bg-green-500/10 text-green-400" : "bg-green-500/5 text-green-600"} rounded-full flex items-center justify-center`}
                  >
                    <Phone className="w-5 h-5" />
                  </motion.div>
                  <motion.a
                    href="tel:+1234567890"
                    whileHover={{ color: theme === "dark" ? "#4ADE80" : "#16A34A" }}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm`}
                  >
                    +1 (234) 567-890
                  </motion.a>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-10 h-10 ${theme === "dark" ? "bg-red-500/10 text-red-400" : "bg-red-500/5 text-red-600"} rounded-full flex items-center justify-center`}
                  >
                    <MapPin className="w-5 h-5" />
                  </motion.div>
                  <motion.address
                    whileHover={{ color: theme === "dark" ? "#FCA5A5" : "#EF4444" }}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm not-italic`}
                  >
                    123 Creative Street
                    <br />
                    Design City, DC 10101
                  </motion.address>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-lg font-medium mb-4"
                >
                  Follow Us
                </motion.h4>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  {[
                    { icon: Twitter, color: "#1DA1F2" },
                    { icon: Instagram, color: "#E4405F" },
                    { icon: Linkedin, color: "#0A66C2" },
                    { icon: FaBehance, color: "#1769FF" },
                    { icon: FaDribbble, color: "#EA4C89" },
                    { icon: FaPinterest, color: "#BD081C" },
                  ].map(({ icon: Icon, color }, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{
                        y: -5,
                        backgroundColor: color,
                        color: "white",
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1 + index * 0.1,
                      }}
                      className={`w-10 h-10 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      } rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer text-gray-700`}
                      aria-label={`Follow us on ${Icon.name}`}
                      style={{ color: color }}
                    >
                      {typeof Icon === "function" ? (
                        <Icon className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                {isFormSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700/50"
                        : "bg-white/50 border-gray-200/50"
                    } rounded-2xl border p-8 backdrop-blur-sm text-center py-16`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold mb-2"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Thank you for reaching out. We'll get back to you soon.
                    </motion.p>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor:
                          theme === "dark" ? "#6366F1" : "#4F46E5",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`${
                        theme === "dark"
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      } px-8 py-3 rounded-full font-medium mt-8 transition-all duration-300 cursor-pointer`}
                    >
                      Back to Top
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700/50"
                        : "bg-white/50 border-gray-200/50"
                    } rounded-2xl border p-8 backdrop-blur-sm`}
                  >
                    <motion.form
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ y: -2 }}
                          className="relative"
                        >
                          <label
                            htmlFor="name"
                            className={`${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            } text-sm block mb-1`}
                          >
                            Name
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full ${
                              theme === "dark"
                                ? "bg-gray-900/50 border-gray-700 text-white"
                                : "bg-white/50 border-gray-200 text-gray-900"
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              formErrors.name
                                ? "focus:ring-red-500"
                                : "focus:ring-indigo-500"
                            }`}
                            required
                          />
                          {formErrors.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                              </motion.div>
                              <span>This field is required</span>
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div
                          whileHover={{ y: -2 }}
                          className="relative"
                        >
                          <label
                            htmlFor="email"
                            className={`${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            } text-sm block mb-1`}
                          >
                            Email
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full ${
                              theme === "dark"
                                ? "bg-gray-900/50 border-gray-700 text-white"
                                : "bg-white/50 border-gray-200 text-gray-900"
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              formErrors.email
                                ? "focus:ring-red-500"
                                : "focus:ring-indigo-500"
                            }`}
                            required
                          />
                          {formErrors.email && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                              </motion.div>
                              <span>This field is required</span>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ y: -2 }}
                          className="relative"
                        >
                          <label
                            htmlFor="phone"
                            className={`${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            } text-sm block mb-1`}
                          >
                            Phone
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full ${
                              theme === "dark"
                                ? "bg-gray-900/50 border-gray-700 text-white"
                                : "bg-white/50 border-gray-200 text-gray-900"
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                              formErrors.phone
                                ? "focus:ring-red-500"
                                : "focus:ring-indigo-500"
                            }`}
                            required
                          />
                          {formErrors.phone && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                              </motion.div>
                              <span>This field is required</span>
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div whileHover={{ y: -2 }}>
                          <label
                            htmlFor="budget"
                            className={`${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            } text-sm block mb-1`}
                          >
                            Budget
                          </label>
                          <motion.select
                            whileFocus={{ scale: 1.01 }}
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className={`w-full ${
                              theme === "dark"
                                ? "bg-gray-900/50 border-gray-700 text-white"
                                : "bg-white/50 border-gray-200 text-gray-900"
                            } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          >
                            <option value="">Select Budget Range</option>
                            <option value="$1k-$5k">$1,000 - $5,000</option>
                            <option value="$5k-$15k">$5,000 - $15,000</option>
                            <option value="$15k-$30k">$15,000 - $30,000</option>
                            <option value="$30k+">$30,000+</option>
                          </motion.select>
                        </motion.div>
                      </div>

                      <motion.div whileHover={{ y: -2 }}>
                        <label
                          htmlFor="message"
                          className={`${
                            theme === "dark"
                              ? "text-gray-300"
                              : "text-gray-600"
                          } text-sm block mb-1`}
                        >
                          Message
                        </label>
                        <motion.textarea
                          whileFocus={{ scale: 1.01 }}
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full ${
                            theme === "dark"
                              ? "bg-gray-900/50 border-gray-700 text-white"
                              : "bg-white/50 border-gray-200 text-gray-900"
                          } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          placeholder="Tell us about your project..."
                        />
                      </motion.div>

                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          backgroundColor:
                            theme === "dark" ? "#6366F1" : "#4F46E5",
                        }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`${
                          theme === "dark"
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        } px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer w-full`}
                      >
                        Send Message
                      </motion.button>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className={`py-16 ${theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-gray-50 text-gray-700"} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-6"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg"
                >
                  <motion.div
                    className="w-6 h-6 rounded-lg bg-white dark:bg-gray-950"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  />
                </motion.div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    Creative
                  </span>
                  <span className="text-xl font-light text-purple-600 dark:text-purple-400">
                    Studio
                  </span>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-6`}
              >
                Crafting exceptional digital experiences that drive results.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                {[
                  { icon: Twitter, color: "#1DA1F2" },
                  { icon: Instagram, color: "#E4405F" },
                  { icon: Linkedin, color: "#0A66C2" },
                  { icon: FaBehance, color: "#1769FF" },
                  { icon: FaDribbble, color: "#EA4C89" },
                  { icon: FaPinterest, color: "#BD081C" },
                ].map(({ icon: Icon, color }, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{
                      y: -5,
                      backgroundColor: color,
                      color: "white",
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                    }}
                    className={`w-10 h-10 ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200"
                    } rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer text-gray-700`}
                    aria-label={`Follow us on ${Icon.name}`}
                    style={{ color: color }}
                  >
                    {typeof Icon === "function" ? (
                      <Icon className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg font-bold mb-6"
              >
                Services
              </motion.h4>
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                {[
                  "Web Design",
                  "Mobile Apps",
                  "Branding",
                  "Motion Graphics",
                  "UX/UI Design",
                  "Digital Strategy",
                ].map((service, index) => (
                  <motion.li
                    key={service}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                    }}
                  >
                    <motion.a
                      href="#"
                      whileHover={{
                        color: theme === "dark" ? "#A5B4FC" : "#4F46E5",
                      }}
                      className={`text-sm ${theme === "dark" ? "text-gray-400 hover:text-indigo-400" : "text-gray-600 hover:text-indigo-600"} transition-colors cursor-pointer`}
                    >
                      {service}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-lg font-bold mb-6"
              >
                Company
              </motion.h4>
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                {[
                  { name: "About Us", section: teamRef },
                  { name: "Our Work", section: featuredProjectsRef },
                  { name: "Services", section: servicesRef },
                  { name: "Testimonials", section: testimonialsRef },
                  { name: "Contact", section: contactRef },
                ].map((item, index) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                    }}
                  >
                    <motion.button
                      onClick={() => item.section.current?.scrollIntoView({ behavior: "smooth" })}
                      whileHover={{
                        color: theme === "dark" ? "#A5B4FC" : "#4F46E5",
                      }}
                      className={`text-sm ${theme === "dark" ? "text-gray-400 hover:text-indigo-400" : "text-gray-600 hover:text-indigo-600"} transition-colors cursor-pointer`}
                    >
                      {item.name}
                    </motion.button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-lg font-bold mb-6"
              >
                Newsletter
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true }}
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}
              >
                Subscribe for design trends and updates.
              </motion.p>
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex"
                onSubmit={(e) => e.preventDefault()}
              >
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  type="email"
                  placeholder="Your email"
                  className={`px-4 py-2 ${theme === "dark" ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"} border rounded-l-lg focus:outline-none`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`${theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"} px-4 py-2 rounded-r-lg transition-colors cursor-pointer`}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            className={`pt-8 mt-8 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"} flex flex-col md:flex-row justify-between items-center`}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              viewport={{ once: true }}
              className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"} mb-4 md:mb-0`}
            >
              © {new Date().getFullYear()} Creative Studio. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              {["Privacy Policy", "Terms of Service", "Cookies"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    whileHover={{
                      color: theme === "dark" ? "#A5B4FC" : "#4F46E5",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.9 + index * 0.1,
                    }}
                    className={`text-sm ${theme === "dark" ? "text-gray-500 hover:text-indigo-400" : "text-gray-600 hover:text-indigo-600"} transition-colors cursor-pointer`}
                  >
                    {item}
                  </motion.a>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default CreativeStudio;
// Zod Schema
export const Schema = {
    "commentary": "",
    "template": "nextjs-developer",
    "title": "",
    "description": "",
    "additional_dependencies": [
        "framer-motion",
        "react-icons"
    ],
    "has_additional_dependencies": true,
    "install_dependencies_command": "npm install framer-motion react-icons",
    "port": 3000,
    "file_path": "pages/index.tsx",
    "code": "<see code above>"