import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Bar,
  ComposedChart,
  Area,
  TooltipProps,
} from "recharts";
import {
  Sun,
  Moon,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Leaf,
  Recycle,
  Car,
  Waves,
  X,
  Activity,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const mockEnvironmentalData = {
  temperature: [
    { month: "Jan", avg: 5.5, min: 1.2, max: 9.8 },
    { month: "Feb", avg: 6.3, min: 2.5, max: 10.1 },
    { month: "Mar", avg: 8.7, min: 4.8, max: 12.6 },
    { month: "Apr", avg: 11.2, min: 7.3, max: 15.1 },
    { month: "May", avg: 14.5, min: 10.2, max: 18.8 },
    { month: "Jun", avg: 17.8, min: 13.5, max: 22.1 },
    { month: "Jul", avg: 20.3, min: 15.7, max: 24.9 },
    { month: "Aug", avg: 19.7, min: 14.9, max: 24.5 },
    { month: "Sep", avg: 16.2, min: 11.8, max: 20.6 },
    { month: "Oct", avg: 12.5, min: 8.7, max: 16.3 },
    { month: "Nov", avg: 8.3, min: 4.5, max: 12.1 },
    { month: "Dec", avg: 6.1, min: 2.1, max: 10.1 },
  ],
  humidity: [
    { month: "Jan", avg: 88, min: 82, max: 94 },
    { month: "Feb", avg: 85, min: 78, max: 92 },
    { month: "Mar", avg: 82, min: 75, max: 89 },
    { month: "Apr", avg: 78, min: 71, max: 85 },
    { month: "May", avg: 75, min: 68, max: 82 },
    { month: "Jun", avg: 72, min: 65, max: 79 },
    { month: "Jul", avg: 70, min: 62, max: 78 },
    { month: "Aug", avg: 72, min: 65, max: 79 },
    { month: "Sep", avg: 78, min: 71, max: 85 },
    { month: "Oct", avg: 82, min: 76, max: 88 },
    { month: "Nov", avg: 85, min: 79, max: 91 },
    { month: "Dec", avg: 87, min: 81, max: 93 },
  ],
  precipitation: [
    { month: "Jan", amount: 122, days: 18 },
    { month: "Feb", amount: 95, days: 15 },
    { month: "Mar", amount: 87, days: 14 },
    { month: "Apr", amount: 65, days: 12 },
    { month: "May", amount: 58, days: 10 },
    { month: "Jun", amount: 45, days: 8 },
    { month: "Jul", amount: 32, days: 6 },
    { month: "Aug", amount: 38, days: 7 },
    { month: "Sep", amount: 67, days: 11 },
    { month: "Oct", amount: 98, days: 14 },
    { month: "Nov", amount: 115, days: 16 },
    { month: "Dec", amount: 130, days: 19 },
  ],
  windSpeed: [
    { month: "Jan", avg: 12.5, max: 18.2 },
    { month: "Feb", avg: 12.8, max: 19.5 },
    { month: "Mar", avg: 13.2, max: 20.1 },
    { month: "Apr", avg: 12.3, max: 18.7 },
    { month: "May", avg: 11.8, max: 17.5 },
    { month: "Jun", avg: 11.5, max: 16.8 },
    { month: "Jul", avg: 11.2, max: 16.2 },
    { month: "Aug", avg: 11.0, max: 15.9 },
    { month: "Sep", avg: 11.3, max: 16.5 },
    { month: "Oct", avg: 11.8, max: 17.2 },
    { month: "Nov", avg: 12.1, max: 17.8 },
    { month: "Dec", avg: 12.4, max: 18.0 },
  ],
  co2Levels: [
    { year: 2010, level: 388 },
    { year: 2012, level: 394 },
    { year: 2014, level: 399 },
    { year: 2016, level: 405 },
    { year: 2018, level: 411 },
    { year: 2020, level: 417 },
    { year: 2022, level: 424 },
    { year: 2024, level: 430 },
  ],
  energySources: [
    { name: "Renewable", value: 28 },
    { name: "Fossil Fuels", value: 62 },
    { name: "Nuclear", value: 10 },
  ],
  wasteManagement: [
    { name: "Recycled", value: 35 },
    { name: "Composted", value: 15 },
    { name: "Landfill", value: 45 },
    { name: "Incinerated", value: 5 },
  ],
  transportation: [
    { name: "Electric Vehicles", value: 12 },
    { name: "Public Transit", value: 23 },
    { name: "Cycling", value: 8 },
    { name: "Walking", value: 15 },
    { name: "Gasoline Vehicles", value: 42 },
  ],
  waterQuality: [
    { month: "Jan", ph: 7.2, turbidity: 1.5, oxygen: 8.5 },
    { month: "Feb", ph: 7.3, turbidity: 1.4, oxygen: 8.7 },
    { month: "Mar", ph: 7.1, turbidity: 1.6, oxygen: 8.3 },
    { month: "Apr", ph: 7.2, turbidity: 1.5, oxygen: 8.4 },
    { month: "May", ph: 7.4, turbidity: 1.3, oxygen: 8.8 },
    { month: "Jun", ph: 7.3, turbidity: 1.4, oxygen: 8.6 },
    { month: "Jul", ph: 7.5, turbidity: 1.2, oxygen: 8.9 },
    { month: "Aug", ph: 7.4, turbidity: 1.3, oxygen: 8.7 },
    { month: "Sep", ph: 7.2, turbidity: 1.5, oxygen: 8.4 },
    { month: "Oct", ph: 7.1, turbidity: 1.6, oxygen: 8.2 },
    { month: "Nov", ph: 7.2, turbidity: 1.5, oxygen: 8.3 },
    { month: "Dec", ph: 7.3, turbidity: 1.4, oxygen: 8.5 },
  ],
};

const customColors = {
  primary: {
    light: "#4C1D95", // Deeper purple for better contrast
    dark: "#9B87F5", // Brighter purple for dark mode
  },
  secondary: {
    light: "#2563EB",
    dark: "#60A5FA",
  },
  accent: {
    light: "#059669",
    dark: "#34D399",
  },
  background: {
    light: "#F8FAFC", // Slightly darker light background
    dark: "#111827", // Lighter dark background
  },
  card: {
    light: "#FFFFFF", // White cards in light mode
    dark: "#1F2937", // Slightly lighter cards in dark mode
  },
  text: {
    light: "#1E293B", // Darker text in light mode
    dark: "#F9FAFB", // Brighter text in dark mode
  },
  chart: {
    temp: "#8951FF",
    humidity: "#00C2FF",
    precipitation: "#00D583",
    wind: "#CB3CFF",
    co2: "#0E43FB",
  },
  status: {
    good: "#10B981",
    warning: "#F59E0B",
    bad: "#EF4444",
  },
  gradient: {
    temp: ["#8951FF", "#8951FF"],
    humidity: ["#00C2FF", "#00C2FF"],
    precipitation: ["#00D583", "#00D583"],
    wind: ["#CB3CFF", "#CB3CFF"],
    co2: ["#0E43FB", "#0E43FB"],
  },
};

const chartConfig = {
  temp: {
    label: "Temperature",
    color: customColors.chart.temp,
    gradient: customColors.gradient.temp,
  },
  humidity: {
    label: "Humidity",
    color: customColors.chart.humidity,
    gradient: customColors.gradient.humidity,
  },
  precipitation: {
    label: "Precipitation",
    color: customColors.chart.precipitation,
    gradient: customColors.gradient.precipitation,
  },
  wind: {
    label: "Wind Speed",
    color: customColors.chart.wind,
    gradient: customColors.gradient.wind,
  },
  co2: {
    label: "CO2 Levels",
    color: customColors.chart.co2,
    gradient: customColors.gradient.co2,
  },
};

interface ExtraProps {
  darkMode?: boolean;
}

export default function EnvironmentalDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const CARD_STYLES = `rounded-xl p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl border ${
    darkMode
      ? "text-[#FFFFFF] border-[#7E89AC] bg-[#0B1739]"
      : "text-[#081028] border-[#BDE7EF] bg-white"
  }`;

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setDarkMode(match.matches);

    update();
    match.addEventListener("change", update);

    return () => match.removeEventListener("change", update);
  }, []);

  const fetchEnvironmentalData = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if data is already available (for real API calls, remove this check)
      if (mockEnvironmentalData.temperature.length > 0) {
        return;
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  useEffect(() => {
    fetchEnvironmentalData();

    // Check for system dark mode preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleCardHover = (cardId: string) => {
    if (window.innerWidth > 768) {
      setActiveCard(cardId);
    }
  };

  const handleCardLeave = () => setActiveCard(null);

  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
  };

  const getCardBorderColor = (cardId: string) => {
    if (darkMode) return "border-gray-600";

    switch (cardId) {
      case "temperature":
        return "border-red-200";
      case "humidity":
        return "border-teal-200";
      case "precipitation":
        return "border-blue-200";
      default:
        return "border-gray-200";
    }
  };

  const getChartGradient = (id: keyof typeof chartConfig) => {
    const gradientId = `${id}Gradient`;
    const gradient = chartConfig[id].gradient;

    return (
      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={gradient[0]} stopOpacity={0.4} />
        <stop offset="95%" stopColor={gradient[1]} stopOpacity={0} />
      </linearGradient>
    );
  };

  const renderWelcomeModal = () => (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#F9FDFE] dark:bg-[#081028] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="relative p-6">
              <button
                onClick={handleWelcomeDismiss}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <Leaf size={48} className="text-[#5AC2D7]" />
                <h2 className="text-2xl font-bold mb-2">Welcome to EcoTrack</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Your personal environmental monitoring dashboard
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Track Real-Time Data</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Monitor temperature, humidity, air quality, and more
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <Shield size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Stay Informed</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Get insights and alerts about environmental changes
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <Activity size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Make a Difference</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Contribute to sustainability efforts
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWelcomeDismiss}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderTemperatureCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES}  ${
        activeCard === "temperature" ? "ring-2 ring-[#8951FF]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("temperature")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Thermometer
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Temperature</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Monthly Averages
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">
          {mockEnvironmentalData.temperature[0].avg}°C
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockEnvironmentalData.temperature}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              {getChartGradient("temp")}
              <linearGradient
                id="colorTemp"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientTransform="rotate(90)"
              >
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <YAxis
              unit="°C"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <Tooltip
              formatter={(value) => [`${value}°C`, "Temperature"]}
              contentStyle={{
                backgroundColor: darkMode ? "#081028" : "#F9FDFE",
                borderColor: darkMode ? "#081028" : "#F9FDFE",
                color: darkMode ? "#F9FAFB" : "#1F2937",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="avg"
              fillOpacity={1}
              fill="url(#tempGradient)"
              stroke={customColors.chart.temp}
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderHumidityCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES}  ${
        activeCard === "humidity" ? "ring-2 ring-[#00C2FF]" : ""
      } transition-all duration-300 border ${getCardBorderColor("humidity")}`}
      onMouseEnter={() => handleCardHover("humidity")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Droplets
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Humidity</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Monthly Averages
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">
          {mockEnvironmentalData.humidity[0].avg}%
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockEnvironmentalData.humidity}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              {getChartGradient("humidity")}
              <linearGradient
                id="colorHumidity"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientTransform="rotate(90)"
              >
                <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <YAxis
              unit="%"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Humidity"]}
              contentStyle={{
                backgroundColor: darkMode ? "#081028" : "#F9FDFE",
                borderColor: darkMode ? "#081028" : "#F9FDFE",
                color: darkMode ? "#F9FAFB" : "#1F2937",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="avg"
              fillOpacity={1}
              fill="url(#humidityGradient)"
              stroke={customColors.chart.humidity}
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderPrecipitationCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES} ${
        activeCard === "precipitation" ? "ring-2 ring-[#00D583]" : ""
      } transition-all duration-300 border ${getCardBorderColor(
        "precipitation"
      )}`}
      onMouseEnter={() => handleCardHover("precipitation")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <CloudRain
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Precipitation</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Monthly Totals
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">
          {mockEnvironmentalData.precipitation[0].amount} mm
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockEnvironmentalData.precipitation}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              {getChartGradient("precipitation")}
              <linearGradient
                id="colorPrecipitation"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientTransform="rotate(90)"
              >
                <stop offset="5%" stopColor="#45B7D1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#45B7D1" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <YAxis
              unit="mm"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <Tooltip
              formatter={(value) => [`${value}mm`, "Precipitation"]}
              contentStyle={{
                backgroundColor: darkMode ? "#081028" : "#F9FDFE",
                borderColor: darkMode ? "#081028" : "#F9FDFE",
                color: darkMode ? "#F9FAFB" : "#1F2937",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              fillOpacity={1}
              fill="url(#precipitationGradient)"
              stroke={customColors.chart.precipitation}
              strokeWidth={3}
            />
            <Bar
              dataKey="amount"
              fill={customColors.chart.precipitation}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderWindSpeedCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES} ${
        activeCard === "wind" ? "ring-2 ring-[#CB3CFF]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("wind")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Wind
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Wind Speed</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Monthly Averages
            </p>
          </div>
        </div>
        <div className={`text-2xl font-bold`}>
          {mockEnvironmentalData.windSpeed[0].avg} km/h
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockEnvironmentalData.windSpeed}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              {getChartGradient("wind")}
              <linearGradient
                id="colorTemp"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientTransform="rotate(90)"
              >
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
              fontSize={12}
            />
            <YAxis
              unit=" km/h"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
              fontSize={12}
            />
            <Tooltip
              formatter={(value) => [`${value} km/h`, "Wind Speed"]}
              contentStyle={{
                backgroundColor: darkMode ? "#081028" : "#F9FDFE",
                borderColor: darkMode ? "#081028" : "#F9FDFE",
                color: darkMode ? "#F9FAFB" : "#1F2937",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="avg"
              fillOpacity={1}
              fill="url(#windGradient)"
              stroke={customColors.chart.wind}
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderCo2LevelsCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES} ${
        activeCard === "co2" ? "ring-2 ring-[#0E43FB]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("co2")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Activity
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">CO2 Levels</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Annual Trends
            </p>
          </div>
        </div>
        <div className={`text-2xl font-bold`}>
          {mockEnvironmentalData.co2Levels.slice(-1)[0].level} ppm
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockEnvironmentalData.co2Levels}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              {getChartGradient("co2")}
              <linearGradient
                id="colorTemp"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientTransform="rotate(90)"
              >
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280" }}
              axisLine={{ stroke: darkMode ? "#4B5563" : "#D1D5DB" }}
              fontSize={12}
            />
            <YAxis
              unit=" ppm"
              tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280" }}
              axisLine={{ stroke: darkMode ? "#4B5563" : "#D1D5DB" }}
              fontSize={12}
            />
            <Tooltip
              formatter={(value) => [`${value} ppm`, "CO2 Level"]}
              contentStyle={{
                backgroundColor: darkMode ? "#081028" : "#F9FDFE",
                borderColor: darkMode ? "#081028" : "#F9FDFE",
                color: darkMode ? "#F9FAFB" : "#1F2937",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke={customColors.chart.co2}
              strokeWidth={3}
              fill="url(#co2Gradient)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
    darkMode = false,
  }: TooltipProps<ValueType, NameType> & ExtraProps) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        className={`rounded-lg px-4 py-2 shadow-md border text-sm ${
          darkMode
            ? "bg-[#081028] text-gray-100 border-gray-600"
            : "bg-[#F9FDFE] text-gray-800 border-gray-200"
        }`}
      >
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index}>
            <span className="font-medium">{entry.name}</span>:{" "}
            <span>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  };

  const renderEnergySourcesCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES}${
        activeCard === "energy" ? "ring-2 ring-[#F1076C]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("energy")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Zap
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Energy Sources</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Distribution by Type
            </p>
          </div>
        </div>
        <div className={`text-2xl font-bold `}>
          {mockEnvironmentalData.energySources[0].value}%
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Pie
              data={mockEnvironmentalData.energySources}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              fontSize={12}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, name, percent }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 20;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    fill={darkMode ? "#9CA3AF" : "#6B7280"}
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}
                  >{`${name}: ${(percent * 100).toFixed(0)}%`}</text>
                );
              }}
            >
              {mockEnvironmentalData.energySources.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={"#F1076C"}
                  stroke="none"
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} darkMode={darkMode} />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderWasteManagementCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES} ${
        activeCard === "waste" ? "ring-2 ring-[#8951FF]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("waste")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Recycle
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Waste Management</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Distribution by Method
            </p>
          </div>
        </div>
        <div className={`text-2xl font-bold`}>
          {mockEnvironmentalData.wasteManagement[0].value}%
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockEnvironmentalData.wasteManagement}
              cx="50%"
              cy="50%"
              fontSize={12}
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, name, percent }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 20; // mueve el label fuera del cell
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    fill={darkMode ? "#9CA3AF" : "#6B7280"}
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}
                  >{`${name}: ${(percent * 100).toFixed(0)}%`}</text>
                );
              }}
            >
              {mockEnvironmentalData.wasteManagement.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={"#8951FF"}
                  stroke="none"
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} darkMode={darkMode} />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderTransportationCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES}  ${
        activeCard === "transport" ? "ring-2 ring-[#00C2FF]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("transport")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Car
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Transportation</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Distribution by Mode
            </p>
          </div>
        </div>
        <div className={`text-2xl font-bold`}>
          {mockEnvironmentalData.transportation[1].value}%
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockEnvironmentalData.transportation}
              cx="50%"
              cy="50%"
              innerRadius={40}
              fontSize={12}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, name, percent }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 20; // mueve el label fuera del cell
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    fill={darkMode ? "#9CA3AF" : "#6B7280"}
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={10}
                  >{`${name}: ${(percent * 100).toFixed(0)}%`}</text>
                );
              }}
            >
              {mockEnvironmentalData.transportation.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={"#00C2FF"}
                  stroke="none"
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} darkMode={darkMode} />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const renderWaterQualityCard = () => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`${CARD_STYLES} ${
        activeCard === "water" ? "ring-2 ring-[#00D583]" : ""
      } transition-all duration-300`}
      onMouseEnter={() => handleCardHover("water")}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-[#2B5970]" : "bg-[#EFF9FB]"
            } mr-3`}
          >
            <Waves
              size={20}
              className={`${darkMode ? "text-[#5AC2D7]" : "text-[#3A7C92]"}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Water Quality</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-[#AEB9E1]" : "text-[#617389]"
              }`}
            >
              Monthly Averages
            </p>
          </div>
        </div>
        <div className={`text-2xl font-bold`}>
          pH {mockEnvironmentalData.waterQuality[0].ph}
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockEnvironmentalData.waterQuality}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <YAxis
              tick={{ fill: darkMode ? "#AEB9E1" : "#617389" }}
              axisLine={{ stroke: darkMode ? "#AEB9E1" : "#617389" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#081028" : "#F9FDFE",
                borderColor: darkMode ? "#081028" : "#F9FDFE",
                color: darkMode ? "#F9FAFB" : "#1F2937",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="ph"
              stroke="#CB3CFF"
              strokeWidth={3}
              dot={false}
              name="pH"
            />
            <Line
              type="monotone"
              dataKey="turbidity"
              stroke="#0E43FB"
              strokeWidth={3}
              dot={false}
              name="Turbidity"
            />
            <Line
              type="monotone"
              dataKey="oxygen"
              stroke="#8951FF"
              strokeWidth={3}
              dot={false}
              name="Oxygen"
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#081028]" : "bg-[#F9FDFE]"
      } transition-colors duration-300`}
    >
      {renderWelcomeModal()}

      <header className="backdrop-blur-md sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-10 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Leaf size={48} className="text-[#5AC2D7]" />
            <div className=" text-[#081028] dark:text-[#FFFFFF] ml-5">
              <p className="text-3xl font-bold">EcoTrack</p>
              <p>
                Environmental monitoring and insights for a sustainable future
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-full border ${
                darkMode
                  ? "bg-[#112239] text-[#EFCC43] hover:bg-gray-700 border-[#2B5970]"
                  : "bg-[#EFF9FB] text-[#CB3CFF] hover:bg-gray-200 border-[#BDE7EF]"
              } transition-colors`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:pt-4 md:pb-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {renderTemperatureCard()}
          {renderHumidityCard()}
          {renderPrecipitationCard()}
          {renderWindSpeedCard()}
          {renderCo2LevelsCard()}
          {renderEnergySourcesCard()}
          {renderWasteManagementCard()}
          {renderTransportationCard()}
          {renderWaterQualityCard()}
        </motion.div>
      </main>

      <footer
        className={`${
          darkMode ? "bg-[#081028]" : "bg-[#F9FDFE]"
        } backdrop-blur-md py-8 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className={`text-center text-sm ${
                darkMode ? "text-[#FFFFFF]" : "text-[#081028]"
              }`}
            >
              © {new Date().getFullYear()} EcoTrack. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className={`text-sm ${
                  darkMode ? "text-[#FFFFFF]" : "text-[#081028]"
                } transition-colors`}
              >
                About
              </a>
              <a
                href="#"
                className={`text-sm ${
                  darkMode ? "text-[#FFFFFF]" : "text-[#081028]"
                } transition-colors`}
              >
                Contact
              </a>
              <a
                href="#"
                className={`text-sm ${
                  darkMode ? "text-[#FFFFFF]" : "text-[#081028]"
                } transition-colors`}
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
