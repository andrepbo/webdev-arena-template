import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Montserrat, Poppins } from "next/font/google";
import { Heart, Key } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Types
type Nft = {
  id: string;
  name: string;
  creator: string;
  price: number;
  likes: number;
  image: string;
  rarity: string;
};

type Artist = {
  id: string;
  name: string;
  avatar: string;
  volume: number;
  floor: number;
  items: number;
  sales: number;
};

// Sample Data
const trendingNFTs: Nft[] = [
  {
    id: "1",
    name: "CryptoPunk #3100",
    creator: "Larva Labs",
    price: 4200,
    likes: 124,
    image: "https://cryptopunks.app/cryptopunks/cryptopunk3100.png",
    rarity: "Legendary",
  },
  {
    id: "2",
    name: "Bored Ape Yacht Club #2087",
    creator: "Yuga Labs",
    price: 769,
    likes: 210,
    image:
      "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
    rarity: "Epic",
  },
  {
    id: "3",
    name: "Doodle #6914",
    creator: "Doodles",
    price: 33.21,
    likes: 156,
    image:
      "https://img.freepik.com/vetores-gratis/ilustracao-de-macaco-estilo-nft-desenhada-a-mao_23-2149622021.jpg",
    rarity: "Rare",
  },
  {
    id: "4",
    name: "CryptoPunk #7804",
    creator: "Larva Labs",
    price: 8000,
    likes: 67,
    image: "https://cryptopunks.app/cryptopunks/cryptopunk7804.png",
    rarity: "Legendary",
  },
  {
    id: "5",
    name: "Azuki #9605",
    creator: "Chiru Labs",
    price: 120,
    likes: 98,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAR40G49O64i6MjQsbWNe8pWnZ_DuXQTkMA&s",
    rarity: "Epic",
  },
  {
    id: "6",
    name: "CloneX #4594",
    creator: "RTFKT",
    price: 88,
    likes: 76,
    image: "https://clonex-assets.rtfkt.com/images/4594.png",
    rarity: "Rare",
  },
  {
    id: "7",
    name: "Moonbird #2642",
    creator: "PROOF Collective",
    price: 45.5,
    likes: 54,
    image:
      "https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg",
    rarity: "Rare",
  },
  {
    id: "8",
    name: "Meebit #10761",
    creator: "Larva Labs",
    price: 22.7,
    likes: 33,
    image:
      "https://meebits.larvalabs.com/meebitimages/characterimage?index=10761&type=full",
    rarity: "Uncommon",
  },
  {
    id: "9",
    name: "Cool Cat #1490",
    creator: "Cool Cats",
    price: 12.3,
    likes: 120,
    image:
      "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg",
    rarity: "Rare",
  },
  {
    id: "10",
    name: "World of Women #6025",
    creator: "WoW",
    price: 18.9,
    likes: 87,
    image:
      "https://img.freepik.com/vetores-gratis/ilustracao-de-macaco-estilo-nft-desenhada-a-mao_23-2149611030.jpg?semt=ais_hybrid&w=740",
    rarity: "Epic",
  },
  {
    id: "11",
    name: "Mutant Ape #4849",
    creator: "Yuga Labs",
    price: 32.1,
    likes: 65,
    image:
      "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fbf20c0cb-c9be-455e-9f7f-1cb024c71170.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1",
    rarity: "Epic",
  },
  {
    id: "12",
    name: "Goblin #1234",
    creator: "Goblintown",
    price: 2.5,
    likes: 44,
    image:
      "https://preview.redd.it/un76ykeci6081.jpg?width=1080&crop=smart&auto=webp&s=a09725914ae87af378500aa0f26e5206a0f1e64d",
    rarity: "Uncommon",
  },
];

const leaderboardArtists: Artist[] = [
  {
    id: "1",
    name: "Donut Gang",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    volume: 12345,
    floor: 5.67,
    items: 45,
    sales: 120,
  },
  {
    id: "2",
    name: "Tentacle Studios",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    volume: 18900,
    floor: 8.45,
    items: 23,
    sales: 150,
  },
  {
    id: "3",
    name: "CatSpace Labs",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    volume: 15600,
    floor: 3.21,
    items: 89,
    sales: 95,
  },
  {
    id: "4",
    name: "Glow Corp",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    volume: 8900,
    floor: 1.45,
    items: 312,
    sales: 67,
  },
  {
    id: "5",
    name: "Pixel Pioneers",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    volume: 21000,
    floor: 9.12,
    items: 56,
    sales: 180,
  },
  {
    id: "6",
    name: "Neon Dreams",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    volume: 13400,
    floor: 4.88,
    items: 77,
    sales: 102,
  },
  {
    id: "7",
    name: "Aether Collective",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    volume: 9800,
    floor: 2.34,
    items: 120,
    sales: 80,
  },
  {
    id: "8",
    name: "MetaMakers",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    volume: 17500,
    floor: 6.77,
    items: 65,
    sales: 140,
  },
  {
    id: "9",
    name: "DreamWeavers",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    volume: 11200,
    floor: 3.56,
    items: 98,
    sales: 110,
  },
  {
    id: "10",
    name: "Quantum Artisans",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    volume: 20500,
    floor: 7.89,
    items: 34,
    sales: 160,
  },
  {
    id: "11",
    name: "Vaporwave Studio",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    volume: 8700,
    floor: 1.98,
    items: 210,
    sales: 60,
  },
  {
    id: "12",
    name: "Starlight Labs",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    volume: 14300,
    floor: 5.12,
    items: 78,
    sales: 99,
  },
  {
    id: "13",
    name: "Pixelated Dreams",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    volume: 11900,
    floor: 2.76,
    items: 134,
    sales: 85,
  },
  {
    id: "14",
    name: "Synthwave Artists",
    avatar: "https://randomuser.me/api/portraits/women/74.jpg",
    volume: 16200,
    floor: 6.23,
    items: 54,
    sales: 130,
  },
  {
    id: "15",
    name: "Digital Nomads",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    volume: 10100,
    floor: 2.11,
    items: 156,
    sales: 75,
  },
  {
    id: "16",
    name: "Cosmic Creators",
    avatar: "https://randomuser.me/api/portraits/women/86.jpg",
    volume: 18700,
    floor: 8.01,
    items: 29,
    sales: 170,
  },
  {
    id: "17",
    name: "Retroverse",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    volume: 9500,
    floor: 1.67,
    items: 200,
    sales: 55,
  },
  {
    id: "18",
    name: "Infinite Gallery",
    avatar: "https://randomuser.me/api/portraits/women/92.jpg",
    volume: 15300,
    floor: 4.55,
    items: 88,
    sales: 105,
  },
  {
    id: "19",
    name: "Prism Studio",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    volume: 17800,
    floor: 7.34,
    items: 47,
    sales: 145,
  },
  {
    id: "20",
    name: "Aurora Collective",
    avatar: "https://randomuser.me/api/portraits/women/100.jpg",
    volume: 12500,
    floor: 3.98,
    items: 112,
    sales: 92,
  },
];

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Close drawer on navigation
  const handleNavClick = () => setDrawerOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6 dark:bg-[#131517] bg-[#f8fafc] bg-opacity-70 transition-all">
        <div className="text-[#e6a06a] font-bold text-xl tracking-widest">
          RARE
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 dark:text-gray-200 text-black font-medium text-sm">
          <li>
            <a href="#home" className="hover:text-[#e6a06a] transition-colors">
              Home
            </a>
          </li>
          <li>
            <a
              href="#trending-nfts"
              className="hover:text-[#e6a06a] transition-colors"
            >
              Trending NFTs
            </a>
          </li>
          <li>
            <a
              href="#leaderboard"
              className="hover:text-[#e6a06a] transition-colors"
            >
              Leaderboard
            </a>
          </li>
          <li>
            <a
              href="#artists"
              className="hover:text-[#e6a06a] transition-colors"
            >
              Artists
            </a>
          </li>
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <button
            className="bg-[#e6a06a] flex items-center gap-2 text-[#18151c] px-6 py-3 rounded-full font-normal text-sm hover:bg-[#e6a06a] transition"
            onClick={() => toast.info("Coming soon...")}
          >
            Sign In
          </button>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className="text-[#e6a06a] focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="10" x2="26" y2="10" />
              <line x1="6" y1="16" x2="26" y2="16" />
              <line x1="6" y1="22" x2="26" y2="22" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 dark:bg-[#1f2326] bg-[#f8fafc] dark:text-gray-200 text-black z-50 shadow-2xl transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionProperty: "transform" }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close navigation menu"
        >
          &times;
        </button>
        <ul className="flex flex-col gap-8 dark:text-gray-200 text-black font-medium text-lg mt-20 px-8 z-999">
          <li>
            <a
              href="#home"
              className="hover:text-[#e6a06a] transition-colors"
              onClick={handleNavClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#trending-nfts"
              className="hover:text-[#e6a06a] transition-colors"
              onClick={handleNavClick}
            >
              Trending NFTs
            </a>
          </li>
          <li>
            <a
              href="#leaderboard"
              className="hover:text-[#e6a06a] transition-colors"
              onClick={handleNavClick}
            >
              Leaderboard
            </a>
          </li>
          <li>
            <a
              href="#artists"
              className="hover:text-[#e6a06a] transition-colors"
              onClick={handleNavClick}
            >
              Artists
            </a>
          </li>

          <li>
            <button
              className="bg-[#e6a06a] flex items-center gap-2 text-[#18151c] px-6 py-2 rounded-full font-normal text-sm hover:bg-[#e6a06a] transition"
              onClick={() => toast.info("Coming soon...")}
            >
              Sign In
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

const HeroSection: React.FC = () => (
  <div
    id="home"
    className="w-full h-full flex-1 flex flex-col items-center justify-center relative min-h-screen"
    style={{
      backgroundImage:
        "url(https://img.freepik.com/premium-photo/abstract-geometric-landscape-illustration-as-background_777271-2225.jpg?semt=ais_hybrid&w=740)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "difference",
      backgroundColor: "#18151c",
    }}
  >
    <div className="absolute inset-0 pointer-events-none z-40">
      <div className="absolute top-24 left-1/4 w-24 h-2 bg-gradient-to-r from-black to-transparent rounded-full blur-sm rotate-12" />
      <div className="absolute top-32 right-1/4 w-16 h-2 bg-gradient-to-l from-black to-transparent rounded-full blur-sm -rotate-12" />
      <div className="absolute top-1/2 left-10 w-10 h-2 bg-gradient-to-r from-black to-transparent rounded-full blur-sm rotate-6" />
      <div className="absolute top-1/2 right-10 w-10 h-2 bg-gradient-to-l from-black to-transparent rounded-full blur-sm -rotate-6" />
    </div>
    <h1
      className={`text-4xl md:text-5xl lg:text-7xl font-extrabold text-black text-center mb-6 drop-shadow-xl mt-40 ${montserrat.className}`}
    >
      <span className="block">UNLOCK</span>
      <span className="block">THE POWER</span>
      <span className="block">OF NFTS</span>
    </h1>
    <div className="flex gap-4 mb-10 justify-center">
      <button
        className="bg-[#e6a06a] text-[#18151c] px-6 py-3 rounded-full font-normal text-lg hover:bg-[#e6a06a] transition"
        onClick={() => toast.info("Coming soon...")}
      >
        Get Started
      </button>
    </div>
    <div className="relative flex  items-center justify-center ">
      <div className="relative rounded-full overflow-hidden border-8 border-[#1f2326] shadow-2xl  flex items-center justify-center bg-[#1f2326] z-[30] translate-y-5 md:translate-y-0">
        <img
          src="https://cdnb.artstation.com/p/assets/images/images/067/463/045/smaller_square/almas-hafeez-50.jpg?1695412167"
          alt="NFT Monkey Hero"
          className="md:w-[520px] w-[350px] "
        />
      </div>
    </div>
    <section className="absolute bottom-20 w-full flex justify-center items-center bg-transparent  ">
      <svg
        className="absolute inset-0 w-full h-[400px] z-20"
        viewBox="0 0 1000 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="
              M0,0 
              L0,320 
              Q750,260 1000,320 
              L1000,0
              Q520,100 350,55
            
              Z
            "
          fill="#e6a06a"
        />
      </svg>
      {/* Stats content */}
      <div
        className={`relative flex justify-between items-center max-w-5xl mx-auto w-full px-10 py-8 translate-y-[240px] ${montserrat.className}`}
        style={{ zIndex: 30 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-7xl font-extrabold text-[#18151c]">
            10K+
          </span>
          <span className="text-[#18151c] font-semibold mt-1">RARE NFTS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-7xl font-extrabold text-[#18151c]">
            80K+
          </span>
          <span className="text-[#18151c] font-semibold mt-1">PRODUCTS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-7xl font-extrabold text-[#18151c]">
            12K+
          </span>
          <span className="text-[#18151c] font-semibold mt-1">NFT ARTIST</span>
        </div>
      </div>
    </section>
  </div>
);

// Add a new component for Popular NFTs section
const PopularNFTSection: React.FC = () => {
  const popularNFTs = trendingNFTs;

  // Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
  const [cardsToShow, setCardsToShow] = React.useState(1);
  const [page, setPage] = React.useState(0);

  // Like button state for each NFT card by ID
  const [likes, setLikes] = React.useState<Record<string, boolean>>({});

  // Toggle like handler
  const toggleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3);
      else if (window.innerWidth >= 768) setCardsToShow(2);
      else setCardsToShow(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(popularNFTs.length / cardsToShow);
  const startIdx = page * cardsToShow;
  const visibleNFTs = popularNFTs.slice(startIdx, startIdx + cardsToShow);

  // Drag/swipe logic
  const dragRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{ startX: number; dragging: boolean }>({
    startX: 0,
    dragging: false,
  });

  const onDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragState.current.dragging = true;
    dragState.current.startX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const onDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    const currentX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = currentX - dragState.current.startX;
    if (Math.abs(diff) > 60) {
      if (diff < 0 && page < totalPages - 1) setPage(page + 1);
      if (diff > 0 && page > 0) setPage(page - 1);
      dragState.current.dragging = false;
    }
  };

  const onDragEnd = () => {
    dragState.current.dragging = false;
  };

  return (
    <section
      id="trending-nfts"
      className="dark:bg-[#18151c] bg-[#f8fafc] py-20 px-4 select-none"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2
          className={`text-4xl md:text-5xl font-extrabold dark:text-white text-black uppercase text-center mb-4 mt-[100px] ${montserrat.className}`}
        >
          Popular NFT
        </h2>
        <p className="dark:text-gray-300 text-black text-center max-w-2xl mb-12">
          NFTs enable new forms of community engagement. Collect, display, and
          trade your NFTs through a social network that you own.
        </p>
        <div className="relative w-full flex justify-center items-center">
          {/* Left Arrow */}
          <button
            className="absolute left-0 z-10 bg-[#1f2326] hover:bg-[#2d2a36] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {/* Cards */}
          <div
            ref={dragRef}
            className="flex flex-col md:flex-row justify-center items-center gap-10 w-full cursor-grab"
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
            style={{ userSelect: "none" }}
          >
            {visibleNFTs.map((nft) => {
              return (
                <div
                  key={nft.id}
                  className="dark:bg-[#1f2326] shadow-xl bg-[#f8fafc] rounded-full flex flex-col items-center w-[340px] py-8 px-6 relative"
                >
                  <div className="w-64 h-64 rounded-full overflow-hidden border-8 dark:border-[#18151c] border-[#f8fafc] flex items-center justify-center mb-6">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="object-cover w-full h-full shadow-xls"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-4 w-full justify-center">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-10 h-10 rounded-full border-2 border-[#e6a06a]"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm dark:text-white text-black leading-tight truncate text-ellipsis max-w-[150px]">
                        {nft.name}
                      </span>
                      <span className="text-xs dark:text-gray-400 text-black">
                        {nft.creator}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      {/* Like button */}
                      <button
                        onClick={() => toggleLike(nft.id)}
                        aria-label={likes[nft.id] ? "Unlike" : "Like"}
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            likes[nft.id]
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      <span className="dark:text-gray-300 text-black text-sm">
                        {nft.likes}
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-6 mt-4 border-2 border-[#e6a06a] dark:bg-[#e6a06a] bg-[#e6a06a] dark:text-[#18151c] text-black font-normal py-3 rounded-full text-sm mb-6 hover:bg-[#e6a06a] transition"
                    onClick={() => toast.info("Coming soon...")}
                  >
                    Place a bid
                  </button>
                </div>
              );
            })}
          </div>
          {/* Right Arrow */}
          <button
            className="absolute right-0 z-10 bg-[#1f2326] hover:bg-[#2d2a36] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-8  mx-auto">
          {(() => {
            // Always show 3 dots
            if (totalPages <= 1) return null;
            let dotPages = [0, 1, 2];
            if (totalPages <= 3) {
              dotPages = Array.from({ length: totalPages }, (_, i) => i);
            } else if (page === 0) {
              dotPages = [0, 1, 2];
            } else if (page === totalPages - 1) {
              dotPages = [totalPages - 3, totalPages - 2, totalPages - 1];
            } else {
              dotPages = [page - 1, page, page + 1];
            }
            return dotPages.map((p, i) => (
              <button
                key={i}
                className={`rounded-full border-2 transition-all ${
                  (totalPages <= 3 && p === page) ||
                  (totalPages > 3 &&
                    ((page === 0 && i === 0) ||
                      (page === totalPages - 1 && i === 2) ||
                      (page !== 0 && page !== totalPages - 1 && i === 1)))
                    ? "bg-[#e6a06a] border-[#e6a06a]"
                    : "bg-transparent border-gray-500"
                } ${
                  (totalPages <= 3 && p === page) ||
                  (totalPages > 3 &&
                    ((page === 0 && i === 0) ||
                      (page === totalPages - 1 && i === 2) ||
                      (page !== 0 && page !== totalPages - 1 && i === 1)))
                    ? "w-8 h-3"
                    : "w-3 h-3"
                }`}
                onClick={() => setPage(p)}
                aria-label={`Go to page ${p + 1}`}
              />
            ));
          })()}
        </div>
      </div>
    </section>
  );
};

// Sample leaderboard data for the new design
const profileLeaderboard = [
  {
    name: "Jenny Wilson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    genesisKeys: 67,
    nftCollections: 857,
    itemsCollections: 257,
  },
  {
    name: "Devon Lane",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    genesisKeys: 57,
    nftCollections: 957,
    itemsCollections: 957,
  },
  {
    name: "Dianne Russell",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    genesisKeys: 67,
    nftCollections: 457,
    itemsCollections: 578,
  },
  {
    name: "Wade Warren",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    genesisKeys: 57,
    nftCollections: 257,
    itemsCollections: 573,
  },
  {
    name: "Eleanor Pena",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    genesisKeys: 37,
    nftCollections: 157,
    itemsCollections: 587,
  },
];

const ProfileLeaderboardSection: React.FC = () => (
  <section
    id="leaderboard"
    className="dark:bg-[#18151c] bg-[#f8fafc] py-20 px-4"
  >
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <h2
        className={`text-4xl md:text-5xl font-extrabold dark:text-white text-black uppercase text-center mb-4 tracking-wider md:mt-[50px] mt-[20px] ${montserrat.className}`}
      >
        NFT Profile Leader Board
      </h2>
      <p className="dark:text-gray-300 text-black text-center max-w-2xl mb-12">
        NFTs enable new forms of community engagement. Collect, display, and
        trade your NFTs through a social network that you own.
      </p>
      <div className="grid grid-cols-12 dark:text-[#e6a06a] text-black font-semibold uppercase text-xs md:text-sm px-8  rounded-[2.5rem] shadow-xl dark:bg-[#1f2326] bg-[#f8fafc] py-6 w-full">
        <div className="col-span-6 md:col-span-4">Profile</div>
        <div className="col-span-3 md:col-span-3">Genesis Keys</div>
        <div className="col-span-3 md:col-span-3">NFT Collections</div>
        <div className="hidden md:block col-span-2 md:col-span-2">
          Items Collections
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2 w-full">
        {profileLeaderboard.map((user, idx) => (
          <div
            key={user.name}
            className={`grid grid-cols-12 items-center px-8 py-4 rounded-[2.5rem] transition-all shadow-xl ${
              idx === 1
                ? "bg-[#e6a06a] text-[#18151c]"
                : "dark:bg-[#1f2326] bg-[#f8fafc] dark:text-white text-black"
            } ${idx !== 1 ? "hover:bg-[#1f2326]/80" : ""}`}
            style={{
              boxShadow: idx === 1 ? "0 4px 32px 0 #e6a06a33" : undefined,
            }}
          >
            {/* Profile */}
            <div className="col-span-6 md:col-span-4 flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
              />
              <span className="font-semibold text-xs md:text-lg">
                {user.name}
              </span>
            </div>
            {/* Genesis Keys */}
            <div className="col-span-3 md:col-span-3 flex items-center justify-center">
              <span
                className={`px-4 py-1 rounded-full flex items-center font-semibold text-xs md:text-base gap-2 ${
                  idx === 1
                    ? "dark:bg-[#1f2326] bg-[#f8fafc] dark:text-white text-black"
                    : "dark:bg-[#18151c] bg-[#f8fafc] dark:text-white text-black"
                }`}
              >
                <div className="hidden md:block">
                  <Key className="w-4 h-4" />
                </div>
                {user.genesisKeys}
              </span>
            </div>
            {/* NFT Collections */}
            <div className="col-span-2 text-center font-semibold text-xs md:text-lg">
              {user.nftCollections}
            </div>
            {/* Items Collections */}
            <div className="hidden md:block col-span-2 text-center font-semibold text-xs md:text-lg">
              {user.itemsCollections}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Sample artwork backgrounds for top artists
const artistArtworks = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
];

const TopArtistsCarousel: React.FC<{
  artists: Artist[];
  followed: string[];
  onFollow: (id: string) => void;
}> = ({ artists, followed, onFollow }) => {
  // Carousel logic
  const [cardsToShow, setCardsToShow] = React.useState(1);
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3);
      else if (window.innerWidth >= 768) setCardsToShow(2);
      else setCardsToShow(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const totalPages = Math.ceil(artists.length / cardsToShow);
  const startIdx = page * cardsToShow;
  const visibleArtists = artists.slice(startIdx, startIdx + cardsToShow);

  // Drag/swipe logic
  const dragRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{ startX: number; dragging: boolean }>({
    startX: 0,
    dragging: false,
  });
  const onDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragState.current.dragging = true;
    dragState.current.startX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };
  const onDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    const currentX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = currentX - dragState.current.startX;
    if (Math.abs(diff) > 60) {
      if (diff < 0 && page < totalPages - 1) setPage(page + 1);
      if (diff > 0 && page > 0) setPage(page - 1);
      dragState.current.dragging = false;
    }
  };
  const onDragEnd = () => {
    dragState.current.dragging = false;
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex justify-center items-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-10 bg-[#1f2326] hover:bg-[#2d2a36] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg disabled:opacity-40"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {/* Cards */}
        <div
          ref={dragRef}
          className="flex flex-col md:flex-row justify-center items-center gap-10 w-full cursor-grab"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          style={{ userSelect: "none" }}
        >
          {visibleArtists.map((artist, idx) => (
            <div
              key={artist.id}
              className="dark:bg-[#1f2326] bg-[#f8fafc] rounded-3xl flex flex-col items-center w-[320px] pb-8 shadow-xl relative overflow-hidden"
            >
              <div className="w-full h-40 rounded-t-3xl overflow-hidden relative rounded-b-3xl">
                <img
                  src={artistArtworks[(startIdx + idx) % artistArtworks.length]}
                  alt="artwork"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-14 flex flex-col items-center relative w-full px-4">
                <div className="absolute left-1/2 -top-[100px] transform -translate-x-1/2 z-30 w-20 h-20 rounded-full border-4 dark:border-[#1f2326] border-[#f8fafc] object-cover dark:bg-[#1f2326] bg-[#f8fafc] ">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full border-4 dark:border-[#1f2326] border-[#f8fafc] object-cover dark:bg-[#1f2326] bg-[#f8fafc] z-30"
                  />
                </div>
                <span className="font-bold dark:text-white text-black text-lg">
                  {artist.name}
                </span>
                <span className="text-xs dark:text-gray-400 text-black mb-4">
                  18.5k Art Work
                </span>
                <button
                  className={`${
                    followed.includes(artist.id)
                      ? "dark:bg-[#e6a06a] bg-[#e6a06a] dark:text-white text-black"
                      : "dark:bg-[#e6a06a] bg-[#e6a06a] dark:text-black text-black"
                  } font-normal py-3 rounded-full text-sm  w-full hover:bg-[#e6a06a] hover:text-white transition`}
                  onClick={() => onFollow(artist.id)}
                >
                  {followed.includes(artist.id) ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-0 z-10 bg-[#1f2326] hover:bg-[#2d2a36] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg disabled:opacity-40"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          aria-label="Next"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {(() => {
          // Always show 3 dots
          if (totalPages <= 1) return null;
          let dotPages = [0, 1, 2];
          if (totalPages <= 3) {
            dotPages = Array.from({ length: totalPages }, (_, i) => i);
          } else if (page === 0) {
            dotPages = [0, 1, 2];
          } else if (page === totalPages - 1) {
            dotPages = [totalPages - 3, totalPages - 2, totalPages - 1];
          } else {
            dotPages = [page - 1, page, page + 1];
          }
          return dotPages.map((p, i) => (
            <button
              key={i}
              className={`rounded-full border-2 transition-all ${
                (totalPages <= 3 && p === page) ||
                (totalPages > 3 &&
                  ((page === 0 && i === 0) ||
                    (page === totalPages - 1 && i === 2) ||
                    (page !== 0 && page !== totalPages - 1 && i === 1)))
                  ? "bg-[#e6a06a] border-[#e6a06a]"
                  : "bg-transparent border-gray-500"
              } ${
                (totalPages <= 3 && p === page) ||
                (totalPages > 3 &&
                  ((page === 0 && i === 0) ||
                    (page === totalPages - 1 && i === 2) ||
                    (page !== 0 && page !== totalPages - 1 && i === 1)))
                  ? "w-8 h-3"
                  : "w-3 h-3"
              }`}
              onClick={() => setPage(p)}
              aria-label={`Go to page ${p + 1}`}
            />
          ));
        })()}
      </div>
    </div>
  );
};

// Artists Section with Tabs
const ArtistsSection: React.FC<{
  artists: Artist[];
  followed: string[];
  onFollow: (id: string) => void;
  followingArtists: Artist[];
}> = ({ artists, followed, onFollow, followingArtists }) => {
  const [tab, setTab] = React.useState<"top" | "following">("top");
  return (
    <section id="artists" className="dark:bg-[#18151c] bg-[#f8fafc] py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2
          className={`text-4xl md:text-5xl font-extrabold dark:text-white text-black uppercase text-center mb-4 md:mt-[50px] mt-[20px]  ${montserrat.className}`}
        >
          Top Artist
        </h2>
        <p className="dark:text-gray-300 text-black text-center max-w-2xl mb-12">
          NFTs enable new forms of community engagement. Collect, display, and
          trade your NFTs through a social network that you own.
        </p>
        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold transition-colors  ${
              montserrat.className
            } ${
              tab === "top"
                ? "border-2 border-[#e6a06a] dark:bg-[#e6a06a] bg-[#e6a06a] dark:text-black text-black"
                : "dark:bg-gray-700 bg-[#f8fafc] dark:text-gray-300 text-black hover:bg-gray-600"
            }`}
            onClick={() => setTab("top")}
          >
            Top Artists
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
              tab === "following"
                ? "border-2 border-[#e6a06a] dark:bg-[#e6a06a] bg-[#e6a06a] dark:text-white text-black"
                : "dark:bg-gray-700 bg-[#f8fafc] dark:text-gray-300 text-black hover:bg-gray-600"
            }`}
            onClick={() => setTab("following")}
          >
            Following Artists
          </button>
        </div>
        {/* Tab Content */}
        {tab === "top" ? (
          <TopArtistsCarousel
            artists={artists}
            followed={followed}
            onFollow={onFollow}
          />
        ) : followingArtists.length > 0 ? (
          <TopArtistsCarousel
            artists={followingArtists}
            followed={followed}
            onFollow={onFollow}
          />
        ) : (
          <div className="col-span-full text-center dark:text-gray-400 text-black py-12">
            You are not following any artists yet.
          </div>
        )}
      </div>
    </section>
  );
};

// Main Page Component
const NFTMarketplacePage: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // On mount, check system preference/localStorage
  useEffect(() => {
    // INSERT_YOUR_CODE
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Update localStorage and html class
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  // Followed artists state
  const [followed, setFollowed] = useState<string[]>([]);

  // Follow/Unfollow handler
  const toggleFollow = (artistId: string) => {
    setFollowed((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  };

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth !important; }
        :root {
          --color-bg: #f8fafc;
          --color-bg-secondary: #f1f5f9;
          --color-text: #18151c;
          --color-card: #fff;
          --color-accent: #e6a06a;
        }
        html.dark {
          --color-bg: #18151c;
          --color-bg-secondary: #1f2326;
          --color-text: #fff;
          --color-card: #1f2326;
          --color-accent: #e6a06a;
        }
      `}</style>
      <div
        className={`min-h-screen font-sans ${poppins.className} ${theme} `}
        style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
      >
        <Header />

        <HeroSection />
        <PopularNFTSection />
        <ProfileLeaderboardSection />
        <ArtistsSection
          artists={leaderboardArtists}
          followed={followed}
          onFollow={toggleFollow}
          followingArtists={leaderboardArtists.filter((a) =>
            followed.includes(a.id)
          )}
        />

        {/* FOOTER SECTION */}
        <footer className="dark:bg-[#1f2326] bg-[#f8fafc]   shadow-xl dark:shadow-none">
          <div
            className="relative w-full"
            style={{ height: "60px", marginBottom: "-1px" }}
          >
            <svg
              className="absolute top-0 left-0 w-full h-full rotate-180 -translate-y-1/2"
              viewBox="0 0 1440 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 Q720,0 1440,60 L1440,0 L0,0 Z"
                fill={theme === "dark" ? "#1f2326" : "#f8fafc"}
              />
            </svg>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[#e6a06a] to-[#e6a06a] bg-clip-text text-transparent">
                    RARE
                  </span>
                </h3>
                <p className="dark:text-gray-400 text-black">
                  The premier destination for buying, selling, and discovering
                  extraordinary NFTs.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Marketplace</h4>
                <ul className="space-y-2 dark:text-gray-400 text-black">
                  <li>All NFTs</li>
                  <li>Art</li>
                  <li>Collectibles</li>
                  <li>Domain Names</li>
                  <li>Music</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 dark:text-gray-400 text-black">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Support</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 dark:text-gray-400 text-black">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                  <li>Help Center</li>
                </ul>
              </div>
            </div>
            <div className="border-t  mt-8 pt-8 text-center dark:border-gray-700 border-gray-200 text-black dark:text-gray-400">
              <p>© 2025 NFT Marketplace. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* CSS for modal animation */}
        <style jsx>{`
          html {
            scroll-behavior: smooth;
          }
          @keyframes modal-in {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-modal-in {
            animation: modal-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        `}</style>
      </div>
      <Toaster richColors />
    </>
  );
};

export default NFTMarketplacePage;
