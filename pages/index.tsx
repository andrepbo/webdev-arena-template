import { ArrowRight, Check, Moon, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

const quizQuestions = [
  {
    question: "How often do you engage in physical activity?",
    options: [
      { text: "Daily", value: 5, emoji: "💪" },
      { text: "Several times a week", value: 4, emoji: "🙂" },
      { text: "Occasionally", value: 3, emoji: "🙄" },
      { text: "Rarely", value: 2, emoji: "☹️" },
      { text: "Never", value: 1, emoji: "💀" },
    ],
  },
  {
    question: "What motivates you most?",
    options: [
      { text: "Achieving goals and success", value: 5, emoji: "🙌" },
      { text: "Helping others", value: 4, emoji: "🤝" },
      { text: "Learning new things", value: 3, emoji: "🙂" },
      { text: "Social connections", value: 2, emoji: "👨‍👩‍👧" },
      { text: "Personal freedom", value: 1, emoji: "🗽" },
    ],
  },
  {
    question: "How do you handle stressful situations?",
    options: [
      { text: "Face them head-on", value: 5, emoji: "👊" },
      { text: "Analyze and plan a solution", value: 4, emoji: "🙄" },
      { text: "Seek advice from others", value: 3, emoji: "☎️" },
      { text: "Take time to relax and recharge", value: 2, emoji: "🛀" },
      { text: "Hope they resolve themselves", value: 1, emoji: "😣" },
    ],
  },
  {
    question: "How would you describe your social life?",
    options: [
      { text: "Extroverted and outgoing", value: 5, emoji: "🍸" },
      { text: "Social but also values alone time", value: 4, emoji: "🕺" },
      { text: "Balanced social and alone time", value: 3, emoji: "💁‍♂️" },
      { text: "More introverted, prefers small groups", value: 2, emoji: "👥" },
      { text: "Very private and prefer alone time", value: 1, emoji: "📔" },
    ],
  },
  {
    question: "What's your approach to trying new things?",
    options: [
      { text: "Love to try new things", value: 5, emoji: "😎" },
      { text: "Willing to try with encouragement", value: 4, emoji: "🤟" },
      { text: "Cautious but open to new experiences", value: 3, emoji: "🧑" },
      { text: "Prefer the familiar", value: 2, emoji: "👨‍👩‍👧" },
      { text: "Avoid new things when possible", value: 1, emoji: "✋" },
    ],
  },
];

type QuizResult = {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
};

const quizResults: QuizResult[] = [
  {
    minScore: 20,
    maxScore: 25,
    title: "Ambitious Achiever",
    description:
      "You're driven, motivated, and always striving for success. Your determination inspires others and you have a natural ability to lead.",
    emoji: "😁",
    color: "#FFD166",
  },
  {
    minScore: 15,
    maxScore: 19,
    title: "Social Connector",
    description:
      "You're a people person who brings others together. Your energy and charisma make you a magnet for social situations.",
    emoji: "🧑‍🤝‍🧑",
    color: "#06D6A0",
  },
  {
    minScore: 10,
    maxScore: 14,
    title: "Analytical Thinker",
    description:
      "You approach life with logic and careful analysis. Your thoughtful nature helps you solve complex problems and make wise decisions.",
    emoji: "🙄",
    color: "#118AB2",
  },
  {
    minScore: 5,
    maxScore: 9,
    title: "Mindful Observer",
    description:
      "You take life at your own pace, observing and reflecting. Your calm presence brings peace to those around you.",
    emoji: "👁",
    color: "#4F80FF",
  },
  {
    minScore: 0,
    maxScore: 4,
    title: "Innovative Dreamer",
    description:
      "Your imagination knows no bounds. You think outside the box and come up with creative solutions that others might not see.",
    emoji: "🧠",
    color: "#FF6B6B",
  },
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    background-color: #F0F4F8;
    font-family: 'Montserrat', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .dark-mode {
    background-color: #0D1B2A;
    color: #E2E2E2;
  }
  
  .question-container {
    animation: fadeIn 0.5s ease-out forwards;
    opacity: 0;
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
  
  .option-card {
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid #000;
  }
  
  .option-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .option-selected {
    border-color: #4CAF50;
    background-color: #4CAF5020;
    transform: translateY(-2px);
  }
  
  .dark-mode .option-selected {
    background-color: #4CAF5030;
  }
  
  .result-container {
    animation: fadeIn 0.7s ease-out forwards;
    opacity: 0;
  }
  
  .sparkle {
    position: absolute;
    animation: sparkle 1.5s infinite;
    opacity: 0.7;
  }
  
  @keyframes sparkle {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.2); opacity: 1; }
  }
  
  .progress-bar {
    transition: width 0.5s ease-out;
    height: 8px;
    border-radius: 4px;
    width: 0%;
  }
  
  .progress-container {
    height: 8px;
    border-radius: 4px;
    background-color: #E2E8F0;
    overflow: hidden;
    margin: 20px 0;
  }
  
  .dark-mode .progress-container {
    background-color: #4B263B;
  }
  
  .quiz-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 20px;
  }
  
  .quiz-card {
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 30px;
    max-width: 650px;
    width: 100%;
    margin: 20px;
    transition: background-color 0.3s ease;
  }
  
  .dark-mode .quiz-card {
    background-color: #1B263B;
  }

  .result-card {
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 12px;
    max-width: 650px;
    width: 100%;
    margin: 20px;
    transition: background-color 0.3s ease;
  }
  
  .dark-mode .result-card {
    background-color: #1B263B;
  }
  
  .question-badge {
    background-color: #4CAF50;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 10px;
    display: inline-block;
  }
  
  .theme-toggle {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }
  
  .dark-mode .theme-toggle {
    background-color: #4F80FF;
  }
  
  .result-emoji {
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .restart-button {
    background-color: #4F80FF;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 20px auto;
  }
  
 
  .restart-button:hover {
    background-color: #3A5F8A;
  }
  
  .result-typewriter {
    display: inline-block;
    overflow: hidden;
    border-right: 2px solid #4CAF50;
    white-space: nowrap;
    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }
  
  .dark-mode .result-typewriter {
    border-right-color: #4F80FF;
  }
  
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #4CAF50 }
  }
  
  .sparkles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const Sparkles = () => {
  return (
    <div className="sparkles-container">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${Math.random() * 10 + 10}px`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [darkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleAnswer = () => {
    if (!selectedOption || animating) return;
    setAnimating(true);

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnimating(false);
      } else {
        calculateResult(newAnswers);
        setAnimating(false);
        setShowResult(true);
      }
    }, 300);
  };

  const calculateResult = (answers: number[]) => {
    const totalScore = answers.reduce((sum, value) => sum + value, 0);

    const result =
      quizResults.find(
        (r) => totalScore >= r.minScore && totalScore <= r.maxScore
      ) || quizResults[2];

    setResult(result);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowResult(false);
    setSelectedOption(null);
  };

  const progressPercentage =
    ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div
      className={`quiz-container ${
        darkMode ? "text-gray-200" : "text-gray-800"
      } `}
    >
      <style jsx global>
        {globalStyles}
      </style>

      <div className="text-5xl font-black">Perchecks</div>
      <div className="text-xl font-medium mb-6">Personality discovery quiz</div>

      <div
        className={`${
          showResult ? "hidden" : ""
        } relative w-full max-w-[620px] bg-[#F1F1F1] border-[2px] border-black h-5 rounded-2xl `}
      >
        <div
          className="absolute -top-[2px] -mt-0 h-5 -left-[2px] rounded-2xl border-[2px] border-black "
          style={{
            width: `${progressPercentage < 100 ? progressPercentage : 101}%`,
            backgroundColor: "#FDA16E",
          }}
        />
      </div>
      <div
        className={`${
          showResult ? "hidden" : ""
        } flex w-full max-w-[620px] mt-2 font-medium`}
      >
        Question {currentQuestion + 1}/{quizQuestions.length}
      </div>

      {!showResult ? (
        <div className="quiz-card relative border-[2px] border-black">
          <div
            className={`absolute w-full h-full top-0 left-0 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-3xl border-[2px] border-black transform rotate-[-3deg] -z-10`}
          />
          <div className="question-container p-6">
            <h2 className="text-2xl font-bold mb-6">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, idx) => (
                <div
                  key={idx}
                  className={`option-card p-4 rounded-xl flex items-center border border-black cursor-pointer ${
                    selectedOption === option.value
                      ? "option-selected bg-green-50 border-green-500"
                      : darkMode
                      ? "bg-gray-600/50 border border-gray-700"
                      : "bg-gray-100 border border-gray-200"
                  } ${
                    !animating && !selectedOption
                      ? `${
                          darkMode
                            ? "hover:bg-gray-50 hover:text-gray-800"
                            : "hover:bg-gray-800/80 hover:text-gray-200"
                        }`
                      : ""
                  }`}
                  onClick={() => !animating && setSelectedOption(option.value)}
                >
                  <div className="text-2xl mr-3">{option.emoji}</div>
                  <div className="flex-1 font-medium">{option.text}</div>
                  {selectedOption === option.value && (
                    <div className="text-green-500">
                      <Check size={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-container relative">
          {result && (
            <>
              <div className="result-card relative bg-white rounded-xl border-[2px] border-black md:p-2">
                <div
                  className={`absolute w-full h-full top-0 left-0 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-3xl border-[2px] border-black transform rotate-[-3deg] -z-10`}
                />

                <Sparkles />

                <div className="text-center mb-2">
                  <div className="result-emoji text-6xl mb-4">
                    <span className="text-8xl">{result.emoji}</span>
                  </div>
                  <h1
                    className="flex flex-col text-3xl font-bold mb-3 result-typewriter"
                    // style={{ color: result.color }}
                  >
                    <div>You&apos;re a </div>
                    <div>{result.title}!</div>
                  </h1>
                  <p
                    className={`${
                      darkMode ? "text-gray-200" : "text-gray-800 "
                    } mb-2 `}
                  >
                    {result.description}
                  </p>
                </div>
              </div>
              <div className="result-card relative border-[2px] border-black md:p-2">
                <div
                  className={`absolute w-full h-full top-0 left-0 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-3xl border-[2px] border-black transform rotate-[-3deg] -z-10`}
                />

                <div className={`mt-2 p-3 rounded-xl  relative`}>
                  <h3 className={`font-semibold mb-2 text-lg `}>
                    Personality Summary
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 mb-3">
                    <div className="flex items-center">
                      <Users
                        size={20}
                        className={`mr-2 ${
                          darkMode ? "text-blue-400" : "text-blue-700"
                        }`}
                      />
                      <span className="font-medium">Social</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp
                        size={20}
                        className={`mr-2 ${
                          darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                      />
                      <span className="font-medium">Ambitious</span>
                    </div>
                    <div className="flex items-center">
                      <Moon
                        size={20}
                        className={`mr-2 ${
                          darkMode ? "text-indigo-400" : "text-indigo-700"
                        }`}
                      />
                      <span className="font-medium">Reflective</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-bold mb-3">Strengths:</h4>
                    <ul
                      className={`text-left ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } space-y-2`}
                    >
                      <li className="flex items-center">
                        <Check size={16} className="mr-2 text-green-500" />
                        Natural leader with clear vision
                      </li>
                      <li className="flex items-center">
                        <Check size={16} className="mr-2 text-green-500" />
                        Excellent problem-solver
                      </li>
                      <li className="flex items-center">
                        <Check size={16} className="mr-2 text-green-500" />
                        Strong communication skills
                      </li>
                      <li className="flex items-center">
                        <Check size={16} className="mr-2 text-green-500" />
                        Resilient and determined
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!showResult ? (
        <div className="mt-8 flex justify-end w-full max-w-[620px]">
          <button
            className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 border-2 border-black 
              ${
                darkMode
                  ? "bg-gray-100 text-gray-800"
                  : "bg-[#705774] text-white"
              }
              ${!selectedOption || animating ? "cursor-not-allowed" : ""}
            }`}
            disabled={!selectedOption || animating}
            onClick={() => handleAnswer()}
          >
            {currentQuestion < quizQuestions.length - 1 ? "Next" : "Finish"}
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <button
          className={`px-6 py-2 rounded-full font-medium ${
            darkMode ? "bg-gray-100 text-gray-800" : "bg-[#705774] text-white"
          } border-2 border-black `}
          onClick={restartQuiz}
        >
          Take Quiz Again
        </button>
      )}
    </div>
  );
};

export default PersonalityQuiz;
