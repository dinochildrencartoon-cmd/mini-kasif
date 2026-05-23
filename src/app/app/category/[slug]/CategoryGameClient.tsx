"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { categories, Category } from "@/lib/gamesData";
import { KidsHeader } from "@/components/KidsHeader";
import { KidsFooter } from "@/components/KidsFooter";
import { PremiumLockModal } from "@/components/PremiumLockModal";
import { MultipleChoiceGame } from "@/components/games/MultipleChoiceGame";
import { MatchingGame } from "@/components/games/MatchingGame";
import { FindTheOddGame } from "@/components/games/FindTheOddGame";
import { MemoryMissingGame } from "@/components/games/MemoryMissingGame";
import { OfflineTaskCard } from "@/components/games/OfflineTaskCard";
import { BadgeReward } from "@/components/games/BadgeReward";

interface CategoryGameClientProps {
  slug: string;
}

export default function CategoryGameClient({ slug }: CategoryGameClientProps) {
  const router = useRouter();
  const {
    isPremium,
    addStars,
    unlockBadge,
    completeAdventure,
    updateProgress,
  } = useApp();

  const [category, setCategory] = useState<Category | null>(null);
  const [step, setStep] = useState<number>(0); // 0: Intro, 1: Learn, 2: Game1, 3: Game2, 4: Game3, 5: Quiz, 6: OfflineTask, 7: Badge Celebration
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string>("");
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");

  // Speech synthesis helper
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Find active category
  useEffect(() => {
    const found = categories.find((c) => c.slug === slug);
    if (found) {
      setCategory(found);
      speakText(`${found.title} macerasına hoş geldin! Keşfetmek için başla butonuna dokun.`);
    } else {
      router.push("/app/categories");
    }
  }, [slug, router]);

  // Gate Check
  const hasAccess = category ? (category.isFree || isPremium) : false;

  useEffect(() => {
    if (category && !hasAccess) {
      setIsLockModalOpen(true);
    }
  }, [category, hasAccess]);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <span className="text-xl font-kids font-bold text-slate-400 animate-pulse">
          Yükleniyor... 🚀
        </span>
      </div>
    );
  }

  // Render Premium Lock Guard if no access
  if (!hasAccess) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-100 items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border-4 border-dashed border-kids-orange text-center shadow-xl space-y-6">
          <span className="text-7xl block animate-bounce-logo select-none">🔒💎</span>
          <h2 className="font-kids font-bold text-2xl text-slate-800">
            Kilitli Kategori
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
            Bu kategorideki mini oyunları oynamak için Premium üyelik gereklidir.
          </p>
          <button
            onClick={() => setIsLockModalOpen(true)}
            className="w-full py-4 bg-accent hover:bg-accent/95 text-white font-kids font-bold rounded-2xl shadow-lg hover:shadow-accent/20 transition-all text-base cursor-pointer"
          >
            Detayları Görüntüle 🔓
          </button>
          <button
            onClick={() => router.push("/app/categories")}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-kids font-bold rounded-2xl transition-all text-xs cursor-pointer"
          >
            Kategorilere Dön 🧒
          </button>
        </div>

        <PremiumLockModal
          isOpen={isLockModalOpen}
          onClose={() => {
            setIsLockModalOpen(false);
            router.push("/app/categories");
          }}
        />
      </div>
    );
  }

  // Progress to next steps
  const handleGameComplete = () => {
    // Add stars for completing a mini-game
    addStars(3, category.slug, `game-${step - 1}`);
    showToast("Harika! 3 Yıldız Kazandın! ⭐");
    
    // Go to next step
    setStep((prev) => prev + 1);
  };

  const handleQuizOptionClick = (optIdx: number, isCorrect: boolean) => {
    if (isQuizCorrect) return; // solved
    setSelectedQuizOpt(optIdx);

    const activeQuestion = category.quiz[quizIndex];

    if (isCorrect) {
      setIsQuizCorrect(true);
      setQuizFeedback("Tebrikler! Doğru cevap! 🎉");
      speakText("Tebrikler! Doğru cevap!");
      addStars(1, category.slug, `quiz-${quizIndex}`);

      setTimeout(() => {
        if (quizIndex < category.quiz.length - 1) {
          // Go to next question
          setQuizIndex((prev) => prev + 1);
          setSelectedQuizOpt(null);
          setQuizFeedback("");
          setIsQuizCorrect(false);
        } else {
          // Finish quiz, go to offline task
          setStep(6);
        }
      }, 1800);
    } else {
      setQuizFeedback(activeQuestion.hint);
      speakText(activeQuestion.hint);
    }
  };

  const handleOfflineTaskVerifySuccess = () => {
    unlockBadge(category.badge);
    completeAdventure(`${category.slug}_completed`, category.badge);
    updateProgress(category.slug as any, 100);
    setStep(7);
  };

  const handleFinishAdventure = () => {
    router.push("/app/categories");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <KidsHeader
        title={`${category.title} Macerası ${category.emoji}`}
        subtitle={
          step === 0
            ? "Macerayı keşfetmeye başlayalım!"
            : step === 1
            ? "Nesneleri incele ve seslerini dinle!"
            : step >= 2 && step <= 4
            ? `Mini Oyun ${step - 1} / 3`
            : step === 5
            ? "Pekiştirme Soruları"
            : step === 6
            ? "Ekran Dışı Görev"
            : "Tebrikler!"
        }
        onBack={() => {
          if (step > 0) {
            setStep((prev) => prev - 1);
          } else {
            router.push("/app/categories");
          }
        }}
      />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col justify-center">
        {/* Step Progress Dots */}
        {step > 0 && step < 7 && (
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-8 bg-kids-purple shadow-sm"
                    : i < step
                    ? "w-3 bg-success opacity-70"
                    : "w-3 bg-slate-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* STEP 0: Giriş Ekranı */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md text-center space-y-6 max-w-md mx-auto animate-float-sparkle">
            <span className="text-7xl block select-none animate-bounce-logo">
              {category.emoji}
            </span>
            <div className="space-y-2">
              <h1 className="font-kids font-extrabold text-3xl text-slate-800">
                {category.title}
              </h1>
              <p className="text-slate-500 text-sm font-semibold leading-relaxed px-4">
                {category.desc}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="font-kids font-bold text-xs text-slate-500">
                Kazanılacak Rozet: <strong className="text-slate-700">{category.badge}</strong>
              </span>
            </div>

            <button
              onClick={() => {
                setStep(1);
                speakText("Öğrenme kartlarını inceleyelim!");
              }}
              className="w-full py-4 bg-primary hover:bg-primary/95 text-white font-kids font-bold text-lg rounded-2xl shadow-lg hover:shadow-primary/30 active:scale-99 transition-all cursor-pointer focus:outline-hidden"
            >
              Maceraya Başla 🚀
            </button>
          </div>
        )}

        {/* STEP 1: Kısa Öğrenme Kartı */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-kids font-bold text-2xl text-slate-800">
                {category.learningCard.title}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Öğrenmek istediğin kutuya dokun ve dinle!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.learningCard.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => speakText(item.soundText)}
                  className="bg-slate-50 hover:bg-slate-100/70 border-2 border-slate-100 hover:border-slate-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-98 transition-all group"
                >
                  <span className="text-5xl select-none group-hover:scale-110 transition-transform">
                    {item.visual}
                  </span>
                  <div className="space-y-0.5 text-left">
                    <h4 className="font-kids font-bold text-slate-800 text-base flex items-center gap-1.5">
                      {item.title} 🔊
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setStep(2);
                speakText("Şimdi oyun zamanı! İlk oyuna başlıyoruz.");
              }}
              className="w-full py-4 bg-kids-purple hover:bg-kids-purple/95 text-white font-kids font-bold text-lg rounded-2xl shadow-lg hover:shadow-kids-purple/20 active:scale-99 transition-all cursor-pointer focus:outline-hidden"
            >
              Öğrendim, Oyunlara Hazırım! 🎮
            </button>
          </div>
        )}

        {/* STEP 2, 3, 4: Mini Oyunlar */}
        {step === 2 && category.games[0] && (
          <div>
            {category.games[0].type === "multiple-choice" && (
              <MultipleChoiceGame
                game={category.games[0]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[0].type === "matching" && (
              <MatchingGame
                game={category.games[0]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[0].type === "find-the-odd" && (
              <FindTheOddGame
                game={category.games[0]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[0].type === "memory-missing" && (
              <MemoryMissingGame
                game={category.games[0]}
                onCorrect={handleGameComplete}
              />
            )}
          </div>
        )}

        {step === 3 && category.games[1] && (
          <div>
            {category.games[1].type === "multiple-choice" && (
              <MultipleChoiceGame
                game={category.games[1]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[1].type === "matching" && (
              <MatchingGame
                game={category.games[1]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[1].type === "find-the-odd" && (
              <FindTheOddGame
                game={category.games[1]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[1].type === "memory-missing" && (
              <MemoryMissingGame
                game={category.games[1]}
                onCorrect={handleGameComplete}
              />
            )}
          </div>
        )}

        {step === 4 && category.games[2] && (
          <div>
            {category.games[2].type === "multiple-choice" && (
              <MultipleChoiceGame
                game={category.games[2]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[2].type === "matching" && (
              <MatchingGame
                game={category.games[2]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[2].type === "find-the-odd" && (
              <FindTheOddGame
                game={category.games[2]}
                onCorrect={handleGameComplete}
              />
            )}
            {category.games[2].type === "memory-missing" && (
              <MemoryMissingGame
                game={category.games[2]}
                onCorrect={handleGameComplete}
              />
            )}
          </div>
        )}

        {/* STEP 5: Pekiştirme Quiz (3 Soru) */}
        {step === 5 && category.quiz[quizIndex] && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
            <div className="flex justify-between items-center bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 gap-4">
              <button
                onClick={() => speakText(category.quiz[quizIndex].question)}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 text-xl text-primary shadow-xs cursor-pointer focus:outline-hidden"
                title="Soruyu Sesli Dinle"
              >
                🔊
              </button>
              <h2 className="font-kids font-bold text-xl sm:text-2xl text-slate-800 text-left flex-grow">
                {category.quiz[quizIndex].question}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {category.quiz[quizIndex].options.map((opt, idx) => {
                const isSelected = selectedQuizOpt === idx;
                let optBg = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
                
                if (isSelected) {
                  optBg = opt.isCorrect
                    ? "bg-success-light border-success text-success"
                    : "bg-red-50 border-danger text-danger";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizOptionClick(idx, opt.isCorrect)}
                    className={`p-6 border-4 rounded-3xl flex flex-col items-center gap-3 hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-hidden ${optBg}`}
                  >
                    <span className="text-5xl select-none">{opt.emoji}</span>
                    <span className="font-kids font-bold text-base sm:text-lg">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div
              className={`p-4 rounded-2xl text-center font-kids font-bold text-sm sm:text-base border transition-all ${
                isQuizCorrect
                  ? "bg-success-light border-success/30 text-success animate-bounce-logo"
                  : quizFeedback
                  ? "bg-amber-50 border-amber-200 text-amber-700 animate-wiggle"
                  : "bg-slate-50 border-slate-100 text-slate-500"
              }`}
            >
              {quizFeedback || `Pekiştirme Sorusu ${quizIndex + 1} / 3 ⭐`}
            </div>
          </div>
        )}

        {/* STEP 6: Ekran Dışı Görev */}
        {step === 6 && (
          <OfflineTaskCard
            taskText={category.offlineTask}
            onVerifySuccess={handleOfflineTaskVerifySuccess}
            onLater={() => router.push("/app/categories")}
          />
        )}

        {/* STEP 7: Rozet Kazanımı */}
        {step === 7 && (
          <BadgeReward
            badgeName={category.badge}
            categoryTitle={category.title}
            onFinish={handleFinishAdventure}
          />
        )}
      </main>

      <KidsFooter />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-kids font-bold text-sm px-6 py-3 rounded-full shadow-2xl animate-bounce-logo border-2 border-accent">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
