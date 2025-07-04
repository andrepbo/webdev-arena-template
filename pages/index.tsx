"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Check,
  Compass,
  Heart,
  Home,
  ImageIcon,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  ShoppingBag,
  Smile,
  Star,
  Users,
  Video,
  X,
} from "lucide-react";
import { Nunito } from "next/font/google";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

const nunito = Nunito({ subsets: ["latin"] });

interface StoryData {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  images: string[];
  timestamp: Date;
  viewed: boolean;
}

interface Post {
  id: number;
  author: string;
  location: string;
  avatar: string;
  content?: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  reactions?: string[];
}

interface Contact {
  name: string;
  location: string;
  avatar: string;
  phone?: string;
  email?: string;
  status?: "online" | "offline";
  bio?: string;
  joinDate?: string;
}

interface Suggestion extends Contact {
  id: number;
  mutualFriends: number;
}

interface ChatMessage {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isFromCurrentUser: boolean;
  contactId: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  image: string;
  icon: string;
  iconColor: string;
}

interface AppContextType {
  isMobileChatOpen: boolean;
  isMobileNavOpen: boolean;
  isEventsDialogOpen: boolean;
  isStoryViewerOpen: boolean;
  isContactProfileOpen: boolean;
  isChatDialogOpen: boolean;
  isFollowersModalOpen: boolean;
  isGroupsDialogOpen: boolean;
  currentStoryIndex: number;
  currentImageIndex: number;
  storyProgress: number;
  selectedContact: Contact | null;
  selectedChatContact: Contact | null;
  stories: StoryData[];
  setStories: React.Dispatch<React.SetStateAction<StoryData[]>>;
  posts: Post[];
  newPostText: string;
  newPostImage: string | null;
  suggestions: Suggestion[];
  followedContacts: Contact[];
  followers: Contact[];
  ignoredSuggestionIds: Set<number>;
  chatMessages: ChatMessage[];
  newMessageText: string;
  globalSearchQuery: string;
  rightBarSearchQuery: string;
  toggleMobileChat: () => void;
  closeMobileChat: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  openEventsDialog: () => void;
  closeEventsDialog: () => void;
  openStoryViewer: (storyIndex: number) => void;
  closeStoryViewer: () => void;
  openContactProfile: (contact: Contact) => void;
  closeContactProfile: () => void;
  openChatDialog: (contact: Contact) => void;
  closeChatDialog: () => void;
  openFollowersModal: () => void;
  closeFollowersModal: () => void;
  openGroupsDialog: () => void;
  closeGroupsDialog: () => void;
  sendMessage: (message: string) => void;
  setNewMessageText: (text: string) => void;
  setGlobalSearchQuery: (query: string) => void;
  setRightBarSearchQuery: (query: string) => void;
  nextStoryImage: () => void;
  prevStoryImage: () => void;
  setStoryProgress: (progress: number) => void;
  addNewPost: (content: string, image?: string) => void;
  setNewPostText: (text: string) => void;
  setNewPostImage: (image: string | null) => void;
  clearNewPost: () => void;
  showComingSoonToast: () => void;
  followSuggestion: (id: number) => void;
  ignoreSuggestion: (id: number) => void;
  unfollowContact: (email: string) => void;
  removeFollower: (email: string) => void;
  joinedGroups: Set<number>;
  handleJoinGroup: (groupId: number) => void;
  groupList: Group[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEventsDialogOpen, setIsEventsDialogOpen] = useState(false);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [isContactProfileOpen, setIsContactProfileOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isGroupsDialogOpen, setIsGroupsDialogOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [followedContacts, setFollowedContacts] = useState<Contact[]>([]);
  const [followers, setFollowers] = useState<Contact[]>([
    {
      name: "Anna Konjufca",
      location: "Tirana, Albania",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "anna.konjufca@example.com",
    },
    {
      name: "Mike Finavskie",
      location: "Sydney, Australia",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "mike.finavskie@example.com",
    },
  ]);
  const [ignoredSuggestionIds, setIgnoredSuggestionIds] = useState<Set<number>>(
    new Set()
  );
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [selectedChatContact, setSelectedChatContact] =
    useState<Contact | null>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [rightBarSearchQuery, setRightBarSearchQuery] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<Set<number>>(new Set());
  const [groupList, setGroupList] = useState<Group[]>(groups);

  // Sample chat data for each contact
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    // Julia Clarke conversation
    {
      id: 1,
      senderId: "julia.clarke@example.com",
      contactId: "julia.clarke@example.com",
      senderName: "Julia Clarke",
      content: "Hey! How's your new design project going?",
      timestamp: new Date(Date.now() - 3600000),
      isFromCurrentUser: false,
    },
    {
      id: 2,
      senderId: "current-user",
      contactId: "julia.clarke@example.com",
      senderName: "Cyndy Littbridge",
      content:
        "It's going really well! Thanks for asking. The client loves the mockups.",
      timestamp: new Date(Date.now() - 3400000),
      isFromCurrentUser: true,
    },
    {
      id: 3,
      senderId: "julia.clarke@example.com",
      contactId: "julia.clarke@example.com",
      senderName: "Julia Clarke",
      content:
        "That's awesome! I'd love to see them when you're ready to share.",
      timestamp: new Date(Date.now() - 3200000),
      isFromCurrentUser: false,
    },

    // Sara Cliene conversation
    {
      id: 4,
      senderId: "sara.cliene@example.com",
      contactId: "sara.cliene@example.com",
      senderName: "Sara Cliene",
      content: "Are you free for coffee this weekend?",
      timestamp: new Date(Date.now() - 7200000),
      isFromCurrentUser: false,
    },
    {
      id: 5,
      senderId: "current-user",
      contactId: "sara.cliene@example.com",
      senderName: "Cyndy Littbridge",
      content: "Yes! Saturday afternoon works for me. Same place as usual?",
      timestamp: new Date(Date.now() - 7000000),
      isFromCurrentUser: true,
    },
    {
      id: 6,
      senderId: "sara.cliene@example.com",
      contactId: "sara.cliene@example.com",
      senderName: "Sara Cliene",
      content: "Perfect! See you at 2pm ☕",
      timestamp: new Date(Date.now() - 6800000),
      isFromCurrentUser: false,
    },

    // Amy Ruth conversation
    {
      id: 7,
      senderId: "amy.ruth@example.com",
      contactId: "amy.ruth@example.com",
      senderName: "Amy Ruth",
      content: "Just saw your latest post! The photography is stunning 📸",
      timestamp: new Date(Date.now() - 1800000),
      isFromCurrentUser: false,
    },
    {
      id: 8,
      senderId: "current-user",
      contactId: "amy.ruth@example.com",
      senderName: "Cyndy Littbridge",
      content: "Thank you so much! It was such a beautiful sunrise that day.",
      timestamp: new Date(Date.now() - 1600000),
      isFromCurrentUser: true,
    },

    // Mark Stefine conversation
    {
      id: 9,
      senderId: "mark.stefine@example.com",
      contactId: "mark.stefine@example.com",
      senderName: "Mark Stefine",
      content:
        "Hope you're doing well! Been working on any interesting projects lately?",
      timestamp: new Date(Date.now() - 10800000),
      isFromCurrentUser: false,
    },
    {
      id: 10,
      senderId: "current-user",
      contactId: "mark.stefine@example.com",
      senderName: "Cyndy Littbridge",
      content: "Always! Just finished a mobile app redesign. How about you?",
      timestamp: new Date(Date.now() - 10600000),
      isFromCurrentUser: true,
    },

    // Trinity Sipson conversation
    {
      id: 11,
      senderId: "trinity.sipson@example.com",
      contactId: "trinity.sipson@example.com",
      senderName: "Trinity Sipson",
      content:
        "The event photos turned out amazing! Thank you for capturing those moments.",
      timestamp: new Date(Date.now() - 900000),
      isFromCurrentUser: false,
    },
    {
      id: 12,
      senderId: "current-user",
      contactId: "trinity.sipson@example.com",
      senderName: "Cyndy Littbridge",
      content: "You're so welcome! It was such a fun event to photograph.",
      timestamp: new Date(Date.now() - 800000),
      isFromCurrentUser: true,
    },

    // Albin Vjosa conversation
    {
      id: 13,
      senderId: "albin.vjosa@example.com",
      contactId: "albin.vjosa@example.com",
      senderName: "Albin Vjosa",
      content: "Hello! How are things going in New York?",
      timestamp: new Date(Date.now() - 5400000),
      isFromCurrentUser: false,
    },
    {
      id: 14,
      senderId: "current-user",
      contactId: "albin.vjosa@example.com",
      senderName: "Cyndy Littbridge",
      content:
        "Great! The city never sleeps, you know. How's Tokyo treating you?",
      timestamp: new Date(Date.now() - 5200000),
      isFromCurrentUser: true,
    },
  ]);

  const suggestions: Suggestion[] = [
    {
      id: 1,
      name: "Mohammad Rafli",
      location: "Jakarta, Indonesia",
      avatar:
        "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+62 (21) 8765-4321",
      email: "mohammad.rafli@example.com",
      status: "online",
      bio: "Frontend developer passionate about creating intuitive user interfaces.",
      joinDate: "June 2023",
      mutualFriends: 16,
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      location: "Barcelona, Spain",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+34 (93) 123-4567",
      email: "elena.rodriguez@example.com",
      status: "offline",
      bio: "Digital marketing specialist with a focus on social media strategy.",
      joinDate: "July 2023",
      mutualFriends: 12,
    },
    {
      id: 3,
      name: "David Chen",
      location: "Toronto, Canada",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+1 (416) 555-7890",
      email: "david.chen@example.com",
      status: "online",
      bio: "Product manager helping teams build amazing digital experiences.",
      joinDate: "August 2023",
      mutualFriends: 8,
    },
    {
      id: 4,
      name: "Sophie Martin",
      location: "Paris, France",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b372?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+33 (1) 23-45-67-89",
      email: "sophie.martin@example.com",
      status: "online",
      bio: "UX designer creating delightful user experiences for mobile apps.",
      joinDate: "September 2023",
      mutualFriends: 22,
    },
  ];

  const [stories, setStories] = useState<StoryData[]>([
    {
      id: 1,
      user: {
        name: "Julia",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      images: [
        "https://images.unsplash.com/photo-1747767763480-a5b4c7a82aef?q=80&w=904&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1750365866655-e712abd3ad46?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      timestamp: new Date(Date.now() - 3600000),
      viewed: false,
    },
    {
      id: 2,
      user: {
        name: "Amy",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      images: [
        "https://images.unsplash.com/photo-1750779940923-8d6cf0867df7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      timestamp: new Date(Date.now() - 7200000),
      viewed: false,
    },
    {
      id: 3,
      user: {
        name: "Mike",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      images: [
        "https://images.unsplash.com/photo-1747767763480-a5b4c7a82aef?q=80&w=904&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1750365866655-e712abd3ad46?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      timestamp: new Date(Date.now() - 1800000),
      viewed: false,
    },
    {
      id: 4,
      user: {
        name: "George",
        avatar:
          "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      images: [
        "https://images.unsplash.com/photo-1750779940923-8d6cf0867df7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      timestamp: new Date(Date.now() - 5400000),
      viewed: true,
    },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Anna Konjufca",
      location: "Tirana, Albania",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image:
        "https://images.unsplash.com/photo-1747767763480-a5b4c7a82aef?q=80&w=904&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      timestamp: new Date(Date.now() - 3600000),
      likes: 340,
      comments: 13,
      reactions: [
        "https://placehold.co/24x24/EF4444/FFFFFF?text=❤️",
        "https://placehold.co/24x24/F59E0B/FFFFFF?text=👍",
        "https://placehold.co/24x24/10B981/FFFFFF?text=😊",
      ],
    },
    {
      id: 2,
      author: "Mike Finavskie",
      location: "Sydney, Australia",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content:
        "If you think Adventure is dangerous, try routine, It's genuine lethal! Good morning all friends.",
      image:
        "https://images.unsplash.com/photo-1750365866655-e712abd3ad46?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      timestamp: new Date(Date.now() - 7200000),
      likes: 0,
      comments: 0,
    },
  ]);

  const toggleMobileChat = () => setIsMobileChatOpen(!isMobileChatOpen);
  const closeMobileChat = () => setIsMobileChatOpen(false);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);
  const closeMobileNav = () => setIsMobileNavOpen(false);
  const openEventsDialog = () => setIsEventsDialogOpen(true);
  const closeEventsDialog = () => setIsEventsDialogOpen(false);
  const showComingSoonToast = () => toast("Coming soon");

  const openFollowersModal = () => setIsFollowersModalOpen(true);
  const closeFollowersModal = () => setIsFollowersModalOpen(false);

  const openGroupsDialog = () => setIsGroupsDialogOpen(true);
  const closeGroupsDialog = () => setIsGroupsDialogOpen(false);

  const openContactProfile = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactProfileOpen(true);
  };

  const closeContactProfile = () => {
    setIsContactProfileOpen(false);
    setSelectedContact(null);
  };

  const openChatDialog = (contact: Contact) => {
    setSelectedChatContact(contact);
    setIsChatDialogOpen(true);
  };

  const closeChatDialog = () => {
    setIsChatDialogOpen(false);
    setSelectedChatContact(null);
    setNewMessageText("");
  };

  const sendMessage = (message: string) => {
    if (!selectedChatContact || !selectedChatContact.email || !message.trim())
      return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: "current-user",
      senderName: "Cyndy Littbridge",
      content: message.trim(),
      timestamp: new Date(),
      isFromCurrentUser: true,
      contactId: selectedChatContact.email,
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setNewMessageText("");
  };

  const followSuggestion = (id: number) => {
    const suggestionToFollow = suggestions.find((s) => s.id === id);
    if (suggestionToFollow) {
      // Add to followed contacts (create contact object without id and mutualFriends)
      const contactData: Contact = {
        name: suggestionToFollow.name,
        location: suggestionToFollow.location,
        avatar: suggestionToFollow.avatar,
        phone: suggestionToFollow.phone,
        email: suggestionToFollow.email,
        status: suggestionToFollow.status,
        bio: suggestionToFollow.bio,
        joinDate: suggestionToFollow.joinDate,
      };
      setFollowedContacts((prev) => [...prev, contactData]);

      // Add to ignored list to hide from suggestions
      setIgnoredSuggestionIds((prev) => {
        const newSet = new Set(Array.from(prev));
        newSet.add(id);
        return newSet;
      });

      toast(`You are now following ${suggestionToFollow.name}`);
    }
  };

  const ignoreSuggestion = (id: number) => {
    setIgnoredSuggestionIds((prev) => {
      const newSet = new Set(Array.from(prev));
      newSet.add(id);
      return newSet;
    });
  };

  const openStoryViewer = (storyIndex: number) => {
    setCurrentStoryIndex(storyIndex);
    setCurrentImageIndex(0);
    setStoryProgress(0);
    setIsStoryViewerOpen(true);
    // Mark story as viewed
    const updatedStories = [...stories];
    if (!updatedStories[storyIndex].viewed) {
      updatedStories[storyIndex] = {
        ...updatedStories[storyIndex],
        viewed: true,
      };
      setStories(updatedStories);
    }
  };

  const closeStoryViewer = () => {
    setIsStoryViewerOpen(false);
    setStoryProgress(0);
  };

  const nextStoryImage = () => {
    const currentStory = stories[currentStoryIndex];
    if (currentImageIndex < currentStory.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setStoryProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentImageIndex(0);
      setStoryProgress(0);
    } else {
      closeStoryViewer();
    }
  };

  const prevStoryImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setStoryProgress(0);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      const prevStory = stories[currentStoryIndex - 1];
      setCurrentImageIndex(prevStory.images.length - 1);
      setStoryProgress(0);
    }
  };

  const addNewPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now(),
      author: "Cyndy Littbridge",
      location: "New York, USA",
      avatar:
        "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: content || undefined,
      image: image || undefined,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    clearNewPost();
    toast("Post published successfully!");
  };

  const clearNewPost = () => {
    setNewPostText("");
    setNewPostImage(null);
  };

  const unfollowContact = (email: string) => {
    setFollowedContacts((prev) => prev.filter((c) => c.email !== email));
    toast("You have unfollowed this contact.");
  };

  const removeFollower = (email: string) => {
    setFollowers((prev) => prev.filter((f) => f.email !== email));
    toast("Follower has been removed.");
  };

  const handleJoinGroup = (groupId: number) => {
    const newJoinedGroups = new Set(joinedGroups);
    const updatedGroups = groupList.map((group) => {
      if (group.id === groupId) {
        const alreadyJoined = newJoinedGroups.has(groupId);
        const members = alreadyJoined ? group.members - 1 : group.members + 1;
        return { ...group, members };
      }
      return group;
    });

    if (newJoinedGroups.has(groupId)) {
      newJoinedGroups.delete(groupId);
    } else {
      newJoinedGroups.add(groupId);
    }

    setJoinedGroups(newJoinedGroups);
    setGroupList(updatedGroups);
  };

  const value: AppContextType = {
    isMobileChatOpen,
    isMobileNavOpen,
    isEventsDialogOpen,
    isStoryViewerOpen,
    isContactProfileOpen,
    isChatDialogOpen,
    isFollowersModalOpen,
    isGroupsDialogOpen,
    currentStoryIndex,
    currentImageIndex,
    storyProgress,
    selectedContact,
    selectedChatContact,
    stories,
    setStories,
    posts,
    newPostText,
    newPostImage,
    suggestions,
    followedContacts,
    followers,
    ignoredSuggestionIds,
    chatMessages,
    newMessageText,
    globalSearchQuery,
    rightBarSearchQuery,
    toggleMobileChat,
    closeMobileChat,
    toggleMobileNav,
    closeMobileNav,
    openEventsDialog,
    closeEventsDialog,
    openStoryViewer,
    closeStoryViewer,
    openContactProfile,
    closeContactProfile,
    openChatDialog,
    closeChatDialog,
    openFollowersModal,
    closeFollowersModal,
    openGroupsDialog,
    closeGroupsDialog,
    sendMessage,
    setNewMessageText,
    setGlobalSearchQuery,
    setRightBarSearchQuery,
    nextStoryImage,
    prevStoryImage,
    setStoryProgress,
    addNewPost,
    setNewPostText,
    setNewPostImage,
    clearNewPost,
    showComingSoonToast,
    followSuggestion,
    ignoreSuggestion,
    unfollowContact,
    removeFollower,
    joinedGroups,
    handleJoinGroup,
    groupList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

// Floating Chat Button Component
function FloatingChatButton() {
  const { toggleMobileChat } = useAppContext();

  return (
    <Button
      onClick={toggleMobileChat}
      className="fixed bottom-4 right-4 z-[70] w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-2xl xl:hidden"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
}

// Mobile Overlay Component
function MobileOverlay({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] xl:hidden">
      <div
        className="fixed inset-0 bg-black/50 opacity-100"
        onClick={onClose}
      />
      {children}
    </div>
  );
}

// Header Component
function Header() {
  const {
    toggleMobileNav,
    openFollowersModal,
    globalSearchQuery,
    setGlobalSearchQuery,
  } = useAppContext();

  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500">
          Scrolllink
        </h1>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-neutral-500 w-4 h-4" />
          <Input
            placeholder="Search something here..."
            className="pl-10 bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div
          className="hidden items-center space-x-3 xl:flex cursor-pointer group"
          onClick={openFollowersModal}
        >
          <span className="text-sm font-medium text-gray-800 dark:text-neutral-200 group-hover:text-pink-600 dark:group-hover:text-pink-500 transition-colors duration-200">
            Cyndy Littbridge
          </span>
          <Avatar className="w-8 h-8 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
            <AvatarImage
              src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover"
            />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          onClick={toggleMobileNav}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const {
    closeMobileNav,
    showComingSoonToast,
    openContactProfile,
    followedContacts,
    openGroupsDialog,
  } = useAppContext();
  const navigationItems = [
    { icon: Home, label: "Feed", active: true },
    { icon: Compass, label: "Explore" },
    { icon: ShoppingBag, label: "Marketplace" },
    { icon: Users, label: "Groups" },
    { icon: Star, label: "My favorites" },
    { icon: Mail, label: "Messages" },
    { icon: Settings, label: "Settings" },
  ];

  const baseContacts: Contact[] = [
    {
      name: "Julia Clarke",
      location: "New York, USA",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+1 (555) 123-4567",
      email: "julia.clarke@example.com",
      status: "online",
      bio: "Creative designer passionate about digital art and user experience.",
      joinDate: "March 2023",
    },
    {
      name: "Mark Stefine",
      location: "Sydney, Australia",
      avatar:
        "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+61 (2) 9876-5432",
      email: "mark.stefine@example.com",
      status: "offline",
      bio: "Software engineer and tech enthusiast. Love building innovative solutions.",
      joinDate: "January 2023",
    },
    {
      name: "Sara Cliene",
      location: "Sydney, Australia",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+61 (2) 8765-4321",
      email: "sara.cliene@example.com",
      status: "online",
      bio: "Marketing specialist who loves connecting with people and traveling the world.",
      joinDate: "May 2023",
    },
    {
      name: "Trinity Sipson",
      location: "Chicago, USA",
      avatar:
        "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+1 (312) 555-9876",
      email: "trinity.sipson@example.com",
      status: "online",
      bio: "Photographer and visual storyteller capturing moments that matter.",
      joinDate: "February 2023",
    },
    {
      name: "Amy Ruth",
      location: "New York, USA",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+1 (555) 234-5678",
      email: "amy.ruth@example.com",
      status: "offline",
      bio: "Content creator and social media strategist helping brands tell their stories.",
      joinDate: "April 2023",
    },
  ];

  // Combine base contacts with followed contacts
  const allContacts = [...baseContacts, ...followedContacts];

  const baseClasses =
    "bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-800 overflow-y-auto";
  const desktopClasses = "w-64 h-screen sticky top-16 hidden xl:block";
  const mobileClasses =
    "fixed top-0 left-0 h-full z-[60] w-72 shadow-2xl transform transition-transform duration-300 ease-in-out";

  return (
    <aside
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      {isMobile && (
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
            Menu
          </h2>
          <Button variant="ghost" size="sm" onClick={closeMobileNav}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobile) closeMobileNav();
                  if (item.label === "Groups") {
                    openGroupsDialog();
                  } else if (!item.active) {
                    showComingSoonToast();
                  }
                }}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-pink-50 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-neutral-800 flex-1 overflow-hidden">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-neutral-100 mb-3">
          My Contacts
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {allContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors duration-200"
              onClick={() => {
                openContactProfile(contact);
                if (isMobile) closeMobileNav();
              }}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={contact.avatar || "/placeholder.svg"}
                  className="object-cover"
                />
                <AvatarFallback>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-neutral-100 truncate">
                    {contact.name}
                  </p>
                  {contact.status === "online" && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                  {contact.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// Feed Components
function WhatsHappening() {
  const {
    newPostText,
    newPostImage,
    addNewPost,
    setNewPostText,
    setNewPostImage,
    showComingSoonToast,
  } = useAppContext();
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = async () => {
    if (!newPostText.trim() && !newPostImage) return;

    setIsPosting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate posting delay
    addNewPost(newPostText.trim(), newPostImage || undefined);
    setIsPosting(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isPostDisabled = !newPostText.trim() && !newPostImage;

  return (
    <Card className="mb-6">
      <CardContent className="p-4 dark:bg-neutral-800">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover"
            />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              placeholder="What's happening?"
              className="border-0 bg-gray-50 text-gray-600 dark:bg-neutral-900 dark:text-neutral-300 mb-3"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />

            {/* Image Preview */}
            {newPostImage && (
              <div className="relative mb-3">
                <img
                  src={newPostImage}
                  alt="Upload preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500"
                  onClick={showComingSoonToast}
                >
                  <Video className="w-4 h-4 mr-1" />
                  Live video
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Photos
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500"
                  onClick={showComingSoonToast}
                >
                  <Smile className="w-4 h-4 mr-1" />
                  Feeling
                </Button>
              </div>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePost}
                disabled={isPostDisabled || isPosting}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface Comment {
  id: number;
  text: string;
  author: string;
  avatar: string;
  timestamp: Date;
}

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  attendees: number;
  category: "Design" | "Tech" | "Business" | "Marketing";
  location: string;
}

function PostList() {
  const { posts, globalSearchQuery, showComingSoonToast } = useAppContext();
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [postLikes, setPostLikes] = useState<Record<number, number>>({});
  const [postComments, setPostComments] = useState<Record<number, Comment[]>>(
    {}
  );
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
    {}
  );
  // Track which posts have expanded comments
  const [expandedComments, setExpandedComments] = useState<
    Record<number, boolean>
  >({});

  const filteredPosts = posts.filter((post) => {
    if (!globalSearchQuery.trim()) return true;
    const query = globalSearchQuery.toLowerCase().trim();
    const authorMatch = post.author.toLowerCase().includes(query);
    const contentMatch = post.content?.toLowerCase().includes(query);
    return authorMatch || contentMatch;
  });

  const handleLike = (postId: number, currentLikes: number) => {
    const isLiked = likedPosts.has(postId);
    const newLikedPosts = new Set(likedPosts);

    if (isLiked) {
      newLikedPosts.delete(postId);
      setPostLikes((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? currentLikes) - 1,
      }));
    } else {
      newLikedPosts.add(postId);
      setPostLikes((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? currentLikes) + 1,
      }));
    }

    setLikedPosts(newLikedPosts);
  };

  const getLikeCount = (postId: number, originalLikes: number) => {
    return postLikes[postId] ?? originalLikes;
  };

  const isPostLiked = (postId: number) => {
    return likedPosts.has(postId);
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - timestamp.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: Date.now(),
      text: commentText,
      author: "Cyndy Littbridge",
      avatar:
        "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      timestamp: new Date(),
    };

    setPostComments((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }));

    setCommentInputs((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  const handleCommentInputChange = (postId: number, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  if (filteredPosts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center dark:bg-neutral-800">
          <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400 dark:text-neutral-500" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-neutral-100 mb-2">
            No posts found
          </h3>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            {`Your search for "${globalSearchQuery}" did not return any results.`}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Localized CommentsList component
  function CommentsList({ postId }: { postId: number }) {
    // Count comments directly from postComments state
    const commentsCount = postComments[postId]?.length || 0;
    const comments = postComments[postId] || [];

    if (commentsCount === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-neutral-800">
        <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
          {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
        </p>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.avatar} className="object-cover" />
                <AvatarFallback>
                  {comment.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-neutral-100">
                    {comment.author}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-neutral-300">
                    {comment.text}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                  {getTimeAgo(comment.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="pb-3 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={post.avatar || "/placeholder.svg"}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-neutral-100">
                    {post.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-neutral-400">
                    {post.location} · {getTimeAgo(post.timestamp)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={showComingSoonToast}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 dark:bg-neutral-800">
            {post.content && (
              <p className="text-gray-700 dark:text-neutral-300 mb-3">
                {post.content}
              </p>
            )}
            {post.image && (
              <img
                src={post.image || "/placeholder.svg"}
                alt="Post content"
                className="w-full h-96 object-cover rounded-lg mb-3"
              />
            )}

            {post.reactions && (
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex -space-x-1">
                  {post.reactions.map((reaction, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full bg-gray-200 dark:bg-neutral-700 border-2 border-white dark:border-neutral-800"
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-neutral-400">
                  {postComments[post.id]?.length || 0} Comments
                </span>
                <span className="text-sm text-gray-500 dark:text-neutral-400">
                  {getLikeCount(post.id, post.likes)} Likes
                </span>
              </div>
            )}

            {!post.reactions &&
              (getLikeCount(post.id, post.likes) > 0 ||
                (postComments[post.id]?.length || 0) > 0) && (
                <div className="flex items-center space-x-2 mb-3">
                  {getLikeCount(post.id, post.likes) > 0 && (
                    <span className="text-sm text-gray-500 dark:text-neutral-400">
                      {getLikeCount(post.id, post.likes)} Likes
                    </span>
                  )}
                  {(postComments[post.id]?.length || 0) > 0 && (
                    <span className="text-sm text-gray-500 dark:text-neutral-400">
                      {postComments[post.id]?.length || 0} Comments
                    </span>
                  )}
                </div>
              )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-neutral-800">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 group"
                onClick={() => handleLike(post.id, post.likes)}
              >
                <Heart
                  className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                    isPostLiked(post.id)
                      ? "text-pink-500 fill-pink-500"
                      : "text-gray-500 dark:text-neutral-400 dark:group-hover:text-pink-500"
                  }`}
                />
                <span
                  className={`${
                    isPostLiked(post.id)
                      ? "text-pink-500"
                      : "text-gray-500 dark:text-neutral-400 dark:group-hover:text-pink-500"
                  }`}
                >
                  {isPostLiked(post.id) ? "Liked" : "Like"}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-gray-500 dark:text-neutral-400"
                onClick={() =>
                  setExpandedComments((prev) => ({
                    ...prev,
                    [post.id]: !prev[post.id],
                  }))
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Comments ({postComments[post.id]?.length || 0})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-gray-500 dark:text-neutral-400"
                onClick={showComingSoonToast}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {expandedComments[post.id] && <CommentsList postId={post.id} />}

            <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-100 dark:border-neutral-800">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="Write a comment..."
                  className="flex-1 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    handleCommentInputChange(post.id, e.target.value)
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment(post.id);
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => handleAddComment(post.id)}
                  disabled={!commentInputs[post.id]?.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function YouMightLike() {
  const {
    suggestions,
    ignoredSuggestionIds,
    followSuggestion,
    ignoreSuggestion,
    showComingSoonToast,
  } = useAppContext();

  // Filter out ignored suggestions
  const visibleSuggestions = suggestions.filter(
    (s) => !ignoredSuggestionIds.has(s.id)
  );

  // Don't render the component if there are no visible suggestions
  if (visibleSuggestions.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="border-b border-gray-200 dark:border-neutral-900  dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-neutral-100">
            You might like
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 dark:text-blue-500"
            onClick={showComingSoonToast}
          >
            See all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 dark:bg-neutral-800">
        {visibleSuggestions.map((person) => (
          <div key={person.id} className="flex flex-col justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={person.avatar || "/placeholder.svg"}
                  className="object-cover"
                />
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 dark:text-neutral-100">
                  {person.name}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <Avatar className="w-5 h-5 border-2 border-white dark:border-neutral-800">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-5 h-5 border-2 border-white dark:border-neutral-800">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-neutral-400">
                    {person.mutualFriends} Mutual
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-4 space-x-2">
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white w-[40%]"
                onClick={() => followSuggestion(person.id)}
              >
                Follow
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-[40%] dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                onClick={() => ignoreSuggestion(person.id)}
              >
                Ignore
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const groups: Group[] = [
  {
    id: 1,
    name: "Designers UI UX",
    members: 1198,
    image:
      "https://images.unsplash.com/photo-1750779940923-8d6cf0867df7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "D",
    iconColor: "bg-green-500",
  },
  {
    id: 2,
    name: "React Developers",
    members: 856,
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "R",
    iconColor: "bg-blue-500",
  },
  {
    id: 3,
    name: "Photography Club",
    members: 2400,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "P",
    iconColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Startup Founders",
    members: 950,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "S",
    iconColor: "bg-orange-500",
  },
];

const events: Event[] = [
  {
    id: 1,
    title: "Design Talks",
    date: "12 Dec, 1:00 PM",
    description:
      "A General talk about design with Sr Designer of Logitech Michael Sprinlik.",
    attendees: 112,
    category: "Design",
    location: "Online",
  },
  {
    id: 2,
    title: "UX Research Workshop",
    date: "15 Dec, 2:00 PM",
    description: "Learn advanced UX research techniques with industry experts.",
    attendees: 89,
    category: "Design",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    title: "JavaScript Conference",
    date: "18 Dec, 9:00 AM",
    description:
      "Latest trends and best practices in modern JavaScript development.",
    attendees: 245,
    category: "Tech",
    location: "New York, NY",
  },
  {
    id: 4,
    title: "Marketing Strategies Meetup",
    date: "20 Dec, 6:00 PM",
    description: "Digital marketing strategies for 2024 and beyond.",
    attendees: 67,
    category: "Marketing",
    location: "Los Angeles, CA",
  },
  {
    id: 5,
    title: "Product Management Summit",
    date: "22 Dec, 10:00 AM",
    description:
      "Product strategy and roadmap planning for successful launches.",
    attendees: 156,
    category: "Business",
    location: "Seattle, WA",
  },
  {
    id: 6,
    title: "AI & Machine Learning Talk",
    date: "25 Dec, 3:00 PM",
    description: "Introduction to AI and ML for software developers.",
    attendees: 203,
    category: "Tech",
    location: "Online",
  },
  {
    id: 7,
    title: "Startup Pitch Night",
    date: "28 Dec, 7:00 PM",
    description: "Watch emerging startups pitch their ideas to investors.",
    attendees: 134,
    category: "Business",
    location: "Austin, TX",
  },
  {
    id: 8,
    title: "React Developer Meetup",
    date: "30 Dec, 4:00 PM",
    description: "Building scalable React applications with modern tools.",
    attendees: 178,
    category: "Tech",
    location: "Boston, MA",
  },
];

const getCategoryColor = (category: Event["category"]) => {
  switch (category) {
    case "Design":
      return "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
    case "Tech":
      return "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
    case "Business":
      return "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400";
    case "Marketing":
      return "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-300";
  }
};

function UpcomingEvents() {
  const { openEventsDialog } = useAppContext();

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-3 dark:bg-neutral-800">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-neutral-100">
              Upcoming Events
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 dark:text-blue-500"
              onClick={openEventsDialog}
            >
              See all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 dark:bg-neutral-800">
          {events.slice(0, 1).map((event, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-neutral-100">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
                    {event.date}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <Avatar className="w-6 h-6 border-2 border-white dark:border-neutral-800">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-6 h-6 border-2 border-white dark:border-neutral-800">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop" />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-6 h-6 border-2 border-white dark:border-neutral-800">
                        <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop" />
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-neutral-400">
                      {event.attendees} Joined
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function EventsDialog() {
  const { isEventsDialogOpen, closeEventsDialog } = useAppContext();
  const [joinedEvents, setJoinedEvents] = useState<Set<number>>(new Set([1]));
  // Local state for event list with attendee counts
  const [eventList, setEventList] = useState(events);

  const handleJoinEvent = (eventId: number) => {
    const newJoinedEvents = new Set(joinedEvents);
    const updatedEvents = eventList.map((event) => {
      if (event.id === eventId) {
        const alreadyJoined = newJoinedEvents.has(eventId);
        const attendees = alreadyJoined
          ? event.attendees - 1
          : event.attendees + 1;
        return { ...event, attendees };
      }
      return event;
    });

    if (newJoinedEvents.has(eventId)) {
      newJoinedEvents.delete(eventId);
    } else {
      newJoinedEvents.add(eventId);
    }

    setJoinedEvents(newJoinedEvents);
    setEventList(updatedEvents);
  };

  return (
    <Dialog open={isEventsDialogOpen} onOpenChange={closeEventsDialog}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-white dark:bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
            All Upcoming Events
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Browse the full list of upcoming events and join the ones you’re
          interested in.
        </DialogDescription>
        <div className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="space-y-4">
            {eventList.map((event) => (
              <Card key={event.id} className="p-4 dark:bg-neutral-900">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-neutral-100">
                          {event.title}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            event.category
                          )}`}
                        >
                          {event.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-neutral-400 mb-1">
                        {event.date} • {event.location}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          <Avatar className="w-6 h-6 border-2 border-white dark:border-neutral-900">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop" />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <Avatar className="w-6 h-6 border-2 border-white dark:border-neutral-900">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop" />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>
                          <Avatar className="w-6 h-6 border-2 border-white dark:border-neutral-900">
                            <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop" />
                            <AvatarFallback>J</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-neutral-400">
                          {event.attendees} Joined
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleJoinEvent(event.id)}
                    className={`ml-4 transition-all duration-200 ${
                      joinedEvents.has(event.id)
                        ? "bg-green-500 hover:bg-green-600 text-white transform scale-105"
                        : "bg-pink-500 hover:bg-pink-600 text-white"
                    }`}
                  >
                    {joinedEvents.has(event.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Joined
                      </>
                    ) : (
                      "Join"
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SuggestedGroups() {
  const { openGroupsDialog, joinedGroups, handleJoinGroup, groupList } =
    useAppContext();

  return (
    <Card>
      <CardHeader className="pb-3 dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-neutral-100">
            Suggested Groups
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 dark:text-blue-500"
            onClick={openGroupsDialog}
          >
            See all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 dark:bg-neutral-800">
        <div className="space-y-4">
          {groupList.slice(0, 2).map((group) => (
            <div key={group.id} className="space-y-3">
              <img
                src={group.image || "/placeholder.svg"}
                alt={group.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 ${group.iconColor} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {group.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-neutral-100">
                    {group.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-neutral-400">
                    {group.members} Members
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleJoinGroup(group.id)}
                  className={`transition-all duration-200 ${
                    joinedGroups.has(group.id)
                      ? "bg-green-500 hover:bg-green-600 text-white transform scale-105"
                      : "border-gray-200 dark:border-neutral-700 hover:border-pink-300 dark:hover:border-pink-600 hover:text-pink-600 dark:hover:text-pink-400 dark:text-neutral-300"
                  }`}
                  variant={joinedGroups.has(group.id) ? "default" : "outline"}
                >
                  {joinedGroups.has(group.id) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GroupsDialog() {
  const {
    isGroupsDialogOpen,
    closeGroupsDialog,
    joinedGroups,
    handleJoinGroup,
    groupList,
  } = useAppContext();

  const myGroups = groupList.filter((g) => joinedGroups.has(g.id));

  const renderGroupList = (groupsToRender: Group[], from: "all" | "joined") => {
    if (groupsToRender.length === 0) {
      return (
        <div className="text-center text-gray-500 dark:text-neutral-400 py-8">
          <p>
            {from === "joined"
              ? "You haven't joined any groups yet."
              : "No groups to show."}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {groupsToRender.map((group) => (
          <Card key={group.id} className="p-4 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-neutral-100">
                    {group.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-neutral-400">
                    {group.members} members
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleJoinGroup(group.id)}
                className={`ml-4 transition-all duration-200 ${
                  joinedGroups.has(group.id)
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-pink-500 hover:bg-pink-600 text-white"
                }`}
              >
                {joinedGroups.has(group.id) ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Joined
                  </>
                ) : (
                  "Join"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isGroupsDialogOpen} onOpenChange={closeGroupsDialog}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-neutral-100">
            Groups
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          View and manage the list of participants in the event.
        </DialogDescription>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-neutral-800 rounded-lg p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-pink-700 dark:data-[state=active]:text-neutral-50 data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-neutral-400 rounded-md"
            >
              All Groups
            </TabsTrigger>
            <TabsTrigger
              value="joined"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-pink-700 dark:data-[state=active]:text-neutral-50 data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-neutral-400 rounded-md"
            >
              My Groups
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {renderGroupList(groupList, "all")}
          </TabsContent>
          <TabsContent value="joined" className="mt-4">
            {renderGroupList(myGroups, "joined")}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Right Bar Component
function RightBar({ isMobile = false }: { isMobile?: boolean }) {
  const {
    closeMobileChat,
    stories,
    openStoryViewer,
    openChatDialog,
    rightBarSearchQuery,
    setRightBarSearchQuery,
  } = useAppContext();

  const recentChats: Contact[] = [
    {
      name: "Julia Clarke",
      location: "New York, USA",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "julia.clarke@example.com",
      status: "online",
    },
    {
      name: "Sara Cliene",
      location: "Sydney, Australia",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "sara.cliene@example.com",
      status: "online",
    },
    {
      name: "Amy Ruth",
      location: "New York, UAE",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "amy.ruth@example.com",
      status: "offline",
    },
    {
      name: "Mark Stefine",
      location: "Chicago, USA",
      avatar:
        "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "mark.stefine@example.com",
      status: "offline",
    },
    {
      name: "Trinity Sipson",
      location: "Chicago, USA",
      avatar:
        "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "trinity.sipson@example.com",
      status: "online",
    },
    {
      name: "Albin Vjosa",
      location: "Mitro, Japan",
      avatar:
        "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "albin.vjosa@example.com",
      status: "offline",
    },
  ];

  // Filter stories and chats based on search query
  const filteredStories = stories.filter((story) =>
    story.user.name
      .toLowerCase()
      .includes(rightBarSearchQuery.toLowerCase().trim())
  );

  const filteredRecentChats = recentChats.filter((chat) =>
    chat.name.toLowerCase().includes(rightBarSearchQuery.toLowerCase().trim())
  );

  // Check if search has no results
  const hasNoResults =
    rightBarSearchQuery.trim() &&
    filteredStories.length === 0 &&
    filteredRecentChats.length === 0;

  const baseClasses =
    "w-80 bg-white dark:bg-neutral-800 border-l border-gray-200 dark:border-neutral-800 overflow-y-auto";
  const desktopClasses = "h-screen sticky top-16 hidden xl:block";
  const mobileClasses =
    "fixed top-0 right-0 h-full z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out";

  return (
    <aside
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      <div className="p-4">
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
              Messages
            </h2>
            <Button variant="ghost" size="sm" onClick={closeMobileChat}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-neutral-500 w-4 h-4" />
            <Input
              placeholder="Search people and stories..."
              className="pl-10 bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 dark:text-neutral-200"
              value={rightBarSearchQuery}
              onChange={(e) => setRightBarSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stories Section */}
        <div className="mb-6">
          {filteredStories.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mb-4">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() =>
                    openStoryViewer(stories.findIndex((s) => s.id === story.id))
                  }
                >
                  <Avatar
                    className={`w-12 h-12 border-4 mb-1 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg ${
                      story.viewed
                        ? "border-gray-300 dark:border-neutral-700 group-hover:border-gray-400 dark:group-hover:border-neutral-600"
                        : "border-pink-500 group-hover:border-pink-600"
                    }`}
                  >
                    <AvatarImage
                      src={story.user.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600 dark:text-neutral-400 text-center group-hover:text-pink-600 dark:group-hover:text-pink-500 transition-colors duration-200">
                    {story.user.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Chats Section */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-neutral-100 mb-4">
            Recent Chats
          </h3>
          {filteredRecentChats.length > 0 ? (
            <div className="space-y-3">
              {filteredRecentChats.map((chat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={() => openChatDialog(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={chat.avatar || "/placeholder.svg"}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-neutral-100 text-sm">
                        {chat.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-neutral-400">
                        {chat.location}
                      </p>
                    </div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-gray-400 dark:text-neutral-500" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* No Results State */}
        {hasNoResults && (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-neutral-500" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-neutral-100 mb-2">
              No results found
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-400 text-center">
              Try searching for a different name or check your spelling.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

// Main Feed Component
function Feed() {
  return (
    <main className="flex-1 max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WhatsHappening />
          <PostList />
        </div>

        <div className="space-y-6 lg:col-start-3 lg:row-start-1 lg:row-span-2">
          <YouMightLike />
          <UpcomingEvents />
          <SuggestedGroups />
        </div>
      </div>
    </main>
  );
}

// Story Viewer Components
function StoryProgressBar({
  total,
  current,
  progress,
}: {
  total: number;
  current: number;
  progress: number;
}) {
  return (
    <div className="flex space-x-1 mb-4">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width:
                index < current
                  ? "100%"
                  : index === current
                  ? `${progress}%`
                  : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function StoryViewer() {
  const {
    isStoryViewerOpen,
    currentStoryIndex,
    currentImageIndex,
    storyProgress,
    stories,
    closeStoryViewer,
    nextStoryImage,
    prevStoryImage,
    setStoryProgress,
  } = useAppContext();

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isStoryViewerOpen || isPaused) return;

    const interval = setInterval(() => {
      if (storyProgress >= 100) {
        nextStoryImage();
      } else {
        setStoryProgress(storyProgress + 2);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [
    isStoryViewerOpen,
    isPaused,
    storyProgress,
    nextStoryImage,
    setStoryProgress,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStoryViewerOpen) return;

      switch (e.key) {
        case "Escape":
          closeStoryViewer();
          break;
        case "ArrowLeft":
          prevStoryImage();
          break;
        case "ArrowRight":
          nextStoryImage();
          break;
        case " ":
          e.preventDefault();
          setIsPaused(!isPaused);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isStoryViewerOpen,
    isPaused,
    closeStoryViewer,
    nextStoryImage,
    prevStoryImage,
  ]);

  useEffect(() => {
    if (isStoryViewerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isStoryViewerOpen]);

  if (!isStoryViewerOpen || !stories[currentStoryIndex]) return null;

  const currentStory = stories[currentStoryIndex];
  const currentImage = currentStory.images[currentImageIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-gray-100/30 dark:bg-black/50 backdrop-blur-sm"
      onClick={closeStoryViewer}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={closeStoryViewer}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Story content */}
        <div
          className="relative w-full max-w-md h-full max-h-[80vh] mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <StoryProgressBar
              total={currentStory.images.length}
              current={currentImageIndex}
              progress={storyProgress}
            />

            {/* User info */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage
                  src={currentStory.user.avatar}
                  className="object-cover"
                />
                <AvatarFallback>{currentStory.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium text-sm">
                  {currentStory.user.name}
                </p>
                <p className="text-white/70 text-xs">
                  {Math.floor(
                    (Date.now() - currentStory.timestamp.getTime()) / 3600000
                  )}
                  h ago
                </p>
              </div>
            </div>
          </div>

          {/* Story image */}
          <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt="Story"
              className="w-full h-full object-cover"
              onLoad={() => setStoryProgress(0)}
            />

            {/* Navigation areas */}
            <div
              className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
              onClick={prevStoryImage}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(false)}
            />
            <div
              className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
              onClick={nextStoryImage}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(false)}
            />

            {/* Pause indicator */}
            {isPaused && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="text-white text-4xl">⏸️</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactProfileDialog() {
  const {
    isContactProfileOpen,
    selectedContact,
    closeContactProfile,
    openChatDialog,
  } = useAppContext();

  const handleMessageClick = () => {
    if (selectedContact) {
      closeContactProfile();
      openChatDialog(selectedContact);
    }
  };

  if (!selectedContact) return null;

  return (
    <Dialog open={isContactProfileOpen} onOpenChange={closeContactProfile}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-xl">
        <DialogHeader>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={selectedContact.avatar}
                className="object-cover"
              />
              <AvatarFallback className="text-lg">
                {selectedContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-neutral-100">
                  {selectedContact.name}
                </DialogTitle>
                {selectedContact.status === "online" && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {selectedContact.location}
              </p>
              <p className="text-xs text-gray-400 dark:text-neutral-500">
                Joined {selectedContact.joinDate}
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Contact profile details including biography and contact information.
        </DialogDescription>
        <div className="space-y-4">
          {selectedContact.bio && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-neutral-200 mb-2">
                About
              </h4>
              <p className="text-sm text-gray-600 dark:text-neutral-300">
                {selectedContact.bio}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-neutral-200">
              Contact Information
            </h4>

            {selectedContact.email && (
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400 dark:text-neutral-500" />
                <span className="text-gray-600 dark:text-neutral-300">
                  {selectedContact.email}
                </span>
              </div>
            )}

            {selectedContact.phone && (
              <div className="flex items-center space-x-3 text-sm">
                <MessageCircle className="w-4 h-4 text-gray-400 dark:text-neutral-500" />
                <span className="text-gray-600 dark:text-neutral-300">
                  {selectedContact.phone}
                </span>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700"
              onClick={handleMessageClick}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ChatDialog() {
  const {
    isChatDialogOpen,
    selectedChatContact,
    closeChatDialog,
    chatMessages,
    newMessageText,
    setNewMessageText,
    sendMessage,
  } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - timestamp.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getContactMessages = () => {
    if (!selectedChatContact || !selectedChatContact.email) return [];

    return chatMessages
      .filter((message) => message.contactId === selectedChatContact.email)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const handleSendMessage = () => {
    if (newMessageText.trim()) {
      sendMessage(newMessageText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChatContact) return null;

  const messages = getContactMessages();

  return (
    <Dialog open={isChatDialogOpen} onOpenChange={closeChatDialog}>
      <DialogContent className="sm:max-w-lg h-[600px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-800 shadow-xl flex flex-col p-0">
        {/* Chat Header */}
        <DialogHeader className="p-4 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={selectedChatContact.avatar}
                className="object-cover"
              />
              <AvatarFallback>
                {selectedChatContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
                  {selectedChatContact.name}
                </DialogTitle>
                {selectedChatContact.status === "online" && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {selectedChatContact.status === "online"
                  ? "Active now"
                  : "Last seen recently"}
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Private chat conversation interface. Type and send messages to your
          contact.
        </DialogDescription>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-neutral-900">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Avatar className="w-16 h-16 mb-4">
                <AvatarImage
                  src={selectedChatContact.avatar}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg">
                  {selectedChatContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-gray-900 dark:text-neutral-100 mb-2">
                Start a conversation
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Send a message to {selectedChatContact.name}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isFromCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.isFromCurrentUser ? "order-2" : "order-1"
                  }`}
                >
                  {!message.isFromCurrentUser && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={selectedChatContact.avatar}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-xs">
                          {selectedChatContact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500 dark:text-neutral-400">
                        {message.senderName}
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isFromCurrentUser
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-neutral-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-500 dark:text-neutral-500 mt-1 ${
                      message.isFromCurrentUser ? "text-right" : "text-left"
                    }`}
                  >
                    {getTimeAgo(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-neutral-800 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
            />
            <Button
              size="sm"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4"
              onClick={handleSendMessage}
              disabled={!newMessageText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FollowersDialog() {
  const {
    isFollowersModalOpen,
    closeFollowersModal,
    followedContacts,
    followers,
    unfollowContact,
    removeFollower,
  } = useAppContext();

  const renderContactList = (
    contacts: Contact[],
    action: "unfollow" | "remove"
  ) => {
    if (contacts.length === 0) {
      return (
        <div className="text-center text-gray-500 dark:text-neutral-400 py-8">
          <p>No contacts to show here.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {contacts.map((contact) => (
          <div
            key={contact.email}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contact.avatar} className="object-cover" />
                <AvatarFallback>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 dark:text-neutral-100">
                  {contact.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-neutral-400">
                  {contact.location}
                </p>
              </div>
            </div>
            {action === "unfollow" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => contact.email && unfollowContact(contact.email)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => contact.email && removeFollower(contact.email)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isFollowersModalOpen} onOpenChange={closeFollowersModal}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-neutral-100">
            Connections
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          View and manage the list of followers and following.
        </DialogDescription>
        <Tabs defaultValue="following" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-neutral-800 rounded-lg p-1">
            <TabsTrigger
              value="following"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-pink-700 dark:data-[state=active]:text-neutral-50 data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-neutral-400 rounded-md"
            >
              Following
            </TabsTrigger>
            <TabsTrigger
              value="followers"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-pink-700 dark:data-[state=active]:text-neutral-50 data-[state=inactive]:text-gray-500 dark:data-[state=inactive]:text-neutral-400 rounded-md"
            >
              Followers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="following" className="mt-4">
            {renderContactList(followedContacts, "unfollow")}
          </TabsContent>
          <TabsContent value="followers" className="mt-4">
            {renderContactList(followers, "remove")}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Main App Component
function SocialMediaAppContent() {
  const { isMobileChatOpen, isMobileNavOpen, closeMobileChat, closeMobileNav } =
    useAppContext();

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-neutral-900 ${nunito.className}`}
    >
      <Header />
      <div className="flex">
        <Sidebar />
        <Feed />
        <RightBar />

        <FloatingChatButton />

        <MobileOverlay isOpen={isMobileChatOpen} onClose={closeMobileChat}>
          <RightBar isMobile={true} />
        </MobileOverlay>

        <MobileOverlay isOpen={isMobileNavOpen} onClose={closeMobileNav}>
          <Sidebar isMobile={true} />
        </MobileOverlay>

        <StoryViewer />
        <ContactProfileDialog />
        <FollowersDialog />
        <ChatDialog />
        <EventsDialog />
        <GroupsDialog />
      </div>
    </div>
  );
}

export default function SocialMediaApp() {
  return (
    <AppProvider>
      <SocialMediaAppContent />
      <Toaster position="bottom-center" />
    </AppProvider>
  );
}
