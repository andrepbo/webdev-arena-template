import React, { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  Search,
  Bell,
  Settings,
  Menu,
  MoreHorizontal,
  SlidersHorizontal,
  Trash2,
  Edit,
  Shield,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const OpenAlertsClassif: React.FC = () => {
  type ChartPoint = {
    time: string;
    Hacktool: number;
    Virus: number;
    Spyware: number;
    Malware: number;
    Empty: number;
  };

  const chartData: ChartPoint[] = [
    {
      time: "2:00",
      Hacktool: 12.7,
      Virus: 7.2,
      Spyware: 16.2,
      Malware: 38.2,
      Empty: 25.7,
    },
    {
      time: "2:30",
      Hacktool: 21.2,
      Virus: 21.6,
      Spyware: 14.7,
      Malware: 31.5,
      Empty: 11.0,
    },
    {
      time: "3:00",
      Hacktool: 7.7,
      Virus: 22.8,
      Spyware: 12.7,
      Malware: 26.7,
      Empty: 30.1,
    },
    {
      time: "3:30",
      Hacktool: 20.3,
      Virus: 14.1,
      Spyware: 10.6,
      Malware: 12.5,
      Empty: 42.5,
    },
    {
      time: "4:00",
      Hacktool: 21.3,
      Virus: 16.5,
      Spyware: 18.2,
      Malware: 22.1,
      Empty: 21.9,
    },
    {
      time: "4:30",
      Hacktool: 21.8,
      Virus: 17.4,
      Spyware: 19.1,
      Malware: 16.2,
      Empty: 25.5,
    },
    {
      time: "5:00",
      Hacktool: 10.9,
      Virus: 6.9,
      Spyware: 11.3,
      Malware: 15.3,
      Empty: 55.6,
    },
    {
      time: "5:30",
      Hacktool: 15.3,
      Virus: 20.8,
      Spyware: 13.1,
      Malware: 19.3,
      Empty: 31.5,
    },
    {
      time: "6:00",
      Hacktool: 13.6,
      Virus: 10.2,
      Spyware: 10.4,
      Malware: 33.8,
      Empty: 32.0,
    },
    {
      time: "6:30",
      Hacktool: 17.2,
      Virus: 23.0,
      Spyware: 12.0,
      Malware: 26.4,
      Empty: 21.4,
    },
    {
      time: "7:00",
      Hacktool: 18.4,
      Virus: 19.8,
      Spyware: 19.4,
      Malware: 15.3,
      Empty: 27.1,
    },
    {
      time: "7:30",
      Hacktool: 17.8,
      Virus: 11.4,
      Spyware: 16.4,
      Malware: 21.6,
      Empty: 32.8,
    },
    {
      time: "8:00",
      Hacktool: 11.6,
      Virus: 21.7,
      Spyware: 13.2,
      Malware: 28.0,
      Empty: 25.5,
    },
    {
      time: "8:30",
      Hacktool: 16.1,
      Virus: 10.5,
      Spyware: 14.5,
      Malware: 22.5,
      Empty: 36.4,
    },
    {
      time: "9:00",
      Hacktool: 16.9,
      Virus: 13.1,
      Spyware: 18.1,
      Malware: 16.4,
      Empty: 35.5,
    },
    {
      time: "9:30",
      Hacktool: 9.3,
      Virus: 20.7,
      Spyware: 10.8,
      Malware: 34.8,
      Empty: 24.4,
    },
    {
      time: "10:00",
      Hacktool: 8.0,
      Virus: 11.8,
      Spyware: 13.4,
      Malware: 34.8,
      Empty: 32.0,
    },
    {
      time: "10:30",
      Hacktool: 19.4,
      Virus: 10.0,
      Spyware: 19.7,
      Malware: 34.6,
      Empty: 16.3,
    },
    {
      time: "11:00",
      Hacktool: 15.3,
      Virus: 10.6,
      Spyware: 5.7,
      Malware: 12.0,
      Empty: 56.4,
    },
    {
      time: "11:30",
      Hacktool: 11.6,
      Virus: 14.8,
      Spyware: 16.2,
      Malware: 20.1,
      Empty: 37.3,
    },
  ];

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        setContainerWidth(chartContainerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let tickPattern = 2;
  if (containerWidth < 600) tickPattern = 3;

  const allTicks = chartData.map((d) => d.time);
  const ticks = allTicks.filter((_, i) => i % tickPattern === 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg text-xs">
        <div className="flex justify-between mb-1">
          <span>{label}</span>
        </div>
        {payload
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((p: any) => p.dataKey !== "Empty")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((p: any) => (
            <div key={p.dataKey} className="flex justify-between">
              <span className="flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: p.fill }}
                />
                {p.dataKey}
              </span>
              <span>{p.value}%</span>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div
      ref={chartContainerRef}
      className="w-full bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg p-4 space-y-2 text-gray-900 dark:text-gray-200 overflow-hidden shadow-md"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
          Open alerts by classification
        </h2>
        <select
          onChange={() => toast.info("Coming soon..")}
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm px-2 py-1 rounded"
        >
          <option>Today</option>
          <option>Yesterday</option>
        </select>
      </div>

      <div className="flex items-center space-x-4 text-sm mb-1 text-gray-700 dark:text-gray-300">
        <span className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-400 mr-1" />
          Hacktool
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-purple-500 mr-1" />
          Virus
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-yellow-400 mr-1" />
          Spyware
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-pink-500 mr-1" />
          Malware
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 10, left: 10, bottom: 20 }}
            barSize={20}
            barCategoryGap="10%"
          >
            <XAxis
              dataKey="time"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              ticks={ticks}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid horizontal={false} vertical={false} />

            <Bar
              dataKey="Hacktool"
              stackId="a"
              fill="#9ca3af"
              radius={[4, 4, 4, 4]}
              cursor="pointer"
              isAnimationActive={false}
            />
            <Bar
              dataKey="Virus"
              stackId="a"
              fill="#8b5cf6"
              radius={[4, 4, 4, 4]}
              cursor="pointer"
              isAnimationActive={false}
            />
            <Bar
              dataKey="Spyware"
              stackId="a"
              fill="#facc15"
              radius={[4, 4, 4, 4]}
              cursor="pointer"
              isAnimationActive={false}
            />
            <Bar
              dataKey="Malware"
              stackId="a"
              fill="#ec4899"
              radius={[4, 4, 4, 4]}
              cursor="pointer"
              isAnimationActive={false}
            />
            <Bar
              dataKey="Empty"
              stackId="a"
              fill="#374151"
              radius={[4, 4, 4, 4]}
              cursor="pointer"
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ThreatsTacticsCard: React.FC = () => {
  type RingConfig = {
    value: number;
    from: string;
    to: string;
    size: number;
    x: string;
    y: string;
    label: string;
  };

  const rings: RingConfig[] = [
    {
      value: 3548,
      from: "#ec4899",
      to: "#8b5cf6",
      size: 95,
      x: "50%",
      y: "50%",
      label: "Defense Evasion",
    },
    {
      value: 3012,
      from: "#8b5cf6",
      to: "#a78bfa",
      size: 70,
      x: "52%",
      y: "15%",
      label: "Discovery",
    },
    {
      value: 2747,
      from: "#f472b6",
      to: "#ec4899",
      size: 70,
      x: "48%",
      y: "85%",
      label: "Execution",
    },
    {
      value: 2674,
      from: "#ec4899",
      to: "#f472b6",
      size: 80,
      x: "80%",
      y: "50%",
      label: "Initial Access",
    },
    {
      value: 2957,
      from: "#9333ea",
      to: "#ec4899",
      size: 80,
      x: "20%",
      y: "50%",
      label: "Privilege Escalation",
    },
    {
      value: 2756,
      from: "#ec4899",
      to: "#fde047",
      size: 50,
      x: "30%",
      y: "30%",
      label: "Lateral Movement",
    },
    {
      value: 2487,
      from: "#fde047",
      to: "#facc15",
      size: 50,
      x: "70%",
      y: "30%",
      label: "Collection",
    },
    {
      value: 2747,
      from: "#f472b6",
      to: "#ec4899",
      size: 50,
      x: "70%",
      y: "70%",
      label: "Exfiltration",
    },
    {
      value: 1938,
      from: "#fde047",
      to: "#facc15",
      size: 50,
      x: "30%",
      y: "70%",
      label: "Command & Control",
    },
  ];

  return (
    <div className="w-full h-[22rem] bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg p-4 text-gray-900 dark:text-gray-200 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">
          Threats Tactics{" "}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (Last 2 weeks)
          </span>
        </h2>
        <select
          onChange={() => toast.info("Coming soon..")}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm px-2 py-1 rounded"
        >
          <option>All</option>
        </select>
      </div>

      <div className="relative flex-1">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[45, 35, 25, 15].map((r) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              className="stroke-gray-300 dark:stroke-[#374151] stroke-[0.5]"
              fill="none"
            />
          ))}
        </svg>
        {rings.map((ring, i) => {
          const radius = ring.size / 2;
          const outerStroke = ring.size * 0.08;
          const innerStroke = ring.size * 0.04;
          const gap = ring.size * 0.1;
          const baseRadius = radius - outerStroke - gap - innerStroke / 2;
          const circumference = 2 * Math.PI * baseRadius;
          const maxValue = Math.max(...rings.map((r) => r.value));
          const progress = ring.value / maxValue;
          return (
            <svg
              key={i}
              className="absolute"
              style={{
                top: ring.y,
                left: ring.x,
                transform: "translate(-50%, -50%)",
              }}
              width={ring.size}
              height={ring.size}
              viewBox={`0 0 ${ring.size} ${ring.size}`}
            >
              <defs>
                <linearGradient
                  id={`grad-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={ring.from} />
                  <stop offset="100%" stopColor={ring.to} />
                </linearGradient>
              </defs>
              <circle
                cx={radius}
                cy={radius}
                r={radius - outerStroke / 2}
                stroke={`url(#grad-${i})`}
                strokeWidth={outerStroke}
                fill="none"
              />
              <circle
                cx={radius}
                cy={radius}
                r={baseRadius}
                stroke="#fff"
                strokeWidth={innerStroke}
                fill="none"
              />
              <circle
                cx={radius}
                cy={radius}
                r={baseRadius}
                stroke={`url(#grad-${i})`}
                strokeWidth={innerStroke}
                fill="none"
                strokeDasharray={`${progress * circumference} ${circumference}`}
                transform={`rotate(-90 ${radius} ${radius})`}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                className="font-semibold"
                style={{ fontSize: baseRadius * 0.5 }}
              >
                {ring.value}
              </text>
            </svg>
          );
        })}
      </div>

      <div className="mt-2 flex-wrap flex justify-center space-x-4 text-sm text-gray-700 dark:text-gray-300">
        {rings.slice(0, 4).map((r, i) => (
          <span key={i} className="flex items-center">
            <span
              className="w-2 h-2 rounded-full mr-1"
              style={{ background: r.from }}
            />
            {r.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const ThreatsStatusCard: React.FC = () => {
  type StatusData = {
    label: string;
    count: number;
    colorClass: string;
  };

  const statuses: StatusData[] = [
    { label: "Open", count: 40, colorClass: "bg-amber-500" },
    { label: "InProgress", count: 20, colorClass: "bg-pink-500" },
    { label: "Dismissed", count: 18, colorClass: "bg-purple-500" },
    { label: "Resolved", count: 12, colorClass: "bg-green-500" },
  ];
  const maxCount = Math.max(...statuses.map((s) => s.count));
  const maxBars = 30;

  return (
    <div className="w-full h-[22rem] bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg p-4 flex flex-col text-gray-900 dark:text-gray-200 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Threats status</h2>
        <button
          onClick={() => toast.info("Coming soon..")}
          className="hover:bg-gray-300 dark:hover:bg-gray-800 p-1 rounded-full"
        >
          <MoreHorizontal className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex-1 mt-4 flex justify-center items-end overflow-x-auto">
        <div className="flex items-end space-x-1">
          {statuses.map(({ label, count, colorClass }) => {
            const scaledCount = Math.round((count / maxCount) * maxBars);
            return (
              <div key={label} className="flex flex-col items-center">
                <span className="text-gray-900 dark:text-white text-sm mb-1">
                  {count}
                </span>
                <div className="flex items-end">
                  <div className={`${colorClass} w-1.5 h-32 rounded-sm`} />
                  {Array.from({ length: scaledCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`${colorClass} w-1.5 h-20 rounded-sm ml-0.5`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-2 text-sm">
        {statuses.map(({ label, count, colorClass }) => (
          <div key={label} className="flex items-center">
            <span className={`${colorClass} w-2 h-2 rounded-full mr-2`} />
            <span className="flex-1">{label}</span>
            <span className="font-semibold">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SecurityThreatsCard: React.FC = () => {
  const ICON_URLS = {
    azure: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg",
    aws: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg",
    google: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg",
    slack: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg",
    splunk: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/splunk.svg",
  } as const;

  type IconKey = keyof typeof ICON_URLS;
  type Status = "Open" | "InProgress" | "Dismissed" | "Resolved";

  interface Incident {
    id: number;
    avatar: string;
    entity: string;
    sourceIcon: IconKey;
    description: string;
    title: string;
    riskPercent: number;
    lastActivity: string;
    sources: IconKey[];
    status: Status;
  }

  const initialIncidents: Incident[] = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      entity: "alice.smith@example.com",
      sourceIcon: "azure",
      description: "Xposed AzureAD",
      title: "Cross-Platform attack in data pipeline…",
      riskPercent: 65,
      lastActivity: "Apr 12, 2025",
      sources: ["azure", "aws"],
      status: "Open",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      entity: "bob.johnson@example.com",
      sourceIcon: "aws",
      description: "Xposed AWS API",
      title: "Credential misuse detected…",
      riskPercent: 50,
      lastActivity: "Apr 14, 2025",
      sources: ["google", "slack", "splunk"],
      status: "InProgress",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      entity: "carol.williams@example.com",
      sourceIcon: "google",
      description: "Xposed Google Workspace",
      title: "Suspicious OAuth token usage…",
      riskPercent: 40,
      lastActivity: "Apr 15, 2025",
      sources: ["google"],
      status: "Dismissed",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=4",
      entity: "dave.brown@example.com",
      sourceIcon: "slack",
      description: "Xposed Slack",
      title: "Excessive message deletions…",
      riskPercent: 30,
      lastActivity: "Apr 16, 2025",
      sources: ["slack", "google"],
      status: "Resolved",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      entity: "eve.jones@example.com",
      sourceIcon: "splunk",
      description: "Xposed Splunk",
      title: "Anomalous search queries…",
      riskPercent: 55,
      lastActivity: "Apr 17, 2025",
      sources: ["splunk"],
      status: "InProgress",
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/150?img=6",
      entity: "frank.miller@example.com",
      sourceIcon: "aws",
      description: "Xposed AWS IAM",
      title: "Privilege escalation attempt…",
      riskPercent: 85,
      lastActivity: "Apr 18, 2025",
      sources: ["aws", "azure"],
      status: "Open",
    },
    {
      id: 7,
      avatar: "https://i.pravatar.cc/150?img=7",
      entity: "grace.davis@example.com",
      sourceIcon: "azure",
      description: "Xposed AzureAD",
      title: "Impossible travel event…",
      riskPercent: 70,
      lastActivity: "Apr 19, 2025",
      sources: ["azure", "slack"],
      status: "InProgress",
    },
    {
      id: 8,
      avatar: "https://i.pravatar.cc/150?img=8",
      entity: "henry.wilson@example.com",
      sourceIcon: "google",
      description: "Xposed GCP",
      title: "Large data export…",
      riskPercent: 45,
      lastActivity: "Apr 20, 2025",
      sources: ["google", "aws"],
      status: "Dismissed",
    },
    {
      id: 9,
      avatar: "https://i.pravatar.cc/150?img=9",
      entity: "ivy.moore@example.com",
      sourceIcon: "slack",
      description: "Xposed Slack",
      title: "Unauthorized app installation…",
      riskPercent: 35,
      lastActivity: "Apr 21, 2025",
      sources: ["slack"],
      status: "Resolved",
    },
    {
      id: 10,
      avatar: "https://i.pravatar.cc/150?img=10",
      entity: "jacktaylor@example.com",
      sourceIcon: "splunk",
      description: "Xposed Splunk",
      title: "Credential dump detected…",
      riskPercent: 95,
      lastActivity: "Apr 22, 2025",
      sources: ["splunk", "aws"],
      status: "Open",
    },
  ];

  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterEntity, setFilterEntity] = useState("");
  const [filterMinRisk, setFilterMinRisk] = useState(0);
  const [filterMaxRisk, setFilterMaxRisk] = useState(100);
  const [filterLastActivity, setFilterLastActivity] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");

  const [editing, setEditing] = useState<Incident | null>(null);
  const [deleting, setDeleting] = useState<Incident | null>(null);

  const [formErrors, setFormErrors] = useState({
    entity: false,
    title: false,
    riskPercent: false,
    lastActivity: false,
  });

  const statusDotColor: Record<Status, string> = {
    Open: "bg-green-500",
    InProgress: "bg-yellow-500",
    Dismissed: "bg-purple-500",
    Resolved: "bg-blue-500",
  };

  const clearAll = () => {
    setFilterEntity("");
    setFilterMinRisk(0);
    setFilterMaxRisk(100);
    setFilterLastActivity("");
    setFilterStatus("All");
  };

  const filteredIncidents = incidents.filter((item) => {
    if (!item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    if (!item.entity.toLowerCase().includes(filterEntity.toLowerCase()))
      return false;
    if (item.riskPercent < filterMinRisk || item.riskPercent > filterMaxRisk)
      return false;
    if (filterLastActivity && !item.lastActivity.includes(filterLastActivity))
      return false;
    if (filterStatus !== "All" && item.status !== filterStatus) return false;
    return true;
  });

  const saveEdit = () => {
    if (!editing) return;
    const errors = {
      entity: !editing.entity.trim(),
      title: !editing.title.trim(),
      riskPercent: editing.riskPercent < 0 || editing.riskPercent > 100,
      lastActivity: !editing.lastActivity.trim(),
    };
    setFormErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setIncidents((list) =>
      list.map((i) => (i.id === editing.id ? editing : i))
    );
    setEditing(null);
    setFormErrors({
      entity: false,
      title: false,
      riskPercent: false,
      lastActivity: false,
    });
  };

  const confirmDelete = () => {
    if (!deleting) return;
    setIncidents((list) => list.filter((i) => i.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="w-full overflow-x-auto bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg p-6 flex flex-col text-gray-900 dark:text-gray-100">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Security threats</h2>
        <div className="mt-2 lg:mt-0 flex items-center space-x-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title…"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-[#141315] rounded-full text-sm placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters((f) => !f)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <SlidersHorizontal className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white dark:bg-[#141315] p-4 rounded-lg mb-4 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Entity</label>
              <input
                type="text"
                value={filterEntity}
                onChange={(e) => setFilterEntity(e.target.value)}
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Filter by entity…"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Risk % between
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={filterMinRisk}
                  onChange={(e) => setFilterMinRisk(+e.target.value)}
                  className="w-1/2 px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="number"
                  value={filterMaxRisk}
                  onChange={(e) => setFilterMaxRisk(+e.target.value)}
                  className="w-1/2 px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last activity
              </label>
              <input
                type="text"
                value={filterLastActivity}
                onChange={(e) => setFilterLastActivity(e.target.value)}
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g. Apr 12, 2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as Status | "All")
                }
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="InProgress">In Progress</option>
                <option value="Dismissed">Dismissed</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={clearAll}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      <div className="overflow-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2">
          <thead className="sticky top-0 bg-gray-50 dark:bg-[#141315]">
            <tr>
              <th className="w-6 pl-0"></th>
              {[
                "Entity",
                "Title",
                "Risk level",
                "Last activity",
                "Data sources",
                "Status",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="text-xs text-gray-500 dark:text-gray-400 uppercase text-left px-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((item) => (
              <tr
                key={item.id}
                className="bg-gray-50 dark:bg-[#141315] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <td className="pl-0 pr-3 py-3">
                  <input
                    type="checkbox"
                    className="ml-4 h-4 w-4 accent-indigo-500 bg-transparent"
                  />
                </td>
                <td className="px-3 py-3 align-top">
                  <div className="flex items-start">
                    <img
                      src={item.avatar}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      alt=""
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium truncate">
                        {item.entity}
                      </p>
                      <div className="flex items-center text-xs mt-1 text-gray-500 dark:text-gray-400">
                        <span className="bg-gray-200 dark:bg-gray-600 p-1 rounded-full">
                          <img
                            src={ICON_URLS[item.sourceIcon]}
                            className="w-3 h-3"
                            alt=""
                          />
                        </span>
                        <span className="ml-1">{item.description}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm truncate block max-w-xs">
                    {item.title}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2"
                      style={{ width: `${item.riskPercent}%` }}
                    />
                    <div className="absolute inset-0 grid grid-cols-10">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="border-r border-gray-100 dark:border-gray-600 last:border-none"
                        />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.lastActivity}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex space-x-2">
                    {item.sources.map((src) => (
                      <span
                        key={src}
                        className="bg-gray-200 dark:bg-gray-600 p-1 rounded-full"
                      >
                        <img src={ICON_URLS[src]} className="w-3 h-3" alt="" />
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="bg-gray-200 dark:bg-gray-600 inline-flex items-center px-3 py-1 rounded-full text-sm">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        statusDotColor[item.status]
                      } mr-2`}
                    />
                    {item.status === "InProgress" ? "In Progress" : item.status}
                  </span>
                </td>
                <td className="pl-3 pr-0 py-3 flex space-x-2">
                  <button
                    onClick={() => setEditing(item)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                  </button>
                  <button
                    onClick={() => setDeleting(item)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white dark:bg-[#141315] rounded-lg p-6 w-80 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Edit Incident
            </h3>
            <div className="space-y-2">
              <label className="block text-sm">Entity</label>
              <input
                type="text"
                required
                value={editing.entity}
                onChange={(e) =>
                  setEditing({ ...editing, entity: e.target.value })
                }
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {formErrors.entity && (
                <p className="text-red-500 text-xs">Entity is required.</p>
              )}
              <label className="block text-sm">Title</label>
              <input
                type="text"
                required
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {formErrors.title && (
                <p className="text-red-500 text-xs">Title is required.</p>
              )}
              <label className="block text-sm">Risk %</label>
              <input
                type="number"
                required
                min={0}
                max={100}
                value={editing.riskPercent}
                onChange={(e) =>
                  setEditing({ ...editing, riskPercent: +e.target.value })
                }
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {formErrors.riskPercent && (
                <p className="text-red-500 text-xs">
                  Risk % must be between 0 and 100.
                </p>
              )}
              <label className="block text-sm">Last activity</label>
              <input
                type="text"
                required
                value={editing.lastActivity}
                onChange={(e) =>
                  setEditing({ ...editing, lastActivity: e.target.value })
                }
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {formErrors.lastActivity && (
                <p className="text-red-500 text-xs">
                  Last activity is required.
                </p>
              )}
              <label className="block text-sm">Status</label>
              <select
                value={editing.status}
                onChange={(e) =>
                  setEditing({ ...editing, status: e.target.value as Status })
                }
                className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="Open">Open</option>
                <option value="InProgress">In Progress</option>
                <option value="Dismissed">Dismissed</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditing(null)}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white dark:bg-[#141315] rounded-lg p-6 w-72 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Delete Incident
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Are you sure you want to delete <strong>{deleting.entity}</strong>
              ?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleting(null)}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const links = ["Dashboard", "Findings", "Exposures", "Threats"];
  const [navOpen, setNavOpen] = useState(false);
  const userAvatar = "https://i.pravatar.cc/150?img=1";

  return (
    <>
      <header className="relative bg-white dark:bg-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-gray-900 dark:text-white" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Fortexa
          </span>
        </div>

        <div className="hidden md:flex items-center bg-gray-200 dark:bg-[#141315] rounded-md shadow-md px-4 py-1 space-x-6">
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className={`text-sm font-medium rounded-md px-3 py-1 ${
                label === "Threats"
                  ? "bg-indigo-600 text-white dark:bg-gradient-to-r dark:from-purple-500 dark:to-indigo-500 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Search
            onClick={() => toast.info("Coming soon..")}
            className="hidden md:block w-5 h-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
          />
          <Bell
            onClick={() => toast.info("Coming soon..")}
            className="hidden md:block w-5 h-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
          />
          <Settings
            onClick={() => toast.info("Coming soon..")}
            className="hidden md:block w-5 h-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
          />

          <button
            className="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setNavOpen((o) => !o)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <img
            onClick={() => toast.info("Coming soon..")}
            src={userAvatar}
            alt="avatar"
            className="hidden md:block w-8 h-8 rounded-full cursor-pointer"
          />
        </div>

        {navOpen && (
          <div className="absolute top-full right-6 mt-2 w-40 bg-gray-200 dark:bg-[#141315] rounded-md shadow-lg py-2 flex flex-col space-y-1 z-20">
            {links.map((label) => (
              <a
                key={label}
                href="#"
                className={`block text-base font-medium px-4 py-2 rounded-md ${
                  label === "Threats"
                    ? "bg-indigo-600 text-white dark:bg-gradient-to-r dark:from-purple-500 dark:to-indigo-500 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
            <div className="mt-1 border-t border-gray-300 dark:border-gray-700" />
            <div className="flex justify-around pt-2">
              <Search
                onClick={() => toast.info("Coming soon..")}
                className="w-5 h-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
              />
              <Bell
                onClick={() => toast.info("Coming soon..")}
                className="w-5 h-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
              />
              <Settings
                onClick={() => toast.info("Coming soon..")}
                className="w-5 h-5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
              />
            </div>
          </div>
        )}
      </header>
      <Toaster richColors />
    </>
  );
};

const Dashboard = () => {
  return (
    <main className={`${inter.className}`}>
      <div className="bg-white dark:bg-black rounded-lg p-6 space-y-6">
        <Navbar />
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          <div className="w-full lg:w-1/3 bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg h-full">
            <OpenAlertsClassif />
          </div>
          <div className="w-full lg:w-1/3 bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg h-full">
            <ThreatsTacticsCard />
          </div>
          <div className="w-full lg:w-1/3 bg-gray-200 dark:bg-gradient-to-r dark:from-[#141315] dark:via-[#111012] dark:to-black rounded-lg h-full">
            <ThreatsStatusCard />
          </div>
        </div>
        <SecurityThreatsCard />
      </div>
    </main>
  );
};

export default Dashboard;
