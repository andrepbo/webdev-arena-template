import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ThumbsUp,
  MessageSquare,
  ImageIcon,
  Search,
  Flame,
  Clock,
  Users,
  LucideIcon,
  Home,
  Compass,
  Plus,
  Bell,
  User,
  Square,
  VideoIcon,
} from "lucide-react";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";

type UserProfileHeaderProps = {
  name: string;
  username: string;
  bio: string;
  location: string;
  joinedDate: string;
  website?: string;
  avatarUrl: string;
  isFollowing: boolean;
};

type UserProfileProps = {
  user: User;
  challenges: Challenge[];
  setSelectedUser: (user: User | null) => void;
  setActiveMenu: (
    menu: "home" | "explore" | "plus" | "notifications" | "profile"
  ) => void;
};

type StatProps = { label: string; value: string };

type BadgeProps = {
  label: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
};

type AchievementBadgesProps = {
  badges: BadgeProps[];
};

type User = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  url: string;
  following: boolean;
  followerCount: number;
  followingCount: number;
};

type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
};

type Challenge = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  urlAvatar: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  category: string;
  cheers: number;
  cheeredBy: string[];
  timestamp: string;
  comments: Comment[];
  bgColor?: string;
};

type FilterKey = "newest" | "cheered" | "friends";

type FilterTabsProps = {
  selected: FilterKey;
  onChange: (value: FilterKey) => void;
};

type MenuKey = "home" | "explore" | "plus" | "notifications" | "profile";

type FooterNavProps = {
  activeMenu: MenuKey;
  onChange: (menu: MenuKey) => void;
};

type CreateChallengeModalProps = {
  onClose: () => void;
  onSubmit: (data: z.infer<typeof challengeSchema>) => void;
  challengeForm: ReturnType<typeof useForm<z.infer<typeof challengeSchema>>>;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const challengeSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.any().optional(),
    video: z.any().optional(),
    type: z.string().min(1, "Type is required"),
    duration: z.string().min(1, "Duration is required"),
    bgColor: z.string().optional(),
    layout: z.string().nullable().optional(),
    privacy: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasImage = data.image instanceof FileList && data.image.length > 0;
      const hasVideo = data.video instanceof FileList && data.video.length > 0;
      return !(hasImage && hasVideo);
    },
    {
      message: "Please upload either an image or a video, not both.",
      path: ["image"],
    }
  );

const placeholderUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    bio: "Adventure seeker and recipe enthusiast",
    avatar: "AJ",
    following: false,
    url: "https://i.pravatar.cc/100?img=63",
    followerCount: 892,
    followingCount: 156,
  },
  {
    id: "2",
    name: "Jamie Smith",
    bio: "Lover of heights and healthy living",
    avatar: "JS",
    following: true,
    url: "https://i.pravatar.cc/100?img=64",
    followerCount: 432,
    followingCount: 87,
  },
  {
    id: "3",
    name: "Taylor Green",
    bio: "Foodie with a fear of spiders",
    avatar: "TG",
    following: false,
    url: "https://i.pravatar.cc/100?img=65",
    followerCount: 215,
    followingCount: 59,
  },
];

const placeholderChallenges: Omit<Challenge, "comments">[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alex Johnson",
    userAvatar: "AJ",
    title: "Cooking a New Recipe",
    description: "Trying a new Thai curry recipe tonight!",
    image: undefined,
    cheers: 15,
    cheeredBy: [],
    timestamp: "2025-04-20T14:30:00Z",
    urlAvatar: "https://i.pravatar.cc/100?img=63",
    bgColor: "#D946EF",
    category: "Bookworm",
  },
  {
    id: "2",
    userId: "2",
    userName: "Jamie Smith",
    userAvatar: "JS",
    title: "Overcoming Fear of Heights",
    description: "Just climbed a small rock wall for the first time!",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cheers: 42,
    cheeredBy: [],
    timestamp: "2025-04-19T10:15:00Z",
    urlAvatar: "https://i.pravatar.cc/100?img=64",
    bgColor: "#F59E0B",
    category: "Academic Achievement",
  },
  {
    id: "3",
    userId: "3",
    userName: "Taylor Green",
    userAvatar: "TG",
    title: "Learning to Skate",
    description: "First time on roller skates - wish me luck!",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cheers: 28,
    cheeredBy: [],
    timestamp: "2025-04-18T16:45:00Z",
    urlAvatar: "https://i.pravatar.cc/100?img=65",
    category: "Content Creator",
  },
];

const placeholderComments: Comment[] = [
  {
    id: "1",
    userId: "2",
    userName: "Jamie Smith",
    text: "Looks delicious! Would love the recipe",
    timestamp: "2025-04-20T14:45:00Z",
  },
  {
    id: "2",
    userId: "3",
    userName: "Taylor Green",
    text: "You got this! Heights are exhilarating",
    timestamp: "2025-04-19T10:30:00Z",
  },
  {
    id: "3",
    userId: "1",
    userName: "Alex Johnson",
    text: "What made you decide to try roller skates?",
    timestamp: "2025-04-18T17:00:00Z",
  },
];

const FilterTabs: React.FC<FilterTabsProps> = ({ selected, onChange }) => {
  const tabs: { key: FilterKey; label: string; icon: LucideIcon }[] = [
    { key: "newest", label: "Newest", icon: Clock },
    { key: "cheered", label: "Most Cheered", icon: Flame },
    { key: "friends", label: "Friends", icon: Users },
  ];

  return (
    <div className="flex gap-3 mt-4 px-4 md:px-0">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = selected === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-gray-900 text-white border-transparent dark:bg-white dark:text-gray-900"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

const FooterNav = ({ activeMenu: active, onChange }: FooterNavProps) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#1F2937] h-14 md:hidden">
      <div className="flex justify-around items-center h-full">
        <button
          onClick={() => onChange("home")}
          className={`text-sm ${
            active === "home" ? "text-white" : "text-[#9BA3AF]"
          }`}
        >
          <Home className="h-6 w-6" />
        </button>
        <button
          onClick={() => onChange("explore")}
          className={`text-sm ${
            active === "explore" ? "text-white" : "text-[#9BA3AF]"
          }`}
        >
          <Compass className="h-6 w-6" />
        </button>
        <div className="w-12" />
        <button
          onClick={() => onChange("notifications")}
          className={`text-sm ${
            active === "notifications" ? "text-white" : "text-[#9BA3AF]"
          }`}
        >
          <Bell className="h-6 w-6" />
        </button>
        <button
          onClick={() => onChange("profile")}
          className={`text-sm ${
            active === "profile" ? "text-white" : "text-[#9BA3AF]"
          }`}
        >
          <User className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => onChange("plus")}
          className="bg-[#FF3F5C] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

const CreateChallengeModal = ({
  onClose,
  onSubmit,
  challengeForm,
}: CreateChallengeModalProps) => {
  useEffect(() => {
    const subscription = challengeForm.watch((value, { name }) => {
      if (name === "image" && value.image?.length) {
        challengeForm.setValue("video", undefined);
      } else if (name === "video" && value.video?.length) {
        challengeForm.setValue("image", undefined);
      }
    });

    return () => subscription.unsubscribe();
  }, [challengeForm]);
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-6 w-full max-w-5xl max-h-[calc(100vh-4rem)] overflow-y-auto space-y-4">
        <h2 className="text-xl font-bold text-left">Create New Challenge</h2>

        <form
          onSubmit={challengeForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">Challenge Name</label>
            <Input
              placeholder="What's your next adventure?"
              {...challengeForm.register("title", { required: true })}
              className={cn(
                "!border !ring-0 focus:outline-none dark:bg-[#374151]",
                challengeForm.formState.errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
            />
            {challengeForm.formState.errors.title && (
              <p className="text-sm text-red-500 mt-1">
                This field is required
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Challenge Type</label>
              <select
                {...challengeForm.register("type", { required: true })}
                className={cn(
                  "w-full px-3 py-2 rounded-md dark:bg-[#374151] !border !ring-0",
                  challengeForm.formState.errors.type
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                )}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a type
                </option>
                <option value="fitness">Fitness</option>
                <option value="learning">Learning</option>
                <option value="creative">Creative</option>
              </select>
              {challengeForm.formState.errors.type && (
                <p className="text-sm text-red-500 mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">Duration</label>
              <select
                {...challengeForm.register("duration", { required: true })}
                className={cn(
                  "w-full px-3 py-2 rounded-md dark:bg-[#374151] !border !ring-0",
                  challengeForm.formState.errors.duration
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                )}
                defaultValue="one-time"
              >
                <option value="one-time">One-time Challenge</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
              {challengeForm.formState.errors.duration && (
                <p className="text-sm text-red-500 mt-1">
                  This field is required
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <Textarea
              placeholder="Tell us more about your challenge..."
              {...challengeForm.register("description", { required: true })}
              className={cn(
                "dark:bg-[#374151] !border !ring-0",
                challengeForm.formState.errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
            />
            {challengeForm.formState.errors.description && (
              <p className="text-sm text-red-500 mt-1">
                This field is required
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Style Options</label>
              <div className="flex gap-2 mt-1">
                {["#F25EF1", "#3B82F6", "#10B981", "#F59E0B", "#FFFFFF"].map(
                  (color) => {
                    const selected = challengeForm.watch("bgColor") === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => challengeForm.setValue("bgColor", color)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          selected
                            ? "ring-2 ring-offset-2 ring-gray-800 dark:ring-white"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    );
                  }
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-900 dark:text-white">
                Card Layout
              </label>
              <div className="flex gap-2">
                <label
                  className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer transition-all ${
                    challengeForm.watch("layout") === "full"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white/70"
                  }`}
                >
                  <input
                    type="radio"
                    value="full"
                    {...challengeForm.register("layout")}
                    className="hidden"
                  />
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-4 h-4 text-black dark:text-white" />
                    Full
                  </span>
                </label>

                <label
                  className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer transition-all ${
                    challengeForm.watch("layout") === "compact"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white/70"
                  }`}
                >
                  <input
                    type="radio"
                    value="compact"
                    {...challengeForm.register("layout")}
                    className="hidden"
                  />
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4 text-black dark:text-white fill-current" />
                    Compact
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-900 dark:text-white">
              Media (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              >
                <ImageIcon className="w-6 h-6 mb-2" />
                <span className="text-sm">Upload Image</span>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  {...challengeForm.register("image")}
                  className="hidden"
                />
              </label>

              <label
                htmlFor="video-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              >
                <VideoIcon className="w-6 h-6 mb-2" />
                <span className="text-sm">Upload Video</span>
                <input
                  type="file"
                  id="video-upload"
                  accept="video/*"
                  {...challengeForm.register("video")}
                  className="hidden"
                />
              </label>
            </div>

            {/* MEDIA PREVIEW */}
            {(challengeForm.watch("image")?.[0] ||
              challengeForm.watch("video")?.[0]) && (
              <div className="mt-4 relative">
                {challengeForm.watch("image")?.[0] && (
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(challengeForm.watch("image")[0])}
                      alt="Selected"
                      className="max-w-xs rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={() => challengeForm.setValue("image", undefined)}
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {challengeForm.watch("video")?.[0] && (
                  <div className="relative inline-block">
                    <video
                      controls
                      src={URL.createObjectURL(challengeForm.watch("video")[0])}
                      className="max-w-xs rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={() => challengeForm.setValue("video", undefined)}
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {typeof challengeForm.formState.errors.image?.message ===
              "string" && (
              <p className="text-sm text-red-500 mt-1">
                {challengeForm.formState.errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">Privacy</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="public"
                  {...challengeForm.register("privacy")}
                  defaultChecked
                />{" "}
                Public
              </label>
              <label>
                <input
                  type="radio"
                  value="friends"
                  {...challengeForm.register("privacy")}
                />{" "}
                Friends Only
              </label>
              <label>
                <input
                  type="radio"
                  value="private"
                  {...challengeForm.register("privacy")}
                />{" "}
                Private
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#F43F5E] text-white">
              Post Challenge
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserProfileHeader = ({
  name,
  username,
  bio,
  location,
  joinedDate,
  website,
  avatarUrl,
  isFollowing,
}: UserProfileHeaderProps) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex items-center gap-4">
      <img
        src={avatarUrl}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-gray-500 dark:text-gray-400">{username}</p>
        <p className="mt-2 max-w-xl text-sm text-gray-700 dark:text-gray-300">
          {bio}
        </p>
        <div className="mt-2 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>📍 {location}</span>
          <span>📅 Joined {joinedDate}</span>
          {website && (
            <a
              href={`https://${website}`}
              className="hover:underline text-blue-600 dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 {website}
            </a>
          )}
        </div>
      </div>
    </div>

    <button className="border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
      {isFollowing ? "Following" : "Follow"}
    </button>
  </div>
);

export const StatsBar = ({ stats }: { stats: StatProps[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-center"
      >
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {stat.value}
        </p>
        <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
      </div>
    ))}
  </div>
);

const AchievementBadges = ({ badges }: AchievementBadgesProps) => {
  return (
    <section className="text-white">
      <h2 className="text-xl text-black dark:text-white font-semibold mb-4">
        Achievement Badges
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-[#1E293B] rounded-xl px-4 py-3"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-xl ${badge.colorClass}`}
            >
              {badge.icon}
            </div>
            <div>
              <p className="font-semibold">{badge.label}</p>
              <p className="text-sm text-gray-400">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const UserProfile = ({
  user,
  challenges,
  setSelectedUser,
  setActiveMenu,
}: UserProfileProps) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <UserProfileHeader
        name={user.name}
        username={`@${user.name.toLowerCase().replace(/\s/g, "")}`}
        bio="Challenging myself one quest at a time!"
        location="São Paulo, Brazil"
        joinedDate="Joined in Jan 2024"
        website="https://example.com"
        avatarUrl={user.url}
        isFollowing={user.following}
      />

      <StatsBar
        stats={[
          { label: "Challenges", value: challenges.length.toString() },
          {
            label: "Cheers",
            value: challenges.reduce((sum, c) => sum + c.cheers, 0).toString(),
          },
          { label: "Following", value: "156" },
          { label: "Followers", value: "892" },
        ]}
      />

      <AchievementBadges
        badges={[
          {
            label: "30-Day Streak",
            description: "Completed 30 daily challenges",
            icon: "🔥",
            colorClass: "bg-purple-600 text-white",
          },
          {
            label: "Bookworm",
            description: "Read 10 books this year",
            icon: "📘",
            colorClass: "bg-blue-600 text-white",
          },
          {
            label: "Explorer",
            description: "Completed 5 outdoor adventures",
            icon: "🧭",
            colorClass: "bg-green-600 text-white",
          },
        ]}
      />

      <section>
        <h2 className="text-lg font-semibold mb-2">My Quests</h2>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                style={{ backgroundColor: challenge.bgColor || "#F25EF1" }}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold text-black dark:text-white">
                    {challenge.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {challenge.category}
                  </CardDescription>
                </CardHeader>

                {challenge.image && (
                  <CardContent className="px-4 pb-4">
                    <img
                      src={challenge.image}
                      alt="Challenge"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </CardContent>
                )}

                {challenge.video && (
                  <CardContent className="px-4 pb-4">
                    <video
                      src={challenge.video}
                      controls
                      className="w-full h-48 rounded-md"
                    />
                  </CardContent>
                )}

                <CardFooter className="px-4 pb-4 flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {challenge.cheers} Cheers
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </section>

      <div className="flex justify-between items-center pt-6">
        <Button variant="outline" onClick={() => setSelectedUser(null)}>
          Back to Feed
        </Button>
        <Button
          className="bg-[#F43F5E] hover:bg-[#e83957] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all"
          onClick={() => setActiveMenu("plus")}
        >
          + Start a Quest
        </Button>
      </div>
    </div>
  );
};

const ChallengeFeed = () => {
  const USERS_KEY = "questquips.users";
  const CHALLENGES_KEY = "questquips.challenges";
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [commentText, setCommentText] = useState("");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "following" | "my">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeMenu, setActiveMenu] = useState<
    "home" | "explore" | "plus" | "notifications" | "profile"
  >("home");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [, setMounted] = useState(false);
  const [filter, setFilter] = useState<"newest" | "cheered" | "friends">(
    "newest"
  );

  const challengeForm = useForm<z.infer<typeof challengeSchema>>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      bgColor: "#F25EF1",
    },
  });

  useEffect(() => {
    setMounted(true);

    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      try {
        const parsed = JSON.parse(storedUsers);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].url) {
          setUsers(parsed);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (e) {
        console.error("Failed to parse stored users", e);
        setUsers(placeholderUsers);
        localStorage.setItem(USERS_KEY, JSON.stringify(placeholderUsers));
      }
    } else {
      setUsers(placeholderUsers);
      localStorage.setItem(USERS_KEY, JSON.stringify(placeholderUsers));
    }

    const stored = localStorage.getItem(CHALLENGES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setChallenges(parsed);
      } catch (e) {
        console.error("Failed to parse stored challenges", e);
        setChallenges([]);
      }
    } else {
      const demoChallenges = placeholderChallenges
        .slice(0, 3)
        .map((challenge) => ({
          ...challenge,
          comments: placeholderComments.filter(
            (comment) => comment.userId === challenge.userId
          ),
        }));

      setChallenges(demoChallenges);
      localStorage.setItem(CHALLENGES_KEY, JSON.stringify(demoChallenges));
    }
  }, []);

  const getUserById = (id: string) =>
    users.find((user) => user.id === id) || placeholderUsers[0];

  const generateId = () => Date.now().toString(36) + Math.random().toString();

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const currentUser = users.length > 0 ? users[0] : null;

  const handleCreateChallenge = (data: z.infer<typeof challengeSchema>) => {
    if (!currentUser) return;

    const imageFile =
      data.image instanceof FileList && data.image.length > 0
        ? data.image[0]
        : null;

    const videoFile =
      data.video instanceof FileList && data.video.length > 0
        ? data.video[0]
        : null;

    const newChallenge: Challenge = {
      id: generateId(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      urlAvatar: currentUser.url,
      title: data.title,
      description: data.description,
      image: imageFile ? URL.createObjectURL(imageFile) : undefined,
      video: videoFile ? URL.createObjectURL(videoFile) : undefined,
      category: data.type,
      cheers: 0,
      cheeredBy: [],
      timestamp: new Date().toISOString(),
      comments: [],
      bgColor: data.bgColor,
    };

    const updatedChallenges = [newChallenge, ...challenges];
    setChallenges(updatedChallenges);
    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(updatedChallenges));
    challengeForm.reset();
    setActiveMenu("home");
  };

  const handleAddComment = (challengeId: string) => {
    if (!commentText.trim() || !currentUser) return;

    const newComment: Comment = {
      id: generateId(),
      userId: currentUser.id,
      userName: currentUser.name,
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === challengeId
        ? {
            ...challenge,
            comments: [...challenge.comments, newComment],
          }
        : challenge
    );

    setChallenges(updatedChallenges);
    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(updatedChallenges));
    setCommentText("");
  };

  const handleToggleFollow = (userId: string) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, following: !user.following };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        following: !selectedUser.following,
      });
    }
  };

  const handleToggleCheer = (challengeId: string) => {
    if (!currentUser) return;
    const currentUserId = currentUser.id;

    const updatedChallenges = challenges.map((challenge) => {
      if (challenge.id !== challengeId) return challenge;

      if (challenge.cheeredBy.includes(currentUserId)) {
        return challenge;
      }

      return {
        ...challenge,
        cheers: challenge.cheers + 1,
        cheeredBy: [...challenge.cheeredBy, currentUserId],
      };
    });

    setChallenges(updatedChallenges);
    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(updatedChallenges));

    if (selectedChallenge?.id === challengeId) {
      setSelectedChallenge((prev) =>
        prev
          ? {
              ...prev,
              cheers: prev.cheers + 1,
              cheeredBy: [...prev.cheeredBy, currentUserId],
            }
          : prev
      );
    }
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesTab =
      activeTab === "following"
        ? getUserById(challenge.userId).following
        : activeTab === "my"
        ? currentUser && challenge.userId === currentUser.id
        : true;

    const matchesFilter =
      filter !== "friends"
        ? true
        : getUserById(challenge.userId).following &&
          currentUser &&
          challenge.userId !== currentUser.id;

    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.userName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesFilter && matchesSearch;
  });

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    if (filter === "cheered") {
      return b.cheers - a.cheers;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  if (!currentUser) return null;

  if (selectedUser) {
    const userChallenges = challenges.filter(
      (challenge) => challenge.userId === selectedUser.id
    );

    return (
      <UserProfile
        user={selectedUser}
        challenges={userChallenges}
        setSelectedUser={setSelectedUser}
        setActiveMenu={setActiveMenu}
      />
    );
  }

  return (
    <div
      className={`${roboto.className} min-h-screen bg-white dark:bg-gray-900`}
    >
      <header className="bg-[#F1F4FA] dark:bg-gray-900 shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-extrabold text-[#F43F5E] tracking-tight">
              QuestQuips
            </h1>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              <button
                className={`transition-colors ${
                  activeTab === "all"
                    ? "text-black dark:text-white font-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Quests
              </button>
              <button
                className={`transition-colors ${
                  activeTab === "following"
                    ? "text-black dark:text-white font-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
              <button
                className={`transition-colors ${
                  activeTab === "my"
                    ? "text-black dark:text-white font-semibold"
                    : ""
                }`}
                onClick={() => {
                  setSelectedUser(currentUser);
                  setActiveTab("my");
                }}
              >
                My Quests
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search quests or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="h-10 w-10 rounded-full p-[2px] bg-gradient-to-b from-yellow-400 to-purple-500 dark:hidden">
              <Avatar
                className="h-full w-full rounded-full bg-white overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedUser(currentUser);
                  setActiveTab("my");
                }}
              >
                <img
                  src={currentUser.url}
                  alt="User avatar"
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="text-gray-700">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="h-10 w-10 rounded-full bg-gray-800 hidden dark:block">
              <Avatar
                className="h-full w-full rounded-full bg-gray-900 overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedUser(currentUser);
                  setActiveTab("my");
                }}
              >
                <img
                  src={currentUser.url}
                  alt="User avatar"
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="text-gray-200">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-screen-2xl mx-auto px-4 py-6 grid grid-cols-1 gap-6">
        {selectedUser ? (
          <UserProfile
            user={selectedUser}
            challenges={challenges.filter(
              (c) => c.userId === (selectedUser as User).id
            )}
            setSelectedUser={setSelectedUser}
            setActiveMenu={setActiveMenu}
          />
        ) : (
          <section className="space-y-6 md:col-span-2">
            <FilterTabs selected={filter} onChange={setFilter} />
            <ScrollArea className="h-[calc(100vh-200px-64px)] md:h-[calc(100vh-200px)] pr-4">
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 md:auto-rows-min items-start">
                {sortedChallenges.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-500">
                      {activeTab === "all"
                        ? "No challenges yet. Be the first to post one!"
                        : "You're not following anyone yet. Follow users to see their challenges here."}
                    </p>
                  </div>
                ) : (
                  sortedChallenges.map((challenge) => (
                    <Card
                      key={challenge.id}
                      className={`overflow-hidden rounded-2xl transition-shadow border-0 shadow-none ${
                        challenge.bgColor
                          ? ""
                          : "bg-[#F25EF1] text-gray-900 dark:bg-[#F25EF1] dark:text-gray-900"
                      }`}
                      style={{
                        backgroundColor: challenge.bgColor || "#F25EF1",
                      }}
                    >
                      <CardHeader className="pb-0 pt-4 px-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <img
                                src={challenge.urlAvatar}
                                alt={challenge.userName}
                                className="h-full w-full object-cover rounded-full"
                              />
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold">
                                {challenge.userName}
                              </p>
                              <p className="text-xs text-gray-800/70">
                                {formatTimestamp(challenge.timestamp)}
                              </p>
                            </div>
                          </div>

                          {challenge.userId !== currentUser.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-4 border border-gray-800 text-gray-800 dark:border-gray-900 dark:text-gray-900 font-medium rounded-full hover:bg-white hover:text-black transition"
                              onClick={() =>
                                handleToggleFollow(challenge.userId)
                              }
                            >
                              {getUserById(challenge.userId).following
                                ? "Following"
                                : "Follow"}
                            </Button>
                          )}
                        </div>

                        {challenge.category && (
                          <div>
                            <span className="inline-block w-fit bg-white/20 text-white font-medium text-xs px-3 py-1 rounded-full">
                              {challenge.category.charAt(0).toUpperCase() +
                                challenge.category.slice(1)}
                            </span>
                          </div>
                        )}
                      </CardHeader>

                      <CardContent className="pt-4 px-4 pb-2">
                        <CardTitle className="text-2xl font-bold">
                          {challenge.title}
                        </CardTitle>

                        {challenge.image && (
                          <div className="w-full overflow-hidden rounded-xl mt-4">
                            <img
                              src={challenge.image}
                              alt="Challenge"
                              className="w-full object-cover rounded-xl"
                            />
                          </div>
                        )}

                        {challenge.video && (
                          <div className="w-full overflow-hidden rounded-xl mt-4">
                            <video
                              src={challenge.video}
                              controls
                              className="w-full rounded-xl"
                            />
                          </div>
                        )}
                        {selectedChallenge?.id === challenge.id && (
                          <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <Textarea
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="flex-1 dark:bg-[#374151] placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                                rows={2}
                              />
                              <Button
                                onClick={() => handleAddComment(challenge.id)}
                                className="bg-[#F43F5E] text-white"
                              >
                                Post
                              </Button>
                            </div>
                            {challenge.comments.length > 0 && (
                              <div className="space-y-2 mt-2">
                                {challenge.comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className="text-sm border-b pb-1 border-gray-200 dark:border-gray-700"
                                  >
                                    <strong>{comment.userName}:</strong>{" "}
                                    {comment.text}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="flex justify-between items-center px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={challenge.cheeredBy.includes(
                            currentUser.id
                          )}
                          className="bg-white text-black font-medium rounded-full px-4 hover:bg-white/90"
                          onClick={() => {
                            handleToggleCheer(challenge.id);
                            setSelectedChallenge(challenge);
                            setSelectedUser(null);
                          }}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {challenge.cheers} Cheers
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-black hover:text-gray-700"
                          onClick={() => {
                            setSelectedChallenge(challenge);
                            setSelectedUser(null);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
            <div className="hidden md:flex justify-end pr-4">
              <Button
                className="bg-[#F43F5E] hover:bg-[#e83957] text-white font-semibold px-8 py-4 rounded-full text-lg shadow-xl transition-all"
                onClick={() => setActiveMenu("plus")}
              >
                + Start a Quest
              </Button>
            </div>
          </section>
        )}
      </main>

      <FooterNav activeMenu={activeMenu} onChange={setActiveMenu} />
      {activeMenu === "plus" && (
        <CreateChallengeModal
          challengeForm={challengeForm}
          onClose={() => setActiveMenu("home")}
          onSubmit={handleCreateChallenge}
        />
      )}
    </div>
  );
};

export default ChallengeFeed;
