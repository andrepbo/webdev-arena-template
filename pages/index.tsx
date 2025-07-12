import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  BellIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  MessageSquareIcon,
  PawPrintIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  SearchXIcon,
  SendIcon,
  Share2Icon,
  XIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reddit_Mono } from "next/font/google";
import { Ranchers } from "next/font/google";
import { toast, Toaster } from "sonner";

const reddit = Reddit_Mono({
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});
const ranchers = Ranchers({
  subsets: ["latin"],
  weight: "400",
});
interface User {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  pets: string[];
  friends: number;
  photos?: number;
  posts?: number;
}

interface Comment {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
  replies: Comment[];
}

interface Post {
  id: number;
  userId: number;
  text: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  image?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "Dog lover | Golden Retriever dad",
    pets: ["Golden Retriever"],
    friends: 1,
    photos: 5,
    posts: 10,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Cat enthusiast | Traveler",
    pets: ["Siamese Cat"],
    friends: 1,
    photos: 5,
    posts: 10,
  },
  {
    id: 3,
    name: "David Johnson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    bio: "Small animal rescuer",
    pets: ["Rabbit", "Guinea Pig"],
    friends: 1,
    photos: 5,
    posts: 10,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    bio: "Professional dog trainer",
    pets: ["Border Collie", "Poodle"],
    friends: 1,
    photos: 5,
    posts: 10,
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    bio: "Bird watcher | Photographer",
    pets: ["Parrot", "Cockatiel"],
    friends: 1,
    photos: 5,
    posts: 10,
  },
];

const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    text: "Just took Max for a walk in the park! 🐕‍🦺 Beautiful weather today! #dogwalk #goldenretriever",
    likes: 42,
    comments: [
      {
        id: 1,
        userId: 2,
        text: "Max looks so happy! 😍",
        timestamp: "2 hours ago",
        replies: [
          {
            id: 101,
            userId: 1,
            text: "He loves the park! Especially when we meet other dogs",
            timestamp: "1 hour ago",
            replies: [],
          },
        ],
      },
      {
        id: 2,
        userId: 3,
        text: "Which park is this? Looks great for dogs!",
        timestamp: "1 hour ago",
        replies: [],
      },
    ],
    shares: 5,
    timestamp: "3 hours ago",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
  },
  {
    id: 2,
    userId: 2,
    text: "Luna learned to play fetch today! So proud of my smart kitty 😻 #catsofinstagram",
    likes: 89,
    comments: [
      {
        id: 1,
        userId: 4,
        text: "Wow! How did you train her? My cats just stare at me 😅",
        timestamp: "4 hours ago",
        replies: [
          {
            id: 101,
            userId: 2,
            text: "Lots of treats and patience! Started with small distances",
            timestamp: "3 hours ago",
            replies: [],
          },
        ],
      },
    ],
    shares: 11,
    timestamp: "5 hours ago",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  },
  {
    id: 3,
    userId: 3,
    text: "Looking for recommendations for pet-friendly hotels in California. Planning a road trip with my bunny! 🚗🐇",
    likes: 15,
    comments: [],
    shares: 2,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    userId: 4,
    text: "Training session with Bella today! She mastered the agility course in record time 🥇 #bordercollie #dogtraining",
    likes: 67,
    comments: [],
    shares: 7,
    timestamp: "6 hours ago",
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd",
  },
  {
    id: 5,
    userId: 5,
    text: 'My parrot learned a new phrase today: "Pretty bird wants a cracker!" 🦜 Anyone else have talking pets?',
    likes: 51,
    comments: [],
    shares: 9,
    timestamp: "8 hours ago",
  },
];

const PetSocialNetwork = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [users] = useState<User[]>(mockUsers);
  const [newPostText, setNewPostText] = useState("");
  const [newCommentText, setNewCommentText] = useState<{
    [key: number]: string;
  }>({});
  const [newReplyText, setNewReplyText] = useState<{ [key: number]: string }>(
    {}
  );
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Jane liked your post", time: "5 min ago", read: false },
    {
      id: 2,
      text: "David commented on your photo",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      text: "Emma started following you",
      time: "1 day ago",
      read: true,
    },
  ]);
  const [attachments, setAttachments] = useState<
    { url: string; type: "image" | "video" }[]
  >([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [hiddenComments, setHiddenComments] = useState<Set<number>>(new Set());
  const [sharedPosts, setSharedPosts] = useState<Set<number>>(new Set());
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const loggedInUser = mockUsers[0];

  const filteredPosts = posts.filter((post) => {
    const user = users.find((u) => u.id === post.userId);
    return (
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user && user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleCreatePost = () => {
    if (newPostText.length < 1) return;

    if (newPostText.trim() || attachments.length > 0) {
      const newPost: Post = {
        id: posts.length + 1,
        userId: 1,
        text: newPostText,
        likes: 0,
        comments: [],
        shares: 0,
        timestamp: "Just now",
        image: attachments.length > 0 ? attachments[0].url : undefined,
      };

      setPosts([newPost, ...posts]);
      setNewPostText("");
      setAttachments([]);
      setIsPostModalOpen(false);
    }
  };

  const toggleComments = (postId: number) => {
    setHiddenComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddAttachment = (type: "image" | "video") => {
    const mockAttachments = [
      {
        url:
          type === "image"
            ? `https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            : "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type,
      },
    ];

    setAttachments([...attachments, ...mockAttachments]);
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          // Check if user has already liked this post
          if (likedPosts.has(postId)) {
            // Remove like
            return { ...post, likes: post.likes - 1 };
          } else {
            // Add like
            return { ...post, likes: post.likes + 1 };
          }
        }
        return post;
      })
    );

    // Update likedPosts set
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = (postId: number, parentCommentId?: number) => {
    const text = parentCommentId
      ? newReplyText[parentCommentId]
      : newCommentText[postId];

    if (!text?.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      userId: 1,
      text,
      timestamp: "Just now",
      replies: [],
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (parentCommentId) {
            return {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === parentCommentId
                  ? { ...comment, replies: [...comment.replies, newComment] }
                  : comment
              ),
            };
          } else {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
        }
        return post;
      })
    );

    if (parentCommentId) {
      setNewReplyText({ ...newReplyText, [parentCommentId]: "" });
    } else {
      setNewCommentText({ ...newCommentText, [postId]: "" });
    }
  };

  const handleShare = (postId: number) => {
    // Check if user already shared this post
    if (sharedPosts.has(postId)) {
      toast.info("You've already shared this post!");
      return;
    }

    // Update share count
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );

    // Add to shared posts
    setSharedPosts((prev) => new Set(prev).add(postId));

    // Copy post URL to clipboard
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);

    // Show success toast
    toast.success(
      <div className="flex flex-col">
        <span>Post link copied to clipboard!</span>
        <span className="text-xs mt-1 opacity-80 truncate max-w-xs">
          {postUrl}
        </span>
      </div>,
      {
        icon: <Share2Icon className="text-[#217EFF]" />,
        duration: 3000,
      }
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === +id ? { ...n, read: true } : n))
    );
  };

  const renderHome = () => (
    <div className="space-y-6 h-screen mb-6 lg:pr-4">
      <div className="space-y-6 h-min">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-b-[#FF9771] pb-6 ">
          <div>
            <h2
              className={`${ranchers.className} text-[32px] font-bold text-white pb-0`}
            >
              Pet Community Feed
            </h2>
            <h3 className="text-[14px] text-white my-0!">
              Check out the latest cute paws posted :)
            </h3>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-1/2 text-white">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#FF5C20] text-white rounded-[15px] border-0 pl-10 pr-10 py-7 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white"
            />

            {/* Clear button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[#FF7543] transition-colors"
              >
                <XIcon className="h-5 w-5 text-white" />
              </button>
            )}

            {/* Hidden accessibility description */}
            <span id="search-description" className="sr-only">
              Search through posts, pet profiles, and user accounts
            </span>
          </div>
        </div>
        {/* Empty State for Search */}
        {searchQuery && filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-[#FFF0EB] rounded-2xl ">
            <SearchXIcon className="h-16 w-16 text-[#FF5C20] mb-4" />
            <h3
              className={`text-2xl font-bold text-[#FF5C20] mb-2 ${ranchers.className}`}
            >
              No results found
            </h3>
            <p className="text-[#707070] text-center max-w-md mb-6">
              We couldn&apos;t find any posts matching &quot;{searchQuery}
              &quot;. Try searching for something else!
            </p>
            <Button
              className="bg-[#217EFF] hover:bg-[#217EFF]/90 text-white rounded-[15px] px-6 py-3"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        )}
        {filteredPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          return (
            <Card
              key={post.id}
              className="bg-[#FFF0EB] border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-[15px] mt-6"
            >
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3 cursor-pointer">
                  <Avatar className="h-10 w-10 border-2 border-[#FF9A9E]">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle
                      className={`text-[18px] font-bold text-[#FF5C20] ${ranchers.className}`}
                    >
                      {user?.name}{" "}
                      <span className="text-[#217EFF] text-[14px] font-sans font-medium ml-1">
                        @{user?.name.toLowerCase().replace(/\s+/g, "")}
                      </span>
                    </CardTitle>
                    <div className=" flex items-center gap-2 text-[#217EFF] text-[12px]">
                      {post.timestamp}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent
                className={`pt-4 bg-[#FFF0EB] ${
                  hiddenComments.has(post.id) || post.comments.length === 0
                    ? "rounded-b-[15px]"
                    : "rounded-b-none"
                } `}
              >
                <p className="text-[#707070] mb-4 cursor-pointer">
                  {post.text}
                </p>

                {post.image && (
                  <div className="rounded-xl overflow-hidden mb-4 ">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-auto object-cover max-h-[400px]"
                    />
                  </div>
                )}
                <div className={`py-1 ${ranchers.className} w-full  lg:block`}>
                  <Button
                    variant="ghost"
                    className={`flex-1 rounded-xl font-bold text-[18px] hover:bg-[none] hover:text-[#217EFF] ${
                      likedPosts.has(post.id)
                        ? "text-[#217EFF]"
                        : "text-[#217EFF]"
                    }`}
                    onClick={() => handleLike(post.id)}
                  >
                    <HeartIcon
                      fill={likedPosts.has(post.id) ? "#217EFF" : "white"}
                      className="w-5 h-5 mr-2"
                    />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    className={`flex-1 rounded-xl font-bold text-[18px] hover:bg-[none] hover:text-[#217EFF] ${
                      hiddenComments.has(post.id)
                        ? "text-[#217EFF]"
                        : "text-[#217EFF]"
                    }`}
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageSquareIcon
                      fill={hiddenComments.has(post.id) ? "white" : "#217EFF"}
                      className="w-5 h-5 mr-2"
                    />
                    {post.comments.length}
                  </Button>
                  <Button
                    variant="ghost"
                    className={`flex-1 rounded-xl font-bold text-[18px] hover:bg-[none] hover:text-[#217EFF] ${
                      sharedPosts.has(post.id)
                        ? "text-[#217EFF]"
                        : "text-[#217EFF]"
                    }`}
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2Icon
                      fill={sharedPosts.has(post.id) ? "white" : "#217EFF"}
                      className="w-5 h-5 mr-2"
                    />
                    {post.shares} Share
                  </Button>
                </div>
              </CardContent>

              {!hiddenComments.has(post.id) && (
                <CardFooter className="pt-0 bg-[#FFDFD3] py-4 rounded-b-[15px]">
                  <div className="w-full space-y-4">
                    {post.comments.map((comment) => {
                      const commentUser = users.find(
                        (u) => u.id === comment.userId
                      );
                      return (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={commentUser?.avatar}
                              alt={commentUser?.name}
                            />
                            <AvatarFallback>
                              {commentUser?.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-2xl p-3 flex">
                              <div className="flex flex-col justify-between flex-1">
                                <div
                                  className={`text-[#FF5C20] font-bold ${ranchers.className}`}
                                >
                                  {commentUser?.name}{" "}
                                  <span className="text-[#217EFF] text-[14px] font-sans font-medium">
                                    @
                                    {commentUser?.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "")}
                                  </span>
                                </div>
                                <div className="text-[#707070]">
                                  {comment.text}
                                </div>
                              </div>
                              <div className="text-[#FF5C20] text-[10px]">
                                {comment.timestamp}
                              </div>
                            </div>

                            {comment.replies.length > 0 && (
                              <div className="ml-6 mt-2 space-y-2">
                                {comment.replies.map((reply) => {
                                  const replyUser = users.find(
                                    (u) => u.id === reply.userId
                                  );
                                  return (
                                    <div key={reply.id} className="flex gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage
                                          src={replyUser?.avatar}
                                          alt={replyUser?.name}
                                        />
                                      </Avatar>
                                      <div className="bg-gray-50  rounded-2xl p-3">
                                        <div className="font-bold  text-[#FF5C20] ">
                                          {replyUser?.name}
                                        </div>
                                        <div className="text-[#707070]">
                                          {reply.text}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {newReplyText[comment.id] && (
                              <div className="flex gap-2 mt-3 ml-6">
                                <Input
                                  value={newReplyText[comment.id]}
                                  onChange={(e) =>
                                    setNewReplyText({
                                      ...newReplyText,
                                      [comment.id]: e.target.value,
                                    })
                                  }
                                  className="flex-1 bg-[#FFC0A9] border-gray-200 dark:border-gray-700 rounded-xl"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex gap-3 pt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={users[0].avatar}
                          alt={users[0].name}
                        />
                      </Avatar>
                      <div className="relative flex-1 flex gap-2">
                        <Input
                          placeholder="Add a comment..."
                          value={newCommentText[post.id] || ""}
                          onChange={(e) =>
                            setNewCommentText({
                              ...newCommentText,
                              [post.id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddComment(post.id);
                            }
                          }}
                          className="bg-[#FFC0A9] border-0 text-[#CE4513] placeholder-[#CE4513] focus:ring-0 focus:border-[#217EFF] rounded-full placeholder:text-[#CE4513]"
                        />
                        <Button
                          className="hover:text-[#CE4513]/70 rounded-full absolute right-0 top-0 bg-transparent hover:bg-transparent shadow-none"
                          onClick={() => handleAddComment(post.id)}
                        >
                          <SendIcon className="text-[#CE4513]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
      <style jsx global>{`
        .bg-black\/80 {
          background-color: transparent;
        }
        @layer components {
          [data-radix-portal] {
            @apply bg-transparent;
          }
        }
      `}</style>
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-[#217EFF]/90 backdrop-blur-sm" />
          <DialogContent className="!opacity-1  bg-[#FF7543] rounded-[15px] p-0 overflow-hidden border border-white mr-[20px] ml-[0px] max-w-[calc(100%-40px)] lg:max-w-2xl lg:mx-auto">
            <DialogDescription></DialogDescription>
            <DialogHeader className="px-6 pt-6 ">
              <DialogTitle
                className={`${ranchers.className} text-white text-[42px]`}
              >
                Create new post
              </DialogTitle>
            </DialogHeader>

            <div className="px-6">
              <div className="flex flex-col gap-4">
                <h1>Post Description</h1>
                <div className="flex-1">
                  <Textarea
                    placeholder="Enter post description"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="min-h-[150px] resize-none bg-[#FFF0EB] border-0 rounded-xl text-[#707070]"
                  />

                  <div className="flex flex-col gap-3 mt-4">
                    {/* Attachment previews */}
                    {attachments.length > 0 ? (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {attachments.map((attachment, index) => (
                          <div key={index} className="relative group">
                            {attachment.type === "image" ? (
                              <img
                                src={attachment.url}
                                alt="Attachment"
                                className="w-full h-24 object-cover rounded-lg border border-[#FF9771]"
                              />
                            ) : (
                              <div className="bg-[#FFF0EB] w-full h-24 rounded-lg flex items-center justify-center relative">
                                <PlayIcon className="h-8 w-8 text-[#FF5C20] absolute" />
                                <div className="bg-[#FF9771]/30 absolute inset-0 rounded-lg" />
                                <span className="text-xs text-[#FF5C20] absolute bottom-1 left-1">
                                  0:30
                                </span>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              className="absolute top-1 right-1 p-1 h-6 w-6 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF5C20]/50 hover:text-white"
                              onClick={() =>
                                setAttachments(
                                  attachments.filter((_, i) => i !== index)
                                )
                              }
                            >
                              <XIcon className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <h1>Media upload</h1>
                        <div
                          className="flex flex-col items-center justify-center p-8 bg-[#FFF0EB] min-h-[150px] w-full hover:bg-[#FFF0EB] rounded-[15px]"
                          onClick={() => handleAddAttachment("image")}
                        >
                          <span className="text-gray-800 dark:text-[#707070] text-[16px]">
                            Drop files to Upload
                          </span>
                          <span className="text-gray-800 dark:text-[#707070] text[16px] mb-1">
                            or
                          </span>
                          <Button className="text-[#FF7543] bg-[#FFDFD3] hover:bg-[#FF9A9E] shadow-none text-[16px]">
                            Select file
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="my-6 text-center">
                    <Button
                      onClick={() => {
                        handleCreatePost();
                      }}
                      className={`text-[18px] bg-[#217EFF] hover:bg-[#217EFF]/90 text-white rounded-[15px] px-8 py-6 shadow-md ${ranchers.className} border-2 border-[#71ACFF]`}
                    >
                      <PlusIcon className="h-5 w-5 mr-1" />
                      POST NOW
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );

  return (
    <div
      className={`"h-full xl:h-screen flex flex-col xl:overflow-hidden xl:flex-row bg-[#FF7543] w-full" ${reddit.className}`}
    >
      {/* Desktop Sidebar */}
      <div
        className={` p-10 hidden xl:flex lg:pl-[100px] flex-col transition-all gap-4 duration-300 ${
          isSidebarCollapsed ? "w-30" : "w-1/4"
        }`}
      >
        <div
          className={`bg-[#FF9771] flex flex-col transition-all duration-300 rounded-[15px] h-min `}
        >
          {/* Sidebar Header */}
          <div
            className={`flex items-center gap-2 p-3 border-b border-b-[#FF5C20]`}
          >
            <div className="flex gap-3 p-3">
              {!isSidebarCollapsed && <>{svgLogo}</>}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-4 p-3 border-b border-b-[#FF5C20] pb-7">
            <Button
              variant="ghost"
              className={`rounded-xl px-4 hover:bg-transparent ${
                isSidebarCollapsed ? "justify-center" : "justify-start"
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              {!isSidebarCollapsed && (
                <span className="ml-2 text-[15px] font-semibold">Home</span>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`rounded-xl px-4 hover:bg-transparent ${
                isSidebarCollapsed ? "justify-center" : "justify-start"
              }`}
              onClick={() => {
                toast("📬  Messages: This feature is coming soon!");
              }}
            >
              <MessageSquareIcon className="w-5 h-5" />
              {!isSidebarCollapsed && (
                <span className="ml-2 text-[15px] font-semibold">Messages</span>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`rounded-xl px-4 hover:bg-transparent ${
                isSidebarCollapsed ? "justify-center" : "justify-start"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center">
                <BellIcon className="w-5 h-5 mr-2" />
                {!isSidebarCollapsed && (
                  <span className="ml-2 text-[15px] font-semibold">
                    Notifications
                  </span>
                )}
                {!isSidebarCollapsed && notifications.some((n) => !n.read) && (
                  <span
                    className={`ml-2 bg-[#217EFF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                      isSidebarCollapsed ? "absolute top-1 right-1" : ""
                    }`}
                  >
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </div>
            </Button>
          </div>

          {/* User Profile */}
          <div
            className="p-3 cursor-pointer"
            onClick={() => setIsUserModalOpen(true)}
          >
            <div
              className={`flex items-center p-3 bg-[#FF5C20] rounded-[15px] ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={mockUsers[0].avatar}
                  alt={mockUsers[0].name}
                />
              </Avatar>
              {!isSidebarCollapsed && (
                <div className="flex flex-col gap-0 ml-2">
                  <span
                    className={`text-[14px] text-white ${ranchers.className}`}
                  >
                    John Doe
                  </span>
                  <span className="text-[12px] text-white">@johndoe</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          className={`bg-[#217EFF]  hover:bg-[#217EFF]/90 text-[18px] text-white rounded-[15px] p-6 flex items-center ${ranchers.className} border-2 border-[#71ACFF]`}
          onClick={() => setIsPostModalOpen(true)}
        >
          <PlusIcon className={`h-8 w-8 text-[#71ACFF] `} />
          CREATE NEW POST
        </Button>
      </div>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-[#FF7543]  shadow-sm xl:hidden">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Toggle Button (only visible on mobile) */}
            <div className="xl:hidden top-4 left-4 z-20">
              <Button
                variant="ghost"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 bg-[transparent] hover:bg-[transparent] rounded-[15px]"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-[#217EFF] to-[#FAD0C4] p-2 rounded-xl">
                <PawPrintIcon className="h-6 w-6 text-white" />
              </div>
              <h1
                className={` ${ranchers.className} text-[32px] font-bold text-[#217EFF]`}
              >
                PetConnect
              </h1>
            </div>
            <Avatar
              className="h-8 w-8"
              onClick={() => setIsUserModalOpen(true)}
            >
              <AvatarImage src={mockUsers[0].avatar} alt={mockUsers[0].name} />
            </Avatar>
          </div>
        </div>
      </header>

      {/* Sidebar Content */}
      {isSidebarCollapsed && (
        <div
          className={`fixed left-0 w-full h-screen xl:p-10 xl:pl-[100px] flex flex-col gap-4 z-50 overflow-hidden`}
        >
          <div
            className={`bg-[#FF9771] flex flex-col  h-min flex-grow xl:flex-grow-0`}
          >
            {/* Sidebar Header - Only show when expanded */}

            <div
              className={`flex items-center gap-2 p-2 border-b border-b-[#FF5C20]`}
            >
              <div className="xl:hidden top-4 left-4 z-20">
                <Button
                  variant="ghost"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="p-2 bg-[#FF9771] hover:bg-[#FF9771]/90 rounded-[15px]"
                >
                  <XIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex gap-3 p-3">{svgLogo}</div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-2 p-3 border-b border-b-[#FF5C20] pb-7">
              <Button
                variant="ghost"
                className={`rounded-xl px-4 hover:bg-transparent justify-start`}
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <HomeIcon className="w-5 h-5" />
                <span className="ml-2 text-[15px] font-semibold">Home</span>
              </Button>

              <Button
                variant="ghost"
                className={`rounded-xl px-4 hover:bg-transparent justify-start`}
                onClick={() => {
                  toast("📬 Messages: This feature is coming soon!");
                }}
              >
                <MessageSquareIcon className="w-5 h-5" />
                <span className="ml-2 text-[15px] font-semibold">Messages</span>
              </Button>

              <Button
                variant="ghost"
                className={`rounded-xl px-4 hover:bg-transparent justify-start`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center">
                  <BellIcon className="w-5 h-5" />
                  <span className="ml-2 text-[15px] font-semibold truncate">
                    Notifications
                  </span>
                  {notifications.some((n) => !n.read) && (
                    <span
                      className={`ml-2 bg-[#217EFF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center `}
                    >
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </div>
              </Button>
            </div>

            {/* User Profile */}

            <div
              className="p-3 cursor-pointer md:w-1/3"
              onClick={() => setIsUserModalOpen(true)}
            >
              <div
                className={`flex items-center p-3 bg-[#FF5C20] rounded-[15px] `}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={mockUsers[0].avatar}
                    alt={mockUsers[0].name}
                  />
                </Avatar>

                <div className="flex flex-col gap-0 ml-2">
                  <span
                    className={`text-[14px] text-white ${ranchers.className}`}
                  >
                    John Doe
                  </span>
                  <span className="text-[12px] text-white">@johndoe</span>
                </div>
              </div>
            </div>
            {/* Create Post Button */}
            <Button
              className={`bg-[#217EFF] md:hidden m-3 hover:bg-[#217EFF]/90 text-[18px] text-white rounded-[15px] p-6 flex items-center ${ranchers.className} border-2 border-[#71ACFF]`}
              onClick={() => {
                setIsPostModalOpen(true);
                setIsSidebarCollapsed(false);
              }}
            >
              <PlusIcon className="h-6 w-6 xl:h-8 xl:w-8 text-[#71ACFF] mr-2" />
              CREATE NEW POST
            </Button>
          </div>
        </div>
      )}

      <main className="bg-[#FF7543] flex-grow mb-6 p-[15px] xl:pr-[100px] lg:py-10 lg:pb-1 overflow-y-auto ">
        {renderHome()}
      </main>

      {!isSidebarCollapsed && (
        <div className="fixed bottom-24 right-6 z-2 lg:hidden">
          <Button
            className="bg-[#217EFF]  hover:bg-[#217EFF]/90 text-white rounded-full p-5 shadow-lg transition-transform hover:scale-105"
            onClick={() => setIsPostModalOpen(true)}
          >
            <PlusIcon className="h-6 w-6" />
          </Button>
        </div>
      )}
      <Toaster />

      {/* User Profile Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-[#217EFF]/90 backdrop-blur-sm" />
          <DialogContent className="bg-[#FF5C20] rounded-2xl border-0 max-w-md p-0 overflow-hidden w-4/5 lg:w-full">
            <DialogDescription>
              <div className="relative">
                {/* Profile Banner */}
                <div className="h-32 bg-gradient-to-r from-[#FF7543] to-[#FF9771]"></div>

                {/* Profile Picture */}
                <div className="absolute -bottom-12 left-6">
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage
                      src={loggedInUser.avatar}
                      alt={loggedInUser.name}
                    />
                    <AvatarFallback className="text-xl">
                      {loggedInUser.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </DialogDescription>
            <div className="pt-16 pb-6 px-6">
              <DialogHeader>
                <DialogTitle
                  className={`text-2xl font-bold text-white ${ranchers.className}`}
                >
                  {loggedInUser.name}
                </DialogTitle>
                <DialogDescription className="text-white/80">
                  {loggedInUser.bio}
                </DialogDescription>
              </DialogHeader>

              {/* Pets Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  My Pets
                </h3>
                <div className="flex flex-wrap gap-2">
                  {loggedInUser.pets.map((pet, index) => (
                    <div
                      key={index}
                      className="bg-[#FF9771] px-3 py-2 rounded-full text-white"
                    >
                      {pet}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#FF9771]/50 p-3 rounded-xl">
                  <div className="text-2xl font-bold text-white">
                    {loggedInUser.friends}
                  </div>
                  <div className="text-white/80 text-sm">Friends</div>
                </div>
                <div className="bg-[#FF9771]/50 p-3 rounded-xl">
                  <div className="text-2xl font-bold text-white">
                    {loggedInUser.photos}
                  </div>
                  <div className="text-white/80 text-sm">Photos</div>
                </div>
                <div className="bg-[#FF9771]/50 p-3 rounded-xl">
                  <div className="text-2xl font-bold text-white">
                    {loggedInUser.posts}
                  </div>
                  <div className="text-white/80 text-sm">Posts</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3 items-center justify-center">
                <Button
                  className={`bg-[#217EFF]  m-3 hover:bg-[#217EFF]/90 text-[18px] text-white rounded-[15px] p-6 flex items-center ${ranchers.className} border-2 border-[#71ACFF]`}
                  onClick={() => setIsUserModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-[#217EFF]/90 backdrop-blur-sm" />
          <DialogContent className="bg-[#FF7543] rounded-2xl border-0  p-0 overflow-hidden w-4/5 lg:w-full">
            <DialogDescription></DialogDescription>
            <div className="pt-16 pb-6 px-6 text-white">
              <DialogHeader>
                <DialogTitle
                  className={`text-2xl font-bold text-white ${ranchers.className}`}
                >
                  Notifications
                </DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`py-4 cursor-pointer 
                                    }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-center">
                        <div
                          className={`flex-shrink-0 h-3 w-3 mt-1 rounded-full ${
                            !notification.read
                              ? "bg-blue-500"
                              : "bg-transparent"
                          }`}
                        ></div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{notification.text}</p>
                            <span className="text-xs text-white">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 flex gap-3 justify-center">
                <Button
                  className={`bg-[#217EFF]  m-3 hover:bg-[#217EFF]/90 text-[18px] text-white rounded-[15px] p-6 flex items-center ${ranchers.className} border-2 border-[#71ACFF]`}
                  onClick={() => {
                    setIsOpen(false);
                    setIsSidebarCollapsed(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default PetSocialNetwork;

const svgLogo = (
  <svg
    width="132"
    height="27"
    viewBox="0 0 644 132"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M82.0944 0.238525C92.0121 0.238572 99.1824 6.48439 103.238 12.803C106.959 18.601 109.063 25.7515 109.456 33.1711C111.812 33.3423 114.237 33.9189 116.663 35.0383C119.705 36.4422 122.098 38.3978 123.957 40.6311C123.886 34.127 123.793 27.5975 123.673 21.0442L123.456 9.08911L135.351 7.87524C139.099 7.49286 142.847 7.18694 146.596 6.9563C150.545 6.64447 154.438 6.4856 158.274 6.4856C164.03 6.4856 169.562 6.94434 174.837 7.91138C180.719 8.98982 186.246 11.0748 191.148 14.3879C196.567 17.921 200.637 22.7903 203.453 28.5295C204.433 30.5036 205.213 32.5676 205.823 34.6975C205.939 34.6435 206.055 34.5883 206.172 34.5354L206.179 34.5315L206.186 34.5286C211.646 32.0665 217.439 30.844 223.434 30.844C228.758 30.844 233.941 31.7707 238.811 33.7932V32.0569H245.424V19.2717H286.525V22.7776C291.08 17.8111 296.534 13.9317 302.762 11.1614C309.952 7.92085 317.857 6.48562 326.18 6.4856C329.288 6.4856 332.344 6.69342 335.221 7.22583C337.81 7.62593 340.347 8.2286 342.796 9.08032L351.525 12.1174V25.0256C351.599 26.5655 351.635 28.1746 351.635 29.8459C351.635 31.0169 351.616 32.226 351.583 33.4709C356.303 31.6529 361.481 30.844 366.81 30.844C372.453 30.844 377.925 31.7627 382.855 33.8411V32.0569H417.775C420.427 31.271 423.195 30.844 426.055 30.844C428.905 30.844 431.696 31.2424 434.374 32.0569H468.149C470.801 31.271 473.569 30.844 476.429 30.844C482.184 30.844 487.702 32.4663 492.523 35.8694C494.469 37.243 496.279 38.857 497.849 40.7239C500.715 38.1942 503.929 36.1269 507.447 34.5354L507.454 34.5315L507.461 34.5286C512.92 32.0664 518.713 30.8441 524.709 30.844C530.895 30.844 536.891 32.0946 542.426 34.8625C546.406 36.8524 549.933 39.4629 552.915 42.6809C556.511 39.2515 560.679 36.5581 565.301 34.5754C571.297 31.9591 577.834 30.844 584.609 30.844C587.82 30.844 590.98 31.1114 594.059 31.6829V19.2717H635.16V32.0569H643.647V87.3752H641.127L642.816 93.2893C643.547 95.8501 643.537 98.7702 643.537 100.057V108.654C643.537 109.735 643.52 111.486 643.25 113.106L641.723 122.265L632.563 123.791C631.335 123.996 630.076 124.135 628.809 124.232C627.639 124.389 626.466 124.513 625.291 124.597L625.29 124.595C624.26 124.673 623.236 124.72 622.217 124.734C621.376 124.801 620.491 124.85 619.625 124.85C615.625 124.85 611.218 124.124 607.126 121.855L599.127 123.57C594.153 124.635 589.162 125.181 584.169 125.181C577.842 125.181 571.724 124.204 566.043 121.952L565.945 121.913L565.848 121.873C563.011 120.696 560.343 119.244 557.869 117.52L553.438 119.679C545.734 123.432 537.322 125.181 528.457 125.181C524.18 125.181 519.91 124.704 515.665 123.781C511.667 122.912 507.878 121.441 504.309 119.459V123.968H382.855V122.208C377.917 124.274 372.442 125.181 366.81 125.181C360.755 125.181 354.882 124.147 349.65 121.769L341.249 123.57C336.227 124.646 331.126 125.18 325.961 125.18C318.059 125.18 310.524 123.875 303.57 120.994L303.539 120.982L303.508 120.969C300.179 119.57 297.057 117.856 294.159 115.833L293.088 122.265L283.928 123.791C282.7 123.996 281.441 124.135 280.173 124.232C279.003 124.389 277.83 124.513 276.655 124.597L276.654 124.595C275.625 124.673 274.6 124.72 273.582 124.734C272.741 124.801 271.856 124.85 270.99 124.85C266.74 124.85 262.03 124.031 257.727 121.411C256.433 120.623 255.224 119.727 254.11 118.73L252.164 119.679C244.459 123.433 236.047 125.181 227.181 125.181C222.905 125.181 218.636 124.704 214.39 123.781C209.335 122.683 204.611 120.625 200.249 117.784L200.222 117.768L200.197 117.75C196.291 115.18 192.85 112.062 190.036 108.348L189.904 108.173L189.778 107.994C187.489 104.751 185.582 101.327 184.139 97.72L184.117 97.6624L184.093 97.6038C183.089 95.0217 182.29 92.3979 181.731 89.7405C180.655 90.1254 179.561 90.4712 178.448 90.7747C175.203 91.6595 171.839 92.2473 168.377 92.5735C168.386 93.3909 168.395 94.2081 168.407 95.0237C168.477 99.9973 168.688 105.012 169.039 110.068L170.004 123.968H123.255L123.677 110.558C123.895 103.667 124.04 96.8135 124.113 89.9983C124.159 85.5941 124.189 81.3396 124.206 77.2356C121.284 82.2592 117.339 86.5833 112.677 89.5569C112.105 89.9222 111.502 90.2749 110.874 90.6125C111.852 92.2724 112.744 93.8968 113.486 95.47C115.059 98.8047 116.324 102.635 116.324 107.111C116.324 114.482 113.401 121.229 107.616 125.813C102.255 130.061 95.752 131.422 90.0436 131.422C88.4574 131.422 85.7639 131.459 82.5778 130.768C79.4012 130.078 76.3557 128.827 73.0338 127.099L71.5182 126.311L71.1442 125.968C70.6625 125.818 69.5586 125.565 67.693 125.64L67.1754 125.66L66.6578 125.64C64.7704 125.565 63.6544 125.822 63.1666 125.974L62.776 126.336L61.2242 127.142C57.91 128.865 54.8708 130.116 51.6901 130.797C48.515 131.477 45.8104 131.427 44.3004 131.427C38.5953 131.427 32.0928 130.067 26.7301 125.822C20.9417 121.239 18.0165 114.491 18.0162 107.115C18.0162 102.633 19.287 98.799 20.86 95.469C21.3992 94.3277 22.0181 93.159 22.691 91.969C20.9719 91.2887 19.3838 90.4565 17.9733 89.5569C12.2694 85.9191 7.63531 80.2599 4.63831 73.7678L4.63733 73.7659C1.64199 67.2739 0.342605 60.0761 1.27503 53.3752C2.18435 46.8413 5.65991 38.881 13.985 35.0403L14.3756 34.8645C16.6703 33.8602 18.9611 33.3358 21.1901 33.1741C21.582 25.7542 23.6849 18.6028 27.4059 12.804C31.4607 6.48501 38.6311 0.238652 48.5494 0.238525C55.5551 0.238558 61.1878 3.35752 65.3219 7.41431C69.456 3.35743 75.0886 0.238556 82.0944 0.238525ZM70.2799 125.178C70.2846 125.182 70.2899 125.186 70.2946 125.191L70.2692 125.167C70.2712 125.169 70.2763 125.175 70.2799 125.178ZM43.5914 118.416L44.3004 118.427C43.8298 118.427 43.3666 118.411 42.9117 118.383C43.1363 118.397 43.3629 118.409 43.5914 118.416ZM55.2282 115.607C54.5538 115.957 53.9306 116.264 53.3502 116.532C53.6356 116.4 53.9318 116.26 54.2389 116.109L55.2282 115.607ZM67.9235 112.629C67.677 112.633 67.426 112.639 67.1705 112.65L67.1715 112.651C67.4266 112.64 67.6773 112.633 67.9235 112.629ZM583.238 112.172C583.279 112.173 583.319 112.172 583.36 112.173C583.246 112.171 583.132 112.168 583.018 112.165C583.091 112.167 583.165 112.171 583.238 112.172ZM546.673 108.493C546.851 108.413 547.029 108.333 547.206 108.25L547.212 108.247C547.033 108.331 546.853 108.412 546.673 108.493ZM156.259 40.0579C156.012 40.1044 155.765 40.1535 155.518 40.2063V49.9836L155.519 40.2073C155.765 40.1545 156.012 40.1043 156.259 40.0579ZM25.4225 46.5051C25.5275 46.5342 25.6327 46.5646 25.7379 46.5969C25.528 46.5324 25.3182 46.4746 25.109 46.4231L25.4225 46.5051ZM470.269 45.0657C469.874 45.2241 469.479 45.3977 469.086 45.5872L469.087 45.5881C469.48 45.3988 469.874 45.2244 470.269 45.0657ZM470.539 44.9602C470.474 44.9849 470.41 45.0099 470.345 45.0354C470.488 44.9787 470.632 44.925 470.775 44.8723C470.696 44.9013 470.617 44.9301 470.539 44.9602ZM170.526 42.4944C170.637 42.6212 170.746 42.7527 170.85 42.8899L170.691 42.6877C170.637 42.6218 170.582 42.5578 170.526 42.4944ZM62.9772 35.7219C62.9772 36.1727 62.9674 36.6204 62.9508 37.0647C62.9604 36.8119 62.9691 36.558 62.9733 36.303C62.9764 36.1102 62.9781 35.9168 62.9782 35.7229C62.9782 35.4204 62.9721 35.1192 62.9645 34.8196C62.9721 35.1189 62.9772 35.4197 62.9772 35.7219ZM96.5172 36.384C96.5177 36.357 96.5197 36.33 96.5201 36.303C96.5233 36.1102 96.525 35.9168 96.525 35.7229C96.525 34.753 96.4855 33.7973 96.4088 32.8596C96.4852 33.7969 96.524 34.7523 96.5241 35.7219C96.5241 35.9434 96.5212 36.1641 96.5172 36.384ZM62.7848 32.0491C62.8447 32.6171 62.8905 33.1922 62.9225 33.7737C62.8905 33.1922 62.8447 32.6171 62.7848 32.0491ZM62.3912 29.3586C62.3375 29.0741 62.2811 28.7917 62.2203 28.512L62.2194 28.511C62.2802 28.7911 62.3374 29.0737 62.3912 29.3586ZM61.1959 24.8928C61.2654 25.0894 61.3343 25.2874 61.4 25.4875C61.3469 25.3259 61.2925 25.1654 61.2369 25.0061C61.2237 24.9681 61.2093 24.9306 61.1959 24.8928ZM60.9557 24.2415C61.0306 24.4376 61.1043 24.6353 61.1754 24.8352C61.1042 24.6353 61.0306 24.4375 60.9557 24.2415ZM306.271 23.8811C306.263 23.8851 306.255 23.8889 306.248 23.8928C306.545 23.7417 306.846 23.5946 307.149 23.4504L306.271 23.8811ZM309.592 22.3821C309.552 22.3983 309.511 22.4155 309.47 22.4319C309.679 22.3483 309.888 22.2658 310.098 22.1858L309.592 22.3821ZM150.214 19.7327C149.304 19.7877 148.391 19.8526 147.472 19.926L148.847 19.8225C149.304 19.7904 149.759 19.7602 150.214 19.7327ZM96.5075 36.7307H96.5094C96.5123 36.6296 96.5142 36.5284 96.5162 36.427C96.5143 36.5284 96.5103 36.6296 96.5075 36.7307ZM62.5377 30.1965C62.5327 30.1657 62.5291 30.1346 62.5241 30.1038C62.4846 29.8645 62.4415 29.627 62.3971 29.3909C62.4472 29.6574 62.4939 29.926 62.5377 30.1965Z"
      fill="#217EFF"
    />
    <path
      d="M96.8152 84.5893C101.239 91.5545 103.324 95.2525 103.324 99.1099C103.324 106.728 97.666 110.421 90.0438 110.421C86.684 110.421 84.5151 110.417 79.0338 107.566C79.0338 107.566 75.4823 104.315 67.171 104.649C58.7821 104.318 55.2284 107.606 55.2284 107.606C49.7471 110.456 47.6558 110.426 44.3003 110.426C36.6781 110.426 31.0159 106.736 31.0159 99.1142C31.0159 95.2568 33.1072 91.5631 37.5289 84.5936C37.5289 84.5936 45.8876 70.7126 53.1306 64.1824C58.3643 59.47 65.995 59.4873 65.995 59.4873H68.3491C68.3491 59.4873 76.3137 59.4657 81.2199 64.1824C88.239 70.9495 96.8152 84.5914 96.8152 84.5893ZM48.5496 50.2046C56.5185 50.2046 62.9776 40.1379 62.9776 27.7216C62.9776 15.3052 56.5185 5.23853 48.5496 5.23853C40.5807 5.23853 34.1216 15.3052 34.1216 27.7216C34.1216 40.1379 40.5807 50.2046 48.5496 50.2046ZM34.7225 71.979C40.5958 69.2675 41.9354 59.6531 37.7119 50.504C33.4884 41.3548 25.3041 36.1341 19.4309 38.8435C13.5576 41.553 12.2201 51.1695 16.4414 60.3186C20.665 69.4678 28.8492 74.6863 34.7225 71.979ZM82.0943 50.2046C90.0632 50.2046 96.5245 40.1379 96.5245 27.7216C96.5245 15.3052 90.0632 5.23853 82.0943 5.23853C74.1254 5.23853 67.6663 15.3052 67.6663 27.7216C67.6663 40.1379 74.1254 50.2046 82.0943 50.2046ZM111.215 38.8414C105.34 36.1298 97.1577 41.3505 92.9342 50.5018C88.7107 59.6531 90.0503 69.2675 95.9257 71.979C101.801 74.6885 109.983 69.4678 114.207 60.3186C118.43 51.1695 117.091 41.553 111.215 38.8414Z"
      fill="#71ACFF"
    />
    <path
      d="M607.06 24.2704H622.16V37.056H630.647V66.3745H621.939V81.8052C621.939 84.8179 622.196 86.8386 622.711 87.8673C623.225 88.8226 624.401 89.3002 626.238 89.3002C626.752 89.3002 627.45 89.2635 628.332 89.19C629.214 89.1165 629.875 89.0063 630.316 88.8593C630.463 89.3737 630.536 90.4391 630.536 92.0557C630.536 93.5988 630.536 95.1786 630.536 96.7952C630.536 98.1913 630.536 99.4772 630.536 100.653C630.536 101.755 630.5 102.527 630.426 102.967C629.544 103.114 628.552 103.225 627.45 103.298C626.421 103.445 625.393 103.555 624.364 103.629C623.409 103.702 622.49 103.739 621.609 103.739C620.8 103.812 620.139 103.849 619.625 103.849C616.979 103.849 614.812 103.335 613.122 102.306C611.432 101.277 610.109 99.918 609.154 98.228C608.198 96.4645 607.537 94.5173 607.17 92.3864C606.802 90.182 606.619 87.9408 606.619 85.6629C606.619 84.7812 606.619 83.4953 606.619 81.8052C606.692 80.0417 606.729 78.2047 606.729 76.2942C606.802 74.3838 606.876 72.5468 606.949 70.7832C607.023 68.9463 607.06 67.4767 607.06 66.3745H600.446V37.056H607.06V24.2704Z"
      fill="white"
    />
    <path
      d="M584.609 35.8435C588.944 35.8435 592.876 36.468 596.403 37.7172C596.403 38.9664 596.403 40.3257 596.403 41.7953C596.476 43.1914 596.513 44.6243 596.513 46.0939C596.513 47.637 596.476 49.1801 596.403 50.7231C596.403 52.2662 596.403 53.6991 596.403 55.0217C593.978 52.9643 591.002 51.9356 587.475 51.9356C585.27 51.9356 583.433 52.303 581.964 53.0378C580.494 53.6991 579.282 54.5808 578.327 55.683C577.445 56.7852 576.82 57.9977 576.453 59.3203C576.085 60.5695 575.902 61.7819 575.902 62.9576C575.902 64.5741 576.196 66.1172 576.784 67.5868C577.371 68.9829 578.18 70.2321 579.208 71.3343C580.237 72.4365 581.413 73.3182 582.735 73.9795C584.132 74.5674 585.601 74.8613 587.144 74.8613C588.614 74.8613 590.157 74.5674 591.773 73.9795C593.39 73.3917 594.933 72.5834 596.403 71.5547C596.403 73.9795 596.403 76.5146 596.403 79.1599C596.476 81.7317 596.513 84.3402 596.513 86.9855C596.513 89.5573 596.476 92.2026 596.403 94.9213C596.403 97.5666 596.403 100.212 596.403 102.857C592.288 103.739 588.21 104.18 584.168 104.18C579.172 104.18 574.726 103.408 570.832 101.865C566.937 100.249 563.631 97.9707 560.912 95.0315C558.193 92.0923 556.099 88.5286 554.629 84.3402C553.233 80.0784 552.535 75.3389 552.535 70.1218C552.535 65.1987 553.196 60.6429 554.519 56.4546C555.842 52.1927 557.826 48.5555 560.471 45.5428C563.19 42.5301 566.533 40.1788 570.501 38.4887C574.542 36.7252 579.245 35.8435 584.609 35.8435Z"
      fill="white"
    />
    <path
      d="M519.198 68.2481C520.153 71.4077 521.733 73.9795 523.937 75.9635C526.142 77.9475 529.191 78.9394 533.086 78.9394C534.261 78.9394 535.51 78.866 536.833 78.719C538.229 78.4986 539.589 78.2414 540.911 77.9475C542.234 77.5801 543.483 77.2127 544.659 76.8453C545.834 76.4044 546.863 76.0002 547.745 75.6328C547.892 77.7638 547.965 80.0416 547.965 82.4665C548.039 84.8178 548.076 87.1692 548.076 89.5205C548.076 93.415 547.965 96.9053 547.745 99.9914C542.013 102.784 535.584 104.18 528.456 104.18C525.15 104.18 521.806 103.812 518.426 103.078C515.046 102.343 511.776 100.947 508.617 98.8892C505.825 97.0522 503.51 94.9213 501.673 92.4965C499.909 89.9982 498.513 87.4631 497.485 84.8913C496.456 82.246 495.758 79.6742 495.39 77.1759C495.023 74.6776 494.839 72.4365 494.839 70.4525C494.839 67.5133 495.17 64.4639 495.831 61.3042C496.566 58.0711 497.668 55.0217 499.138 52.156C500.608 49.2168 502.481 46.5348 504.759 44.1099C507.037 41.6851 509.719 39.7746 512.805 38.3785C516.553 36.6885 520.521 35.8435 524.709 35.8435C529.118 35.8435 533.086 36.7252 536.613 38.4887C540.14 40.2522 543.005 42.6771 545.21 45.7632C547.341 48.7024 548.663 51.9723 549.178 55.5728C549.766 59.1733 550.06 63.3984 550.06 68.2481H519.198ZM525.48 47.7472C523.937 47.7472 522.468 48.4085 521.072 49.7312C519.676 50.9803 518.757 53.2215 518.316 56.4546H532.755C532.461 53.5154 531.579 51.3477 530.11 49.9516C528.714 48.482 527.17 47.7472 525.48 47.7472Z"
      fill="white"
    />
    <path
      d="M462.211 37.0559V43.0077C463.974 40.8033 466.105 39.0766 468.603 37.8274C471.175 36.5048 473.784 35.8435 476.429 35.8435C479.662 35.8435 482.528 36.7252 485.026 38.4887C487.525 40.2522 489.178 42.3464 489.986 44.7713C490.354 45.8735 490.647 47.4165 490.868 49.4005C491.162 51.311 491.309 53.4786 491.309 55.9035V102.967H475.106V71.0036C475.106 67.697 474.482 65.4926 473.233 64.3904C472.057 63.2147 470.661 62.6269 469.044 62.6269C466.913 62.6269 465.223 63.325 463.974 64.7211C462.799 66.0437 462.211 67.7705 462.211 69.9014V102.967H446.229C446.229 100.543 446.229 98.0075 446.229 95.3622C446.302 92.6435 446.339 89.9614 446.339 87.3162C446.339 84.5974 446.339 81.9154 446.339 79.2701C446.339 76.6248 446.339 74.1265 446.339 71.7752C446.339 70.379 446.339 68.2849 446.339 65.4926C446.339 62.7004 446.302 59.651 446.229 56.3444C446.229 53.0378 446.229 49.6577 446.229 46.2041C446.229 42.7506 446.229 39.7011 446.229 37.0559H462.211Z"
      fill="white"
    />
    <path
      d="M411.837 37.0559V43.0077C413.6 40.8033 415.731 39.0766 418.23 37.8274C420.801 36.5048 423.41 35.8435 426.055 35.8435C429.288 35.8435 432.154 36.7252 434.652 38.4887C437.151 40.2522 438.804 42.3464 439.612 44.7713C439.98 45.8735 440.274 47.4165 440.494 49.4005C440.788 51.311 440.935 53.4786 440.935 55.9035V102.967H424.732V71.0036C424.732 67.697 424.108 65.4926 422.859 64.3904C421.683 63.2147 420.287 62.6269 418.67 62.6269C416.539 62.6269 414.849 63.325 413.6 64.7211C412.425 66.0437 411.837 67.7705 411.837 69.9014V102.967H395.855C395.855 100.543 395.855 98.0075 395.855 95.3622C395.928 92.6435 395.965 89.9614 395.965 87.3162C395.965 84.5974 395.965 81.9154 395.965 79.2701C395.965 76.6248 395.965 74.1265 395.965 71.7752C395.965 70.379 395.965 68.2849 395.965 65.4926C395.965 62.7004 395.928 59.651 395.855 56.3444C395.855 53.0378 395.855 49.6577 395.855 46.2041C395.855 42.7506 395.855 39.7011 395.855 37.0559H411.837Z"
      fill="white"
    />
    <path
      d="M366.81 35.8435C375.775 35.8435 382.168 38.7826 385.988 44.661C389.883 50.5394 391.83 58.9896 391.83 70.0116C391.83 81.1071 389.883 89.594 385.988 95.4724C382.168 101.277 375.775 104.18 366.81 104.18C357.772 104.18 351.306 101.277 347.412 95.4724C343.591 89.594 341.68 81.1071 341.68 70.0116C341.68 58.9896 343.591 50.5394 347.412 44.661C351.306 38.7826 357.772 35.8435 366.81 35.8435ZM366.81 78.2781C368.28 78.2781 369.566 77.9842 370.668 77.3964C371.844 76.8085 372.799 76.037 373.534 75.0817C374.268 74.1265 374.82 73.061 375.187 71.8854C375.554 70.6362 375.738 69.3503 375.738 68.0277C375.738 66.705 375.554 65.4191 375.187 64.17C374.82 62.9208 374.268 61.8186 373.534 60.8634C372.799 59.9081 371.844 59.1366 370.668 58.5488C369.566 57.9609 368.28 57.667 366.81 57.667C363.798 57.667 361.52 58.7325 359.977 60.8634C358.507 62.9943 357.772 65.3824 357.772 68.0277C357.772 69.3503 357.956 70.6362 358.323 71.8854C358.691 73.061 359.242 74.1265 359.977 75.0817C360.785 76.037 361.74 76.8085 362.842 77.3964C363.945 77.9842 365.267 78.2781 366.81 78.2781Z"
      fill="white"
    />
    <path
      d="M326.18 11.4845C328.826 11.4845 331.104 11.6682 333.014 12.0356C334.998 12.3295 336.835 12.7704 338.525 13.3582C338.525 14.6074 338.525 15.93 338.525 17.3261C338.599 18.7222 338.635 20.2286 338.635 21.8451C338.635 23.4617 338.599 25.1885 338.525 27.0255C338.525 28.789 338.525 30.4423 338.525 31.9854C335.733 30.2218 332.389 29.3401 328.495 29.3401C324.821 29.3401 321.735 30.0381 319.237 31.4343C316.812 32.7569 314.828 34.4837 313.285 36.6146C311.815 38.7455 310.75 41.0969 310.088 43.6687C309.5 46.167 309.207 48.5551 309.207 50.833C309.207 53.9191 309.684 56.8216 310.639 59.5403C311.595 62.2591 312.917 64.6472 314.607 66.7046C316.371 68.6886 318.392 70.2684 320.669 71.4441C323.021 72.6198 325.556 73.2076 328.275 73.2076C329.524 73.2076 331.104 73.0239 333.014 72.6565C334.998 72.2891 336.835 71.591 338.525 70.5623C338.525 73.1341 338.525 75.8161 338.525 78.6084C338.599 81.4006 338.635 84.1194 338.635 86.7646C338.635 89.5569 338.599 92.2756 338.525 94.9209C338.525 97.5662 338.525 100.211 338.525 102.857C334.41 103.739 330.222 104.179 325.96 104.179C319.494 104.179 313.689 103.114 308.545 100.983C303.475 98.8521 299.14 95.8027 295.539 91.8348C292.012 87.7934 289.293 82.9437 287.383 77.2857C285.546 71.5543 284.627 65.1615 284.627 58.1075C284.627 51.3473 285.509 45.1383 287.273 39.4803C289.036 33.7489 291.645 28.8257 295.098 24.7108C298.625 20.5225 302.961 17.2894 308.104 15.0115C313.321 12.6601 319.347 11.4845 326.18 11.4845Z"
      fill="white"
    />
    <path
      d="M258.424 24.2704H273.525V37.056H282.012V66.3745H273.304V81.8052C273.304 84.8179 273.561 86.8386 274.076 87.8673C274.59 88.8226 275.766 89.3002 277.603 89.3002C278.117 89.3002 278.815 89.2635 279.697 89.19C280.579 89.1165 281.24 89.0063 281.681 88.8593C281.828 89.3737 281.901 90.4391 281.901 92.0557C281.901 93.5988 281.901 95.1786 281.901 96.7952C281.901 98.1913 281.901 99.4772 281.901 100.653C281.901 101.755 281.865 102.527 281.791 102.967C280.909 103.114 279.917 103.225 278.815 103.298C277.786 103.445 276.758 103.555 275.729 103.629C274.774 103.702 273.855 103.739 272.973 103.739C272.165 103.812 271.504 103.849 270.99 103.849C268.344 103.849 266.177 103.335 264.487 102.306C262.797 101.277 261.474 99.918 260.519 98.228C259.563 96.4645 258.902 94.5173 258.535 92.3864C258.167 90.182 257.984 87.9408 257.984 85.6629C257.984 84.7812 257.984 83.4953 257.984 81.8052C258.057 80.0417 258.094 78.2047 258.094 76.2942C258.167 74.3838 258.241 72.5468 258.314 70.7832C258.388 68.9463 258.424 67.4767 258.424 66.3745H251.811V37.056H258.424V24.2704Z"
      fill="white"
    />
    <path
      d="M217.923 68.2481C218.878 71.4077 220.458 73.9795 222.662 75.9635C224.867 77.9475 227.916 78.9394 231.811 78.9394C232.986 78.9394 234.236 78.866 235.558 78.719C236.954 78.4986 238.314 78.2414 239.636 77.9475C240.959 77.5801 242.208 77.2127 243.384 76.8453C244.559 76.4044 245.588 76.0002 246.47 75.6328C246.617 77.7638 246.69 80.0416 246.69 82.4665C246.764 84.8178 246.801 87.1692 246.801 89.5205C246.801 93.415 246.69 96.9053 246.47 99.9914C240.738 102.784 234.309 104.18 227.181 104.18C223.875 104.18 220.532 103.812 217.151 103.078C213.771 102.343 210.501 100.947 207.342 98.8892C204.55 97.0522 202.235 94.9213 200.398 92.4965C198.634 89.9982 197.238 87.4631 196.21 84.8913C195.181 82.246 194.483 79.6742 194.115 77.1759C193.748 74.6776 193.564 72.4365 193.564 70.4525C193.564 67.5133 193.895 64.4639 194.556 61.3042C195.291 58.0711 196.393 55.0217 197.863 52.156C199.333 49.2168 201.206 46.5348 203.484 44.1099C205.762 41.6851 208.444 39.7746 211.53 38.3785C215.278 36.6885 219.246 35.8435 223.434 35.8435C227.843 35.8435 231.811 36.7252 235.338 38.4887C238.865 40.2522 241.73 42.6771 243.935 45.7632C246.066 48.7024 247.388 51.9723 247.903 55.5728C248.491 59.1733 248.785 63.3984 248.785 68.2481H217.923ZM224.206 47.7472C222.662 47.7472 221.193 48.4085 219.797 49.7312C218.401 50.9803 217.482 53.2215 217.041 56.4546H231.48C231.186 53.5154 230.304 51.3477 228.835 49.9516C227.439 48.482 225.896 47.7472 224.206 47.7472Z"
      fill="white"
    />
    <path
      d="M155.519 52.2659C156.841 52.6333 158.09 52.8905 159.266 53.0374C160.515 53.1109 161.581 53.1476 162.462 53.1476C163.859 53.1476 165.181 53.0007 166.43 52.7068C167.753 52.3394 168.892 51.7515 169.847 50.9432C170.802 50.135 171.574 49.0695 172.162 47.7469C172.75 46.3508 173.044 44.5872 173.044 42.4563C173.044 40.2519 172.713 38.4517 172.052 37.0555C171.464 35.5859 170.655 34.447 169.627 33.6387C168.598 32.8304 167.386 32.2793 165.99 31.9854C164.667 31.6915 163.271 31.5445 161.801 31.5445C159.67 31.5445 157.576 31.765 155.519 32.2059V52.2659ZM136.671 102.967C136.891 95.9865 137.038 89.0426 137.112 82.1355C137.185 75.1549 137.222 68.5417 137.222 62.2959C137.222 53.4048 137.149 44.9546 137.002 36.9453C136.928 28.936 136.818 20.89 136.671 12.8072C140.272 12.4398 143.872 12.1458 147.473 11.9254C151.147 11.6315 154.747 11.4845 158.274 11.4845C163.344 11.4845 168.084 11.8887 172.492 12.6969C176.901 13.5052 180.722 15.0116 183.955 17.216C187.262 19.3469 189.871 22.3596 191.781 26.254C193.691 30.0749 194.647 34.9981 194.647 41.0235C194.647 46.6079 193.838 51.3841 192.222 55.352C190.605 59.2465 188.327 62.4429 185.388 64.9412C182.523 67.366 179.069 69.1295 175.028 70.2317C170.986 71.3339 166.504 71.885 161.581 71.885C160.332 71.885 159.229 71.8483 158.274 71.7748C157.392 71.7013 156.4 71.5911 155.298 71.4442C155.298 76.7347 155.335 81.9885 155.408 87.2056C155.482 92.4227 155.702 97.6765 156.07 102.967H136.671Z"
      fill="white"
    />
  </svg>
);
