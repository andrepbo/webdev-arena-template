import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Article {
  id: number;
  date?: string;
  tag: string;
  title: string;
  image?: string;
  content: string;
  fullContent: string;
  description?: string;
  color?: string;
}

const articles: Article[] = [
  {
    id: 1,
    date: "Sep 06, 2022",
    tag: "Travel",
    title: "Get to your dream now destinations with Travel Pro",
    image:
      "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=800&q=80",
    content:
      "Explore beautiful locations and book the perfect trip with Travel Pro. Discover exciting places and plan your next adventure today.",
    fullContent:
      "Travel Pro is revolutionizing the way we explore the world. With our innovative platform, you can discover hidden gems, book unique experiences, and connect with local guides who will show you the authentic side of every destination. Whether you're looking for a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, Travel Pro has options for every type of traveler. Our team of experts carefully curates each destination to ensure you have the best possible experience. Start planning your dream vacation today and let Travel Pro handle all the details, from flights and accommodations to activities and transportation.",
  },
  {
    id: 2,
    tag: "ADS",
    title: "Real talk in a corporate world",
    description: "Become a BROADCAST MEMBER",
    color: "bg-sky-100",
    content:
      "Join a network of professionals sharing real stories and insights from the corporate world. Become a member and get access to exclusive content.",
    fullContent:
      "In today's fast-paced corporate environment, authentic communication is more valuable than ever. Our BROADCAST MEMBER program connects professionals across industries to share unfiltered experiences, challenges, and solutions. As a member, you'll gain access to exclusive roundtable discussions, mentorship opportunities, and a private network of like-minded individuals. We believe that real growth happens when we move beyond polished presentations and engage in honest dialogue about what really works in business. Join our community of over 10,000 members who are transforming corporate culture through transparency and shared learning.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80",
    tag: "Podcast",
    title: "See all picks",
    content:
      "Browse curated picks hand-selected by our editors to inspire your next read, watch or listen.",
    fullContent:
      "Our editorial team works tirelessly to bring you the most inspiring and thought-provoking content across all media. Each month, we select the very best books, films, podcasts, and articles that deserve your attention. From groundbreaking non-fiction to captivating fiction, from insightful documentaries to entertaining series, our picks represent diverse voices and perspectives. We don't just recommend popular items - we dig deeper to find hidden gems that might otherwise go unnoticed. Whether you're looking for your next great read, something to watch on a quiet evening, or a podcast for your commute, our curated selections will guide you to quality content.",
  },
  {
    id: 4,
    title: "Podcast of the week: Conversations that matter",
    tag: "Podcast",
    image:
      "https://media.licdn.com/dms/image/D5612AQFjorGBqJ4IXQ/article-cover_image-shrink_720_1280/0/1706476209474?e=2147483647&v=beta&t=v-VbvFyzZb6DO0OyV9ykvI9t7up-Q36d9Cl40CY8Xsw",
    content:
      "Listen to compelling discussions on life, success, and more. This week's podcast features top voices from across the industry.",
    fullContent:
      "This week's featured podcast brings together three leading thinkers for a profound discussion about what it means to live a meaningful life in today's complex world. Hosted by award-winning journalist Sarah Lin, the episode explores themes of success, fulfillment, and personal growth through the lenses of neuroscience, philosophy, and personal experience. Our guests include Dr. Michael Chen, a neuroscientist studying decision-making; philosopher and author Elena Rodriguez; and entrepreneur Jamal Williams, who shares his journey from corporate executive to social impact founder. The conversation ranges from practical advice to deep existential questions, offering listeners both inspiration and actionable insights. Available on all major podcast platforms.",
  },
  {
    id: 5,
    title: "Radio Hour: The Soundtrack of the Month",
    tag: "Radio",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    content:
      "Tune in to the latest sounds curated for your journey. Fresh tracks and classic vibes await in this monthly radio highlight.",
    fullContent:
      "Our July Radio Hour features an eclectic mix of emerging artists and timeless classics, carefully blended to create the perfect soundtrack for your summer. Music director Alex Rivera takes you on a two-hour journey through genres, starting with chill electronic beats perfect for lazy afternoons, moving into upbeat indie pop for your evening gatherings, and finishing with smooth jazz for late-night relaxation. Special highlights include an exclusive interview with breakout artist Maya Chen about her debut album, a deep dive into the making of the 90s classic that's seeing a resurgence, and a preview of three must-hear tracks from upcoming releases. Available 24/7 on our streaming platform, with new episodes premiering the first Friday of each month.",
  },
  {
    id: 6,
    title: "Write with us: Become a featured writer",
    tag: "Be a writer",
    image:
      "https://graphicdesignjunction.com/wp-content/uploads/2017/02/typography+design+0043.jpg",
    content:
      "Have a story to tell? Share your voice and become a contributor to BlogSpot. Join our creative community today.",
    fullContent:
      "BlogSpot is built on the power of diverse voices sharing their unique perspectives. Our contributor program offers writers at all levels the opportunity to publish their work to our engaged audience of over 500,000 monthly readers. Whether you're an experienced author or just starting out, we provide editorial support, community feedback, and fair compensation for accepted pieces. We're particularly interested in personal essays, how-to guides, cultural commentary, and investigative pieces that shed light on important issues. Selected contributors receive mentoring from our editorial team, opportunities to collaborate with other writers, and the chance to be featured in our weekly newsletter. The application process is simple: submit a writing sample and a brief pitch for your first piece, and our team will respond within two weeks.",
  },
];

export default function BlogHighlightPage() {
  const [view, setView] = useState<"home" | "list" | "detail">("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const getCategoryCount = (category: string): number => {
    if (category === "All") return articles.length;
    if (category === "Articles") {
      return articles.filter(
        (article) => article.tag === "Travel" || article.tag === "ADS"
      ).length;
    }
    return articles.filter((article) => article.tag === category).length;
  };

  const normalizedSearch = searchQuery.toLowerCase().trim();
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All"
        ? true
        : activeCategory === "Articles"
        ? article.tag === "Travel" || article.tag === "ADS"
        : article.tag === activeCategory;

    const matchesSearch =
      (article.title?.toLowerCase().includes(normalizedSearch) ?? false) ||
      (article.content?.toLowerCase().includes(normalizedSearch) ?? false);

    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setView("detail");
  };

  const renderHomeView = () => {
    if (filteredArticles.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No matches for your search.</p>
          <p className="text-sm text-gray-400">
            We couldn’t find anything that matches your query. Try a different
            keyword or remove some filters.
          </p>
        </div>
      );
    }
    return (
      <>
        <section className="mb-10 flex items-center gap-4">
          <h2 className="text-4xl font-bold">Best of the week</h2>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("list");
              setActiveCategory("All");
            }}
            className="text-sm text-gray-500 hover:underline"
          >
            See all posts →
          </a>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 relative">
            {filteredArticles[0] && (
              <div
                onClick={() => handleArticleClick(filteredArticles[0])}
                className="cursor-pointer"
              >
                <img
                  src={filteredArticles[0].image}
                  alt="travel"
                  className="rounded-xl w-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-xs">
                  {filteredArticles[0].date}
                </div>
                <div className="absolute bottom-10 left-4 bg-white rounded-xl p-4 w-11/12">
                  <p className="text-xs mb-1">• {filteredArticles[0].tag}</p>
                  <h3 className="text-lg font-semibold leading-snug">
                    {filteredArticles[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {filteredArticles[0].content}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {filteredArticles[1] && (
              <div
                className={`rounded-xl p-6 ${
                  filteredArticles[1].color || "bg-gray-100"
                }`}
              >
                <p className="text-xs mb-1">• {filteredArticles[1].tag}</p>
                <h4 className="font-semibold mb-1 leading-tight">
                  {filteredArticles[1].title}
                </h4>
                <p className="text-sm text-gray-600">
                  {filteredArticles[1].description}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {filteredArticles[1].content}
                </p>
                <a href="#" className="text-xs mt-2 inline-block text-gray-700">
                  Learn more
                </a>
              </div>
            )}
            {filteredArticles[2] && (
              <div className="relative">
                <img
                  src={filteredArticles[2].image}
                  alt="pick"
                  className="rounded-xl w-full h-48 object-cover"
                />
                <button className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold">
                  {filteredArticles[2].title} →
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-8 grid-cols-1 md:grid-cols-3">
          {filteredArticles.slice(3).map((article) => (
            <div
              key={article.id}
              className="rounded-xl overflow-hidden shadow bg-white cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleArticleClick(article)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-gray-500">• {article.tag}</p>
                <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.content}</p>
              </div>
            </div>
          ))}
        </section>
      </>
    );
  };

  const renderListView = () => (
    <div className="mt-8">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.length === 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-lg text-gray-500">No matches for your search.</p>
            <p className="text-sm text-gray-400">
              We couldn’t find anything that matches your query. Try a different
              keyword or remove some filters.
            </p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="rounded-xl overflow-hidden shadow bg-white cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleArticleClick(article)}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4">
                {article.date && (
                  <p className="text-xs text-gray-500 mb-1">{article.date}</p>
                )}
                <p className="text-xs text-gray-500">• {article.tag}</p>
                <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.content}</p>
                <button className="mt-2 text-sm text-black font-medium">
                  Read more →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderDetailView = () => {
    if (!selectedArticle) return null;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <button
          onClick={() => setView(activeCategory === "All" ? "home" : "list")}
          className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {activeCategory === "All" ? "home" : activeCategory}
        </button>

        <div className="mb-8">
          <p className="text-xs text-gray-500 mb-2">• {selectedArticle.tag}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {selectedArticle.title}
          </h1>
          {selectedArticle.date && (
            <p className="text-sm text-gray-500 mb-4">{selectedArticle.date}</p>
          )}
        </div>

        {selectedArticle.image && (
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-48 md:h-96 object-cover rounded-xl mb-6 md:mb-8"
          />
        )}

        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            {selectedArticle.content}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            {selectedArticle.fullContent}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-black font-inter py-8 px-8">
      <div className="w-full max-w-7xl mx-auto bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-xl shadow-xl overflow-x-hidden">
        <header className="mb-6 lg:mb-10 w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto justify-between">
            <div className="flex items-center justify-between w-full lg:w-auto">
              <h1 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
                Blog<span className="text-gray-600">Spot.</span>
              </h1>
              <button
                className="lg:hidden px-3 py-1 border rounded text-sm"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Menu
              </button>
            </div>
            <nav
              className={`flex-col py-2 gap-4 text-sm font-medium text-gray-700 w-full lg:flex lg:flex-row lg:items-center lg:gap-6 lg:ml-6 ${
                menuOpen ? "flex" : "hidden"
              }`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView("list");
                  setActiveCategory("Articles");
                  setMenuOpen(false);
                }}
                className="whitespace-nowrap"
              >
                Articles ({getCategoryCount("Articles")})
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView("list");
                  setActiveCategory("Radio");
                  setMenuOpen(false);
                }}
                className="whitespace-nowrap"
              >
                Radio ({getCategoryCount("Radio")})
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView("list");
                  setActiveCategory("Podcast");
                  setMenuOpen(false);
                }}
                className="whitespace-nowrap"
              >
                Podcast ({getCategoryCount("Podcast")})
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView("list");
                  setActiveCategory("Be a writer");
                  setMenuOpen(false);
                }}
                className="whitespace-nowrap"
              >
                Be a writer ({getCategoryCount("Be a writer")})
              </a>
            </nav>
          </div>
          {view !== "detail" && (
            <div className="w-full lg:w-1/3 lg:ml-auto mt-4 lg:mt-0">
              <div className="relative w-full">
                <FiSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-full w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        {view === "home" && renderHomeView()}
        {view === "list" && renderListView()}
        {view === "detail" && renderDetailView()}
      </div>
    </div>
  );
}
