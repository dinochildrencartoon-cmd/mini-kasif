"use client";

import React, { useState } from "react";
import { MemoryMissingGame as MemoryGameType } from "@/lib/gamesData";

interface MemoryMissingGameProps {
  game: MemoryGameType;
  onCorrect: () => void;
}

export const MemoryMissingGame: React.FC<MemoryMissingGameProps> = ({
  game,
  onCorrect,
}) => {
  const [phase, setPhase] = useState<"memorize" | "guess">("memorize");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartGuessing = () => {
    setIsFlashing(true);
    speakText("Dikkat et! Bir nesne kayboldu!");
    setTimeout(() => {
      setIsFlashing(false);
      setPhase("guess");
      setFeedback("Şimdi eksik olan nesneyi seç bakalım!");
    }, 800);
  };

  const handleOptionClick = (idx: number, isCorrectOption: boolean) => {
    if (isCorrect) return;
    setSelectedIdx(idx);

    if (isCorrectOption) {
      setIsCorrect(true);
      setFeedback(game.successMessage);
      speakText(game.successMessage);
      setTimeout(() => {
        onCorrect();
        // Reset local states for next mount
        setPhase("memorize");
        setSelectedIdx(null);
        setFeedback("");
        setIsCorrect(false);
      }, 2000);
    } else {
      setFeedback(game.retryMessage);
      speakText(game.retryMessage);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 gap-4">
        <button
          onClick={() => speakText(phase === "memorize" ? "Bu nesneleri aklında tut! Hazır olunca butona bas." : game.question)}
          className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 text-xl text-primary shadow-xs cursor-pointer focus:outline-hidden"
          title="Sesli Dinle"
        >
          🔊
        </button>
        <h2 className="font-kids font-bold text-lg sm:text-xl text-slate-800 text-left flex-grow">
          {phase === "memorize"
            ? "Bu nesneleri aklında tut! Hazır olunca butona bas."
            : game.question}
        </h2>
      </div>

      {/* Visual Canvas containing items */}
      <div className={`p-8 bg-slate-50 rounded-3xl border border-slate-200/60 flex justify-center gap-8 relative overflow-hidden transition-all duration-300 ${
        isFlashing ? "opacity-10 scale-95 bg-kids-purple-light" : ""
      }`}>
        {game.items.map((item, idx) => {
          const isMissing = phase === "guess" && idx === game.missingItemIndex;

          return (
            <div
              key={item.id}
              className={`w-28 h-28 bg-white border-4 rounded-3xl shadow-xs flex flex-col items-center justify-center select-none transition-all duration-300 ${
                isMissing ? "border-dashed border-kids-orange text-kids-orange bg-amber-50/50 scale-102" : "border-slate-100"
              }`}
            >
              {isMissing ? (
                <span className="text-5xl font-extrabold animate-pulse">❓</span>
              ) : (
                <>
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                    {item.text}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Action panel */}
      {phase === "memorize" ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleStartGuessing}
            className="px-8 py-4 bg-kids-purple hover:bg-kids-purple/95 text-white font-kids font-bold rounded-2xl shadow-lg hover:shadow-kids-purple/20 hover:-translate-y-0.5 active:translate-y-0 transition-all text-base cursor-pointer"
          >
            Aklımda Tuttum! Başlayalım 🚀
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {game.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              let optBg = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
              if (isSelected) {
                optBg = opt.isCorrect
                  ? "bg-success-light border-success text-success"
                  : "bg-red-50 border-danger text-danger";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx, opt.isCorrect)}
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
              isCorrect
                ? "bg-success-light border-success/30 text-success animate-bounce-logo"
                : "bg-slate-50 border-slate-100 text-slate-500"
            }`}
          >
            {feedback || "Hangisi kayboldu? Aklında kalan nesneyi seç! 🤔"}
          </div>
        </div>
      )}
    </div>
  );
};
