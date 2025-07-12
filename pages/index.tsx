import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Minus,
  Settings,
  Moon,
  Sun,
  BarChart3,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Define types for our data structures
type WaterLog = {
  id: string;
  amount: number;
  timestamp: number;
};

type UserSettings = {
  dailyGoal: number;
  notifications: boolean;
  darkMode: boolean;
};

// Default export of the WaterTracker component
export default function WaterTracker() {
  // State for water logs
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [currentAmount, setCurrentAmount] = useState<number>(250);

  // State for user settings
  const [settings, setSettings] = useState<UserSettings>({
    dailyGoal: 2000,
    notifications: true,
    darkMode: false,
  });

  // UI state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");
  const [notification, setNotification] = useState<string | null>(null);

  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.querySelector(
      'link[href*="fonts.googleapis.com/css2?family=Rethink+Sans"]'
    );

    if (!existing) {
      const fontLink = document.createElement("link");
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Rethink+Sans&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
  }, []);

  // Set up theme on initial load and when settings change
  useEffect(() => {
    setMounted(true);

    // Check for system preference on initial load
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setSettings((prev) => ({
      ...prev,
      darkMode: prefersDark,
    }));
  }, []);

  // Apply theme when settings change
  useEffect(() => {
    if (!mounted) return;

    // Add or remove dark class on body
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#111827";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#f3f4f6";
    }

    // Save to localStorage
    localStorage.setItem(
      "water-tracker-settings",
      JSON.stringify({
        ...settings,
        darkMode: settings.darkMode,
      })
    );
  }, [settings, mounted]);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("water-tracker-settings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings({
        dailyGoal: parsed.dailyGoal || 2000,
        notifications:
          parsed.notifications !== undefined ? parsed.notifications : true,
        darkMode: parsed.darkMode !== undefined ? parsed.darkMode : false,
      });
    }

    const savedLogs = localStorage.getItem("water-tracker-logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs to localStorage when they change
  useEffect(() => {
    localStorage.setItem("water-tracker-logs", JSON.stringify(logs));
  }, [logs]);

  // Handle notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Click outside to close settings or menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate daily stats
  const today = new Date().toISOString().split("T")[0];
  const todaysLogs = logs.filter((log) => {
    const logDate = new Date(log.timestamp).toISOString().split("T")[0];
    return logDate === today;
  });

  const totalToday = todaysLogs.reduce((sum, log) => sum + log.amount, 0);
  const progressPercent =
    settings.dailyGoal > 0
      ? Math.min(100, Math.round((totalToday / settings.dailyGoal) * 100))
      : 0;
  const remaining = Math.max(0, settings.dailyGoal - totalToday);

  // Add water log
  const addLog = (amount: number) => {
    if (amount <= 0) return;

    const newLog: WaterLog = {
      id: Date.now().toString(),
      amount,
      timestamp: Date.now(),
    };

    setLogs([...logs, newLog]);

    // Show notification
    if (settings.notifications) {
      setNotification(`Added ${amount}ml of water`);
    }
  };

  // Remove water log
  const removeLog = (id: string) => {
    const logToRemove = logs.find((log) => log.id === id);
    if (!logToRemove) return;

    setLogs(logs.filter((log) => log.id !== id));

    // Show notification
    if (settings.notifications) {
      setNotification(`Removed ${logToRemove.amount}ml of water`);
    }
  };

  // Update user settings
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Group logs by date for history view
  const getHistoryData = () => {
    const grouped: { date: string; total: number; count: number }[] = [];

    logs.forEach((log) => {
      const date = new Date(log.timestamp).toISOString().split("T")[0];
      const existing = grouped.find((group) => group.date === date);

      if (existing) {
        existing.total += log.amount;
        existing.count += 1;
      } else {
        grouped.push({
          date,
          total: log.amount,
          count: 1,
        });
      }
    });

    return grouped.sort((a, b) => b.date.localeCompare(a.date));
  };

  // Format date for display
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date for history view
  const formatHistoryDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Generate chart data for history view
  const getChartData = () => {
    const grouped = getHistoryData();

    // Limit to last 7 days
    const last7Days = grouped.slice(0, 7);

    // Reverse to chronological order for charts
    const chartData = [...last7Days].reverse();

    return chartData.map((item) => ({
      date: formatHistoryDate(item.date),
      amount: item.total,
    }));
  };

  // Calculate water stats for achievements
  const calculateWaterStats = () => {
    // Calculate total water consumed ever
    const totalEver = logs.reduce((sum, log) => sum + log.amount, 0);

    // Calculate average per day
    const uniqueDays = Array.from(
      new Set(
        logs.map((log) => {
          const date = new Date(log.timestamp).toISOString().split("T")[0];
          return date;
        })
      )
    ).length;

    const averagePerDay =
      uniqueDays > 0 ? Math.round(totalEver / uniqueDays) : 0;

    // Calculate longest streak
    const dates = Array.from(
      new Set(
        logs.map((log) => {
          const date = new Date(log.timestamp).toISOString().split("T")[0];
          return date;
        })
      )
    ).sort();

    let longestStreak = 0;
    let currentStreak = 0;
    let previousDate = "";

    for (const date of dates) {
      if (!previousDate) {
        currentStreak = 1;
        previousDate = date;
        continue;
      }

      const prev = new Date(previousDate);
      const current = new Date(date);
      const diffTime = Math.abs(current.getTime() - prev.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        currentStreak = 1;
      }

      previousDate = date;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    return {
      totalEver,
      averagePerDay,
      longestStreak,
    };
  };

  const waterStats = calculateWaterStats();

  // container and bg
  const bgGradient = settings.darkMode ? "bg-[#000B33]" : "bg-sky-50";
  const accentColor = settings.darkMode ? "bg-[#BFDFFF]" : "bg-sky-500";
  const accentHover = settings.darkMode
    ? "hover:bg-sky-700"
    : "hover:bg-sky-600";
  const accentActive = settings.darkMode
    ? "active:bg-sky-800"
    : "active:bg-sky-700";
  const secondaryColor = settings.darkMode ? "bg-[#000B33]" : "bg-[#BFDFFF]";
  const textColor = settings.darkMode ? "text-slate-200" : "text-slate-700";
  const inputBg = settings.darkMode ? "bg-[#000B33]" : "bg-white";
  const inputBorder = settings.darkMode
    ? "border-slate-700"
    : "border-slate-200";
  const cardBg = settings.darkMode ? "bg-[#111F52]" : "bg-slate-100";
  const cardBorder = settings.darkMode
    ? "border-[#162B75]"
    : "border-slate-200";
  const buttonSecondary = settings.darkMode
    ? "bg-[#162B75] hover:bg-slate-600"
    : "bg-slate-200 hover:bg-slate-300";
  const buttonSecondaryText = settings.darkMode
    ? "text-[#BFDFFF]"
    : "text-[#111F52]";
  const progressBarBg = settings.darkMode ? "bg-[#000B33]" : "bg-slate-200";
  const progressBarFill = settings.darkMode
    ? "bg-[#00E1FF]"
    : "bg-gradient-to-r from-sky-500 to-cyan-500";
  const glassMorphism =
    "backdrop-blur-lg bg-opacity-90 dark:bg-opacity-80 shadow-xl";

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  // Item variants for staggered animations
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Notification variants
  const notificationVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Modal variants
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Tab content variants
  const tabContentVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        settings.darkMode ? "dark" : ""
      }`}
      style={{ fontFamily: "'Rethink Sans', sans-serif" }}
    >
      <div
        className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-500 ${textColor}`}
      >
        <motion.div
          className="container mx-auto px-4 py-8 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            className="flex justify-between items-center mb-8 border p-6 border-blue-200 dark:border-[#162B75] bg-blue-100 dark:bg-[#111F52] rounded-lg"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("today")}
            >
              <h1 className="text-2xl sm:text-4xl tracking-tight text-[#62B1FF]">
                💧<b className="text-[#0466C8]">Water</b>Tracker
              </h1>
            </motion.div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                className={`p-2 rounded-full  dark:bg-[#000B33] dark:hover:bg-slate-600 bg-[#BFDFFF] hover:bg-slate-300 ${buttonSecondaryText} transition-all duration-300 shadow-md`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={
                  settings.darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {settings.darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full dark:bg-[#000B33] dark:hover:bg-slate-600 bg-[#BFDFFF] hover:bg-slate-300 ${buttonSecondaryText} transition-all duration-300 shadow-md`}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg dark:text-[#000B33] text-white text-sm font-medium z-50 ${accentColor}`}
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {notification}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSettings(false)}
              >
                <motion.div
                  ref={settingsRef}
                  className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${glassMorphism} ${cardBg} border ${cardBorder}`}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`p-4 border-b ${cardBorder}`}>
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Settings
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block mb-2 font-medium">
                        Daily Water Goal (ml)
                      </label>
                      <input
                        type="number"
                        min="500"
                        max="5000"
                        step="100"
                        value={
                          settings.dailyGoal === 0 ? "" : settings.dailyGoal
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSettings({
                            dailyGoal: val === "" ? 0 : parseInt(val),
                          });
                        }}
                        className={`w-full p-2 rounded-lg ${inputBg} ${inputBorder} border focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300`}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dark Mode</span>
                      <motion.button
                        onClick={() =>
                          updateSettings({ darkMode: !settings.darkMode })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                          settings.darkMode
                            ? "dark:bg-[#023E7D]"
                            : secondaryColor
                        }`}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
                            settings.darkMode
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </motion.button>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">
                          {progressPercent}%
                        </span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full ${progressBarBg}`}
                      >
                        <motion.div
                          className={`h-2 rounded-full ${progressBarFill}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                      <p className="text-sm mt-1">
                        {remaining > 0
                          ? `You still need to drink ${remaining}ml to reach your goal today`
                          : "Congratulations! You've reached your daily goal"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-t ${cardBorder} flex justify-end`}
                  >
                    <motion.button
                      onClick={() => setShowSettings(false)}
                      className={`px-4 py-2 rounded-lg dark:bg-[#023E7D] bg-sky-500 text-white ${accentHover} ${accentActive} transition-all duration-300 shadow-md`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Water Progress Card */}
            <motion.div
              className={`md:col-span-2 rounded-xl shadow-xl overflow-hidden ${glassMorphism} ${cardBg} border ${cardBorder}`}
              variants={itemVariants}
            >
              <div
                className={`p-4 border-b ${cardBorder} flex justify-between items-center bg-[#162B75]`}
              >
                <h2 className="text-lg font-bold dark:text-[#BFDFFF] text-white">
                  Water Progress
                </h2>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() =>
                      setActiveTab(activeTab === "today" ? "history" : "today")
                    }
                    className={`p-3 rounded-full dark:bg-[#000B33] dark:hover:bg-slate-800 bg-[#BFDFFF] hover:bg-slate-300 ${buttonSecondaryText} transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Switch to ${
                      activeTab === "today" ? "history" : "today"
                    } view`}
                  >
                    {activeTab === "today" ? (
                      <BarChart3 className="h-4 w-4" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "today" ? (
                  <motion.div
                    key="today"
                    className="p-6"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                      <div>
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold uppercase">
                              📈 Progress
                            </span>
                            <span className="text-sm font-medium">
                              {progressPercent}%
                            </span>
                          </div>
                          <div
                            className={`w-full h-4 rounded-full ${progressBarBg}`}
                          >
                            <motion.div
                              className={`h-4 rounded-full ${progressBarFill}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercent}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            ></motion.div>
                          </div>
                          <p className="text-sm mt-2 dark:text-[#BFDFFF]">
                            {remaining > 0
                              ? `You still need to drink ${remaining}ml to reach your goal today`
                              : "Congratulations! You've reached your daily goal"}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            className={`rounded-sm py-4 px-5 ${secondaryColor} dark:text-[#BFDFFF] text-center transition-all duration-300 shadow-inner`}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <p className="text-sm opacity-70 mb-2">
                              Drunk Today
                            </p>
                            <p className="text-xl font-bold">{totalToday}ml</p>
                          </motion.div>
                          <motion.div
                            className={`rounded-sm py-4 px-5 ${secondaryColor} dark:text-[#BFDFFF] text-center transition-all duration-300 shadow-inner`}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <p className="text-sm opacity-70 w-2/3 text-center mx-auto">
                              Main Goal
                            </p>
                            <p className="text-xl font-bold">
                              {settings.dailyGoal}ml
                            </p>
                          </motion.div>
                        </div>

                        <motion.div
                          className="mt-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className="block mb-2 text-sm font-medium uppercase dark:text-[#BFDFFF]">
                            Recent Logs
                          </label>
                          <div
                            className={`rounded-lg border ${cardBorder} overflow-hidden max-h-64 overflow-y-auto`}
                          >
                            <table className="w-full">
                              <thead
                                className={`sticky top-0 text-sm dark:bg-[#023E7D] bg-[#62B1FF] ${cardBorder} border-b`}
                              >
                                <tr>
                                  <th className="p-3 text-left font-semibold">
                                    Time
                                  </th>
                                  <th className="p-3 text-right font-semibold">
                                    Amount
                                  </th>
                                  <th className="p-3 text-right font-semibold">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {logs.length === 0 ? (
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="p-4 text-center text-slate-500 dark:text-slate-400"
                                    >
                                      No water logs yet
                                    </td>
                                  </tr>
                                ) : (
                                  [...logs]
                                    .sort((a, b) => b.timestamp - a.timestamp)
                                    .slice(0, 3)
                                    .map((log, index) => {
                                      const date = new Date(log.timestamp);
                                      const isToday =
                                        date.toISOString().split("T")[0] ===
                                        today;
                                      return (
                                        <motion.tr
                                          key={log.id}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: index * 0.05 }}
                                          className={`hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200 ${
                                            isToday
                                              ? "bg-sky-50 dark:bg-sky-900/20"
                                              : ""
                                          }`}
                                        >
                                          <td className="p-3 text-sm">
                                            {formatDate(log.timestamp)}
                                          </td>
                                          <td className="p-3 text-right text-sm">
                                            {log.amount}ml
                                          </td>
                                          <td className="p-3 text-right">
                                            <motion.button
                                              onClick={() => addLog(log.amount)}
                                              className={`p-1 rounded-full ${buttonSecondary} ${buttonSecondaryText} transition-all duration-300`}
                                              whileHover={{
                                                scale: 1.1,
                                                backgroundColor:
                                                  settings.darkMode
                                                    ? "rgba(239, 68, 68, 0.1)"
                                                    : "rgba(239, 68, 68, 0.05)",
                                              }}
                                              whileTap={{ scale: 0.9 }}
                                              aria-label="Add log"
                                            >
                                              <Plus size={16} />
                                            </motion.button>
                                          </td>
                                        </motion.tr>
                                      );
                                    })
                                )}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      </div>

                      <div>
                        <motion.div
                          className="relative h-64 w-64 mx-auto"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2,
                            repeat: progressPercent === 100 ? 0 : Infinity,
                            repeatDelay: 0,
                          }}
                        >
                          <svg className="h-full w-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              className={`fill-none stroke-slate-200 dark:stroke-[#000B33]`}
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              className={`fill-none ${
                                progressPercent >= 100
                                  ? "stroke-emerald-500"
                                  : "stroke-[#00E1FF]"
                              } transition-all duration-1000`}
                              strokeWidth="10"
                              strokeLinecap="round"
                              strokeDasharray={`${Math.min(
                                283,
                                Math.max(0, progressPercent * 2.83)
                              )} 283`}
                              transform="rotate(-90 50 50)"
                              style={{
                                filter:
                                  "drop-shadow(0 0 6px rgba(56, 189, 248, 0.5))",
                              }}
                            />
                            <text
                              x="50"
                              y="50"
                              dominantBaseline="middle"
                              textAnchor="middle"
                              className="fill-slate-700 dark:fill-[#BFDFFF] font-bold"
                              fontSize="21"
                            >
                              💧{progressPercent}%
                            </text>
                            <text
                              x="50"
                              y="70"
                              dominantBaseline="middle"
                              textAnchor="middle"
                              className="fill-slate-500 dark:fill-[#BFDFFF] uppercase"
                              fontSize="8"
                            >
                              drunk
                            </text>
                          </svg>

                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden pointer-events-none opacity-30">
                            <motion.div
                              className="absolute bottom-0 w-full h-0 bg-sky-500/20"
                              initial={{ height: "0%" }}
                              animate={{ height: `${progressPercent}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            ></motion.div>
                            {progressPercent < 100 && progressPercent > 0 && (
                              <motion.div
                                className="absolute w-32 h-32 top-0 left-0 bg-[url('/glass.jpg')] bg-cover opacity-20"
                                initial={{ y: "100%" }}
                                animate={{ y: `${100 - progressPercent}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              ></motion.div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="history"
                    className="p-6"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-6">
                      <h3 className="text-lg font-bold mb-4">Weekly Summary</h3>
                      <div className="h-48">
                        {getChartData().length > 0 ? (
                          <div className="h-full w-full">
                            <svg
                              viewBox="0 0 300 200"
                              className="w-full h-full"
                            >
                              <defs>
                                <linearGradient
                                  id="barGradient"
                                  x1="0"
                                  y1="0"
                                  x2="1"
                                  y2="1"
                                >
                                  <stop offset="0%" stopColor="#0ea5e9" />
                                  <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <filter id="glow">
                                  <feGaussianBlur
                                    stdDeviation="2"
                                    result="coloredBlur"
                                  />
                                  <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                  </feMerge>
                                </filter>
                              </defs>
                              {getChartData().map((item, index) => {
                                const max = Math.max(
                                  ...getChartData().map((d) => d.amount)
                                );
                                const height =
                                  max === 0 ? 0 : (item.amount / max) * 160;
                                const barWidth = 20;
                                const spacing = 40;
                                const x = index * spacing + 20;
                                return (
                                  <motion.g
                                    key={index}
                                    initial={{ opacity: 0, y: 200 - height }}
                                    animate={{ opacity: 1, y: 200 - height }}
                                    transition={{
                                      delay: index * 0.1,
                                      duration: 0.5,
                                      type: "spring",
                                      stiffness: 100,
                                    }}
                                  >
                                    <rect
                                      x={x}
                                      y={200 - height}
                                      width={barWidth}
                                      height={height}
                                      fill="url(#barGradient)"
                                      filter="url(#glow)"
                                      rx="4"
                                      className="transition-all duration-300"
                                    />
                                    <text
                                      x={x + barWidth / 2}
                                      y={200 - height - 10}
                                      textAnchor="middle"
                                      fill={
                                        settings.darkMode
                                          ? "#e2e8f0"
                                          : "#1e293b"
                                      }
                                      fontSize="12"
                                    >
                                      {item.amount}ml
                                    </text>
                                    <text
                                      x={x + barWidth / 2}
                                      y={190}
                                      textAnchor="middle"
                                      fill={
                                        settings.darkMode
                                          ? "#94a3b8"
                                          : "#64748b"
                                      }
                                      fontSize="10"
                                    >
                                      {item.date}
                                    </text>
                                  </motion.g>
                                );
                              })}
                            </svg>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
                            No data available
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">All Logs</h3>
                      <div
                        className={`rounded-lg border ${cardBorder} max-h-64 overflow-auto`}
                      >
                        <table className="w-full">
                          <thead
                            className={`sticky top-0 dark:bg-[#023E7D] bg-[#62B1FF] ${cardBorder} border-b`}
                          >
                            <tr>
                              <th className="p-3 text-left font-semibold">
                                Date
                              </th>
                              <th className="p-3 text-left font-semibold">
                                Time
                              </th>
                              <th className="p-3 text-right font-semibold">
                                Amount
                              </th>
                              <th className="p-3 text-right font-semibold">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {logs.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="p-4 text-center text-slate-500 dark:text-slate-400"
                                >
                                  No water logs yet
                                </td>
                              </tr>
                            ) : (
                              [...logs]
                                .sort((a, b) => b.timestamp - a.timestamp)
                                .map((log, index) => {
                                  const date = new Date(log.timestamp);
                                  const isToday =
                                    date.toISOString().split("T")[0] === today;
                                  return (
                                    <motion.tr
                                      key={log.id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className={`hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200 ${
                                        isToday
                                          ? "bg-sky-50 dark:bg-sky-900/20"
                                          : ""
                                      }`}
                                    >
                                      <td className="p-3">
                                        <div className="flex flex-col">
                                          <span className="font-medium">
                                            {date.toLocaleDateString([], {
                                              weekday: "short",
                                            })}
                                          </span>
                                          <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {date.toLocaleDateString()}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="p-3">
                                        {formatDate(log.timestamp)}
                                      </td>
                                      <td className="p-3 text-right">
                                        {log.amount}ml
                                      </td>
                                      <td className="p-3 text-right">
                                        <motion.button
                                          onClick={() => removeLog(log.id)}
                                          className={`p-1 rounded-full ${buttonSecondary} ${buttonSecondaryText} transition-all duration-300`}
                                          whileHover={{
                                            scale: 1.1,
                                            backgroundColor: settings.darkMode
                                              ? "rgba(239, 68, 68, 0.1)"
                                              : "rgba(239, 68, 68, 0.05)",
                                          }}
                                          whileTap={{ scale: 0.9 }}
                                          aria-label="Remove log"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-red-500"
                                          >
                                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                          </svg>
                                        </motion.button>
                                      </td>
                                    </motion.tr>
                                  );
                                })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Water Log Card */}
            <motion.div
              className={`rounded-xl shadow-xl overflow-hidden ${glassMorphism} ${cardBg} border ${cardBorder}`}
              variants={itemVariants}
            >
              <div className={`px-4 py-6 border-b  bg-[#162B75] ${cardBorder}`}>
                <h2 className="text-lg font-bold  dark:text-[#BFDFFF] text-white">
                  Add Water Log
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block mb-2 font-extrabold uppercase dark:text-[#BFDFFF]">
                    ⚡️ Quick Add
                  </label>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() =>
                        setCurrentAmount(Math.max(100, currentAmount - 100))
                      }
                      className={`p-3 rounded-sm ${buttonSecondary} ${buttonSecondaryText} transition-all duration-300 shadow-md`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Decrease amount"
                    >
                      <Minus className="h-3 w-3" />
                    </motion.button>
                    <input
                      type="number"
                      min="100"
                      max="1000"
                      step="100"
                      value={currentAmount === 0 ? "" : currentAmount}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCurrentAmount(val === "" ? 0 : parseInt(val));
                      }}
                      className={`w-full p-2 rounded-sm text-center ${inputBg} dark:text-[#BFDFFF] focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300`}
                    />
                    <motion.button
                      onClick={() =>
                        setCurrentAmount(Math.min(1000, currentAmount + 100))
                      }
                      className={`p-3 rounded-sm ${buttonSecondary} ${buttonSecondaryText} transition-all duration-300 shadow-md`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Increase amount"
                    >
                      <Plus className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  onClick={() => addLog(currentAmount)}
                  className={`w-full px-4 py-2 font-extrabold rounded-sm ${accentColor} text-white dark:text-[#000B33] ${accentHover} ${accentActive} transition-all duration-300 shadow-md flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="h-5 w-5" />
                  Add Log
                </motion.button>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#162B75]">
                  <h3 className="mb-2 font-extrabold uppercase dark:text-[#BFDFFF]">
                    Quick Add
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[250, 500, 1000].map((amount) => (
                      <motion.button
                        key={amount}
                        onClick={() => addLog(amount)}
                        className={`p-2 rounded-sm ${accentColor} dark:text-[#000B33] text-white text-sm ${accentHover} ${accentActive} transition-all duration-300 shadow-md`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {amount}ml
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              className={`md:col-span-3 rounded-xl shadow-xl overflow-hidden ${glassMorphism} ${cardBg} border ${cardBorder}`}
              variants={itemVariants}
            >
              <div className={`p-4 border-b ${cardBorder} bg-[#162B75]`}>
                <h2 className="text-lg font-bold dark:text-[#BFDFFF] text-white">
                  Your Stats
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    className={`rounded-sm dark:text-[#BFDFFF] p-4 ${secondaryColor} transition-all duration-300 shadow-inner`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <p className="opacity-70 uppercase">💧Total Water</p>
                    <p className="text-2xl font-extrabold">
                      {waterStats.totalEver}ml
                    </p>
                    <p className="text-[14px] opacity-70 mt-1">
                      Drunk in total
                    </p>
                  </motion.div>
                  <motion.div
                    className={`rounded-sm dark:text-[#BFDFFF] p-4 ${secondaryColor} transition-all duration-300 shadow-inner`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <p className="opacity-70 uppercase">🗓️ Daily Average</p>
                    <p className="text-2xl font-extrabold">
                      {waterStats.averagePerDay}ml
                    </p>
                    <p className="text-[14px] opacity-70 mt-1">
                      Across{" "}
                      {logs.length > 0
                        ? Math.max(
                            1,
                            Array.from(
                              new Set(
                                logs.map((log) => {
                                  const date = new Date(log.timestamp)
                                    .toISOString()
                                    .split("T")[0];
                                  return date;
                                })
                              )
                            ).length
                          )
                        : 0}{" "}
                      days
                    </p>
                  </motion.div>
                  <motion.div
                    className={`rounded-sm dark:text-[#BFDFFF] p-4 ${secondaryColor} transition-all duration-300 shadow-inner`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <p className="opacity-70 uppercase">🏆 Longest Streak</p>
                    <p className="text-2xl font-bold">
                      {waterStats.longestStreak} days
                    </p>
                    <p className="text-[14px] opacity-70 mt-1">
                      Consistent hydration
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
