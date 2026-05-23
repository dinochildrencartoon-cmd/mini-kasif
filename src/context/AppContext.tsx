"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  addStars: (count: number, categorySlug?: string, contentSlug?: string) => void;
  unlockBadge: (badge: string) => void;
  completeMission: () => void;
  setScreenTimeLimit: (minutes: number) => void;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setIsPremium: (val: boolean) => void;
  completeAdventure: (adventureId: string, badge?: string) => void;
  updateProgress: (category: keyof ProgressState, amount: number) => void;
  submitEarlyAccess: (data: Omit<EarlyAccessData, "submittedAt">) => void;
  resetProgress: () => void;
  
  // Supabase integration extensions
  user: any;
  loading: boolean;
  childAge: number | null;
  setChildAge: (age: number) => Promise<void>;
  parentName: string;
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [parentName, setParentNameState] = useState("");
  const [childAge, setChildAgeState] = useState<number | null>(null);

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

  // 1. Supabase Auth Listener & State Synchronization
  useEffect(() => {
    // Get current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
        resetLocalState();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Fetch User Data from Supabase when logged in
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profiles:", profileError);
        } else if (profileData) {
          setParentNameState(profileData.full_name || "");
          setIsPremiumState(profileData.plan === "premium");
          
          // Populate earlyAccess mock schema if we want to show details in parent dashboard
          setEarlyAccess({
            parentName: profileData.full_name || "",
            email: profileData.email || "",
            childAge: "", // will fill from child_profiles
            interestReasons: [],
            submittedAt: new Date(profileData.created_at).toLocaleDateString("tr-TR"),
          });
        }

        // Fetch child profile
        const { data: childData, error: childError } = await supabase
          .from("child_profiles")
          .select("*")
          .eq("parent_id", user.id)
          .maybeSingle();

        if (childError) {
          console.error("Error fetching child profiles:", childError);
        } else if (childData) {
          setChildAgeState(childData.child_age);
          setEarlyAccess((prev) =>
            prev ? { ...prev, childAge: childData.child_age.toString() } : null
          );
        }

        // Fetch user progress
        const { data: progressData, error: progressError } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id);

        if (progressError) {
          console.error("Error fetching user progress:", progressError);
        } else if (progressData && progressData.length > 0) {
          let starsSum = 0;
          const adventures: string[] = [];
          const badges: string[] = [];
          const progressMap: ProgressState = {
            colors: 0,
            numbers: 0,
            shapes: 0,
            animals: 0,
            emotions: 0,
            manners: 0,
            english: 0,
            attention: 0,
          };

          progressData.forEach((row) => {
            if (row.stars) {
              starsSum += row.stars;
            }
            if (row.completed) {
              const advId = `${row.category_slug}_${row.content_slug}`;
              adventures.push(advId);
            }
            if (row.badge && !badges.includes(row.badge)) {
              badges.push(row.badge);
            }
          });

          // Calculate category progress percentages based on number of completed adventures
          const categories = [
            "colors",
            "numbers",
            "shapes",
            "animals",
            "emotions",
            "manners",
            "english",
            "attention",
          ];

          categories.forEach((cat) => {
            const completedInCat = progressData.filter(
              (row) => row.category_slug === cat && row.completed
            ).length;

            if (cat === "colors") {
              // colors starts with 20% by default for Mavi
              progressMap.colors = Math.min(100, Math.max(20, completedInCat * 20));
            } else {
              progressMap[cat as keyof ProgressState] = Math.min(100, completedInCat * 20);
            }
          });

          // If the default "colors_Mavi Rengi Keşfedelim" is not in adventures, we make sure it's there
          if (!adventures.includes("colors_Mavi Rengi Keşfedelim")) {
            adventures.unshift("colors_Mavi Rengi Keşfedelim");
          }
          if (!badges.includes("🔵 Mavi Kâşifi")) {
            badges.unshift("🔵 Mavi Kâşifi");
          }
          if (starsSum === 0) {
            starsSum = 25; // fallback default
          }

          setStarsCount(starsSum);
          setCompletedAdventures(adventures);
          setUnlockedBadges(badges);
          setProgress(progressMap);
        } else {
          // If no progress records, insert the initial default record so it syncs to DB
          await supabase.from("user_progress").insert({
            user_id: user.id,
            category_slug: "colors",
            content_slug: "Mavi Rengi Keşfedelim",
            completed: true,
            stars: 25,
            badge: "🔵 Mavi Kâşifi",
            completed_at: new Date().toISOString(),
          });
          setStarsCount(25);
          setCompletedAdventures(["colors_Mavi Rengi Keşfedelim"]);
          setUnlockedBadges(["🔵 Mavi Kâşifi"]);
          setProgress(defaultProgress);
        }
      } catch (err) {
        console.error("Error fetching user data from Supabase:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Load screen time limits from localStorage on mount (keeps local storage for browser-specific screen time settings)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLimit = localStorage.getItem("mk_time_limit");
      const limitVal = storedLimit !== null ? parseInt(storedLimit) : 15;
      setScreenTimeLimitState(limitVal);
      setTimeLeft(limitVal === 0 ? 999999 : limitVal * 60);

      const storedSpent = localStorage.getItem("mk_time_spent");
      if (storedSpent) {
        setTimeSpent(parseInt(storedSpent));
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
          return 0;
        }
        return prev - 1;
      });

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

  const resetLocalState = () => {
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
    setParentNameState("");
    setChildAgeState(null);
  };

  const addStars = async (count: number, categorySlug?: string, contentSlug?: string) => {
    setStarsCount((prev) => {
      const next = prev + count;
      localStorage.setItem("mk_stars", next.toString());
      return next;
    });

    if (user && categorySlug && contentSlug) {
      try {
        const { data } = await supabase
          .from("user_progress")
          .select("stars")
          .eq("user_id", user.id)
          .eq("category_slug", categorySlug)
          .eq("content_slug", contentSlug)
          .maybeSingle();

        const newStars = (data?.stars || 0) + count;

        await supabase.from("user_progress").upsert(
          {
            user_id: user.id,
            category_slug: categorySlug,
            content_slug: contentSlug,
            stars: newStars,
          },
          { onConflict: "user_id,category_slug,content_slug" }
        );
      } catch (err) {
        console.error("Error syncing stars to Supabase:", err);
      }
    }
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

  const setIsPremium = async (val: boolean) => {
    setIsPremiumState(val);
    localStorage.setItem("mk_is_premium", val.toString());

    if (user) {
      try {
        await supabase
          .from("profiles")
          .update({ plan: val ? "premium" : "free" })
          .eq("id", user.id);
      } catch (err) {
        console.error("Error syncing premium status to Supabase:", err);
      }
    }
  };

  const completeAdventure = async (adventureId: string, badge?: string) => {
    setCompletedAdventures((prev) => {
      if (prev.includes(adventureId)) return prev;
      const next = [...prev, adventureId];
      localStorage.setItem("mk_completed_adventures", JSON.stringify(next));
      return next;
    });

    if (user) {
      const parts = adventureId.split("_");
      const categorySlug = parts[0];
      const contentSlug = parts.slice(1).join("_");

      try {
        await supabase.from("user_progress").upsert(
          {
            user_id: user.id,
            category_slug: categorySlug,
            content_slug: contentSlug,
            completed: true,
            completed_at: new Date().toISOString(),
            ...(badge ? { badge } : {}),
          },
          { onConflict: "user_id,category_slug,content_slug" }
        );
      } catch (err) {
        console.error("Error syncing completed adventure to Supabase:", err);
      }
    }
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

  const setChildAge = async (age: number) => {
    setChildAgeState(age);
    setEarlyAccess((prev) => (prev ? { ...prev, childAge: age.toString() } : null));

    if (user) {
      try {
        const { data } = await supabase
          .from("child_profiles")
          .select("id")
          .eq("parent_id", user.id)
          .maybeSingle();

        if (data?.id) {
          await supabase
            .from("child_profiles")
            .update({ child_age: age })
            .eq("id", data.id);
        } else {
          await supabase.from("child_profiles").insert({
            parent_id: user.id,
            child_age: age,
          });
        }
      } catch (err) {
        console.error("Error syncing child age to Supabase:", err);
      }
    }
  };

  const resetProgress = async () => {
    resetLocalState();

    if (user) {
      try {
        await supabase.from("user_progress").delete().eq("user_id", user.id);
        await supabase
          .from("profiles")
          .update({ plan: "free" })
          .eq("id", user.id);
      } catch (err) {
        console.error("Error resetting data in Supabase:", err);
      }
    }
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
        user,
        loading,
        childAge,
        setChildAge,
        parentName,
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
