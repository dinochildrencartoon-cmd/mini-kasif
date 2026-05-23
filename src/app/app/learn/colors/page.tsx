"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { KidsHeader } from "@/components/KidsHeader";
import { KidsFooter } from "@/components/KidsFooter";
import { PremiumUpsellModal } from "@/components/PremiumUpsellModal";
import { ParentGateModal } from "@/components/ParentGateModal";

interface Adventure {
  id: string;
  title: string;
  isFree: boolean;
  desc: string;
  videoText: string;
  videoVoice: string;
  quizQuestion: string;
  quizHint: string;
  options: { emoji: string; text: string; isCorrect: boolean }[];
  mission: string;
  badge: string;
}

export default function ColorsAdventure() {
  const router = useRouter();
  const { isPremium, addStars, unlockBadge, completeAdventure, updateProgress } = useApp();

  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
  const [activeTab, setActiveTab] = useState<"video" | "quiz">("video");
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  
  // Quiz states
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [quizSuccess, setQuizSuccess] = useState(false);

  // Mission States
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);

  // Notification Toast
  const [toastMsg, setToastMsg] = useState("");

  const adventures: Adventure[] = [
    {
      id: "mavi",
      title: "Mavi Rengi Keşfedelim",
      isFree: true,
      desc: "Gökyüzünün ve sevimli balıkların mavi dünyasını keşfe çıkıyoruz.",
      videoText: "Yukarıdaki sevimli şekilleri izle ve sesli anlatımı dinle! Mavi, gökyüzünün ve denizlerin rengidir.",
      videoVoice: "Derin ve huzurlu gökyüzü ile denizlerin mavi dünyasını sevimli mavi balıklar eşliğinde keşfe çıkıyoruz.",
      quizQuestion: "Hangisi mavi renklidir? 🌊",
      quizHint: "Bir daha bakalım. Mavi rengi gökyüzünde ve sevimli balıklarda görebiliriz.",
      options: [
        { emoji: "🔵", text: "Gökyüzü", isCorrect: true },
        { emoji: "🍌", text: "Muz", isCorrect: false },
        { emoji: "🍅", text: "Domates", isCorrect: false },
      ],
      mission: "Odandaki 3 tane mavi renkli oyuncağı veya eşyayı bul ve anne ya da babana göster!",
      badge: "🔵 Mavi Kâşifi",
    },
    {
      id: "kirmizi",
      title: "Kırmızı Elma Nerede?",
      isFree: false,
      desc: "Tatlı elmalarla kırmızının canlılığını keşfedelim.",
      videoText: "Sevimli elma ağacındaki kırmızı elmaları keşfedelim! Kırmızı, elmaların, çileklerin ve sevginin rengidir.",
      videoVoice: "Tatlı elmalar ve parlak çilekler eşliğinde kırmızının enerjik dünyasını keşfe çıkıyoruz. Ağaçtaki kırmızı elmaları görebiliyor musun?",
      quizQuestion: "Hangisi kırmızı renklidir? 🍎",
      quizHint: "Kırmızı renk elmalarda, domateslerde ve çileklerde bulunur. Tekrar deneyelim!",
      options: [
        { emoji: "🍎", text: "Elma", isCorrect: true },
        { emoji: "🍌", text: "Muz", isCorrect: false },
        { emoji: "🐬", text: "Yunus", isCorrect: false },
      ],
      mission: "Mutfaktan veya evden 3 tane kırmızı renkli yiyecek veya eşya bul ve ebeveynine göster!",
      badge: "🔴 Kırmızı Kâşifi",
    },
    {
      id: "sari",
      title: "Sarı Güneş ve Yıldızlar",
      isFree: false,
      desc: "Dünyamızı ısıtan sarı güneşi ve parıldayan yıldızları tanıyalım.",
      videoText: "Gökyüzünde parıldayan sarı güneşi ve yıldızları izleyelim! Sarı, güneşin, muzların ve neşeli yıldızların rengidir.",
      videoVoice: "Dünyamızı ısıtan sıcacık güneşin ve geceleri parıldayan neşeli sarı yıldızların dünyasına hoş geldiniz.",
      quizQuestion: "Hangisi sarı renklidir? ☀️",
      quizHint: "Sarı renk güneşte, muzda ve parıldayan yıldızlarda bulunur. Bir kez daha bakalım!",
      options: [
        { emoji: "🍌", text: "Muz", isCorrect: true },
        { emoji: "🍓", text: "Çilek", isCorrect: false },
        { emoji: "🐳", text: "Balina", isCorrect: false },
      ],
      mission: "Gökyüzüne bak veya evde sarı renkli bir eşya bulup ebeveynine ne olduğunu anlat!",
      badge: "🟡 Sarı Kâşifi",
    },
    {
      id: "yesil",
      title: "Yeşil Yaprakların Sırrı",
      isFree: false,
      desc: "Doğadaki taze çimenleri ve ormanları süsleyen yeşil rengini keşfedelim.",
      videoText: "Taze çimenlerin ve yeşil yaprakların sırrını keşfedelim! Yeşil, ormanların, yaprakların ve sevimli kurbağaların rengidir.",
      videoVoice: "Doğanın huzur veren yeşil tonlarını, taze çimenleri ve ağaçlardaki sevimli yeşil yaprakları keşfediyoruz.",
      quizQuestion: "Hangisi yeşil renklidir? 🐸",
      quizHint: "Yeşil renk kurbağalarda, yapraklarda ve çimenlerde bulunur. Tekrar aramaya ne dersin?",
      options: [
        { emoji: "🐸", text: "Kurbağa", isCorrect: true },
        { emoji: "🍋", text: "Limon", isCorrect: false },
        { emoji: "🍅", text: "Domates", isCorrect: false },
      ],
      mission: "Bahçedeki veya saksıdaki yeşil bir yaprağı incele ve yaprağın şeklini ebeveynine tarif et!",
      badge: "🟢 Yeşil Kâşifi",
    },
  ];

  const handleAdventureSelect = (adv: Adventure) => {
    if (adv.isFree || isPremium) {
      setSelectedAdventure(adv);
      setActiveTab("video");
      setSelectedOptionIdx(null);
      setQuizFeedback("Soruyu cevaplayıp yıldızları topla! 🌟");
      setQuizSuccess(false);
      speakText(adv.videoVoice || "Mavi rengini öğrenelim!");
    } else {
      setIsUpsellOpen(true);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayVoice = () => {
    if (selectedAdventure) {
      speakText(selectedAdventure.videoVoice);
    }
  };

  const handleReplayQuestion = () => {
    if (selectedAdventure) {
      speakText(selectedAdventure.quizQuestion);
    }
  };

  const handleOptionClick = (idx: number, isCorrect: boolean) => {
    if (!selectedAdventure) return;
    if (quizSuccess) return; // already solved

    setSelectedOptionIdx(idx);
    if (isCorrect) {
      setQuizFeedback("Harika! Doğru cevap! 🎉");
      setQuizSuccess(true);
      speakText("Harika! Doğru cevap! Bir yıldız kazandın!");
      
      // Award stars & show toast
      addStars(5, "colors", selectedAdventure.title);
      showToast("Tebrikler! 5 Yıldız Kazandın! ⭐");

      // Auto trigger mission modal after short delay
      setTimeout(() => {
        setIsMissionOpen(true);
      }, 1500);
    } else {
      setQuizFeedback(selectedAdventure?.quizHint || "Tekrar deneyelim!");
      speakText(selectedAdventure?.quizHint || "Tekrar deneyelim!");
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg("");
    }, 3000);
  };

  const handleMissionClaimClick = () => {
    // Open parent gate for verification
    setIsGateOpen(true);
  };

  const handleParentVerifySuccess = () => {
    if (selectedAdventure) {
      // Unlock badge, complete progress
      unlockBadge(selectedAdventure.badge);
      completeAdventure(`colors_${selectedAdventure.title}`, selectedAdventure.badge);
      updateProgress("colors", 20); // add 20% progress
      
      setIsMissionOpen(false);
      setSelectedAdventure(null); // return to adventure selection
      showToast(`Tebrikler! ${selectedAdventure.badge} kazandın! 🏆`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <KidsHeader
        title={selectedAdventure ? `Renkler: ${selectedAdventure.title} 🎨` : "Renkler Kategorisi 🎨"}
        subtitle={selectedAdventure ? "Videoyu izle ve sonra oyuna geç!" : "Keşfetmek için bir macera seç!"}
        onBack={() => {
          if (selectedAdventure) {
            setSelectedAdventure(null);
          } else {
            router.push("/app/categories");
          }
        }}
      />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col justify-center">
        
        {/* Adventure List Selector */}
        {!selectedAdventure ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {adventures.map((adv) => {
              const hasAccess = adv.isFree || isPremium;

              return (
                <div
                  key={adv.id}
                  onClick={() => handleAdventureSelect(adv)}
                  className={`bg-white rounded-3xl p-6 shadow-md hover:-translate-y-1 hover:shadow-lg active:scale-98 transition-all cursor-pointer flex flex-col justify-between group border-2 ${
                    hasAccess ? "border-primary-light" : "border-slate-200 opacity-80"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                        3-4 Yaş
                      </span>
                      {!hasAccess ? (
                        <span className="bg-rose-500 text-white font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                          Premium 🔒
                        </span>
                      ) : adv.isFree ? (
                        <span className="bg-success text-white font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                          Açık 🔓
                        </span>
                      ) : (
                        <span className="bg-kids-purple text-white font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                          Premium 💎
                        </span>
                      )}
                    </div>
                    <h3 className="font-kids font-bold text-xl text-slate-800 group-hover:text-primary transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {adv.desc}
                    </p>
                  </div>
                  <button className="mt-4 py-2.5 bg-primary text-white font-kids font-bold rounded-xl text-xs hover:bg-primary/95 shadow-xs transition-colors">
                    Keşfe Başla 🚀
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Active Learning Interface */
          <div className="space-y-6">
            
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab("video")}
                className={`py-4 rounded-2xl font-kids font-bold text-lg cursor-pointer transition-all ${
                  activeTab === "video"
                    ? "bg-kids-purple text-white shadow-md"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                }`}
              >
                📺 İzle & Keşfet
              </button>
              
              <button
                onClick={() => {
                  setActiveTab("quiz");
                  speakText(selectedAdventure.quizQuestion);
                }}
                className={`py-4 rounded-2xl font-kids font-bold text-lg cursor-pointer transition-all ${
                  activeTab === "quiz"
                    ? "bg-kids-purple text-white shadow-md"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                }`}
              >
                🎮 Oyna & Pekiştir
              </button>
            </div>

            {/* TAB CONTENT: Video Simulation */}
            {activeTab === "video" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-6 flex flex-col items-center">
                {/* Visual Simulation Canvas */}
                <div className="w-full h-64 rounded-2xl relative overflow-hidden flex items-center justify-center border-4 border-slate-950 bg-slate-900">
                  {selectedAdventure.id === "mavi" && (
                    <>
                      {/* Sky background */}
                      <div className="absolute inset-0 bg-sky-400 flex items-center justify-center animate-pulse" />
                      
                      {/* Sea waves background */}
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-blue-600/80 rounded-b-xl border-t border-sky-200 flex items-center justify-center" />

                      {/* Fish animation */}
                      <div className="absolute animate-float-mascot left-1/3 bottom-12 flex flex-col items-center select-none">
                        <span className="text-7xl animate-bounce-logo duration-1000">🐟</span>
                        <span className="bg-white/80 text-blue-700 font-kids font-bold text-xs px-2 py-0.5 rounded-full shadow-sm mt-2">
                          Mavi Balık
                        </span>
                      </div>

                      <div className="absolute animate-float-sparkle right-1/4 top-8 flex flex-col items-center select-none">
                        <span className="text-5xl">☁️</span>
                        <span className="bg-white/80 text-sky-700 font-kids font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm mt-1">
                          Mavi Gökyüzü
                        </span>
                      </div>
                    </>
                  )}

                  {selectedAdventure.id === "kirmizi" && (
                    <>
                      {/* Red orchard background */}
                      <div className="absolute inset-0 bg-rose-300 flex items-center justify-center animate-pulse" />
                      
                      {/* Green grass hill background */}
                      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-emerald-500 rounded-b-xl border-t border-emerald-200 flex items-center justify-center" />

                      {/* Apple tree and red apples */}
                      <div className="absolute left-10 bottom-6 select-none flex flex-col items-center">
                        <span className="text-8xl">🌳</span>
                      </div>

                      <div className="absolute animate-float-mascot left-1/2 bottom-12 flex flex-col items-center select-none">
                        <span className="text-7xl animate-bounce-logo duration-1000">🍎</span>
                        <span className="bg-white/80 text-rose-700 font-kids font-bold text-xs px-2 py-0.5 rounded-full shadow-sm mt-2">
                          Kırmızı Elma
                        </span>
                      </div>

                      <div className="absolute animate-float-sparkle right-10 top-8 flex flex-col items-center select-none">
                        <span className="text-5xl">🍓</span>
                        <span className="bg-white/80 text-rose-600 font-kids font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm mt-1">
                          Çilek
                        </span>
                      </div>
                    </>
                  )}

                  {selectedAdventure.id === "sari" && (
                    <>
                      {/* Yellow sky background */}
                      <div className="absolute inset-0 bg-amber-100 flex items-center justify-center animate-pulse" />

                      {/* Bouncing yellow sun */}
                      <div className="absolute animate-float-mascot left-1/4 top-8 flex flex-col items-center select-none">
                        <span className="text-8xl animate-bounce-logo duration-1000">☀️</span>
                        <span className="bg-white/80 text-amber-600 font-kids font-bold text-xs px-2 py-0.5 rounded-full shadow-sm mt-2">
                          Sarı Güneş
                        </span>
                      </div>

                      {/* Yellow stars */}
                      <div className="absolute animate-float-sparkle right-1/3 bottom-12 flex flex-col items-center select-none">
                        <span className="text-6xl">⭐</span>
                        <span className="bg-white/80 text-amber-500 font-kids font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm mt-1">
                          Sarı Yıldız
                        </span>
                      </div>
                      
                      <div className="absolute right-10 top-10 select-none">
                        <span className="text-5xl">🌙</span>
                      </div>
                    </>
                  )}

                  {selectedAdventure.id === "yesil" && (
                    <>
                      {/* Forest background */}
                      <div className="absolute inset-0 bg-emerald-100 flex items-center justify-center animate-pulse" />
                      
                      {/* Grass floor */}
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-emerald-600 rounded-b-xl border-t border-emerald-400 flex items-center justify-center" />

                      {/* Frog animation */}
                      <div className="absolute animate-float-mascot left-1/3 bottom-12 flex flex-col items-center select-none">
                        <span className="text-7xl animate-bounce-logo duration-1000">🐸</span>
                        <span className="bg-white/80 text-emerald-800 font-kids font-bold text-xs px-2 py-0.5 rounded-full shadow-sm mt-2">
                          Yeşil Kurbağa
                        </span>
                      </div>

                      {/* Green leaf */}
                      <div className="absolute animate-float-sparkle right-1/4 top-12 flex flex-col items-center select-none">
                        <span className="text-6xl">🍃</span>
                        <span className="bg-white/80 text-emerald-700 font-kids font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm mt-1">
                          Yeşil Yaprak
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handlePlayVoice}
                  className="px-6 py-3 bg-secondary hover:bg-secondary/95 text-white font-kids font-bold rounded-2xl flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
                >
                  🔊 Sesli Anlatımı Dinle
                </button>

                <div className="text-center max-w-md mx-auto space-y-2">
                  <h3 className="font-kids font-bold text-lg text-slate-800">
                    {selectedAdventure.videoText || "Yukarıdaki sevimli şekilleri izle ve sesli anlatımı dinle!"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Hazır olduğunda yukarıdaki <strong>"Oyna & Pekiştir"</strong> sekmesine geçerek ödül yıldızını kazan!
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Quiz Game */}
            {activeTab === "quiz" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                
                {/* Question bar */}
                <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                  <button
                    onClick={handleReplayQuestion}
                    className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 text-xl text-primary shadow-xs focus:outline-hidden"
                    title="Soruyu Tekrar Dinle"
                  >
                    🔊
                  </button>
                  <h2 className="font-kids font-bold text-xl sm:text-2xl text-slate-800">
                    {selectedAdventure.quizQuestion}
                  </h2>
                </div>

                {/* Grid Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedAdventure.options.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    let optBg = "bg-white hover:border-slate-300 border-slate-200 text-slate-700";
                    if (isSelected) {
                      optBg = opt.isCorrect
                        ? "bg-success-light border-success text-success"
                        : "bg-red-50 border-danger text-danger";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx, opt.isCorrect)}
                        className={`p-6 border-4 rounded-3xl flex flex-col items-center gap-2 hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-hidden ${optBg}`}
                      >
                        <span className="text-5xl select-none">{opt.emoji}</span>
                        <span className="font-kids font-bold text-base sm:text-lg">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback status banner */}
                <div className={`p-4 rounded-2xl text-center font-kids font-bold text-sm sm:text-base border ${
                  quizSuccess
                    ? "bg-success-light border-success/30 text-success"
                    : "bg-slate-50 border-slate-100 text-slate-500"
                }`}>
                  {quizFeedback}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <KidsFooter />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-kids font-bold text-sm px-6 py-3 rounded-full shadow-2xl animate-bounce-logo border-2 border-accent">
          {toastMsg}
        </div>
      )}

      {/* Offline Mission Modal */}
      {isMissionOpen && selectedAdventure && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-success-light animate-float-sparkle text-center">
            <span className="text-5xl my-4 inline-block animate-bounce-logo">🏃✨</span>
            
            <h2 className="font-kids text-2xl font-bold text-slate-800 mb-2">
              Sıradaki Macera Ekran Dışında!
            </h2>
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 my-4 text-left">
              <p className="font-kids font-semibold text-slate-700 text-base leading-relaxed">
                {selectedAdventure.mission}
              </p>
            </div>

            <div className="bg-primary-light/40 border-l-4 border-primary rounded-xl p-3 text-left text-xs text-slate-700 mb-6 leading-relaxed">
              💡 <strong>Ebeveynlere Not:</strong> Ekran süresini dengelemek için bu görevi çocuğunuzla birlikte yapın.
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleMissionClaimClick}
                className="w-full py-4 bg-success hover:bg-success/95 text-white font-kids font-bold rounded-2xl shadow-md active:translate-y-0.5 transition-all text-base cursor-pointer"
              >
                Görevi Tamamladım! (Ebeveyn Onayı)
              </button>
              <button
                onClick={() => setIsMissionOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-kids font-bold rounded-2xl text-xs transition-all cursor-pointer"
              >
                Daha Sonra Yapacağım
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parent Gate Modal for offline mission validation */}
      <ParentGateModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onSuccess={handleParentVerifySuccess}
      />

      {/* Premium Upsell Modal */}
      <PremiumUpsellModal
        isOpen={isUpsellOpen}
        onClose={() => setIsUpsellOpen(false)}
      />
    </div>
  );
}
