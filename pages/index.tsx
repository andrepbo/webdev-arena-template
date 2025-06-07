import {
  Bookmark,
  BookOpenText,
  Clock,
  Eye,
  Menu,
  Bell,
  Search,
  User,
  ChevronRight,
  ChevronDown,
  Crown,
  Trash2,
  MessageSquare,
  Share2,
  Heart,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Hot News");
  const [showSubscription, setShowSubscription] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [swipedItemId, setSwipedItemId] = useState<number | null>(null);
  const [trendingItems, setTrendingItems] = useState([
    {
      id: 1,
      title: "The future of work: How AI is reshaping everything",
      tag: "Trending",
      time: "3 hours ago",
      views: "1.2k",
    },
    {
      id: 2,
      title: "Global warming effect on coastal cities",
      tag: "Trending",
      time: "5 hours ago",
      views: "980",
    },
    {
      id: 3,
      title: "Top 10 design systems in 2025",
      tag: "Trending",
      time: "Yesterday",
      views: "840",
    },
  ]);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications] = useState([
    {
      id: 1,
      actor: "Anna",
      action: "commented on your post",
      content: "UIUX Mobile",
      type: "comment",
      avatar: "/avatars/1.jpg"
    },
    {
      id: 2,
      actor: "David",
      action: "liked your update",
      content: "Design Patterns",
      type: "like",
      avatar: "/avatars/2.jpg"
    },
    {
      id: 3,
      actor: "Emily",
      action: "wants to follow you",
      content: "",
      type: "follow",
      avatar: "/avatars/3.jpg"
    }
  ]);

  // Start tracking horizontal touch position
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setSwipedItemId(null);
  };

  // Detect swipe to left and mark item for deletion
  const handleTouchMove = (e: React.TouchEvent, id: number) => {
    const diff = touchStartX - e.touches[0].clientX;
    if (diff > 60) {
      setSwipedItemId(id);
    }
  };

  // Remove the swiped item from the trending list
  const handleDelete = (id: number) => {
    setTrendingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAcceptFollow = (type: string) => {
    alert(`Coming soon (${type})`);
  };
  
  const handleRejectFollow = (type: string) => {
    alert(`Coming soon (${type})`);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white relative">
      {/* Top Bar - Mobile */}
      <div className="flex justify-between items-center mb-4 p-4 md:hidden">
        <p className="text-base font-semibold text-gray-500 dark:text-white">Daily Newsletters</p>
        <button onClick={() => setShowSubscription(true)} aria-label="Open subscription">
          <Menu className="text-gray-500" size={20} />
        </button>
      </div>

      <div className="hidden md:block w-full" style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

      {/* Top Bar - Desktop */}
      <div className="hidden md:block bg-white dark:bg-black">
        <div className="flex items-center py-4 max-w-6xl mx-auto px-4 gap-x-16">
          <p className="text-base font-semibold text-gray-500 dark:text-white whitespace-nowrap">
            Daily Newsletters
          </p>

          <div className="flex gap-2 flex-wrap">
            {["Hot News", "Popular"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 rounded-md text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white text-gray-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-6 text-gray-500 dark:text-gray-300">
            <Search size={20} />
            <Bell size={20} className="cursor-pointer" onClick={() => setShowNotifications(true)} />
            <User size={20} />
          </div>
        </div>

        <div className="w-full h-px bg-gray-200" />
      </div>

      {/* Tabs - Mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto px-4 md:hidden">
        {["Hot News", "Popular"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-md text-sm font-medium transition ${
              activeTab === tab
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white text-gray-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Main Article */}
        <div className="md:col-span-2 mb-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-gray-700">
          <div className="relative w-full h-72">
            <Image
              src="/main-article.jpg"
              alt="Main article"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-4 right-4 bg-white p-1 rounded-full shadow">
              <Bookmark size={18} className="text-gray-600" />
            </div>
          </div>

          <div className="p-6 space-y-3 text-gray-600 dark:text-gray-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
              Why you should optimize the workplace well-being of your employees.
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Getting employee’s performing at their best can be one of the biggest challenges when managing in an organization{" "}
              <span className="font-semibold text-gray-800 dark:text-blue-400 cursor-pointer">See more...</span>
            </p>

            <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-400 pt-2">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>4 hours ago</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpenText size={14} />
                <span>7 min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-500 dark:text-white">Related articles</h3>

          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex gap-3 bg-white p-3 rounded-xl shadow-md dark:bg-neutral-900 dark:border-gray-700">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={`/thumb${item}.jpg`}
                    alt="Related article"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md w-max mb-1">For you</span>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-100 leading-snug line-clamp-2">
                    UX review presentations. How to handle the UX review process.
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Yesterday</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>458</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Author Details View (Mobile + Desktop) */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black overflow-y-auto text-black dark:text-white">
          <div className="px-4 py-4 md:max-w-4xl md:mx-auto md:pt-8 md:px-0">
            {/* Header */}
            <div className="flex justify-between items-center md:border-b md:pb-4 md:mb-6">
              <button
                onClick={() => setSelectedAuthor(null)}
                aria-label="Back"
                className="text-gray-600"
              >
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <Menu size={20} className="text-gray-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-4">
              How to successfully integrate a new member into your team
            </h2>

            {/* Cover Image */}
            <div className="relative w-full h-52 md:h-80 mb-4 rounded-xl overflow-hidden bg-gray-200 dark:bg-neutral-800">
              <Image
                src="/thumb1.jpg"
                alt="Article Cover"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-neutral-900 p-1 rounded-full shadow">
                <Bookmark size={18} className="text-gray-600 dark:text-white" />
              </div>
            </div>

            {/* Author and interactions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/avatars/1.jpg"
                  alt={selectedAuthor}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {selectedAuthor}
                </span>
              </div>
              <div className="flex gap-2 text-xs text-white">
                <div className="flex items-center gap-1 px-2 py-1 bg-black dark:bg-white dark:text-black text-white rounded">
                  <Bookmark size={14} /> <span>95</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-black dark:bg-white dark:text-black text-white rounded">
                  <MessageSquare size={14} /> <span>54</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-black dark:bg-white dark:text-black text-white rounded">
                  <Share2 size={14} /> <span>34</span>
                </div>
              </div>
            </div>

            {/* Article text */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-1">
              So you’ve done the painstaking task of recruiting a new member to your team, now the key next step is to successfully integrate them.
              Having a proper process in place will be mutually beneficial, employee’s performing at their best can be one of the biggest challenges
              when managing in an organization. your new team member joining seamlessly... <span className="font-medium text-gray-500">More</span>
            </p>

            {/* Timestamp */}
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-6">
              <Clock size={14} /> <span>12 hours ago</span>
            </div>

            <div className="border-t border-gray-200 mt-4 mb-4" />

            {/* Related Articles */}
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Related articles
            </h3>
            <div className="flex gap-3 bg-white dark:bg-neutral-900 p-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-24 h-24 bg-gray-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
                <Image
                  src="/thumb2.jpg"
                  alt="Related article"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <span className="text-xs bg-black text-white px-2 py-1 rounded-md w-max mb-1">For You</span>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-100 leading-snug line-clamp-2">
                  3 great gifts that will motivate your team
                </h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>8 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Overlay */}
      {showSubscription && (
        <>
          {/* Dimmed background */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowSubscription(false)}
          />

          {/* Subscription Panel */}
          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-black z-50 p-4 space-y-6 shadow-lg overflow-y-auto">
            {/* Topbar */}
            <div className="text-center mt-4 space-y-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Join our newsletters</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">+10K Users, a Hot-Subscription feature for users.</p>

              {/* Floating avatars */}
              <div className="relative h-32 w-full flex items-center justify-center mt-4 mb-2">
                <div className="relative w-24 h-24">
                  {[1, 2, 3, 4, 5, 6].map((i, idx) => {
                    const angle = (idx / 6) * 2 * Math.PI;
                    const radius = 40;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                      <div
                        key={i}
                        className="absolute w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"
                        style={{
                          top: `calc(50% + ${y}px)`,
                          left: `calc(50% + ${x}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Image
                          src={`/avatars/${i}.jpg`}
                          alt={`Top contributor ${i}`}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Featured newsletter below avatars */}
              <div className="text-center mt-4 space-y-1">
                <h4 className="text-base font-semibold text-gray-800 dark:text-blue-400 cursor-pointer hover:underline"
                  onClick={() => {
                    setShowSubscription(false);
                    setSelectedAuthor("Elizabeth Mckiney");
                  }}
                >
                  Why you should optimize the workplace well-being of your employees
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Jun 28, 2021</p>
              </div>

              {/* Email subscription form */}
              <div className="mt-6 space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                <button
                  onClick={() => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                      setEmailError("Please enter a valid email.");
                    } else {
                      setEmailError(null);
                      alert("Subscribed");
                      setEmail(""); // Optionally reset
                    }
                  }}
                  className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Subscription section below */}
            <div className="flex justify-between items-center border-b pb-2">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription</h1>
              <button onClick={() => setShowSubscription(false)} aria-label="Close subscription">
                <ChevronRight className="text-gray-600" size={20} />
              </button>
            </div>

            {/* Author list */}
            <div className="space-y-4">
              {[
                "Elizabeth Mckiney",
                "Dianne Russell",
                "Kristin Watson",
                "Courtney Henry",
                "Bessie Cooper",
                "Floyd Miles",
              ].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    setShowSubscription(false);
                    setSelectedAuthor(name);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/avatars/${i + 1}.jpg`}
                      alt={name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-800 dark:text-gray-200">{name}</span>
                  </div>
                  <Crown size={16} className="text-black dark:text-white fill-black dark:fill-white" />
                </div>
              ))}
            </div>

            {/* View More */}
            <div className="flex items-center justify-start gap-2 cursor-pointer text-sm font-medium text-gray-800">
              <span className="underline dark:text-gray-400">View 8 More</span>
              <ChevronDown size={16} className="text-gray-600" />
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-200 my-8" />

            {/* Trending Section */}
            <div className="max-w-6xl mx-auto px-4 mb-12">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Trending</h3>

              <div className="space-y-4">
                {trendingItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-xl bg-white dark:bg-neutral-900 dark:border-gray-700"
                    onTouchStart={(e) => handleTouchStart(e)}
                    onTouchMove={(e) => handleTouchMove(e, item.id)}
                  >
                    {/* Red background with trash icon */}
                    <div className="absolute inset-0 bg-red-500 flex justify-end items-center pr-6 z-0">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2"
                        aria-label="Delete item"
                      >
                        <Trash2 size={20} className="text-white" />
                      </button>
                    </div>

                    {/* Slideable card */}
                    <div
                      className={`relative z-10 transition-transform duration-200 ${
                        swipedItemId === item.id ? "-translate-x-20" : "translate-x-0"
                      }`}
                    >
                      <div className="flex gap-3 bg-white p-3 rounded-xl shadow-md border border-gray-200 dark:bg-neutral-900 dark:border-gray-700">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={`/thumb${item.id}.jpg`}
                            alt={item.title}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md w-max mb-1">
                            {item.tag}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-700 leading-snug line-clamp-2 dark:text-white">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{item.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{item.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Notifications View */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black overflow-y-auto">
          <div className="px-4 py-4 md:max-w-3xl md:mx-auto md:pt-8 md:px-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setShowNotifications(false)} aria-label="Back">
                <ChevronRight className="text-gray-600 rotate-180" size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Notification</h2>
              <div className="w-5" />
            </div>

            {/* List */}
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-gray-500 dark:text-white">No items available.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-center justify-between border p-3 rounded-xl shadow-sm bg-white dark:bg-neutral-900 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <Image
                        src={n.avatar}
                        alt={n.actor}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        <span className="font-semibold">{n.actor}</span> {n.action}
                        {n.content && (
                          <span className="text-blue-600 cursor-pointer hover:underline ml-1">{n.content}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      {n.type === "comment" && <MessageSquare size={18} className="text-gray-500" />}
                      {n.type === "like" && <Heart size={18} className="text-red-500" />}
                      {n.type === "follow" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptFollow(n.type)}
                            className="px-2 py-1 text-xs rounded bg-black text-white"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectFollow(n.type)}
                            className="px-2 py-1 text-xs rounded border text-gray-700 dark:text-white"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}