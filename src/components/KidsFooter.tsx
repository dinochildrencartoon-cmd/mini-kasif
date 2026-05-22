"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export const KidsFooter: React.FC = () => {
  const { starsCount, unlockedBadges } = useApp();
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  // All available badges in the system
  const allBadges = [
    { name: "🔵 Mavi Kâşifi", emoji: "🔵", color: "bg-secondary-light border-secondary text-secondary", desc: "Mavi rengi başarıyla keşfeden küçük kâşif." },
    { name: "🍎 Kırmızı Kâşifi", emoji: "🍎", color: "bg-primary-light border-primary text-primary", desc: "Kırmızı elma görevini tamamlayan kâşif." },
    { name: "☀️ Sarı Güneş Rozeti", emoji: "☀️", color: "bg-amber-50 border-amber-400 text-amber-500", desc: "Sarı rengin gizemlerini çözen kâşif." },
    { name: "🌱 Yeşil Yaprak Rozeti", emoji: "🌱", color: "bg-success-light border-success text-success", desc: "Yeşil doğa yaprağı görevini tamamlayan kâşif." },
    { name: "🔢 Sayı Dedektifi", emoji: "🔢", color: "bg-purple-50 border-purple-400 text-purple-600", desc: "Sayılar ülkesindeki tüm görevleri çözen kâşif." },
    { name: "📐 Şekil Ustası", emoji: "📐", color: "bg-indigo-50 border-indigo-400 text-indigo-600", desc: "Şekillerin sırlarını açığa çıkaran kâşif." },
    { name: "🦁 Hayvan Dostu", emoji: "🦁", color: "bg-orange-50 border-orange-400 text-orange-600", desc: "Sevimli hayvanları tanıyan ve koruyan kâşif." },
    { name: "😊 Duygu Uzmanı", emoji: "😊", color: "bg-pink-50 border-pink-400 text-pink-600", desc: "Duygularını ve hislerini tanıyan kâşif." }
  ];

  return (
    <>
      <footer className="bg-white px-4 sm:px-6 py-4 flex justify-between items-center border-t-4 border-secondary-light sticky bottom-0 z-30">
        <div className="font-kids font-bold text-base sm:text-lg flex items-center gap-2 text-amber-500 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
          <span className="text-xl sm:text-2xl animate-star-pulse">⭐</span>
          <span>{starsCount} Yıldız Topladın!</span>
        </div>

        <button
          onClick={() => setIsBadgesOpen(true)}
          className="bg-gradient-to-r from-accent to-kids-orange hover:from-accent/90 hover:to-kids-orange/90 text-white font-kids font-bold text-sm sm:text-base px-5 py-2.5 rounded-2xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer focus:outline-hidden"
        >
          🏆 Rozetlerim
        </button>
      </footer>

      {/* Badges Modal */}
      {isBadgesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border-4 border-kids-purple animate-float-sparkle max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsBadgesOpen(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-slate-400 hover:text-slate-600 focus:outline-hidden"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <h2 className="font-kids text-3xl font-bold text-kids-purple">
                Kâşif Rozetlerin 🏆
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Görevleri ve quizleri tamamlayarak kazandığın süper rozetler!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {allBadges.map((badge) => {
                const isUnlocked = unlockedBadges.some(
                  (ub) => ub.includes(badge.name) || ub.includes(badge.emoji)
                );

                return (
                  <div
                    key={badge.name}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center text-center transition-all ${
                      isUnlocked
                        ? `${badge.color} scale-100 shadow-md`
                        : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                    }`}
                  >
                    <span className={`text-4xl mb-2 ${isUnlocked ? "animate-bounce-logo" : "grayscale"}`}>
                      {badge.emoji}
                    </span>
                    <span className="font-kids font-bold text-xs sm:text-sm">
                      {badge.name.replace(/^[^\s]+\s/, "")}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                      {badge.desc}
                    </p>
                    {!isUnlocked && (
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-sm font-bold uppercase mt-2">
                        Kilitli 🔒
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsBadgesOpen(false)}
                className="px-8 py-3 bg-kids-purple text-white font-kids font-bold rounded-2xl hover:bg-kids-purple/90 transition-all cursor-pointer shadow-md"
              >
                Harika, Devam Et! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
