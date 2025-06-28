import React, { useState, useEffect } from "react";
import {
  ArrowUp,
  ArrowDown,
  Clock,
  Flame,
  GroupIcon,
  Home,
  LayoutDashboard,
  MoreHorizontal,
  TrendingUp,
  Image,
  Link,
  Menu,
  X,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";

// Types
interface User {
  name: string;
  avatarInitial: string;
  imageUrl?: string;
  karma: number;
}

interface HotItem {
  id: number;
  name: string;
  imageUrl: string;
}

interface Community {
  id: number;
  name: string;
  imageUrl: string;
  joined?: boolean;
}

interface Post {
  id: number;
  username: string;
  userAvatarInitial: string;
  userAvatarColor: string;
  userAvatarUrl?: string;
  timestamp: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  upvotes: number;
  comments: number;
  voteStatus: "up" | "down" | "none";
  liked: boolean;
}

interface LiveEvent {
  id: number;
  title: string;
  imageUrl: string;
  watching: number;
}

// Mock Data
const currentUser: User = {
  name: "Dmitry Galkin",
  avatarInitial: "D",
  karma: 974,
  imageUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const hotRightNowItems: HotItem[] = [
  {
    id: 1,
    name: "formula1",
    imageUrl:
      "https://images.unsplash.com/photo-1514770198934-d632356140ce?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "programming",
    imageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbWluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "technology",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const communities: Community[] = [
  {
    id: 1,
    name: "reactjs",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3Rqc3xlbnwwfHwwfHx8MA%3D%3D",
    joined: false,
  },
  {
    id: 2,
    name: "typescript",
    imageUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anN8ZW58MHx8MHx8fDA%3D",
    joined: false,
  },
  {
    id: 3,
    name: "Movies",
    imageUrl:
      "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWVzfGVufDB8fDB8fHww",
    joined: false,
  },
  {
    id: 4,
    name: "Music",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1677545820818-f1639f3e5b65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    joined: false,
  },
  {
    id: 5,
    name: "Memes",
    imageUrl:
      "https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVtZXN8ZW58MHx8MHx8fDA%3D",
    joined: false,
  },
  {
    id: 6,
    name: "Politics",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9saXRpY3N8ZW58MHx8MHx8fDA%3D",
    joined: false,
  },
];

const App = () => {
  // State to manage joined communities (by id)
  const [joinedCommunities, setJoinedCommunities] = useState<{
    [id: number]: boolean;
  }>(() => {
    const initialState: { [id: number]: boolean } = {};
    communities.forEach((c) => {
      initialState[c.id] = !!c.joined;
    });
    return initialState;
  });

  const handleToggleJoin = (communityId: number) => {
    setJoinedCommunities((prev) => ({
      ...prev,
      [communityId]: !prev[communityId],
    }));
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Profile modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "movie_lover",
      userAvatarInitial: "M",
      userAvatarColor: "bg-red-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "2 hours ago",
      title: "Just watched the new Dune movie, it was epic!",
      imageUrl:
        "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=1170",
      upvotes: 123,
      comments: 42,
      voteStatus: "none",
      liked: false,
    },
    {
      id: 2,
      username: "music_fanatic",
      userAvatarInitial: "M",
      userAvatarColor: "bg-indigo-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "5 hours ago",
      title: "What's the best album of 2024 so far?",
      imageUrl:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1170",
      upvotes: 456,
      comments: 128,
      voteStatus: "none",
      liked: true,
    },
    {
      id: 3,
      username: "gamer_girl",
      userAvatarInitial: "G",
      userAvatarColor: "bg-pink-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "1 day ago",
      title: "Cyberpunk 2077's comeback is one for the history books.",
      imageUrl:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1170",
      upvotes: 789,
      comments: 256,
      voteStatus: "up",
      liked: false,
    },
    {
      id: 4,
      username: "tech_guru",
      userAvatarInitial: "T",
      userAvatarColor: "bg-purple-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "10 hours ago",
      title: "Apple's new M-series chips are changing the game.",
      imageUrl:
        "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
      upvotes: 321,
      comments: 99,
      voteStatus: "none",
      liked: false,
    },
    {
      id: 5,
      username: "meme_lord",
      userAvatarInitial: "M",
      userAvatarColor: "bg-yellow-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "3 days ago",
      title: "This new cat meme is hilarious.",
      imageUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1170",
      upvotes: 678,
      comments: 55,
      voteStatus: "none",
      liked: false,
    },
    {
      id: 6,
      username: "foodie_adventures",
      userAvatarInitial: "F",
      userAvatarColor: "bg-green-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "1 week ago",
      title: "My attempt at making ramen from scratch.",
      imageUrl:
        "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1170",
      upvotes: 912,
      comments: 301,
      voteStatus: "up",
      liked: true,
    },
    {
      id: 7,
      username: "travel_bug",
      userAvatarInitial: "T",
      userAvatarColor: "bg-orange-500",
      userAvatarUrl:
        "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=40&h=40&q=80",
      timestamp: "4 hours ago",
      title: "Just got back from a trip to Japan, it was amazing!",
      imageUrl:
        "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1170",
      upvotes: 250,
      comments: 76,
      voteStatus: "none",
      liked: false,
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostImageUrl, setNewPostImageUrl] = useState("");
  const [newPostLinkUrl, setNewPostLinkUrl] = useState("");
  const getFallbackImageUrl = (
    width: number,
    height: number,
    text: string = "No Image"
  ) =>
    `https://via.placeholder.com/${width}x${height}/CCCCCC/FFFFFF?text=${encodeURIComponent(
      text
    )}`;

  const [searchTerm, setSearchTerm] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleFeatureComingSoon = () => {
    alert("Feature coming soon!");
  };

  // handleVote: toggles between up/down/none and updates upvotes accordingly
  const handleVote = (postId: number, voteType: "up" | "down") => {
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;
        // Current status
        const prevStatus = post.voteStatus;
        let newStatus: "up" | "down" | "none" = prevStatus;
        let upvoteDelta = 0;
        if (voteType === "up") {
          if (prevStatus === "up") {
            // Remove upvote
            newStatus = "none";
            upvoteDelta = -1;
          } else if (prevStatus === "down") {
            // Change from downvote to upvote
            newStatus = "up";
            upvoteDelta = 2;
          } else {
            // Add upvote
            newStatus = "up";
            upvoteDelta = 1;
          }
        } else if (voteType === "down") {
          if (prevStatus === "down") {
            // Remove downvote
            newStatus = "none";
            upvoteDelta = 1;
          } else if (prevStatus === "up") {
            // Change from upvote to downvote
            newStatus = "down";
            upvoteDelta = -2;
          } else {
            // Add downvote
            newStatus = "down";
            upvoteDelta = -1;
          }
        }
        return {
          ...post,
          upvotes: post.upvotes + upvoteDelta,
          voteStatus: newStatus,
        };
      })
    );
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const getThemeClasses = (lightClasses: string, darkClasses: string) => {
    return theme === "light" ? lightClasses : darkClasses;
  };

  // Post filter state: "Hot" | "Latest" | "Top"
  const [selectedFilter, setSelectedFilter] = useState<
    "Hot" | "Latest" | "Top"
  >("Hot");

  // Compute filtered and sorted posts based on selectedFilter and searchTerm
  const filteredPosts = posts
    .slice()
    .sort((a, b) => {
      if (selectedFilter === "Hot") {
        // Hot: sort by upvotes descending, then comments descending, then id descending (to break ties)
        if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
        if (b.comments !== a.comments) return b.comments - a.comments;
        return b.id - a.id;
      }
      if (selectedFilter === "Latest") {
        // Latest: sort by id descending (assuming higher id is newer)
        return b.id - a.id;
      }
      if (selectedFilter === "Top") {
        // Top: sort by upvotes descending, then id descending
        if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
        return b.id - a.id;
      }
      return 0;
    })
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      className={`h-screen flex flex-col ${getThemeClasses(
        "bg-[#f1f1f1] text-gray-800",
        "bg-gray-900 text-gray-100"
      )}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Poppins', sans-serif;
            }
            /* Custom Scrollbar for Webkit browsers */
            .overflow-y-auto::-webkit-scrollbar {
              width: 8px;
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background: transparent;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background-color: rgba(156, 163, 175, 0.5); /* gray-400 with 50% opacity */
              border-radius: 10px;
              border: 2px solid transparent;
              background-clip: content-box;
            }
            .dark .overflow-y-auto::-webkit-scrollbar-thumb {
               background-color: rgba(107, 114, 128, 0.5); /* gray-500 with 50% opacity */
            }
          `,
        }}
      />
      {/* Header */}
      <header
        className={`container mx-auto flex justify-between items-center py-4 px-4 md:px-6 lg:px-8 md:flex-row md:gap-6 shrink-0 ${getThemeClasses(
          "",
          "bg-gray-800 rounded-b-xl shadow-md"
        )}`}
      >
        <div className="flex items-center space-x-2 md:w-1/4 lg:w-1/5">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu
              className={getThemeClasses("text-gray-600", "text-gray-300")}
            />
          </button>
          <img
            onClick={toggleTheme}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5wkn7looQkelz3xH0yEcnRiqVnIf9RosoDg&s"
            alt="Reddit Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-orange-500 text-xl font-bold">reddit</span>
        </div>

        <div className="flex-1 flex items-center md:mx-0 md:max-w-none">
          <div className="hidden lg:flex space-x-10 mr-8">
            <button onClick={handleFeatureComingSoon}>
              <Home
                className={getThemeClasses(
                  "text-orange-500",
                  "text-orange-500"
                )}
              />
            </button>
            <button onClick={handleFeatureComingSoon}>
              <ArrowUp
                className={getThemeClasses("text-gray-400", "text-gray-300")}
              />
            </button>
            <button onClick={handleFeatureComingSoon}>
              <LayoutDashboard
                className={getThemeClasses("text-gray-400", "text-gray-300")}
              />
            </button>
            <button onClick={handleFeatureComingSoon}>
              <GroupIcon
                className={getThemeClasses("text-gray-400", "text-gray-300")}
              />
            </button>
          </div>
          <input
            type="search"
            placeholder="Search Reddit"
            className={`w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${getThemeClasses(
              "bg-gray-200",
              "bg-gray-700 text-gray-100 placeholder-gray-400"
            )}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 md:w-1/4 lg:w-1/5">
          <button
            className="focus:outline-none"
            onClick={() => setIsProfileModalOpen(true)}
            aria-label="Open profile modal"
            type="button"
            style={{ display: "flex", alignItems: "center" }}
          >
            {currentUser.imageUrl ? (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={currentUser.imageUrl}
                alt={currentUser.name}
                onError={(e) =>
                  (e.currentTarget.src = getFallbackImageUrl(
                    32,
                    32,
                    currentUser.avatarInitial
                  ))
                }
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {currentUser.avatarInitial}
              </div>
            )}
            <div className="hidden sm:block text-sm text-left ml-2">
              <p className="font-semibold">{currentUser.name}</p>
              <p
                className={`text-xs ${getThemeClasses(
                  "text-gray-400",
                  "text-gray-300"
                )}`}
              >
                <span className={getThemeClasses("text-black", "text-white")}>
                  {currentUser.karma}
                </span>{" "}
                Karma
              </p>
            </div>
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div
            className={`${getThemeClasses(
              "bg-white",
              "bg-gray-800"
            )} w-full max-w-2xl flex items-center space-x-4 rounded-xl shadow p-4 md:p-6 relative`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsProfileModalOpen(false)}
              aria-label="Close profile modal"
              type="button"
            >
              <X
                className={getThemeClasses("text-gray-600", "text-gray-300")}
              />
            </button>
            {currentUser.imageUrl ? (
              <img
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-orange-400"
                src={currentUser.imageUrl}
                alt={currentUser.name}
                onError={(e) =>
                  (e.currentTarget.src = getFallbackImageUrl(
                    64,
                    64,
                    currentUser.avatarInitial
                  ))
                }
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 border-2 border-orange-400">
                {currentUser.avatarInitial}
              </div>
            )}
            <div className="flex flex-col justify-center flex-grow min-w-0">
              <span className="font-bold text-lg truncate">
                {currentUser.name}
              </span>
              <span
                className={`text-sm mt-1 ${getThemeClasses(
                  "text-gray-500",
                  "text-gray-400"
                )}`}
              >
                <span className="font-medium text-orange-500">
                  {currentUser.karma}
                </span>{" "}
                Karma
              </span>
              <span
                className={`text-xs mt-2 ${getThemeClasses(
                  "text-gray-400",
                  "text-gray-300"
                )}`}
              >
                Welcome back to Reddit, {currentUser.name.split(" ")[0]}!
              </span>
              {/* Joined Communities Block */}
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">
                  Joined Communities
                </h4>
                <div className="flex flex-row gap-3 overflow-x-auto">
                  {communities.filter((c) => joinedCommunities[c.id]).length ===
                  0 ? (
                    <span
                      className={`text-xs ${getThemeClasses(
                        "text-gray-400",
                        "text-gray-500"
                      )}`}
                    >
                      Not a member of any community yet.
                    </span>
                  ) : (
                    communities
                      .filter((c) => joinedCommunities[c.id])
                      .map((c) => (
                        <div
                          key={c.id}
                          className="flex flex-col items-center min-w-[60px]"
                        >
                          <img
                            src={c.imageUrl}
                            alt={c.name}
                            className="w-8 h-8 rounded-full object-cover border border-orange-400 mb-1"
                          />
                          <span className="text-xs truncate max-w-[56px]">
                            <span className="text-orange-500">r/</span>
                            {c.name}
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>
              {/* End Joined Communities Block */}
            </div>
          </div>
        </div>
      )}

      {/* Retractable Sidebar for Mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`lg:hidden fixed top-0 left-0 w-64 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out ${getThemeClasses(
          "bg-white",
          "bg-gray-800"
        )}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5wkn7looQkelz3xH0yEcnRiqVnIf9RosoDg&s"
                alt="Reddit Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-orange-500 text-xl font-bold">reddit</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2">
              <X
                className={getThemeClasses("text-gray-600", "text-gray-300")}
              />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            <a
              href="#"
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${getThemeClasses(
                "hover:bg-gray-100 text-gray-700",
                "hover:bg-gray-700 text-gray-200"
              )}`}
            >
              <Home
                className={getThemeClasses("text-gray-600", "text-gray-300")}
              />{" "}
              <span>Home</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${getThemeClasses(
                "hover:bg-gray-100 text-gray-700",
                "hover:bg-gray-700 text-gray-200"
              )}`}
            >
              <ArrowUp
                className={getThemeClasses("text-gray-600", "text-gray-300")}
              />{" "}
              <span>Popular</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${getThemeClasses(
                "hover:bg-gray-100 text-gray-700",
                "hover:bg-gray-700 text-gray-200"
              )}`}
            >
              <LayoutDashboard
                className={getThemeClasses("text-gray-600", "text-gray-300")}
              />{" "}
              <span>All</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium ${getThemeClasses(
                "hover:bg-gray-100 text-gray-700",
                "hover:bg-gray-700 text-gray-200"
              )}`}
            >
              <GroupIcon
                className={getThemeClasses("text-gray-600", "text-gray-300")}
              />{" "}
              <span>Communities</span>
            </a>
          </nav>
        </div>
      </aside>

      <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 flex flex-col md:flex-row gap-6 flex-grow overflow-hidden">
        {/* Left Sidebar */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 space-y-6 overflow-y-auto">
          <div
            className={`${getThemeClasses(
              "bg-white",
              "bg-gray-800"
            )} p-4 rounded-xl shadow-sm`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Hot right now</h3>
              <button
                className={`${getThemeClasses(
                  "text-gray-400 hover:bg-gray-200",
                  "text-gray-300 hover:bg-gray-700"
                )} rounded-full p-1`}
                onClick={handleFeatureComingSoon}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {hotRightNowItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                  <span className="font-medium">
                    <span className="text-orange-500">r/</span>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${getThemeClasses(
              "bg-white",
              "bg-gray-800"
            )} p-4 rounded-xl shadow-sm`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Communities</h3>
              <button
                className={`${getThemeClasses(
                  "text-gray-400 hover:bg-gray-200",
                  "text-gray-300 hover:bg-gray-700"
                )} rounded-full p-1`}
                onClick={handleFeatureComingSoon}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {communities.map((community) => (
                <div
                  key={community.id}
                  className="relative h-32 rounded overflow-hidden"
                >
                  <img
                    className="object-cover w-full h-full"
                    src={community.imageUrl}
                    alt="community"
                  />
                  <div
                    className={`absolute bottom-0 w-full text-xs text-center py-1 ${getThemeClasses(
                      "text-black bg-gray-300",
                      "text-white bg-gray-700"
                    )}`}
                  >
                    <span className="text-orange-500">r/</span>
                    {community.name}
                  </div>
                  <button
                    className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold shadow ${
                      joinedCommunities[community.id]
                        ? getThemeClasses(
                            "bg-green-500 text-white",
                            "bg-green-500 text-white"
                          )
                        : getThemeClasses(
                            "bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",
                            "bg-gray-700 text-orange-400 border border-orange-400 hover:bg-orange-800"
                          )
                    }`}
                    style={{ zIndex: 2 }}
                    onClick={() => handleToggleJoin(community.id)}
                  >
                    {joinedCommunities[community.id] ? "Joined" : "Join"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Content */}
        <section className="flex-1 w-full md:w-auto space-y-6 overflow-y-auto">
          <div
            className={`${getThemeClasses(
              "bg-white",
              "bg-gray-800"
            )} p-2 md:p-4 rounded-xl shadow-sm flex items-center space-x-2 md:space-x-4`}
          >
            {currentUser.imageUrl ? (
              <img
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                src={currentUser.imageUrl}
                alt={currentUser.name}
                onError={(e) =>
                  (e.currentTarget.src = getFallbackImageUrl(
                    40,
                    40,
                    currentUser.avatarInitial
                  ))
                }
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {currentUser.avatarInitial}
              </div>
            )}

            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Create new post"
                className={`w-full border rounded-full py-2 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-orange-500 ${getThemeClasses(
                  "bg-gray-100 border-gray-300",
                  "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                )}`}
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
                <button
                  className={`cursor-pointer p-2 rounded-full ${getThemeClasses(
                    "text-gray-400 hover:text-orange-500 hover:bg-gray-200",
                    "text-gray-300 hover:text-orange-500 hover:bg-gray-700"
                  )}`}
                  onClick={() => {
                    const url = prompt("Enter image URL:");
                    if (url) setNewPostImageUrl(url);
                  }}
                >
                  <Image className="w-5 h-5" />
                </button>
                <button
                  className={`cursor-pointer p-2 rounded-full ${getThemeClasses(
                    "text-gray-400 hover:text-orange-500 hover:bg-gray-200",
                    "text-gray-300 hover:text-orange-500 hover:bg-gray-700"
                  )}`}
                  onClick={() => {
                    const url = prompt("Enter link URL:");
                    if (url) setNewPostLinkUrl(url);
                  }}
                >
                  <Link className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              className="bg-orange-500 text-white px-3 py-2 md:px-4 rounded-full font-semibold text-sm md:text-base whitespace-nowrap"
              onClick={() => {
                if (!newPostTitle && !newPostImageUrl && !newPostLinkUrl) {
                  alert("Please enter some content for your post.");
                  return;
                }

                const newPost: Post = {
                  id:
                    posts.length > 0
                      ? Math.max(...posts.map((p) => p.id)) + 1
                      : 1,
                  username: currentUser.name,
                  userAvatarInitial: currentUser.avatarInitial,
                  userAvatarColor: "bg-blue-500",
                  timestamp: "just now",
                  title:
                    newPostTitle ||
                    (newPostImageUrl
                      ? "New Image Post"
                      : newPostLinkUrl
                      ? "New Link Post"
                      : "Untitled Post"),
                  imageUrl: newPostImageUrl,
                  linkUrl: newPostLinkUrl,
                  upvotes: 0,
                  comments: 0,
                  voteStatus: "none",
                  liked: false,
                };

                setPosts([newPost, ...posts]);
                setNewPostTitle("");
                setNewPostImageUrl("");
                setNewPostLinkUrl("");
              }}
            >
              Create
            </button>
          </div>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`${getThemeClasses(
                  "bg-white",
                  "bg-gray-800"
                )} rounded-xl shadow-sm`}
              >
                <div className="p-2 md:p-4 flex justify-between items-start">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {post.userAvatarUrl ? (
                      <img
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        src={post.userAvatarUrl}
                        alt={post.username}
                        onError={(e) =>
                          (e.currentTarget.src = getFallbackImageUrl(
                            40,
                            40,
                            post.userAvatarInitial
                          ))
                        }
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 ${post.userAvatarColor} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
                      >
                        {post.userAvatarInitial}
                      </div>
                    )}
                    <p
                      className={`font-semibold ${getThemeClasses(
                        "text-gray-400",
                        "text-gray-300"
                      )}`}
                    >
                      {post.username}
                    </p>
                  </div>
                  <p
                    className={`text-xs md:text-sm whitespace-nowrap ml-2 ${getThemeClasses(
                      "text-gray-400",
                      "text-gray-300"
                    )}`}
                  >
                    {post.timestamp}
                  </p>
                </div>
                <h3 className="px-2 md:px-4 pb-2 font-bold text-base md:text-lg">
                  {post.title}
                </h3>
                {post.imageUrl && (
                  <div className="px-2 md:px-4 pb-2">
                    <img
                      className="w-full h-auto max-h-[42vh] object-cover rounded-xl"
                      src={post.imageUrl}
                      alt="post"
                      onError={(e) =>
                        (e.currentTarget.src = getFallbackImageUrl(
                          800,
                          450,
                          "No Post Image"
                        ))
                      }
                    />
                  </div>
                )}
                {post.linkUrl && (
                  <div className="px-2 md:px-4 py-2">
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={getThemeClasses(
                        "text-blue-600",
                        "text-blue-400"
                      )}
                    >
                      {post.linkUrl}
                    </a>
                  </div>
                )}
                <div
                  className={`p-2 md:p-4 flex justify-between text-sm ${getThemeClasses(
                    "text-gray-500",
                    "text-gray-300"
                  )}`}
                >
                  <div className="flex items-center space-x-2 ">
                    <button
                      onClick={() => handleVote(post.id, "up")}
                      className={`p-1 rounded-full ${
                        post.voteStatus === "up"
                          ? getThemeClasses(
                              "bg-green-400 text-white",
                              "bg-green-500 text-white"
                            )
                          : getThemeClasses(
                              "hover:bg-green-200 bg-green-100 text-green-700",
                              "hover:bg-green-700 bg-green-600"
                            )
                      }`}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <span>{post.upvotes}</span>
                    <button
                      onClick={() => handleVote(post.id, "down")}
                      className={`p-1 rounded-full ${
                        post.voteStatus === "down"
                          ? getThemeClasses(
                              "bg-red-400 text-white",
                              "bg-red-500 text-white"
                            )
                          : getThemeClasses(
                              "hover:bg-red-200 bg-red-100 text-red-500",
                              "hover:bg-red-600 bg-red-400"
                            )
                      }`}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className={`flex items-center space-x-1 p-2 rounded-full ${getThemeClasses(
                        "hover:bg-gray-200 bg-gray-100",
                        "hover:bg-gray-700 bg-gray-600"
                      )}`}
                      onClick={handleFeatureComingSoon}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button
                      className={`flex items-center space-x-1 p-2 rounded-full ${getThemeClasses(
                        "hover:bg-gray-200 bg-gray-100",
                        "hover:bg-gray-700 bg-gray-600"
                      )}`}
                      onClick={handleFeatureComingSoon}
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      className={`flex items-center space-x-1 p-2 rounded-full ${getThemeClasses(
                        "hover:bg-gray-200 bg-gray-100",
                        "hover:bg-gray-700 bg-gray-600"
                      )}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          post.liked ? "text-red-500 fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`${getThemeClasses(
                "bg-white",
                "bg-gray-800"
              )} rounded-xl shadow-sm p-4 text-center ${getThemeClasses(
                "text-gray-500",
                "text-gray-400"
              )}`}
            >
              <p>No posts found matching your search.</p>
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 space-y-6 overflow-y-auto">
          <div
            className={`${getThemeClasses(
              "bg-white",
              "bg-gray-800"
            )} p-4 rounded-xl shadow-sm`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Popular posts</h3>
              <button
                className={`${getThemeClasses(
                  "text-gray-400 hover:bg-gray-200",
                  "text-gray-300 hover:bg-gray-700"
                )} rounded-full p-1`}
                onClick={handleFeatureComingSoon}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-2">
              {(["Hot", "Latest", "Top"] as const).map((item) => (
                <li
                  key={item}
                  className={`flex items-center space-x-2 cursor-pointer hover:text-orange-500 transition
                    ${
                      selectedFilter === item
                        ? getThemeClasses(
                            "bg-orange-100 text-orange-600 font-bold",
                            "bg-orange-900 text-orange-400 font-bold"
                          )
                        : ""
                    }
                    rounded-lg px-2 py-1
                    ${getThemeClasses("", "text-gray-200")}
                  `}
                  onClick={() => setSelectedFilter(item)}
                >
                  {item === "Hot" && (
                    <Flame
                      className={getThemeClasses(
                        selectedFilter === "Hot"
                          ? "text-orange-500"
                          : "text-gray-400",
                        selectedFilter === "Hot"
                          ? "text-orange-400"
                          : "text-gray-300"
                      )}
                    />
                  )}
                  {item === "Latest" && (
                    <Clock
                      className={getThemeClasses(
                        selectedFilter === "Latest"
                          ? "text-orange-500"
                          : "text-gray-400",
                        selectedFilter === "Latest"
                          ? "text-orange-400"
                          : "text-gray-300"
                      )}
                    />
                  )}
                  {item === "Top" && (
                    <TrendingUp
                      className={getThemeClasses(
                        selectedFilter === "Top"
                          ? "text-orange-500"
                          : "text-gray-400",
                        selectedFilter === "Top"
                          ? "text-orange-400"
                          : "text-gray-300"
                      )}
                    />
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/*
            Reddit Live Section - refactored to use state and update watching counts
          */}
          <RedditLiveSection
            getThemeClasses={getThemeClasses}
            handleFeatureComingSoon={handleFeatureComingSoon}
          />
        </aside>
      </main>
    </div>
  );
};

export default App;

// RedditLiveSection component for right sidebar
const initialLiveEvents: LiveEvent[] = [
  {
    id: 1,
    title: "Live Coding a Reddit Clone",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1170",
    watching: 6000,
  },
  {
    id: 2,
    title: "Gaming Stream: Valorant",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nfGVufDB8fDB8fHww",
    watching: 12000,
  },
];

const RedditLiveSection = ({
  getThemeClasses,
  handleFeatureComingSoon,
}: {
  getThemeClasses: (lightClasses: string, darkClasses: string) => string;
  handleFeatureComingSoon: () => void;
}) => {
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>(initialLiveEvents);

  useEffect(() => {
    // Set an interval to simulate real-time updates
    const interval = setInterval(() => {
      setLiveEvents((prevEvents) =>
        prevEvents.map((event) => ({
          ...event,
          // Randomly increment watching by 0-20
          watching: event.watching + Math.floor(Math.random() * 21),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${getThemeClasses(
        "bg-white",
        "bg-gray-800"
      )} p-4 rounded-xl shadow-sm`}
    >
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Reddit Live</h3>
        <button
          className={`${getThemeClasses(
            "text-gray-400 hover:bg-gray-200",
            "text-gray-300 hover:bg-gray-700"
          )} rounded-full p-1`}
          onClick={handleFeatureComingSoon}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="relative mb-4">
        <img
          className="w-full h-32 object-cover rounded"
          src="https://i.ytimg.com/vi/lLWEXRAnQd0/maxresdefault.jpg"
          alt="Bob Ross Painting Live Stream"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>
      <p className="font-medium">Bob Ross Painting</p>
      <p
        className={`text-sm ${getThemeClasses(
          "text-gray-500",
          "text-gray-400"
        )}`}
      >
        by <span className="text-orange-500">r/</span>BobRossArtist
      </p>
      <p
        className={`text-xs ${getThemeClasses(
          "text-gray-400",
          "text-gray-300"
        )}`}
      >
        21,014 watching
      </p>
      <hr
        className={`my-4 ${getThemeClasses(
          "border-gray-200",
          "border-gray-700"
        )}`}
      />
      <ul className="space-y-3">
        {liveEvents.map((event) => (
          <li key={event.id} className="flex items-center space-x-3">
            <img
              className="w-12 h-12 rounded object-cover"
              src={event.imageUrl}
              alt={event.title}
            />
            <div>
              <p className="font-medium">{event.title}</p>
              <p
                className={`text-xs ${getThemeClasses(
                  "text-gray-400",
                  "text-gray-300"
                )}`}
              >
                {event.watching}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
