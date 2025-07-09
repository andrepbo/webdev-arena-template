import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Menu,
  ChevronRight,
  Dot,
  CirclePlus,
  Facebook,
  Twitter,
  Mail,
  Instagram,
} from "lucide-react";

// Types
type Exercise = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  popularExercises?: string[];
};

type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
};

type UserCollection = {
  [key: string]: Exercise[];
};

// Mock Data
const exercises: Exercise[] = [
  {
    id: "1",
    name: "Bodyweight Standing Crunch",
    image: "https://img.icons8.com/ios-filled/100/000000/crunches.png",
    description: "A classic core exercise targeting the rectus abdominis.",
    category: "Ab Workouts",
    popularExercises: [
      "Bodyweight Standing Side Crunch",
      "Bodyweight Air Bike",
    ],
  },
  {
    id: "2",
    name: "Push-up",
    image: "https://img.icons8.com/ios-filled/100/000000/pushups.png",
    description:
      "A full-body exercise that targets chest, shoulders, and triceps.",
    category: "Workouts",
    popularExercises: [
      "Push-up with Hands Elevated",
      "Push-up with Feet Elevated",
    ],
  },
  {
    id: "3",
    name: "Meditation",
    image: "https://img.icons8.com/ios-filled/100/000000/meditation.png",
    description: "A mindfulness practice to reduce stress and improve focus.",
    category: "Health Tips",
    popularExercises: ["Guided Meditation", "Breathing Exercises"],
  },
  {
    id: "4",
    name: "Healthy Salad",
    image: "https://img.icons8.com/ios-filled/100/000000/salad.png",
    description: "A nutritious meal option packed with vitamins and minerals.",
    category: "Healthy Eating",
    popularExercises: ["Avocado Toast", "Grilled Chicken Salad"],
  },
  {
    id: "5",
    name: "Seated Mountain Climber",
    image: "https://img.icons8.com/ios-filled/100/000000/mountain-climber.png",
    description: "A core exercise that simulates running while seated.",
    category: "Ab Workouts",
    popularExercises: ["Mountain Climber", "Seated Leg Raise"],
  },
];

const articles: Article[] = [
  {
    id: "1",
    title: "10 Effective Ab Workouts for a Stronger Core",
    summary: "Discover the best exercises to build a strong and defined core.",
    content: `
      <h2>Why Focus on Your Core?</h2>
      <p>Your core muscles are essential for stability, balance, and overall strength. A strong core can improve your posture, reduce the risk of injury, and enhance your performance in various physical activities.</p>
      
      <h2>Top 10 Ab Workouts</h2>
      <ol>
        <li><strong>Bodyweight Standing Crunch</strong>: Targets the rectus abdominis and improves posture.</li>
        <li><strong>Seated Mountain Climber</strong>: Engages multiple core muscles and boosts cardiovascular endurance.</li>
        <li><strong>Plank</strong>: Strengthens the entire core, including the abs, obliques, and lower back.</li>
        <li><strong>Russian Twist</strong>: Targets the obliques and improves rotational strength.</li>
        <li><strong>Leg Raise</strong>: Isolates the lower abs and improves hip flexibility.</li>
        <li><strong>Bicycle Crunch</strong>: Engages both upper and lower abs simultaneously.</li>
        <li><strong>Side Plank</strong>: Strengthens the obliques and improves lateral stability.</li>
        <li><strong>Dead Bug</strong>: Targets the entire core while improving coordination.</li>
        <li><strong>Woodchopper</strong>: Engages the obliques and enhances functional strength.</li>
        <li><strong>Ab Wheel Rollout</strong>: Challenges the entire core with progressive resistance.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Incorporate these exercises into your routine for a stronger, more defined core. Remember to focus on proper form and gradually increase intensity as you progress.</p>
    `,
    image: "https://img.icons8.com/ios-filled/100/000000/crunches.png",
    category: "Ab Workouts",
  },
  {
    id: "2",
    title: "The Benefits of Regular Exercise",
    summary:
      "Learn how consistent physical activity can improve your overall health and well-being.",
    content: `
      <h2>Physical Health Benefits</h2>
      <p>Regular exercise can help you maintain a healthy weight, reduce the risk of chronic diseases like heart disease and diabetes, and improve your cardiovascular health.</p>
      
      <h2>Mental Health Benefits</h2>
      <p>Exercise has been shown to reduce stress, anxiety, and depression. It can also improve your mood and boost your self-esteem.</p>
      
      <h2>Incorporating Exercise into Your Routine</h2>
      <p>Start with small, achievable goals and gradually increase the intensity and duration of your workouts. Find activities you enjoy to make exercise a sustainable part of your lifestyle.</p>
    `,
    image: "https://img.icons8.com/ios-filled/100/000000/exercise.png",
    category: "Workouts",
  },
  {
    id: "3",
    title: "Mindfulness and Meditation for Stress Reduction",
    summary:
      "Discover how mindfulness practices can help you manage stress and improve your mental well-being.",
    content: `
      <h2>What is Mindfulness?</h2>
      <p>Mindfulness is the practice of being present in the moment and observing your thoughts and feelings without judgment.</p>
      
      <h2>Benefits of Meditation</h2>
      <p>Regular meditation can reduce stress, improve focus, and enhance emotional regulation. It can also promote better sleep and overall well-being.</p>
      
      <h2>Getting Started with Meditation</h2>
      <p>Start with short sessions and gradually increase the duration. Find a quiet space, focus on your breath, and gently bring your attention back when your mind wanders.</p>
    `,
    image: "https://img.icons8.com/ios-filled/100/000000/meditation.png",
    category: "Health Tips",
  },
  {
    id: "4",
    title: "Healthy Eating for a Stronger Body",
    summary:
      "Learn how a balanced diet can support your fitness goals and overall health.",
    content: `
      <h2>Principles of Healthy Eating</h2>
      <p>A healthy diet includes a variety of nutrient-dense foods, such as fruits, vegetables, lean proteins, and whole grains. It limits processed foods, added sugars, and unhealthy fats.</p>
      
      <h2>Meal Planning Tips</h2>
      <p>Plan your meals ahead, cook at home, and focus on portion control. Incorporate a rainbow of colors on your plate to ensure a wide range of nutrients.</p>
      
      <h2>Hydration</h2>
      <p>Drink plenty of water throughout the day to stay hydrated and support your body's functions.</p>
    `,
    image: "https://img.icons8.com/ios-filled/100/000000/salad.png",
    category: "Healthy Eating",
  },
];

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
  onAddToCollection: (exercise: Exercise) => void;
  isInCollection: boolean;
}

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
}

interface SidebarProps {
  userCollections: UserCollection;
  onSelectCategory: (category: string) => void;
  onSelectExercise: (exerciseId: string) => void;
  onSelectArticle: (articleId: string) => void;
  categories: string[];
  currentCategory: string;
}

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onSelectCategory: (category: string) => void;
  categories: string[];
  currentCategory: string;
  userCollections: UserCollection;
  onSelectExercise: (exerciseId: string) => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  onClose,
  onAddToCollection,
  isInCollection,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {exercise.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="mb-6">
            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {exercise.category}
            </span>
          </div>

          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600">{exercise.description}</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
              How to Perform
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Stand with your feet shoulder-width apart.</li>
              <li>Place your hands behind your head or across your chest.</li>
              <li>
                Engage your core and lift your upper body toward your knees.
              </li>
              <li>Pause for a moment at the top of the movement.</li>
              <li>
                Lower yourself back to the starting position with control.
              </li>
              <li>Repeat for the desired number of repetitions.</li>
            </ol>
          </div>

          {exercise.popularExercises &&
            exercise.popularExercises.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Popular Variations
                </h3>
                <ul className="space-y-2">
                  {exercise.popularExercises.map((variation, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                      {variation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <div className="flex justify-end mt-6">
            <button
              onClick={() => onAddToCollection(exercise)}
              className={`px-4 py-2 rounded-lg text-white font-medium transition duration-200 ${
                isInCollection
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isInCollection ? "Saved to Collection" : "Add to Collection"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {article.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <img
              src={article.image}
              alt={article.title}
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="mb-6">
            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const images = [
    "https://jacoblund.com/cdn/shop/products/f7aa4f78938c3e39fef9a5dc8ce7410f_grande.jpg",
    "https://jacoblund.com/cdn/shop/products/5b7ca656065da5d829b011d1f15fe1c8_grande.jpg",
    "https://jacoblund.com/cdn/shop/products/db510c3df8aa2455250368a3b362edff_grande.jpg",
    "https://jacoblund.com/cdn/shop/products/9c1ccb416061a73f6bb8923fd62380a5_grande.jpg",
  ];

  return (
    <footer
      className="w-auto lg:mx-10 bg-gray-100 dark:bg-[#262626] text-gray-800 dark:text-white pt-8"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Primera sección: Artículos destacados */}
      <div className="w-max mx-auto px-6 mb-10">
        <h3 className="text-xl font-semibold  mb-6">Featured Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-xs ">July 5, 2025</p>
              <p className="text-xs  mb-4">By Jane Doe</p>
              <img
                src={src}
                alt={`Article ${index}`}
                className="object-cover mb-3 w-60 h-40"
              />
              <h2
                className="text-lg font-bold mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                How to Build Healthy Habits
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Segunda sección: Links generales */}
      <div className="bg-[#262626]  text-white py-10 mt-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-3">Weight Loss</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Burn Belly Fat
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Low Carb Diets
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Calorie Burners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Healthy Recipes</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Quick Meals
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Vegetarian
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Smoothies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Tools & More</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  BMI Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Workout Planner
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Meal Tracker
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Follow Us</h4>
            <div className="flex space-x-4 text-gray-600">
              <a href="#" className="text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white">
                <Mail size={20} />
              </a>
              <a href="#" className="text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} FitConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  userCollections,
  onSelectExercise,
}) => {
  return (
    <div className="bg-white dark:bg-[#262626] p-8">
      <div className="text-gray-800 dark:text-white">
        <h1
          className="text-lg font-semibold uppercase tracking-wider mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          My Collections
        </h1>
        {Object.keys(userCollections).length > 0 ? (
          <div
            className="space-y-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {Object.entries(userCollections).map(([category, exercises]) => (
              <div key={category}>
                <h4 className="text-xs font-medium mb-2">{category}</h4>
                <ul className="space-y-2 pl-2 text-xs">
                  {exercises.map((exercise) => (
                    <li key={exercise.id}>
                      <button
                        onClick={() => onSelectExercise(exercise.id)}
                        className="text-sm hover:text-blue-600 transition duration-200"
                      >
                        {exercise.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600">
              Your saved workouts and articles will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  searchQuery,
  onClearSearch,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onSelectCategory,
  categories,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <nav className="bg-white border-b dark:bg-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between lg:justify-center h-20">
            <div className="flex items-center">
              {/*               <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-800">FitConnect</h1>
              </div> */}

              <div className="lg:hidden flex items-center">
                <button
                  onClick={onToggleMobileMenu}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden lg:flex items-center text-xs font-medium text-gray-800  dark:text-white">
                <p className="px-2 content-center">Workouts</p>
                <Dot className="text-lg px-2 content-center"></Dot>
                <p className="px-2 content-center">Healthy Eating</p>
                <Dot className="text-lg px-2 content-center"></Dot>
                <p className="px-2 content-center">Diets & Weight Loss</p>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white px-6">
                  fitness
                </h1>
                <p className="px-2 content-center">Run</p>
                <Dot className="text-lg font-bold text-gray-800 px-2 content-center"></Dot>
                <p className="px-2 content-center">Mind & Body</p>
                <Dot className="text-lg font-bold text-gray-800 px-2 content-center"></Dot>
                <p className="px-2 content-center">Health</p>
              </div>

              <div className="flex items-center relative">
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition"
                  >
                    <Search className="w-4 h-4 ml-4" />
                  </button>
                ) : (
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsSearchOpen(false);
                          onClearSearch();
                        }
                      }}
                      className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-xs"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <button
                      onClick={() => {
                        onClearSearch();
                        setIsSearchOpen(false);
                      }}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden">
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={onToggleMobileMenu}
            onSelectCategory={onSelectCategory}
            categories={categories}
          />
        </div>
      )}
    </>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  categories,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white h-full w-4/5 max-w-sm p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 ">fitness</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => {
                  onSelectCategory(category);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function FitConnectApp() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userCollections, setUserCollections] = useState<UserCollection>({});
  const [currentCategory, setCurrentCategory] = useState("Ab Workouts");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories] = useState([
    "Workouts",
    "Healthy Eating",
    "Diets & Weight Loss",
    "Run",
    "Mind & Body",
    "Health",
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState<"home" | "detail">("home");

  // Initialize with a default collection
  useEffect(() => {
    if (Object.keys(userCollections).length === 0) {
      setUserCollections({
        "Ab Workouts": [exercises[0], exercises[4]],
        Workouts: [exercises[1]],
        "Healthy Eating": [exercises[3]],
        "Health Tips": [exercises[2]],
      });
    }
  }, [userCollections]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const playfair = document.createElement("link");
    playfair.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";
    playfair.rel = "stylesheet";

    const inter = document.createElement("link");
    inter.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap";
    inter.rel = "stylesheet";

    document.head.appendChild(playfair);
    document.head.appendChild(inter);

    return () => {
      document.head.removeChild(playfair);
      document.head.removeChild(inter);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleAddToCollection = (exercise: Exercise) => {
    setUserCollections((prev) => {
      const currentCategoryExercises = prev[currentCategory] || [];
      // const exerciseExists = currentCategoryExercises.some(ex => ex.id === exercise.id);

      // if (exerciseExists) {
      //   return prev;
      // }

      const updatedCategoryExercises = [...currentCategoryExercises, exercise];
      return {
        ...prev,
        [currentCategory]: updatedCategoryExercises,
      };
    });
  };

  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery("");
  };

  const handleSelectExerciseFromCollection = (exerciseId: string) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
      setSelectedExercise(exercise);
    }
  };

  const handleSelectArticleFromCollection = (articleId: string) => {
    const article = articles.find((art) => art.id === articleId);
    if (article) {
      setSelectedArticle(article);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if an exercise is in the current category's collection
  const isExerciseInCollection = (exerciseId: string) => {
    const currentCategoryExercises = userCollections[currentCategory] || [];
    return currentCategoryExercises.some((ex) => ex.id === exerciseId);
  };

  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="h-1/2 bg-[#F9DCDB]"></div>
        <div className="h-1/2 bg-[#FCECEA]"></div>
      </div>
      <div className="relative lg:mx-10 lg:mt-10">
        <Navbar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
          onSelectCategory={handleSelectCategory}
          categories={categories}
          currentCategory={currentCategory}
          userCollections={userCollections}
          onSelectExercise={handleSelectExerciseFromCollection}
        />
        {view === "home" ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 bg-[#FEFEFE] dark:bg-[#262626]">
            <div className="col-span-1"></div>
            <div className="col-span-3  p-8 lg:pr-16 text-gray-800 dark:text-white">
              <h1
                className="text-3xl font-bold my-8"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Fitness Challenge
              </h1>
              <p
                className="text-lg font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                The Best Abs Exercises Youve Never Seen Before
              </p>
              <p
                className="text-xs font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                How to:
              </p>
              <p className="text-xs my-4">
                {`A. Stand with feet shoulder-width apart, toes slightly turned out. Lower into a squat, keeping your chest up, knees tracking over toes, and weight in your heels. B. Explode upward, jumping as high as possible, swinging your arms for momentum. Land softly, immediately sinking back into the squat. That’s one rep.`}
              </p>
              <p
                className="text-xs font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                What it works:
              </p>
              <p className="text-xs mb-4">
                Quads, glutes, hamstrings, calves, core
              </p>
              <img
                src={
                  "https://jacoblund.com/cdn/shop/products/b8be83cbcccaa5833e2b2c08657ec4ef_grande.jpg"
                }
                alt="Owner"
                className="w-full object-cover mb-12 cursor-pointer"
                onClick={() => setView("detail")}
              />
              <p
                className="text-lg font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Wall Pivot Slams
              </p>
              <p
                className="text-xs font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                How to:
              </p>
              <p className="text-xs my-4">
                {`A. Stand with your feet just outside shoulder-width apart, toes turned slighly out. Squat down with your weight in your heels, proud chest, knees tracking over toes, and a neutral spine. When you hit the bottom of your squat, squeeze your butt tight and drive hard through your legs and heels as you launch straight up. That's one rep.`}
              </p>
              <p
                className="text-xs font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                What it works:
              </p>
              <p className="text-xs mb-4">Core, back, arms</p>
              <img
                src={
                  "https://jacoblund.com/cdn/shop/products/d20b152109bb45abef3af2fe363c03ab_grande.jpg"
                }
                alt="Owner"
                className="w-full object-cover mb-12 cursor-pointer"
                onClick={() => setView("detail")}
              />
              <p
                className="text-lg font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Wall Pivot Slams
              </p>
              <p
                className="text-xs font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                How to:
              </p>
              <p className="text-xs my-4">
                {`A. Stand with your feet just outside shoulder-width apart, toes turned slighly out. Squat down with your weight in your heels, proud chest, knees tracking over toes, and a neutral spine. When you hit the bottom of your squat, squeeze your butt tight and drive hard through your legs and heels as you launch straight up. That's one rep.`}
              </p>
              <p
                className="text-xs font-bold my-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                What it works:
              </p>
              <p className="text-xs mb-4">Glutes, arms, abs</p>
              <img
                src={
                  "https://jacoblund.com/cdn/shop/products/4c0e0ce990a8454804953bbcf6240fc1_grande.jpg"
                }
                alt="Owner"
                className="w-full object-cover mb-12"
              />
              <span className="flex justify-center items-center my-4 py-2 border-2 border-gray-400">
                <p className=" text-xs">Continue More Workouts</p>
              </span>
              {selectedExercise && (
                <ExerciseDetail
                  exercise={selectedExercise}
                  onClose={() => setSelectedExercise(null)}
                  onAddToCollection={handleAddToCollection}
                  isInCollection={isExerciseInCollection(selectedExercise.id)}
                />
              )}

              {selectedArticle && (
                <ArticleDetail
                  article={selectedArticle}
                  onClose={() => setSelectedArticle(null)}
                />
              )}
            </div>
            <div className="col-span-1"></div>
          </div>
        ) : (
          <div className="bg-[#FEFEFE] dark:bg-[#262626] col-span-4 flex flex-col">
            <div className="flex flex-1">
              <main className="flex-1 py-12 overflow-y-auto">
                <div className="max-full mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="col-span-2 text-gray-800 dark:text-white">
                      <div className="ml-8 lg:ml-28">
                        <p
                          className="text-xs font-bold"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          Workout Trends
                        </p>
                        <h1
                          className="text-4xl mr-12 font-bold font-headline inline-block scale-y-150 origin-top leading-tight text-gray-900 dark:text-white"
                          style={{ fontFamily: "Playfair Display" }}
                        >{`The Best Abs Exercises You've Never Seen Before`}</h1>
                        <p
                          className="text-xs font-body mt-28 mb-12"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Oct 20, 2019 - By Jessica Smith
                        </p>
                      </div>
                      <div className="lg:w-80 m-8">
                        <img
                          src={
                            "https://jacoblund.com/cdn/shop/products/c9d881bff30c7d3187d2c81fbedbb7b5_grande.jpg"
                          }
                          alt="Owner"
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-7">
                          <div className="col-span-3"></div>
                          <div className="col-span-4 mt-6">
                            <p className=" text-xs">
                              {`Sick of sit-ups? Over planks? still want six-pack abs? We've got outside-the-box core moves (including the uber-effective Lemon Squeezer Exercise) that add up to a major ab challenge.`}
                            </p>
                            <button
                              className="flex justify-between items-center justify-self-stretch my-4 py-2 border-2 border-x-white border-y-gray-400 dark:border-x-[#262626] dark:border-y-white"
                              style={{ fontFamily: "Inter, sans-serif" }}
                              onClick={() => {
                                handleAddToCollection({
                                  id: "9",
                                  name: `The Best Abs Exercises You've Never Seen Before`,
                                  image:
                                    "https://img.icons8.com/ios-filled/100/000000/crunches.png",
                                  description:
                                    "A classic core exercise targeting the rectus abdominis.",
                                  category: "Ab Workouts",
                                  popularExercises: [
                                    "Bodyweight Standing Side Crunch",
                                    "Bodyweight Air Bike",
                                  ],
                                });
                              }}
                            >
                              <p className="text-xs">Add to my workouts</p>
                              <CirclePlus
                                size={20}
                                className="text-gray-600 dark:text-white"
                              ></CirclePlus>
                            </button>
                            <span className="flex justify-between items-center lg:mb-12">
                              <p className="text-xs">Share</p>
                              <div className="flex gap-4">
                                <Facebook
                                  size={16}
                                  className="text-gray-800 dark:text-white"
                                ></Facebook>
                                <Twitter
                                  size={16}
                                  className="text-gray-800 dark:text-white"
                                ></Twitter>
                                <Mail
                                  size={16}
                                  className="text-gray-800 dark:text-white"
                                ></Mail>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <Sidebar
                        userCollections={userCollections}
                        onSelectCategory={handleSelectCategory}
                        onSelectExercise={handleSelectExerciseFromCollection}
                        onSelectArticle={handleSelectArticleFromCollection}
                        categories={categories}
                        currentCategory={currentCategory}
                      />
                    </div>
                    <div className="col-span-3 m-8 lg:m-auto">
                      <img
                        src={
                          "https://jacoblund.com/cdn/shop/products/099430729b4b24a067e2b7743af37055_1500x.jpg"
                        }
                        alt="Owner"
                        className="max-h-svh object-cover mb-12 lg:mb-20"
                      />
                      <section
                        className="grid grid-cols-1 lg:grid-cols-5"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        <div className="col-span-3 relative text-gray-800 dark:text-white">
                          {/* Letra capital */}
                          <span className="absolute text-7xl -left-2 -top-2 scale-y-150 origin-top">
                            A
                          </span>
                          <p className="pl-12 text-sm text-justify leading-relaxed">
                            {`strong core looks good, but it's about more than that—a stable and strong core makes daily tasks easier and safer. Not to mention, it helps you power through dynamic workouts (like running, kickboxing, or weightlifting). Tight abs and burning fat are just bonus effects. These core moves are perfect for beginners or advanced athletes wanting extra challenge.`}
                          </p>
                          <br></br>
                          <p className="mt-4 text-sm text-justify leading-relaxed">
                            {`Big weights build big muscles, especially for glutes and abs. But you can get great results with just a resistance band, medicine ball, or single dumbbell (all affordable on Amazon). This diverse exercise group (including the Lemon Squeezer) targets your entire core to sculpt a flatter stomach. Better yet, combine them for maximum payoff in just five minutes—far more effective than endless sit-ups.`}
                          </p>
                          <br></br>
                          <p className="mt-4 text-sm text-justify leading-relaxed">
                            {`Combining a ketogenic diet with regular physical activity can be a good strategy for reducing body weight without leading to a loss of muscle mass, a problem that occurs with most poorly planned low-calorie diets (calorie reduction). It's important to keep in mind that the goal of a diet and exercise routine shouldn't be to lose weight at any price. What we're interested in is losing weight from body fat, but maintaining and even increasing muscle mass, which is associated with better health. Therefore, the keto diet, by benefiting the extraction of energy from our fat reserves, compensates for this reduction in calories without harming muscle mass, as numerous studies indicate. Thus, our goal of reducing fat, but not muscle, is easier to achieve.`}
                          </p>
                        </div>
                        <div className="col-span-2"></div>
                      </section>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
