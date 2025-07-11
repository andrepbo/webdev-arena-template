import {
  Calendar,
  Clock,
  Heart,
  Music,
  Star,
  TextSearch,
  User,
  X,
} from "lucide-react";
import { Notable, Rethink_Sans } from "next/font/google";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const notable = Notable({
  subsets: ["latin"],
  weight: ["400"],
});

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Utility functions
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
const formatTime = (timeString: string) => {
  const [hour, minute] = timeString.split(":").map(Number);
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? "AM" : "PM";
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

// Sample data
const sampleMusicians = [
  {
    id: 1,
    name: "Alex Guitar",
    instrument: "Guitar",
    genre: "Rock",
    description: "Alex is a skilled guitarist with a passion for rock music.",
    rating: 4.8,
    reviews: 12,
    contact: "alex@musicjam.com",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/66b3a5e9e7fb8bb367c6a064/John-Petrucci-of-Dream-Theater-performs-on-stage-at-High-Voltage-Festival-in-Victoria/960x0.jpg?height=474&width=711&fit=bounds",
  },
  {
    id: 2,
    name: "Jamie Drums",
    instrument: "Drums",
    genre: "Jazz",
    description: "Jamie is a talented drummer with a love for jazz music.",
    rating: 4.9,
    reviews: 15,
    contact: "jamie@musicjam.com",
    image:
      "https://t4.ftcdn.net/jpg/05/52/89/43/360_F_552894317_RsZaahbVAqVVRUHpsno4LDzWQSRJsVG1.jpg",
  },
  {
    id: 3,
    name: "Morgan Bass",
    instrument: "Bass",
    genre: "Funk",
    description: "Morgan is a skilled bassist with a passion for funk music.",
    rating: 4.7,
    reviews: 10,
    contact: "morgan@musicjam.com",
    image:
      "https://www.rollingstone.com/wp-content/uploads/2020/06/49-duff-mckagan.jpg?w=800",
  },
  {
    id: 4,
    name: "Taylor Keys",
    instrument: "Keyboard",
    genre: "Pop",
    description: "Taylor is a talented keyboardist with a love for pop music.",
    rating: 4.5,
    reviews: 8,
    contact: "taylor@musicjam.com",
    image:
      "https://c8.alamy.com/comp/W4NE40/portrait-of-a-male-musician-in-a-suit-playing-a-keyboard-isolated-on-white-background-W4NE40.jpg",
  },
  {
    id: 5,
    name: "Casey Sax",
    instrument: "Saxophone",
    genre: "Blues",
    description:
      "Casey is a skilled saxophonist with a passion for blues music.",
    rating: 4.6,
    reviews: 9,
    contact: "casey@musicjam.com",
    image:
      "https://www.saxwiththedj.com/wp-content/uploads/2020/03/DJ-met-saxofonist-Utrecht.jpg",
  },
  {
    id: 6,
    name: "Riley Trumpet",
    instrument: "Trumpet",
    genre: "Classical",
    description:
      "Riley is a talented trumpet player with a love for classical music.",
    rating: 4.9,
    reviews: 14,
    contact: "riley@musicjam.com",
    image:
      "https://t3.ftcdn.net/jpg/00/79/93/70/360_F_79937087_VbOUqVXvVxgQbk2wCGPhlkepVTLe4voP.jpg",
  },
];

const sampleSessions = [
  {
    id: 1,
    musicianId: 1,
    title: "Rock Jam Session",
    genre: "Rock",
    date: "2024-03-16",
    time: "19:00",
    location: "Downtown Music Studio",
    description: "Looking for musicians to jam some classic rock songs",
    skillLevel: "Intermediate",
    instrumentsNeeded: ["Guitar", "Drums", "Bass"],
    createdAt: "2024-03-10T10:30:00Z",
    likes: 5,
    likedByUser: false,
    attendees: [2, 3, 5],
    maxAttendees: 8,
    contact: "alex@musicjam.com",
  },
  {
    id: 2,
    musicianId: 2,
    title: "Jazz Night",
    genre: "Jazz",
    date: "2024-03-20",
    time: "20:00",
    location: "Jazz Cellar",
    description: "Improvisational jazz session",
    skillLevel: "Advanced",
    instrumentsNeeded: ["Saxophone", "Trumpet", "Piano"],
    createdAt: "2024-03-12T14:15:00Z",
    likes: 8,
    likedByUser: false,
    attendees: [4, 6],
    maxAttendees: 6,
    contact: "jamie@musicjam.com",
  },
  {
    id: 3,
    musicianId: 3,
    title: "Funk Session",
    genre: "Funk",
    date: "2024-03-18",
    time: "18:30",
    location: "Groove Central",
    description: "Funky grooves and improvisation",
    skillLevel: "All Levels",
    instrumentsNeeded: ["Guitar", "Bass", "Drums", "Keyboard"],
    createdAt: "2024-03-08T09:00:00Z",
    likes: 12,
    likedByUser: true,
    attendees: [1, 4],
    maxAttendees: 10,
    contact: "morgan@musicjam.com",
  },
  {
    id: 4,
    musicianId: 4,
    title: "Pop Covers Night",
    genre: "Pop",
    date: "2024-03-22",
    time: "21:00",
    location: "The Music Lounge",
    description: "Playing popular pop covers",
    skillLevel: "Beginner",
    instrumentsNeeded: ["Vocals", "Guitar", "Keyboard"],
    createdAt: "2024-03-14T16:45:00Z",
    likes: 3,
    likedByUser: false,
    attendees: [],
    maxAttendees: 5,
    contact: "taylor@musicjam.com",
  },
  {
    id: 5,
    musicianId: 5,
    title: "Blues For You",
    genre: "Blues",
    date: "2024-03-29",
    time: "19:00",
    location: "The Old Blues Club",
    description: "Blues blues blues and... more blues",
    skillLevel: "Intermediate",
    instrumentsNeeded: ["Vocals", "Guitar", "Saxophone"],
    createdAt: "2024-03-18T11:44:00Z",
    likes: 2,
    likedByUser: false,
    attendees: [],
    maxAttendees: 5,
    contact: "casey@musicjam.com",
  },
];

// Types
type Musician = {
  id: number;
  name: string;
  instrument: string;
  genre: string;
  description: string;
  rating: number;
  reviews: number;
  contact: string;
  image: string;
};

type JamSession = {
  id: number;
  musicianId: number;
  title: string;
  genre: string;
  date: string;
  time: string;
  location: string;
  description: string;
  skillLevel: string;
  instrumentsNeeded: string[];
  createdAt: string;
  likes: number;
  likedByUser: boolean;
  attendees: number[];
  maxAttendees: number;
  contact: string;
};

type SortOption = "date" | "popularity" | "newest";

const InstrumentsList = ({ instruments }: { instruments: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {instruments.map((instrument) => (
        <span
          key={instrument}
          className="flex items-center text-sm font-bold bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5"
        >
          {instrument.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

// Component for musician cards in the grid
const MusicianCard = ({
  musician,
  onSelect,
}: {
  musician: Musician;
  onSelect: (musician: Musician) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-[#6E1F3E] border border-[#6E1F3E] overflow-hidden transition-all duration-300
        ${isHovered ? "shadow-xl transform translate-y-[-4px]" : "shadow-sm"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(musician)}
    >
      <div className="relative">
        <img
          src={musician.image}
          alt={musician.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className="flex items-center bg-[#6E4555] rounded px-1.5 py-1 text-xs font-medium text-white border border-[#6E1F3E] shadow-sm">
            <Star className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
            <span>{musician.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm font-bold rounded bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5">
          <span>{musician.instrument.toUpperCase()}</span>
        </div>

        <h3 className="text-xl font-bold text-[#FFA100] mb-1">
          {musician.name}
        </h3>

        <p className="h-12">{musician.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex ">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 text-[#FFA100] ${
                  i < Math.floor(musician.rating) ? "fill-[#FFA100] " : ""
                }`}
              />
            ))}
          </div>
          <button
            className="flex items-center text-sm bg-[#FFA100] rounded-full px-3 py-1"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(musician);
            }}
          >
            <span className="text-[#6E1F3E] font-extrabold">VIEW PROFILE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for session cards in the grid
const SessionCard = ({
  session,
  musicians,
  onSelectSession,
  onToggleLike,
}: {
  session: JamSession;
  musicians: Musician[];
  onSelectSession: (session: JamSession) => void;
  onToggleLike: (sessionId: number, e?: React.MouseEvent) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const host =
    musicians.find((m) => m.id === session.musicianId) || musicians[0];

  return (
    <div
      className={`bg-[#6E1F3E] w-full overflow-hidden transition-all duration-300 h-full cursor-pointer
        ${isHovered ? "shadow-xl transform translate-y-[-4px]" : "shadow-sm"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectSession(session)}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex-1">
            <div className="flex items-center text-sm font-bold bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5">
              <Music className="w-3 h-3 mr-1.5" strokeWidth={4} />
              <span>{session.genre.toUpperCase()}</span>
            </div>
          </div>
          <button
            className={`p-1.5 rounded-full transition-all duration-200 ${
              session.likedByUser
                ? "text-red-500 "
                : "text-white hover:text-red-500"
            }`}
            onClick={(e) => onToggleLike(session.id, e)}
          >
            <Heart
              className={`w-4.5 h-4.5 ${
                session.likedByUser ? "fill-red-500" : ""
              }`}
            />
          </button>
        </div>
        <h3 className="text-xl font-bold text-[#FFA100] mb-2 line-clamp-1">
          {session.title}
        </h3>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-sm ">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(session.date)}</span>
            </div>
            <div className="flex items-center text-sm ">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTime(session.time)}</span>
            </div>
          </div>
        </div>

        <p className="h-14 text-sm mb-4 pb-4 line-clamp-2 border-b border-white">
          {session.description}
        </p>

        <div className="mb-4">
          <div className="flex items-center text-xs mb-1.5 ">
            <div className="flex items-center justify-center bg-[#FFA100] rounded-full w-6 h-6 mr-1.5">
              <User className="w-4 h-4 text-[#946A7B]" fill="#946A7B" />
            </div>
            <span className="italic">
              {session.attendees.length}/{session.maxAttendees} spots filled
            </span>
          </div>
          <div className="flex -space-x-2 mb-3">
            {session.attendees.length === 0 && (
              <div className="z-[1] w-7 h-7 "></div>
            )}
            {session.attendees.slice(0, 3).map((attendeeId) => {
              const attendee = musicians.find((m) => m.id === attendeeId);
              return (
                <div
                  key={attendeeId}
                  className="relative z-[1] w-7 h-7 rounded-full border border-[#FFA100]  overflow-hidden bg-gray-100 dark:bg-gray-700"
                >
                  {attendee && (
                    <img
                      src={attendee.image}
                      alt={attendee.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}
            {session.attendees.length > 3 && (
              <div className="z-[1] w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300">
                +{session.attendees.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-[#FFA100]">
              <img
                src={host.image}
                alt={host.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm italic">
              Hosted by <span className="font-extrabold">{host.name}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App
const MusicJamApp = () => {
  const [musicians] = useState<Musician[]>(sampleMusicians);
  const [sessions, setSessions] = useState<JamSession[]>(sampleSessions);
  const [selectedSession, setSelectedSession] = useState<JamSession | null>(
    null
  );
  const [selectedMusician, setSelectedMusician] = useState<Musician | null>(
    null
  );
  const [newSession, setNewSession] = useState<Partial<JamSession>>({
    title: "",
    genre: "",
    date: "",
    time: "",
    location: "",
    description: "",
    skillLevel: "All Levels",
    instrumentsNeeded: [],
    likes: 0,
    likedByUser: false,
    attendees: [],
    maxAttendees: 5,
  });
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchInstrument, setSearchInstrument] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date");
  const [currentUserId] = useState<number | undefined>(1);
  const [activeTab, setActiveTab] = useState<"sessions" | "musicians">(
    "sessions"
  );

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Filter sessions based on search criteria
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      !searchQuery ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = !searchGenre || session.genre === searchGenre;

    const matchesInstrument =
      !searchInstrument ||
      session.instrumentsNeeded.some((instr) =>
        instr.toLowerCase().includes(searchInstrument.toLowerCase())
      );

    return matchesSearch && matchesGenre && matchesInstrument;
  });

  // Sort sessions based on selected option
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    switch (sortOption) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popularity":
        return b.likes - a.likes;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const handleCreateSession = () => {
    if (
      !newSession.title ||
      !newSession.genre ||
      !newSession.date ||
      !newSession.time ||
      !newSession.location
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const createdSession: JamSession = {
        id: sessions.length + 1,
        musicianId: currentUserId || 1,
        title: newSession.title!,
        genre: newSession.genre!,
        date: newSession.date!,
        time: newSession.time!,
        location: newSession.location!,
        description: newSession.description || "",
        skillLevel: newSession.skillLevel!,
        instrumentsNeeded: newSession.instrumentsNeeded || [],
        createdAt: new Date().toISOString(),
        likes: 0,
        likedByUser: false,
        attendees: [],
        maxAttendees: newSession.maxAttendees || 5,
        contact: currentUserId
          ? `user${currentUserId}@musicjam.com`
          : "guest@musicjam.com",
      };

      setSessions([createdSession, ...sessions]);
      setNewSession({
        title: "",
        genre: "",
        date: "",
        time: "",
        location: "",
        description: "",
        skillLevel: "All Levels",
        instrumentsNeeded: [],
        likes: 0,
        likedByUser: false,
        attendees: [],
        maxAttendees: 5,
      });
      setIsCreatingSession(false);
      setIsLoading(false);
      scrollToTop();
    }, 800);
  };

  const handleCancelCreateSession = () => {
    setNewSession({
      title: "",
      genre: "",
      date: "",
      time: "",
      location: "",
      description: "",
      skillLevel: "All Levels",
      instrumentsNeeded: [],
      likes: 0,
      likedByUser: false,
      attendees: [],
      maxAttendees: 5,
    });
    setIsCreatingSession(false);
  };

  const handleAddInstrument = (instrument: string) => {
    if (instrument && !newSession.instrumentsNeeded?.includes(instrument)) {
      setNewSession({
        ...newSession,
        instrumentsNeeded: [
          ...(newSession.instrumentsNeeded || []),
          instrument,
        ],
      });
    }
  };

  const handleRemoveInstrument = (instrument: string) => {
    setNewSession({
      ...newSession,
      instrumentsNeeded: newSession.instrumentsNeeded?.filter(
        (i) => i !== instrument
      ),
    });
  };

  const handleLikeSession = (sessionId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const updatedSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        const newLikedState = !session.likedByUser;
        return {
          ...session,
          likes: newLikedState ? session.likes + 1 : session.likes - 1,
          likedByUser: newLikedState,
        };
      }
      return session;
    });

    setSessions(updatedSessions);

    if (selectedSession && selectedSession.id === sessionId) {
      const updatedSession = updatedSessions.find((s) => s.id === sessionId);
      if (updatedSession) {
        setSelectedSession(updatedSession);
      }
    }
  };

  const handleAttendSession = (sessionId: number) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === sessionId && currentUserId) {
        const isAlreadyAttending = session.attendees.includes(currentUserId);

        return {
          ...session,
          attendees: isAlreadyAttending
            ? session.attendees.filter((id) => id !== currentUserId)
            : [...session.attendees, currentUserId],
        };
      }
      return session;
    });

    setSessions(updatedSessions);

    if (selectedSession && selectedSession.id === sessionId) {
      const updatedSession = updatedSessions.find((s) => s.id === sessionId);
      if (updatedSession) {
        setSelectedSession(updatedSession);
      }
    }
  };

  const handleCloseSessionModal = () => {
    const updatedSessions = sessions.map((session) => {
      if (selectedSession && session.id === selectedSession.id) {
        return selectedSession;
      }
      return session;
    });
    setSessions(updatedSessions);
    setSelectedSession(null);
  };

  const handleCloseMusicianModal = () => {
    setSelectedMusician(null);
  };

  const handleGenreSelect = (genre: string) => {
    setSearchGenre(genre);
  };

  const instrumentList = [
    "Guitar",
    "Drums",
    "Bass",
    "Keyboard",
    "Vocals",
    "Saxophone",
    "Trumpet",
    "Violin",
    "Cello",
  ];

  return (
    <div
      className={`min-h-screen bg-[#6E4555] text-white ${rethinkSans.className}`}
    >
      {/* Navigation Bar */}
      <nav className="bg-[#6E1F3E] backdrop-blur-md shadow-md sticky top-0 z-50 ">
        <div className="container mx-auto px-1 sm:px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="flex items-center space-x-2"
                onClick={() => {
                  setActiveTab("sessions");
                  scrollToTop();
                }}
              >
                <img
                  src="https://www.m2onhold.com.au/wp-content/uploads/2018/09/STM-Acoustic.png"
                  alt="Logo"
                  className="w-12 h-12"
                />
                <div className={`text-xl font-bold ${notable.className}`}>
                  MUSIC<span className="text-[#FFA100]">JAM</span>
                </div>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {currentUserId && (
                <div
                  className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => toast.info("This feature is coming soon!")}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4">
        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="flex gap-6 border-b border-[#FFA100]">
            <button
              className={`pb-1 pt-1 text-sm font-medium transition-colors relative border-b-[6px] ${
                activeTab === "sessions"
                  ? "text-[#FFA100] border-[#FFA100]"
                  : "text-white border-[#6E4555]"
              }`}
              onClick={() => {
                setActiveTab("sessions");
                scrollToTop();
              }}
            >
              JAM SESSIONS
            </button>

            <button
              className={`pb-1 pt-1 text-sm font-medium transition-colors relative border-b-[6px] ${
                activeTab === "musicians"
                  ? "text-[#FFA100] border-[#FFA100]"
                  : "text-white border-[#6E4555]"
              }`}
              onClick={() => {
                setActiveTab("musicians");
                scrollToTop();
              }}
            >
              MUSICIANS
            </button>
          </div>
        </div>

        {activeTab === "sessions" && (
          <>
            {/* Hero Section */}
            <section className="mb-8">
              <div
                className="text-white p-2 md:p-8 shadow-lg relative overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://pappagallos.com/wp-content/uploads/CurrentEventsBG.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500 rounded-full translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="relative z-10 max-w-2xl">
                  <h2
                    className={`text-2xl md:text-3xl font-bold  ${notable.className}`}
                  >
                    Connect with
                  </h2>
                  <h2
                    className={`text-2xl md:text-3xl font-bold mb-3 ${notable.className}`}
                  >
                    Local Musicians
                  </h2>
                  <p className="opacity-90 mb-4 max-w-[450px]">
                    Find and join jam sessions in your area. Whether you&apos;re
                    a beginner or professional, MusicJam helps you connect with
                    other musicians and create amazing music together.
                  </p>
                  <button
                    className="px-6 py-1 bg-[#FFA100] text-[#6E1F3E] text-sm rounded-full font-medium"
                    onClick={() => setIsCreatingSession(true)}
                  >
                    HOST A SESSION
                  </button>
                </div>
              </div>
            </section>

            {/* Search & Filter Section */}
            <section className="mb-4 border-b pb-4 border-[#FFA100]">
              <div className="bg-[#6E1F3E] p-4 md:p-5 ">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <TextSearch
                      size={20}
                      className="absolute top-3 left-3 text-[#FFA100]"
                    />
                    <input
                      type="text"
                      placeholder="Search sessions..."
                      className="w-full pl-10 px-4 py-2.5 text-sm lg:text-base  bg-[#6E4555] border border-[#FFA100] text-white focus:bg-[#500C27] focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex  flex-col sm:flex-row  gap-2">
                    <div className="relative flex-1">
                      <Music
                        size={20}
                        className="absolute top-3 left-3 text-[#FFA100]"
                        strokeWidth={2}
                      />
                      <select
                        className="w-full min-w-[175px] lg:min-w-[250px] lg:h-[46px] pl-10 px-3 py-2.5 text-sm lg:text-base bg-[#6E4555] focus:bg-[#500C27] focus:outline-none border  border-[#FFA100] text-white "
                        value={searchGenre}
                        onChange={(e) => handleGenreSelect(e.target.value)}
                      >
                        <option value="">All Genres</option>
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Funk">Funk</option>
                        <option value="Pop">Pop</option>
                        <option value="Blues">Blues</option>
                        <option value="Classical">Classical</option>
                      </select>
                    </div>

                    <div className="relative flex-1">
                      <img
                        src="https://www.m2onhold.com.au/wp-content/uploads/2018/09/STM-Acoustic.png"
                        alt="Instrument"
                        className="absolute top-2 left-2 w-8 h-8 cover"
                      />
                      <select
                        className="w-full min-w-[175px] lg:min-w-[250px] lg:h-[46px] pl-10 px-3 py-2.5 text-sm lg:text-base bg-[#6E4555] focus:bg-[#500C27] focus:outline-none border  border-[#FFA100] text-white "
                        value={searchInstrument}
                        onChange={(e) => setSearchInstrument(e.target.value)}
                      >
                        <option value="">Any Instrument</option>
                        {instrumentList.map((instrument) => (
                          <option key={instrument} value={instrument}>
                            {instrument}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sorting Controls */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className={`text-lg font-bold ${notable.className}`}>
                UPCOMING SESSIONS
              </h2>
              <select
                className="px-3 py-1.5 border bg-[#6E4555] border-white  focus:outline-none text-sm text-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
              >
                <option value="date">Sort by Date</option>
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Featured Sessions Carousel */}
            {sortedSessions.length === 0 ? (
              <section className="mb-8">
                <div className=" p-6 text-center">
                  <p className="">
                    Try adjusting your search criteria to find more sessions.
                  </p>
                </div>
              </section>
            ) : (
              <section className="mb-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sortedSessions.slice(0, 5).map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      musicians={musicians}
                      onSelectSession={setSelectedSession}
                      onToggleLike={handleLikeSession}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Sessions Grid */}
            <section>
              <h2 className={`text-lg font-bold mb-4 ${notable.className}`}>
                All Sessions
              </h2>
              {sortedSessions.length === 0 ? (
                <div className="text-center py-12 bg-white/90 dark:bg-gray-800/90 rounded-xl">
                  <div className="text-4xl mb-4">?</div>
                  <h3 className="text-xl font-bold mb-2">
                    No jam sessions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search or create your own session
                  </p>
                  <button
                    className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                    onClick={() => setIsCreatingSession(true)}
                  >
                    Create Session
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sortedSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      musicians={musicians}
                      onSelectSession={setSelectedSession}
                      onToggleLike={handleLikeSession}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Create Session Modal */}
            {isCreatingSession && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-[#6E1F3E]  w-full max-w-md p-4 sm:p-6 shadow-xl relative animate-fadeIn">
                  <button
                    className="absolute top-4 right-4 text-WHITE"
                    onClick={handleCancelCreateSession}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Create a New Jam Session
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title*
                      </label>
                      <input
                        type="text"
                        placeholder="Session title"
                        className="w-full px-3 py-2  bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none "
                        value={newSession.title}
                        onChange={(e) =>
                          setNewSession({
                            ...newSession,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Genre*
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                        value={newSession.genre}
                        onChange={(e) =>
                          setNewSession({
                            ...newSession,
                            genre: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Genre</option>
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Funk">Funk</option>
                        <option value="Pop">Pop</option>
                        <option value="Blues">Blues</option>
                        <option value="Classical">Classical</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Date*
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                          value={newSession.date}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Time*
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                          value={newSession.time}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Location*
                      </label>
                      <input
                        type="text"
                        placeholder="Venue or location"
                        className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                        value={newSession.location}
                        onChange={(e) =>
                          setNewSession({
                            ...newSession,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        placeholder="Tell us about your session..."
                        className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                        rows={3}
                        value={newSession.description}
                        onChange={(e) =>
                          setNewSession({
                            ...newSession,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Skill Level
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                        value={newSession.skillLevel}
                        onChange={(e) =>
                          setNewSession({
                            ...newSession,
                            skillLevel: e.target.value,
                          })
                        }
                      >
                        <option value="All Levels">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Instruments Needed
                      </label>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {newSession.instrumentsNeeded?.map((instrument) => (
                          <div
                            key={instrument}
                            className="flex items-center bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none px-2 py-1 rounded-full text-xs"
                          >
                            {instrument}
                            <button
                              className="ml-1 text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                              onClick={() => handleRemoveInstrument(instrument)}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <select
                        className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                        onChange={(e) => handleAddInstrument(e.target.value)}
                        value=""
                      >
                        <option value="">Add Instrument</option>
                        {instrumentList.map((instrument) => (
                          <option key={instrument} value={instrument}>
                            {instrument}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Max Attendees
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 bg-[#6E4555] border border-[#FFA100] focus:bg-[#500C27] focus:outline-none"
                        value={newSession.maxAttendees}
                        onChange={(e) =>
                          setNewSession({
                            ...newSession,
                            maxAttendees: parseInt(e.target.value) || 5,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      onClick={handleCancelCreateSession}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-5 py-2 bg-[#FFA100] text-black rounded-full  disabled:opacity-50 font-bold"
                      onClick={handleCreateSession}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        "Create Session"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "musicians" && (
          <section>
            <div className="mb-4 flex justify-between items-center">
              <h2 className={`text-lg font-bold ${notable.className}`}>
                LOCAL MUSICIANS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {musicians.map((musician) => (
                <MusicianCard
                  key={musician.id}
                  musician={musician}
                  onSelect={setSelectedMusician}
                />
              ))}
            </div>
          </section>
        )}

        {/* Session Detail Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#6E1F3E] w-full max-w-lg p-6 shadow-xl relative animate-fadeIn overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-2 right-2 text-white"
                onClick={handleCloseSessionModal}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-sm font-bold bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5">
                    <Music className="w-3 h-3 mr-1.5" strokeWidth={4} />
                    <span>{selectedSession.genre.toUpperCase()}</span>
                  </div>
                  <span className="flex items-center text-sm font-bold bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5">
                    {selectedSession.skillLevel.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-0 text-[#FFA100]">
                      {selectedSession.title}
                    </h2>
                    <p className="text-sm italic">
                      Hosted by{" "}
                      <span className="font-extrabold">
                        {
                          musicians.find(
                            (m) => m.id === selectedSession.musicianId
                          )?.name
                        }
                      </span>
                    </p>
                  </div>
                  <button
                    className={`flex item justify-end p-2 transition-all duration-200  ${
                      selectedSession.likedByUser
                        ? "text-red-500 "
                        : "text-white hover:text-red-500"
                    }`}
                    onClick={() => handleLikeSession(selectedSession.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        selectedSession.likedByUser ? "fill-red-500" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold mb-1">Session Details</h3>
                <div className="grid grid-cols-2 gap-3 text-gray-300">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 " />
                    <span>{formatDate(selectedSession.date)}</span>
                  </div>
                  <div className="flex items-center text-sm ">
                    <Clock className="w-4 h-4 mr-2 " />
                    <span>{formatTime(selectedSession.time)}</span>
                  </div>
                  <div className="flex items-center text-sm  col-span-2">
                    <Music className="w-4 h-4 mr-2 " />
                    <span>{selectedSession.location}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="text-sm text-gray-300">
                  {selectedSession.description || "No description provided"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-1">Instruments Needed</h3>
                <InstrumentsList
                  instruments={selectedSession.instrumentsNeeded}
                />
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-1">
                  Attendees ({selectedSession.attendees.length}/
                  {selectedSession.maxAttendees})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.attendees.map((attendeeId) => {
                    const attendee = musicians.find((m) => m.id === attendeeId);
                    return (
                      <div
                        key={attendeeId}
                        className="flex items-center bg-[#500C27] px-2 py-1 rounded-full text-xs"
                      >
                        <div className="w-5 h-5 rounded-full overflow-hidden mr-1.5">
                          <img
                            src={attendee?.image}
                            alt={attendee?.name || `User${attendeeId}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {attendee?.name || `User${attendeeId}`}
                      </div>
                    );
                  })}
                  {selectedSession.attendees.length === 0 && (
                    <p className="text-sm text-gray-300">No attendees yet</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Host Details</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={
                        musicians.find(
                          (m) => m.id === selectedSession.musicianId
                        )?.image
                      }
                      alt={
                        musicians.find(
                          (m) => m.id === selectedSession.musicianId
                        )?.name || `Host${selectedSession.musicianId}`
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      {
                        musicians.find(
                          (m) => m.id === selectedSession.musicianId
                        )?.name
                      }
                    </p>
                    <p className="text-xs text-gray-300">
                      {
                        musicians.find(
                          (m) => m.id === selectedSession.musicianId
                        )?.instrument
                      }{" "}
                      -{" "}
                      {
                        musicians.find(
                          (m) => m.id === selectedSession.musicianId
                        )?.genre
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                {currentUserId &&
                  !selectedSession.attendees.includes(currentUserId) &&
                  selectedSession.attendees.length <
                    selectedSession.maxAttendees && (
                    <button
                      className="px-5 py-2 bg-[#FFA100] text-black rounded-full mr-2"
                      onClick={() => handleAttendSession(selectedSession.id)}
                    >
                      Join Session
                    </button>
                  )}
                {currentUserId &&
                  selectedSession.attendees.includes(currentUserId) && (
                    <button
                      className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors mr-2"
                      onClick={() => handleAttendSession(selectedSession.id)}
                    >
                      Leave Session
                    </button>
                  )}
                <button
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  onClick={handleCloseSessionModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Musician Profile Modal */}
        {selectedMusician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#6E1F3E] w-full max-w-md shadow-xl relative animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-white bg-gray-400 rounded-full "
                onClick={handleCloseMusicianModal}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-fyll  overflow-hidden mx-auto mb-4 ">
                  <img
                    src={selectedMusician.image}
                    alt={selectedMusician.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-6">
                  <h2 className="text-2xl font-bold mb-1 text-[#FFA100]">
                    {selectedMusician.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center text-sm rounded mfont-bold bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5">
                      {selectedMusician.instrument.toUpperCase()}
                    </div>
                    <div className="flex items-center text-sm rounded mfont-bold bg-[#FFE4B5] text-[#500C27] border border-[#FFA100] w-fit px-2 py-0.5 mb-1.5">
                      <Music className="w-3 h-3 mr-1.5" strokeWidth={4} />
                      <span>{selectedMusician.genre.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center mb-4">
                    <div className="flex ">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 text-[#FFA100] ${
                            i < Math.floor(selectedMusician.rating)
                              ? " fill-[#FFA100]"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6 px-6 ">
                  <h3 className={`font-semibold mb-3 ${notable.className}`}>
                    Upcoming Sessions
                  </h3>
                  {sessions.filter(
                    (session) => session.musicianId === selectedMusician.id
                  ).length > 0 ? (
                    <div className="space-y-3">
                      {sessions
                        .filter(
                          (session) =>
                            session.musicianId === selectedMusician.id
                        )
                        .map((session) => (
                          <div
                            key={session.id}
                            className="bg-[#500C27] p-3 cursor-pointer border border-[#FFA100] "
                            onClick={() => {
                              setSelectedSession(session);
                              setSelectedMusician(null);
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-left">
                                  {session.title}
                                </h4>
                                <p className="text-xs text-gray-400">
                                  {formatDate(session.date)} at{" "}
                                  {formatTime(session.time)}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Heart className="w-5 h-5 mr-1 text-red-500 fill-red-500" />
                                <span className="text-sm">{session.likes}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No upcoming sessions
                    </p>
                  )}
                </div>

                <div className="mb-6 px-6">
                  <h3 className={`font-semibold mb-3 ${notable.className}`}>
                    Reviews
                  </h3>
                  {[...Array(Math.min(selectedMusician.reviews, 3))].map(
                    (_, i) => (
                      <div key={i} className="flex items-center mb-6">
                        <div className="w-11 h-8 rounded-full overflow-hidden mr-3">
                          <img
                            src={`https://randomuser.me/api/portraits/men/${
                              i + 1
                            }.jpg`}
                            alt={`Reviewer${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star < Math.floor(selectedMusician.rating)
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-left text-sm text-gray-300 mt-1">
                            Great musician to jam with! Very open to new ideas
                            and has excellent timing.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    className="px-5 py-2 bg-[#FFA100] font-bold text-black rounded-full "
                    onClick={() =>
                      window.open(
                        `mailto:${selectedMusician.contact}`,
                        "_blank"
                      )
                    }
                  >
                    Contact {selectedMusician.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .dark {
          color-scheme: dark;
        }

        body {
          transition: background-color 0.3s, color 0.3s;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <Toaster richColors />
    </div>
  );
};

export default MusicJamApp;
