import { Inter } from "next/font/google";
import { toast, Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import React, { useEffect, useState } from "react";
import {
  SearchIcon,
  BellIcon,
  HomeIcon,
  ClipboardListIcon,
  CalendarIcon,
  ChartBarIcon,
  Users2Icon,
  CogIcon,
  MailIcon,
  LogOutIcon,
} from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// Default projects to initialize if localStorage is empty
const initialProjects = [
  {
    id: "project-1",
    title: "Build Dashboard",
    dueDate: "2024-11-30",
    status: "pending",
  },
  {
    id: "project-2",
    title: "Optimize Page Load",
    dueDate: "2024-12-05",
    status: "running",
  },
  {
    id: "project-3",
    title: "UI Redesign",
    dueDate: "2024-12-07",
    status: "ended",
  },
  {
    id: "project-4",
    title: "Database Migration",
    dueDate: "2024-12-08",
    status: "running",
  },
  {
    id: "project-5",
    title: "Accessibility Audit",
    dueDate: "2024-12-10",
    status: "pending",
  },
  {
    id: "project-6",
    title: "SEO Optimization",
    dueDate: "2024-12-11",
    status: "ended",
  },
];

// Default members to initialize if localStorage is empty
const initialMembers = [
  {
    id: "member-1",
    name: "Alexandra Deff",
    avatar: "https://i.pravatar.cc/40?img=5",
    project: "Build Dashboard",
    status: "Completed",
  },
  {
    id: "member-2",
    name: "Edwin Adenike",
    avatar: "https://i.pravatar.cc/40?img=6",
    project: "Optimize Page Load",
    status: "In Progress",
  },
  {
    id: "member-3",
    name: "Maria Gonzalez",
    avatar: "https://i.pravatar.cc/40?img=8",
    project: "UI Redesign",
    status: "Completed",
  },
  {
    id: "member-4",
    name: "Liam Chen",
    avatar: "https://i.pravatar.cc/40?img=9",
    project: "Database Migration",
    status: "In Progress",
  },
  {
    id: "member-5",
    name: "Ava Becker",
    avatar: "https://i.pravatar.cc/40?img=10",
    project: "Accessibility Audit",
    status: "Pending",
  },
  {
    id: "member-6",
    name: "Ravi Patel",
    avatar: "https://i.pravatar.cc/40?img=11",
    project: "SEO Optimization",
    status: "Completed",
  },
];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  interface Project {
    id: string;
    title: string;
    dueDate: string;
    status: "pending" | "running" | "ended";
    icon?: React.ReactNode;
  }

  interface Member {
    id: string;
    name: string;
    avatar: string;
    project: string;
    status: "Completed" | "In Progress" | "Pending";
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  // Populate initial data for localStorage if missing or empty
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasProjects = localStorage.getItem("projects");
      if (!hasProjects || hasProjects === "[]") {
        localStorage.setItem("projects", JSON.stringify(initialProjects));
      }
      const hasMembers = localStorage.getItem("members");
      if (!hasMembers || hasMembers === "[]") {
        localStorage.setItem("members", JSON.stringify(initialMembers));
      }
    }
  }, []);

  // Sync state from localStorage after ensuring initial population
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        setProjects(parsedProjects);
      }
      const storedMembers = localStorage.getItem("members");
      if (storedMembers) {
        setMembers(JSON.parse(storedMembers));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  // Compute dynamic project status counts
  const endedProjects = projects.filter((p: Project) => p.status === "ended");
  const runningProjects = projects.filter(
    (p: Project) => p.status === "running"
  );
  const pendingProjects = projects.filter(
    (p: Project) => p.status === "pending"
  );

  const dataBar = [
    { day: "Sun", value: 1 },
    { day: "Mon", value: 4 },
    { day: "Tue", value: 2 },
    { day: "Wed", value: 5 },
    { day: "Thu", value: 3 },
    { day: "Fri", value: 6 },
    { day: "Sat", value: 2 },
  ];

  return (
    <>
      <div
        className={`flex flex-col md:flex-row ${inter.className} bg-transparent min-h-screen p-4`}
      >
        {/* Sidebar */}
        <div className="hidden md:block">
          <aside className="bg-gray-100 w-full md:w-64 h-fit p-6 flex flex-col justify-between rounded-xl sticky top-4 mb-4 md:mb-0">
            <div>
              <h1 className="text-2xl font-bold text-green-700 mb-10">
                Donezo
              </h1>

              {/* Menu Section */}
              <div className="mb-12">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                  Menu
                </p>
                <nav className="space-y-4">
                  <SidebarItem
                    icon={<HomeIcon className="h-5 w-5" />}
                    text="Dashboard"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                  <SidebarItem
                    icon={<ClipboardListIcon className="h-5 w-5" />}
                    text="Tasks"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                  <SidebarItem
                    icon={<CalendarIcon className="h-5 w-5" />}
                    text="Calendar"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                  <SidebarItem
                    icon={<ChartBarIcon className="h-5 w-5" />}
                    text="Analytics"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                  <SidebarItem
                    icon={<Users2Icon className="h-5 w-5" />}
                    text="Team"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                </nav>
              </div>

              {/* General Section */}
              <div className="mb-12">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                  General
                </p>
                <nav className="space-y-4">
                  <SidebarItem
                    icon={<CogIcon className="h-5 w-5" />}
                    text="Settings"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                  <SidebarItem
                    icon={<MailIcon className="h-5 w-5" />}
                    text="Help"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                  <SidebarItem
                    icon={<LogOutIcon className="h-5 w-5" />}
                    text="Logout"
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                </nav>
              </div>
            </div>
          </aside>
        </div>

        {/* Main */}
        <main className="flex-1 w-full bg-transparent p-4 md:p-8">
          {/* Header */}
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <header>
              <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Mobile menu and right content on small screens */}
                <div className="w-full flex items-center justify-between md:hidden">
                  <button
                    className=""
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center space-x-4">
                    <BellIcon
                      className="w-6 h-6 text-gray-500 cursor-pointer"
                      onClick={() => toast.info("Coming soon...")}
                    />
                    <div className="flex items-center space-x-2 shrink-0">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt="User avatar"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                  </div>
                </div>
                {/* Search input */}
                <div className="flex-1">
                  <div className="relative w-full">
                    <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search task"
                      className="pl-10 pr-4 py-2 border rounded-full w-full"
                    />
                  </div>
                </div>
                {/* Notification and Profile for md+ screens */}
                <div className="hidden md:flex items-center space-x-4">
                  <BellIcon
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={() => toast.info("Coming soon...")}
                  />
                  <div className="flex items-center space-x-2 shrink-0">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="User avatar"
                      className="rounded-full w-10 h-10"
                    />
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-black">
                        Totok Michael
                      </p>
                      <p className="text-xs text-gray-500">
                        tmichael20@mail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>

          {showMobileMenu && (
            <div className="md:hidden mt-4 space-y-4 mb-6">
              <SidebarItem
                icon={<HomeIcon className="h-5 w-5" />}
                text="Dashboard"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<ClipboardListIcon className="h-5 w-5" />}
                text="Tasks"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<CalendarIcon className="h-5 w-5" />}
                text="Calendar"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<ChartBarIcon className="h-5 w-5" />}
                text="Analytics"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<Users2Icon className="h-5 w-5" />}
                text="Team"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<CogIcon className="h-5 w-5" />}
                text="Settings"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<MailIcon className="h-5 w-5" />}
                text="Help"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <SidebarItem
                icon={<LogOutIcon className="h-5 w-5" />}
                text="Logout"
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </div>
          )}

          <div className="bg-gray-100 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-black mb-1">
                  Dashboard
                </h2>
                <p className="text-gray-500">
                  Plan, prioritize, and accomplish your tasks with ease.
                </p>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => toast.info("Coming soon...")}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-2 rounded-full shadow hover:from-green-800 hover:to-green-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total Projects */}
              <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">Total Projects</p>
                    <p className="text-2xl font-bold mt-2">{projects.length}</p>
                    <div className="flex items-center text-xs mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-200 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span>Increased from last month</span>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </div>

              {/* Ended Projects */}
              <div className="bg-white rounded-xl p-4 text-black relative overflow-hidden shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">Ended Projects</p>
                    <p className="text-2xl font-bold mt-2">
                      {endedProjects.length}
                    </p>
                    <div className="flex items-center text-xs mt-2 text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span>Increased from last month</span>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </div>

              {/* Running Projects */}
              <div className="bg-white rounded-xl p-4 text-black relative overflow-hidden shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">Running Projects</p>
                    <p className="text-2xl font-bold mt-2">
                      {runningProjects.length}
                    </p>
                    <div className="flex items-center text-xs mt-2 text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span>Increased from last month</span>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </div>

              {/* Pending Project */}
              <div className="bg-white rounded-xl p-4 text-black relative overflow-hidden shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">Pending Project</p>
                    <p className="text-2xl font-bold mt-2">
                      {pendingProjects.length}
                    </p>
                    <div className="flex items-center text-xs mt-2 text-green-600">
                      <span>On Discuss</span>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project Analytics and Progress */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-black">
                  Project Analytics
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataBar}>
                    <XAxis dataKey="day" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length > 0) {
                          return (
                            <div className="bg-white p-2 rounded shadow text-sm text-black">
                              <p className="font-medium">
                                Day: {payload[0].payload.day}
                              </p>
                              <p>Projects: {payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" fill="#16a34a" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-4 shadow mb-8">
                <h3 className="text-lg font-semibold mb-4 text-black">
                  Reminders
                </h3>

                <div>
                  <p className="text-green-800 font-semibold text-base">
                    Meeting with Arc Company
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Time : 02.00 pm - 04.00 pm
                  </p>

                  <button className="flex items-center justify-center bg-gradient-to-r from-green-700 to-green-600 text-white w-full py-2 rounded-full space-x-2 hover:from-green-800 hover:to-green-700 transition">
                    {/* Video icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0 0V10m0 4H6a2 2 0 01-2-2V10a2 2 0 012-2h9m0 4z"
                      />
                    </svg>
                    <span className="font-medium">Start Meeting</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Team Collaboration */}
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-black">
                    Team Collaboration
                  </h3>
                  <button className="border border-green-700 text-green-700 rounded-full px-3 py-1 text-sm hover:bg-green-700 hover:text-white transition">
                    + Add Member
                  </button>
                </div>

                <div className="space-y-4">
                  {members.length > 0 ? (
                    members.map((member, i) => (
                      <div
                        key={i}
                        className="flex flex-col xs:flex-row xs:items-center justify-between gap-2"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-black font-medium">
                              {member.name}
                            </p>
                            <p className="text-gray-500 text-sm break-words max-w-xs xs:max-w-[180px]">
                              Working on{" "}
                              <span className="text-black">
                                {member.project}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="xs:mt-0 mt-1">
                          {member.status === "Completed" && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                              Completed
                            </span>
                          )}
                          {member.status === "In Progress" && (
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                              In Progress
                            </span>
                          )}
                          {member.status === "Pending" && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No members yet.</p>
                  )}
                </div>
              </div>

              {/* Project Progress */}
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-black">
                  Project Progress
                </h3>
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        className="text-green-300"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-600"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${
                          projects.length > 0
                            ? Math.round(
                                (endedProjects.length / projects.length) * 100
                              )
                            : 0
                        }, 100`}
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-black mt-2">
                    {projects.length > 0
                      ? Math.round(
                          (endedProjects.length / projects.length) * 100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-500">Project Ended</p>
                  <div className="flex flex-col sm:flex-row sm:justify-around items-start sm:items-center w-full mt-4 text-sm gap-2 sm:gap-0">
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-green-600"></span>
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                      <span>In Progress</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                      <span>Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Project Section */}
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-black">Project</h3>
                  <button
                    onClick={() => toast.info("Coming soon...")}
                    className="border border-green-700 text-green-700 rounded-full px-3 py-1 text-sm hover:bg-green-700 hover:text-white transition"
                  >
                    + New
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.length > 0 ? (
                    projects.map((project, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="text-xl">{project.icon}</div>
                        <div>
                          <p className="text-black font-medium">
                            {project.title}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Due date: {project.dueDate}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No projects yet. Create one to get started.
                    </p>
                  )}
                </div>
              </div>

              {/* Time Tracker */}
              <div className="bg-green-900 rounded-xl p-6 text-center text-white relative overflow-hidden flex flex-col justify-center">
                {/* Background pattern or gradient effect if desired */}
                <h3 className="text-lg font-semibold mb-4">Time Tracker</h3>
                <p className="text-3xl font-bold mb-4">01:24:08</p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3">
                    {/* Pause Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6"
                      />
                    </svg>
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 rounded-full p-3">
                    {/* Stop Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster richColors />
    </>
  );
}

function SidebarItem({
  icon,
  text,
  activeMenu,
  setActiveMenu,
}: {
  icon: React.ReactNode;
  text: string;
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const isActive = activeMenu === text;

  return (
    <a
      href="#"
      onClick={() => setActiveMenu(text)}
      className={`flex items-center space-x-3 text-gray-700 hover:text-green-700 relative pl-2 ${
        isActive ? "font-semibold text-green-700" : ""
      }`}
    >
      {isActive && (
        <span className="absolute left-0 h-2 w-2 bg-green-600 rounded-full"></span>
      )}
      {icon}
      <span>{text}</span>
    </a>
  );
}
