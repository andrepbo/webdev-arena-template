import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  MessageSquareDot,
  ChevronUp,
  Search,
  X,
  FileText,
  ShieldCheck,
  Bookmark,
  Ban,
  LayoutGrid,
  LayoutList,
  MapPin,
  Globe,
  BadgeDollarSign,
  Clock,
  MoreHorizontal,
  Bookmark as BookmarkIcon,
  LucideIcon,
  CalendarDays,
  MessageSquareText,
  Sparkles,
  User,
  BarChart2,
} from "lucide-react";

type TabKey = "Browse all" | "Ideal Matches" | "Saved" | "Hidden";
type JobPosition = {
  title: string;
  location: string;
  remote: boolean;
  salary: string;
};
type Company = {
  company: string;
  logo: string;
  hiring: boolean;
  description: string;
  category: string;
  positions: JobPosition[];
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Filter");
  const [toolsExpanded, setToolsExpanded] = useState(true);
  const [skillsExpanded, setSkillsExpanded] = useState(true);
  const [toolSearch, setToolSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [skills, setSkills] = useState([
    "User Interface",
    "Prototyping",
    "Accessibility",
    "UX Research",
  ]);
  const [selectedTab, setSelectedTab] = useState<TabKey>("Ideal Matches");
  const [viewMode, setViewMode] = useState("list");

  const allTools = [
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg",
    },
    {
      name: "Chat GPT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
    {
      name: "Midjourney",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Midjourney_logo.png",
    },
    {
      name: "Webflow",
      logo: "https://cdn.worldvectorlogo.com/logos/webflow-2.svg",
    },
    {
      name: "Framer",
      logo: "https://cdn.worldvectorlogo.com/logos/framer-icon.svg",
    },
  ];

  const filteredTools = allTools.filter((tool) =>
    tool.name.toLowerCase().includes(toolSearch.toLowerCase())
  );
  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const jobData: Record<TabKey, Company[]> = {
    "Browse all": [],
    "Ideal Matches": [
      {
        company: "Catalog",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Catalog_icon.svg/512px-Catalog_icon.svg.png",
        hiring: true,
        description: "Unlimited design services for early stage startups",
        category: "DESIGN AGENCY · 1-10 EMPLOYEES",
        positions: [
          {
            title: "Brand Designer",
            location: "Toronto",
            remote: true,
            salary: "50k - 80k",
          },
          {
            title: "Design Director",
            location: "New York",
            remote: true,
            salary: "150k - 180k",
          },
        ],
      },
      {
        company: "Height",
        logo: "https://assets-global.website-files.com/63e4aa4853d0a41b2d237001/63ea393d469caf4c2d6b3f15_height-icon.png",
        hiring: true,
        description: "All-in-one project management tool",
        category: "PRODUCT COMPANY · 51-200 EMPLOYEES",
        positions: [
          {
            title: "Pre PMF-Product Designer",
            location: "Los Angeles",
            remote: true,
            salary: "180k - 250k",
          },
        ],
      },
    ],
    Saved: [
      {
        company: "Saved Company",
        logo: "https://via.placeholder.com/56",
        hiring: false,
        description: "Example of saved job listing",
        category: "SAVED COMPANY · 5-20 EMPLOYEES",
        positions: [
          {
            title: "UI Engineer",
            location: "Remote",
            remote: true,
            salary: "90k - 120k",
          },
        ],
      },
    ],
    Hidden: [
      {
        company: "Hidden Co",
        logo: "https://via.placeholder.com/56",
        hiring: false,
        description: "Example of hidden job listing",
        category: "HIDDEN · 1-5 EMPLOYEES",
        positions: [
          {
            title: "Junior Designer",
            location: "Miami",
            remote: false,
            salary: "40k - 60k",
          },
        ],
      },
    ],
  };

  const countJobs = (companies: Company[]) =>
    companies.reduce((acc, company) => acc + company.positions.length, 0);

  const browseAll: Company[] = [
    ...jobData["Ideal Matches"],
    ...jobData["Saved"],
    ...jobData["Hidden"],
  ];

  const displayedJobs =
    selectedTab === "Browse all" ? browseAll : jobData[selectedTab];

  const tabs: { label: TabKey; icon: LucideIcon; count: string }[] = [
    {
      label: "Browse all",
      icon: FileText,
      count: `${countJobs(browseAll)} JOBS`,
    },
    {
      label: "Ideal Matches",
      icon: ShieldCheck,
      count: `${countJobs(jobData["Ideal Matches"])} JOBS`,
    },
    {
      label: "Saved",
      icon: Bookmark,
      count: `${countJobs(jobData["Saved"])} JOBS`,
    },
    {
      label: "Hidden",
      icon: Ban,
      count: `${countJobs(jobData["Hidden"])} JOBS`,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col border-r border-border bg-card p-4">
        <div className="text-2xl font-bold mb-10">S.Jobs</div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition">
            <BarChart2 className="h-5 w-5" />
            <span>Home</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-xl border border-border bg-white shadow-md">
            <Search className="h-5 w-5" />
            <span>Jobs</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition">
            <CalendarDays className="h-5 w-5" />
            <span>History</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition">
            <MessageSquareText className="h-5 w-5" />
            <span>Messages</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition">
            <Sparkles className="h-5 w-5" />
            <span>Discover</span>
          </button>
        </nav>

        <div className="mt-auto p-4 text-sm text-muted-foreground">
          Elevated Figma Prototyping
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-1 md:p-2 space-y-2">
        {/* Header */}
        <header className="bg-card border border-border rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Left Block */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="text-2xl font-bold leading-tight">
                Friday, 23 August
              </div>

              <div className="flex items-center bg-emerald-50 text-emerald-800 text-sm font-semibold px-6 py-3 rounded-full border border-emerald-300 w-fit">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                READY TO INTERVIEW
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Right Block */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageSquareDot className="h-5 w-5" />
                <span className="font-medium text-sm">Notifications</span>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/4.jpg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <section className="bg-card border border-border rounded-xl p-4">
          <h2 className="text-2xl font-bold">Search for jobs</h2>
        </section>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
          {/* Left Filters */}
          <div className="flex flex-col gap-2">
            {/* Filter Tabs */}
            <div className="bg-card rounded-xl border border-border h-full">
              <div className="flex rounded-t-xl overflow-hidden">
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === "Filter"
                      ? "bg-white text-black dark:text-black"
                      : "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("Filter")}
                >
                  Filter
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === "Sort"
                      ? "bg-white text-black dark:text-black"
                      : "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("Sort")}
                >
                  Sort
                </button>
              </div>
              <div className="p-4 min-h-[200px]">
                {activeTab === "Filter" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold flex items-center gap-1">
                        Sorting Tags
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Remote only</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-border"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Actively hiring</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-border"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Sort" && (
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Sort content placeholder
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tools Section */}
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold flex items-center gap-1">
                  Tools
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                </div>
                <button onClick={() => setToolsExpanded(!toolsExpanded)}>
                  {toolsExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {toolsExpanded && (
                <div className="space-y-4">
                  <div className="flex items-center bg-muted rounded-md px-2 py-1">
                    <Search className="h-4 w-4 text-muted-foreground mr-2" />
                    <input
                      type="text"
                      placeholder="Find a tool"
                      value={toolSearch}
                      onChange={(e) => setToolSearch(e.target.value)}
                      className="bg-transparent outline-none text-sm w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredTools.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-white border border-border overflow-hidden">
                            <img
                              src={tool.logo}
                              alt={tool.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span>{tool.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-border"
                        />
                      </div>
                    ))}
                    {filteredTools.length === 0 && (
                      <div className="text-sm text-muted-foreground">
                        No tools found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Key Skills Section */}
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold flex items-center gap-1">
                  Key Skills
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                </div>
                <button onClick={() => setSkillsExpanded(!skillsExpanded)}>
                  {skillsExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {skillsExpanded && (
                <div className="space-y-4">
                  <div className="flex items-center bg-muted rounded-md px-2 py-1">
                    <Search className="h-4 w-4 text-muted-foreground mr-2" />
                    <input
                      type="text"
                      placeholder="Choose your key hard skills"
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="bg-transparent outline-none text-sm w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill}
                        className="flex justify-between items-center"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="w-5 h-5 rounded bg-muted flex items-center justify-center"
                        >
                          <X className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                    {filteredSkills.length === 0 && (
                      <div className="text-sm text-muted-foreground">
                        No skills found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Matches Placeholder */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <div className="bg-card rounded-xl border border-border p-4 h-full">
              <div className="grid grid-cols-4 gap-2 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setSelectedTab(tab.label)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium w-full ${
                      selectedTab === tab.label
                        ? "bg-violet-200 text-black"
                        : "border-border bg-white dark:bg-background"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <div className="flex flex-col text-left">
                      <span>{tab.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {tab.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold">{selectedTab}</h3>
                <div className="flex items-center gap-2 hidden md:flex">
                  <LayoutList
                    className={`h-5 w-5 cursor-pointer ${
                      viewMode === "list"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setViewMode("list")}
                  />
                  <LayoutGrid
                    className={`h-5 w-5 cursor-pointer ${
                      viewMode === "grid"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setViewMode("grid")}
                  />
                </div>
              </div>

              {/* Company Card */}
              {displayedJobs.length > 0 ? (
                viewMode === "list" ? (
                  displayedJobs.map((company, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                            <img
                              src={company.logo}
                              alt={company.company}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-semibold">
                                {company.company}
                              </h4>
                              {company.hiring && (
                                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  ACTIVELY HIRING
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {company.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[15px] text-muted-foreground">
                          <span>{company.category}</span>
                          <button className="p-1 rounded-md bg-muted hover:bg-muted/70">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {company.positions.map((job, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center border border-border rounded-xl p-4"
                          >
                            <div>
                              <h5 className="font-semibold mb-2">
                                {job.title}
                              </h5>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" /> {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Globe className="h-4 w-4" /> Remote only
                                </div>
                                <div className="flex items-center gap-1">
                                  <BadgeDollarSign className="h-4 w-4" />{" "}
                                  {job.salary}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full">
                                <Clock className="inline mr-1 h-3 w-3" /> POSTED
                                1 HOUR AGO
                              </span>
                              <button className="border rounded-full p-2 hover:bg-muted">
                                <BookmarkIcon className="h-4 w-4" />
                              </button>
                              <button className="border rounded-full px-4 py-2 font-medium hover:bg-muted">
                                Apply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {displayedJobs.flatMap((company) =>
                      company.positions.map((job, idx) => (
                        <div
                          key={idx}
                          className="border border-border rounded-xl p-4 flex flex-col justify-between"
                        >
                          <h5 className="font-semibold mb-2">{job.title}</h5>
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4" /> Remote only
                            </div>
                            <div className="flex items-center gap-1">
                              <BadgeDollarSign className="h-4 w-4" />{" "}
                              {job.salary}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full">
                              <Clock className="inline mr-1 h-3 w-3" /> 1H AGO
                            </span>
                            <button className="border rounded-full p-2 hover:bg-muted">
                              <BookmarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )
              ) : (
                <div className="text-center text-muted-foreground py-10">
                  No jobs available.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
