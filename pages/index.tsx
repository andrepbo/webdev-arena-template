import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const categories = ["All", "Marine Life", "Wildlife News", "Myth & Folklore"];

const articles = [
  {
    id: 1,
    title: "Grace in the Forest: Understanding the Behavior of Deer",
    country: "CHINA",
    date: "APRIL 28, 2018",
    time: "10 MIN READ",
    category: "Wildlife News",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Deer are among the most graceful and observant creatures in the wild. In this article, we explore their behaviors during different seasons, including how they raise their fawns, navigate their territories, and detect danger using their acute senses. Discover how deer interact with each other, the role of antlers in mating rituals, and how they adapt to the increasing challenges of human encroachment in their natural habitats.",
  },
  {
    id: 2,
    title: "From Cubs to Kings: The Bears Journey to Adulthood",
    country: "RUSSIA",
    date: "APRIL 28, 2018",
    time: "10 MIN READ",
    category: "Wildlife News",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    description:
      "The journey of a bear from a vulnerable cub to a dominant force in the forest is both fascinating and inspiring. This article follows a bear’s growth through the seasons, focusing on its learning process, social habits, hunting skills, and hibernation behaviors. Learn how mother bears protect and train their young, and how adult bears assert dominance and navigate complex ecosystems in the wild.",
  },
  {
    id: 3,
    title: "Adaptable and Agile: How Foxes Thrive in Habitats",
    country: "CANADA",
    date: "APRIL 28, 2018",
    time: "10 MIN READ",
    category: "Myth & Folklore",
    image:
      "https://images.unsplash.com/photo-1595495746342-e78166acbb38?q=80&w=712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Foxes are incredibly intelligent and resourceful animals, able to thrive in diverse environments—from dense forests to urban settings. This piece dives into their diet, denning habits, communication techniques, and the myths that surround them across cultures. We also explore how their adaptability makes them both admired and misunderstood in modern conservation efforts.",
  },
  {
    id: 4,
    title: "Whale Songs and Secrets of the Deep",
    country: "HAWAI",
    date: "APRIL 28, 2018",
    time: "10 MIN READ",
    category: "Marine Life",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "Beneath the surface of our oceans lies a world of sound, and whales are among its most fascinating composers. This article explores how whales use complex vocalizations to communicate, navigate, and even form social bonds across thousands of kilometers. We also uncover how marine scientists study these songs and what they reveal about migration patterns, mating behaviors, and the health of our oceans.",
  },
  {
    id: 5,
    title: "Guardians of the Reef",
    country: "HAWAI",
    date: "APRIL 28, 2018",
    time: "10 MIN READ",
    category: "Marine Life",
    image:
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Coral reefs are often called the rainforests of the sea for their biodiversity and importance to marine ecosystems. In this article, we look at how corals support thousands of marine species, protect coastlines from erosion, and store carbon. You all also learn about the threats facing coral reefs today—such as climate change, pollution, and overfishing—and what global initiatives are doing to protect them.",
  },
  {
    id: 6,
    title: "The Tale of the Thunderbird",
    country: "USA",
    date: "APRIL 28, 2018",
    time: "10 MIN READ",
    category: "Myth & Folklore",
    image:
      "https://plus.unsplash.com/premium_photo-1661962626711-8121c34826c2?q=80&w=1161&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "The Thunderbird is a powerful figure in Native American mythology, believed to control the skies and bring thunder and rain with each flap of its mighty wings. In this article, we explore the origins of the legend, how different tribes interpret the Thunderbirds purpose, and how the myth continues to inspire modern art, storytelling, and spiritual practices. It's a compelling intersection of folklore, nature, and cultural identity.",
  },
];

export default function App() {
  const [category, setCategory] = useState("All");
  const [startIndex, setStartIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<
    (typeof articles)[0] | null
  >(null);

  const filtered =
    category === "All"
      ? articles
      : articles.filter((a) => a.category === category);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-10 font-dm-sans transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-8xl mx-auto relative md:pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-5xl md:text-8xl mb-4 md:mb-0 leading-tight tracking-tight">
            Wildlife Blog
          </h1>
          <p className="text-sm md:text-base md:max-w-md text-neutral-600 dark:text-neutral-400">
            Every article is crafted to bring you closer to nature, fostering a
            deeper connection with the world around us. <br />
            <span className="font-semibold">
              Get inspired. Get informed. Get involved.
            </span>
          </p>
        </div>

        {selectedArticle ? (
          <div>
            <button
              onClick={() => setSelectedArticle(null)}
              className="mb-6 text-sm border px-4 py-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            >
              ← Back
            </button>
            <div className="flex justify-center mb-6">
              <img
                src={selectedArticle.image}
                alt={`Cover image for ${selectedArticle.title}`}
                className="w-full max-w-4xl h-64 sm:h-80 md:h-96 object-cover rounded-xl"
              />
            </div>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                {selectedArticle.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 text-lg">
                {selectedArticle.description}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setStartIndex(0);
                  }}
                  className={`px-6 py-1 rounded-full border text-sm transition ${
                    category === cat
                      ? "bg-neutral-800 text-white dark:bg-white dark:text-black"
                      : "border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="block lg:hidden space-y-10">
              {filtered.map((article) => {
                return (
                  <div
                    key={article.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="border-t-2 border-black dark:border-white mb-4"></div>
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={article.image}
                        alt={`Cover image for ${article.title}`}
                        className={`w-full object-cover h-72 rounded-lg`}
                      />
                      <div className="pt-3 px-1">
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                          <span className="border border-neutral-400 px-2 py-0.5 rounded-full">
                            {article.country}
                          </span>
                          <div className="flex space-x-4">
                            <span>{article.date}</span>
                            <span>{article.time}</span>
                          </div>
                        </div>

                        <h2 className="text-base font-medium mt-2">
                          {article.title}
                        </h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                          {article.description.slice(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative w-full overflow-hidden hidden lg:block">
              {startIndex > 0 && (
                <button
                  onClick={() => setStartIndex(startIndex - 1)}
                  className="absolute left-[10px] top-1/2 transform -translate-y-1/2 z-10 bg-teal-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-teal-800 transition"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              {startIndex + 4 < filtered.length && (
                <button
                  onClick={() => setStartIndex(startIndex + 1)}
                  className="absolute right-[10px] top-1/2 transform -translate-y-1/2 z-10 bg-teal-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-teal-800 transition"
                >
                  <ArrowRight size={20} />
                </button>
              )}
              <div className="grid grid-cols-4 gap-6 transition-all duration-500">
                {filtered
                  .slice(startIndex, startIndex + 4)
                  .map((article, idx) => {
                    const imageHeight = idx % 2 === 0 ? "h-96" : "h-72";

                    return (
                      <div
                        key={article.id}
                        className="w-full cursor-pointer"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="border-t-2 border-black dark:border-white mb-4"></div>
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={article.image}
                            alt={`Cover image for ${article.title}`}
                            className={`w-full object-cover ${imageHeight} rounded-lg`}
                          />
                          <div className="pt-3 px-1">
                            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                              <span className="border border-neutral-400 px-2 py-0.5 rounded-full">
                                {article.country}
                              </span>
                              <div className="flex space-x-4">
                                <span>{article.date}</span>
                                <span>{article.time}</span>
                              </div>
                            </div>
                            <h2 className="text-xl font-medium mt-6">
                              {article.title}
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                              {article.description.slice(0, 100)}...
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
