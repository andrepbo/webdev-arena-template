"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Square, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Share_Tech_Mono } from "next/font/google";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
});

const App = () => {
  const [gameState, setGameState] = useState<
    "instructions" | "playing" | "processing" | "won" | "lost" | "blocked"
  >("instructions");
  const [currentRound, setCurrentRound] = useState(1);
  const [targetFingerprint, setTargetFingerprint] = useState<number>(0);
  const [fingerprintFragments, setFingerprintFragments] = useState<
    { id: number; isCorrect: boolean; fragment: string }[]
  >([]);
  const [selectedFragments, setSelectedFragments] = useState<number[]>([]);
  const [decodedTransmissions, setDecodedTransmissions] = useState<number[]>(
    []
  );
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [attempts, setAttempts] = useState(4);
  const [time, setTime] = useState(60);
  const [blockTime, setBlockTime] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [canAnalyze, setCanAnalyze] = useState(false);

  // Color palette
  const colors = {
    primary: "#19FFD6",
    secondary: "#00967B",
    background: isDarkMode ? "#000000" : "#f8fafc",
    text: isDarkMode ? "#19FFD6" : "#1f2937",
    border: isDarkMode ? "#19FFD6" : "#374151",
  };

  // Generate fingerprint fragments based on target
  const generateFingerprintFragments = () => {
    const fragments = [];

    // Generate 4 correct fragments of the target fingerprint
    const correctFragments = [
      { id: 0, isCorrect: true, fragment: "top-left" },
      { id: 1, isCorrect: true, fragment: "top-right" },
      { id: 2, isCorrect: true, fragment: "bottom-left" },
      { id: 3, isCorrect: true, fragment: "bottom-right" },
    ];

    // Generate 4 incorrect fragments from other fingerprints
    const incorrectFragments = [
      { id: 4, isCorrect: false, fragment: "top-left" },
      { id: 5, isCorrect: false, fragment: "top-right" },
      { id: 6, isCorrect: false, fragment: "bottom-left" },
      { id: 7, isCorrect: false, fragment: "bottom-right" },
    ];

    fragments.push(...correctFragments, ...incorrectFragments);

    // Shuffle the fragments
    return fragments.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const target = Math.floor(Math.random() * 10);
    setTargetFingerprint(target);
    setFingerprintFragments(generateFingerprintFragments());
    setGameState("playing");
    setCurrentRound(1);
    setAttempts(4);
    setTime(60);
    setSelectedFragments([]);
    setDecodedTransmissions([]);
    setFailedAttempts(0);
    setShowError(false);
    setProcessingProgress(0);
    setCanAnalyze(false);
  };

  const exitGame = () => {
    setGameState("instructions");
    setSelectedFragments([]);
    setDecodedTransmissions([]);
    setFailedAttempts(0);
    setCurrentRound(1);
  };

  const selectFragment = (fragmentId: number) => {
    if (selectedFragments.includes(fragmentId)) {
      // Deselect fragment
      const newSelected = selectedFragments.filter((id) => id !== fragmentId);
      setSelectedFragments(newSelected);
      setCanAnalyze(newSelected.length >= 2);
    } else if (selectedFragments.length < 4) {
      // Select fragment
      const newSelected = [...selectedFragments, fragmentId];
      setSelectedFragments(newSelected);
      setCanAnalyze(newSelected.length >= 2);
    }
  };

  const analyzeSelection = () => {
    if (selectedFragments.length < 2 || gameState !== "playing") return;

    setGameState("processing");
    setProcessingProgress(0);

    // Simulate processing with progress bar
    const processingInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(processingInterval);

          // Check if all selected fragments are correct
          const selectedFragmentData = fingerprintFragments.filter((f) =>
            selectedFragments.includes(f.id)
          );
          const allCorrect = selectedFragmentData.every((f) => f.isCorrect);
          const hasAllRequiredPieces = selectedFragments.length >= 3; // Need at least 3 pieces for success

          if (allCorrect && hasAllRequiredPieces) {
            // Add successful fingerprint to decoded transmissions
            setDecodedTransmissions((prev) => [...prev, targetFingerprint]);

            setTimeout(() => {
              if (currentRound >= 4) {
                setGameState("won");
              } else {
                // Start next round
                const nextTarget = Math.floor(Math.random() * 10);
                setTargetFingerprint(nextTarget);
                setFingerprintFragments(generateFingerprintFragments());
                setCurrentRound(currentRound + 1);
                setSelectedFragments([]);
                setGameState("playing");
                setCanAnalyze(false);
              }
            }, 1000);
          } else {
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
            setFailedAttempts(failedAttempts + 1);

            // Show error state
            setShowError(true);

            setTimeout(() => {
              if (newAttempts === 0) {
                setGameState("lost");
                setBlockTime(new Date(Date.now() + 24 * 60 * 60 * 1000));
              } else {
                // Reset for next attempt
                setSelectedFragments([]);
                setGameState("playing");
                setShowError(false);
                setCanAnalyze(false);
              }
            }, 2000);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameState("lost");
            setBlockTime(new Date(Date.now() + 24 * 60 * 60 * 1000));
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getCompleteFingerprintSVG = (index: number) => {
    // Complete fingerprint patterns - these are the full fingerprints that fragments combine to form
    const patterns = [
      // Whorl pattern
      "M50,20 Q30,30 25,50 Q30,70 50,80 Q70,70 75,50 Q70,30 50,20 M50,30 Q40,35 38,50 Q40,65 50,70 Q60,65 62,50 Q60,35 50,30 M50,40 Q45,42 44,50 Q45,58 50,60 Q55,58 56,50 Q55,42 50,40 M50,46 Q48,47 47,50 Q48,53 50,54 Q52,53 53,50 Q52,47 50,46",
      // Loop pattern
      "M30,20 Q50,15 70,20 Q75,40 70,60 Q50,65 30,60 Q25,40 30,20 M35,30 Q50,28 65,30 Q68,45 65,55 Q50,58 35,55 Q32,45 35,30 M40,40 Q50,38 60,40 Q62,50 60,60 Q50,62 40,60 Q38,50 40,40 M45,45 Q50,44 55,45 Q56,50 55,55 Q50,56 45,55 Q44,50 45,45",
      // Arch pattern
      "M20,70 Q30,50 40,40 Q50,35 60,40 Q70,50 80,70 M25,65 Q35,50 45,45 Q50,42 55,45 Q65,50 75,65 M30,60 Q40,50 50,48 Q60,50 70,60 M35,58 Q45,52 50,50 Q55,52 65,58",
      // Complex whorl
      "M50,15 Q25,25 20,50 Q25,75 50,85 Q75,75 80,50 Q75,25 50,15 M50,25 Q35,30 32,50 Q35,70 50,75 Q65,70 68,50 Q65,30 50,25 M50,35 Q45,38 44,50 Q45,62 50,65 Q55,62 56,50 Q55,38 50,35 M50,42 Q48,43 47,50 Q48,57 50,58 Q52,57 53,50 Q52,43 50,42",
      // Tented arch
      "M15,75 Q30,50 50,20 Q70,50 85,75 M20,70 Q35,55 50,30 Q65,55 80,70 M25,65 Q40,58 50,40 Q60,58 75,65 M30,62 Q42,56 50,48 Q58,56 70,62",
      // Double loop
      "M30,25 Q50,20 70,25 Q75,35 70,45 Q60,50 50,48 Q40,50 30,45 Q25,35 30,25 M50,55 Q60,58 70,65 Q75,75 70,80 Q50,85 30,80 Q25,75 30,65 Q40,58 50,55 M35,30 Q50,28 65,30 Q68,40 65,50 Q50,52 35,50 Q32,40 35,30",
      // Central pocket loop
      "M25,25 Q50,20 75,25 Q80,50 75,75 Q50,80 25,75 Q20,50 25,25 M35,35 Q50,32 65,35 Q68,50 65,65 Q50,68 35,65 Q32,50 35,35 M45,45 Q50,44 55,45 Q56,50 55,55 Q50,56 45,55 Q44,50 45,45 M49,49 Q50,48.5 51,49 Q51.5,50 51,51 Q50,51.5 49,51 Q48.5,50 49,49",
      // Accidental whorl
      "M50,10 Q20,20 15,50 Q20,80 50,90 Q80,80 85,50 Q80,20 50,10 M50,20 Q30,25 28,50 Q30,75 50,80 Q70,75 72,50 Q70,25 50,20 M50,30 Q40,32 39,50 Q40,68 50,70 Q60,68 61,50 Q60,32 50,30 M50,40 Q47,42 46,50 Q47,58 50,60 Q53,58 54,50 Q53,42 50,40",
      // Plain arch
      "M20,70 Q35,45 50,35 Q65,45 80,70 M25,65 Q40,50 50,42 Q60,50 75,65 M30,62 Q42,52 50,48 Q58,52 70,62 M35,60 Q45,54 50,52 Q55,54 65,60",
      // Radial loop
      "M20,30 Q40,25 50,35 Q60,25 80,30 Q85,50 80,70 Q60,75 50,65 Q40,75 20,70 Q15,50 20,30 M35,40 Q45,38 50,45 Q55,38 65,40 Q68,50 65,60 Q55,62 50,55 Q45,62 35,60 Q32,50 35,40 M42,47 Q47,46 50,49 Q53,46 58,47 Q59,50 58,53 Q53,54 50,51 Q47,54 42,53 Q41,50 42,47",
    ];

    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter: isDarkMode
            ? `drop-shadow(0 0 6px ${colors.primary})`
            : "none",
        }}
      >
        <defs>
          <linearGradient
            id={`complete-gradient-${index}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d={patterns[index % patterns.length]}
          fill="none"
          stroke={`url(#complete-gradient-${index})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getFragmentSVG = (fragmentData: {
    id: number;
    isCorrect: boolean;
    fragment: string;
  }) => {
    const { isCorrect, fragment } = fragmentData;

    // Use the same pattern as the target for correct fragments
    const targetPattern =
      getCompleteFingerprintSVG(targetFingerprint).props.children[1].props.d;

    // Different patterns for incorrect fragments
    const incorrectPatterns = [
      "M30,20 Q50,15 70,20 Q75,40 70,60 Q50,65 30,60 Q25,40 30,20 M35,30 Q50,28 65,30 Q68,45 65,55 Q50,58 35,55 Q32,45 35,30",
      "M20,70 Q30,50 40,40 Q50,35 60,40 Q70,50 80,70 M25,65 Q35,50 45,45 Q50,42 55,45 Q65,50 75,65",
      "M25,25 Q50,20 75,25 Q80,50 75,75 Q50,80 25,75 Q20,50 25,25 M35,35 Q50,32 65,35 Q68,50 65,65 Q50,68 35,65 Q32,50 35,35",
      "M15,75 Q30,50 50,20 Q70,50 85,75 M20,70 Q35,55 50,30 Q65,55 80,70",
    ];

    let clipPath = "";
    const pattern = isCorrect
      ? targetPattern
      : incorrectPatterns[fragmentData.id % incorrectPatterns.length];

    // Create clip paths for different fragments
    switch (fragment) {
      case "top-left":
        clipPath = "M0,0 L50,0 L50,50 L0,50 Z";
        break;
      case "top-right":
        clipPath = "M50,0 L100,0 L100,50 L50,50 Z";
        break;
      case "bottom-left":
        clipPath = "M0,50 L50,50 L50,100 L0,100 Z";
        break;
      case "bottom-right":
        clipPath = "M50,50 L100,50 L100,100 L50,100 Z";
        break;
    }

    const strokeColor = isCorrect ? colors.primary : colors.secondary;
    const isSelected = selectedFragments.includes(fragmentData.id);

    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter:
            isDarkMode && isSelected
              ? `drop-shadow(0 0 4px ${strokeColor})`
              : "none",
        }}
      >
        <defs>
          <clipPath id={`clip-${fragmentData.id}`}>
            <path d={clipPath} />
          </clipPath>
          <linearGradient
            id={`fragment-gradient-${fragmentData.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={strokeColor} stopOpacity="1" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#clip-${fragmentData.id})`}>
          <path
            d={pattern}
            fill="none"
            stroke={`url(#fragment-gradient-${fragmentData.id})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  };

  const renderInstructions = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-6 border-2"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        color: colors.text,
        fontFamily: shareTechMono.style.fontFamily,
      }}
    >
      <div
        className="border-b-2 pb-2 mb-6 flex justify-between items-center"
        style={{ borderColor: colors.border }}
      >
        <h1 className="text-xl font-bold">BIOMETRIC ACCESS CONTROL</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-3 py-1 border transition-colors"
          style={{
            borderColor: colors.border,
            color: colors.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.text;
            e.currentTarget.style.color = colors.background;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.text;
          }}
        >
          {isDarkMode ? "LIGHT" : "DARK"}
        </button>
      </div>

      <div className="space-y-4 text-sm">
        <p>{">"} SECURITY PROTOCOL INITIATED</p>
        <p>{">"} FINGERPRINT RECONSTRUCTION REQUIRED</p>
        <br />
        <p>INSTRUCTIONS:</p>
        <p>{">"} COMPLETE 4 FINGERPRINT RECONSTRUCTIONS</p>
        <p>{">"} SELECT 2-4 FINGERPRINT FRAGMENTS FROM THE GRID</p>
        <p>{">"} FRAGMENTS MUST BE PARTS OF THE TARGET FINGERPRINT</p>
        <p>{">"} CLICK ANALYZE TO VERIFY YOUR SELECTION</p>
        <p>{">"} YOU HAVE 4 ATTEMPTS TOTAL</p>
        <p>{">"} TIME LIMIT: 60 SECONDS</p>
        <p>{">"} FAILURE RESULTS IN 24-HOUR LOCKOUT</p>
        <br />
        <p style={{ color: isDarkMode ? "#fbbf24" : "#d97706" }}>
          WARNING: UNAUTHORIZED ACCESS ATTEMPTS WILL BE LOGGED
        </p>
      </div>

      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startGame}
          className="px-8 py-3 border-2 transition-colors font-bold"
          style={{
            borderColor: colors.border,
            color: colors.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.text;
            e.currentTarget.style.color = colors.background;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.text;
          }}
        >
          [INITIATE SCAN]
        </motion.button>
      </div>
    </motion.div>
  );

  const renderGame = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto p-4 border-2 relative"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        color: colors.text,
        fontFamily: shareTechMono.style.fontFamily,
      }}
    >
      {/* Header */}
      <div
        className="border-b-2 pb-2 mb-4 flex justify-between items-center"
        style={{ borderColor: colors.border }}
      >
        <h1 className="text-lg font-bold">Replicate Target</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-2 py-1 border text-xs transition-colors"
            style={{
              borderColor: colors.border,
              color: colors.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.text;
              e.currentTarget.style.color = colors.background;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.text;
            }}
          >
            {isDarkMode ? "LIGHT" : "DARK"}
          </button>
          <button
            onClick={exitGame}
            className="flex items-center gap-2 px-2 py-1 border text-xs transition-colors"
            style={{
              borderColor: colors.border,
              color: colors.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.text;
              e.currentTarget.style.color = colors.background;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.text;
            }}
          >
            <span>Exit</span>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Timer and Fragments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Square size={12} style={{ fill: colors.primary }} />
              <span className="text-sm font-bold">TIME</span>
            </div>
            <div
              className="text-4xl font-bold tracking-wider"
              style={{ color: colors.primary }}
            >
              {formatTime(time)}
            </div>
          </div>

          {/* Fingerprint Fragments Grid */}
          <div className="grid grid-cols-4 gap-3">
            {fingerprintFragments.map((fragmentData) => (
              <motion.div
                key={fragmentData.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectFragment(fragmentData.id)}
                className="aspect-square border-2 p-2 cursor-pointer transition-all"
                style={{
                  borderColor: selectedFragments.includes(fragmentData.id)
                    ? colors.secondary
                    : colors.border,
                  backgroundColor: selectedFragments.includes(fragmentData.id)
                    ? `${colors.secondary}20`
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!selectedFragments.includes(fragmentData.id)) {
                    e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedFragments.includes(fragmentData.id)) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {getFragmentSVG(fragmentData)}
              </motion.div>
            ))}
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: canAnalyze ? 1.02 : 1 }}
              whileTap={{ scale: canAnalyze ? 0.98 : 1 }}
              onClick={analyzeSelection}
              disabled={!canAnalyze}
              className="px-8 py-3 border-2 transition-colors font-bold"
              style={{
                borderColor: canAnalyze ? colors.primary : colors.border,
                color: canAnalyze ? colors.primary : `${colors.text}60`,
                backgroundColor: canAnalyze
                  ? `${colors.primary}10`
                  : "transparent",
                cursor: canAnalyze ? "pointer" : "not-allowed",
              }}
            >
              [ANALYZE SELECTION] ({selectedFragments.length}/4)
            </motion.button>
          </div>

          {/* Decoded Transmissions */}
          <div className="border-2 p-4" style={{ borderColor: colors.border }}>
            <div
              className="border-b pb-2 mb-4"
              style={{ borderColor: colors.border }}
            >
              <span className="text-sm font-bold">Decoded Transmissions</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-2 p-2"
                  style={{ borderColor: colors.border }}
                >
                  {decodedTransmissions[index] !== undefined ? (
                    getCompleteFingerprintSVG(decodedTransmissions[index])
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <X
                        size={24}
                        style={{ color: colors.border, opacity: 0.3 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-sm space-y-1">
            <p>Round {currentRound}/4 - Select 2-4 fingerprint</p>
            <p>fragments that match the target.</p>
            <br />
            <p>{">"} You are presented with only 4</p>
            <p> activation attempts total.</p>
            <br />
            <p>{">"} After the time expires, access will</p>
            <p> be blocked for 24 hours.</p>
          </div>
        </div>

        {/* Right Panel - Target Fingerprint */}
        <div className="space-y-4">
          <div className="border-2 p-4" style={{ borderColor: colors.border }}>
            <div
              className="border-b pb-2 mb-4 text-center"
              style={{ borderColor: colors.border }}
            >
              <span className="text-sm font-bold">Fingerprint</span>
            </div>

            {/* Target Display */}
            <div
              className="border-2 p-4 mb-4 relative"
              style={{ borderColor: colors.border }}
            >
              <div className="aspect-square relative">
                {/* Corner brackets */}
                <div
                  className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2"
                  style={{ borderColor: colors.primary }}
                ></div>
                <div
                  className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2"
                  style={{ borderColor: colors.primary }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2"
                  style={{ borderColor: colors.primary }}
                ></div>
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2"
                  style={{ borderColor: colors.primary }}
                ></div>

                {/* Target Fingerprint - Complete fingerprint */}
                <div className="w-full h-full p-4">
                  {getCompleteFingerprintSVG(targetFingerprint)}
                </div>
              </div>
            </div>

            {/* Attempts Counter */}
            <div className="text-right">
              <span className="text-sm">Attempts </span>
              <div className="grid grid-cols-4 gap-1 mt-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square border flex items-center justify-center"
                    style={{ borderColor: colors.primary }}
                  >
                    {i < failedAttempts ? (
                      <X size={12} style={{ color: colors.primary }} />
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {gameState === "processing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: `${colors.background}e6` }}
          >
            <div
              className="border-2 p-8 max-w-md w-full mx-4"
              style={{
                borderColor: colors.primary,
                backgroundColor: colors.background,
              }}
            >
              <div
                className="border-b pb-2 mb-6 text-center"
                style={{ borderColor: colors.primary }}
              >
                <span className="text-sm font-bold">Fingerprint Analysis</span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-4">PROCESSING</h3>
                <div
                  className="border-2 h-4 relative overflow-hidden"
                  style={{ borderColor: colors.primary }}
                >
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: colors.primary }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${processingProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm mt-2">
                  {Math.round(processingProgress)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Overlay */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: `${colors.background}e6` }}
          >
            <div
              className="border-2 p-8 max-w-md w-full mx-4"
              style={{
                borderColor: colors.primary,
                backgroundColor: colors.background,
              }}
            >
              <div
                className="border-b pb-2 mb-6 text-center"
                style={{ borderColor: colors.primary }}
              >
                <span className="text-sm font-bold">Fingerprint Analysis</span>
              </div>

              <div className="text-center">
                <AlertTriangle
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: colors.primary }}
                />
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.primary }}
                >
                  Error
                </h3>
                <p className="text-sm">
                  Access denied - Incorrect fragments selected
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderResult = (title: string, message: string, isSuccess: boolean) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto p-8 border-2 text-center"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        color: colors.text,
        fontFamily: shareTechMono.style.fontFamily,
      }}
    >
      <div
        className="text-6xl mb-6"
        style={{
          color: isSuccess ? colors.secondary : "#ef4444",
        }}
      >
        {isSuccess ? "✓" : "✗"}
      </div>

      <h2
        className="text-2xl font-bold mb-4"
        style={{
          color: isSuccess ? colors.secondary : "#ef4444",
        }}
      >
        {title}
      </h2>

      <p className="mb-8 text-sm">{message}</p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setGameState("instructions")}
        className="px-8 py-3 border-2 transition-colors font-bold"
        style={{
          borderColor: colors.border,
          color: colors.text,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.text;
          e.currentTarget.style.color = colors.background;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = colors.text;
        }}
      >
        [RESTART SYSTEM]
      </motion.button>
    </motion.div>
  );

  const renderBlocked = () => {
    if (!blockTime) return null;

    const timeDiff = blockTime.getTime() - Date.now();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return renderResult(
      "SYSTEM LOCKED",
      `SECURITY BREACH DETECTED - ACCESS RESTRICTED FOR ${hours}H ${minutes}M`,
      false
    );
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 transition-colors"
      style={{
        backgroundColor: colors.background,
        fontFamily: shareTechMono.style.fontFamily,
      }}
    >
      <AnimatePresence mode="wait">
        {gameState === "instructions" && renderInstructions()}
        {(gameState === "playing" || gameState === "processing") &&
          renderGame()}
        {gameState === "won" &&
          renderResult(
            "ACCESS GRANTED",
            "ALL FINGERPRINTS SUCCESSFULLY DECODED",
            true
          )}
        {gameState === "lost" &&
          renderResult(
            "ACCESS DENIED",
            "AUTHENTICATION FAILED - SECURITY LOCKOUT INITIATED",
            false
          )}
        {gameState === "blocked" && renderBlocked()}
      </AnimatePresence>
    </div>
  );
};

export default App;
