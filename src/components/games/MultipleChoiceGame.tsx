"use client";

import React, { useState } from "react";
import { MultipleChoiceGame as MCGameType } from "@/lib/gamesData";

interface MultipleChoiceGameProps {
  game: MCGameType;
  onCorrect: () => void;
}

export const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({
  game,
  onCorrect,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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

  const handleOptionClick = (idx: number, isCorrectOption: boolean) => {
    if (isCorrect) return; // already solved
    setSelectedIdx(idx);
    
    if (isCorrectOption) {
      setIsCorrect(true);
      setFeedback(game.successMessage);
      speakText(game.successMessage);
      setTimeout(() => {
        onCorrect();
        // Reset local state for next mount
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

      {game.visual && (
        <div className="flex justify-center py-4 select-none">
          <span className="text-8xl p-6 bg-slate-50 rounded-full border-4 border-slate-100 animate-float-mascot">
            {game.visual}
          </span>
        </div>
      )}

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
            : feedback
            ? "bg-amber-50 border-amber-200 text-amber-700 animate-wiggle"
            : "bg-slate-50 border-slate-100 text-slate-500"
        }`}
      >
        {feedback || "Doğru cevabı bul ve yıldızları topla! ⭐"}
      </div>
    </div>
  );
};
