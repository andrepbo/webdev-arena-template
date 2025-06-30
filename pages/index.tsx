"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Search,
  Settings,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  TrendingUp,
  LayoutGrid,
  LineChart,
  Wallet,
  Image,
  Bell,
} from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const cn = (...classNames: (string | undefined | null | boolean)[]) => {
  return classNames.filter(Boolean).join(" ");
};

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-lg",
      className
    )}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className)} {...props} />
);

const CandleChart = () => {
  const [selectedInterval, setSelectedInterval] = useState("1d");

  const [series, setSeries] = useState([
    {
      data: [] as { x: Date; y: number[] }[],
    },
  ]);

  const generateChartData = (interval: string) => {
    const now = new Date();
    const data: { x: Date; y: number[] }[] = [];
    let basePrice = 190;

    const candleCount =
      {
        "1s": 60,
        "15m": 96,
        "1h": 24,
        "4h": 30,
        "1d": 30,
        "1w": 52,
      }[interval] || 30;

    const getTimeIncrement = (interval: string) => {
      switch (interval) {
        case "1s":
          return 1000;
        case "15m":
          return 15 * 60 * 1000;
        case "1h":
          return 60 * 60 * 1000;
        case "4h":
          return 4 * 60 * 60 * 1000;
        case "1d":
          return 24 * 60 * 60 * 1000;
        case "1w":
          return 7 * 24 * 60 * 60 * 1000;
        default:
          return 24 * 60 * 60 * 1000;
      }
    };

    const timeIncrement = getTimeIncrement(interval);

    for (let i = candleCount; i > 0; i--) {
      const timeDate = new Date(now.getTime() - i * timeIncrement);
      const volatility = 2;
      const change = (Math.random() - 0.5) * volatility;
      basePrice += change;

      const open = parseFloat(basePrice.toFixed(2));
      const close = parseFloat((basePrice + change).toFixed(2));
      const high = parseFloat(
        (Math.max(open, close) + Math.random() * volatility).toFixed(2)
      );
      const low = parseFloat(
        (Math.min(open, close) - Math.random() * volatility).toFixed(2)
      );

      data.push({
        x: timeDate,
        y: [open, high, low, close],
      });
    }
    return data;
  };

  useEffect(() => {
    const newData = generateChartData(selectedInterval);
    setSeries([{ data: newData }]);
  }, [selectedInterval]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 500,
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      borderColor: "rgba(0,255,255,0.02)",
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00ffaa",
          downward: "#ff4976",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#666666",
          fontFamily: "Inter, sans-serif",
        },
      },
      axisBorder: {
        color: "rgba(0,255,255,0.1)",
      },
      axisTicks: {
        color: "rgba(0,255,255,0.1)",
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(2),
        style: {
          colors: "#666666",
          fontFamily: "Inter, sans-serif",
        },
      },
      opposite: true,
      axisBorder: {
        show: true,
        color: "rgba(0,255,255,0.1)",
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy HH:mm",
      },
    },
  };

  return (
    <div className="relative">
      {/* Chart Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">SOL/USD</div>
            <div className="flex items-center gap-3">
              <span className="text-xl text-[#00ffff] font-semibold">
                190.97
              </span>
              <span className="text-lg text-gray-200">USD</span>
              <div className="flex items-center gap-1.5 text-[#00ffaa]">
                <TrendingUp size={20} />
                <span className="text-lg font-semibold">+2.92%</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5"></div>
          </div>
          <div className="flex justify-start gap-1.5">
            {["1s", "15m", "1h", "4h", "1d", "1w"].map((interval) => (
              <button
                key={interval}
                onClick={() => setSelectedInterval(interval)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  "border border-[rgba(0,255,255,0.1)] backdrop-blur-sm",
                  "hover:border-[rgba(0,255,255,0.2)] hover:bg-[rgba(0,255,255,0.08)]",
                  interval === selectedInterval
                    ? "bg-[rgba(0,255,255,0.15)] text-[#00ffff] border-[rgba(0,255,255,0.25)]"
                    : "bg-[rgba(255,255,255,0.05)] text-gray-200 hover:text-white"
                )}
              >
                {interval}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="w-full h-[500px] relative bg-[#0a0a0a] rounded-xl"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(0,255,255,0.08) 0%, rgba(255,255,255,0.03) 25%, transparent 50%), linear-gradient(105deg, rgba(0,255,255,0.05) 0%, rgba(0,255,255,0.02) 50%, transparent 100%)",
        }}
      >
        <Chart
          options={options}
          series={series}
          type="candlestick"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

const volumeData = [
  { date: "09/01", vol: 65, color: "#66d1ff" },
  { date: "09/02", vol: 85, color: "#ff9966" },
  { date: "09/03", vol: 55, color: "#66d1ff" },
  { date: "09/04", vol: 95, color: "#ff9966" },
  { date: "09/05", vol: 75, color: "#66d1ff" },
  { date: "10/01", vol: 110, color: "#ff9966" },
  { date: "10/02", vol: 80, color: "#66d1ff" },
  { date: "10/03", vol: 90, color: "#ff9966" },
  { date: "10/04", vol: 70, color: "#66d1ff" },
  { date: "10/05", vol: 120, color: "#ff9966" },
  { date: "11/01", vol: 85, color: "#66d1ff" },
  { date: "11/02", vol: 95, color: "#ff9966" },
  { date: "11/03", vol: 110, color: "#66d1ff" },
  { date: "11/04", vol: 75, color: "#ff9966" },
  { date: "11/05", vol: 90, color: "#66d1ff" },
  { date: "12/01", vol: 100, color: "#ff9966" },
  { date: "12/02", vol: 70, color: "#66d1ff" },
  { date: "12/03", vol: 85, color: "#ff9966" },
  { date: "12/04", vol: 95, color: "#66d1ff" },
  { date: "12/05", vol: 65, color: "#ff9966" },
  { date: "13/01", vol: 80, color: "#66d1ff" },
  { date: "13/02", vol: 90, color: "#ff9966" },
  { date: "13/03", vol: 75, color: "#66d1ff" },
  { date: "13/04", vol: 85, color: "#ff9966" },
  { date: "13/05", vol: 70, color: "#66d1ff" },
];

const VolumeChart = () => {
  return (
    <div className="relative">
      {/* Volume Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
        <div className="flex items-center gap-4">
          <div className="text-lg font-medium text-white">Volume</div>
          <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
            <ChevronDown size={16} className="text-white" />
            <span className="text-[#66d1ff]">Vol(SOL): 1.22M</span>
            <span className="text-[#ff9966]">Vol(USDT): 236.439M</span>
            <span className="text-[#66d1ff]">2.794M</span>
            <span className="text-[#66d1ff]">2.451M</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#1a1a1a] text-white px-4 py-1 rounded text-sm hover:bg-[#222222] rounded-lg">
            Hot
          </button>
          <button className="bg-[rgba(0,255,255,0.1)] text-white px-4 py-1 rounded text-sm rounded-lg">
            Favorites
          </button>
        </div>
      </div>

      <div className="h-[300px] pt-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={volumeData} barGap={0}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#666666",
                fontSize: 12,
                fontFamily: "Inter, sans-serif",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#666666",
                fontSize: 12,
                fontFamily: "Inter, sans-serif",
              }}
              tickFormatter={(value: number) => `${value}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(0,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px",
                fontFamily: "Inter, sans-serif",
              }}
              itemStyle={{ color: "#ffffff" }}
              cursor={{ fill: "rgba(0,255,255,0.05)" }}
              formatter={(value: number) => [`${value}K`, "Volume"]}
            />
            <Bar dataKey="vol" radius={[2, 2, 0, 0]}>
              {volumeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card className="bg-[#0a0a0a] border-[rgba(0,255,255,0.1)] relative overflow-hidden rounded-xl">
          <CardContent className="p-0">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 20% 40%, rgba(0,255,255,0.08) 0%, rgba(255,255,255,0.03) 25%, transparent 50%), linear-gradient(105deg, rgba(0,255,255,0.05) 0%, rgba(0,255,255,0.02) 50%, transparent 100%)",
              }}
            ></div>
            <CandleChart />
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[rgba(0,255,255,0.1)] rounded-xl">
          <CardContent className="p-6">
            <VolumeChart />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-[#111111] border-none shadow-lg overflow-hidden rounded-xl">
          <CardContent className="p-6 relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 20% 40%, rgba(0,255,255,0.05) 0%, rgba(0,255,255,0.02) 25%, transparent 50%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-medium text-white">Exchange</div>
              <button className="text-gray-400 hover:text-white p-1 rounded-full">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 8h8M8 4v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="relative">
              <div className="relative z-10 mb-8">
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[rgba(255,255,255,0.1)]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Sell</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Available:</span>
                      <span className="text-sm text-white">3,200 USDT</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      defaultValue="1,500"
                      className="bg-transparent text-2xl font-medium text-white w-full outline-none"
                    />
                    <button className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M4 10h12M10 4v12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-white">SOL</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border-4 border-[#111111] flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#00ffff]"
                  >
                    <path
                      d="M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom Card - Buy */}
              <div className="relative z-10">
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[rgba(255,255,255,0.1)]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Buy</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        Estimated Fee:
                      </span>
                      <span className="text-sm text-white">2.5 USDT</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      defaultValue="0.01587"
                      className="bg-transparent text-2xl font-medium text-white w-full outline-none"
                    />
                    <button className="flex items-center gap-2">
                      <span className="text-white">DOGE</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Exchanges */}
        <Card className="bg-[#111111] border-none shadow-lg overflow-hidden rounded-xl">
          <CardContent
            className="p-8 relative"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(0,255,255,0.03) 35%, rgba(0,255,255,0.05) 50%, rgba(0,255,255,0.03) 65%, transparent 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 120% -20%, rgba(0,255,255,0.08) 0%, rgba(0,255,255,0.03) 25%, transparent 50%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-10">
              <div className="text-lg font-medium text-white">
                Recent exchanges
              </div>
              <button className="text-white text-sm font-medium hover:text-[rgba(255,255,255,0.8)] transition-colors rounded-lg">
                See All
              </button>
            </div>
            <div className="relative mt-8">
              <div className="absolute top-0 left-0 right-0 -translate-y-8">
                <div className="bg-[#222222] rounded-xl p-4 flex items-center justify-between border border-[#333333]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                      <svg
                        className="text-[#00ffff] transform rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4L10 16M10 4L6 8M10 4L14 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-medium">BTC to USDT</div>
                      <div className="text-sm text-gray-400">15 min ago</div>
                    </div>
                  </div>
                  <span className="text-[#00ff00] font-medium">
                    +120.25 USDT
                  </span>
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 -translate-y-4">
                <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between border border-[#2a2a2a]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#222222] flex items-center justify-center">
                      <svg
                        className="text-[#00ffff] transform rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4L10 16M10 4L6 8M10 4L14 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-medium">BTC to USDT</div>
                      <div className="text-sm text-gray-400">15 min ago</div>
                    </div>
                  </div>
                  <span className="text-[#00ff00] font-medium">
                    +120.25 USDT
                  </span>
                </div>
              </div>

              {/* Main Card (Top) */}
              <div className="relative">
                <div className="bg-[#151515] rounded-xl p-4 flex items-center justify-between border border-[#222222]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                      <svg
                        className="text-[#00ffff] transform rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 4L10 16M10 4L6 8M10 4L14 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-medium">BTC to USDT</div>
                      <div className="text-sm text-gray-400">15 min ago</div>
                    </div>
                  </div>
                  <span className="text-[#00ff00] font-medium">
                    +120.25 USDT
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card className="bg-[#111111] border-none shadow-lg overflow-hidden rounded-xl">
          <CardContent className="p-6 relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(0,255,255,0.05) 0%, rgba(0,255,255,0.02) 25%, transparent 50%)",
              }}
            ></div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-lg font-medium text-white">Checklist</div>
                <div className="text-sm text-gray-400 mt-1">
                  Mon, 19 Nov 2024
                </div>
              </div>
              <button className="text-white text-sm font-medium hover:text-[rgba(255,255,255,0.8)] transition-colors rounded-lg">
                See All
              </button>
            </div>
            <div className="space-y-2">
              <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between group hover:bg-[#222222] transition-colors border border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#00ffff] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00ffff]"></div>
                  </div>
                  <div>
                    <div className="text-white">Start To Send To Network</div>
                    <div className="text-sm text-gray-400">Due time: 08:00</div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between group hover:bg-[#222222] transition-colors border border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#00ffff] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00ffff]"></div>
                  </div>
                  <div>
                    <div className="text-white">Crypto Payment Done</div>
                    <div className="text-sm text-gray-400">Due time: 10:30</div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Markets = ({ subSection }: { subSection: string }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Markets</h2>
        <div className="flex gap-2">
          {["Margin", "Flat", "P2P"].map((item) => (
            <button
              key={item}
              className={cn(
                "px-4 py-2 rounded-lg transition-all duration-200",
                subSection === item
                  ? "bg-[rgba(0,255,255,0.15)] text-[#00ffff]"
                  : "bg-[rgba(255,255,255,0.05)] text-gray-400 hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card
            key={i}
            className="bg-[#111111] border-none shadow-lg overflow-hidden rounded-xl"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,255,255,0.1)] flex items-center justify-center">
                    <TrendingUp className="text-[#00ffff]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">BTC/USDT</div>
                    <div className="text-sm text-gray-400">Bitcoin</div>
                  </div>
                </div>
                <div className="text-[#00ff99]">+2.34%</div>
              </div>
              <div className="h-32 bg-[rgba(0,255,255,0.05)] rounded-lg mb-4 flex items-center justify-center">
                <img
                  src={`https://placehold.co/300x128/1a1a1a/00ffff?text=Chart+${i}`}
                  alt={`Bitcoin price chart preview ${i}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">$42,567.89</div>
                <button className="px-4 py-2 bg-[rgba(0,255,255,0.15)] text-[#00ffff] rounded-lg">
                  Trade
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Trade = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <Card className="bg-[#111111] border-none shadow-lg rounded-xl">
          <CardContent className="p-6 h-[600px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Trade</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[rgba(0,255,255,0.15)] text-[#00ffff] rounded-lg">
                  Spot
                </button>
                <button className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 rounded-lg">
                  Margin
                </button>
              </div>
            </div>
            <CandleChart />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="bg-[#111111] border-none shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Order Form</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[rgba(0,255,255,0.15)] text-[#00ffff] rounded-lg text-sm">
                  Buy
                </button>
                <button className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] text-gray-400 rounded-lg text-sm">
                  Sell
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Price
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white outline-none focus:border-[#00ffff]"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Amount
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white outline-none focus:border-[#00ffff]"
                  placeholder="0.00"
                />
              </div>
              <button className="w-full py-3 bg-[#00ffaa] text-black rounded-lg font-medium hover:bg-[#00cc88] transition-colors">
                Place Order
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const NFT = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">NFT Marketplace</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[rgba(0,255,255,0.15)] text-[#00ffff] rounded-lg">
            All
          </button>
          <button className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 rounded-lg">
            Art
          </button>
          <button className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 rounded-lg">
            Gaming
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card
            key={i}
            className="bg-[#111111] border-none shadow-lg overflow-hidden rounded-xl"
          >
            <div className="aspect-square bg-[rgba(0,255,255,0.05)] rounded-t-xl">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <img
                  src={`https://placehold.co/200x200/1a1a1a/00ffff?text=NFT+${i}`}
                  alt={`NFT artwork ${i}`}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium">Crypto Art #{i}</div>
                <div className="text-[#00ffff]">2.5 ETH</div>
              </div>
              <div className="text-sm text-gray-400">By Artist {i}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [selectedNav, setSelectedNav] = useState("overview");
  const [selectedSubNav, setSelectedSubNav] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFeatureClick = (featureName: string) => {
    console.log(`${featureName} - Feature coming soon!`);
  };

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <LayoutGrid size={18} /> },
    {
      id: "markets",
      label: "Markets",
      icon: <LineChart size={18} />,
      subItems: ["Margin", "Flat", "P2P"],
    },
    { id: "trade", label: "Trade", icon: <Wallet size={18} /> },
    { id: "nft", label: "NFT", icon: <Image size={18} aria-hidden="true" /> },
  ];

  const renderContent = () => {
    switch (selectedNav) {
      case "overview":
        return <Overview />;
      case "markets":
        return <Markets subSection={selectedSubNav} />;
      case "trade":
        return <Trade />;
      case "nft":
        return <NFT />;
      default:
        return <Overview />;
    }
  };

  const globalStyles = `
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      overflow: hidden; /* Prevent body scroll, content scrolls within main */
    }
    /* Custom scrollbar for webkit browsers */
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1a1a1a;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #00ffff;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #00ccff;
    }
  `;

  return (
    <>
      <Head>
        <title>Fluxor Dashboard</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="flex h-screen bg-[#040404] text-white relative">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-[#1a1a1a] p-2 rounded-lg shadow-md"
          aria-label="Toggle navigation"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isSidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            )}
          </svg>
        </button>

        <aside
          className={cn(
            "fixed lg:relative w-64 p-4 flex flex-col gap-6 border-r border-[#1a1a1a] h-full z-40 transition-transform duration-300 bg-[#040404] rounded-tr-xl rounded-br-xl",
            "lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{
            background:
              "radial-gradient(circle at 20% 40%, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0.03) 25%, transparent 50%)",
            backgroundColor: "#040404",
          }}
        >
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="w-6 h-6 bg-gradient-to-br from-[#00ffff] to-[#00ff99] rounded"></div>
            Fluxor
          </div>

          {/* Navigation Section */}
          <section className="space-y-2 flex-grow overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-2">
              Navigation
            </h3>
            <nav className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setSelectedNav(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200",
                      selectedNav === item.id
                        ? "bg-[rgba(0,255,255,0.15)] text-white shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                        : "text-gray-400 hover:bg-[rgba(0,255,255,0.08)] hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.subItems && (
                      <ChevronDown
                        size={14}
                        className={selectedNav === item.id ? "rotate-180" : ""}
                      />
                    )}
                  </button>

                  {item.subItems && selectedNav === item.id && (
                    <div className="ml-4 border-l-2 border-[rgba(0,255,255,0.2)] pl-4 mt-1 flex flex-col gap-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem}
                          onClick={() => {
                            setSelectedSubNav(subItem);
                            handleFeatureClick(`${item.label} - ${subItem}`);
                          }}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                            selectedSubNav === subItem
                              ? "text-white bg-[rgba(0,255,255,0.1)]"
                              : "text-gray-400 hover:bg-[rgba(0,255,255,0.05)] hover:text-white"
                          )}
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </section>

          {/* Account Section */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-2">
              Account
            </h3>
            <div className="flex flex-col gap-1">
              {[
                { icon: <MessageCircle size={18} />, label: "Messages" },
                { icon: <Settings size={18} />, label: "Settings" },
                { icon: <HelpCircle size={18} />, label: "Help" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleFeatureClick(item.label)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[rgba(0,255,255,0.08)] hover:text-white transition-all duration-200"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          {/* Currency Section */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-2">
              Currency
            </h3>
            <select
              className="w-full px-3 py-2.5 rounded-lg bg-[rgba(0,255,255,0.08)] text-white border border-[rgba(0,255,255,0.2)] focus:outline-none focus:border-[rgba(0,255,255,0.3)] transition-colors"
              onChange={() => handleFeatureClick("Currency Change")}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BRL">BRL</option>
            </select>
          </section>

          <div className="mt-auto flex items-center justify-between text-sm text-gray-400 px-2 pb-4"></div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-4 lg:p-6 overflow-y-auto bg-[#040404] w-full"
          style={{
            background:
              "radial-gradient(circle at 80% 10%, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0.03) 25%, transparent 50%)",
          }}
        >
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 mt-12">
            {/* Search bar */}
            <div className="flex items-center gap-2 bg-[rgba(0,255,255,0.08)] rounded-xl px-4 py-2.5 w-full lg:w-[320px] border border-[rgba(0,255,255,0.1)] hover:border-[rgba(0,255,255,0.2)] transition-colors">
              <Search size={18} className="text-gray-400" />
              <input
                className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                placeholder="Search"
                onChange={() => handleFeatureClick("Search")}
              />
            </div>

            {/* Right side items */}
            <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto justify-between lg:justify-start">
              <button
                onClick={() => handleFeatureClick("Notifications")}
                className="bg-[#1a1a1a] p-2 rounded-xl border border-[rgba(0,255,255,0.1)] hover:border-[rgba(0,255,255,0.2)] transition-colors"
                aria-label="Notifications"
              >
                <Bell
                  size={20}
                  className="text-gray-400 hover:text-white cursor-pointer"
                />
              </button>

              <select
                className="bg-[#1a1a1a] text-white border border-[rgba(0,255,255,0.1)] outline-none rounded-xl px-4 py-2 cursor-pointer hover:border-[rgba(0,255,255,0.2)] transition-colors min-w-[180px] hidden lg:block"
                onChange={() => handleFeatureClick("Performance Filter")}
              >
                <option>Total performance</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>

              <button
                onClick={() => handleFeatureClick("Profile Settings")}
                className="flex items-start gap-3"
                aria-label="Profile settings"
              >
                <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg overflow-hidden">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Profile picture of James Carter"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col hidden lg:block text-left">
                  <span className="text-white">James Carter</span>
                  <br />
                  <span className="text-sm text-gray-400">
                    james.carter@example.com
                  </span>
                </div>
              </button>
            </div>
          </header>

          {/* Bottom row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div className="text-2xl font-bold text-white">Portfolio</div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-white">Exchanges:</span>
                <ChevronDown size={16} className="text-white" />
                <span className="text-red-500">456</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white">Market Cap:</span>
                <span className="text-[#00ff99]">$876.54B</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white">24h Vol:</span>
                <span className="text-[#00ff99]">$72.31B</span>
              </div>
            </div>
          </div>

          {renderContent()}
        </main>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default App;
