"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle,
  Copy,
  Eye,
  Gift,
  Globe,
  Heart,
  Home,
  ImageIcon,
  Instagram,
  Menu,
  Plus,
  Search,
  Settings,
  Share2,
  TrendingUp,
  Twitter,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
}

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { theme };
};

interface Collection {
  id: number;
  title: string;
  creator: string;
  creatorAvatar: string;
  verified: boolean;
  items: number;
  price: string;
  image: string;
  bgGradient: string;
  contractAddress: string;
}

interface Creator {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio: string;
  collections: number;
  followers: number;
  following: number;
  totalVolume: string;
  joinedDate: string;
  website?: string;
  twitter?: string;
  instagram?: string;
}

const creatorsData: Record<string, Creator> = {
  "Jackie Hong": {
    name: "Jackie Hong",
    handle: "@jackie_nft",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jackie&backgroundColor=b6e3f4",
    verified: true,
    bio: "Digital artist creating cosmic dreams and surreal landscapes. Exploring the intersection of technology and imagination.",
    collections: 12,
    followers: 15420,
    following: 892,
    totalVolume: "247.8 ETH",
    joinedDate: "March 2021",
    website: "https://jackiehong.art",
    twitter: "@jackie_hong",
    instagram: "@jackie.digital",
  },
  "Johnny Paul": {
    name: "Johnny Paul",
    handle: "@johnny_artifacts",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=johnny&backgroundColor=c0aede",
    verified: true,
    bio: "Collector and creator of rare digital artifacts. Passionate about preserving digital culture through NFTs.",
    collections: 8,
    followers: 9876,
    following: 543,
    totalVolume: "156.3 ETH",
    joinedDate: "June 2021",
    twitter: "@johnny_artifacts",
  },
  "Sir Jonas": {
    name: "Sir Jonas",
    handle: "@sir_jonas",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jonas&backgroundColor=ffd93d",
    verified: true,
    bio: "Abstract artist pushing the boundaries of digital expression. Each piece tells a story of our digital future.",
    collections: 15,
    followers: 23456,
    following: 1234,
    totalVolume: "389.2 ETH",
    joinedDate: "January 2021",
    website: "https://sirjonas.com",
    twitter: "@sir_jonas_art",
    instagram: "@sirjonas.abstract",
  },
  "Alex Chen": {
    name: "Alex Chen",
    handle: "@alex_visions",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=alex&backgroundColor=ffdfbf",
    verified: false,
    bio: "Emerging artist exploring future visions through digital art. Creating tomorrow's masterpieces today.",
    collections: 3,
    followers: 2341,
    following: 456,
    totalVolume: "45.7 ETH",
    joinedDate: "November 2022",
    twitter: "@alex_future_art",
  },
  "Lynn Chang": {
    name: "Lynn Chang",
    handle: "@lynnchang_nft",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=lynn&backgroundColor=b6e3f4",
    verified: true,
    bio: "Robot enthusiast and digital sculptor. Creating the future of AI-inspired art one pixel at a time.",
    collections: 7,
    followers: 12890,
    following: 678,
    totalVolume: "198.4 ETH",
    joinedDate: "April 2021",
    website: "https://lynnchang.digital",
    twitter: "@lynn_robots",
  },
};

const allCollections = [
  {
    id: 1,
    title: "Cosmic Dreams",
    creator: "Jackie Hong",
    creatorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jackie&backgroundColor=b6e3f4",
    verified: true,
    items: 24,
    price: "4.7 ETH",
    image: "https://picsum.photos/400/300?random=1&blur=1",
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    contractAddress: "0x1234...5678",
  },
  {
    id: 2,
    title: "Digital Artifacts",
    creator: "Johnny Paul",
    creatorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=johnny&backgroundColor=c0aede",
    verified: true,
    items: 18,
    price: "2.3 ETH",
    image: "https://picsum.photos/400/300?random=2&blur=1",
    bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    contractAddress: "0x2345...6789",
  },
  {
    id: 3,
    title: "Abstract Worlds",
    creator: "Sir Jonas",
    creatorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jonas&backgroundColor=ffd93d",
    verified: true,
    items: 32,
    price: "6.1 ETH",
    image: "https://picsum.photos/400/300?random=3&blur=1",
    bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    contractAddress: "0x3456...7890",
  },
  {
    id: 4,
    title: "Future Visions",
    creator: "Alex Chen",
    creatorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=alex&backgroundColor=ffdfbf",
    verified: false,
    items: 15,
    price: "3.2 ETH",
    image: "https://picsum.photos/400/300?random=4&blur=1",
    bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    contractAddress: "0x4567...8901",
  },
  {
    id: 5,
    title: "Neon Nights",
    creator: "Jackie Hong",
    creatorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jackie&backgroundColor=b6e3f4",
    verified: true,
    items: 28,
    price: "5.2 ETH",
    image: "https://picsum.photos/400/300?random=5&blur=1",
    bgGradient: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
    contractAddress: "0x5678...9012",
  },
  {
    id: 6,
    title: "Cyber Punk",
    creator: "Sir Jonas",
    creatorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jonas&backgroundColor=ffd93d",
    verified: true,
    items: 45,
    price: "7.8 ETH",
    image: "https://picsum.photos/400/300?random=6&blur=1",
    bgGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    contractAddress: "0x6789...0123",
  },
];

const historyData = {
  all: [
    {
      id: 1,
      type: "Transfer",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user1&backgroundColor=b6e3f4",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user2&backgroundColor=c0aede",
      fromAddress: "0x1234...5678",
      toAddress: "0x9876...5432",
      amount: 3,
      value: "12.4 ETH",
      valueUSD: "$24,800",
      date: "21/08",
      txHash: "0xabcd...1234",
    },
    {
      id: 2,
      type: "Purchase",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user3&backgroundColor=ffd93d",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user4&backgroundColor=ffdfbf",
      fromAddress: "0x2345...6789",
      toAddress: "0x8765...4321",
      amount: 7,
      value: "11.3 ETH",
      valueUSD: "$22,600",
      date: "12/07",
      txHash: "0xbcde...2345",
    },
    {
      id: 3,
      type: "List",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user5&backgroundColor=b6e3f4",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user6&backgroundColor=c0aede",
      fromAddress: "0x3456...7890",
      toAddress: "0x7654...3210",
      amount: 4,
      value: "2.55 ETH",
      valueUSD: "$5,100",
      date: "04/01",
      txHash: "0xcdef...3456",
    },
    {
      id: 4,
      type: "Transfer",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user7&backgroundColor=ffd93d",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user8&backgroundColor=ffdfbf",
      fromAddress: "0x4567...8901",
      toAddress: "0x6543...2109",
      amount: 3,
      value: "5.51 ETH",
      valueUSD: "$11,020",
      date: "24/02",
      txHash: "0xdef0...4567",
    },
  ],
  purchase: [
    {
      id: 2,
      type: "Purchase",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user3&backgroundColor=ffd93d",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user4&backgroundColor=ffdfbf",
      fromAddress: "0x2345...6789",
      toAddress: "0x8765...4321",
      amount: 7,
      value: "11.3 ETH",
      valueUSD: "$22,600",
      date: "12/07",
      txHash: "0xbcde...2345",
    },
  ],
  transfer: [
    {
      id: 1,
      type: "Transfer",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user1&backgroundColor=b6e3f4",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user2&backgroundColor=c0aede",
      fromAddress: "0x1234...5678",
      toAddress: "0x9876...5432",
      amount: 3,
      value: "12.4 ETH",
      valueUSD: "$24,800",
      date: "21/08",
      txHash: "0xabcd...1234",
    },
    {
      id: 4,
      type: "Transfer",
      fromAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user7&backgroundColor=ffd93d",
      toAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=user8&backgroundColor=ffdfbf",
      fromAddress: "0x4567...8901",
      toAddress: "0x6543...2109",
      amount: 3,
      value: "5.51 ETH",
      valueUSD: "$11,020",
      date: "24/02",
      txHash: "0xdef0...4567",
    },
  ],
};

function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function NFTDashboard() {
  const { theme } = useTheme();
  const [userType, setUserType] = useState<"creator" | "collector">("creator");
  const [selectedCollection, setSelectedCollection] = useState<Collection>(
    allCollections[0]
  );
  const [activeHistoryTab, setActiveHistoryTab] = useState<
    "all" | "purchase" | "transfer"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddNFTModal, setShowAddNFTModal] = useState(false);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [newCollections, setNewCollections] = useState<Collection[]>([]);
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const filteredCollections = [...allCollections, ...newCollections].filter(
    (collection) =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const width = useWindowWidth();

  const colors = {
    light: {
      bg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      cardBg: "rgba(255, 255, 255, 0.8)",
      sidebarBg: "rgba(255, 255, 255, 0.9)",
      headerBg: "rgba(255, 255, 255, 0.8)",
      text: "#1e293b",
      textSecondary: "#64748b",
      border: "rgba(0, 0, 0, 0.1)",
      historyBg: "rgba(255, 255, 255, 0.9)",
      modalBg: "rgba(255, 255, 255, 0.95)",
    },
    dark: {
      bg: "linear-gradient(135deg, #2D1B69 0%, #11052C 100%)",
      cardBg: "rgba(255, 255, 255, 0.1)",
      sidebarBg: "rgba(17, 5, 44, 0.6)",
      headerBg: "rgba(45, 27, 105, 0.8)",
      text: "#ffffff",
      textSecondary: "#94a3b8",
      border: "rgba(255, 255, 255, 0.1)",
      historyBg: "rgba(17, 5, 44, 0.6)",
      modalBg: "rgba(17, 5, 44, 0.95)",
    },
  };

  const currentColors = colors[theme];

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet.",
        variant: "default",
        style: {
          background: currentColors.modalBg,
          color: currentColors.text,
          border: `1px solid ${currentColors.border}`,
        },
      });
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts.length > 0) {
        const address = accounts[0];
        const balanceHex = (await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })) as string;
        const chainIdHex = (await window.ethereum.request({
          method: "eth_chainId",
        })) as string;

        const balanceInEth = (
          Number.parseInt(balanceHex, 16) / Math.pow(10, 18)
        ).toFixed(4);

        setWallet({
          isConnected: true,
          address,
          balance: balanceInEth,
          chainId: Number.parseInt(chainIdHex, 16),
        });

        toast({
          title: "Wallet Connected!",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(
            -4
          )}`,
          variant: "default",
          style: {
            background: currentColors.modalBg,
            color: currentColors.text,
            border: `1px solid ${currentColors.border}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [currentColors.border, currentColors.modalBg, currentColors.text, toast]);

  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
    });
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
      variant: "default",
      style: {
        background: currentColors.modalBg,
        color: currentColors.text,
        border: `1px solid ${currentColors.border}`,
      },
    });
  }, [currentColors.border, currentColors.modalBg, currentColors.text, toast]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied!",
      description: "Address copied to clipboard.",
      variant: "default",
      style: {
        background: currentColors.modalBg,
        color: currentColors.text,
        border: `1px solid ${currentColors.border}`,
      },
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const eth = window.ethereum;

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== wallet.address) {
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    eth.on?.("accountsChanged", handleAccountsChanged);
    eth.on?.("chainChanged", handleChainChanged);

    return () => {
      eth.removeListener?.("accountsChanged", handleAccountsChanged);
      eth.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [connectWallet, disconnectWallet, wallet.address]);

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will be available soon.`,
      duration: 2000,
      variant: "default",
      style: {
        background: currentColors.modalBg,
        color: currentColors.text,
        border: `1px solid ${currentColors.border}`,
      },
    });
  };

  const handleBuyNow = () => {
    if (!wallet.isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to make a purchase.",
        variant: "default",
        style: {
          background: currentColors.modalBg,
          color: currentColors.text,
          border: `1px solid ${currentColors.border}`,
        },
      });
      return;
    }
    showComingSoon("NFT Purchase");
  };

  const handleMakeOffer = () => {
    if (!wallet.isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to make an offer.",
        variant: "default",
        style: {
          background: currentColors.modalBg,
          color: currentColors.text,
          border: `1px solid ${currentColors.border}`,
        },
      });
      return;
    }
    showComingSoon("Make Offer");
  };

  const handleCreatorClick = (creatorName: string) => {
    const creator = creatorsData[creatorName];
    if (creator) {
      setSelectedCreator(creator);
      setShowCreatorModal(true);
    }
  };

  const handleAddNFT = (formData: FormData) => {
    const title = formData.get("title") as string;
    const creator = formData.get("creator") as string;
    const price = formData.get("price") as string;
    const items = Number.parseInt(formData.get("items") as string);

    let image = "";
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      image = URL.createObjectURL(file);
    } else {
      image = `https://picsum.photos/400/300?random=${Date.now()}&blur=1`;
    }

    const newCollection: Collection = {
      id: Date.now(),
      title,
      creator,
      creatorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.toLowerCase()}&backgroundColor=b6e3f4`,
      verified: false,
      items,
      price: `${price} ETH`,
      image,
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      contractAddress: `0x${Math.random()
        .toString(16)
        .substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    };

    setNewCollections((prev) => [newCollection, ...prev]);
    setShowAddNFTModal(false);
    toast({
      title: "NFT Collection Added!",
      description: `${title} has been added to your collections.`,
      variant: "default",
      style: {
        background: currentColors.modalBg,
        color: currentColors.text,
        border: `1px solid ${currentColors.border}`,
      },
    });
  };

  const handleTransactionClick = () => {
    showComingSoon("Transaction Details");
  };

  return (
    <div
      className="min-h-screen transition-all duration-300"
      style={{
        background: currentColors.bg,
        fontFamily: '"Baloo 2", "Montserrat", system-ui, sans-serif',
        color: currentColors.text,
      }}
    >
      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
        style={{
          background: currentColors.headerBg,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${currentColors.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-xl">
              <span className="text-white text-lg sm:text-xl font-bold">
                CC
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div
              className="hidden lg:flex rounded-full p-1"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <button
                onClick={() => setUserType("creator")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  userType === "creator"
                    ? "bg-white text-black shadow-lg transform scale-105"
                    : `${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`
                }`}
              >
                Creator
              </button>
              <button
                onClick={() => setUserType("collector")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  userType === "collector"
                    ? "bg-white text-black shadow-lg transform scale-105"
                    : `${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`
                }`}
              >
                Collector
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentColors.textSecondary}`}
              />
              <input
                type="text"
                placeholder="Search NFT's, Collections"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 pr-6 py-3 w-64 lg:w-96 rounded-full placeholder:transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
                ${
                  theme === "dark"
                    ? "bg-black/20 text-white placeholder-gray-400"
                    : "bg-white/80 text-gray-900 placeholder-gray-600"
                }`}
                style={{
                  border: `1px solid ${currentColors.border}`,
                }}
              />
            </div>

            {wallet.isConnected ? (
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-black/10 transition-colors"
                  onClick={() => copyAddress(wallet.address!)}
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${currentColors.border}`,
                  }}
                >
                  <Wallet className="w-4 h-4 text-green-400" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </span>
                  <span className="text-xs text-gray-400 hidden lg:inline">
                    {wallet.balance} ETH
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-2 rounded-full text-xs sm:text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors hidden sm:block"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 text-xs sm:text-sm"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isConnecting ? "Connecting..." : "Connect"}
                </span>
              </button>
            )}

            <button
              onClick={() => setShowAddNFTModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Add NFT</span>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="lg:hidden mt-4 p-4 rounded-2xl"
            style={{
              background: currentColors.cardBg,
              backdropFilter: "blur(20px)",
              border: `1px solid ${currentColors.border}`,
            }}
          >
            <div className="relative mb-4">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentColors.textSecondary}`}
              />
              <input
                type="text"
                placeholder="Search NFT's, Collections"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 w-full rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(0, 0, 0, 0.2)"
                      : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${currentColors.border}`,
                  color: currentColors.text,
                }}
              />
            </div>

            <div
              className="flex rounded-full p-1 mb-4"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <button
                onClick={() => setUserType("creator")}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  userType === "creator"
                    ? "bg-white text-black shadow-lg"
                    : `${theme === "dark" ? "text-gray-300" : "text-gray-600"}`
                }`}
              >
                Creator
              </button>
              <button
                onClick={() => setUserType("collector")}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  userType === "collector"
                    ? "bg-white text-black shadow-lg"
                    : `${theme === "dark" ? "text-gray-300" : "text-gray-600"}`
                }`}
              >
                Collector
              </button>
            </div>

            <button
              onClick={() => setShowAddNFTModal(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add NFT
            </button>
          </div>
        )}
      </header>

      <aside
        className="hidden lg:flex fixed left-6 top-24 bottom-6 w-20 flex-col items-center py-8 z-40"
        style={{
          background: currentColors.sidebarBg,
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: `1px solid ${currentColors.border}`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex flex-col gap-6 flex-1">
          {[
            { icon: Home, active: true, label: "Home" },
            { icon: User, active: false, label: "Profile" },
            { icon: Gift, active: false, label: "Gifts" },
            { icon: Bookmark, active: false, label: "Bookmarks" },
            { icon: Settings, active: false, label: "Settings" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => !item.active && showComingSoon(item.label)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                item.active
                  ? "bg-white text-black shadow-xl transform scale-110"
                  : `${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    } hover:bg-black/10 hover:scale-105`
              }`}
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        <button
          onClick={() => showComingSoon("Profile")}
          className="w-14 h-14 rounded-full overflow-hidden hover:scale-110 transition-transform duration-300 shadow-xl"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser&backgroundColor=b6e3f4"
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-white"
          />
        </button>
      </aside>

      <main className="pt-24 lg:pt-32 px-4 sm:px-6 lg:ml-32 lg:px-8 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
            <section className="flex-1 flex flex-col gap-16 lg:gap-20">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12">
                  Recent Collections
                </h2>
                <div className="flex justify-center lg:justify-start">
                  {width != null && width < 640 ? (
                    <div className="relative w-full max-w-xs mx-auto flex flex-col items-center">
                      <div className="flex items-center justify-between w-full mb-3">
                        <button
                          className="p-2 rounded-full hover:bg-black/10 transition-colors"
                          onClick={() => {
                            const idx = filteredCollections.findIndex(
                              (c) => c.id === selectedCollection.id
                            );
                            if (idx > 0)
                              setSelectedCollection(
                                filteredCollections[idx - 1]
                              );
                          }}
                          disabled={
                            filteredCollections.findIndex(
                              (c) => c.id === selectedCollection.id
                            ) === 0
                          }
                          style={{
                            opacity:
                              filteredCollections.findIndex(
                                (c) => c.id === selectedCollection.id
                              ) === 0
                                ? 0.3
                                : 1,
                          }}
                          aria-label="Anterior"
                        >
                          <ArrowRight style={{ transform: "rotate(180deg)" }} />
                        </button>
                        <div className="text-xs text-gray-400">
                          {filteredCollections.findIndex(
                            (c) => c.id === selectedCollection.id
                          ) + 1}{" "}
                          / {filteredCollections.length}
                        </div>
                        <button
                          className="p-2 rounded-full hover:bg-black/10 transition-colors"
                          onClick={() => {
                            const idx = filteredCollections.findIndex(
                              (c) => c.id === selectedCollection.id
                            );
                            if (idx < filteredCollections.length - 1)
                              setSelectedCollection(
                                filteredCollections[idx + 1]
                              );
                          }}
                          disabled={
                            filteredCollections.findIndex(
                              (c) => c.id === selectedCollection.id
                            ) ===
                            filteredCollections.length - 1
                          }
                          style={{
                            opacity:
                              filteredCollections.findIndex(
                                (c) => c.id === selectedCollection.id
                              ) ===
                              filteredCollections.length - 1
                                ? 0.3
                                : 1,
                          }}
                          aria-label="Siguiente"
                        >
                          <ArrowRight />
                        </button>
                      </div>
                      <div
                        className="relative w-full"
                        style={{
                          height: "260px",
                          background: currentColors.cardBg,
                          borderRadius: "20px",
                          border: `1px solid ${currentColors.border}`,
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.18)",
                          pointerEvents:
                            showAddNFTModal || showCreatorModal
                              ? "none"
                              : "auto",
                        }}
                        onClick={() =>
                          setSelectedCollection(selectedCollection)
                        }
                      >
                        <div
                          className="flex items-center gap-2 sm:gap-3 px-4 py-2 absolute top-0 left-0 right-0 z-10"
                          style={{
                            background:
                              theme === "dark"
                                ? "rgba(20,16,41,0.85)"
                                : "rgba(255,255,255,0.85)",
                            backdropFilter: "blur(14px)",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderBottom: `1px solid ${currentColors.border}`,
                            minHeight: 44,
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCreatorClick(selectedCollection.creator);
                            }}
                            className="flex items-center gap-2 hover:scale-105 transition-transform"
                            tabIndex={
                              showAddNFTModal || showCreatorModal ? -1 : 0
                            }
                          >
                            <img
                              src={
                                selectedCollection.creatorAvatar ||
                                "/placeholder.svg"
                              }
                              alt={selectedCollection.creator}
                              className="w-7 h-7 rounded-full border-2 border-white/30 shadow-lg"
                            />
                            <div>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`text-xs font-semibold ${
                                    theme === "dark"
                                      ? "text-gray-200"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {selectedCollection.creator}
                                </span>
                                {selectedCollection.verified && (
                                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle className="w-2 h-2 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                          <span
                            className={`ml-3 text-base font-bold truncate ${
                              theme === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            {selectedCollection.title}
                          </span>
                        </div>
                        <div
                          className="flex items-center justify-center w-full"
                          style={{
                            height: "calc(100% - 56px)",
                            marginTop: 44,
                            padding: 12,
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            className="w-full h-full rounded-xl overflow-hidden relative shadow-lg"
                            style={{
                              background: selectedCollection.bgGradient,
                              borderRadius: 15,
                            }}
                          >
                            <img
                              src={
                                selectedCollection.image || "/placeholder.svg"
                              }
                              alt={selectedCollection.title}
                              className="w-full h-full object-cover"
                              style={{ borderRadius: 15 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                              <div
                                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                  background: "rgba(0,0,0,0.42)",
                                  color: "#fff",
                                  backdropFilter: "blur(6px)",
                                }}
                              >
                                <Eye className="w-3 h-3" />
                                <span>{selectedCollection.items}</span>
                              </div>
                              <div
                                className="px-3 py-1 rounded-full text-base font-bold"
                                style={{
                                  background: "rgba(0,0,0,0.42)",
                                  color: "#fff",
                                  backdropFilter: "blur(6px)",
                                }}
                              >
                                {selectedCollection.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl h-60 sm:h-72 lg:h-80 overflow-visible">
                      {filteredCollections
                        .slice(0, 10)
                        .map((collection, index) => {
                          const isSelected =
                            selectedCollection?.id === collection.id;
                          const gapX = 48;
                          const gapY = 22;
                          const zIndex = isSelected ? 49 : 10 + index;
                          const translateX = index * gapX;
                          const translateY = index * gapY;
                          const rotate = index * 2;
                          const scale = isSelected ? 1.08 : 1;

                          return (
                            <div
                              key={collection.id}
                              className="absolute cursor-pointer transition-all duration-500 ease-out"
                              style={{
                                width:
                                  width == null
                                    ? "320px"
                                    : width < 640
                                    ? "240px"
                                    : width < 1024
                                    ? "280px"
                                    : "320px",
                                height:
                                  width == null
                                    ? "240px"
                                    : width < 640
                                    ? "180px"
                                    : width < 1024
                                    ? "210px"
                                    : "240px",
                                zIndex,
                                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                                background: currentColors.cardBg,
                                backdropFilter: "blur(20px)",
                                borderRadius: "20px",
                                border: `1px solid ${currentColors.border}`,
                                boxShadow: isSelected
                                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                  : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                                pointerEvents:
                                  showAddNFTModal || showCreatorModal
                                    ? "none"
                                    : "auto",
                              }}
                              onClick={() => setSelectedCollection(collection)}
                            >
                              <div
                                className="flex items-center gap-2 sm:gap-3 px-4 py-2 absolute top-0 left-0 right-0 z-10"
                                style={{
                                  background:
                                    theme === "dark"
                                      ? "rgba(20,16,41,0.85)"
                                      : "rgba(255,255,255,0.85)",
                                  backdropFilter: "blur(14px)",
                                  borderTopLeftRadius: 20,
                                  borderTopRightRadius: 20,
                                  borderBottom: `1px solid ${currentColors.border}`,
                                  minHeight: 44,
                                }}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCreatorClick(collection.creator);
                                  }}
                                  className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform"
                                  tabIndex={
                                    showAddNFTModal || showCreatorModal ? -1 : 0
                                  }
                                >
                                  <img
                                    src={
                                      collection.creatorAvatar ||
                                      "/placeholder.svg"
                                    }
                                    alt={collection.creator}
                                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full border-2 border-white/30 shadow-lg"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                      <span
                                        className={`text-xs sm:text-sm font-semibold ${
                                          theme === "dark"
                                            ? "text-gray-200"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {collection.creator}
                                      </span>
                                      {collection.verified && (
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                          <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                                <span
                                  className={`ml-3 text-base sm:text-lg font-bold truncate ${
                                    theme === "dark"
                                      ? "text-white"
                                      : "text-black"
                                  }`}
                                >
                                  {collection.title}
                                </span>
                              </div>
                              <div
                                className="flex items-center justify-center w-full"
                                style={{
                                  height: "calc(100% - 56px)",
                                  marginTop: 44,
                                  padding: 12,
                                  boxSizing: "border-box",
                                }}
                              >
                                <div
                                  className="w-full h-full rounded-xl overflow-hidden relative shadow-lg"
                                  style={{
                                    background: collection.bgGradient,
                                    borderRadius: 15,
                                  }}
                                >
                                  <img
                                    src={collection.image || "/placeholder.svg"}
                                    alt={collection.title}
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: 15 }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                    <div
                                      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                      style={{
                                        background: "rgba(0,0,0,0.42)",
                                        color: "#fff",
                                        backdropFilter: "blur(6px)",
                                      }}
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>{collection.items}</span>
                                    </div>
                                    <div
                                      className="px-3 py-1 rounded-full text-base font-bold"
                                      style={{
                                        background: "rgba(0,0,0,0.42)",
                                        color: "#fff",
                                        backdropFilter: "blur(6px)",
                                      }}
                                    >
                                      {collection.price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 lg:p-8 mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12">
                  History
                </h2>

                <div
                  className="flex gap-1 sm:gap-2 mb-6 lg:mb-8 p-1 sm:p-2 rounded-full w-fit mx-auto sm:mx-0"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {[
                    { key: "all", label: "All history" },
                    { key: "purchase", label: "Purchase" },
                    { key: "transfer", label: "Transfer" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() =>
                        setActiveHistoryTab(
                          tab.key as "all" | "purchase" | "transfer"
                        )
                      }
                      className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                        activeHistoryTab === tab.key
                          ? "bg-white text-black shadow-lg transform scale-105"
                          : `${
                              theme === "dark"
                                ? "text-gray-300 hover:text-white"
                                : "text-gray-600 hover:text-black"
                            } hover:bg-black/10`
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div
                  className="overflow-hidden"
                  style={{
                    background: currentColors.historyBg,
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: `1px solid ${currentColors.border}`,
                  }}
                >
                  <div
                    className="hidden sm:grid grid-cols-5 gap-4 lg:gap-6 p-4 lg:p-8 border-b text-xs sm:text-sm font-semibold"
                    style={{
                      borderColor: currentColors.border,
                      color: currentColors.textSecondary,
                    }}
                  >
                    <div>Event</div>
                    <div>From/To</div>
                    <div>Amount</div>
                    <div>Value</div>
                    <div>Date</div>
                  </div>

                  {historyData[activeHistoryTab].map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 lg:gap-6 p-4 lg:p-8 border-b last:border-0 hover:bg-black/5 transition-all duration-300 group cursor-pointer"
                      style={{ borderColor: currentColors.border }}
                      onClick={handleTransactionClick}
                    >
                      <div className="sm:hidden space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              item.type === "Purchase"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : item.type === "Transfer"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            }`}
                          >
                            {item.type}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: currentColors.textSecondary }}
                          >
                            {item.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.fromAvatar || "/placeholder.svg"}
                            alt="From"
                            className="w-6 h-6 rounded-full"
                          />
                          <ArrowRight
                            className="w-4 h-4"
                            style={{ color: currentColors.textSecondary }}
                          />
                          <img
                            src={item.toAvatar || "/placeholder.svg"}
                            alt="To"
                            className="w-full h-full object-cover rounded-full border-2 border-white"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            {item.amount} items
                          </span>
                          <div className="text-right">
                            <div className="font-bold">{item.value}</div>
                            <div
                              className="text-xs"
                              style={{ color: currentColors.textSecondary }}
                            >
                              {item.valueUSD}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:contents">
                        <div>
                          <span
                            className={`px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs font-semibold border ${
                              item.type === "Purchase"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : item.type === "Transfer"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-4">
                          <img
                            src={item.fromAvatar || "/placeholder.svg"}
                            alt="From"
                            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                          />
                          <ArrowRight
                            className="w-4 h-4"
                            style={{ color: currentColors.textSecondary }}
                          />
                          <img
                            src={item.toAvatar || "/placeholder.svg"}
                            alt="To"
                            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                          />
                        </div>
                        <div className="font-semibold text-sm lg:text-lg">
                          {item.amount}
                        </div>
                        <div>
                          <div className="font-bold text-sm lg:text-lg">
                            {item.value}
                          </div>
                          <div
                            className="text-xs lg:text-sm"
                            style={{ color: currentColors.textSecondary }}
                          >
                            {item.valueUSD}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: currentColors.textSecondary }}>
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full xl:w-96 flex flex-col gap-6 lg:gap-8">
              <div
                style={{
                  background: currentColors.cardBg,
                  backdropFilter: "blur(20px)",
                  borderRadius: "24px",
                  border: `1px solid ${currentColors.border}`,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: selectedCollection.bgGradient,
                      borderRadius: 24,
                      zIndex: 1,
                    }}
                  />

                  <div
                    className="absolute top-0 left-0 right-0 flex flex-col gap-2 z-20"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(20,16,41,0.94)"
                          : "rgba(255,255,255,0.96)",
                      backdropFilter: "blur(15px)",
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24,
                      padding: width && width < 640 ? 14 : 24,
                      paddingBottom: width && width < 640 ? 10 : 14,
                      minHeight: width && width < 640 ? 74 : 92,
                      boxSizing: "border-box",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          selectedCollection.creatorAvatar || "/placeholder.svg"
                        }
                        alt={selectedCollection.creator}
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white/30 shadow-lg"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-base sm:text-lg ${
                              theme === "dark"
                                ? "text-gray-200"
                                : "text-gray-800"
                            }`}
                          >
                            {selectedCollection.creator}
                          </span>
                          {selectedCollection.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3
                      className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 mt-2"
                      style={{ color: theme === "dark" ? "#fff" : "#18181b" }}
                    >
                      {selectedCollection.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      paddingTop: width && width < 640 ? 74 : 92,
                      borderBottomLeftRadius: 24,
                      borderBottomRightRadius: 24,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={selectedCollection.image || "/placeholder.svg"}
                      alt={selectedCollection.title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                      style={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                      }}
                    />
                    <div
                      className="absolute left-0 right-0"
                      style={{
                        bottom: 0,
                        height: "50%",
                        background:
                          "linear-gradient(0deg,rgba(0,0,0,0.4),transparent)",
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                        zIndex: 10,
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 z-30">
                    <button
                      onClick={() => showComingSoon("Like")}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => showComingSoon("Share")}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <p
                    className="text-sm lg:text-lg mb-6 lg:mb-8"
                    style={{ color: currentColors.textSecondary }}
                  >
                    #{selectedCollection.id}
                  </p>

                  <div className="flex items-center justify-between mb-6 lg:mb-8">
                    <div
                      className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-full"
                      style={{
                        background:
                          theme === "dark"
                            ? "rgba(0, 0, 0, 0.2)"
                            : "rgba(0, 0, 0, 0.05)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="font-semibold text-sm lg:text-lg">
                        {selectedCollection.items}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                          {selectedCollection.price}
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 py-3 lg:py-4 px-4 lg:px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm lg:text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={handleMakeOffer}
                      className="flex-1 py-3 lg:py-4 px-4 lg:px-6 rounded-full font-bold text-sm lg:text-lg hover:bg-black/10 transition-all transform hover:scale-105 text-black dark:text-white"
                      style={{
                        border: `2px solid ${currentColors.border}`,
                      }}
                    >
                      Make Offer
                    </button>
                  </div>

                  {wallet.isConnected && (
                    <div
                      className="text-xs space-y-2"
                      style={{ color: currentColors.textSecondary }}
                    >
                      <div className="flex items-center justify-between">
                        <span>Contract:</span>
                        <button
                          onClick={() =>
                            copyAddress(selectedCollection.contractAddress)
                          }
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <span>{selectedCollection.contractAddress}</span>
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Token ID:</span>
                        <span>{selectedCollection.id}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="p-6 lg:p-8 mb-12"
                style={{
                  background: currentColors.cardBg,
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  border: `1px solid ${currentColors.border}`,
                }}
              >
                <h3 className="text-lg lg:text-2xl font-bold mb-4 lg:mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-4 lg:space-y-6">
                  {[
                    { label: "Floor Price", value: "2.1 ETH", change: "+5.2%" },
                    { label: "Volume", value: "1,234 ETH", change: "+12.8%" },
                    { label: "Items", value: "10,000", change: "0%" },
                    { label: "Owners", value: "3,456", change: "+2.1%" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span
                        className="text-sm lg:text-lg"
                        style={{ color: currentColors.textSecondary }}
                      >
                        {stat.label}
                      </span>
                      <div className="text-right">
                        <div className="font-bold text-sm lg:text-lg">
                          {stat.value}
                        </div>
                        <div
                          className={`text-xs lg:text-sm ${
                            stat.change.startsWith("+")
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {showAddNFTModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.8)" }}
          onClick={() => setShowAddNFTModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6"
            style={{
              background: currentColors.modalBg,
              backdropFilter: "blur(20px)",
              border: `1px solid ${currentColors.border}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New NFT Collection</h2>
              <button
                onClick={() => setShowAddNFTModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddNFT(formData);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Collection Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.8)",
                    border: `1px solid ${currentColors.border}`,
                    color: currentColors.text,
                  }}
                  placeholder="Enter collection title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Creator Name
                </label>
                <input
                  type="text"
                  name="creator"
                  required
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.8)",
                    border: `1px solid ${currentColors.border}`,
                    color: currentColors.text,
                  }}
                  placeholder="Enter creator name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price (ETH)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.8)",
                    border: `1px solid ${currentColors.border}`,
                    color: currentColors.text,
                  }}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Items
                </label>
                <input
                  type="number"
                  name="items"
                  required
                  min="1"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.8)",
                    border: `1px solid ${currentColors.border}`,
                    color: currentColors.text,
                  }}
                  placeholder="Enter number of items"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddNFTModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold hover:bg-black/10 transition-colors"
                  style={{ border: `1px solid ${currentColors.border}` }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Add Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreatorModal && selectedCreator && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.8)" }}
          onClick={() => setShowCreatorModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            style={{
              background: currentColors.modalBg,
              backdropFilter: "blur(20px)",
              border: `1px solid ${currentColors.border}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Creator Profile</h2>
              <button
                onClick={() => setShowCreatorModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <img
                src={selectedCreator.avatar || "/placeholder.svg"}
                alt={selectedCreator.name}
                className="w-20 h-20 rounded-full border-4 border-purple-500/30"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{selectedCreator.name}</h3>
                  {selectedCreator.verified && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p
                  className={`text-sm lg:text-lg mb-6 lg:mb-8 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {selectedCreator.handle}
                </p>
                <p
                  className={`text-sm lg:text-lg mb-6 lg:mb-8 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {selectedCreator.bio}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Collections",
                  value: selectedCreator.collections,
                  icon: ImageIcon,
                },
                {
                  label: "Followers",
                  value: selectedCreator.followers.toLocaleString(),
                  icon: Users,
                },
                {
                  label: "Following",
                  value: selectedCreator.following.toLocaleString(),
                  icon: Heart,
                },
                {
                  label: "Volume",
                  value: selectedCreator.totalVolume,
                  icon: TrendingUp,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl text-center"
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.5)",
                    border: `1px solid ${currentColors.border}`,
                  }}
                >
                  <stat.icon
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: currentColors.textSecondary }}
                  />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div
                    className="text-sm"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar
                  className="w-5 h-5"
                  style={{ color: currentColors.textSecondary }}
                />
                <span>Joined {selectedCreator.joinedDate}</span>
              </div>

              {selectedCreator.website && (
                <div className="flex items-center gap-3">
                  <Globe
                    className="w-5 h-5"
                    style={{ color: currentColors.textSecondary }}
                  />
                  <a
                    href={selectedCreator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {selectedCreator.website}
                  </a>
                </div>
              )}

              {selectedCreator.twitter && (
                <div className="flex items-center gap-3">
                  <Twitter
                    className="w-5 h-5"
                    style={{ color: currentColors.textSecondary }}
                  />
                  <span>{selectedCreator.twitter}</span>
                </div>
              )}

              {selectedCreator.instagram && (
                <div className="flex items-center gap-3">
                  <Instagram
                    className="w-5 h-5"
                    style={{ color: currentColors.textSecondary }}
                  />
                  <span>{selectedCreator.instagram}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => showComingSoon("Follow Creator")}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Follow
              </button>
              <button
                onClick={() => showComingSoon("Message Creator")}
                className="flex-1 py-3 px-4 rounded-xl font-semibold hover:bg-black/10 transition-colors"
                style={{ border: `1px solid ${currentColors.border}` }}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    handler: (...args: unknown[]) => void
  ) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
