"use client";

import React, { useState } from "react";
import { FindTheOddGame as OddGameType } from "@/lib/gamesData";

interface FindTheOddGameProps {
  game: OddGameType;
  onCorrect: () => void;
}

export const FindTheOddGame: React.FC<FindTheOddGameProps> = ({
  game,
  onCorrect,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleItemClick = (id: string, isOdd: boolean, text: string) => {
    if (isCorrect) return;
    setSelectedId(id);
    speakText(text);

    if (isOdd) {
      setIsCorrect(true);
      setFeedback(game.successMessage);
      speakText(game.successMessage);
      setTimeout(() => {
        onCorrect();
        setSelectedId(null);
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
      <div className="flex justify-between items-center bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 gap-4">
        <button
          onClick={() => speakText(game.question)}
          className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 text-xl text-primary shadow-xs cursor-pointer focus:outline-hidden"
          title="Soruyu Sesli Dinle"
        >
          🔊
        </button>
        <h2 className="font-kids font-bold text-xl sm:text-2xl text-slate-800 text-left flex-grow">
          {game.question}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
        {game.items.map((item) => {
          const isSelected = selectedId === item.id;
          let itemBg = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
          
          if (isSelected) {
            itemBg = item.isOdd
              ? "bg-success-light border-success text-success scale-105"
              : "bg-red-50 border-danger text-danger";
          }

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.isOdd, item.text)}
              className={`p-6 border-4 rounded-3xl flex flex-col items-center gap-3 hover:scale-102 active:scale-98 transition-all cursor-pointer focus:outline-hidden ${itemBg}`}
            >
              <span className="text-6xl select-none">{item.emoji}</span>
              <span className="font-kids font-bold text-xs sm:text-sm text-center leading-tight">
                {item.text}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={`p-4 rounded-2xl text-center font-kids font-bold text-sm sm:text-base border transition-all ${
          isCorrect
            ? "bg-success-light border-success/30 text-success animate-bounce-logo"
            : feedback
            ? "bg-amber-50 border-amber-200 text-amber-700 animate-wiggle"
            : "bg-slate-50 border-slate-100 text-slate-500"
        }`}
      >
        {feedback || "Gruptaki diğer nesnelere benzemeyeni bularak dedektif ol! 🔍"}
      </div>
    </div>
  );
};
