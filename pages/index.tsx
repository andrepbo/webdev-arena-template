import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Thermometer,
  Droplet,
  Wind,
  Sun,
  Moon,
  Power,
  Sparkles,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Device = {
  id: number;
  name: string;
  status: "Active" | "Idle";
  icon: JSX.Element;
};

const SmartHomeDashboard = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [deviceUsage, setDeviceUsage] = useState(
    [...Array(15)].map((_, i) => ({
      name: `${i}h`,
      usage: Math.floor(Math.random() * 100),
    }))
  );
  const [powerData] = useState(
    [...Array(7)].map((_, i) => ({
      name: `Day ${i + 1}`,
      usage: Math.floor(Math.random() * 5 + 1),
    }))
  );
  const [thermostatTemp, setThermostatTemp] = useState(22);
  const [roomMetrics, setRoomMetrics] = useState({
    temperature: 22,
    humidity: 45,
    airQuality: "Good",
    brightness: 75,
  });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: "Smart TV", status: "Active", icon: <Sparkles size={16} /> },
    { id: 2, name: "Sound System", status: "Active", icon: <Zap size={16} /> },
    { id: 3, name: "Smart Lamp", status: "Active", icon: <Power size={16} /> },
    { id: 4, name: "Air Purifier", status: "Idle", icon: <Wind size={16} /> },
    { id: 5, name: "Game Console", status: "Active", icon: <Zap size={16} /> },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
    setIsLoaded(true);
    setIsHydrated(true);
    setCurrentTime(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const interval = setInterval(() => {
      setDeviceUsage((prev) => [
        ...prev.slice(1),
        {
          name: `${new Date().getHours()}h`,
          usage: Math.floor(Math.random() * 100),
        },
      ]);

      if (Math.random() > 0.5) {
        setRoomMetrics((prev) => ({
          temperature: +(
            prev.temperature +
            (Math.random() * 0.3 - 0.1)
          ).toFixed(1),
          humidity: Math.min(
            80,
            Math.max(30, prev.humidity + Math.floor(Math.random() * 3 - 1))
          ),
          airQuality: Math.random() > 0.7 ? "Excellent" : "Good",
          brightness: Math.min(
            100,
            Math.max(0, prev.brightness + Math.floor(Math.random() * 5 - 2))
          ),
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(
      selectedDevice && selectedDevice.id === device.id ? null : device
    );
  };

  const toggleDeviceStatus = () => {
    if (!selectedDevice) return;

    const status = selectedDevice.status === "Active" ? "Idle" : "Active";
    setDevices(
      devices.map((device) =>
        device.id === selectedDevice.id ? { ...device, status } : device
      )
    );
    setSelectedDevice({ ...selectedDevice, status });
  };

  const adjustThermostat = (increment: number) => {
    const newTemp = thermostatTemp + increment;
    if (newTemp >= 18 && newTemp <= 28) {
      setThermostatTemp(newTemp);
    }
  };

  const getAirQualityColor = (quality: string) => {
    return quality === "Excellent"
      ? "from-emerald-400 to-teal-500"
      : "from-blue-400 to-cyan-500";
  };

  const cardStyle = `
    rounded-xl backdrop-blur-md transition-all duration-500
    ${
      darkMode
        ? "bg-gray-800/30 border-gray-700/50"
        : "bg-white/60 border-gray-200/50"
    }
    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
  `;

  if (!hasMounted) return null;

  return (
    <div
      className={`
      min-h-screen w-full p-4 sm:p-6 lg:p-8
      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}
      transition-colors duration-300 font-sans
    `}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
        html,
        body {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative">
        <div
          className={`absolute inset-0 -z-10 opacity-50 ${
            darkMode
              ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
              : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-white"
          }`}
        ></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold ${
                darkMode ? "text-blue-300" : "text-blue-600"
              } mb-1`}
            >
              Living Room Dashboard
            </h1>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Welcome back, John
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div
              className={`
              relative px-4 py-2 rounded-lg text-sm flex items-center gap-2
              ${
                darkMode
                  ? "bg-gray-800/50 text-amber-300 border border-gray-700/50"
                  : "bg-white/80 text-blue-600 border border-gray-200/50"
              }
              shadow-sm backdrop-blur-sm
            `}
            >
              <Sun
                size={16}
                className={darkMode ? "opacity-100" : "opacity-50"}
              />
              <span className="font-medium">{currentTime}</span>
              <Moon
                size={16}
                className={!darkMode ? "opacity-100" : "opacity-50"}
              />
            </div>

            <button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-lg transition-all duration-300 cursor-pointer
                ${
                  darkMode
                    ? "bg-gray-800/50 text-amber-300 border border-gray-700/50 hover:bg-gray-700/50"
                    : "bg-white/80 text-blue-600 border border-gray-200/50 hover:bg-gray-50/80"
                }
                shadow-sm backdrop-blur-sm
              `}
              aria-label={
                darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`${cardStyle} p-5 border border-gray-200/50`}>
            <div className="flex justify-between items-center mb-2">
              <h2
                className={`text-base font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Room Temperature
              </h2>
              <Thermometer
                size={20}
                className={darkMode ? "text-blue-400" : "text-blue-500"}
              />
            </div>
            <p
              className={`text-3xl font-bold ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              {isHydrated ? `${roomMetrics.temperature}°C` : "--"}
            </p>
            <div
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span className="flex items-center gap-1">
                {roomMetrics.temperature > 24 ? (
                  <ArrowUpRight size={14} className="text-red-500" />
                ) : (
                  <ArrowDownRight size={14} className="text-blue-500" />
                )}
                {isHydrated
                  ? `${Math.abs(roomMetrics.temperature - 22).toFixed(
                      1
                    )}°C from set point`
                  : "--"}
              </span>
            </div>
          </div>

          <div className={`${cardStyle} p-5 border border-gray-200/50`}>
            <div className="flex justify-between items-center mb-2">
              <h2
                className={`text-base font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Humidity
              </h2>
              <Droplet
                size={20}
                className={darkMode ? "text-cyan-400" : "text-cyan-500"}
              />
            </div>
            <p
              className={`text-3xl font-bold ${
                darkMode ? "text-cyan-300" : "text-cyan-600"
              }`}
            >
              {isHydrated ? `${roomMetrics.humidity}%` : "--"}
            </p>
            <div
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span className="flex items-center gap-1">
                {roomMetrics.humidity > 50 ? (
                  <ArrowUpRight size={14} className="text-red-500" />
                ) : (
                  <ArrowDownRight size={14} className="text-blue-500" />
                )}
                Comfortable level
              </span>
            </div>
          </div>

          <div className={`${cardStyle} p-5 border border-gray-200/50`}>
            <div className="flex justify-between items-center mb-2">
              <h2
                className={`text-base font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Air Quality
              </h2>
              <Wind
                size={20}
                className={darkMode ? "text-emerald-400" : "text-emerald-500"}
              />
            </div>
            <p
              className={`text-3xl font-bold bg-gradient-to-r ${getAirQualityColor(
                roomMetrics.airQuality
              )} text-transparent bg-clip-text`}
            >
              {isHydrated ? roomMetrics.airQuality : "--"}
            </p>
            <div
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>PM2.5: 8 µg/m³</span>
            </div>
          </div>

          <div className={`${cardStyle} p-5 border border-gray-200/50`}>
            <div className="flex justify-between items-center mb-2">
              <h2
                className={`text-base font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Brightness
              </h2>
              <Sparkles
                size={20}
                className={darkMode ? "text-amber-400" : "text-amber-500"}
              />
            </div>
            <p
              className={`text-3xl font-bold ${
                darkMode ? "text-amber-300" : "text-amber-600"
              }`}
            >
              {isHydrated ? `${roomMetrics.brightness}%` : "--"}
            </p>
            <div
              className={`w-full h-2 rounded-full mt-2 ${
                darkMode ? "bg-gray-700/50" : "bg-gray-200/80"
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  darkMode
                    ? "bg-gradient-to-r from-amber-400 to-amber-500"
                    : "bg-gradient-to-r from-amber-500 to-amber-400"
                }`}
                style={{
                  width: isHydrated ? `${roomMetrics.brightness}%` : "0%",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className={`${cardStyle} p-5 lg:col-span-2 border ${
              darkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Device Usage
              </h2>
              <div
                className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  darkMode
                    ? "bg-blue-900/30 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                }
              `}
              >
                Last 24 hours
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={deviceUsage}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={darkMode ? "#60a5fa" : "#3b82f6"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={darkMode ? "#60a5fa" : "#3b82f6"}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#d1d5db" : "#374151",
                    }}
                  />
                  <YAxis
                    stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#d1d5db" : "#374151",
                    }}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      backdropFilter: "blur(4px)",
                      backgroundColor: darkMode
                        ? "rgba(31, 41, 55, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                      color: darkMode ? "#f3f4f6" : "#374151",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke={darkMode ? "#60a5fa" : "#3b82f6"}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsage)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3
                className={`text-sm font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Connected Devices
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {devices.map((device, index) => (
                  <div
                    key={device.id}
                    onClick={() => handleDeviceClick(device)}
                    className={`
                      relative p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105
                      ${
                        selectedDevice && selectedDevice.id === device.id
                          ? darkMode
                            ? "bg-blue-900/30 border border-blue-700/50"
                            : "bg-blue-100 border border-blue-200/50"
                          : darkMode
                          ? "bg-gray-800/30 border border-gray-700/30"
                          : "bg-white/80 border border-gray-200/50"
                      }
                      ${isLoaded && index < 3 ? "delay-75" : ""}
                      ${isLoaded && index >= 3 ? "delay-150" : ""}
                      ${
                        isLoaded
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`
                        p-1 rounded-full
                        ${
                          device.status === "Active"
                            ? darkMode
                              ? "bg-blue-900/50 text-blue-300"
                              : "bg-blue-100 text-blue-600"
                            : darkMode
                            ? "bg-gray-700/50 text-gray-400"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                      >
                        {device.icon}
                      </div>
                      <span
                        className={`text-xs ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } truncate`}
                      >
                        {device.name}
                      </span>
                    </div>
                    <div
                      className={`
                      absolute top-2 right-2 w-2 h-2 rounded-full
                      ${
                        device.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }
                    `}
                    ></div>
                  </div>
                ))}
              </div>

              {selectedDevice && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    darkMode
                      ? "bg-gray-800/50 border border-gray-700/50"
                      : "bg-white/80 border border-gray-200/50"
                  } backdrop-blur-sm transition-all duration-300 animate-fadeIn`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                        p-1 rounded-full
                        ${
                          selectedDevice.status === "Active"
                            ? darkMode
                              ? "bg-blue-900/50 text-blue-300"
                              : "bg-blue-100 text-blue-600"
                            : darkMode
                            ? "bg-gray-700/50 text-gray-400"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                      >
                        {selectedDevice.icon}
                      </span>
                      <span
                        className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {selectedDevice.name}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`
                        px-2 py-1 rounded-full text-xs
                        ${
                          selectedDevice.status === "Active"
                            ? darkMode
                              ? "bg-green-900/30 text-green-300"
                              : "bg-green-100 text-green-700"
                            : darkMode
                            ? "bg-gray-700/50 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                      >
                        {selectedDevice.status}
                      </span>
                      <button
                        onClick={toggleDeviceStatus}
                        className={`
                          px-2 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer
                          ${
                            darkMode
                              ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }
                        `}
                      >
                        {selectedDevice.status === "Active"
                          ? "Turn Off"
                          : "Turn On"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${cardStyle} p-5 border ${
              darkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Thermostat Control
              </h2>
              <div
                className={`
                p-1.5 rounded-full
                ${
                  darkMode
                    ? "bg-gray-800/50 text-blue-400"
                    : "bg-blue-50 text-blue-500"
                }
              `}
              >
                <Thermometer size={18} />
              </div>
            </div>

            <div className="flex flex-col items-center py-6">
              <div
                className={`
                w-24 h-24 rounded-full flex items-center justify-center mb-6
                ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-900/50 to-blue-800/50 text-blue-200 border border-blue-800/30"
                    : "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 border border-blue-200/50"
                }
                backdrop-blur-sm relative
              `}
              >
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs opacity-70">
                  °C
                </div>
                <div className="text-4xl font-medium">{thermostatTemp}</div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => adjustThermostat(-1)}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors
                    ${
                      darkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700/50"
                        : "bg-white/80 hover:bg-gray-50/80 text-gray-700 border border-gray-200/50"
                    }
                    shadow-sm backdrop-blur-sm
                  `}
                  aria-label="Decrease temperature"
                >
                  <ChevronDown size={20} />
                </button>

                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Set Temperature
                </span>

                <button
                  onClick={() => adjustThermostat(1)}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors
                    ${
                      darkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700/50"
                        : "bg-white/80 hover:bg-gray-50/80 text-gray-700 border border-gray-200/50"
                    }
                    shadow-sm backdrop-blur-sm
                  `}
                  aria-label="Increase temperature"
                >
                  <ChevronUp size={20} />
                </button>
              </div>

              <div className="w-full">
                <div className="flex justify-between mb-1 text-xs">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-500"}
                  >
                    18°C
                  </span>
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-500"}
                  >
                    28°C
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-200/80"
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      darkMode
                        ? "bg-gradient-to-r from-blue-500 to-blue-400"
                        : "bg-gradient-to-r from-blue-600 to-blue-500"
                    }`}
                    style={{ width: `${(thermostatTemp - 18) * 10}%` }}
                  ></div>
                </div>
              </div>

              <div
                className={`mt-6 w-full text-center text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } flex items-center justify-center gap-1`}
              >
                <Power size={12} />
                <span>
                  System Status:{" "}
                  <span className="font-medium text-green-500">Active</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div
            className={`${cardStyle} p-5 border ${
              darkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Weekly Energy Usage
              </h2>
              <div
                className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  darkMode
                    ? "bg-blue-900/30 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                }
              `}
              >
                kWh/day
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={powerData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#d1d5db" : "#374151",
                    }}
                  />
                  <YAxis
                    stroke={darkMode ? "#9ca3af" : "#6b7280"}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#d1d5db" : "#374151",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      backdropFilter: "blur(4px)",
                      backgroundColor: darkMode
                        ? "rgba(31, 41, 55, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                      color: darkMode ? "#f3f4f6" : "#374151",
                    }}
                  />
                  <Bar
                    dataKey="usage"
                    animationDuration={1500}
                    radius={[4, 4, 0, 0]}
                  >
                    {powerData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={darkMode ? "#60a5fa" : "#3b82f6"}
                        opacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    darkMode ? "bg-blue-500" : "bg-blue-600"
                  }`}
                ></div>
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Total Usage
                </span>
              </div>
              <span
                className={`font-medium ${
                  darkMode ? "text-blue-300" : "text-blue-600"
                }`}
              >
                {powerData
                  .reduce((sum, item) => sum + item.usage, 0)
                  .toFixed(1)}{" "}
                kWh
              </span>
            </div>
          </div>

          <div
            className={`${cardStyle} p-5 border ${
              darkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Scenes & Routines
              </h2>
              <div
                className={`
                p-1.5 rounded-full
                ${
                  darkMode
                    ? "bg-gray-800/50 text-amber-400"
                    : "bg-amber-50 text-amber-500"
                }
              `}
              >
                <Sparkles size={18} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className={`
                p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/30"
                    : "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50"
                }
              `}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    p-2 rounded-full mb-3
                    ${
                      darkMode
                        ? "bg-blue-900/50 text-blue-300"
                        : "bg-blue-100 text-blue-600"
                    }
                  `}
                  >
                    <Moon size={20} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Night Mode
                  </span>
                </div>
              </div>

              <div
                className={`
                p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${
                  darkMode
                    ? "bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-700/30"
                    : "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/50"
                }
              `}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    p-2 rounded-full mb-3
                    ${
                      darkMode
                        ? "bg-amber-900/50 text-amber-300"
                        : "bg-amber-100 text-amber-600"
                    }
                  `}
                  >
                    <Sun size={20} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Warm Welcome
                  </span>
                </div>
              </div>

              <div
                className={`
                p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${
                  darkMode
                    ? "bg-gradient-to-br from-emerald-900/30 to-teal-800/30 border border-emerald-700/30"
                    : "bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200/50"
                }
              `}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    p-2 rounded-full mb-3
                    ${
                      darkMode
                        ? "bg-emerald-900/50 text-emerald-300"
                        : "bg-emerald-100 text-emerald-600"
                    }
                  `}
                  >
                    <Wind size={20} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Fresh Air
                  </span>
                </div>
              </div>

              <div
                className={`
                p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${
                  darkMode
                    ? "bg-gradient-to-br from-cyan-900/30 to-blue-800/30 border border-cyan-700/30"
                    : "bg-gradient-to-br from-cyan-50 to-blue-100 border border-cyan-200/50"
                }
              `}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    p-2 rounded-full mb-3
                    ${
                      darkMode
                        ? "bg-cyan-900/50 text-cyan-300"
                        : "bg-cyan-100 text-cyan-600"
                    }
                  `}
                  >
                    <Droplet size={20} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Hydro Mode
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span
            className={`text-xs ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <span
            className={`text-xs ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            © 2025 Smart Home Solutions
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SmartHomeDashboard;
