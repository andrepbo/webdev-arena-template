import { Inter } from "next/font/google";
import { toast, Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import React from "react";
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

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = React.useState("Dashboard");
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const dataBar = [
    { day: "S", value: 20 },
    { day: "M", value: 74 },
    { day: "T", value: 65 },
    { day: "W", value: 90 },
    { day: "T", value: 30 },
    { day: "F", value: 45 },
    { day: "S", value: 50 },
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Dashboard</h2>
                <p className="text-gray-500">
                  Plan, prioritize, and accomplish your tasks with ease.
                </p>
              </div>

              <div className="flex space-x-4 mt-4 md:mt-0">
                {/* Add Project button */}
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {/* Total Projects */}
              <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">Total Projects</p>
                    <p className="text-2xl font-bold mt-2">24</p>
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
                    <p className="text-2xl font-bold mt-2">10</p>
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
                    <p className="text-2xl font-bold mt-2">12</p>
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
                    <p className="text-2xl font-bold mt-2">2</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-black">
                  Project Analytics
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataBar}>
                    <XAxis dataKey="day" />
                    <Tooltip />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                  {[
                    {
                      name: "Alexandra Deff",
                      task: "Github Project Repository",
                      status: "Completed",
                      avatar: "https://i.pravatar.cc/40?img=1",
                    },
                    {
                      name: "Edwin Adenike",
                      task: "Integrate User Authentication System",
                      status: "In Progress",
                      avatar: "https://i.pravatar.cc/40?img=2",
                    },
                    {
                      name: "Isaac Oluwatemilorun",
                      task: "Develop Search and Filter Functionality",
                      status: "Pending",
                      avatar: "https://i.pravatar.cc/40?img=3",
                    },
                    {
                      name: "David Oshodi",
                      task: "Responsive Layout for Homepage",
                      status: "In Progress",
                      avatar: "https://i.pravatar.cc/40?img=4",
                    },
                  ].map((member, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
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
                          <p className="text-gray-500 text-sm">
                            Working on{" "}
                            <span className="text-black">{member.task}</span>
                          </p>
                        </div>
                      </div>
                      <div>
                        {member.status === "Completed" && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            Completed
                          </span>
                        )}
                        {member.status === "In Progress" && (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            In Progress
                          </span>
                        )}
                        {member.status === "Pending" && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
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
                        strokeDasharray="41, 100"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-black mt-2">41%</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                  {[
                    {
                      name: "Develop API Endpoints",
                      date: "Nov 26, 2024",
                      icon: "🖋️",
                    },
                    {
                      name: "Onboarding Flow",
                      date: "Nov 28, 2024",
                      icon: "🧭",
                    },
                    {
                      name: "Build Dashboard",
                      date: "Nov 30, 2024",
                      icon: "🗂️",
                    },
                    {
                      name: "Optimize Page Load",
                      date: "Dec 5, 2024",
                      icon: "⚡",
                    },
                    {
                      name: "Cross-Browser Testing",
                      date: "Dec 6, 2024",
                      icon: "🧪",
                    },
                  ].map((project, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="text-xl">{project.icon}</div>
                      <div>
                        <p className="text-black font-medium">{project.name}</p>
                        <p className="text-gray-500 text-sm">
                          Due date: {project.date}
                        </p>
                      </div>
                    </div>
                  ))}
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
