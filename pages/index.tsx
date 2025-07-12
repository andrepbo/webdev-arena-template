"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share,
  Search,
  Home,
  Bell,
  Mail,
  LogOut,
  Send,
  Menu,
  X,
} from "lucide-react";
import { Knewave } from "next/font/google";
import { Mukta } from "next/font/google";
import { toast, Toaster } from "sonner";

const knewave = Knewave({
  weight: "400",
  subsets: ["latin"],
});
const mukta = Mukta({
  weight: "400",
  subsets: ["latin"],
});
interface Comment {
  id: string;
  author: string;
  username: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface Post {
  id: string;
  author: string;
  username: string;
  timestamp: string;
  avatar: string;
  image: string;
  content: string;
  likes: number;
  comments: Comment[];
  featured?: boolean;
  isLiked: boolean;
}

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  read: boolean;
  postId?: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const mockUserProfile = {
  id: "user-1",
  name: "Elena Petrova",
  username: "elenapotr",
  bio: "Outdoor enthusiast and hiking blogger. Exploring mountains and trails around the world. Documenting adventures one hike at a time!",
  stats: {
    hikes: 42,
    followers: 127,
    following: 89,
    posts: 24,
  },
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    userId: "1",
    username: "@jameshikeron",
    content: "liked your post about hiking trails",
    timestamp: "2m ago",
    read: false,
    postId: "1",
  },
  {
    id: "2",
    type: "comment",
    userId: "2",
    username: "@M.jaspion",
    content: "commented on your recent hike photos",
    timestamp: "15m ago",
    read: false,
    postId: "1",
  },
  {
    id: "3",
    type: "follow",
    userId: "4",
    username: "@MarioHiker",
    content: "started following you",
    timestamp: "1h ago",
    read: true,
  },
  {
    id: "4",
    type: "mention",
    userId: "3",
    username: "@thehiklan",
    content: "mentioned you in a post about gear",
    timestamp: "3h ago",
    read: true,
    postId: "3",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "James Hikeron",
    senderUsername: "@jameshikeron",
    content: "Hey, are you joining the hike this weekend?",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "2",
    senderId: "2",
    senderName: "Emily Jaspion",
    senderUsername: "@M.jaspion",
    content: "Found an amazing new trail we should try!",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "3",
    senderId: "3",
    senderName: "TheHiklan",
    senderUsername: "@thehiklan",
    content: "Your photos from the last hike were incredible!",
    timestamp: "1 week ago",
    read: true,
  },
  {
    id: "4",
    senderId: "4",
    senderName: "Mario Hiker",
    senderUsername: "@MarioHiker",
    content: "Can you recommend any good hiking boots?",
    timestamp: "Just now",
    read: false,
  },
];

const initialPost = [
  {
    id: "1",
    author: "James Hikeron",
    username: "@jameshikeron",
    timestamp: "2 hours ago",
    avatar: "",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "Hiking is a refreshing escape into nature, offering scenic views, physical activity, and peace of mind. It's a perfect way to disconnect from screens and reconnect with the natural world around you.",
    likes: 142,
    comments: [
      {
        id: "1",
        author: "James Wilson",
        username: "@jameswilson",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        timestamp: "1 hour ago",
        avatar: "",
      },
      {
        id: "2",
        author: "Emily Jaspion",
        username: "@M.jaspion",
        content:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
        timestamp: "1 hour ago",
        avatar: "",
      },
    ],
    featured: true,
    isLiked: false,
  },
  {
    id: "2",
    author: "Peter Melon",
    username: "@pettermelon",
    timestamp: "2 hours ago",
    avatar: "",
    image:
      "https://plus.unsplash.com/premium_photo-1677002240252-af3f88114efc?q=80&w=1125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "Explore winding forest paths, climb rugged mountains, or stroll peaceful meadows—hiking offers a variety of experiences that challenge the body while calming the soul. Every trail is a new adventure.",
    likes: 142,
    comments: [],
    isLiked: false,
  },
  {
    id: "3",
    author: "TheHiklan",
    username: "@thehiklan",
    timestamp: "3 hours ago",
    avatar: "",
    image:
      "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "From short day hikes to multi-day backpacking trips, hiking brings you closer to nature's beauty. It's an activity that fosters well-being, endurance, and a deep appreciation for the outdoors.",
    likes: 142,
    comments: [],
    isLiked: false,
  },
  {
    id: "4",
    author: "Mario Hiker",
    username: "@MarioHiker",
    timestamp: "2 hours ago",
    avatar: "",
    image:
      "https://plus.unsplash.com/premium_photo-1661814278311-d59ab0b4a676?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "Mountain peaks and valley views await those who venture into the wilderness.",
    likes: 89,
    comments: [],
    isLiked: false,
  },
  {
    id: "5",
    author: "JayHik",
    username: "@jayhik",
    timestamp: "2 hours ago",
    avatar: "",
    image:
      "https://images.unsplash.com/photo-1463694775559-eea25626346b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Trail adventures and outdoor exploration.",
    likes: 67,
    comments: [],
    isLiked: false,
  },
];

export default function HikingBlog() {
  const [posts, setPosts] = useState<Post[]>(initialPost);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPost);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [messages] = useState<Message[]>(mockMessages);
  const [unreadCount] = useState({
    notifications: mockNotifications.filter((n) => !n.read).length,
    messages: mockMessages.filter((m) => !m.read).length,
  });

  const openNotificationsModal = () => setIsNotificationsModalOpen(true);
  const openMessagesModal = () => setIsMessagesModalOpen(true);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    const commentText = newComments[postId];
    if (!commentText?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Elena Petrova",
      username: "@elenapotr",
      content: commentText,
      timestamp: "now",
      avatar: "",
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setNewComments({ ...newComments, [postId]: "" });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleShare = async (id: string) => {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.href + "#post-" + id);
    toast.success("Copied to clipboard!", {
      position: "bottom-center",
      style: {
        backgroundColor: "#FFAF4C",
        color: "white",
        fontSize: "0.875rem",
      },
    });
  };

  const comingSoonToast = () => {
    toast("Coming soon");
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPosts(posts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = posts.filter((post) => {
      return (
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.comments.some(
          (comment) =>
            comment.content.toLowerCase().includes(query) ||
            comment.author.toLowerCase().includes(query)
        )
      );
    });
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  return (
    <div
      className={`${mukta.className} h-full bg-[#262A10] text-white md:py-[50px] md:px-[75px] xl:px-[100px]`}
    >
      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="xl:flex flex-col hidden w-80 h-screen gap-5">
          <div className="xl:block  bg-[#474E22] rounded-[10px] p-6">
            <div className="mb-8">
              <h1
                className={`text-[40px] font-bold text-white italic ${knewave.className}`}
              >
                HikeHub
              </h1>
            </div>

            <nav className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-[#a8b899] cursor-pointer">
                <Home size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Feed</span>
              </div>
              <div
                className="flex items-center gap-3 text-[#a8b899] cursor-pointer"
                onClick={() => openNotificationsModal()}
              >
                <Bell size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Notifications</span>
                <Badge className="bg-[#FFAF4C] text-black font-semibold text-[10px] aspect-square rounded-full  min-w-[20px] min-h-[20px] flex items-center justify-center p-0">
                  {unreadCount.notifications}
                </Badge>
              </div>
              <div
                className="flex items-center gap-3 text-[#a8b899] cursor-pointer"
                onClick={() => openMessagesModal()}
              >
                <Mail size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Messages</span>
                <Badge className="bg-[#FFAF4C] text-black font-semibold text-[10px] aspect-square rounded-full  min-w-[20px] min-h-[20px] flex items-center justify-center p-0">
                  {unreadCount.messages}
                </Badge>
              </div>
            </nav>

            <div className="mb-8" onClick={() => comingSoonToast()}>
              <div className="flex items-center gap-3 text-[#a8b899] cursor-pointer">
                <LogOut size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Logout</span>
              </div>
            </div>
            <div className="">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={openProfileModal}
              >
                <Avatar className="w-10 h-10 border border-[#FFAF4C]">
                  <AvatarFallback className="text-[#012F63] bg-white">
                    EP
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium">Elena Petrova</div>
                  <div className="text-[#a8b899] text-sm">@elenapotr</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[black]"
              size={20}
            />
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search article"
              className="pl-10 bg-white text-black border-none rounded-lg text-[16px] placeholder:text-black"
            />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="xl:hidden">
          <header className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-[#474E22] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1
                className={`text-2xl font-bold text-white italic ${knewave.className}`}
              >
                HikeHub
              </h1>
            </div>

            <Avatar
              className="w-10 h-10 border border-[#FFAF4C] cursor-pointer"
              onClick={openProfileModal}
            >
              <AvatarFallback className="text-[#012F63] bg-white">
                EP
              </AvatarFallback>
            </Avatar>
          </header>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-40 bg-[#474E22] transform ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 xl:hidden`}
          >
            <div className="p-6 pt-20 h-full flex flex-col">
              <nav className="space-y-6 mb-8 flex-1">
                <div className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2">
                  <Home size={24} color="#FFAF4C" />
                  <span
                    className="text-xl font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Feed
                  </span>
                </div>
                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => {
                    openNotificationsModal();
                    setMobileMenuOpen(false);
                  }}
                >
                  <Bell size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Notifications</span>
                  <Badge className="bg-[#FFAF4C] text-black font-semibold text-xs px-2 min-w-[20px] min-h-[20px] py-1 aspect-square rounded-full">
                    {unreadCount.notifications}
                  </Badge>
                </div>
                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => {
                    openMessagesModal();
                    setMobileMenuOpen(false);
                  }}
                >
                  <Mail size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Messages</span>
                  <Badge className="bg-[#FFAF4C] text-black text-xs px-2 py-1 min-w-[20px] min-h-[20px] aspect-square rounded-full">
                    {unreadCount.messages}
                  </Badge>
                </div>

                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Logout</span>
                </div>
              </nav>

              <div className="flex items-center gap-3 pb-4">
                <Avatar className="w-12 h-12 border border-[#FFAF4C]">
                  <AvatarFallback className="text-[#012F63] bg-white">
                    EP
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium text-lg">
                    Elena Petrova
                  </div>
                  <div className="text-[#a8b899] text-sm">@elenapotr</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 xl:px-8 xl:py-0 p-4 pt-20 md:px-0">
          <div className="max-w-4xl mx-auto">
            <div className=" mb-8 xl:flex border-b border-b-white items-center pb-4">
              <h1
                className={`${knewave.className} w-2/3 text-[25px] md:text-[40px] font-bold text-white italic mb-2`}
              >
                Trail Explorations
              </h1>
              <p className="text-[#a8b899]">
                Discover breathtaking trails, share your hiking experiences, and
                connect with fellow outdoor enthusiasts.
              </p>
            </div>
            <div className="relative xl:hidden mb-6">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[black]"
                size={20}
              />
              <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search article"
                className="pl-10 bg-white text-black border-none rounded-lg text-[16px] placeholder:text-black"
              />
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className=" text-center py-12 items-center h-screen">
                <h1 className="text-[#FFAF4C] text-2xl font-bold mb-2 content-center">
                  No posts found
                </h1>
              </div>
            ) : (
              <div className="columns-1 xl:columns-2 gap-6 items-start">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#54442B] rounded-lg overflow-hidden break-inside-avoid mb-6"
                  >
                    <div className="p-4 flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="text-[#012F63] bg-white">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 justify-between">
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                            <span className="text-[#FFAF4C] text-[20px] font-bold">
                              {post.author}
                            </span>
                            <span className="text-[white]text-sm">
                              {post.username}
                            </span>
                          </div>
                          {post.featured && (
                            <Badge className="bg-[#D1FF3A] text-black text-xs px-2 py-1 hover:bg-[#D1FF3A] rounded content-end md:self-center self-start">
                              FEATURED
                            </Badge>
                          )}
                        </div>
                        <div className="text-[white] text-sm self-end">
                          {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-video">
                      <img
                        src={post.image}
                        alt="Hiking post"
                        className="object-cover"
                      />
                    </div>
                    <div className="mb-4 flex-1">
                      <p className="text-[white] mb-4 leading-relaxed border-b border-b-[#262A10] p-4">
                        {post.content}
                      </p>
                    </div>
                    <div className="mb-4 px-4">
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center justify-evenly gap-5">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex pr-1 items-center gap-2 ${
                              post.isLiked ? "text-red-500" : "text-orange-400"
                            } hover:text-orange-300`}
                          >
                            <Heart
                              size={18}
                              fill={post.isLiked ? "#FFAF4C" : "transparent"}
                              color="#FFAF4C"
                            />
                            <span
                              className={`${knewave.className} font-medium text-white  min-w-[30px]`}
                            >
                              {post.likes}
                            </span>
                          </button>
                          <div className="flex items-center justify-end gap-2 text-orange-400">
                            <MessageCircle size={18} color="#FFAF4C" />
                            <span
                              className={`${knewave.className} font-medium text-white`}
                            >
                              {post.comments.length}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleShare(post.id)}
                          className="flex items-center gap-2 text-orange-400 hover:text-orange-300"
                        >
                          <Share size={18} color="#FFAF4C" />
                          <span
                            className={`${knewave.className} font-medium text-white`}
                          >
                            Share
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#42331C] mt-auto">
                      {post.comments.length > 0 ? (
                        <div className="space-y-3 p-4 pb-0">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback className="text-[#012F63] bg-white">
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col bg-[#474E22] rounded-[10px] p-4">
                                <div className="flex items-center gap-2 mb-1 justify-between">
                                  <div>
                                    <span className="text-[#FFAF4C] font-bold text-[16px] mr-1 ">
                                      {comment.author}
                                    </span>
                                    <span className="text-[white] text-xs">
                                      {comment.username}
                                    </span>
                                  </div>
                                  <span className="text-[white] text-xs">
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-[#d0d0d0] text-sm leading-relaxed self-start">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <MessageCircle
                            size={24}
                            color="#FFAF4C"
                            className="mx-auto mb-2"
                          />
                          <p className="text-[#FFAF4C] font-medium">
                            No comments yet
                          </p>
                          <p className="text-white text-sm">
                            Be the first to share your thoughts!
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-[#42331C] mt-auto flex gap-3 px-4 py-3 sticky bottom-0">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-[#012F63] bg-white">
                          EP
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex relative">
                        <Input
                          placeholder="Add a comment..."
                          value={newComments[post.id] || ""}
                          onChange={(e) =>
                            setNewComments({
                              ...newComments,
                              [post.id]: e.target.value,
                            })
                          }
                          className="bg-[#54442B] border-none text-white placeholder:text-[#a8b899] flex-1 rounded-full pl-4 pr-12 focus-visible:border-white"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            newComments[post.id]?.trim() &&
                            handleComment(post.id)
                          }
                        />
                        <Button
                          onClick={() => handleComment(post.id)}
                          size="sm"
                          disabled={!newComments[post.id]?.trim()}
                          className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent shadow-none p-0 w-10 h-10 ${
                            !newComments[post.id]?.trim()
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <Send size={18} color="#FFAF4C" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />

      {isNotificationsModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsNotificationsModalOpen(false)}
        >
          <div
            className="bg-[#54442B] rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#FFAF4C] flex justify-between items-center">
              <h2 className="text-[#FFAF4C] text-xl font-bold">
                Notifications
              </h2>
              <button onClick={() => setIsNotificationsModalOpen(false)}>
                <X size={24} color="#FFAF4C" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {notifications.map((notification) => {
                const user = initialPost.find(
                  (p) => p.id === notification.userId
                ) || {
                  author: "Unknown User",
                  username: notification.username,
                  avatar: "",
                };

                return (
                  <div key={notification.id} className="flex gap-3 items-start">
                    <Avatar className="w-10 h-10 border border-[#FFAF4C]">
                      <AvatarFallback className="bg-white text-[#262A10]">
                        {user.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-[#FFAF4C]">
                          {user.author}
                        </span>
                        <span className="text-xs text-[#a8b899]">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-white">{notification.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isMessagesModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsMessagesModalOpen(false)}
        >
          <div
            className="bg-[#54442B] rounded-lg w-full max-w-full sm:max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#FFAF4C] flex justify-between items-center sticky top-0 bg-[#54442B] z-10">
              <h2 className="text-[#FFAF4C] text-xl font-bold">Messages</h2>
              <button onClick={() => setIsMessagesModalOpen(false)}>
                <X size={24} color="#FFAF4C" />
              </button>
            </div>
            <div className="p-2 sm:p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 items-center pb-3 `}
                >
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-[#FFAF4C] flex-shrink-0">
                    <AvatarFallback className="bg-white text-[#262A10]">
                      {message.senderName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-[#FFAF4C] truncate mr-2">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-[#a8b899] whitespace-nowrap">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-white truncate text-sm sm:text-base">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div
            className="bg-[#54442B] rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#FFAF4C] flex justify-between items-center sticky top-0 bg-[#54442B] z-10">
              <h2 className="text-[#FFAF4C] text-xl font-bold">Your Profile</h2>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X size={24} color="#FFAF4C" />
              </button>
            </div>
            <div className="p-6 flex flex-col">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-24 h-24 border-4 border-[#FFAF4C] mb-4">
                  <AvatarFallback className="bg-white text-3xl text-[#262A10]">
                    {mockUserProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-[#FFAF4C]">
                  {mockUserProfile.name}
                </h3>
                <p className="text-[#a8b899] mb-4">
                  @{mockUserProfile.username}
                </p>
                <p className="text-white text-center mb-6">
                  {mockUserProfile.bio}
                </p>

                <div className="grid grid-cols-4 gap-2 w-full mb-6">
                  <div className="bg-[#42331C] rounded-lg p-2 text-center">
                    <p className="text-[#FFAF4C] font-bold text-lg">
                      {mockUserProfile.stats.hikes}
                    </p>
                    <p className="text-white text-xs">Hikes</p>
                  </div>
                  <div className="bg-[#42331C] rounded-lg p-2 text-center">
                    <p className="text-[#FFAF4C] font-bold text-lg">
                      {mockUserProfile.stats.posts}
                    </p>
                    <p className="text-white text-xs">Posts</p>
                  </div>
                  <div className="bg-[#42331C] rounded-lg p-2 text-center">
                    <p className="text-[#FFAF4C] font-bold text-lg">
                      {mockUserProfile.stats.followers}
                    </p>
                    <p className="text-white text-xs">Followers</p>
                  </div>
                  <div className="bg-[#42331C] rounded-lg p-2 text-center">
                    <p className="text-[#FFAF4C] font-bold text-lg">
                      {mockUserProfile.stats.following}
                    </p>
                    <p className="text-white text-xs">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
