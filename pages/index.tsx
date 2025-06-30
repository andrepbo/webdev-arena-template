import React, { useState, useEffect, useRef } from "react";
import { Nunito } from "next/font/google";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Search,
  ShoppingCart,
  Heart,
  Bell,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Eye,
  BookOpen,
  MessageCircle,
  Send,
  Sparkles,
  User,
  Play,
  Ticket,
  Star,
} from "lucide-react";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

type BookCardProps = {
  name: string;
  author: string;
  price: number;
  image: string;
  onClick?: () => void;
};

const BookCard = ({ name, author, image, price, onClick }: BookCardProps) => {
  return (
    <div className="relative group cursor-pointer p-2" onClick={onClick}>
      <div className="flex gap-4 flex-col justify-between transform hover:scale-105 transition-all duration-300 hover:z-10 relative">
        <div className="flex-1 flex">
          <div className="w-36 h-52 rounded-lg shadow-md overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-md mb-1 text-[#7e655c]">{name}</h3>
          <p className="text-sm text-red-600 font-bold">{author}</p>
          <p className="text-lg font-bold text-green-600">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

type CategoryIconProps = {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  isFirst?: boolean;
  onClick?: () => void;
};

const CategoryIcon = ({
  children,
  label,
  active = false,
  isFirst = false,
  onClick,
}: CategoryIconProps) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
        active ? "bg-blue-50 border-2 border-blue-200" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-2">
        {children}
      </div>
      <span
        className={`text-sm font-medium ${
          isFirst ? "text-gray-800" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

type TopListItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

const TopListItem = ({ icon, title, subtitle }: TopListItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

type ChatInterfaceProps = {
  setIsChatVisible: (visible: boolean) => void;
};

const ChatInterface = ({ setIsChatVisible }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to our bookstore. How can I help you today?",
      sender: "bot",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "I'm looking for gift editions of the Harry Potter books. Do you have them?",
      sender: "user",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "We have 3 popular gift editions of the Harry Potter books. Which one would you like?",
      sender: "bot",
      timestamp: "10:33 AM",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setMessage("");

      // Simulate bot response after 1 second
      setTimeout(() => {
        const botResponses = [
          "That's a great choice! Let me check our inventory for you.",
          "I can help you with that. Would you like me to add it to your cart?",
          "Excellent! Is there anything else I can help you find?",
          "Perfect! I'll get that sorted for you right away.",
          "Great question! Let me provide you with more details about that.",
        ];

        const randomResponse =
          botResponses[Math.floor(Math.random() * botResponses.length)];

        const botMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="bg-[#efe5da] p-2 h-full flex flex-col text-[#7e655c]">
      {/* Fixed Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-bold px-3 py-6">Chat</h3>
        <button
          className="lg:hidden p-2 text-[#7e655c] hover:bg-[#dfd3c5] rounded-full"
          onClick={() => setIsChatVisible(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Fixed Privacy and Support Section */}
      <div className="flex-shrink-0">
        <div className="bg-[#dfd3c5] p-2 rounded-t-3xl">
          <div className="bg-[#efe5da] rounded-2xl p-4 flex justify-between">
            <div>
              <p className="text-sm font-bold">Privacy and Support</p>
              <p className="text-xs">Get Immediate Support</p>
            </div>
            <button className="rounded-full w-9 h-9 justify-center bg-white text-xs flex items-center gap-1">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-[#dfd3c5] h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } items-start gap-2`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 bg-[#8E82B7] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] ${
                    msg.sender === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-3 ${
                      msg.sender === "user"
                        ? "bg-[#8E82B7] text-white"
                        : "bg-[#efe5da] text-[#7e655c]"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {msg.timestamp}
                  </p>
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 order-3">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="bg-[#dfd3c5] p-2 rounded-b-3xl flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 bg-gradient-to-r from-[#ED5F64] to-[#F47071] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

type LeftSidebarProps = {
  onUserClick: () => void;
  onSubscribeClick: () => void;
};

const LeftSidebar = ({ onUserClick, onSubscribeClick }: LeftSidebarProps) => {
  return (
    <div className="h-full flex flex-col items-center py-6 bg-[#e9dfd5] md:w-20 w-12">
      {/* User Profile */}
      <div className="mb-8">
        <div
          className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          onClick={onUserClick}
        >
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Menu Icons */}
      <div className="flex flex-col gap-6 flex-1 justify-center">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#faf2e9] rounded-full flex items-center justify-center cursor-pointer">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
        </div>

        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#faf2e9] rounded-full flex items-center justify-center cursor-pointer">
          <Star className="w-5 h-5 text-[#cabbac] fill-[#e9dfd3]" />
        </div>

        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#faf2e9] rounded-full flex items-center justify-center cursor-pointer">
          <Heart className="w-5 h-5 text-[#cabbac] fill-[#e9dfd3]" />
        </div>

        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#faf2e9] rounded-full flex items-center justify-center cursor-pointer">
          <Play className="w-5 h-5 text-[#cabbac] fill-[#e9dfd3]" />
        </div>

        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#faf2e9] rounded-full flex items-center justify-center cursor-pointer">
          <Ticket className="w-5 h-5 text-[#cabbac] fill-[#e9dfd3]" />
        </div>
      </div>

      {/* Subscribe Button */}
      <div className="mt-auto">
        <div
          className="bg-gradient-to-b from-[#6787A5] to-[#527290] text-white flex flex-col items-center h-32 py-2 rounded-full justify-bettwen cursor-pointer"
          onClick={onSubscribeClick}
        >
          <div className="bg-[#314f6a] p-2 rounded-full">
            <Bell className="text-[#f8c983] fill-[#f8c983] size-4 md:size-6" />
          </div>
          <div className="text-xs px-2 py-1 rounded-full transform -rotate-90 font-bold origin-center whitespace-nowrap flex flex-1 flex justify-center w-10 md:w-12 items-center">
            subscribe
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddToCartBook {
  name: string;
  author: string;
  image: string;
  category: string;
  price: number;
  quantity?: number;
}

const App = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [showBookDetailsModal, setShowBookDetailsModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  type Book = {
    name: string;
    author: string;
    price: number;
    image: string;
    category: string;
    quantity?: number;
  };

  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const categories = [
    { icon: <BookOpen className="w-6 h-6 text-blue-500" />, label: "All" },
    { icon: <BookOpen className="w-6 h-6 text-purple-500" />, label: "eBooks" },
    { icon: <Sparkles className="w-6 h-6 text-green-500" />, label: "New" },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      label: "Bestsellers",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-orange-500" />,
      label: "AudioBooks",
    },
    { icon: <BookOpen className="w-6 h-6 text-red-500" />, label: "Fiction" },
    { icon: <Heart className="w-6 h-6 text-pink-500" />, label: "Romance" },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      label: "Fantasy",
    },
    { icon: <BookOpen className="w-6 h-6 text-indigo-500" />, label: "Manga" },
    { icon: <BookOpen className="w-6 h-6 text-gray-500" />, label: "Crime" },
  ];

  // Generate books for each category

  const generateBooksForCategory = (categoryLabel: string) => {
    const bookData: Record<
      string,
      Array<{
        name: string;
        category: string;
        image: string;
        author: string;
        price: number;
      }>
    > = {
      eBooks: [
        {
          name: "Digital Revolution",
          category: "eBooks",
          image:
            "https://marketplace.canva.com/EAGGaQ-X5KU/2/0/1003w/canva-capa-de-livro-crist%C3%A3o-simples-azul-creme-e-preto-uovFwmiNY9Y.jpg",
          author: "John Doe",
          price: 29.9,
        },
        {
          name: "Code Warriors",
          category: "eBooks",
          image:
            "https://marketplace.canva.com/EAE4oJOnMh0/2/0/1003w/canva-capa-de-livro-de-suspense-pKsZq7ReKt4.jpg",
          author: "Jane Smith",
          price: 24.9,
        },
        {
          name: "Virtual Reality",
          category: "eBooks",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVOEyuUt0Vh3xMpiaxAGViE8hXDWXEGq9XA&s",
          author: "Alex Johnson",
          price: 34.9,
        },
        {
          name: "Cyber Dreams",
          category: "eBooks",
          image:
            "https://images.tcdn.com.br/img/img_prod/1272692/lv_e_assim_que_acaba_capa_dura_ed_colecionador_1819_1_e9b28ec32791cc5e9287d142b8065393.jpg",
          author: "Sarah Wilson",
          price: 39.9,
        },
        {
          name: "Tech Tales",
          category: "eBooks",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3j8loTJplZloqP8VWhpt3aDTPZjbJUaJAUQ&s",
          author: "Mike Brown",
          price: 27.9,
        },
      ],
      New: [
        {
          name: "Fresh Beginnings",
          category: "New",
          image: "https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg",
          author: "Emma Davis",
          price: 32.9,
        },
        {
          name: "Modern Tales",
          category: "New",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMU7Yc20qlxPOjHuDs6isxyBvb-Cja4qaHqw&s",
          author: "Ryan Clark",
          price: 28.9,
        },
        {
          name: "New Horizons",
          category: "New",
          image:
            "https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg",
          author: "Lisa White",
          price: 35.9,
        },
        {
          name: "Current Affairs",
          category: "New",
          image:
            "https://edit.org/img/blog/zz7-flyer-personalizavel-para-capas-de-livros.webp",
          author: "David Miller",
          price: 31.9,
        },
        {
          name: "Today's Stories",
          category: "New",
          image:
            "https://marketplace.canva.com/EAD0UPCkitY/1/0/1024w/canva-capa-de-livro-de-suspense-monocrom%C3%A1tica-com-foto-de-floresta-U1dpnJ3bwKw.jpg",
          author: "Amy Taylor",
          price: 33.9,
        },
      ],
      Bestsellers: [
        {
          name: "Bestseller One",
          category: "Bestsellers",
          image:
            "https://www.designcomcafe.com.br/wp-content/uploads/2017/08/capas-de-livros-wolf-wilder.jpg",
          author: "Robert Garcia",
          price: 45.9,
        },
        {
          name: "Top Hit",
          category: "Bestsellers",
          image:
            "https://editoraviseu.com/wp-content/uploads/2022/08/esta-chovendo-estrlas-capa-de-livro-editora-viseu.webp",
          author: "Michelle Lee",
          price: 42.9,
        },
        {
          name: "Popular Choice",
          category: "Bestsellers",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IY7qAmG0cKaot673DeAxUtzhNoyebDv7jw&s",
          author: "Kevin Anderson",
          price: 39.9,
        },
        {
          name: "Crowd Favorite",
          category: "Bestsellers",
          image:
            "https://f.i.uol.com.br/fotografia/2023/08/04/169117238764cd3e238fbf1_1691172387_3x2_md.jpg",
          author: "Jennifer Moore",
          price: 47.9,
        },
        {
          name: "Must Read",
          category: "Bestsellers",
          image:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5ficLXnARSCOqj3_q1R3K6boTuRRhQqWJTO8CXJX_SCbdfxno3crd2JpXzatrhtbO8jC9BYiUzLnoitvaGcfNt0bgqiaWG_KMWxhjDXX8meOHWbyUOSoWpiV2qFpxMzsYp5mo0DynN9w/s1600/1.jpg",
          author: "Thomas Wilson",
          price: 44.9,
        },
      ],
      AudioBooks: [
        {
          name: "Listen Now",
          category: "AudioBooks",
          image:
            "https://marketplace.canva.com/EAGGaQ-X5KU/2/0/1003w/canva-capa-de-livro-crist%C3%A3o-simples-azul-creme-e-preto-uovFwmiNY9Y.jpg",
          author: "Diana Ross",
          price: 44.9,
        },
        {
          name: "Audio Adventure",
          category: "AudioBooks",
          image:
            "https://marketplace.canva.com/EAE4oJOnMh0/2/0/1003w/canva-capa-de-livro-de-suspense-pKsZq7ReKt4.jpg",
          author: "Mark Thompson",
          price: 41.9,
        },
        {
          name: "Spoken Word",
          category: "AudioBooks",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVOEyuUt0Vh3xMpiaxAGViE8hXDWXEGq9XA&s",
          author: "Sandra King",
          price: 44.9,
        },
        {
          name: "Voice Tales",
          category: "AudioBooks",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVOEyuUt0Vh3xMpiaxAGViE8hXDWXEGq9XA&s",
          author: "Brian Adams",
          price: 41.9,
        },
        {
          name: "Sound Stories",
          category: "AudioBooks",
          image:
            "https://images.tcdn.com.br/img/img_prod/1272692/lv_e_assim_que_acaba_capa_dura_ed_colecionador_1819_1_e9b28ec32791cc5e9287d142b8065393.jpg",
          author: "Carol Martinez",
          price: 34.9,
        },
      ],
      Fiction: [
        {
          name: "Imagined Worlds",
          category: "Fiction",
          image: "https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg",
          author: "Patricia Evans",
          price: 54.9,
        },
        {
          name: "Story Time",
          category: "Fiction",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMU7Yc20qlxPOjHuDs6isxyBvb-Cja4qaHqw&s",
          author: "Christopher Hall",
          price: 64.9,
        },
        {
          name: "Fiction First",
          category: "Fiction",
          image:
            "https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg",
          author: "Nancy Wright",
          price: 14.9,
        },
        {
          name: "Made Up Tales",
          category: "Fiction",
          image:
            "https://edit.org/img/blog/zz7-flyer-personalizavel-para-capas-de-livros.webp",
          author: "Daniel Scott",
          price: 144.9,
        },
        {
          name: "Creative Writing",
          category: "Fiction",
          image:
            "https://marketplace.canva.com/EAD0UPCkitY/1/0/1024w/canva-capa-de-livro-de-suspense-monocrom%C3%A1tica-com-foto-de-floresta-U1dpnJ3bwKw.jpg",
          author: "Rebecca Green",
          price: 84.9,
        },
      ],
      Romance: [
        {
          name: "Love Letters",
          category: "Romance",
          image:
            "https://marketplace.canva.com/EAGGaQ-X5KU/2/0/1003w/canva-capa-de-livro-crist%C3%A3o-simples-azul-creme-e-preto-uovFwmiNY9Y.jpg",
          author: "Victoria Collins",
          price: 204.9,
        },
        {
          name: "Heart Stories",
          category: "Romance",
          image:
            "https://marketplace.canva.com/EAE4oJOnMh0/2/0/1003w/canva-capa-de-livro-de-suspense-pKsZq7ReKt4.jpg",
          author: "Anthony Lewis",
          price: 44.9,
        },
        {
          name: "Romance Novel",
          category: "Romance",
          image: "https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg",
          author: "Elizabeth Turner",
          price: 51.9,
        },
        {
          name: "Sweet Dreams",
          category: "Romance",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVOEyuUt0Vh3xMpiaxAGViE8hXDWXEGq9XA&s",
          author: "James Parker",
          price: 34.3,
        },
        {
          name: "Passion Tales",
          category: "Romance",
          image:
            "https://images.tcdn.com.br/img/img_prod/1272692/lv_e_assim_que_acaba_capa_dura_ed_colecionador_1819_1_e9b28ec32791cc5e9287d142b8065393.jpg",
          author: "Helen Rodriguez",
          price: 19.9,
        },
      ],
      Fantasy: [
        {
          name: "Magic Realm",
          category: "Fantasy",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3j8loTJplZloqP8VWhpt3aDTPZjbJUaJAUQ&s",
          author: "Gregory Young",
          price: 9.9,
        },
        {
          name: "Dragon Tales",
          category: "Fantasy",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMU7Yc20qlxPOjHuDs6isxyBvb-Cja4qaHqw&s",
          author: "Stephanie Hill",
          price: 56.9,
        },
        {
          name: "Wizard World",
          category: "Fantasy",
          image:
            "https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg",
          author: "Jacob Allen",
          price: 114.9,
        },
        {
          name: "Enchanted Forest",
          category: "Fantasy",
          image:
            "https://edit.org/img/blog/zz7-flyer-personalizavel-para-capas-de-livros.webp",
          author: "Samantha Cook",
          price: 15.1,
        },
        {
          name: "Mythical Beings",
          category: "Fantasy",
          image:
            "https://marketplace.canva.com/EAD0UPCkitY/1/0/1024w/canva-capa-de-livro-de-suspense-monocrom%C3%A1tica-com-foto-de-floresta-U1dpnJ3bwKw.jpg",
          author: "Matthew Bailey",
          price: 44.0,
        },
      ],
      Manga: [
        {
          name: "Anime Dreams",
          category: "Manga",
          image:
            "https://www.designcomcafe.com.br/wp-content/uploads/2017/08/capas-de-livros-wolf-wilder.jpg",
          author: "Kaitlyn Cooper",
          price: 88.15,
        },
        {
          name: "Manga Magic",
          category: "Manga",
          image:
            "https://editoraviseu.com/wp-content/uploads/2022/08/esta-chovendo-estrlas-capa-de-livro-editora-viseu.webp",
          author: "Joshua Reed",
          price: 44.9,
        },
        {
          name: "Japanese Tales",
          category: "Manga",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IY7qAmG0cKaot673DeAxUtzhNoyebDv7jw&s",
          author: "Lauren Murphy",
          price: 14.9,
        },
        {
          name: "Comic Adventures",
          category: "Manga",
          image:
            "https://f.i.uol.com.br/fotografia/2023/08/04/169117238764cd3e238fbf1_1691172387_3x2_md.jpg",
          author: "Tyler Bell",
          price: 27.85,
        },
        {
          name: "Graphic Stories",
          category: "Manga",
          image:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5ficLXnARSCOqj3_q1R3K6boTuRRhQqWJTO8CXJX_SCbdfxno3crd2JpXzatrhtbO8jC9BYiUzLnoitvaGcfNt0bgqiaWG_KMWxhjDXX8meOHWbyUOSoWpiV2qFpxMzsYp5mo0DynN9w/s1600/1.jpg",
          author: "Hannah Ward",
          price: 44.9,
        },
      ],
      Crime: [
        {
          name: "Detective Story",
          category: "Crime",
          image: "https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg",
          author: "Brandon Torres",
          price: 44.9,
        },
        {
          name: "Mystery Case",
          category: "Crime",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMU7Yc20qlxPOjHuDs6isxyBvb-Cja4qaHqw&s",
          author: "Megan Peterson",
          price: 14.9,
        },
        {
          name: "Crime Scene",
          category: "Crime",
          image:
            "https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg",
          author: "Jonathan Gray",
          price: 99.9,
        },
        {
          name: "Police Tales",
          category: "Crime",
          image:
            "https://edit.org/img/blog/zz7-flyer-personalizavel-para-capas-de-livros.webp",
          author: "Ashley Ramirez",
          price: 66.9,
        },
        {
          name: "Thriller Night",
          category: "Crime",
          image:
            "https://marketplace.canva.com/EAD0UPCkitY/1/0/1024w/canva-capa-de-livro-de-suspense-monocrom%C3%A1tica-com-foto-de-floresta-U1dpnJ3bwKw.jpg",
          author: "Nicholas James",
          price: 56.9,
        },
      ],
    };

    return bookData[categoryLabel] || [];
  };

  // Generate all books from all categories (excluding "All")
  const allBooks = categories
    .filter((category) => category.label !== "All")
    .flatMap((category) => generateBooksForCategory(category.label));

  // Filter books based on search term and active category
  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const getCurrentPageBooks = () => {
    const startIndex = currentIndex * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [searchTerm, activeCategory]);

  // Update items per page based on screen size
  React.useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setItemsPerPage(6); // 2xl: 6 books
      } else if (width >= 1280) {
        setItemsPerPage(5); // xl: 5 books
      } else if (width >= 1024) {
        setItemsPerPage(4); // lg: 4 books
      } else if (width >= 768) {
        setItemsPerPage(5); // md: 5 books
      } else if (width >= 640) {
        setItemsPerPage(3); // sm: 3 books
      } else {
        setItemsPerPage(2); // xs: 2 books
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Cart functions

  const addToCart = (book: AddToCartBook): void => {
    setCartItems((prevItems: Book[]) => {
      const existingItem = prevItems.find((item) => item.name === book.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === book.name
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== bookName)
    );
  };

  const updateQuantity = (bookName: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(bookName);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.name === bookName ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price;
      const itemQuantity = item.quantity ?? 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  // Coming Soon Modal
  const ComingSoonModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="mb-4">
          <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Coming Soon!
          </h2>
          <p className="text-gray-600">
            This feature is currently under development. Stay tuned for updates!
          </p>
        </div>
        <button
          onClick={() => setShowComingSoonModal(false)}
          className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );

  // Book Details Modal
  const BookDetailsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Book Details</h2>
          <button
            onClick={() => setShowBookDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {selectedBook && (
          <div className="flex gap-6">
            <div className="w-32 h-40 rounded-lg shadow-md overflow-hidden flex-shrink-0">
              <img
                src={selectedBook.image}
                alt={selectedBook.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {selectedBook.name}
              </h3>
              <p className="text-gray-600 mb-2">by {selectedBook.author}</p>
              <p className="text-2xl font-bold text-green-600 mb-4">
                ${selectedBook.price.toFixed(2)}
              </p>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {selectedBook.category}
                </span>
              </div>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    addToCart(selectedBook);
                    setShowBookDetailsModal(false);
                  }}
                  className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Cart Modal
  const CartModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={() => setShowCartModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4 text-[#7e655c]">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <div className="w-16 h-20 rounded-lg shadow-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-300 rounded-lg shadow-md flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <BookOpen className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">by {item.author}</p>
                  <p className="text-sm font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.name, (item.quantity ?? 1) - 1)
                    }
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.name, (item.quantity ?? 1) + 1)
                    }
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-red-500 hover:text-red-700 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">
                  Total Items: {getTotalItems()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-green-600">
                  Total: ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen h-screen bg-white flex flex-col ${nunito.className}`}
    >
      {/* Main Content Area */}
      <div className="flex-1 w-full overflow-hidden">
        <div className="flex gap-6 h-full">
          {/* Left Sidebar with User Profile and Menu */}
          <div className="col-span-2 lg:col-span-1 h-full">
            <LeftSidebar
              onUserClick={() => {
                toast({
                  title: "Coming Soon!",
                  description:
                    "User profile features are currently under development.",
                  variant: "destructive",
                });
              }}
              onSubscribeClick={() => {
                toast({
                  title: "Coming Soon!",
                  description:
                    "Subscription features are currently under development.",
                  variant: "destructive",
                });
              }}
            />
          </div>

          {/* Main Content */}
          <div className="col-span-10 lg:col-span-8 h-full overflow-y-auto pr-4 lg:pl-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 flex-1 justify-center py-6 pr-2">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a39089] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for books"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full bg-[#f1e6da] text-[#a39089]"
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-6 py-2 rounded-full text-sm font-medium"
                    style={{
                      background:
                        "linear-gradient(45deg, #896f99, #7f82a3, #839d8d, #aeb978, #d5c270, #f09968, #e9605f)",
                    }}
                  >
                    search
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="relative cursor-pointer bg-[#f1e6da] p-3 rounded-full"
                  onClick={() => setShowCartModal(true)}
                >
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <div
                  className="relative cursor-pointer bg-[#f1e6da] p-3 rounded-full lg:hidden"
                  onClick={() => setIsCategoriesVisible(!isCategoriesVisible)}
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </div>
                <div
                  className="relative cursor-pointer bg-[#f1e6da] p-3 rounded-full lg:hidden"
                  onClick={() => setIsChatVisible(!isChatVisible)}
                >
                  <MessageCircle className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              {/* Categories */}
              <div
                className={`lg:block ${
                  isCategoriesVisible ? "block" : "hidden"
                }`}
              >
                <div className="grid md:grid-cols-5 grid-cols-3 lg:grid-cols-10 gap-4 mb-6">
                  {categories.map((category, index) => (
                    <CategoryIcon
                      key={index}
                      label={category.label}
                      active={category.label === activeCategory}
                      isFirst={index === 0}
                      onClick={() => {
                        setActiveCategory(category.label);
                        // Hide categories on mobile/tablet after selection
                        if (window.innerWidth < 1024) {
                          setIsCategoriesVisible(false);
                        }
                      }}
                    >
                      {category.icon}
                    </CategoryIcon>
                  ))}
                </div>
              </div>

              {/* Popular Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#7e655c]">Popular</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowComingSoonModal(true)}
                      className="bg-[#f1e6da] text-[#7e655c] px-5 py-3 rounded-full text-sm font-bold"
                    >
                      View All
                    </button>
                    <button
                      onClick={prevPage}
                      className="bg-[#f1e6da] text-[#7e655c] w-11 h-11 rounded-full flex items-center justify-center"
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextPage}
                      className="bg-[#f1e6da] text-[#7e655c] w-11 h-11 rounded-full flex items-center justify-center"
                      disabled={currentIndex === totalPages - 1}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {getCurrentPageBooks().length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4">
                      <Search className="w-16 h-16 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-500">
                      No books match your search for{" "}
                      <strong>{searchTerm}</strong>. Try different keywords or
                      browse our categories.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-12 overflow-visible">
                    {getCurrentPageBooks().map((book, index) => (
                      <BookCard
                        key={index}
                        name={book.name}
                        author={book.author}
                        image={book.image}
                        price={book.price}
                        onClick={() => {
                          setSelectedBook(book);
                          setShowBookDetailsModal(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Stats Cards */}
              <div className="flex flex-col md:flex-row gap-6 bg-[#f1e6da] p-6 text-[#7e655c] rounded-3xl">
                <div className="flex justify-center items-center">
                  <img
                    src="https://i.imgur.com/OK7rUlk.png"
                    alt=""
                    className="md:max-h-64 max-h-32"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <p className="text-2xl font-bold">
                    2022 year 50 most popular bestsellers
                  </p>
                  <p>
                    List of the most interesting books of the year based on
                    customers and critics review
                  </p>
                  <div>
                    <button className="bg-gradient-to-b from-[#F47071] to-[#ED5F64] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Eye /> view all
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <TopListItem
                    icon={<BookOpen className="w-5 h-5 text-blue-500" />}
                    title="Top 50 books for kids"
                    subtitle="Picture books, joke series, and chapter books."
                  />
                  <TopListItem
                    icon={<Star className="w-5 h-5 text-yellow-500" />}
                    title="Top 50 Classic books"
                    subtitle="Discover the most influential books in classic literature."
                  />
                  <TopListItem
                    icon={<Sparkles className="w-5 h-5 text-purple-500" />}
                    title="Top 50 Sci-Fi books"
                    subtitle="Discover the best sci-fi books about time and space travel."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`col-span-3 h-screen ${
              isChatVisible ? "block" : "hidden"
            } fixed right-0 top-0 lg:relative lg:block z-30`}
          >
            <ChatInterface setIsChatVisible={setIsChatVisible} />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showComingSoonModal && <ComingSoonModal />}
      {showBookDetailsModal && <BookDetailsModal />}
      {showCartModal && <CartModal />}

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default App;
