"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProgressState {
  colors: number;
  numbers: number;
  shapes: number;
  animals: number;
  emotions: number;
  manners: number;
  english: number;
  attention: number;
}

export interface EarlyAccessData {
  parentName: string;
  email: string;
  childAge: string;
  interestReasons: string[];
  submittedAt: string;
}

interface AppContextType {
  starsCount: number;
  unlockedBadges: string[];
  completedMissions: number;
  timeSpent: number;
  screenTimeLimit: number; // in minutes, 0 means unlimited
  timeLeft: number; // in seconds
  isPremium: boolean;
  completedAdventures: string[];
  progress: ProgressState;
  earlyAccess: EarlyAccessData | null;
  addStars: (count: number) => void;
  unlockBadge: (badge: string) => void;
  completeMission: () => void;
  setScreenTimeLimit: (minutes: number) => void;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setIsPremium: (val: boolean) => void;
  completeAdventure: (adventureId: string) => void;
  updateProgress: (category: keyof ProgressState, amount: number) => void;
  submitEarlyAccess: (data: Omit<EarlyAccessData, "submittedAt">) => void;
  resetProgress: () => void;
}

const defaultProgress: ProgressState = {
  colors: 20,
  numbers: 0,
  shapes: 0,
  animals: 0,
  emotions: 0,
  manners: 0,
  english: 0,
  attention: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [starsCount, setStarsCount] = useState(25);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(["🔵 Mavi Kâşifi"]);
  const [completedMissions, setCompletedMissions] = useState(1);
  const [timeSpent, setTimeSpent] = useState(12);
  const [screenTimeLimit, setScreenTimeLimitState] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isPremium, setIsPremiumState] = useState(false);
  const [completedAdventures, setCompletedAdventures] = useState<string[]>([
    "colors_Mavi Rengi Keşfedelim",
  ]);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [earlyAccess, setEarlyAccess] = useState<EarlyAccessData | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialized = localStorage.getItem("mk_initialized");
      if (initialized) {
        setStarsCount(parseInt(localStorage.getItem("mk_stars") || "25"));
        setUnlockedBadges(JSON.parse(localStorage.getItem("mk_badges") || '["🔵 Mavi Kâşifi"]'));
        setCompletedMissions(parseInt(localStorage.getItem("mk_missions") || "1"));
        setTimeSpent(parseInt(localStorage.getItem("mk_time_spent") || "12"));
        
        const storedLimit = localStorage.getItem("mk_time_limit");
        const limitVal = storedLimit !== null ? parseInt(storedLimit) : 15;
        setScreenTimeLimitState(limitVal);
        setTimeLeft(limitVal === 0 ? 999999 : limitVal * 60);

        setIsPremiumState(localStorage.getItem("mk_is_premium") === "true");
        setCompletedAdventures(
          JSON.parse(localStorage.getItem("mk_completed_adventures") || '["colors_Mavi Rengi Keşfedelim"]')
        );
        setProgress(
          JSON.parse(localStorage.getItem("mk_progress") || JSON.stringify(defaultProgress))
        );
        const storedEarlyAccess = localStorage.getItem("mk_early_access");
        if (storedEarlyAccess) {
          setEarlyAccess(JSON.parse(storedEarlyAccess));
        }
      } else {
        // First run initialization
        localStorage.setItem("mk_initialized", "true");
        localStorage.setItem("mk_stars", "25");
        localStorage.setItem("mk_badges", JSON.stringify(["🔵 Mavi Kâşifi"]));
        localStorage.setItem("mk_missions", "1");
        localStorage.setItem("mk_time_spent", "12");
        localStorage.setItem("mk_time_limit", "15");
        localStorage.setItem("mk_is_premium", "false");
        localStorage.setItem("mk_completed_adventures", JSON.stringify(["colors_Mavi Rengi Keşfedelim"]));
        localStorage.setItem("mk_progress", JSON.stringify(defaultProgress));
      }
      setIsInitialized(true);
    }
  }, []);

  // Screen time countdown timer
  useEffect(() => {
    if (!isInitialized || screenTimeLimit === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired
          return 0;
        }
        return prev - 1;
      });

      // Increment actual active time spent every minute
      setTimeLeft((prev) => {
        if (prev > 0 && prev % 60 === 0) {
          setTimeSpent((spent) => {
            const nextSpent = spent + 1;
            localStorage.setItem("mk_time_spent", nextSpent.toString());
            return nextSpent;
          });
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isInitialized, screenTimeLimit]);

  const addStars = (count: number) => {
    setStarsCount((prev) => {
      const next = prev + count;
      localStorage.setItem("mk_stars", next.toString());
      return next;
    });
  };

  const unlockBadge = (badge: string) => {
    setUnlockedBadges((prev) => {
      if (prev.includes(badge)) return prev;
      const next = [...prev, badge];
      localStorage.setItem("mk_badges", JSON.stringify(next));
      return next;
    });
  };

  const completeMission = () => {
    setCompletedMissions((prev) => {
      const next = prev + 1;
      localStorage.setItem("mk_missions", next.toString());
      return next;
    });
  };

  const setScreenTimeLimit = (minutes: number) => {
    setScreenTimeLimitState(minutes);
    localStorage.setItem("mk_time_limit", minutes.toString());
    setTimeLeft(minutes === 0 ? 999999 : minutes * 60);
  };

  const setIsPremium = (val: boolean) => {
    setIsPremiumState(val);
    localStorage.setItem("mk_is_premium", val.toString());
  };

  const completeAdventure = (adventureId: string) => {
    setCompletedAdventures((prev) => {
      if (prev.includes(adventureId)) return prev;
      const next = [...prev, adventureId];
      localStorage.setItem("mk_completed_adventures", JSON.stringify(next));
      return next;
    });
  };

  const updateProgress = (category: keyof ProgressState, amount: number) => {
    setProgress((prev) => {
      const nextVal = Math.min(100, (prev[category] || 0) + amount);
      const next = { ...prev, [category]: nextVal };
      localStorage.setItem("mk_progress", JSON.stringify(next));
      return next;
    });
  };

  const submitEarlyAccess = (data: Omit<EarlyAccessData, "submittedAt">) => {
    const formattedData: EarlyAccessData = {
      ...data,
      submittedAt: new Date().toLocaleDateString("tr-TR"),
    };
    setEarlyAccess(formattedData);
    localStorage.setItem("mk_early_access", JSON.stringify(formattedData));
  };

  const resetProgress = () => {
    setStarsCount(25);
    setUnlockedBadges(["🔵 Mavi Kâşifi"]);
    setCompletedMissions(1);
    setTimeSpent(12);
    setScreenTimeLimitState(15);
    setTimeLeft(15 * 60);
    setIsPremiumState(false);
    setCompletedAdventures(["colors_Mavi Rengi Keşfedelim"]);
    setProgress(defaultProgress);
    setEarlyAccess(null);

    localStorage.setItem("mk_stars", "25");
    localStorage.setItem("mk_badges", JSON.stringify(["🔵 Mavi Kâşifi"]));
    localStorage.setItem("mk_missions", "1");
    localStorage.setItem("mk_time_spent", "12");
    localStorage.setItem("mk_time_limit", "15");
    localStorage.setItem("mk_is_premium", "false");
    localStorage.setItem("mk_completed_adventures", JSON.stringify(["colors_Mavi Rengi Keşfedelim"]));
    localStorage.setItem("mk_progress", JSON.stringify(defaultProgress));
    localStorage.removeItem("mk_early_access");
  };

  return (
    <AppContext.Provider
      value={{
        starsCount,
        unlockedBadges,
        completedMissions,
        timeSpent,
        screenTimeLimit,
        timeLeft,
        isPremium,
        completedAdventures,
        progress,
        earlyAccess,
        addStars,
        unlockBadge,
        completeMission,
        setScreenTimeLimit,
        setTimeLeft,
        setIsPremium,
        completeAdventure,
        updateProgress,
        submitEarlyAccess,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
