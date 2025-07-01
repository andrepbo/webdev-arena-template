import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  Dice5,
  Gamepad2,
  Gift,
  Home,
  LayoutDashboard,
  Map,
  Menu,
  Package,
  Puzzle,
  Search,
  Shield,
  Star,
  Wallet,
  X,
  MessageCircle,
  SendHorizonal,
} from "lucide-react";
// Avatar stub for demonstration (replace with your Avatar component if available)
const Avatar = ({ className = "" }: { className?: string }) => (
  <div className={`${className} bg-gray-400 rounded-full`} />
);

import { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Game {
  id: number;
  name: string;
  category: string;
  image: string;
  profit: string;
  gain: string;
  bgClass: string;
  bonus: string;
}

interface Bet {
  id: number;
  gameId: number;
  amount: number;
  payout: number;
  time: string;
  user: string;
  profit: number;
  avatar: string;
}

interface LeaderboardEntry {
  id: number;
  rank: number;
  user: string;
  games: string;
  earnings: number;
  avatar: string;
  level: string;
  change: string;
}

interface Category {
  id: number;
  name: string;
  tabName: string;
  count: number;
  image: string;
  color: string;
  description: string;
  notificationCount: number;
}

interface ChartData {
  name: string;
  profit: number;
}

const gamesData: Game[] = [
  {
    id: 1,
    name: "Wild Brawl",
    category: "Action",
    image:
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1817190/capsule_616x353.jpg?t=1730400857",
    profit: "+$428",
    gain: "+22%",
    bgClass: "bg-gradient-to-br from-rose-600 to-rose-400",
    bonus: "250%",
  },
  {
    id: 2,
    name: "Demon World",
    category: "Adventure",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2564210/capsule_616x353.jpg?t=1730230481",
    profit: "+$318",
    gain: "+14%",
    bgClass: "bg-gradient-to-br from-indigo-600 to-indigo-400",
    bonus: "180%",
  },
  {
    id: 3,
    name: "League of Gamers",
    category: "Strategy",
    image:
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1446780/capsule_616x353.jpg?t=1727793125",
    profit: "+$256",
    gain: "+12%",
    bgClass: "bg-gradient-to-br from-emerald-600 to-emerald-400",
    bonus: "150%",
  },
  {
    id: 4,
    name: "Cyber Spades",
    category: "Casino",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2307220/capsule_616x353.jpg?t=1724745973",
    profit: "+$184",
    gain: "+8%",
    bgClass: "bg-gradient-to-br from-amber-600 to-amber-400",
    bonus: "120%",
  },
  {
    id: 5,
    name: "Fantasy Chess",
    category: "Board Game",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2785740/capsule_616x353.jpg?t=1732647831",
    profit: "+$142",
    gain: "+6%",
    bgClass: "bg-gradient-to-br from-teal-600 to-teal-400",
    bonus: "100%",
  },
  {
    id: 6,
    name: "Pixel Crash",
    category: "Arcade",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2907540/capsule_616x353.jpg?t=1730384157",
    profit: "+$95",
    gain: "+4%",
    bgClass: "bg-gradient-to-br from-violet-600 to-violet-400",
    bonus: "80%",
  },
  {
    id: 7,
    name: "Royal Poker",
    category: "Casino",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2101030/capsule_616x353.jpg?t=1719317468",
    profit: "+$78",
    gain: "+3%",
    bgClass: "bg-gradient-to-br from-sky-600 to-sky-400",
    bonus: "70%",
  },
  {
    id: 8,
    name: "Battle Mages",
    category: "Strategy",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2687340/capsule_616x353.jpg?t=1725270033",
    profit: "+$62",
    gain: "+2%",
    bgClass: "bg-gradient-to-br from-cyan-600 to-cyan-400",
    bonus: "60%",
  },
];

const betsData: Bet[] = [
  {
    id: 1,
    gameId: 1,
    amount: 25,
    payout: 62,
    time: "2m ago",
    user: "user_jackson",
    profit: 37,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    gameId: 2,
    amount: 15,
    payout: 28,
    time: "5m ago",
    user: "user_williams",
    profit: 13,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    gameId: 3,
    amount: 40,
    payout: 88,
    time: "7m ago",
    user: "user_jones",
    profit: 48,
    avatar: "https://randomuser.me/api/portraits/men/87.jpg",
  },
  {
    id: 4,
    gameId: 1,
    amount: 10,
    payout: 22,
    time: "12m ago",
    user: "user_brown",
    profit: 12,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 5,
    gameId: 4,
    amount: 30,
    payout: 54,
    time: "15m ago",
    user: "user_davis",
    profit: 24,
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
  },
];

const leaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    rank: 1,
    user: "user_miller",
    games: "125 Games",
    earnings: 2548,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    level: "Expert",
    change: "+12%",
  },
  {
    id: 2,
    rank: 2,
    user: "user_wilson",
    games: "98 Games",
    earnings: 1842,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    level: "Advanced",
    change: "+8%",
  },
  {
    id: 3,
    rank: 3,
    user: "user_moore",
    games: "112 Games",
    earnings: 1625,
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    level: "Intermediate",
    change: "+5%",
  },
  {
    id: 4,
    rank: 4,
    user: "user_taylor",
    games: "78 Games",
    earnings: 1214,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    level: "Intermediate",
    change: "+3%",
  },
  {
    id: 5,
    rank: 5,
    user: "user_anderson",
    games: "105 Games",
    earnings: 985,
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    level: "Beginner",
    change: "+1%",
  },
];

const categoriesData: Category[] = [
  {
    id: 1,
    name: "All",
    tabName: "All",
    count: 28,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2564210/header.jpg?t=1730230481",
    color: "from-rose-600 to-rose-400",
    description: "Fast-paced games with exciting action and quick reflexes",
    notificationCount: 0,
  },
  {
    id: 2,
    name: "Action",
    tabName: "Action",
    count: 28,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2564210/header.jpg?t=1730230481",
    color: "from-rose-600 to-rose-400",
    description: "Fast-paced games with exciting action and quick reflexes",
    notificationCount: 0,
  },
  {
    id: 3,
    name: "Strategy",
    tabName: "Strategy",
    count: 24,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2687340/header.jpg?t=1725270033",
    color: "from-indigo-600 to-indigo-400",
    description: "Games that require strategic thinking and planning",
    notificationCount: 0,
  },
  {
    id: 4,
    name: "Adventure",
    tabName: "Adventure",
    count: 32,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2564210/header.jpg?t=1730230481",
    color: "from-emerald-600 to-emerald-400",
    description: "Explore worlds and embark on thrilling adventures",
    notificationCount: 2,
  },
  {
    id: 5,
    name: "Casino",
    tabName: "Casino",
    count: 18,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2307220/header.jpg?t=1724745973",
    color: "from-amber-600 to-amber-400",
    description: "Games of chance and betting strategies",
    notificationCount: 6,
  },
  {
    id: 6,
    name: "Board Game",
    tabName: "BoardGame",
    count: 12,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2785740/header.jpg?t=1732647831",
    color: "from-teal-600 to-teal-400",
    description: "Digital versions of classic board games",
    notificationCount: 0,
  },
];

const chartData: ChartData[] = [
  { name: "Mon", profit: 428 },
  { name: "Tue", profit: 318 },
  { name: "Wed", profit: 256 },
  { name: "Thu", profit: 184 },
  { name: "Fri", profit: 142 },
  { name: "Sat", profit: 95 },
  { name: "Sun", profit: 78 },
];

const iconMap: { [key: string]: JSX.Element } = {
  All: <LayoutDashboard />,
  Action: <Shield />,
  Strategy: <Crown />,
  Adventure: <Map />,
  Casino: <Dice5 />,
  BoardGame: <Puzzle />,
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function GameLaunchDashboard() {
  // Ref for Bonus Center section
  const bonusRef = useRef<HTMLDivElement>(null);
  // Prevent browser scroll restoration and scroll to top on mount
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    });
  }, []);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  // Bonus Center state for claimable bonus in analytics section
  const [bonusClaimed, setBonusClaimed] = useState(false);
  // New: Track balance for user
  const [balance, setBalance] = useState(0);
  const [showBonusModal, setShowBonusModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode] = useState<boolean>(true);
  const [showRecentActivity, setShowRecentActivity] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"bets" | "players">("bets");
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [filterField, setFilterField] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      user: "Downtown",
      time: "07:12",
      message: "Wowwww! I won $200 right now, how it possible?",
    },
    {
      user: "Gentleman",
      time: "05:12",
      message: "Huuuh, guys, let's play crush",
    },
    { user: "Miami", time: "00:05", message: "now?" },
    { user: "Devilfish", time: "01:11", message: "pleeeease let’s g" },
    { user: "The Professor", time: "02:03", message: "Like the website" },
    { user: "The Mathematician", time: "02:45", message: "I got it" },
    { user: "Texas Dolly", time: "00:36", message: "catched $340,33!!!!!" },
    { user: "El Matador", time: "12:04", message: "so who wil play?" },
    { user: "Devilfish", time: "01:11", message: "me" },
    { user: "Devilfish", time: "01:11", message: "let’s go" },
  ]);
  const [chatInput, setChatInput] = useState("");
  // Chat scroll ref
  const chatEndRef = useRef<HTMLDivElement>(null);
  // Prevent scroll on initial render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Carousel 1 (Games)
  const [gamesEmblaRef, gamesEmblaApi] = useEmblaCarousel({ loop: false });
  const [canScrollPrevGames, setCanScrollPrevGames] = useState(false);
  const [canScrollNextGames, setCanScrollNextGames] = useState(false);

  // Carousel 2 (Categories)
  const [categoriesEmblaRef, categoriesEmblaApi] = useEmblaCarousel({
    loop: false,
  });
  const [canScrollPrevCategories, setCanScrollPrevCategories] = useState(false);
  const [canScrollNextCategories, setCanScrollNextCategories] = useState(false);

  useEffect(() => {
    if (!gamesEmblaApi) return;
    const onSelect = () => {
      setCanScrollPrevGames(gamesEmblaApi.canScrollPrev());
      setCanScrollNextGames(gamesEmblaApi.canScrollNext());
    };
    onSelect();
    gamesEmblaApi.on("select", onSelect);
  }, [gamesEmblaApi]);

  useEffect(() => {
    if (!categoriesEmblaApi) return;
    const onSelect = () => {
      setCanScrollPrevCategories(categoriesEmblaApi.canScrollPrev());
      setCanScrollNextCategories(categoriesEmblaApi.canScrollNext());
    };
    onSelect();
    categoriesEmblaApi.on("select", onSelect);
  }, [categoriesEmblaApi]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const filteredGames = gamesData.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGameClick = (game: Game): void => {
    setSelectedGame(game);
  };

  const handleBonusClaim = (): void => {
    setShowBonusModal(true);
  };

  const closeBonusModal = (): void => {
    setShowBonusModal(false);
  };

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleRecentActivity = (): void => {
    setShowRecentActivity(!showRecentActivity);
    if (showLeaderboard) setShowLeaderboard(false);
  };

  const toggleLeaderboard = (): void => {
    setShowLeaderboard(!showLeaderboard);
    if (showRecentActivity) setShowRecentActivity(false);
  };

  return (
    <div
      className={`min-h-screen w-full ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 to-white text-gray-900"
      } transition-colors duration-500`}
    >
      <div className="flex w-full min-h-screen">
        <div className="basis-[15%] hidden lg:block">
          <aside
            className={`hidden md:block sticky top-0 left-0 h-screen 2xl:w-80 xl:w-64 w-full z-40 transition-colors duration-500 overflow-y-auto md:overflow-y-visible p-3`}
          >
            <div
              className={`md:sticky md:top-3 flex flex-col h-full rounded-xl bg-gradient-to-b ${
                isDarkMode
                  ? "from-gray-800 to-gray-900"
                  : "from-gray-200 to-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 justify-center p-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`p-2 rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-br from-indigo-600 to-violet-800"
                      : "bg-gradient-to-br from-indigo-500 to-violet-700"
                  }`}
                >
                  <Gamepad2 className="w-5 h-5 text-white" />
                </motion.div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  GameHub
                </h1>
              </div>

              <div className="relative group p-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isDarkMode
                        ? "bg-gray-900/90 group-hover:bg-gray-800/90"
                        : "bg-gray-50/90 group-hover:bg-gray-100/90"
                    } px-4 py-2 rounded-full border ${
                      isDarkMode
                        ? "border-gray-800/50 group-hover:border-gray-700/50"
                        : "border-gray-200/50 group-hover:border-gray-300/50"
                    } transition-all duration-300`}
                  >
                    <Search
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search games..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`bg-transparent border-none outline-none w-48 placeholder-gray-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      } transition-colors duration-300`}
                    />
                  </div>
                </motion.div>
              </div>

              <nav className="p-3">
                <h3
                  className={`text-xs font-semibold uppercase ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-3`}
                >
                  Game Categories
                </h3>
                <div className="space-y-1">
                  {categoriesData.map((category, index) => {
                    const isActive = selectedCategory === category.name;

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedCategory(category.name)}
                        className={clsx(
                          "relative flex items-center px-4 py-2 rounded-xl cursor-pointer transition-colors",
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : isDarkMode
                            ? "hover:bg-gray-900 text-gray-300"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        <div className="text-lg mr-4 my-2">
                          {iconMap[category.tabName] || <Package />}
                        </div>

                        <span className="font-medium">{category.name}</span>

                        {category.notificationCount > 0 && (
                          <div className="absolute right-3 w-5 h-5 text-[11px] bg-yellow-400 text-black font-bold rounded-full flex items-center justify-center shadow-md">
                            {category.notificationCount}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </nav>
            </div>
          </aside>
        </div>
        <div className="basis-[100%] lg:basis-[70%] w-full max-w-full overflow-auto">
          <header className="hidden lg:flex fixed w-full flex items-center py-3 text-sm relative">
            <div className="flex items-center justify-between w-full px-6">
              <div
                className={clsx("hidden md:flex items-center gap-2 px-1 py-1")}
              >
                <div
                  className={clsx(
                    "md:flex items-center gap-2 px-1 py-1 rounded-full",
                    isDarkMode ? "bg-gray-900" : "bg-gray-300"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={toggleRecentActivity}
                      className={clsx(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                        showRecentActivity
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      Recent Activity
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={toggleLeaderboard}
                      className={clsx(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                        showLeaderboard
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                          : isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      Leaderboard
                    </button>
                  </motion.div>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className={clsx(
                      "relative flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-colors",
                      "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                    )}
                  >
                    <Home className="w-4 h-4" />
                    Home
                    <span className="absolute left-0 -bottom-[2px] w-full h-[2px] rounded-full"></span>
                  </span>
                  {/* Scroll to Bonus Center button */}
                  <button
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer relative"
                    style={{ background: "none", border: "none", padding: 0 }}
                    onClick={() =>
                      bonusRef.current?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Gift className="w-4 h-4" />
                    Bonuses
                  </button>
                </div>
              </div>
              <div className="mt-auto p-3">
                <div
                  className={`p-4 rounded-xl ${
                    isDarkMode
                      ? "bg-gray-900/50 border border-gray-800/30"
                      : "bg-gray-50/80 border border-gray-200/50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-full ${
                        isDarkMode ? "bg-indigo-600/20" : "bg-indigo-100"
                      }`}
                    >
                      <Wallet className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h4
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <span className="text-sm font-semibold">
                        Total Balance: ${balance.toLocaleString()}
                      </span>
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    <span className="font-medium">+12.4%</span> from last month
                  </p>
                </div>
              </div>
            </div>
          </header>
          <header className="sticky lg:hidden w-full flex items-center justify-between px-4 py-3 z-50 shadow-sm bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={clsx(
                  "p-2 rounded-full",
                  isDarkMode
                    ? "bg-gradient-to-br from-indigo-600 to-violet-800"
                    : "bg-gradient-to-br from-indigo-500 to-violet-700"
                )}
              >
                <Gamepad2 className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                GameHub
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div
                className={clsx(
                  "flex items-center gap-2 px-1 py-1 rounded-full",
                  isDarkMode ? "bg-gray-900" : "bg-gray-300"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={toggleRecentActivity}
                    className={clsx(
                      "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      showRecentActivity
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    Recent Activity
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={toggleLeaderboard}
                    className={clsx(
                      "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                      showLeaderboard
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    Leaderboard
                  </button>
                </motion.div>
              </div>

              <span className="relative flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <Home className="w-4 h-4" />
                Home
              </span>

              <span
                className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
                onClick={() => toast.info("Coming soon...")}
              >
                <Gift className="w-4 h-4" />
                Bonuses
              </span>
              {/* Dark mode toggle removed */}
            </div>
            <div className="block md:hidden">
              <button onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                  <X className={`w-6 h-6 text-white`} />
                ) : (
                  <Menu className={`w-6 h-6 text-white`} />
                )}
              </button>
            </div>
          </header>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden shadow-inner overflow-hidden px-4 py-6 space-y-4 ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <button
                  onClick={toggleRecentActivity}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Recent Activity
                </button>
                <button
                  onClick={toggleLeaderboard}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Leaderboard
                </button>
                <button
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <Home className="w-4 h-4" /> Home
                </button>
                <button
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  onClick={() => toast.info("Coming soon...")}
                >
                  <Gift className="w-4 h-4" /> Bonuses
                </button>
                {/* Dark mode toggle removed from mobile menu */}
              </motion.div>
            )}
          </AnimatePresence>
          <aside
            className={`lg:hidden sticky top-0 left-0 bottom-0 w-full z-40 transition-colors duration-500 overflow-y-auto md:overflow-y-visible p-3`}
          >
            <div
              className={`md:sticky md:top-3 flex flex-col rounded-xl bg-gradient-to-b ${
                isDarkMode
                  ? "from-gray-800 to-gray-900"
                  : "from-gray-200 to-gray-300"
              }`}
            >
              <div className="relative group p-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isDarkMode
                        ? "bg-gray-900/90 group-hover:bg-gray-800/90"
                        : "bg-gray-50/90 group-hover:bg-gray-100/90"
                    } px-4 py-2 rounded-full border ${
                      isDarkMode
                        ? "border-gray-800/50 group-hover:border-gray-700/50"
                        : "border-gray-200/50 group-hover:border-gray-300/50"
                    } transition-all duration-300`}
                  >
                    <Search
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search games..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`bg-transparent border-none outline-none w-48 placeholder-gray-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      } transition-colors duration-300`}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </aside>
          <AnimatePresence>
            {(showRecentActivity || showLeaderboard) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-8 mx-3 p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-900/90 border border-gray-800/50"
                    : "bg-white/90 border border-gray-200/50"
                } backdrop-blur-md`}
              >
                <h2
                  className={`text-xl font-bold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {showRecentActivity ? "Recent Activity" : "Leaderboard"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(showRecentActivity ? betsData : leaderboardData).map(
                    (item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl ${
                          isDarkMode
                            ? "bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700/50"
                            : "bg-gray-50/70 hover:bg-gray-50/90 border border-gray-200/50"
                        } backdrop-blur-md hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full ${
                              isDarkMode ? "bg-gray-700/70" : "bg-gray-200/70"
                            } backdrop-blur-md flex items-center justify-center text-lg font-semibold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {showRecentActivity
                              ? getInitials(item.user)
                              : item.user.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4
                              className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.user}
                            </h4>
                            <p
                              className={`text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {showRecentActivity
                                ? "amount" in item && "time" in item
                                  ? `Bet ${item.amount} - ${item.time}`
                                  : ""
                                : "games" in item && "level" in item
                                ? `${item.games} - ${item.level}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={
                    showRecentActivity
                      ? toggleRecentActivity
                      : toggleLeaderboard
                  }
                  className="mt-6 mx-auto block cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all duration-300"
                >
                  Close
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <section className="my-6 px-3 lg:px-0">
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-xl font-bold ml-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Popular Games
              </h2>
            </div>

            <div className="relative">
              <div className="overflow-hidden" ref={gamesEmblaRef}>
                <div className="flex gap-4 px-2">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className={`min-w-[230px] max-w-[230px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg relative cursor-pointer hover:scale-105 transition
            ${
              isDarkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200"
            }`}
                    >
                      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between p-3">
                        <span className="text-white text-sm font-bold truncate">
                          {game.name}
                        </span>
                        <button
                          onClick={() => handleGameClick(game)}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-md shadow-sm"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="relative w-full h-full">
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute bottom-4 left-4 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold">
                          {game.bonus}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {canScrollPrevGames && (
                <button
                  onClick={() => gamesEmblaApi?.scrollPrev()}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {canScrollNextGames && (
                <button
                  onClick={() => gamesEmblaApi?.scrollNext()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </section>

          <section className="my-8 py-6 px-3 lg:px-0">
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-xl ml-3 font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Game Categories
              </h2>
            </div>

            <div className="relative">
              <div className="overflow-hidden" ref={categoriesEmblaRef}>
                <div className="flex gap-4 px-2">
                  {categoriesData.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`min-w-[220px] max-w-[220px] flex items-center p-4 rounded-xl text-left transition-all duration-300 flex-shrink-0
                              ${
                                isDarkMode
                                  ? "bg-[#1E293B] hover:bg-[#1E293B]/90 text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                              }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center mr-4">
                        {iconMap[category.name] ?? (
                          <LayoutDashboard className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-sm leading-snug">
                          {category.name}
                        </h3>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {category.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {canScrollPrevCategories && (
                <button
                  onClick={() => categoriesEmblaApi?.scrollPrev()}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {canScrollNextCategories && (
                <button
                  onClick={() => categoriesEmblaApi?.scrollNext()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </section>

          <section className="my-8 py-6 px-3 lg:px-0 relative">
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-xl ml-3 font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Live Activity
              </h2>
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => {
                    setActiveTab("bets");
                    setFilterField(null);
                  }}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === "bets"
                      ? "bg-indigo-500 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Bets
                </button>
                <button
                  onClick={() => {
                    setActiveTab("players");
                    setFilterField(null);
                  }}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === "players"
                      ? "bg-indigo-500 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Top Players
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowFilter((prev) => !prev)}
                    className={`ml-2 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z"
                      />
                    </svg>
                    Filter
                  </button>

                  {showFilter && (
                    <div
                      className={`absolute right-0 mt-2 z-10 rounded-md shadow-lg ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      <select
                        className="block w-full p-2 text-sm rounded-md bg-inherit border border-gray-300 dark:border-gray-600"
                        onChange={(e) => setFilterField(e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Filter
                        </option>
                        {(activeTab === "bets"
                          ? ["Bet Amount", "Payout", "Profit"]
                          : ["Games", "Earnings"]
                        ).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`${
                isDarkMode ? "bg-gray-900/80" : "bg-white/90"
              } rounded-xl backdrop-blur-md overflow-x-auto`}
            >
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    {(activeTab === "bets"
                      ? ["Game", "User", "Bet Amount", "Payout", "Profit"]
                      : ["Rank", "User", "Games", "Level", "Earnings"]
                    ).map((title) => (
                      <th
                        key={title}
                        className={`p-4 text-left font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "bets" &&
                    [...betsData]
                      .sort((a, b) => {
                        const fieldMap = {
                          "Bet Amount": "amount",
                          Payout: "payout",
                          Profit: "profit",
                        } as const;
                        type BetField = keyof Pick<
                          Bet,
                          "amount" | "payout" | "profit"
                        >;
                        const field = filterField
                          ? (fieldMap[
                              filterField as keyof typeof fieldMap
                            ] as BetField)
                          : undefined;
                        return field ? Number(b[field]) - Number(a[field]) : 0;
                      })
                      .map((bet) => (
                        <tr
                          key={bet.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition border-b last:border-b-0 border-gray-200 dark:border-gray-700"
                        >
                          <td className="p-4">{bet.gameId}</td>
                          <td className="p-4">{bet.user}</td>
                          <td className="p-4">${bet.amount}</td>
                          <td className="p-4">${bet.payout}</td>
                          <td
                            className={`p-4 font-semibold ${
                              bet.profit < 0
                                ? "text-red-500"
                                : "text-emerald-500"
                            }`}
                          >
                            ${bet.profit}
                          </td>
                        </tr>
                      ))}
                  {activeTab === "players" &&
                    [...leaderboardData]
                      .sort((a, b) => {
                        const fieldMap = {
                          Games: "games",
                          Earnings: "earnings",
                        } as const;
                        type LeaderboardField = keyof Pick<
                          LeaderboardEntry,
                          "games" | "earnings"
                        >;
                        const field =
                          filterField &&
                          (fieldMap[filterField as keyof typeof fieldMap] as
                            | LeaderboardField
                            | undefined);
                        if (!field) return 0;
                        // If field is "games", extract the number from the string (e.g., "125 Games")
                        const getValue = (entry: LeaderboardEntry) =>
                          field === "games"
                            ? parseFloat(String(entry.games).split(" ")[0])
                            : Number(entry.earnings);
                        return getValue(b) - getValue(a);
                      })
                      .map((player) => (
                        <tr
                          key={player.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition border-b last:border-b-0 border-gray-200 dark:border-gray-700"
                        >
                          <td className="p-4">{player.rank}</td>
                          <td className="p-4">{player.user}</td>
                          <td className="p-4">{player.games}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                player.level === "Expert"
                                  ? "bg-amber-600/90 text-white"
                                  : player.level === "Advanced"
                                  ? "bg-emerald-600/90 text-white"
                                  : "bg-sky-600/90 text-white"
                              }`}
                            >
                              {player.level}
                            </span>
                          </td>
                          <td className="p-4 font-semibold text-emerald-500">
                            ${player.earnings}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-8 py-6 px-3 lg:px-0">
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-xl ml-3 font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Earnings Analytics
              </h2>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-indigo-500`}></div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Weekly Profit
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 rounded-xl ${
                isDarkMode
                  ? "bg-gray-900/80 border border-gray-800/30"
                  : "bg-white/90 border border-gray-200/50"
              } backdrop-blur-md hover:shadow-lg transition-all duration-300`}
            >
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                    />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: `1px solid ${
                          isDarkMode ? "#374151" : "#e5e7eb"
                        }`,
                        borderRadius: "0.5rem",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#818cf8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Bonus Center section */}
            <section ref={bonusRef} className="mt-6">
              <div
                className={`rounded-xl p-5 group transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-indigo-600/10 to-violet-800/10 border border-violet-800/30"
                    : "bg-gradient-to-br from-indigo-100 to-violet-200 border border-violet-400/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg font-bold">Bonus Center</h2>
                </div>
                <p
                  className={`text-sm mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Claim your $250 welcome bonus now and start playing today!
                </p>
                {/* Display user's current balance above the bonus section */}
                <div className="mb-2 text-sm font-semibold text-right text-gray-700 dark:text-gray-300">
                  Current Balance: ${balance.toLocaleString()}
                </div>
                {!bonusClaimed ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-yellow-400 text-black font-bold text-sm shadow-md group-hover:bg-yellow-300 transition"
                    onClick={() => {
                      setBonusClaimed(true);
                      setBalance((prev) => prev + 250);
                      toast.success(
                        "Bonus claimed! $250 added to your account."
                      );
                    }}
                  >
                    Claim Bonus
                  </motion.button>
                ) : (
                  <div className="text-green-500 font-semibold text-sm">
                    Bonus claimed successfully!
                  </div>
                )}
              </div>
            </section>
          </section>

          <aside
            className={`block lg:hidden top-0 left-0 bottom-0 2xl:w-80 xl:w-64 w-full z-40 transition-colors duration-500 overflow-y-auto md:overflow-y-visible p-3`}
          >
            <div
              className={`md:top-3 flex flex-col rounded-xl bg-gradient-to-b ${
                isDarkMode
                  ? "from-gray-800 to-gray-900"
                  : "from-gray-200 to-gray-300"
              }`}
            >
              <div className="p-3">
                <div
                  className={`p-5 rounded-xl ${
                    isDarkMode
                      ? "bg-gradient-to-br from-indigo-600/20 to-violet-800/20 border border-indigo-600/30"
                      : "bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50"
                  } relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-50"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-amber-500" />
                      <h3
                        className={`font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        New Player Bonus
                      </h3>
                    </div>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } mb-4 text-sm`}
                    >
                      Claim your welcome bonus and get started with extra
                      credits!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBonusClaim}
                      className="relative overflow-hidden group cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                      <span className="relative flex items-center gap-2 justify-center">
                        <Gift className="w-4 h-4" />
                        Claim Bonus
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="basis-[15%] hidden lg:block">
          {/* Dark mode toggle removed from right sidebar */}
          <aside
            className={`hidden md:block sticky top-0 left-0 bottom-0 2xl:w-80 xl:w-64 w-full z-40 transition-colors duration-500 overflow-y-auto md:overflow-y-visible p-3`}
          >
            <div
              className={`md:top-3 flex flex-col gap-4 rounded-xl bg-gradient-to-b ${
                isDarkMode
                  ? "from-gray-800 to-gray-900"
                  : "from-gray-200 to-gray-300"
              }`}
            >
              {/* New Player Bonus removed from right sidebar */}
              {/* Chat box */}
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode
                    ? "bg-gray-900/50 border border-gray-800/30"
                    : "bg-white border border-gray-200/70"
                } flex flex-col h-[440px]`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-semibold text-sm">Chat</h3>
                  </div>
                  <div className="flex -space-x-2">
                    <Avatar className="w-6 h-6 border-2 border-white" />
                    <Avatar className="w-6 h-6 border-2 border-white" />
                    <Avatar className="w-6 h-6 border-2 border-white" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-xs">
                          {msg.user}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {msg.time}
                        </span>
                      </div>
                      <div
                        className={`${
                          isDarkMode ? "bg-gray-800" : "bg-gray-100"
                        } rounded-lg px-3 py-2 text-sm mt-1`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="mt-3">
                  <div
                    className={`flex items-center px-3 py-2 rounded-full ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Send message"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && chatInput.trim()) {
                          e.preventDefault();
                          const now = new Date();
                          const formattedTime = now.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                          setChatMessages([
                            ...chatMessages,
                            {
                              user: "You",
                              time: formattedTime,
                              message: chatInput,
                            },
                          ]);
                          setChatInput("");
                        }
                      }}
                      className={`bg-transparent flex-1 text-sm outline-none ${
                        isDarkMode
                          ? "text-white placeholder-gray-400"
                          : "text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <SendHorizonal
                      className="w-4 h-4 text-blue-500 cursor-pointer ml-2"
                      onClick={() => {
                        if (chatInput.trim()) {
                          const now = new Date();
                          const formattedTime = now.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                          setChatMessages([
                            ...chatMessages,
                            {
                              user: "You",
                              time: formattedTime,
                              message: chatInput,
                            },
                          ]);
                          setChatInput("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {showBonusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative rounded-xl w-full max-w-md ${
                isDarkMode
                  ? "bg-gray-950 border border-indigo-600/30"
                  : "bg-white border border-indigo-100/50"
              } shadow-2xl p-6`}
            >
              <button
                onClick={closeBonusModal}
                className={`absolute top-4 right-4 p-1 rounded-full ${
                  isDarkMode
                    ? "text-gray-400 hover:bg-gray-800/50"
                    : "text-gray-500 hover:bg-gray-100/50"
                } transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-br from-indigo-600/20 to-violet-800/20"
                      : "bg-gradient-to-br from-indigo-50 to-violet-50"
                  } flex items-center justify-center mb-4`}
                >
                  <Gift className="w-10 h-10 text-indigo-500" />
                </div>

                <h3
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Welcome Bonus!
                </h3>
                <p
                  className={`mt-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Get started with our exclusive welcome bonus!
                </p>

                <div
                  className={`mt-6 w-full p-5 rounded-xl ${
                    isDarkMode
                      ? "bg-indigo-600/10 border border-indigo-600/20"
                      : "bg-indigo-50 border border-indigo-100/50"
                  }`}
                >
                  <p
                    className={`text-3xl font-bold ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    $250 Credits
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-indigo-300" : "text-indigo-500"
                    }`}
                  >
                    + 100% match bonus on your first deposit
                  </p>
                </div>

                <p
                  className={`mt-6 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Claim this bonus and get immediate access to premium games,
                  exclusive tournaments, and accelerated earning potential.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium transition-all duration-300"
                  onClick={() => toast.info("Coming soon...")}
                >
                  Claim $250 Welcome Bonus
                </motion.button>

                <p
                  className={`mt-4 text-xs ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  *Bonus valid for new users only. Terms and conditions apply.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative rounded-xl w-full max-w-4xl ${
                isDarkMode
                  ? "bg-gray-950 border border-indigo-600/30"
                  : "bg-white border border-indigo-100/50"
              } shadow-2xl overflow-hidden`}
            >
              <div
                className={`relative h-48 ${selectedGame.bgClass} overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode
                      ? "from-gray-950/90 to-transparent"
                      : "from-gray-100/70 to-transparent"
                  }`}
                ></div>
                <img
                  src={selectedGame.image}
                  alt={selectedGame.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedGame(null)}
                  className={`absolute top-4 right-4 p-1 rounded-full ${
                    isDarkMode
                      ? "text-white bg-gray-800/50 hover:bg-gray-700/50"
                      : "text-gray-800 bg-white/50 hover:bg-white/70"
                  } transition-colors cursor-pointer`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <h3
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedGame.name}
                </h3>
                <p
                  className={`text-lg ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {selectedGame.category}
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-900/80 border border-gray-800/30"
                        : "bg-gray-50/80 border border-gray-200/50"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Last Profit
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedGame.profit}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    >
                      {selectedGame.gain}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-900/80 border border-gray-800/30"
                        : "bg-gray-50/80 border border-gray-200/50"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Bonus
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedGame.bonus}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Exclusive Offer
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-900/80 border border-gray-800/30"
                        : "bg-gray-50/80 border border-gray-200/50"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Total Players
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      12,345
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Active Users
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    Launch Game
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGame(null)}
                    className={`flex-1 cursor-pointer py-3 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 text-white"
                        : "bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200/50 text-gray-800"
                    } font-medium transition-all duration-300`}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster richColors />
    </div>
  );
}
