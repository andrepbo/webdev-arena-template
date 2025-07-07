import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaQuestionCircle,
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaFlag,
  FaBookmark,
  FaShieldAlt,
  FaCog,
  FaComment,
  FaShare,
  FaCheck,
} from "react-icons/fa";
import { BsChatHeartFill } from "react-icons/bs";
import { Toast } from "@radix-ui/react-toast";

type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type RecevingToast = {
  showToast: (message: string, type: "success" | "error" | "info") => void;
};

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timers = toasts.map((toast) => {
      return setTimeout(() => {
        onDismiss(toast.id);
      }, 5000);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, onDismiss]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-4 max-w-xs w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 translate-y-0 opacity-100 bg-white"
        >
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0">
              {toast.type === "success" && (
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100 text-green-500">
                  ✓
                </div>
              )}
              {toast.type === "error" && (
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-500">
                  !
                </div>
              )}
              {toast.type === "info" && (
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#eeeffc] text-[#222aa5]">
                  i
                </div>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {toast.message}
              </p>
            </div>
            <button
              className="ml-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => onDismiss(toast.id)}
              aria-label="Close notification"
            >
              <svg
                className="h-5 w-5"
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
      ))}
    </div>
  );
}

const Header = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <header className="bg-[#f9f8fd] flex flex-col sm:flex-row justify-between items-center sm:px-8 py-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <div className="bg-[#6381d6] rounded-full w-10 h-10 flex justify-center items-center relative ml-4">
          <BsChatHeartFill className="text-white text-xl" />
          <FaHeart className="text-white text-xs absolute" />
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Special Connect
        </h1>
      </div>

      <div className="flex-1 max-w-full sm:max-w-[600px] mx-0 sm:mx-8 relative mb-4 sm:mb-0">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts, people, resources..."
          className="w-full pl-10 pr-4 py-2 rounded-full border text-black border-gray-300 text-sm focus:outline-none focus:border-blue-400 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 mr-8">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover"
        />
        <div className="flex flex-col text-center sm:text-left">
          <p className="text-sm font-semibold text-black">{user.name}</p>
          <p className="text-xs text-gray-600">{user.email}</p>
        </div>
      </div>
    </header>
  );
};

const Menu = ({ showToast }: RecevingToast) => {
  const selectedMenu = "Home";
  const eventNotifications = 3;

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Community", icon: <FaUsers /> },
    {
      name: "Events",
      icon: <FaCalendarAlt />,
      notifications: eventNotifications,
    },
    { name: "Milestones", icon: <FaFlag /> },
    { name: "Saved Posts", icon: <FaBookmark /> },
  ];

  function genericToast(message: string) {
    showToast(message, "info");
  }

  return (
    <div className="bg-white w-full rounded-xl p-6 flex flex-col gap-6 shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
              selectedMenu === item.name
                ? "bg-[#222aa5] text-white"
                : "text-[#9593bb] hover:bg-gray-100"
            }`}
            onClick={() => {
              if (item.name !== "Home") {
                genericToast("To be developed");
              }
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="flex-1">{item.name}</span>
            {item.notifications && (
              <span className="bg-[#222aa5] text-white text-xs font-bold px-2 py-1 rounded-full">
                {item.notifications}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MyGroups = ({ showToast }: RecevingToast) => {
  const groups = [
    { id: 1, name: "Autism Support NYC", members: 1200 },
    { id: 2, name: "Tech Enthusiasts", members: 600 },
    { id: 3, name: "Fitness Freaks", members: 3500 },
  ];

  const formatMembers = (count: number) => {
    return count >= 1000
      ? `${(count / 1000).toFixed(1)}k members`
      : `${count} members`;
  };

  return (
    <div className="bg-white w-full rounded-xl p-6 flex flex-col gap-6 shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">My Groups</h2>
      <ul className="space-y-4">
        {groups.map((group) => (
          <li key={group.id} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#eeeffc] flex items-center justify-center">
              <FaUsers className="text-[#222aa5] text-lg" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {group.name}
              </p>
              <p className="text-xs text-gray-600">
                {formatMembers(group.members)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => showToast("To be developed", "info")}
        className="w-full mt-4 py-2 rounded-lg bg-[#eeeffc] text-[#222aa5] font-semibold text-sm hover:bg-[#dcdcf7] transition-colors"
      >
        Discover Groups
      </button>
    </div>
  );
};

const HelpSection = ({ showToast }: RecevingToast) => {
  const helpItems = [
    { name: "Help Center", icon: <FaQuestionCircle /> },
    { name: "Safe Center", icon: <FaShieldAlt /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="bg-white w-full rounded-xl p-6 flex flex-col gap-6 shadow-md">
      <ul className="space-y-4">
        {helpItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-[#9593bb] hover:bg-gray-100"
            onClick={() => showToast("To be developed", "info")}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-semibold">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Sidebar = ({ showToast }: RecevingToast) => {
  return (
    <div className="space-y-6">
      <Menu showToast={showToast} />
      <MyGroups showToast={showToast} />
      <HelpSection showToast={showToast} />
    </div>
  );
};

const CreatePost = () => {
  const user = {
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <div className="bg-white w-full rounded-xl p-6 flex items-center gap-4 shadow-md">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <input
        type="text"
        placeholder="What's happening? Share an update..."
        className="flex-1 px-4 py-2 border rounded-full text-sm text-black border-gray-300 focus:outline-none focus:border-blue-400"
      />
    </div>
  );
};

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  message: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
}

const Post = ({
  post,
  toggleLike,
  toggleSave,
  showToast,
}: {
  post: Post;
  toggleLike: (postId: number) => void;
  toggleSave: (postId: number) => void;
  showToast: (message: string, type: "success" | "error" | "info") => void;
}) => {
  return (
    <div className="bg-white w-full rounded-xl p-6 flex flex-col gap-4 shadow-md">
      {/* Header do post */}
      <div className="flex items-start gap-4">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {post.user.name}
          </p>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
      </div>

      {/* Mensagem */}
      <p className="text-sm text-gray-800">{post.message}</p>

      {/* Imagem */}
      <img
        src={post.image}
        alt="Post"
        className="w-full rounded-lg object-cover"
      />

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Ações */}
      <div className="flex items-center justify-between">
        {/* Botões de ação */}
        <div className="flex items-center gap-4">
          {/* Like */}
          <button
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
              post.isLiked
                ? "bg-[#f7f4fd] text-[#353bac]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => toggleLike(post.id)}
          >
            <FaHeart />
            <span>{post.likes}</span>
          </button>

          {/* Comentários */}
          <button
            onClick={() => showToast("To be developed", "info")}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            <FaComment />
            <span>{post.comments}</span>
          </button>

          {/* Compartilhar */}
          <button
            onClick={() => showToast("To be developed", "info")}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            <FaShare />
            <span>{post.shares}</span>
          </button>
        </div>

        {/* Salvar */}
        <button
          className={`text-lg ${
            post.isSaved ? "text-[#222aa5]" : "text-gray-600"
          }`}
          onClick={() => toggleSave(post.id)}
        >
          <FaBookmark />
        </button>
      </div>
    </div>
  );
};

const PostArea = ({ showToast }: RecevingToast) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      time: "2 hours ago",
      message: "Had a great day at the park!",
      image: "https://picsum.photos/600/300",
      likes: 12,
      comments: 4,
      shares: 2,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      user: {
        name: "Mark Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      time: "1 day ago",
      message: "Check out this amazing sunset!",
      image: "https://picsum.photos/600/300",
      likes: 45,
      comments: 10,
      shares: 5,
      isLiked: true,
      isSaved: true,
    },
  ]);

  const toggleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleSave = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Campo para criar post */}
      <CreatePost />

      {/* Lista de posts */}
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          toggleLike={toggleLike}
          toggleSave={toggleSave}
          showToast={showToast}
        />
      ))}
    </div>
  );
};

const TrendingTopics = () => {
  const topics = [
    { name: "#InclusiveEvents", posts: 120 },
    { name: "#TechForAll", posts: 85 },
    { name: "#HealthMatters", posts: 45 },
  ];

  return (
    <div className="bg-white w-full mx-auto rounded-xl p-6 flex flex-col gap-4 shadow-md">
      <h2 className="text-lg font-bold text-gray-800">Trending Topics</h2>
      <ul className="space-y-4">
        {topics.map((topic, index) => (
          <li key={index} className="flex flex-col">
            <p className="text-sm font-semibold text-[#222aa5]">{topic.name}</p>
            <p className="text-xs text-[#45464f]">{topic.posts} posts</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SuggestedProfessionals = () => {
  const [followed, setFollowed] = useState<number[]>([]); // Armazena os IDs dos profissionais seguidos

  const professionals = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      specialization: "Occupational Therapist",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      specialization: "Physical Therapist",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 3,
      name: "Emily Johnson",
      specialization: "Speech Therapist",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];

  const toggleFollow = (id: number) => {
    setFollowed((prev) =>
      prev.includes(id)
        ? prev.filter((followedId) => followedId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white w-full mx-auto rounded-xl p-6 flex flex-col gap-4 shadow-md">
      <h2 className="text-lg font-bold text-gray-800">
        Suggested Professionals
      </h2>
      <ul className="space-y-4">
        {professionals.map((professional) => (
          <li
            key={professional.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={professional.avatar}
                alt={professional.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {professional.name}
                </p>
                <p className="text-xs text-gray-600">
                  {professional.specialization}
                </p>
              </div>
            </div>
            <button
              className={`px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                followed.includes(professional.id)
                  ? "bg-green-100 text-green-600"
                  : "bg-[#eeeffc] text-[#222aa5] hover:bg-[#dcdcf7]"
              }`}
              onClick={() => toggleFollow(professional.id)}
            >
              {followed.includes(professional.id) ? (
                <>
                  <FaCheck className="text-green-600" />
                  Following
                </>
              ) : (
                "Follow"
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ThirdColumn = () => {
  return (
    <div className="flex flex-col gap-6">
      <TrendingTopics />
      <SuggestedProfessionals />
    </div>
  );
};

const PageLayout = ({ showToast }: RecevingToast) => {
  return (
    <div className="min-h-screen bg-[#edeef5] grid grid-cols-1 lg:grid-cols-12 gap-4 py-8 px-12">
      {/* Sidebar Menu */}
      <div className="lg:col-span-3">
        <Sidebar showToast={showToast} />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-6">
        <PostArea showToast={showToast} />
      </div>

      {/* Trending Topics and Suggested Professionals */}
      <div className="lg:col-span-3">
        <ThirdColumn />
      </div>
    </div>
  );
};

const Page = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f9f8fd]">
      <Header />
      <PageLayout showToast={showToast} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default Page;
