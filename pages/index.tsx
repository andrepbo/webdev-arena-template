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

const initialPost = [
  {
    id: "1",
    author: "James Hikeron",
    username: "@jameshikeron",
    timestamp: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
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
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "2",
        author: "Emily Jaspion",
        username: "@M.jaspion",
        content:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
        timestamp: "1 hour ago",
        avatar: "/placeholder.svg?height=32&width=32",
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
    avatar: "/placeholder.svg?height=40&width=40",
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
    avatar: "/placeholder.svg?height=40&width=40",
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
    avatar: "/placeholder.svg?height=40&width=40",
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
    avatar: "/placeholder.svg?height=40&width=40",
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
      avatar: "/placeholder.svg?height=32&width=32",
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

  const handleShare = () => {
    // Share functionality
    commingSoonToast();
  };

  const commingSoonToast = () => {
    toast("Comming soon");
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
      className={`${mukta.className} min-h-screen bg-[#262A10] text-white md:py-[50px] md:px-[100px]`}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {svgBg}
      </div>
      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <div className="md:flex flex-col hidden w-80 h-screen gap-5">
          <div className="lg:block  bg-[#474E22] rounded-[10px] p-6">
            <div className="mb-8">
              <h1
                className={`text-[40px] font-bold text-white italic ${knewave.className}`}
              >
                HikeHub
              </h1>
            </div>

            <nav className="space-y-4 mb-8">
              <div
                className="flex items-center gap-3 text-[#a8b899] cursor-pointer"
                onClick={() => commingSoonToast()}
              >
                <Home size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Feed</span>
              </div>
              <div
                className="flex items-center gap-3 text-[#a8b899] cursor-pointer"
                onClick={() => commingSoonToast()}
              >
                <Bell size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Notifications</span>
                <Badge className="bg-[#FFAF4C] text-black font-semibold text-[10px] aspect-square rounded-full  min-w-[20px] min-h-[20px] flex items-center justify-center p-0">
                  1
                </Badge>
              </div>
              <div
                className="flex items-center gap-3 text-[#a8b899] cursor-pointer"
                onClick={() => commingSoonToast()}
              >
                <Mail size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Messages</span>
                <Badge className="bg-[#FFAF4C] text-black font-semibold text-[10px] aspect-square rounded-full  min-w-[20px] min-h-[20px] flex items-center justify-center p-0">
                  1
                </Badge>
              </div>
            </nav>

            <div className="mb-8" onClick={() => commingSoonToast()}>
              <div className="flex items-center gap-3 text-[#a8b899] cursor-pointer">
                <LogOut size={20} color="#FFAF4C" />
                <span className="text-[18px] font-semibold">Logout</span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-[#FFAF4C]">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>EP</AvatarFallback>
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
        <div className="md:hidden">
          <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#474E22] p-4 flex items-center justify-between">
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

            <Avatar className="w-10 h-10 border border-[#FFAF4C]">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>EP</AvatarFallback>
            </Avatar>
          </header>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-40 bg-[#474E22] transform ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:hidden`}
          >
            <div className="p-6 pt-20 h-full flex flex-col">
              <nav className="space-y-6 mb-8 flex-1">
                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => commingSoonToast()}
                >
                  <Home size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Feed</span>
                </div>
                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => commingSoonToast()}
                >
                  <Bell size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Notifications</span>
                  <Badge className="bg-[#FFAF4C] text-black font-semibold text-xs px-2 py-1 rounded-full">
                    1
                  </Badge>
                </div>
                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => commingSoonToast()}
                >
                  <Mail size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Messages</span>
                  <Badge className="bg-[#FFAF4C] text-black text-xs px-2 py-1 rounded-full">
                    1
                  </Badge>
                </div>

                <div
                  className="flex items-center gap-3 text-[#a8b899] cursor-pointer py-2"
                  onClick={() => commingSoonToast()}
                >
                  <LogOut size={24} color="#FFAF4C" />
                  <span className="text-xl font-semibold">Logout</span>
                </div>
              </nav>

              <div className="flex items-center gap-3 pb-4">
                <Avatar className="w-12 h-12 border border-[#FFAF4C]">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>EP</AvatarFallback>
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
        <div className="flex-1 lg:px-8 lg:py-0 p-4 pt-20">
          <div className="max-w-4xl mx-auto">
            {/* Header - Hidden on mobile */}
            <div className=" mb-8 lg:flex border-b border-b-white items-center pb-4">
              <h1
                className={`${knewave.className} w-2/3 text-[20px] md:text-[40px] font-bold text-white italic mb-2`}
              >
                Trail Explorations
              </h1>
              <p className="text-[#a8b899]">
                Discover breathtaking trails, share your hiking experiences, and
                connect with fellow outdoor enthusiasts.
              </p>
            </div>
            <div className="relative md:hidden mb-6">
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
            <div className="columns-1 lg:columns-2 gap-6 items-start">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#54442B] rounded-lg overflow-hidden break-inside-avoid mb-6"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
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
                          <Badge className="bg-[#D1FF3A] text-black text-xs px-2 py-1 rounded content-end md:self-center self-start">
                            FEATURED
                          </Badge>
                        )}
                      </div>
                      <div className="text-[white] text-sm self-end">
                        {post.timestamp}
                      </div>
                    </div>
                  </div>
                  {/* Post Image */}
                  <div className="relative aspect-video">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Hiking post"
                      className="object-cover"
                    />
                  </div>
                  {/* Post Content */}
                  <div className="mb-4 flex-1">
                    <p className="text-[white] mb-4 leading-relaxed border-b border-b-[#262A10] p-4">
                      {post.content}
                    </p>
                  </div>
                  <div className="mb-4 px-4">
                    {/* Post Actions */}
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 ${
                            post.isLiked ? "text-red-500" : "text-orange-400"
                          } hover:text-orange-300`}
                        >
                          <Heart
                            size={18}
                            fill={post.isLiked ? "currentColor" : "none"}
                            color="#FFAF4C"
                          />
                          <span
                            className={`${knewave.className} font-medium text-white`}
                          >
                            {post.likes}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 text-orange-400">
                          <MessageCircle size={18} color="#FFAF4C" />
                          <span
                            className={`${knewave.className} font-medium text-white`}
                          >
                            {post.comments.length}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleShare()}
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
                  {post.comments.length > 0 && (
                    <div className="bg-[#42331C] mt-auto">
                      <>
                        <div className="space-y-3 p-4 pb-0">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage
                                  src={comment.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col bg-[#474E22] rounded-[10px] p-4">
                                <div className="flex items-center gap-2 mb-1 justify-between">
                                  <div>
                                    <span className="text-[#FFAF4C] font-bold text-[16px] ">
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
                      </>
                    </div>
                  )}
                  {/* Add Comment */}
                  <div className="bg-[#42331C] mt-auto flex gap-3 px-4 py-3 sticky bottom-0">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>EP</AvatarFallback>
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
                        className="bg-[#54442B] border-none text-white placeholder-[#a8b899] flex-1 rounded-full pl-4 pr-12"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleComment(post.id)
                        }
                      />
                      <Button
                        onClick={() => handleComment(post.id)}
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent shadow-none p-0 w-10 h-10"
                      >
                        <Send size={18} color="#FFAF4C" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const svgBg = (
  <svg
    width="1441"
    height="791"
    viewBox="0 0 1441 791"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <mask
      id="mask0_10001_2046"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="1441"
      height="791"
    >
      <rect
        x="0.115967"
        y="0.306641"
        width="1440"
        height="790.693"
        fill="url(#paint0_linear_10001_2046)"
      />
    </mask>
    <g mask="url(#mask0_10001_2046)">
      <g
        style={{ mixBlendMode: "exclusion" }}
        filter="url(#filter0_f_10001_2046)"
      >
        <rect
          x="-13.6891"
          y="-24.6355"
          width="1467.61"
          height="978.884"
          fill="url(#pattern0_10001_2046)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_10001_2046"
        x="-25.8891"
        y="-36.8355"
        width="1492.01"
        height="1003.28"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="6.1"
          result="effect1_foregroundBlur_10001_2046"
        />
      </filter>
      <pattern
        id="pattern0_10001_2046"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_10001_2046"
          transform="scale(0.000244141 0.000366032)"
        />
      </pattern>
      <linearGradient
        id="paint0_linear_10001_2046"
        x1="720.116"
        y1="0.306641"
        x2="720.116"
        y2="791"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#262A10" />
        <stop offset="1" stop-color="#829037" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
