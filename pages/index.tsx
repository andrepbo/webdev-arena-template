/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsThreeDots } from "react-icons/bs";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import {
  FiBell,
  FiBookmark,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMail,
  FiMoreHorizontal,
  FiRepeat,
  FiSearch,
  FiSettings,
  FiShield,
  FiStar,
  FiX,
} from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { toast } from "sonner";

const showComingSoonToast = () => {
  toast("Coming soon!", {
    style: {
      backgroundColor: "#181b20",
      color: "#fff",
    },
  });
};

type User = {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
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

type Comment = {
  id: number;
  user: User;
  content: string;
  timestamp: string;
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
      bio: "Frontend Developer | React Enthusiast | Coffee Lover ☕️",
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
      bio: "JavaScript Wizard 🧙‍♂️ | Building things for the web.",
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
      bio: "Founder & CEO @ TechStartup | Building the future of AI.",
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
  {
    id: 4,
    user: {
      name: "Alex Doe",
      username: "alex_doe",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Full-stack developer and tech enthusiast.",
    },
    content: "Just discovered a new CSS trick that blew my mind! #webdev #css",
    comments: 15,
    retweets: 25,
    likes: 120,
    bookmarked: false,
    liked: false,
  },
  {
    id: 5,
    user: {
      name: "Sarah Lee",
      username: "sarah_lee",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "UI/UX Designer. Making the web beautiful.",
    },
    content:
      "Working on a new design system for a client. So excited to share the results soon! #uidesign #uxdesign",
    comments: 42,
    retweets: 88,
    likes: 980,
    bookmarked: true,
    liked: true,
  },
  {
    id: 6,
    user: {
      name: "Jane Smith",
      username: "jane_smith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Backend engineer specializing in Node.js.",
    },
    content:
      "Finally deployed the new microservice. It's handling 1000 requests per second like a champ! #backend #nodejs",
    comments: 5,
    retweets: 12,
    likes: 99,
    bookmarked: false,
    liked: false,
  },
  {
    id: 7,
    user: {
      name: "Chris Johnson",
      username: "chris_j",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "DevOps and cloud infrastructure.",
    },
    content:
      "Automating infrastructure with Terraform is so satisfying. #devops #terraform",
    comments: 3,
    retweets: 9,
    likes: 54,
    bookmarked: false,
    liked: false,
  },
  {
    id: 8,
    user: {
      name: "Tom Wilson",
      username: "tom_wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Lover of all things tech.",
    },
    content:
      "Just got my hands on the new M3 MacBook Pro. This thing is a beast! #apple #macbookpro",
    comments: 78,
    retweets: 150,
    likes: 2300,
    bookmarked: true,
    liked: false,
  },
];

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [feed, setFeed] = useState<"foryou" | "following">("foryou");
  const [forYouPosts, setForYouPosts] = useState<Post[]>(initialPosts);
  const [followedUsers, setFollowedUsers] = useState<string[]>([
    "alex_doe",
    "sarah_lee",
  ]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newPostFromModal, setNewPostFromModal] = useState("");
  const [searchTrending, setSearchTrending] = useState("");
  const [showMobileTrending, setShowMobileTrending] = useState(false);
  const [commentsByPost, setCommentsByPost] = useState<
    Record<number, Comment[]>
  >({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [activeItem, setActiveItem] = useState<string>("home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDialog, setShowNotificationsDialog] = useState(false);
  const [showMessagesDialog, setShowMessagesDialog] = useState(false);
  const [showBookmarksDialog, setShowBookmarksDialog] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>(() =>
    initialPosts.filter((p) => p.bookmarked)
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    }
  };
  const toggleBookmark = (id: number) => {
    let toggledPost: Post | undefined;
    const newPosts = forYouPosts.map((p) => {
      if (p.id === id) {
        toggledPost = { ...p, bookmarked: !p.bookmarked };
        return toggledPost;
      }
      return p;
    });
    setForYouPosts(newPosts);

    if (toggledPost) {
      if (toggledPost.bookmarked) {
        setBookmarkedPosts((prev) => [toggledPost!, ...prev]);
      } else {
        setBookmarkedPosts((prev) => prev.filter((bp) => bp.id !== id));
      }
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
      setForYouPosts([newPostObj, ...forYouPosts]);
    }
    if (isModal) {
      setNewPostFromModal("");
      setShowPostModal(false);
    } else {
      setNewPost("");
    }
  };

  const handleAddComment = (postId: number) => {
    const commentText = (newComment[postId] || "").trim();
    if (!commentText) return;
    const comment: Comment = {
      id: Date.now(),
      user: currentUser,
      content: commentText,
      timestamp: "Just now",
    };
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }));
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
    // Update comment count in post
    if (feed === "foryou") {
      setForYouPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: p.comments + 1 } : p
        )
      );
    } else {
      setForYouPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: p.comments + 1 } : p
        )
      );
    }
  };

  const handleToggleComments = (postId: number) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleFollowToggle = (username: string) => {
    setFollowedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  const handleDropdownToggle = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <div
      className={`flex h-screen bg-gray-100 dark:bg-[#181b20] ${inter.className}`}
    >
      <Head>
        <title>Social Feed App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </Head>
      <Toaster />
      <Sidebar
        currentUser={currentUser}
        onPostClick={() => setShowPostModal(true)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        dropdownRef={dropdownRef}
        onNotificationsClick={() => setShowNotificationsDialog(true)}
        onMessagesClick={() => setShowMessagesDialog(true)}
        onBookmarksClick={() => setShowBookmarksDialog(true)}
      />
      <MainFeed
        feed={feed}
        setFeed={setFeed}
        currentUser={currentUser}
        newPost={newPost}
        setNewPost={setNewPost}
        handlePost={() => handlePost(false)}
        posts={forYouPosts}
        followedUsers={followedUsers}
        handleFollowToggle={handleFollowToggle}
        openProfile={setSelectedUser}
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
        handleToggleComments={handleToggleComments}
        showComments={showComments}
        commentsByPost={commentsByPost}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        openDropdown={openDropdown}
        handleDropdownToggle={handleDropdownToggle}
        dropdownContainerRef={dropdownContainerRef}
      />
      <TrendingPanel
        search={searchTrending}
        onSearchChange={setSearchTrending}
        trendingItems={trending}
      />
      <MobileNav
        onShowMobileTrending={() => setShowMobileTrending(true)}
        onNotificationsClick={() => setShowNotificationsDialog(true)}
        onMessagesClick={() => setShowMessagesDialog(true)}
        onBookmarksClick={() => setShowBookmarksDialog(true)}
      />
      {showMobileTrending && (
        <MobileTrending
          search={searchTrending}
          onSearchChange={setSearchTrending}
          onClose={() => setShowMobileTrending(false)}
          trendingItems={trending}
        />
      )}
      {showPostModal && (
        <PostModal
          newPost={newPostFromModal}
          setNewPost={setNewPostFromModal}
          onPost={() => handlePost(true)}
          onClose={() => setShowPostModal(false)}
        />
      )}
      {selectedUser && (
        <ProfileDialog
          user={selectedUser}
          isFollowing={followedUsers.includes(selectedUser.username)}
          onFollowToggle={() => handleFollowToggle(selectedUser.username)}
          onClose={() => setSelectedUser(null)}
          currentUser={currentUser}
        />
      )}
      {showNotificationsDialog && (
        <NotificationsDialog
          onClose={() => setShowNotificationsDialog(false)}
        />
      )}
      {showMessagesDialog && (
        <MessagesDialog onClose={() => setShowMessagesDialog(false)} />
      )}
      {showBookmarksDialog && (
        <BookmarksDialog
          posts={bookmarkedPosts}
          onClose={() => setShowBookmarksDialog(false)}
          currentUser={currentUser}
          followedUsers={followedUsers}
          handleFollowToggle={handleFollowToggle}
          openProfile={setSelectedUser}
          toggleLike={toggleLike}
          toggleBookmark={toggleBookmark}
          handleToggleComments={handleToggleComments}
          showComments={showComments}
          commentsByPost={commentsByPost}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          openDropdown={openDropdown}
          handleDropdownToggle={handleDropdownToggle}
          dropdownContainerRef={dropdownContainerRef}
        />
      )}
    </div>
  );
}

type SidebarProps = {
  currentUser: User;
  onPostClick: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  showProfileDropdown: boolean;
  setShowProfileDropdown: (show: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onNotificationsClick: () => void;
  onMessagesClick: () => void;
  onBookmarksClick: () => void;
};

const Sidebar = ({
  currentUser,
  onPostClick,
  activeItem,
  setActiveItem,
  showProfileDropdown,
  setShowProfileDropdown,
  dropdownRef,
  onNotificationsClick,
  onMessagesClick,
  onBookmarksClick,
}: SidebarProps) => (
  <aside className="w-[90px] sm:w-[120px] md:w-[260px] hidden md:flex flex-col justify-between px-2 sm:px-4 py-6 bg-white dark:bg-[#23272f] border-r border-gray-200 dark:border-[#2d323b]">
    <div>
      <div className="flex items-center gap-2 mb-8 pl-2">
        <HiOutlineLightningBolt className="text-yellow-400 text-2xl" />
        <span className="font-bold text-lg text-gray-900 dark:text-white hidden md:inline">
          Social
        </span>
      </div>
      <nav className="flex flex-col gap-2">
        <SidebarItem
          icon={<FiHome />}
          label="Home"
          active={activeItem === "home"}
          onClick={() => setActiveItem("home")}
        />
        <SidebarItem
          icon={<FiSearch />}
          label="Search"
          active={activeItem === "search"}
          onClick={() => {
            setActiveItem("search");
            showComingSoonToast();
          }}
        />
        <SidebarItem
          icon={<FiBell />}
          label="Notifications"
          active={activeItem === "notifications"}
          onClick={() => {
            setActiveItem("notifications");
            onNotificationsClick();
          }}
        />
        <SidebarItem
          icon={<FiMail />}
          label="Messages"
          active={activeItem === "messages"}
          onClick={() => {
            setActiveItem("messages");
            onMessagesClick();
          }}
        />
        <SidebarItem
          icon={<FiBookmark />}
          label="Bookmarks"
          active={activeItem === "bookmarks"}
          onClick={() => {
            setActiveItem("bookmarks");
            onBookmarksClick();
          }}
        />
        <SidebarItem
          icon={<FiStar />}
          label="Premium"
          active={activeItem === "premium"}
          onClick={() => {
            setActiveItem("premium");
            showComingSoonToast();
          }}
        />
      </nav>
    </div>
    <div className="relative">
      <button
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
        onClick={onPostClick}
      >
        Post
      </button>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          className="flex items-center gap-3 mt-8 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2d323b] transition w-full text-left"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block">
            <div className="font-semibold text-gray-900 dark:text-white">
              {currentUser.name}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              @{currentUser.username}
            </div>
          </div>
          <FiMoreHorizontal className="ml-auto text-xl text-gray-500 dark:text-gray-400 hidden md:block" />
        </button>
        {showProfileDropdown && <ProfileDropdown />}
      </div>
    </div>
  </aside>
);

type MainFeedProps = {
  feed: "foryou" | "following";
  setFeed: (feed: "foryou" | "following") => void;
  currentUser: User;
  newPost: string;
  setNewPost: (post: string) => void;
  handlePost: () => void;
  posts: Post[];
  followedUsers: string[];
  handleFollowToggle: (username: string) => void;
  openProfile: (user: User) => void;
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
  handleToggleComments: (id: number) => void;
  showComments: Record<number, boolean>;
  commentsByPost: Record<number, Comment[]>;
  newComment: Record<number, string>;
  setNewComment: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  handleAddComment: (postId: number) => void;
  openDropdown: string | null;
  handleDropdownToggle: (dropdownId: string) => void;
  dropdownContainerRef: React.RefObject<HTMLDivElement>;
};

const MainFeed = ({
  feed,
  setFeed,
  currentUser,
  newPost,
  setNewPost,
  handlePost,
  posts,
  followedUsers,
  handleFollowToggle,
  openProfile,
  toggleLike,
  toggleBookmark,
  handleToggleComments,
  showComments,
  commentsByPost,
  newComment,
  setNewComment,
  handleAddComment,
  openDropdown,
  handleDropdownToggle,
  dropdownContainerRef,
}: MainFeedProps) => {
  const followingPosts = posts.filter(
    (post) =>
      followedUsers.includes(post.user.username) &&
      post.user.username !== currentUser.username
  );

  return (
    <main className="flex-1 flex flex-col border-r border-gray-200 dark:border-[#2d323b] w-full">
      {/* Feed Switcher */}
      <div className="flex border-b border-gray-200 dark:border-[#2d323b] sticky top-0 z-20 bg-white dark:bg-[#23272f]">
        <button
          className={`flex-1 py-3 sm:py-4 text-base sm:text-lg font-semibold transition ${
            feed === "foryou"
              ? "border-b-2 border-blue-500 text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setFeed("foryou")}
        >
          For you
        </button>
        <button
          className={`flex-1 py-3 sm:py-4 text-base sm:text-lg font-semibold transition ${
            feed === "following"
              ? "border-b-2 border-blue-500 text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setFeed("following")}
        >
          Following
        </button>
      </div>
      {/* Post Section */}
      {feed === "foryou" ? (
        <div className="flex items-start px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-transparent">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 flex items-center ml-4">
            <textarea
              className="bg-transparent text-md sm:text-2xl placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 border-none focus:outline-none focus:ring-0 focus:border-transparent w-full resize-none"
              placeholder="What's happening?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              maxLength={280}
            />
          </div>
          <button
            className="ml-4 mt-6 sm:mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-md px-6 sm:px-7 py-1 sm:py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePost}
            disabled={!newPost.trim()}
          >
            Post
          </button>
        </div>
      ) : (
        <div className="text-center px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            You’re viewing your Following feed
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Posts from people you follow will appear here.
          </p>
        </div>
      )}
      {/* Posts */}
      <div className="flex-1 overflow-y-auto w-full pb-20 sm:pb-0 no-scrollbar">
        {feed === "foryou" &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              followedUsers={followedUsers}
              handleFollowToggle={handleFollowToggle}
              openProfile={openProfile}
              toggleLike={toggleLike}
              toggleBookmark={toggleBookmark}
              handleToggleComments={handleToggleComments}
              showComments={showComments}
              commentsByPost={commentsByPost}
              newComment={newComment}
              setNewComment={setNewComment}
              handleAddComment={handleAddComment}
              openDropdown={openDropdown}
              handleDropdownToggle={handleDropdownToggle}
              dropdownContainerRef={dropdownContainerRef}
            />
          ))}
        {feed === "following" && followedUsers.length === 0 ? (
          <div className="text-center p-12 text-gray-500 dark:text-gray-400">
            <h2 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">
              Nothing to see here — yet
            </h2>
            <p>When you follow people, you&apos;ll see their posts here.</p>
          </div>
        ) : (
          feed === "following" &&
          followingPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              followedUsers={followedUsers}
              handleFollowToggle={handleFollowToggle}
              openProfile={openProfile}
              toggleLike={toggleLike}
              toggleBookmark={toggleBookmark}
              handleToggleComments={handleToggleComments}
              showComments={showComments}
              commentsByPost={commentsByPost}
              newComment={newComment}
              setNewComment={setNewComment}
              handleAddComment={handleAddComment}
              openDropdown={openDropdown}
              handleDropdownToggle={handleDropdownToggle}
              dropdownContainerRef={dropdownContainerRef}
            />
          ))
        )}
      </div>
    </main>
  );
};

type PostCardProps = {
  post: Post;
  currentUser: User;
  followedUsers: string[];
  handleFollowToggle: (username: string) => void;
  openProfile: (user: User) => void;
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
  handleToggleComments: (id: number) => void;
  showComments: Record<number, boolean>;
  commentsByPost: Record<number, Comment[]>;
  newComment: Record<number, string>;
  setNewComment: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  handleAddComment: (postId: number) => void;
  openDropdown: string | null;
  handleDropdownToggle: (dropdownId: string) => void;
  dropdownContainerRef: React.RefObject<HTMLDivElement>;
};

const PostCard = ({
  post,
  currentUser,
  followedUsers,
  handleFollowToggle,
  openProfile,
  toggleLike,
  toggleBookmark,
  handleToggleComments,
  showComments,
  commentsByPost,
  newComment,
  setNewComment,
  handleAddComment,
  openDropdown,
  handleDropdownToggle,
  dropdownContainerRef,
}: PostCardProps) => (
  <div
    key={post.id}
    className="border-b border-gray-200 dark:border-[#2d323b] px-2 sm:px-6 py-4 sm:py-6 flex flex-col gap-2 sm:gap-4 hover:bg-gray-50 dark:hover:bg-[#23272f]/80 transition"
  >
    <div className="flex gap-2 sm:gap-4">
      <img
        src={post.user.avatar}
        alt={post.user.name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover cursor-pointer"
        onClick={() => openProfile(post.user)}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white cursor-pointer hover:underline"
            onClick={() => openProfile(post.user)}
          >
            {post.user.name}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            @{post.user.username}
          </span>
          {post.user.username !== currentUser.username && (
            <button
              className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                followedUsers.includes(post.user.username)
                  ? "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => handleFollowToggle(post.user.username)}
            >
              {followedUsers.includes(post.user.username)
                ? "Following"
                : "Follow"}
            </button>
          )}
        </div>
        <div className="mt-1 text-gray-800 dark:text-gray-200 text-sm sm:text-base break-words">
          {typeof post.content === "string" ? post.content : post.content}
        </div>
        <div
          className="flex gap-2 sm:gap-4 mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm items-center"
          ref={dropdownContainerRef}
        >
          <div className="flex items-center">
            <button
              className="flex items-center gap-2 p-2 rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => handleToggleComments(post.id)}
            >
              <FaRegCommentDots className="text-base sm:text-lg" />
              <span>{post.comments}</span>
            </button>
          </div>
          <div className="flex items-center relative">
            <button
              className="flex items-center gap-2 p-2 rounded-full transition hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-500 dark:hover:text-green-400"
              type="button"
              onClick={() => handleDropdownToggle(`retweet-${post.id}`)}
            >
              <FiRepeat className="text-base sm:text-lg" />
              <span>{post.retweets}</span>
            </button>
            {openDropdown === `retweet-${post.id}` && (
              <div className="absolute top-10 left-0 bg-white dark:bg-[#181b20] rounded-lg shadow-lg z-10 w-36">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2d323b]"
                  onClick={() => {
                    showComingSoonToast();
                    handleDropdownToggle(`retweet-${post.id}`);
                  }}
                >
                  Retweet
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2d323b]"
                  onClick={() => {
                    showComingSoonToast();
                    handleDropdownToggle(`retweet-${post.id}`);
                  }}
                >
                  Quote Retweet
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <button
              className={`flex items-center gap-2 p-2 rounded-full transition hover:bg-pink-100 dark:hover:bg-pink-900/50 ${
                post.liked
                  ? "text-pink-600 dark:text-pink-500"
                  : "hover:text-pink-600 dark:hover:text-pink-500"
              }`}
              onClick={() => toggleLike(post.id)}
            >
              {post.liked ? (
                <FaHeart className="text-base sm:text-lg" />
              ) : (
                <FaRegHeart className="text-base sm:text-lg" />
              )}
              <span>
                {post.likes >= 1000
                  ? (post.likes / 1000).toFixed(0) + "k"
                  : post.likes}
              </span>
            </button>
          </div>
          <div className="flex items-center">
            <button
              className={`flex items-center gap-1 p-2 rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-900/50 ${
                post.bookmarked
                  ? "text-blue-500 dark:text-blue-400"
                  : "hover:text-blue-500 dark:hover:text-blue-400"
              }`}
              onClick={() => toggleBookmark(post.id)}
            >
              {post.bookmarked ? (
                <BsBookmarkFill className="text-base sm:text-lg" />
              ) : (
                <BsBookmark className="text-base sm:text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="relative" ref={dropdownContainerRef}>
        <BsThreeDots
          className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 cursor-pointer rounded-2xl transition hover:text-gray-900 dark:hover:text-white"
          onClick={() => handleDropdownToggle(`more-${post.id}`)}
        />
        {openDropdown === `more-${post.id}` && (
          <div className="absolute top-8 right-0 bg-white dark:bg-[#181b20] rounded-lg shadow-lg z-10 w-56">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2d323b]"
              onClick={() => {
                showComingSoonToast();
                handleDropdownToggle(`more-${post.id}`);
              }}
            >
              Not interested in this post
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2d323b]"
              onClick={() => {
                showComingSoonToast();
                handleDropdownToggle(`more-${post.id}`);
              }}
            >
              Report post
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2d323b]"
              onClick={() => {
                showComingSoonToast();
                handleDropdownToggle(`more-${post.id}`);
              }}
            >
              Mute @{post.user.username}
            </button>
          </div>
        )}
      </div>
    </div>
    {showComments[post.id] && (
      <CommentSection
        comments={commentsByPost[post.id] || []}
        currentUser={currentUser}
        newComment={newComment[post.id] || ""}
        onNewCommentChange={(value: string) =>
          setNewComment((prev) => ({ ...prev, [post.id]: value }))
        }
        onAddComment={() => handleAddComment(post.id)}
      />
    )}
  </div>
);

type CommentSectionProps = {
  comments: Comment[];
  currentUser: User;
  newComment: string;
  onNewCommentChange: (value: string) => void;
  onAddComment: () => void;
};

const CommentSection = ({
  comments,
  currentUser,
  newComment,
  onNewCommentChange,
  onAddComment,
}: CommentSectionProps) => (
  <div className="mt-4 ml-12">
    <div className="mb-2">
      {comments.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-gray-100 dark:bg-[#23272f] rounded-lg px-3 py-2 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-xs text-gray-800 dark:text-gray-200">
                    {comment.user.name}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-xs">
                    {comment.timestamp}
                  </span>
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                  {comment.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="flex items-center gap-2 mt-2 mr-2">
      <img
        src={currentUser.avatar}
        alt={currentUser.name}
        className="w-8 h-8 rounded-full object-cover"
      />
      <input
        className="flex-1 bg-white dark:bg-[#181b20] text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2d323b] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => onNewCommentChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onAddComment();
        }}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onAddComment}
        disabled={!newComment.trim()}
      >
        Reply
      </button>
    </div>
  </div>
);

type TrendingPanelProps = {
  search: string;
  onSearchChange: (value: string) => void;
  trendingItems: typeof trending;
};

const TrendingPanel = ({
  search,
  onSearchChange,
  trendingItems,
}: TrendingPanelProps) => (
  <aside className="w-[340px] hidden lg:flex flex-col px-6 py-6 bg-white dark:bg-[#23272f]">
    <input
      type="text"
      placeholder="Search trends or hashtags..."
      className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-[#23272f] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <div className="bg-gray-100 dark:bg-[#181b20] rounded-xl p-4">
      <div className="font-bold text-lg text-gray-900 dark:text-white mb-4">{`What's happening`}</div>
      {trendingItems
        .filter(
          (t) =>
            t.category.toLowerCase().includes(search.toLowerCase()) ||
            t.tag.toLowerCase().includes(search.toLowerCase())
        )
        .map((t, i) => (
          <div key={i} className="mb-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t.category}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {t.tag}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {t.posts} posts
            </div>
          </div>
        ))}
      <button
        className="text-blue-500 dark:text-blue-400 hover:underline text-sm mt-2"
        onClick={showComingSoonToast}
      >
        Show more
      </button>
    </div>
  </aside>
);

type MobileNavProps = {
  onShowMobileTrending: () => void;
  onNotificationsClick: () => void;
  onMessagesClick: () => void;
  onBookmarksClick: () => void;
};

const MobileNav = ({
  onShowMobileTrending,
  onNotificationsClick,
  onMessagesClick,
  onBookmarksClick,
}: MobileNavProps) => (
  <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#23272f] border-t border-gray-200 dark:border-[#2d323b] flex justify-around items-center py-2 z-30">
    <SidebarIcon icon={<FiHome />} label="Home" />
    <button
      onClick={onShowMobileTrending}
      className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl focus:outline-none"
    >
      <FiSearch />
      <span className="text-[10px] mt-1">Search</span>
    </button>
    <SidebarIcon
      icon={<FiBell />}
      label="Notifications"
      onClick={onNotificationsClick}
    />
    <SidebarIcon icon={<FiMail />} label="Messages" onClick={onMessagesClick} />
    <SidebarIcon
      icon={<FiBookmark />}
      label="Bookmarks"
      onClick={onBookmarksClick}
    />
    <SidebarIcon
      icon={<FiStar />}
      label="Premium"
      onClick={showComingSoonToast}
    />
  </nav>
);

type MobileTrendingProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  trendingItems: typeof trending;
};

const MobileTrending = ({
  search,
  onSearchChange,
  onClose,
  trendingItems,
}: MobileTrendingProps) => (
  <div className="fixed inset-0 z-50 bg-white dark:bg-[#23272f] rounded-t-2xl shadow-lg w-full min-h-screen max-w-md mx-auto p-4 pt-8 overflow-y-auto flex flex-col">
    <button
      className="absolute top-2 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
      onClick={onClose}
      aria-label="Close"
    >
      <FiX />
    </button>
    <input
      type="text"
      placeholder="search here..."
      className="w-full px-4 py-2 mt-1 rounded-full bg-gray-100 dark:bg-[#23272f] border border-gray-200 dark:border-[#2d323b] text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      autoFocus
    />
    <div className="bg-gray-100 dark:bg-[#181b20] rounded-xl p-4">
      <div className="font-bold text-lg mb-4 text-gray-900 dark:text-white">{`What's happening`}</div>
      {trendingItems
        .filter(
          (t) =>
            t.category.toLowerCase().includes(search.toLowerCase()) ||
            t.tag.toLowerCase().includes(search.toLowerCase())
        )
        .map((t, i) => (
          <div key={i} className="mb-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t.category}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {t.tag}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {t.posts} posts
            </div>
          </div>
        ))}
      <button
        className="text-blue-500 dark:text-blue-400 hover:underline text-sm mt-2"
        onClick={showComingSoonToast}
      >
        Show more
      </button>
    </div>
  </div>
);

type PostModalProps = {
  newPost: string;
  setNewPost: (value: string) => void;
  onPost: () => void;
  onClose: () => void;
};

const PostModal = ({
  newPost,
  setNewPost,
  onPost,
  onClose,
}: PostModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white dark:bg-[#23272f] rounded-xl shadow-lg w-full max-w-lg mx-2 p-4 sm:p-8 relative">
      <button
        className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        <FiX />
      </button>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Create Post
      </h2>
      <textarea
        className="w-full h-32 p-4 rounded-lg bg-gray-100 dark:bg-[#181b20] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2d323b] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
        placeholder="What's happening?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        maxLength={280}
        autoFocus
      />
      <div className="flex justify-end">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onPost}
          disabled={!newPost.trim()}
        >
          Post
        </button>
      </div>
    </div>
  </div>
);

type ProfileDialogProps = {
  user: User;
  isFollowing: boolean;
  onFollowToggle: () => void;
  onClose: () => void;
  currentUser: User;
};

const ProfileDialog = ({
  user,
  isFollowing,
  onFollowToggle,
  onClose,
  currentUser,
}: ProfileDialogProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg w-full max-w-sm mx-4 p-6 relative">
      <button
        className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        <FiX />
      </button>
      <div className="flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
          {user.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-sm">
          {user.bio}
        </p>
        {user.username !== currentUser.username && (
          <button
            className={`mt-6 px-6 py-2 rounded-full font-semibold transition ${
              isFollowing
                ? "bg-transparent border border-gray-300 text-gray-800 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 dark:border-gray-500 dark:text-white"
                : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            }`}
            onClick={onFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
    </div>
  </div>
);

const NotificationsDialog = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 relative">
      <button
        className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        <FiX />
      </button>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Notifications
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-[#2d323b]/60">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="font-bold text-gray-900 dark:text-white">
                Sarah Lee
              </span>{" "}
              liked your post.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              2 hours ago
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-[#2d323b]/60">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="font-bold text-gray-900 dark:text-white">
                Michael
              </span>{" "}
              started following you.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              1 day ago
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MessagesDialog = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 relative flex flex-col h-[80vh] sm:h-auto sm:max-h-[80vh]">
      <div className="flex-shrink-0">
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Messages
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto no-scrollbar pr-2">
        <div className="flex flex-col gap-4">
          <div
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d323b]/60 cursor-pointer"
            onClick={showComingSoonToast}
          >
            <img
              src="https://randomuser.me/api/portraits/men/12.jpg"
              alt="user avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-900 dark:text-white">James</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2h ago
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hey, did you see the new design system update?
              </p>
            </div>
          </div>
          <div
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d323b]/60 cursor-pointer"
            onClick={showComingSoonToast}
          >
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="user avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-900 dark:text-white">
                  Michael
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1d ago
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Just checking in. How&apos;s the project going?
              </p>
            </div>
          </div>
          <div
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d323b]/60 cursor-pointer"
            onClick={showComingSoonToast}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-900 dark:text-white">
                  Sarah Lee
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3d ago
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Can you review the latest PR? I&apos;ve pushed the changes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 mt-4">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
          onClick={showComingSoonToast}
        >
          New Message
        </button>
      </div>
    </div>
  </div>
);

type BookmarksDialogProps = {
  posts: Post[];
  onClose: () => void;
  currentUser: User;
  followedUsers: string[];
  handleFollowToggle: (username: string) => void;
  openProfile: (user: User) => void;
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
  handleToggleComments: (id: number) => void;
  showComments: Record<number, boolean>;
  commentsByPost: Record<number, Comment[]>;
  newComment: Record<number, string>;
  setNewComment: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  handleAddComment: (postId: number) => void;
  openDropdown: string | null;
  handleDropdownToggle: (dropdownId: string) => void;
  dropdownContainerRef: React.RefObject<HTMLDivElement>;
};

const BookmarksDialog = ({
  posts,
  onClose,
  ...postCardProps
}: BookmarksDialogProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg w-full max-w-2xl mx-4 p-6 relative flex flex-col h-[90vh] sm:max-h-[80vh]">
      <div className="flex-shrink-0">
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Bookmarks
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto no-scrollbar pr-2 -mr-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} {...postCardProps} />
          ))
        ) : (
          <div className="text-center p-12 text-gray-500 dark:text-gray-400">
            <h2 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">
              No bookmarks yet
            </h2>
            <p>Save posts to easily find them again later.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ProfileDropdown = () => (
  <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-[#181b20] rounded-xl shadow-lg border border-gray-200 dark:border-[#2d323b] py-2 z-50">
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2d323b] transition flex items-center gap-3"
      onClick={showComingSoonToast}
    >
      <FiSettings className="text-lg text-gray-900 dark:text-white" />
      <span className="hidden md:inline text-gray-900 dark:text-white">
        Profile Settings
      </span>
    </button>
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2d323b] transition flex items-center gap-3"
      onClick={showComingSoonToast}
    >
      <FiHelpCircle className="text-lg text-gray-900 dark:text-white" />
      <span className="hidden md:inline text-gray-900 dark:text-white">
        Help & Support
      </span>
    </button>
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2d323b] transition flex items-center gap-3"
      onClick={showComingSoonToast}
    >
      <FiShield className="text-lg text-gray-900 dark:text-white" />
      <span className="hidden md:inline text-gray-900 dark:text-white">
        Privacy & Safety
      </span>
    </button>
    <div className="border-t border-gray-200 dark:border-[#2d323b] my-1"></div>
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2d323b] transition flex items-center gap-3 text-red-500 dark:text-red-400"
      onClick={showComingSoonToast}
    >
      <FiLogOut className="text-lg" />
      <span className="hidden md:inline">Log out</span>
    </button>
  </div>
);

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => (
  <div
    className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition ${
      active
        ? "bg-gray-100 dark:bg-[#2d323b] text-gray-900 dark:text-white font-bold"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2d323b] hover:text-gray-900 dark:hover:text-white"
    }`}
    onClick={onClick}
    tabIndex={0}
    role="button"
    onKeyDown={(e) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
    }}
  >
    <span className="text-2xl">{icon}</span>
    <span className="hidden md:inline text-lg">{label}</span>
  </div>
);

function SidebarIcon({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl focus:outline-none"
      onClick={onClick}
    >
      {icon}
      <span className="text-[10px] mt-1">{label}</span>
    </button>
  );
}
