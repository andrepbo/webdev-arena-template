import { Lora, Inter } from "next/font/google";
import { useEffect, useState } from "react";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
});

const blogPosts = [
  {
    id: 1,
    title: "Tips and DIY Inspiration for Creative Minds",
    date: "12 jun, 2022",
    summary:
      "Discover a universe of boundless imagination in the World of Creative Art, where canvases weave stories, sculptures breathe life, and digital realms redefine artistic expression. Unleash your inner artist with tips and inspiration for a journey into the kaleidoscope of creativity.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Morganlfay.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Wild Photography Technology",
    date: "24 jun, 2023",
    summary: "",
    image: "http://res.publicdomainfiles.com/pdf_view/86/13941201011979.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Unveiling the Power of Three-Dimensional Art",
    date: "24 jun, 2023",
    summary: "",
    image:
      "https://revistaeducacao.com.br/wp-content/uploads/2021/10/amor-incondicional-1.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Tips and Trends for Elevating Your Art Display",
    date: "24 jun, 2023",
    summary: "",
    image: "https://images.pexels.com/photos/370799/pexels-photo-370799.jpeg",
    featured: false,
  },
  {
    id: 5,
    title: "Discovering Hidden Gems Around the World",
    date: "24 jun, 2023",
    summary: "",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
    featured: false,
  },
];

const ClockIcon = () => (
  <svg
    className="inline mr-2 mb-0.5"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

type BlogPost = {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
  featured: boolean;
};

type ArticlePageProps = {
  post: BlogPost;
  onBack: () => void;
};

const ArticlePage = ({ post, onBack }: ArticlePageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9e9ef] dark:bg-[#101012]">
      <div className="relative max-w-6xl w-full min-h-[80vw] rounded-3xl shadow-xl border-8 border-[#181818] dark:border-[#262626] bg-white dark:bg-[#17181c] text-gray-800 dark:text-white p-10 md:p-16 my-10 md:my-16 flex flex-col">
        <button
          className="text-gray-800 dark:text-white text-lg md:text-xl font-serif font-semibold mb-16 flex items-center w-fit hover:bg-gray-100 dark:hover:bg-[#23232b] px-3 py-1 rounded-lg transition cursor-pointer"
          onClick={onBack}
          style={{ outline: "none", border: "none", background: "none" }}
        >
          <span className="mr-3">←</span> Back to blog
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-8">
            <ClockIcon />
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-12 text-center">
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-base mb-16 text-center max-w-2xl">
            {post.summary ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod, nisi vel consectetur cursus, nisl erat aliquet nisl, nec aliquet nunc nisl euismod."}
          </p>
          <img
            src={post.image}
            alt={post.title}
            className="rounded-xl object-cover w-full max-w-2xl max-h-[65vh] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

const BlogPage = ({
  handleReadMore,
  latestPosts,
  featuredPost,
}: {
  handleReadMore: (id: number) => void;
  latestPosts: BlogPost[];
  featuredPost: BlogPost | undefined;
}) => (
  <div className="min-h-screen flex items-center justify-center bg-[#e9e9ef] dark:bg-[#101012]">
    <div className="relative max-w-6xl w-full rounded-3xl shadow-xl border-8 border-[#181818] dark:border-[#262626] bg-white dark:bg-[#17181c] text-gray-800 dark:text-white p-10 md:p-16 my-10 md:my-16">
      <h1 className="text-4xl md:text-5xl font-serif text-gray-800 dark:text-white mb-20">
        Our Blog
      </h1>

      {featuredPost && (
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center text-base mb-4 text-gray-500 dark:text-gray-400">
                  <ClockIcon />
                  <span>{featuredPost.date}</span>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 dark:text-white mb-8 cursor-pointer"
                  onClick={() => handleReadMore(featuredPost.id)}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-base mb-5">
                  {featuredPost.summary}
                </p>
                <button
                  onClick={() => handleReadMore(featuredPost.id)}
                  className="border px-4 py-1.5 rounded-md text-sm transition border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#23232b]"
                >
                  Read More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="rounded-xl object-cover w-full h-auto max-h-[370px] md:max-h-[370px]"
              />
            </div>
          </div>
        </section>
      )}

      <section className="rounded-2xl p-6 md:p-8 bg-[#f6f7f9] dark:bg-[#262626]">
        <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-white mb-6">
          Latest Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestPosts.slice(0, 4).map((post) => (
            <div
              key={post.id}
              className="rounded-xl overflow-hidden shadow-none"
            >
              <div className="rounded-xl overflow-hidden shadow-none bg-gray-100 dark:bg-gray-800 h-44 flex items-center justify-center text-sm text-gray-500">
                Placeholder content
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const BlogAndArticleWrapper = () => {
  const [latestPosts] = useState(blogPosts.filter((post) => !post.featured));
  const featuredPost = blogPosts.find((post) => post.featured);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const handleReadMore = (id: number) => {
    const post = blogPosts.find((p) => p.id === id);
    if (post) setSelectedArticle(post);
  };

  return (
    <div className={`${lora.variable} ${inter.variable} font-sans`}>
      {selectedArticle ? (
        <ArticlePage
          post={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      ) : (
        <BlogPage
          handleReadMore={handleReadMore}
          latestPosts={latestPosts}
          featuredPost={featuredPost}
        />
      )}
    </div>
  );
};

export default BlogAndArticleWrapper;
