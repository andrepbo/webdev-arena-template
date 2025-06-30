import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart2,
  TrendingUp,
  Calendar,
  PlusCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Settings,
  Share2,
  Trophy,
  Home,
  Upload,
  Zap,
  Thermometer,
  LayoutGrid,
  SquareActivity,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { Onest } from "next/font/google";

// --- useIsMdOrBelow hook (inline) ---
function useIsMdOrBelow() {
  const [isMdOrBelow, setIsMdOrBelow] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setIsMdOrBelow(window.innerWidth < 1024);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMdOrBelow;
}

type Mood = "sad" | "anxious" | "angry" | "tired" | "neutral" | "happy";
type MoodEntry = {
  day: string;
  mood: Mood;
  date: string;
  timestamp: number;
  notes?: string;
  tags?: string[];
};

type ChartDataPoint = {
  day: string;
  value: number;
  mood: Mood;
};

type Streak = {
  count: number;
  lastDate: string;
};

const moodEmojis = {
  sad: "😔",
  anxious: "😰",
  angry: "😠",
  tired: "😴",
  neutral: "😐",
  happy: "😄",
};

const moodLabels = {
  sad: "Sad",
  anxious: "Anxious",
  angry: "Angry",
  tired: "Tired",
  neutral: "Neutral",
  happy: "Happy",
};

const moodColors: Record<Mood, string> = {
  sad: "#8AE1FF",
  anxious: "#FEADFF",
  angry: "#FF8181",
  tired: "#B2BCFF",
  neutral: "#E0EDFF",
  happy: "#98E6A8",
};

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const MoodTracker: React.FC = () => {
  const [mood, setMood] = useState<Mood>("neutral");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showWeeklyChart, setShowWeeklyChart] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [streak, setStreak] = useState<Streak>({ count: 0, lastDate: "" });
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "info" | "success" | "error";
  } | null>(null);
  const isMobile = useIsMobile();
  const isMdOrBelow = useIsMdOrBelow();
  const notesMobileRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("moodHistory");
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }

    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) {
      setStreak(JSON.parse(savedStreak));
    }

    if (moodHistory.length > 0) {
      const lastEntry = moodHistory[moodHistory.length - 1];
      const today = new Date().toISOString().split("T")[0];

      if (lastEntry.date !== today) {
        setShowWeeklyChart(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

    if (moodHistory.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const lastEntry = moodHistory[moodHistory.length - 1];

      if (lastEntry.date === today) {
        setShowWeeklyChart(false);
      } else {
        setShowWeeklyChart(true);
      }
    } else {
      setShowWeeklyChart(true);
    }
  }, [moodHistory]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);

  const calculateStreak = (history: MoodEntry[]): Streak => {
    if (history.length === 0) return { count: 0, lastDate: "" };

    let currentStreak = 1;
    let lastDate = new Date(history[history.length - 1].date);

    for (let i = history.length - 2; i >= 0; i--) {
      const entryDate = new Date(history[i].date);
      const dayDifference =
        (lastDate.getTime() - entryDate.getTime()) / (1000 * 3600 * 24);

      if (dayDifference === 1) {
        currentStreak++;
        lastDate = entryDate;
      } else if (dayDifference > 1) {
        break;
      }
    }

    const today = new Date().toISOString().split("T")[0];
    const lastEntryDate = new Date(history[history.length - 1].date)
      .toISOString()
      .split("T")[0];

    if (lastEntryDate === today) {
      return { count: currentStreak, lastDate: today };
    } else {
      return { count: currentStreak, lastDate: lastEntryDate };
    }
  };

  useEffect(() => {
    if (moodHistory.length > 0) {
      const newStreak = calculateStreak(moodHistory);
      setStreak(newStreak);
    }
  }, [moodHistory]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addMoodEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const notes = notesMobileRef.current?.value || "";
    const today = new Date().toISOString().split("T")[0];

    const existingEntry = moodHistory.find((entry) => entry.date === today);
    if (existingEntry) {
      setToast({
        message: "You already logged your mood for today!",
        type: "info",
      });
      return;
    }

    const newEntry: MoodEntry = {
      day: new Date().toLocaleDateString("en-US", { weekday: "short" }),
      mood,
      date: today,
      timestamp: Date.now(),
      notes: notes.trim() || undefined,
      tags: tags.length > 0 ? [...tags] : undefined,
    };

    const updatedHistory = [...moodHistory, newEntry];
    setMoodHistory(updatedHistory);
    setMood("neutral");
    setNotes("");
    setTags([]);
    setShowWeeklyChart(false);

    const newStreak = calculateStreak(updatedHistory);
    setStreak(newStreak);

    if (updatedHistory.length % 7 === 0) {
      setShowStreakModal(true);
    } else {
      setShowSuccessModal(true);
    }
  };

  const exportMoodData = () => {
    const dataStr = JSON.stringify(moodHistory, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportFileName = `mood_tracker_data_${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileName);
    linkElement.click();
    setToast({ message: "Data exported successfully!", type: "success" });
  };

  const shareMoodData = () => {
    const shareText = "Check out my mood tracking data!";
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "Mood Tracker Data",
          text: shareText,
          url: shareUrl,
        })
        .then(() =>
          setToast({ message: "Shared successfully!", type: "success" })
        )
        .catch(() => setToast({ message: "Sharing failed!", type: "error" }));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setToast({ message: "Link copied to clipboard!", type: "success" });
    }
  };

  const prepareChartData = (): ChartDataPoint[] => {
    if (moodHistory.length === 0) return [];

    const today = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const moodValues: Record<Mood, number> = {
      sad: 1,
      anxious: 2,
      angry: 3,
      tired: 4,
      neutral: 5,
      happy: 6,
    };

    const dataMap = new Map<string, ChartDataPoint>();

    weekDays.forEach((day) => {
      const dayOfWeek = new Date(day).toLocaleDateString("en-US", {
        weekday: "short",
      });
      dataMap.set(day, {
        day: dayOfWeek,
        value: 3, // Default to 'meh' if no data
        mood: "neutral",
      });
    });

    moodHistory.forEach((entry) => {
      if (dataMap.has(entry.date)) {
        const entryMood = entry.mood;
        dataMap.set(entry.date, {
          day: entry.day,
          value: moodValues[entryMood],
          mood: entryMood,
        });
      }
    });

    return Array.from(dataMap.values());
  };

  const prepareWeeklySummary = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weeklyEntries = moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo && entryDate <= today;
    });

    const moodCounts: Record<Mood, number> = {
      sad: 0,
      anxious: 0,
      angry: 0,
      tired: 0,
      neutral: 0,
      happy: 0,
    };

    weeklyEntries.forEach((entry) => {
      moodCounts[entry.mood] += 1;
    });

    return {
      totalEntries: weeklyEntries.length,
      moodCounts,
      averageMood: calculateAverageMood(weeklyEntries),
    };
  };

  const calculateAverageMood = (entries: MoodEntry[]): string => {
    if (entries.length === 0) return "No data";

    const moodValues = {
      sad: 1,
      anxious: 2,
      angry: 3,
      tired: 4,
      neutral: 5,
      happy: 6,
    };

    const total = entries.reduce(
      (sum, entry) => sum + moodValues[entry.mood],
      0
    );
    const average = total / entries.length;

    if (average <= 1.5) return "Mostly awful";
    if (average <= 2.5) return "Mostly bad";
    if (average <= 3.5) return "Mostly meh";
    if (average <= 4.5) return "Mostly good";
    return "Mostly amazing";
  };

  const preparePieChartData = () => {
    const summary = prepareWeeklySummary();
    const data = [];

    if (summary.moodCounts.sad > 0)
      data.push({ name: "Sad", value: summary.moodCounts.sad });
    if (summary.moodCounts.anxious > 0)
      data.push({ name: "Anxious", value: summary.moodCounts.anxious });
    if (summary.moodCounts.angry > 0)
      data.push({ name: "Angry", value: summary.moodCounts.angry });
    if (summary.moodCounts.tired > 0)
      data.push({ name: "Tired", value: summary.moodCounts.tired });
    if (summary.moodCounts.neutral > 0)
      data.push({ name: "Neutral", value: summary.moodCounts.neutral });
    if (summary.moodCounts.happy > 0)
      data.push({ name: "Happy", value: summary.moodCounts.happy });

    return data;
  };

  const getMoodEmoji = (mood: Mood): string => {
    return moodEmojis[mood];
  };

  const getMoodLabel = (mood: Mood): string => {
    return moodLabels[mood];
  };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  const resetTodayEntry = () => {
    const today = new Date().toISOString().split("T")[0];
    const updatedHistory = moodHistory.filter((entry) => entry.date !== today);
    setMoodHistory(updatedHistory);
    setShowWeeklyChart(true);
    setToast({
      message: "Today's entry reset successfully!",
      type: "success",
    });
  };

  // --- Most Frequent Mood Calculation ---
  const getMostFrequentMood = (history: MoodEntry[]): Mood | null => {
    if (!history.length) return null;
    const counts: Record<Mood, number> = {
      sad: 0,
      anxious: 0,
      angry: 0,
      tired: 0,
      neutral: 0,
      happy: 0,
    };
    history.forEach((entry) => {
      counts[entry.mood] += 1;
    });
    let maxMood: Mood = "neutral";
    let maxCount = 0;
    (Object.keys(counts) as Mood[]).forEach((mood) => {
      if (counts[mood] > maxCount) {
        maxMood = mood;
        maxCount = counts[mood];
      }
    });
    return maxCount > 0 ? maxMood : null;
  };

  const mostFrequentMood = getMostFrequentMood(moodHistory);

  const chartData = prepareChartData();
  const pieChartData = preparePieChartData();
  const summary = prepareWeeklySummary();

  // Compute Best Day of the Week
  let bestDayOfWeekText = "No data available";
  if (moodHistory.length > 0) {
    const dayCounts: Record<string, { count: number; total: number }> = {};
    moodHistory.forEach((entry) => {
      if (!dayCounts[entry.day]) {
        dayCounts[entry.day] = { count: 0, total: 0 };
      }
      const moodValue =
        entry.mood === "happy"
          ? 6
          : entry.mood === "neutral"
          ? 5
          : entry.mood === "tired"
          ? 4
          : entry.mood === "angry"
          ? 3
          : entry.mood === "anxious"
          ? 2
          : 1;
      dayCounts[entry.day].count += moodValue;
      dayCounts[entry.day].total += 1;
    });
    let bestDay = "";
    let bestAvg = 0;
    Object.entries(dayCounts).forEach(([day, data]) => {
      const avg = data.count / data.total;
      if (avg > bestAvg) {
        bestAvg = avg;
        bestDay = day;
      }
    });
    const moodNames = ["Sad", "Anxious", "Angry", "Tired", "Neutral", "Happy"];
    const moodIndex = Math.round(bestAvg) - 1;
    const moodName = moodNames[moodIndex] || "Good";
    bestDayOfWeekText = `${bestDay}s tend to be your best days (${moodName} mood)`;
  }

  // Compute Best Time of Day
  let bestTimeOfDayText = "No data available";
  if (moodHistory.length > 0) {
    const today = new Date();
    const todayDayOfWeek = today.getDay();
    const currentDayEntries = moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getDay() === todayDayOfWeek;
    });
    if (currentDayEntries.length === 0) {
      bestTimeOfDayText = "You've never logged on this day of the week";
    } else {
      let bestMood: Mood = "neutral";
      let bestTime: string | null = null;
      let bestMoodValue = 3; // meh
      currentDayEntries.forEach((entry) => {
        const entryDate = new Date(entry.date);
        const hour = entryDate.getHours();
        const moodValue =
          entry.mood === "happy"
            ? 6
            : entry.mood === "neutral"
            ? 5
            : entry.mood === "tired"
            ? 4
            : entry.mood === "angry"
            ? 3
            : entry.mood === "anxious"
            ? 2
            : 1;
        if (moodValue > bestMoodValue) {
          bestMoodValue = moodValue;
          bestMood = entry.mood;
          bestTime =
            hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
        }
      });
      bestTimeOfDayText = `Your ${bestTime} tends to be the most positive time of day on ${new Date().toLocaleDateString(
        "en-US",
        { weekday: "long" }
      )}s (${bestMood} mood)`;
    }
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { payload: ChartDataPoint }[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className={`${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          } border rounded-lg p-3 transition-all duration-200`}
        >
          <p
            className={`font-medium ${
              darkMode ? "text-white" : "text-[#111F4B]"
            }`}
          >{`${data.day}: ${getMoodLabel(data.mood)}`}</p>
          <p
            className={`text-sm ${darkMode ? "text-white" : "text-[#111F4B]"}`}
          >
            {data.value === 1
              ? "Awful"
              : data.value === 2
              ? "Bad"
              : data.value === 3
              ? "Meh"
              : data.value === 4
              ? "Good"
              : "Amazing"}
          </p>
          <div className="flex items-center mt-1">
            <span className="text-lg">{getMoodEmoji(data.mood)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const getStreakMessage = (count: number): string => {
    if (count === 0)
      return "You haven't started your mood tracking streak yet.";
    if (count === 1)
      return "You've started your mood tracking streak! Keep it up!";
    if (count < 5)
      return `You're on a ${count} day mood tracking streak. Keep going!`;
    if (count < 10)
      return `Great job on your ${count} day mood tracking streak! You're getting into a habit!`;
    if (count < 30)
      return `Incredible ${count} day mood tracking streak! You're really committed to tracking your mental health!`;
    return `Amazing! You have been tracking your mood consistently for ${count} days straight. Keep up the good work!`;
  };

  // Mood Entry Form as a component for reus
  const MoodEntryForm = ({ id }: { id?: string }) => (
    <section
      id={id}
      className="bg-white dark:bg-[#102464] rounded-2xl border border-neutral-200 dark:border-[#23232a] p-6 flex flex-col gap-6 transition-colors duration-300 w-full max-w-full mb-6"
    >
      <h2 className="text-4xl font-semibold text-[#111F4B] dark:text-white mb-2">
        How are you feeling today?
      </h2>
      <div className="grid grid-cols-3 gap-[16px] md:gap-[20px] mb-2 w-full max-w-full">
        {[
          {
            m: "sad",
            icon: (
              <span
                className="text-3xl"
                role="img"
                aria-label="Sad"
                style={{ color: "#8AE1FF" }}
              >
                😔
              </span>
            ),
          },
          {
            m: "anxious",
            icon: (
              <span
                className="text-3xl"
                role="img"
                aria-label="Anxious"
                style={{ color: "#FEADFF" }}
              >
                😰
              </span>
            ),
          },
          {
            m: "angry",
            icon: (
              <span
                className="text-3xl"
                role="img"
                aria-label="Angry"
                style={{ color: "#FF8181" }}
              >
                😠
              </span>
            ),
          },
          {
            m: "tired",
            icon: (
              <span
                className="text-3xl"
                role="img"
                aria-label="Tired"
                style={{ color: "#B2BCFF" }}
              >
                😴
              </span>
            ),
          },
          {
            m: "neutral",
            icon: (
              <span
                className="text-3xl"
                role="img"
                aria-label="Neutral"
                style={{ color: "#E0EDFF" }}
              >
                😐
              </span>
            ),
          },
          {
            m: "happy",
            icon: (
              <span
                className="text-3xl"
                role="img"
                aria-label="Happy"
                style={{ color: "#98E6A8" }}
              >
                😄
              </span>
            ),
          },
        ].map(({ m, icon }) => (
          <button
            key={m}
            type="button"
            onClick={() => setMood(m as Mood)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] cursor-pointer min-w-[56px] md:min-h-[100px] py-[12px] justify-center w-full border-2 border-transparent
              ${mood === m ? "scale-120" : ""}
              ${
                mood === m && m === "neutral"
                  ? "border-[#111F4B] dark:border-white"
                  : ""
              }
              hover:scale-105 hover:shadow-lg hover:brightness-105
            `}
            style={{
              background: moodColors[m as Mood],
              transform: mood === m ? "md:scale(1.1) scale(1.2)" : undefined,
              transition:
                "transform 0.1s cubic-bezier(.4,1.2,.6,1), background 0.1s, border-color 0.1s",
            }}
          >
            {icon}
            <span
              className={`text-xs font-medium ${
                mood === m ? "text-[#111F4B] " : "text-[#111F4B]"
              }`}
            >
              {getMoodLabel(m as Mood)}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full max-w-full">
        <label
          htmlFor="notes"
          className="text-sm font-medium text-[#111F4B] dark:text-white"
        >
          Notes
        </label>
        <textarea
          id="notes1"
          ref={notesMobileRef}
          className="w-full max-w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1B3380] text-[#111F4B] dark:text-neutral-200 border border-[#BBD2F2] focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 resize-none text-sm"
          rows={3}
          placeholder="What&#39;s on your mind?"
        />
      </div>

      <button
        type="submit"
        onClick={addMoodEntry}
        className="bg-[#111F4B] text-white dark:bg-[#8AE1FF] dark:text-[#000E38] font-black text-base px-5 py-[14px] leading-none rounded-[8px] transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] flex items-center justify-center gap-2 w-full min-h-[48px]  focus:outline-none focus-visible:ring-2 uppercase focus-visible:ring-cyan-400 hover:shadow-xl hover:scale-[1.04] hover:from-blue-500 hover:to-cyan-500"
      >
        Log my Mood
      </button>
    </section>
  );
  return (
    <>
      <div
        className="min-h-screen bg-[#D1E4FF] dark:bg-[#000E38] font-sans transition-colors duration-300"
        style={{ fontFamily: onest.style.fontFamily }}
      >
        <header className="sticky  top-0 z-50 w-full bg-white dark:bg-[#102464] backdrop-blur  flex-wrap items-center  gap-2 px-4 sm:px-6 md:px-10 xl:px-20 py-4 transition-colors duration-300 overflow-x-auto">
          <div className="mx-auto container flex justify-between items-center gap-2 px-6 md:px-10">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-200"
              >
                <svg
                  width="382"
                  height="36"
                  viewBox="0 0 382 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[32px] w-[200px] text-[#111F4B] dark:text-[#E0EDFF]"
                >
                  <path
                    d="M369.167 35.296C366.498 35.296 364.323 34.7028 362.642 33.5164C360.961 32.3299 359.725 30.748 358.934 28.7707C358.143 26.7604 357.748 24.5194 357.748 22.0477C357.748 19.4771 358.176 17.1867 359.033 15.1764C359.923 13.1331 361.225 11.5347 362.938 10.3813C364.685 9.2278 366.86 8.65107 369.464 8.65107C370.551 8.65107 371.639 8.79937 372.726 9.09597C373.814 9.35962 374.852 9.78805 375.841 10.3813C376.829 10.9745 377.67 11.7819 378.362 12.8035V0.0495605H381.872V34.9994H378.51L378.362 30.5503C377.703 31.7038 376.879 32.6265 375.89 33.3186C374.901 34.0107 373.83 34.5215 372.677 34.8511C371.523 35.1477 370.353 35.296 369.167 35.296ZM369.612 32.2311C371.523 32.2311 373.122 31.7697 374.407 30.8469C375.725 29.8912 376.714 28.6224 377.373 27.0405C378.065 25.4586 378.411 23.7284 378.411 21.8499C378.411 19.9385 378.082 18.2248 377.423 16.7088C376.796 15.1928 375.841 13.9899 374.555 13.1001C373.27 12.1774 371.639 11.716 369.661 11.716C367.651 11.716 366.02 12.1938 364.767 13.1496C363.548 14.0723 362.658 15.3247 362.098 16.9065C361.538 18.4555 361.258 20.1692 361.258 22.0477C361.258 23.3989 361.389 24.6842 361.653 25.9035C361.95 27.1229 362.411 28.2104 363.037 29.1662C363.696 30.1219 364.553 30.8799 365.608 31.4401C366.695 31.9674 368.03 32.2311 369.612 32.2311Z"
                    fill="currentColor"
                  />
                  <path
                    d="M341.02 34.9993V8.94761H344.381L344.529 13.5944C345.188 12.3421 345.996 11.3699 346.952 10.6778C347.94 9.98572 349.011 9.49138 350.165 9.19478C351.351 8.86522 352.554 8.70044 353.773 8.70044C353.971 8.70044 354.152 8.70044 354.317 8.70044C354.482 8.70044 354.663 8.70044 354.861 8.70044V11.9136H353.724C351.549 11.9136 349.769 12.375 348.385 13.2978C347.034 14.2206 346.045 15.4729 345.419 17.0548C344.826 18.6367 344.529 20.3998 344.529 22.3442V34.9993H341.02Z"
                    fill="currentColor"
                  />
                  <path
                    d="M321.952 35.2958C320.832 35.2958 319.728 35.164 318.64 34.9003C317.553 34.6037 316.564 34.1588 315.674 33.5656C314.784 32.9394 314.059 32.1485 313.499 31.1928C312.972 30.2041 312.708 29.0506 312.708 27.7324C312.708 26.2494 312.972 25.0135 313.499 24.0248C314.059 23.0362 314.801 22.2452 315.723 21.652C316.646 21.0588 317.701 20.6469 318.887 20.4162C320.074 20.1525 321.326 20.0207 322.644 20.0207H330.9C330.9 18.4058 330.669 16.9887 330.208 15.7694C329.779 14.517 329.054 13.5284 328.033 12.8033C327.044 12.0783 325.709 11.7158 324.028 11.7158C323.139 11.7158 322.282 11.8147 321.458 12.0124C320.634 12.2101 319.892 12.5397 319.233 13.0011C318.607 13.4295 318.113 14.0227 317.75 14.7807H313.993C314.29 13.6272 314.784 12.655 315.476 11.8641C316.201 11.0731 317.042 10.447 317.997 9.9856C318.953 9.49126 319.958 9.14522 321.013 8.94748C322.068 8.74975 323.073 8.65088 324.028 8.65088C327.719 8.65088 330.356 9.7549 331.938 11.963C333.52 14.171 334.311 17.137 334.311 20.8611V34.9992H331.295L331.147 31.4399C330.422 32.4286 329.548 33.2031 328.527 33.7633C327.538 34.3236 326.484 34.7191 325.363 34.9497C324.243 35.1804 323.106 35.2958 321.952 35.2958ZM322.199 32.2309C323.814 32.2309 325.281 31.9672 326.599 31.4399C327.917 30.8797 328.955 30.0558 329.713 28.9682C330.504 27.8807 330.9 26.5295 330.9 24.9147V22.9373H325.066C324.045 22.9373 323.007 22.9702 321.952 23.0362C320.898 23.0691 319.942 23.2339 319.085 23.5305C318.228 23.7942 317.536 24.2391 317.009 24.8652C316.481 25.4584 316.218 26.3153 316.218 27.4358C316.218 28.5563 316.498 29.4791 317.058 30.2041C317.618 30.8962 318.36 31.407 319.283 31.7365C320.205 32.0661 321.178 32.2309 322.199 32.2309Z"
                    fill="currentColor"
                  />
                  <path
                    d="M295.473 35.2958C292.737 35.2958 290.447 34.7355 288.601 33.615C286.756 32.4616 285.372 30.8797 284.449 28.8694C283.559 26.8591 283.114 24.5686 283.114 21.998C283.114 19.3945 283.576 17.1041 284.498 15.1267C285.421 13.1164 286.805 11.5345 288.651 10.3811C290.496 9.22761 292.787 8.65088 295.522 8.65088C298.258 8.65088 300.531 9.22761 302.344 10.3811C304.19 11.5345 305.557 13.1164 306.447 15.1267C307.37 17.1041 307.831 19.3945 307.831 21.998C307.831 24.5686 307.37 26.8591 306.447 28.8694C305.524 30.8797 304.14 32.4616 302.295 33.615C300.482 34.7355 298.208 35.2958 295.473 35.2958ZM295.473 32.2309C297.516 32.2309 299.197 31.786 300.515 30.8962C301.833 29.9734 302.805 28.7375 303.432 27.1886C304.058 25.6397 304.371 23.9095 304.371 21.998C304.371 20.0866 304.058 18.3564 303.432 16.8075C302.805 15.2586 301.833 14.0227 300.515 13.0999C299.197 12.1772 297.516 11.7158 295.473 11.7158C293.429 11.7158 291.749 12.1772 290.43 13.0999C289.112 14.0227 288.14 15.2586 287.514 16.8075C286.921 18.3564 286.624 20.0866 286.624 21.998C286.624 23.9095 286.921 25.6397 287.514 27.1886C288.14 28.7375 289.112 29.9734 290.43 30.8962C291.749 31.786 293.429 32.2309 295.473 32.2309Z"
                    fill="currentColor"
                  />
                  <path
                    d="M266.334 35.296C265.18 35.296 264.06 35.1642 262.972 34.9005C261.885 34.6369 260.88 34.1919 259.957 33.5658C259.034 32.9396 258.243 32.1322 257.584 31.1435L257.436 34.9994H254.124V0.0495605H257.634V13.2484C258.622 11.6336 259.94 10.4636 261.588 9.73862C263.269 9.01358 265.016 8.65107 266.828 8.65107C269.465 8.65107 271.623 9.24428 273.304 10.4307C274.985 11.6171 276.221 13.2155 277.012 15.2258C277.836 17.2361 278.248 19.4771 278.248 21.9488C278.248 24.4535 277.803 26.7274 276.913 28.7707C276.023 30.781 274.705 32.3794 272.958 33.5658C271.211 34.7192 269.003 35.296 266.334 35.296ZM266.285 32.2311C268.328 32.2311 269.959 31.7697 271.178 30.8469C272.398 29.8912 273.288 28.6389 273.848 27.0899C274.441 25.541 274.738 23.8438 274.738 21.9982C274.738 20.1197 274.458 18.406 273.897 16.8571C273.337 15.3082 272.431 14.0723 271.178 13.1496C269.926 12.1938 268.278 11.716 266.235 11.716C264.357 11.716 262.758 12.2268 261.44 13.2484C260.155 14.2701 259.183 15.5718 258.523 17.1537C257.864 18.7356 257.535 20.3669 257.535 22.0477C257.535 23.8603 257.831 25.541 258.425 27.0899C259.051 28.6389 260.006 29.8912 261.292 30.8469C262.577 31.7697 264.241 32.2311 266.285 32.2311Z"
                    fill="currentColor"
                  />
                  <path
                    d="M224.917 34.9994V0.0495605H228.427V13.3473C229.086 12.2927 229.894 11.4194 230.849 10.7273C231.805 10.0352 232.843 9.5244 233.964 9.19484C235.084 8.83233 236.254 8.65107 237.473 8.65107C240.011 8.65107 242.005 9.17836 243.455 10.233C244.905 11.2875 245.927 12.7211 246.52 14.5337C247.146 16.3133 247.459 18.3401 247.459 20.6141V34.9994H243.949V21.8994C243.949 20.647 243.867 19.4277 243.702 18.2413C243.537 17.0219 243.208 15.9179 242.713 14.9292C242.252 13.9405 241.544 13.166 240.588 12.6058C239.665 12.0126 238.429 11.716 236.88 11.716C235.397 11.716 234.112 12.0291 233.024 12.6552C231.937 13.2484 231.047 14.0723 230.355 15.1269C229.696 16.1815 229.202 17.3514 228.872 18.6367C228.575 19.8891 228.427 21.1743 228.427 22.4926V34.9994H224.917Z"
                    fill="currentColor"
                  />
                  <path
                    d="M209.205 35.2958C208.052 35.2958 206.898 35.1969 205.745 34.9992C204.591 34.7685 203.504 34.3895 202.482 33.8622C201.461 33.3349 200.587 32.6264 199.862 31.7365C199.17 30.8467 198.692 29.7592 198.429 28.4739H202.037C202.433 29.4296 203.026 30.1876 203.817 30.7479C204.641 31.2752 205.547 31.6542 206.536 31.8848C207.525 32.1155 208.464 32.2309 209.354 32.2309C209.98 32.2309 210.672 32.1979 211.43 32.132C212.221 32.0331 212.962 31.8354 213.654 31.5388C214.346 31.2422 214.907 30.8138 215.335 30.2535C215.797 29.6933 216.027 28.9518 216.027 28.029C216.027 27.2051 215.829 26.546 215.434 26.0516C215.071 25.5573 214.577 25.1618 213.951 24.8652C213.325 24.5686 212.633 24.3544 211.875 24.2226C210.688 23.9589 209.42 23.7118 208.068 23.4811C206.717 23.2504 205.498 22.8384 204.41 22.2452C203.751 22.0145 203.108 21.7344 202.482 21.4048C201.889 21.0423 201.345 20.6139 200.851 20.1196C200.357 19.6252 199.961 19.032 199.665 18.3399C199.368 17.6479 199.22 16.8404 199.22 15.9177C199.22 14.6324 199.483 13.5284 200.011 12.6056C200.538 11.6828 201.246 10.9248 202.136 10.3316C203.059 9.73843 204.114 9.31 205.3 9.04635C206.486 8.7827 207.739 8.65088 209.057 8.65088C210.639 8.65088 212.089 8.89805 213.407 9.39239C214.758 9.85377 215.879 10.5623 216.769 11.518C217.691 12.4738 218.268 13.6767 218.499 15.1267H215.236C214.874 14.0392 214.116 13.1988 212.962 12.6056C211.809 12.0124 210.474 11.7158 208.958 11.7158C208.398 11.7158 207.755 11.7652 207.03 11.8641C206.305 11.963 205.613 12.1607 204.954 12.4573C204.295 12.7209 203.751 13.1329 203.323 13.6931C202.894 14.2204 202.68 14.9455 202.68 15.8682C202.68 16.7251 202.894 17.4336 203.323 17.9939C203.751 18.5541 204.344 18.9991 205.102 19.3286C205.86 19.6252 206.684 19.8889 207.574 20.1196C208.662 20.3503 209.848 20.5809 211.133 20.8116C212.451 21.0094 213.539 21.2401 214.396 21.5037C215.483 21.8333 216.406 22.2782 217.164 22.8384C217.922 23.3987 218.499 24.0908 218.894 24.9147C219.29 25.7056 219.488 26.6613 219.488 27.7818C219.488 29.2978 219.191 30.5501 218.598 31.5388C218.005 32.4945 217.197 33.2525 216.176 33.8128C215.187 34.3401 214.083 34.7191 212.863 34.9497C211.644 35.1804 210.425 35.2958 209.205 35.2958Z"
                    fill="currentColor"
                  />
                  <path
                    d="M180.795 35.2958C179.675 35.2958 178.571 35.164 177.483 34.9003C176.396 34.6037 175.407 34.1588 174.517 33.5656C173.627 32.9394 172.902 32.1485 172.342 31.1928C171.815 30.2041 171.551 29.0506 171.551 27.7324C171.551 26.2494 171.815 25.0135 172.342 24.0248C172.902 23.0362 173.644 22.2452 174.566 21.652C175.489 21.0588 176.544 20.6469 177.73 20.4162C178.917 20.1525 180.169 20.0207 181.487 20.0207H189.743C189.743 18.4058 189.512 16.9887 189.051 15.7694C188.622 14.517 187.897 13.5284 186.876 12.8033C185.887 12.0783 184.552 11.7158 182.871 11.7158C181.982 11.7158 181.125 11.8147 180.301 12.0124C179.477 12.2101 178.735 12.5397 178.076 13.0011C177.45 13.4295 176.956 14.0227 176.593 14.7807H172.836C173.133 13.6272 173.627 12.655 174.319 11.8641C175.044 11.0731 175.885 10.447 176.84 9.9856C177.796 9.49126 178.801 9.14522 179.856 8.94748C180.911 8.74975 181.916 8.65088 182.871 8.65088C186.562 8.65088 189.199 9.7549 190.781 11.963C192.363 14.171 193.154 17.137 193.154 20.8611V34.9992H190.138L189.99 31.4399C189.265 32.4286 188.392 33.2031 187.37 33.7633C186.381 34.3236 185.327 34.7191 184.206 34.9497C183.086 35.1804 181.949 35.2958 180.795 35.2958ZM181.042 32.2309C182.657 32.2309 184.124 31.9672 185.442 31.4399C186.76 30.8797 187.798 30.0558 188.556 28.9682C189.347 27.8807 189.743 26.5295 189.743 24.9147V22.9373H183.91C182.888 22.9373 181.85 22.9702 180.795 23.0362C179.741 23.0691 178.785 23.2339 177.928 23.5305C177.071 23.7942 176.379 24.2391 175.852 24.8652C175.324 25.4584 175.061 26.3153 175.061 27.4358C175.061 28.5563 175.341 29.4791 175.901 30.2041C176.461 30.8962 177.203 31.407 178.126 31.7365C179.049 32.0661 180.021 32.2309 181.042 32.2309Z"
                    fill="currentColor"
                  />
                  <path
                    d="M137.9 34.9994V0.0495605H150.16C153.785 0.0495605 156.8 0.791069 159.206 2.27409C161.645 3.72415 163.474 5.76742 164.693 8.4039C165.945 11.0074 166.572 14.0558 166.572 17.5492C166.572 21.0096 165.962 24.058 164.743 26.6945C163.523 29.298 161.694 31.3413 159.255 32.8243C156.817 34.2743 153.785 34.9994 150.16 34.9994H137.9ZM141.459 31.7862H149.863C152.796 31.7862 155.218 31.1765 157.13 29.9571C159.074 28.7377 160.524 27.0735 161.48 24.9643C162.436 22.8221 162.913 20.3504 162.913 17.5492C162.913 14.8138 162.452 12.3751 161.529 10.233C160.607 8.09082 159.206 6.39358 157.327 5.14126C155.449 3.88893 153.043 3.26277 150.11 3.26277H141.459V31.7862Z"
                    fill="currentColor"
                  />
                  <path
                    d="M115.177 35.3947C112.507 35.3947 110.283 34.785 108.503 33.5657C106.756 32.3133 105.438 30.6655 104.548 28.6223C103.691 26.579 103.263 24.338 103.263 21.8992C103.263 19.2298 103.757 16.8899 104.746 14.8796C105.735 12.8364 107.168 11.2545 109.047 10.134C110.925 8.9805 113.216 8.40377 115.918 8.40377C116.808 8.40377 117.648 8.50264 118.439 8.70038C119.263 8.86516 120.021 9.12881 120.713 9.49132C121.405 9.82088 121.982 10.2493 122.443 10.7766V0H131.193V34.9992H122.641V32.7253C122.015 33.3185 121.306 33.8128 120.515 34.2083C119.757 34.6038 118.934 34.9004 118.044 35.0981C117.154 35.2958 116.198 35.3947 115.177 35.3947ZM117.104 27.4358C118.423 27.4358 119.461 27.1722 120.219 26.6449C121.01 26.0847 121.57 25.3926 121.9 24.5687C122.262 23.7118 122.443 22.8385 122.443 21.9487C122.443 21.0259 122.262 20.1526 121.9 19.3287C121.57 18.4718 121.01 17.7797 120.219 17.2525C119.461 16.6922 118.439 16.4121 117.154 16.4121C115.836 16.4121 114.798 16.7087 114.04 17.3019C113.282 17.8951 112.738 18.6366 112.408 19.5264C112.112 20.3833 111.963 21.2401 111.963 22.097C111.963 22.7561 112.046 23.4152 112.21 24.0743C112.408 24.7005 112.705 25.2772 113.1 25.8045C113.529 26.2989 114.073 26.6943 114.732 26.9909C115.391 27.2875 116.182 27.4358 117.104 27.4358Z"
                    fill="#98E6A8"
                  />
                  <path
                    d="M87.2669 35.3948C84.6964 35.3948 82.373 34.8839 80.2968 33.8623C78.2535 32.8407 76.6222 31.3412 75.4028 29.3638C74.1834 27.3535 73.5737 24.9148 73.5737 22.0476C73.5737 19.1145 74.1834 16.6428 75.4028 14.6325C76.6551 12.5892 78.3029 11.0403 80.3462 9.98569C82.3895 8.9311 84.6469 8.40381 87.1186 8.40381C89.6562 8.40381 91.9302 8.94758 93.9405 10.0351C95.9838 11.1227 97.5986 12.6881 98.785 14.7314C100.004 16.7746 100.614 19.2628 100.614 22.1959C100.614 25.0301 100.037 27.4359 98.8839 29.4132C97.7305 31.3906 96.1486 32.8901 94.1383 33.9117C92.1279 34.9004 89.8375 35.3948 87.2669 35.3948ZM87.1186 27.2876C88.371 27.2876 89.3596 27.0239 90.0847 26.4966C90.8097 25.9693 91.3205 25.3102 91.6171 24.5193C91.9137 23.6954 92.062 22.888 92.062 22.097C92.062 21.3061 91.9137 20.4822 91.6171 19.6253C91.3205 18.7685 90.8097 18.0434 90.0847 17.4502C89.3926 16.857 88.4039 16.5604 87.1186 16.5604C85.8663 16.5604 84.8612 16.857 84.1032 17.4502C83.3781 18.0434 82.8673 18.7685 82.5707 19.6253C82.2741 20.4492 82.1258 21.2731 82.1258 22.097C82.1258 22.9209 82.2741 23.7448 82.5707 24.5687C82.9003 25.3597 83.4276 26.0188 84.1526 26.5461C84.8776 27.0404 85.8663 27.2876 87.1186 27.2876Z"
                    fill="#B2BCFF"
                  />
                  <path
                    d="M57.5775 35.3948C55.0069 35.3948 52.6835 34.8839 50.6073 33.8623C48.564 32.8407 46.9327 31.3412 45.7133 29.3638C44.494 27.3535 43.8843 24.9148 43.8843 22.0476C43.8843 19.1145 44.494 16.6428 45.7133 14.6325C46.9657 12.5892 48.6135 11.0403 50.6567 9.98569C52.7 8.9311 54.9575 8.40381 57.4292 8.40381C59.9668 8.40381 62.2408 8.94758 64.2511 10.0351C66.2943 11.1227 67.9092 12.6881 69.0956 14.7314C70.315 16.7746 70.9247 19.2628 70.9247 22.1959C70.9247 25.0301 70.3479 27.4359 69.1945 29.4132C68.041 31.3906 66.4591 32.8901 64.4488 33.9117C62.4385 34.9004 60.1481 35.3948 57.5775 35.3948ZM57.4292 27.2876C58.6815 27.2876 59.6702 27.0239 60.3952 26.4966C61.1203 25.9693 61.6311 25.3102 61.9277 24.5193C62.2243 23.6954 62.3726 22.888 62.3726 22.097C62.3726 21.3061 62.2243 20.4822 61.9277 19.6253C61.6311 18.7685 61.1203 18.0434 60.3952 17.4502C59.7031 16.857 58.7145 16.5604 57.4292 16.5604C56.1769 16.5604 55.1717 16.857 54.4137 17.4502C53.6887 18.0434 53.1779 18.7685 52.8813 19.6253C52.5847 20.4492 52.4364 21.2731 52.4364 22.097C52.4364 22.9209 52.5847 23.7448 52.8813 24.5687C53.2108 25.3597 53.7381 26.0188 54.4631 26.5461C55.1882 27.0404 56.1769 27.2876 57.4292 27.2876Z"
                    fill="#FF8181"
                  />
                  <path
                    d="M0 34.9992V0H11.3204L19.8725 15.3245L28.3751 0H39.2506V34.9992H30.303V12.7045L21.4543 28.0785H17.9445L8.94755 12.7045V34.9992H0Z"
                    fill="#8AE1FF"
                  />
                </svg>
              </Link>
            </div>
            <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <button
                className={`text-[18px] text-[#111F4B] dark:text-white rounded-[10px] font-redular px-4 py-2  transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] 
              ${
                !showWeeklyChart
                  ? "bg-[#D1E4FF] dark:bg-[#1B3380]"
                  : "border-transparent text-neutral-500 dark:text-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 hover:scale-[1.06]"
              }
          `}
                onClick={() => {
                  setShowWeeklyChart(false);
                  document
                    .getElementById("main-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <LayoutGrid className="inline-block w-5 h-5 mr-1 align-text-center" />
                Summary
              </button>
              <button
                className={`text-[18px] text-[#111F4B] dark:text-white rounded-[10px] font-redular px-4 py-2  transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] 
              ${
                showWeeklyChart
                  ? "bg-[#D1E4FF] dark:bg-[#1B3380]"
                  : "border-transparent text-neutral-500 dark:text-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 hover:scale-[1.06]"
              }
          `}
                onClick={() => {
                  setShowWeeklyChart(true);
                  document
                    .getElementById("main-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <SquareActivity className="inline-block w-5 h-5 mr-1 align-text-bottom" />
                Chart
              </button>
            </nav>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                aria-label="Settings"
                className="hidden md:inline-flex p-2 rounded-full border border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
              </button>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                width={36}
                height={36}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-neutral-200 dark:border-neutral-700 object-cover"
              />
            </div>
          </div>
        </header>
        {/* Main Content Grid */}
        <div className="container mx-auto px-6 md:px-10  py-6 flex flex-col">
          <div className="relative flex flex-row flex-1 w-full gap-8">
            {/* Sidebar (desktop, always present, animated) */}
            <aside
              className={`hidden lg:flex flex-col gap-8 sticky top-24 min-w-0 lg:max-w-[300px] xl:max-w-[408px]  flex-shrink-0 bg-transparent transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] lg:h-full xl:h-auto
            `}
            >
              <section className="bg-white min-w-[320px] dark:bg-[#102464] rounded-2xl border  border-neutral-200 dark:border-[#23232a] p-6 flex flex-col gap-6 transition-colors duration-300 w-full max-w-full">
                <h2 className="text-3xl xl:text-[42px] font-semibold text-[#111F4B] dark:text-white mb-2">
                  How are you feeling today?
                </h2>
                {/* Mood Picker */}
                <div className="grid grid-cols-3 gap-[16px] mb-2 w-full max-w-full">
                  {[
                    {
                      m: "sad",
                      icon: (
                        <span
                          className="text-3xl"
                          role="img"
                          aria-label="Sad"
                          style={{ color: "#8AE1FF" }}
                        >
                          😔
                        </span>
                      ),
                    },
                    {
                      m: "anxious",
                      icon: (
                        <span
                          className="text-3xl"
                          role="img"
                          aria-label="Anxious"
                          style={{ color: "#FEADFF" }}
                        >
                          😰
                        </span>
                      ),
                    },
                    {
                      m: "angry",
                      icon: (
                        <span
                          className="text-3xl"
                          role="img"
                          aria-label="Angry"
                          style={{ color: "#FF8181" }}
                        >
                          😠
                        </span>
                      ),
                    },
                    {
                      m: "tired",
                      icon: (
                        <span
                          className="text-3xl"
                          role="img"
                          aria-label="Tired"
                          style={{ color: "#B2BCFF" }}
                        >
                          😴
                        </span>
                      ),
                    },
                    {
                      m: "neutral",
                      icon: (
                        <span
                          className="text-3xl"
                          role="img"
                          aria-label="Neutral"
                          style={{ color: "#E0EDFF" }}
                        >
                          😐
                        </span>
                      ),
                    },
                    {
                      m: "happy",
                      icon: (
                        <span
                          className="text-3xl"
                          role="img"
                          aria-label="Happy"
                          style={{ color: "#98E6A8" }}
                        >
                          😄
                        </span>
                      ),
                    },
                  ].map(({ m, icon }) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m as Mood)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all  ease-[cubic-bezier(.4,1.2,.6,1)] aspect-square cursor-pointer min-w-[56px] py-[12px] justify-center w-full border-2 border-transparent
                        ${mood === m ? "scale-120" : ""}
                        ${
                          mood === m && m === "neutral"
                            ? "border-[#111F4B] dark:border-white"
                            : ""
                        }
                        hover:scale-105 hover:brightness-105
                      `}
                      style={{
                        background: moodColors[m as Mood],
                        transform: mood === m ? "scale(1.1)" : undefined,
                        transition:
                          "transform 0.25 cubic-bezier(.4,1.2,.6,1), background 0.25s, border-color 0.25s",
                      }}
                    >
                      {icon}
                      <span
                        className={`text-xs font-medium ${
                          mood === m ? "text-[#111F4B] " : "text-[#111F4B]"
                        }`}
                      >
                        {getMoodLabel(m as Mood)}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Notes */}
                <div className="flex flex-col gap-2 w-full max-w-full">
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-[#111F4B] dark:text-white"
                  >
                    Notes
                  </label>
                  {!isMobile && !isMdOrBelow && (
                    <textarea
                      id="notes-2"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full max-w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1B3380] text-[#111F4B] dark:text-neutral-200 border border-[#BBD2F2] focus:outline-none focus:ring-2 focus:ring-[#111F4B] transition-all duration-200 resize-none text-sm"
                      rows={3}
                      placeholder="What&#39;s on your mind?"
                    />
                  )}
                </div>
                {/* --- CTA BUTTON --- */}
                <button
                  type="submit"
                  onClick={addMoodEntry}
                  className="bg-[#111F4B] text-white dark:bg-[#8AE1FF] dark:text-[#000E38] font-black text-base px-5 py-[14px] leading-none rounded-[8px] transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] flex items-center justify-center gap-2 w-full min-h-[48px]  focus:outline-none focus-visible:ring-2 uppercase focus-visible:ring-cyan-400 hover:shadow-xl hover:scale-[1.04] hover:from-blue-500 hover:to-cyan-500"
                >
                  Log my Mood
                </button>
              </section>
              {/* Streak Card */}
            </aside>
            {/* Main Panel */}
            <main
              id="main-content"
              className="flex flex-col gap-8 flex-1 min-w-0 w-full overflow-x-auto transition-all duration-500"
            >
              {/* Mood Entry Form for mobile and md screens */}
              {(isMobile || isMdOrBelow) && (
                <MoodEntryForm id="mobile-mood-entry" />
              )}
              <section className="bg-white dark:bg-[#102464] rounded-2xl border border-neutral-200 dark:border-[#23232a]  flex flex-col transition-colors duration-300 max-w-full overflow-x-auto xl:h-full">
                <div className="flex px-6 pt-6 items-center justify-between mb-1">
                  <h2 className="text-xl font-semibold text-[#111F4B] dark:text-white">
                    Your Stats
                  </h2>
                  <div className="flex gap-2 items-center">
                    {/* Export & Share Buttons */}
                    <button
                      onClick={exportMoodData}
                      aria-label="Export mood data"
                      className="p-2 rounded-full border border-transparent transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      title="Export mood data"
                    >
                      <Upload className="w-5 h-5 text-[#111F4B] dark:text-white" />
                    </button>
                    <button
                      onClick={shareMoodData}
                      aria-label="Share mood data"
                      className="p-2 rounded-full border border-transparent transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      title="Share mood data"
                    >
                      <Share2 className="w-5 h-5 text-[#111F4B] dark:text-white " />
                    </button>
                  </div>
                </div>
                {showWeeklyChart ? (
                  <div className=" px-6">
                    <h3 className="text-lg font-semibold mb-5 text-[#111F4B] dark:text-white flex items-center">
                      <TrendingUp
                        className="mr-2 text-[#111F4B] dark:text-white w-5 h-5"
                        size={20}
                      />
                      Your Mood Over Time
                    </h3>
                    {chartData.length > 0 ? (
                      <div className="h-64 md:h-72 mb-4 w-full max-w-full overflow-x-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke={darkMode ? "#334155" : "#e2e8f0"}
                            />
                            <XAxis
                              dataKey="day"
                              stroke={darkMode ? "#94a3b8" : "#64748b"}
                              tick={{ fill: darkMode ? "#94a3b8" : "#64748b" }}
                            />
                            <YAxis
                              domain={[1, 5]}
                              ticks={[1, 2, 3, 4, 5]}
                              stroke={darkMode ? "#94a3b8" : "#64748b"}
                              tick={{ fill: darkMode ? "#94a3b8" : "#64748b" }}
                              tickFormatter={(value) => {
                                switch (value) {
                                  case 1:
                                    return "Sad";
                                  case 2:
                                    return "Anxious";
                                  case 3:
                                    return "Angry";
                                  case 4:
                                    return "Tired";
                                  case 5:
                                    return "Neutral";
                                  case 6:
                                    return "Happy";
                                  default:
                                    return "";
                                }
                              }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#3a82f6"
                              strokeWidth={2}
                              dot={{
                                r: 4,
                                fill: "#3a82f6",
                                strokeWidth: 2,
                                stroke: darkMode ? "#1e293b" : "#ffffff",
                              }}
                              activeDot={{
                                r: 6,
                                fill: "#3a82f6",
                                stroke: "#ffffff",
                                strokeWidth: 2,
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 mt-8 text-sm text-neutral-500 dark:text-neutral-400">
                        <BarChart2
                          size={32}
                          className="mb-3 w-8 h-8 text-neutral-400"
                        />
                        <p>
                          No mood data yet. Add your first entry to see your
                          mood chart!
                        </p>
                      </div>
                    )}
                    <div
                      className={`-mx-6 mt-6 p-6 bg-[#F2F8FF] dark:bg-[#1B3380] transition-colors duration-200`}
                    >
                      <h3
                        className={`text-base font-semibold mb-3 text-[#111F4B] dark:text-white transition-colors duration-200`}
                      >
                        Mood Legend
                      </h3>
                      <div className="grid grid-cols-3 md:flex flex-wrap gap-[5px]">
                        <div className="flex justify-center gap-x-[10px] items-center  p-[15px] rounded-[10px] bg-white dark:bg-[#000E38]">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: "#8AE1FF" }}
                          ></div>
                          <span
                            className={`text-xs leading-[18px] text-center font-regular min-h-[18px] text-[#111F4B] dark:text-white `}
                          >
                            Sad
                          </span>
                        </div>
                        <div className="flex justify-center gap-x-[10px] items-center  p-[15px] rounded-[10px] bg-white dark:bg-[#000E38]">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: "#FEADFF" }}
                          ></div>
                          <span
                            className={`text-xs leading-[18px] text-center font-regular min-h-[18px] text-[#111F4B] dark:text-white`}
                          >
                            Anxious
                          </span>
                        </div>
                        <div className="flex justify-center gap-x-[10px] items-center  p-[15px] rounded-[10px] bg-white dark:bg-[#000E38]">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: "#FF8181" }}
                          ></div>
                          <span
                            className={`text-xs leading-[18px] text-center font-regular min-h-[18px] text-[#111F4B] dark:text-white`}
                          >
                            Angry
                          </span>
                        </div>
                        <div className="flex justify-center gap-x-[10px] items-center  p-[15px] rounded-[10px] bg-white dark:bg-[#000E38]">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: "#B2BCFF" }}
                          ></div>
                          <span
                            className={`text-xs leading-[18px] text-center font-regular min-h-[18px] text-[#111F4B] dark:text-white`}
                          >
                            Tired
                          </span>
                        </div>
                        <div className="flex justify-center gap-x-[10px] items-center  p-[15px] rounded-[10px] bg-white dark:bg-[#000E38]">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: "#C2DBFF" }}
                          ></div>
                          <span
                            className={`text-xs leading-[18px] text-center font-regular min-h-[18px] text-[#111F4B] dark:text-white`}
                          >
                            Neutral
                          </span>
                        </div>
                        <div className="flex justify-center gap-x-[10px] items-center  p-[15px] rounded-[10px] bg-white dark:bg-[#000E38]">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: "#98E6A8" }}
                          ></div>
                          <span
                            className={`text-xs leading-[18px] text-center font-regular min-h-[18px] text-[#111F4B] dark:text-white`}
                          >
                            Happy
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold mb-5 text-[#111F4B] dark:text-white flex items-center">
                      <BarChart2
                        className="mr-2 text-blue-500 dark:text-blue-400w-5 h-5"
                        size={20}
                      />
                      Your Mood Summary
                    </h3>
                    {summary.totalEntries > 0 ? (
                      <div>
                        <div
                          className={`mb-6 p-4 rounded-lg dark:bg-[#1B3380] bg-[#F2F8FF] transition-colors duration-200`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`text-sm font-medium text-[#111F4B] dark:text-white transition-colors duration-200`}
                            >
                              Total Entries
                            </span>
                            <span
                              className={`text-lg font-bold text-[#111F4B] dark:text-white transition-colors duration-200`}
                            >
                              {summary.totalEntries}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span
                              className={`text-sm font-medium text-[#111F4B] dark:text-white transition-colors duration-200`}
                            >
                              Average Mood
                            </span>
                            <span
                              className={`text-lg font-bold text-[#111F4B] dark:text-white transition-colors duration-200`}
                            >
                              {summary.averageMood}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full max-w-full overflow-x-auto">
                          <div>
                            <h3
                              className={`text-sm font-medium mb-3 text-[#111F4B] dark:text-white transition-colors duration-200`}
                            >
                              Mood Distribution
                            </h3>
                            <div className="h-48">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                    stroke="none"
                                    strokeWidth={0}
                                  >
                                    {pieChartData.map((entry) => (
                                      <Cell
                                        key={`cell-${entry.name}`}
                                        fill={
                                          entry.name === "Sad"
                                            ? "#8AE1FF"
                                            : entry.name === "Anxious"
                                            ? "#FEADFF"
                                            : entry.name === "Angry"
                                            ? "#FF8181"
                                            : entry.name === "Tired"
                                            ? "#B2BCFF"
                                            : entry.name === "Neutral"
                                            ? "#E0EDFF"
                                            : entry.name === "Happy"
                                            ? "#98E6A8"
                                            : "#BBD2F2"
                                        }
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div>
                            <h3
                              className={`text-sm font-medium mb-3 text-[#111F4B] dark:text-white transition-colors duration-200`}
                            >
                              Mood Breakdown
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: "#8AE1FF" }}
                                    ></div>
                                    <span
                                      className={`text-sm text-[#111F4B] dark:text-white`}
                                    >
                                      Sad
                                    </span>
                                  </div>
                                  <span
                                    className={`font-medium text-[#111F4B] dark:text-white`}
                                  >
                                    {summary.moodCounts.sad}
                                  </span>
                                </div>
                                <div
                                  className={`h-2 rounded-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                  } overflow-hidden`}
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      background: "#8AE1FF",
                                      width:
                                        summary.totalEntries > 0
                                          ? `${
                                              (summary.moodCounts.sad /
                                                summary.totalEntries) *
                                              100
                                            }%`
                                          : "0%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: "#FEADFF" }}
                                    ></div>
                                    <span
                                      className={`text-sm text-[#111F4B] dark:text-white`}
                                    >
                                      Anxious
                                    </span>
                                  </div>
                                  <span
                                    className={`font-medium text-[#111F4B] dark:text-white`}
                                  >
                                    {summary.moodCounts.anxious}
                                  </span>
                                </div>
                                <div
                                  className={`h-2 rounded-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                  } overflow-hidden`}
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      background: "#FEADFF",
                                      width:
                                        summary.totalEntries > 0
                                          ? `${
                                              (summary.moodCounts.anxious /
                                                summary.totalEntries) *
                                              100
                                            }%`
                                          : "0%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: "#FF8181" }}
                                    ></div>
                                    <span
                                      className={`text-sm text-[#111F4B] dark:text-white`}
                                    >
                                      Angry
                                    </span>
                                  </div>
                                  <span
                                    className={`font-medium text-[#111F4B] dark:text-white`}
                                  >
                                    {summary.moodCounts.angry}
                                  </span>
                                </div>
                                <div
                                  className={`h-2 rounded-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                  } overflow-hidden`}
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      background: "#FF8181",
                                      width:
                                        summary.totalEntries > 0
                                          ? `${
                                              (summary.moodCounts.angry /
                                                summary.totalEntries) *
                                              100
                                            }%`
                                          : "0%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: "#B2BCFF" }}
                                    ></div>
                                    <span
                                      className={`text-sm text-[#111F4B] dark:text-white`}
                                    >
                                      Tired
                                    </span>
                                  </div>
                                  <span
                                    className={`font-medium text-[#111F4B] dark:text-white`}
                                  >
                                    {summary.moodCounts.tired}
                                  </span>
                                </div>
                                <div
                                  className={`h-2 rounded-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                  } overflow-hidden`}
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      background: "#B2BCFF",
                                      width:
                                        summary.totalEntries > 0
                                          ? `${
                                              (summary.moodCounts.tired /
                                                summary.totalEntries) *
                                              100
                                            }%`
                                          : "0%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: "#E0EDFF" }}
                                    ></div>
                                    <span
                                      className={`text-sm text-[#111F4B] dark:text-white`}
                                    >
                                      Neutral
                                    </span>
                                  </div>
                                  <span
                                    className={`font-medium text-[#111F4B] dark:text-white`}
                                  >
                                    {summary.moodCounts.neutral}
                                  </span>
                                </div>
                                <div
                                  className={`h-2 rounded-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                  } overflow-hidden`}
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      background: "#E0EDFF",
                                      width:
                                        summary.totalEntries > 0
                                          ? `${
                                              (summary.moodCounts.neutral /
                                                summary.totalEntries) *
                                              100
                                            }%`
                                          : "0%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: "#98E6A8" }}
                                    ></div>
                                    <span
                                      className={`text-sm text-[#111F4B] dark:text-white`}
                                    >
                                      Happy
                                    </span>
                                  </div>
                                  <span
                                    className={`font-medium text-[#111F4B] dark:text-white`}
                                  >
                                    {summary.moodCounts.happy}
                                  </span>
                                </div>
                                <div
                                  className={`h-2 rounded-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                  } overflow-hidden`}
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      background: "#98E6A8",
                                      width:
                                        summary.totalEntries > 0
                                          ? `${
                                              (summary.moodCounts.happy /
                                                summary.totalEntries) *
                                              100
                                            }%`
                                          : "0%",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h3
                            className={`text-sm font-medium text-[#111F4B] dark:text-white transition-colors duration-200`}
                          >
                            Insights
                          </h3>
                          <div
                            className={`p-3 rounded-lg dark:bg-[#1B3380] bg-[#F2F8FF] transition-colors duration-200`}
                          >
                            <div className="flex items-center mb-2">
                              <Calendar
                                size={16}
                                className={`mr-2 text-[#111F4B] dark:text-white`}
                              />
                              <span
                                className={`font-medium text-[#111F4B] dark:text-white transition-colors duration-200`}
                              >
                                Best Day of the Week
                              </span>
                            </div>
                            <p
                              className={`text-sm text-[#111F4B] dark:text-white`}
                            >
                              {bestDayOfWeekText}
                            </p>
                          </div>
                          <div
                            className={`p-3 rounded-lg dark:bg-[#1B3380] bg-[#F2F8FF] transition-colors duration-200`}
                          >
                            <div className="flex items-center mb-2">
                              <Zap
                                size={16}
                                className={`mr-2 text-[#111F4B] dark:text-white`}
                              />
                              <span
                                className={`font-medium text-[#111F4B] dark:text-white transition-colors duration-200`}
                              >
                                Best Time of Day
                              </span>
                            </div>
                            <p
                              className={`text-sm text-[#111F4B] dark:text-white`}
                            >
                              {bestTimeOfDayText}
                            </p>
                          </div>
                          <div
                            className={`p-3 rounded-lg dark:bg-[#1B3380] bg-[#F2F8FF] transition-colors duration-200`}
                          >
                            <div className="flex items-center mb-2">
                              <Thermometer
                                size={16}
                                className={`mr-2 text-[#111F4B] dark:text-white`}
                              />
                              <span
                                className={`font-medium text-[#111F4B] dark:text-white transition-colors duration-200`}
                              >
                                Mood Temperature
                              </span>
                            </div>
                            <p
                              className={`text-sm text-[#111F4B] dark:text-white`}
                            >
                              Your average mood temperature is{" "}
                              {summary.averageMood.toLowerCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex flex-col items-center justify-center h-64 text-[#111F4B] dark:text-white transition-colors duration-200`}
                      >
                        <BarChart2 size={32} className="mb-3" />
                        <p>
                          No data to show yet. Add more mood entries to see
                          insights!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
              {/* Quick Stats Card */}
              <div className="grid md:grid-cols-6 gap-[15px]">
                <section className="bg-white md:col-span-4 dark:bg-[#102464] rounded-2xl border border-neutral-200 dark:border-[#23232a] p-5 flex flex-col max-w-full overflow-x-auto">
                  <h4 className="text-[20px] font-semibold  text-[#111F4B] dark:text-white  mb-2">
                    Quick Stats
                  </h4>
                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm  text-[#111F4B] dark:text-white">
                        Most frequent mood:
                      </span>
                      <div>
                        {mostFrequentMood ? (
                          <div
                            className="rounded-[5px] px-[10px] py-[8px] flex items-center gap-[10px] "
                            style={{
                              background: moodColors[mostFrequentMood],
                            }}
                          >
                            <span
                              className="text-[14px]"
                              role="img"
                              aria-label={mostFrequentMood}
                              style={{ color: moodColors[mostFrequentMood] }}
                            >
                              {moodEmojis[mostFrequentMood]}
                            </span>
                            <span
                              className="font-semibold text-[#111F4B]"
                              style={{
                                WebkitTextStroke: darkMode
                                  ? "1px #fff"
                                  : undefined,
                              }}
                            >
                              {moodLabels[mostFrequentMood]}
                            </span>
                          </div>
                        ) : (
                          <div
                            className="rounded-[5px] px-[10px] py-[8px] flex items-center gap-[10px] "
                            style={{
                              background: "#98E6A8",
                            }}
                          >
                            <span className="text-[14px]">😄</span>
                            <span className="font-semibold text-[14px] text-[#111F4B]">
                              Happy
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ">
                      <span className="text-sm  text-[#111F4B] dark:text-white">
                        Longest streak:
                      </span>
                      <div className="bg-[#F2F8FF] dark:bg-[#000E38] px-[10px] py-[8px] rounded-[5px]  flex items-center gap-[10px]">
                        <span className="font-bold text-[14px]   text-[#111F4B] dark:text-white">
                          {streak.count}
                        </span>
                        <span className="font-bold text-[14px] mr-2  text-[#111F4B] dark:text-white">
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="bg-white md:col-span-2  dark:bg-[#102464] rounded-2xl border border-neutral-200 dark:border-[#23232a] p-5 flex flex-col transition-colors duration-300 w-full max-w-full">
                  <h3 className="text-[20px] font-semibold  text-[#111F4B] dark:text-white  mb-2">
                    Current Streak
                  </h3>
                  <div className="flex items-center justify-between w-full max-w-full">
                    <div className="flex items-center gap-x-[6px]">
                      <div className="bg-[#F2F8FF] dark:bg-[#000E38] px-[10px] py-[8px] rounded-[5px]  flex items-center gap-[10px]">
                        <span className="font-bold text-[14px]   text-[#111F4B] dark:text-white">
                          {streak.count}
                        </span>
                        <span className="font-bold text-[14px] mr-2  text-[#111F4B] dark:text-white">
                          days
                        </span>
                      </div>

                      {/* <button
                        onClick={() => setShowStreakModal(true)}
                        className="p-1 rounded-full bg-neutral-100 dark:bg-slate-700 text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 cursor-pointer"
                      >
                        <Info size={16} />
                      </button> */}
                      <button
                        onClick={resetTodayEntry}
                        className="w-full px-[10px] py-[8px] rounded-[5px] text-[14px] uppercase font-semibold flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] cursor-pointer bg-[#111F4B] hover:scale-105 text-white dark:bg-[#8AE1FF] dark:text-[#000E38]"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#102464] flex lg:hidden justify-around items-center h-14 backdrop-blur">
          <button
            onClick={() => {
              setShowWeeklyChart(false);
              document
                .getElementById("main-content")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] hover:scale-110 ${
              !showWeeklyChart
                ? "text-cyan-600 dark:text-[#8AE1FF]"
                : "text-[#111F4B] dark:text-white"
            }`}
          >
            <Home className="w-6 h-6 mb-0.5" />
            Summary
          </button>
          <button
            onClick={() => {
              setShowWeeklyChart(true);
              document
                .getElementById("main-content")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] hover:scale-110 ${
              showWeeklyChart
                ? "text-cyan-600 dark:text-[#8AE1FF]"
                : "text-[#111F4B] dark:text-white"
            }`}
          >
            <BarChart2 className="w-6 h-6 mb-0.5" />
            Chart
          </button>
          <button
            onClick={() => {
              setShowWeeklyChart(false);
              setTimeout(() => {
                document
                  .getElementById("mobile-mood-entry")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(() => {
                  document.getElementById("notes")?.focus();
                }, 200);
              }, 50);
            }}
            className="flex flex-col items-center gap-0.5 text-xs font-medium text-[#111F4B] dark:text-white  transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] hover:scale-110"
          >
            <PlusCircle className="w-6 h-6 mb-0.5" />
            Add
          </button>
        </nav>
        {/* Footer */}
        <footer className="w-full text-center text-xs text-neutral-400 dark:text-neutral-600 py-8 mt-10">
          © 2025 Mood Dashboard. All rights reserved.
        </footer>
        {/* Toasts & Modals */}
        {toast && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full z-50 flex items-center transition-all duration-300
          ${
            toast.type === "success"
              ? "bg-[#111F4B] text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-amber-500 text-white"
          }
        `}
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} className="mr-2" />
            ) : toast.type === "error" ? (
              <XCircle size={18} className="mr-2" />
            ) : (
              <Info size={18} className="mr-2" />
            )}
            {toast.message}
          </div>
        )}
        {showStreakModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`rounded-xl p-6 max-w-[410px] flex flex-col items-center justify-center w-full ${
                darkMode ? "bg-[#232326]" : "bg-white"
              } transition-colors duration-200`}
            >
              <div className="flex items-center mb-4">
                <Trophy
                  className={`mr-2 ${
                    darkMode
                      ? "text-blue-400"
                      : "text-blue-500 dark:text-blue-400"
                  }`}
                  size={24}
                />
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  } transition-colors duration-200`}
                >
                  Congratulations!
                </h2>
              </div>
              <p
                className={`mb-4 max-w-[300px] text-center font-semibold ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                } transition-colors duration-200`}
              >
                You&#39;ve reached a {moodHistory.length} day milestone in
                tracking your mood!
              </p>
              <p
                className={`mb-6 max-w-[300px] text-center ${
                  darkMode ? "text-white" : "text-[#111F4B]"
                } transition-colors duration-200`}
              >
                {getStreakMessage(moodHistory.length)}
              </p>
              <button
                onClick={() => setShowStreakModal(false)}
                className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] cursor-pointer ${
                  darkMode
                    ? "bg-[#BBD2F2] hover:[#E0EDFF] hover:scale-105 text-[#111F4B]"
                    : "bg-[#111F4B] hover:[#496790] hover:scale-105 text-white"
                }`}
              >
                Continue Tracking
              </button>
            </div>
          </div>
        )}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`rounded-xl p-6 max-w-[410px] w-full  flex flex-col items-center justify-center ${
                darkMode ? "bg-[#232326]" : "bg-white"
              } transition-colors duration-200`}
            >
              <div className="mb-[30px] text-[30px]">🙏🏼</div>
              <div className="flex items-center mb-2">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  } transition-colors duration-200`}
                >
                  Mood Entry Saved!
                </h2>
              </div>
              <p
                className={`mb-4 max-w-[300px] font-semibold flex justify-center text-center ${
                  darkMode ? "text-slate-100" : "text-[#111F4B]"
                } transition-colors duration-200`}
              >
                Your mood has been successfully recorded for today.
              </p>
              <p
                className={`mb-6 max-w-[300px] text-center ${
                  darkMode ? "text-white" : "text-[#111F4B]"
                } transition-colors duration-200`}
              >
                Keep tracking your mood daily to see patterns and insights about
                your emotional well-being.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] cursor-pointer uppercase ${
                  darkMode
                    ? "bg-[#BBD2F2] hover:[#E0EDFF] hover:scale-105 text-[#111F4B]"
                    : "bg-[#111F4B] hover:[#496790] hover:scale-105 text-white"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`rounded-xl p-6 max-w-md w-full ${
                darkMode ? "bg-[#232326]" : "bg-white"
              } transition-colors duration-200`}
            >
              <div className="flex items-center mb-4">
                <AlertTriangle
                  className={`mr-2 ${
                    darkMode ? "text-red-400" : "text-red-600"
                  }`}
                  size={24}
                />
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  } transition-colors duration-200`}
                >
                  Error
                </h2>
              </div>
              <p
                className={`mb-4 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                } transition-colors duration-200`}
              >
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(.4,1.2,.6,1)] cursor-pointer ${
                  darkMode
                    ? "bg-red-600 hover:bg-red-700 hover:scale-105 text-white"
                    : "bg-red-500 hover:bg-red-600 hover:scale-105 text-white"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MoodTracker;
