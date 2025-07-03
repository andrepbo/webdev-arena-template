"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Bookmark,
  CheckCircle,
  Copy,
  ExternalLink,
  Eye,
  Gift,
  Heart,
  Home,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Share2,
  Sun,
  TrendingUp,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Web3 Integration Types
interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
}

// Theme hook
const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
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

// Mock NFT data with enhanced information
const collections = [
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
];

const featuredNFT = {
  id: 141,
  title: "Adventure Robot",
  creator: "Lynn Chang",
  creatorHandle: "@lynnchang_nft",
  creatorAvatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=lynn&backgroundColor=b6e3f4",
  verified: true,
  price: "21.345 ETH",
  priceUSD: "$42,690",
  views: 120,
  likes: 89,
  image: "https://picsum.photos/600/400?random=robot&blur=1",
  bgGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  contractAddress: "0x5678...9012",
  tokenId: "141",
};

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
    // Esto sólo corre en el cliente
    const handleResize = () => setWidth(window.innerWidth);
    setWidth(window.innerWidth); // Valor inicial

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function NFTDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [userType, setUserType] = useState<"creator" | "collector">("creator");
  const [selectedCollection, setSelectedCollection] = useState<Collection>(
    collections[0]
  );
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(
    null
  );
  const [activeHistoryTab, setActiveHistoryTab] = useState<
    "all" | "purchase" | "transfer"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  // Theme colors
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
    },
  };
  const width = useWindowWidth();
  const currentColors = colors[theme];

  // Web3 Wallet Integration
  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet.",
        variant: "destructive",
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
  }, [toast, setWallet, setIsConnecting]);

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
    });
  }, [toast, setWallet]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied!",
      description: "Address copied to clipboard.",
    });
  };

  const viewOnEtherscan = (txHash: string) => {
    window.open(`https://etherscan.io/tx/${txHash}`, "_blank");
  };

  // Listen for account changes
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
      variant: "destructive",
    });
  };

  const handleCollectionHover = (collection: Collection) => {
    setSelectedCollection(collection);
    setHoveredCollection(collection.id);
  };

  const handleCollectionLeave = () => {
    setHoveredCollection(null);
  };

  const handleBuyNow = () => {
    if (!wallet.isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to make a purchase.",
        variant: "destructive",
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
        variant: "destructive",
      });
      return;
    }
    showComingSoon("Make Offer");
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
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
        style={{
          background: currentColors.headerBg,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${currentColors.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-xl">
              <span className="text-white text-lg sm:text-xl font-bold">
                CC
              </span>
            </div>

            {/* Mobile Menu Button */}
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

            {/* Desktop Toggle */}
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

          {/* Search and Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden sm:block">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentColors.textSecondary}`}
              />
              <input
                type="text"
                placeholder="Search NFT's, Collections"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 w-64 lg:w-96 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${currentColors.border}`,
              }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Wallet Connection - Responsive */}
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

            {/* Add NFT Button - Hidden on mobile */}
            <button
              onClick={() => showComingSoon("Add NFT")}
              className="hidden sm:flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Add NFT</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden mt-4 p-4 rounded-2xl"
            style={{
              background: currentColors.cardBg,
              backdropFilter: "blur(20px)",
              border: `1px solid ${currentColors.border}`,
            }}
          >
            {/* Mobile Search */}
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

            {/* Mobile Toggle */}
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

            {/* Mobile Add NFT */}
            <button
              onClick={() => showComingSoon("Add NFT")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add NFT
            </button>
          </div>
        )}
      </header>

      {/* Sidebar - Desktop Only */}
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
          className="w-14 h-14 rounded-2xl overflow-hidden hover:scale-110 transition-transform duration-300 shadow-xl"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser&backgroundColor=b6e3f4"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </aside>

      {/* Main Content */}
      <main className="pt-24 lg:pt-32 px-4 sm:px-6 lg:ml-32 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
            {/* Left Column - Collections and History */}
            <section className="flex-1 flex flex-col gap-12 lg:gap-16">
              {/* Recent Collections */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12">
                  Recent Collections
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl h-60 sm:h-72 lg:h-80 overflow-visible">
                    {collections.map((collection, index) => {
                      const isHovered = hoveredCollection === collection.id;
                      const zIndex = isHovered ? 50 : 40 - index * 5;
                      const translateX = isHovered ? -20 : index * 12;
                      const translateY = isHovered ? -30 : index * 8;
                      const rotate = isHovered ? -8 : index * 2;
                      const scale = isHovered ? 1.1 : 1;

                      return (
                        <div
                          key={collection.id}
                          className="absolute cursor-pointer transition-all duration-500 ease-out"
                          style={{
                            width:
                              width == null
                                ? "320px" // Fallback SSR/1st render
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
                            boxShadow: isHovered
                              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                              : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                          }}
                          onMouseEnter={() => handleCollectionHover(collection)}
                          onMouseLeave={handleCollectionLeave}
                        >
                          <div className="relative h-full overflow-hidden rounded-2xl">
                            <div
                              className="absolute inset-0 opacity-30"
                              style={{ background: collection.bgGradient }}
                            />
                            <img
                              src={collection.image || "/placeholder.svg"}
                              alt={collection.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                            {/* Creator Info */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 sm:gap-3">
                              <img
                                src={
                                  collection.creatorAvatar || "/placeholder.svg"
                                }
                                alt={collection.creator}
                                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white/30 shadow-lg"
                              />
                              <div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <span className="text-white text-xs sm:text-sm font-semibold">
                                    {collection.creator}
                                  </span>
                                  {collection.verified && (
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                      <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                              <div
                                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium"
                                style={{
                                  background: "rgba(0, 0, 0, 0.4)",
                                  backdropFilter: "blur(10px)",
                                }}
                              >
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{collection.items}</span>
                              </div>
                              <div
                                className="px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white text-sm sm:text-lg font-bold"
                                style={{
                                  background: "rgba(0, 0, 0, 0.4)",
                                  backdropFilter: "blur(10px)",
                                }}
                              >
                                {collection.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* History Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12">
                  History
                </h2>

                {/* History Tabs */}
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

                {/* History Table */}
                <div
                  className="overflow-hidden"
                  style={{
                    background: currentColors.historyBg,
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: `1px solid ${currentColors.border}`,
                  }}
                >
                  {/* Table Header - Hidden on mobile */}
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

                  {/* Table Rows */}
                  {historyData[activeHistoryTab].map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 lg:gap-6 p-4 lg:p-8 border-b last:border-0 hover:bg-black/5 transition-all duration-300 group cursor-pointer"
                      style={{ borderColor: currentColors.border }}
                      onClick={() => viewOnEtherscan(item.txHash)}
                    >
                      {/* Mobile Layout */}
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
                            className="w-6 h-6 rounded-full"
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

                      {/* Desktop Layout */}
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
                          <ExternalLink
                            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: currentColors.textSecondary }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Right Column - Featured NFT */}
            <section className="w-full xl:w-96 flex flex-col gap-6 lg:gap-8">
              <div
                className="overflow-hidden"
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
                    style={{ background: selectedCollection.bgGradient }}
                  />
                  <img
                    src={selectedCollection.image || "/placeholder.svg"}
                    alt={featuredNFT.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Action Buttons */}
                  <div className="absolute top-4 lg:top-6 right-4 lg:right-6 flex gap-2 lg:gap-3">
                    <button
                      onClick={() => showComingSoon("Like")}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </button>
                    <button
                      onClick={() => showComingSoon("Share")}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Share2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </button>
                  </div>

                  {/* Creator Info */}
                  <div className="absolute top-4 lg:top-6 left-4 lg:left-6 flex items-center gap-3 lg:gap-4">
                    <img
                      src={featuredNFT.creatorAvatar || "/placeholder.svg"}
                      alt={featuredNFT.creator}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 shadow-lg"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm lg:text-lg">
                          {featuredNFT.creator}
                        </span>
                        {featuredNFT.verified && (
                          <div className="w-4 h-4 lg:w-5 lg:h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-2 h-2 lg:w-3 lg:h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-white/70 text-xs lg:text-sm">
                        {featuredNFT.creatorHandle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                    {featuredNFT.title}
                  </h3>
                  <p
                    className="text-sm lg:text-lg mb-6 lg:mb-8"
                    style={{ color: currentColors.textSecondary }}
                  >
                    #{featuredNFT.id}
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
                        {featuredNFT.views}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                          {featuredNFT.price}
                        </div>
                        <div
                          className="text-xs lg:text-sm"
                          style={{ color: currentColors.textSecondary }}
                        >
                          {featuredNFT.priceUSD}
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
                      className="flex-1 py-3 lg:py-4 px-4 lg:px-6 rounded-full text-pink-600 font-bold text-sm lg:text-lg hover:bg-black/10 transition-all transform hover:scale-105"
                      style={{
                        border: `2px solid ${currentColors.border}`,
                      }}
                    >
                      Make Offer
                    </button>
                  </div>

                  {/* Contract Info */}
                  {wallet.isConnected && (
                    <div
                      className="text-xs space-y-2"
                      style={{ color: currentColors.textSecondary }}
                    >
                      <div className="flex items-center justify-between">
                        <span>Contract:</span>
                        <button
                          onClick={() =>
                            copyAddress(featuredNFT.contractAddress)
                          }
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <span>{featuredNFT.contractAddress}</span>
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Token ID:</span>
                        <span>{featuredNFT.tokenId}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div
                className="p-6 lg:p-8"
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
