/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Head from "next/head";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiMail,
  FiBookmark,
  FiStar,
  FiMoreHorizontal,
  FiHeart,
  FiRepeat,
  FiBookmark as FiBookmarkIcon,
  FiX,
} from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineLightningBolt } from "react-icons/hi";

type User = {
  name: string;
  username: string;
  avatar: string;
};

type Post = {
  id: number;
  user: User;
  content: string;
  image?: string;
  comments: number;
  retweets: number;
  likes: number;
  bookmarked: boolean;
  liked: boolean;
};

const currentUser: User = {
  name: "Kartik",
  username: "kartik_builds",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const trending = [
  { category: "Technology", tag: "#OpenAI", posts: "10k" },
  { category: "AI", tag: "#Microsoft", posts: "5.2k" },
  { category: "World cup", tag: "#India", posts: "1.2k" },
];

const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "James",
      username: "dev_james",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    content:
      "Crafting a simple notes app that syncs with local storage, and uses MD to write note content but shortcuts make it much easier.",
    comments: 21,
    retweets: 37,
    likes: 156,
    bookmarked: false,
    liked: false,
  },
  {
    id: 2,
    user: {
      name: "Michael",
      username: "michael_js",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    content: (
      <>
        One of my most-used sites:
        <br />
        <a
          href="https://grep.app"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://grep.app
        </a>
        <br />
        Stupid-fast search across Github repos
        <br />
        Ex: In this one, I wanted to see how people are doing something with
        layouts in Next.
      </>
    ) as any,
    comments: 33,
    retweets: 98,
    likes: 12000,
    bookmarked: true,
    liked: false,
  },
  {
    id: 3,
    user: {
      name: "Andrew",
      username: "andrew_tweets",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    content: (
      <>
        Light mode{" "}
        <span role="img" aria-label="light">
          🪄
        </span>
        <br />
      </>
    ) as any,
    comments: 45,
    retweets: 72,
    likes: 16000,
    bookmarked: false,
    liked: true,
  },
];

export default function Home() {
  const [feed, setFeed] = useState<"foryou" | "following">("foryou");
  const [forYouPosts, setForYouPosts] = useState<Post[]>(initialPosts);
  const [followingPosts, setFollowingPosts] = useState<Post[]>([
    {
      id: 101,
      user: {
        name: "Sarah",
        username: "sarah_dev",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      content: "Excited to share my new project with the world! 🚀",
      comments: 5,
      retweets: 20,
      likes: 320,
      bookmarked: false,
      liked: false,
    },
    {
      id: 102,
      user: {
        name: "Tom",
        username: "tom_codes",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      content: "Just published a new blog post on React performance tips.",
      comments: 2,
      retweets: 80,
      likes: 750,
      bookmarked: false,
      liked: false,
    },
  ]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newPostFromModal, setNewPostFromModal] = useState("");
  const [searchTrending, setSearchTrending] = useState("");
  const [showMobileTrending, setShowMobileTrending] = useState(false);

  const toggleLike = (id: number) => {
    if (feed === "foryou") {
      setForYouPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                liked: !p.liked,
                likes: p.liked ? p.likes - 1 : p.likes + 1,
              }
            : p
        )
      );
    } else {
      setFollowingPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                liked: !p.liked,
                likes: p.liked ? p.likes - 1 : p.likes + 1,
              }
            : p
        )
      );
    }
  };
  const toggleBookmark = (id: number) => {
    if (feed === "foryou") {
      setForYouPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
      );
    } else {
      setFollowingPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
      );
    }
  };

  const handlePost = (isModal: boolean) => {
    const newPostObj: Post = {
      id: Date.now(),
      user: currentUser,
      content: isModal ? newPostFromModal : newPost,
      comments: 0,
      retweets: 0,
      likes: 0,
      bookmarked: false,
      liked: false,
    };
    if (feed === "foryou") {
      setForYouPosts([newPostObj, ...forYouPosts]);
    } else {
      setFollowingPosts([newPostObj, ...followingPosts]);
    }
    if (isModal) {
      setNewPostFromModal("");
      setShowPostModal(false);
    } else {
      setNewPost("");
    }
  };

  return (
    <>
      <Head>
        <title>Social Feed App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </Head>
      <div className="font-inter min-h-screen bg-[#23272f] text-white flex flex-col">
        <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
          {/* Sidebar (hidden on mobile) */}
          <aside className="hidden sm:flex w-[80px] md:w-[260px] flex-col justify-between py-6 px-2 md:px-6 bg-[#23272f] border-r border-[#2d323b] min-h-screen">
            <div>
              <div className="flex items-center gap-2 mb-8 pl-2">
                <HiOutlineLightningBolt className="text-yellow-400 text-2xl" />
                <span className="font-bold text-lg hidden md:inline">
                  Social
                </span>
              </div>
              <nav className="flex flex-col gap-2">
                <SidebarItem icon={<FiHome />} label="Home" active />
                <SidebarItem icon={<FiSearch />} label="Search" />
                <SidebarItem icon={<FiBell />} label="Notifications" />
                <SidebarItem icon={<FiMail />} label="Messages" />
                <SidebarItem icon={<FiBookmark />} label="Bookmarks" />
                <SidebarItem icon={<FiStar />} label="Premium" />
              </nav>
            </div>
            <div>
              <button
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
                onClick={() => setShowPostModal(true)}
              >
                Post
              </button>
              <div className="flex items-center gap-3 mt-8 p-2 rounded-xl hover:bg-[#2d323b] transition">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="hidden md:block">
                  <div className="font-semibold">{currentUser.name}</div>
                  <div className="text-gray-400 text-sm">
                    @{currentUser.username}
                  </div>
                </div>
                <FiMoreHorizontal className="ml-auto text-xl text-gray-400 hidden md:block" />
              </div>
            </div>
          </aside>
          {/* Main Feed */}
          <main className="flex-1 flex flex-col border-r border-[#2d323b] min-h-screen w-full">
            {/* Feed Switcher */}
            <div className="flex border-b border-[#2d323b] sticky top-0 z-20 bg-[#23272f]">
              <button
                className={`flex-1 py-3 sm:py-4 text-base sm:text-lg font-semibold transition ${
                  feed === "foryou"
                    ? "border-b-2 border-blue-500 text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setFeed("foryou")}
              >
                For you
              </button>
              <button
                className={`flex-1 py-3 sm:py-4 text-base sm:text-lg font-semibold transition ${
                  feed === "following"
                    ? "border-b-2 border-blue-500 text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setFeed("following")}
              >
                Following
              </button>
            </div>
            {/* Post Section */}
            <div className="flex items-start px-5 py-5 border-b border-gray-700 bg-black">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 flex items-center ml-4">
                <textarea
                  className="bg-transparent text-md sm:text-2xl placeholder-gray-500 text-gray-100 border-none focus:outline-none focus:ring-0 focus:border-transparent w-full resize-none"
                  placeholder="What's happening?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  maxLength={280}
                />
              </div>
              <button
                className="ml-4 mt-6 sm:mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-md px-6 sm:px-7 py-1 sm:py-2 rounded-full"
                onClick={() => handlePost(false)}
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>
            {/* Posts */}
            <div className="flex-1 overflow-y-auto w-full">
              {(feed === "foryou" ? forYouPosts : followingPosts).map(
                (post) => (
                  <div
                    key={post.id}
                    className="border-b border-[#2d323b] px-2 sm:px-6 py-4 sm:py-6 flex gap-2 sm:gap-4 hover:bg-[#23272f]/80 transition"
                  >
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base">
                          {post.user.name}
                        </span>
                        <span className="text-gray-400 text-xs sm:text-sm">
                          @{post.user.username}
                        </span>
                      </div>
                      <div className="mt-1 text-gray-200 text-sm sm:text-base break-words">
                        {typeof post.content === "string"
                          ? post.content
                          : post.content}
                      </div>
                      <div className="flex gap-6 sm:gap-36 mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm items-center">
                        <span className="flex items-center gap-1">
                          <FaRegCommentDots className="text-base sm:text-lg" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiRepeat className="text-base sm:text-lg" />
                          {post.retweets}
                        </span>
                        <button
                          className={`flex items-center gap-1 ${
                            post.liked ? "text-pink-500" : ""
                          }`}
                          onClick={() => toggleLike(post.id)}
                        >
                          <FiHeart className="text-base sm:text-lg" />
                          {post.likes >= 1000
                            ? (post.likes / 1000).toFixed(0) + "k"
                            : post.likes}
                        </button>
                        <button
                          className={`flex items-center gap-1 ${
                            post.bookmarked ? "text-blue-400" : ""
                          }`}
                          onClick={() => toggleBookmark(post.id)}
                        >
                          <FiBookmarkIcon className="text-base sm:text-lg" />
                        </button>
                      </div>
                    </div>
                    <BsThreeDots className="text-lg sm:text-xl text-gray-400 cursor-pointer" />
                  </div>
                )
              )}
            </div>
          </main>
          {/* Trending Panel */}
          <aside className="w-[340px] hidden lg:flex flex-col px-6 py-6 bg-[#23272f] min-h-screen">
            <input
              type="text"
              placeholder="search here..."
              className="w-full px-4 py-2 rounded-full bg-[#23272f] border border-[#2d323b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              value={searchTrending}
              onChange={(e) => setSearchTrending(e.target.value)}
            />
            <div className="bg-[#181b20] rounded-xl p-4">
              <div className="font-bold text-lg mb-4">{`What's happening`}</div>
              {trending
                .filter(
                  (t) =>
                    t.category
                      .toLowerCase()
                      .includes(searchTrending.toLowerCase()) ||
                    t.tag.toLowerCase().includes(searchTrending.toLowerCase())
                )
                .map((t, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-xs text-gray-400">{t.category}</div>
                    <div className="font-semibold">{t.tag}</div>
                    <div className="text-xs text-gray-500">{t.posts} posts</div>
                  </div>
                ))}
              <button className="text-blue-400 hover:underline text-sm mt-2">
                Show more
              </button>
            </div>
          </aside>
        </div>
        {/* Bottom Nav mobile */}
        <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-[#23272f] border-t border-[#2d323b] flex justify-around items-center py-2 z-30">
          <SidebarIcon icon={<FiHome />} label="Home" />
          <button
            onClick={() => setShowMobileTrending(true)}
            className="flex flex-col items-center text-gray-400 hover:text-white text-xl focus:outline-none"
          >
            <FiSearch />
            <span className="text-[10px] mt-1">Search</span>
          </button>
          <SidebarIcon icon={<FiBell />} label="Notifications" />
          <SidebarIcon icon={<FiMail />} label="Messages" />
          <SidebarIcon icon={<FiBookmark />} label="Bookmarks" />
          <SidebarIcon icon={<FiStar />} label="Premium" />
        </nav>
        {showMobileTrending && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#23272f] rounded-t-2xl shadow-lg w-full max-w-md mx-auto p-4 pt-8 relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl"
                onClick={() => setShowMobileTrending(false)}
                aria-label="Close"
              >
                <FiX />
              </button>
              <input
                type="text"
                placeholder="search here..."
                className="w-full px-4 py-2 mt-1 rounded-full bg-[#23272f] border border-[#2d323b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                value={searchTrending}
                onChange={(e) => setSearchTrending(e.target.value)}
                autoFocus
              />
              <div className="bg-[#181b20] rounded-xl p-4">
                <div className="font-bold text-lg mb-4">{`What's happening`}</div>
                {trending
                  .filter(
                    (t) =>
                      t.category
                        .toLowerCase()
                        .includes(searchTrending.toLowerCase()) ||
                      t.tag.toLowerCase().includes(searchTrending.toLowerCase())
                  )
                  .map((t, i) => (
                    <div key={i} className="mb-4">
                      <div className="text-xs text-gray-400">{t.category}</div>
                      <div className="font-semibold">{t.tag}</div>
                      <div className="text-xs text-gray-500">
                        {t.posts} posts
                      </div>
                    </div>
                  ))}
                <button className="text-blue-400 hover:underline text-sm mt-2">
                  Show more
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Post Modal */}
        {showPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-[#23272f] rounded-xl shadow-lg w-full max-w-lg mx-2 p-4 sm:p-8 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                onClick={() => setShowPostModal(false)}
                aria-label="Close"
              >
                <FiX />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Create Post
              </h2>
              <textarea
                className="w-full h-32 p-4 rounded-lg bg-[#181b20] text-white border border-[#2d323b] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
                placeholder="What's happening?"
                value={newPostFromModal}
                onChange={(e) => setNewPostFromModal(e.target.value)}
                maxLength={280}
                autoFocus
              />
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                  onClick={() => handlePost(true)}
                  disabled={!newPostFromModal.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-4 px-3 py-3 rounded-xl transition text-lg w-full ${
        active
          ? "bg-[#181b20] text-white font-bold"
          : "text-gray-400 hover:bg-[#181b20] hover:text-white"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function SidebarIcon({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex flex-col items-center text-gray-400 hover:text-white text-xl focus:outline-none">
      {icon}
      <span className="text-[10px] mt-1">{label}</span>
    </button>
  );
}
