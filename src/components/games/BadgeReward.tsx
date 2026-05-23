"use client";

import React, { useEffect } from "react";

interface BadgeRewardProps {
  badgeName: string;
  categoryTitle: string;
  onFinish: () => void;
}

export const BadgeReward: React.FC<BadgeRewardProps> = ({
  badgeName,
  categoryTitle,
  onFinish,
}) => {
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const celebrationMsg = `Tebrikler! ${categoryTitle} kategorisini tamamladın ve ${badgeName} rozetini kazandın!`;
    speakText(celebrationMsg);
  }, [badgeName, categoryTitle]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-accent shadow-2xl text-center space-y-6 max-w-md mx-auto animate-float-sparkle relative overflow-hidden">
      {/* Decorative background sparks */}
      <div className="absolute top-4 left-6 text-2xl animate-pulse">✨</div>
      <div className="absolute top-12 right-8 text-xl animate-bounce-logo">⭐</div>
      <div className="absolute bottom-16 left-8 text-2xl animate-bounce-logo duration-1000">🎉</div>
      <div className="absolute bottom-6 right-10 text-xl animate-pulse">✨</div>

      <div className="space-y-2">
        <span className="text-7xl block animate-bounce-logo select-none">🏆🏅</span>
        <h1 className="font-kids font-extrabold text-3xl text-slate-800 tracking-wide mt-4">
          Harika İş Çıkardın!
        </h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          {categoryTitle} Macerası Başarıyla Tamamlandı
        </p>
      </div>

      {/* Badge Visual Representation */}
      <div className="p-6 bg-slate-50 border-4 border-dashed border-accent-light rounded-3xl inline-block w-full max-w-[260px] mx-auto shadow-inner relative group hover:scale-105 transition-all">
        <span className="text-6xl block select-none group-hover:rotate-12 transition-transform duration-300">
          {badgeName.split(" ")[0] || "🏅"}
        </span>
        <h3 className="font-kids font-bold text-lg text-slate-800 mt-3">
          {badgeName.split(" ").slice(1).join(" ") || badgeName}
        </h3>
        <span className="absolute -top-3 -right-3 bg-accent text-white font-kids font-bold text-xs px-2.5 py-1 rounded-full shadow-md animate-pulse">
          Rozet Kazanıldı!
        </span>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Tebrikler küçük kâşif! Kazandığın rozet ebeveyn paneline başarıyla kaydedildi.
        </p>
      </div>

      <button
        onClick={onFinish}
        className="w-full py-4 bg-accent hover:bg-accent/95 text-white font-kids font-bold text-lg rounded-2xl shadow-lg hover:shadow-accent/30 active:scale-99 transition-all cursor-pointer focus:outline-hidden"
      >
        Macerayı Tamamla! 🚀🧒
      </button>
    </div>
  );
};
