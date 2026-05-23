"use client";

import React, { useState, useEffect, useRef } from "react";
import { MatchingGame as MatchGameType } from "@/lib/gamesData";

interface MatchingGameProps {
  game: MatchGameType;
  onCorrect: () => void;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  game,
  onCorrect,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedLefts, setMatchedLefts] = useState<string[]>([]);
  const [matchedRights, setMatchedRights] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const hasTriggeredCorrect = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Shuffle right items on load to keep it fun
  const [shuffledRightItems, setShuffledRightItems] = useState(game.rightItems);

  useEffect(() => {
    // Basic deterministic shuffle or alternate order so they don't align perfectly
    const sorted = [...game.rightItems].sort(() => Math.random() - 0.5);
    setShuffledRightItems(sorted);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedLefts([]);
    setMatchedRights([]);
    setFeedback("");
    setIsCompleted(false);
    hasTriggeredCorrect.current = false;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [game]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLeftSelect = (id: string) => {
    if (matchedLefts.includes(id) || isCompleted) return;
    speakText(game.leftItems.find(i => i.id === id)?.content || "");
    setSelectedLeft(id);
  };

  const handleRightSelect = (id: string) => {
    if (matchedRights.includes(id) || isCompleted) return;
    speakText(game.rightItems.find(i => i.id === id)?.content || "");
    setSelectedRight(id);
  };

  // Match check
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const isCorrectMatch = game.correctPairs[selectedLeft] === selectedRight;

      if (isCorrectMatch) {
        setMatchedLefts((prev) => [...prev, selectedLeft]);
        setMatchedRights((prev) => [...prev, selectedRight]);
        setFeedback("Harika! Doğru eşleşme! 🎉");
        speakText("Çok güzel!");
        
        // Reset selections
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        setFeedback(game.retryMessage);
        speakText(game.retryMessage);
        
        // Short delay to let child see what they selected, then reset
        const timer = setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedLeft, selectedRight, game]);

  // Completion check
  useEffect(() => {
    if (matchedLefts.length === game.leftItems.length && game.leftItems.length > 0 && !hasTriggeredCorrect.current) {
      hasTriggeredCorrect.current = true;
      setIsCompleted(true);
      setFeedback(game.successMessage);
      speakText(game.successMessage);
      
      timerRef.current = setTimeout(() => {
        onCorrect();
      }, 2000);
    }
  }, [matchedLefts, game, onCorrect]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-6">
      <div className="flex justify-between items-center bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 gap-4">
        <button
          onClick={() => speakText(game.question)}
          className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 text-xl text-primary shadow-xs cursor-pointer focus:outline-hidden"
          title="Soruyu Sesli Dinle"
        >
          🔊
        </button>
        <h2 className="font-kids font-bold text-lg sm:text-xl text-slate-800 text-left flex-grow">
          {game.question}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-8 py-2">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-kids font-bold text-center text-xs text-slate-400 uppercase tracking-wide">Sol Grup</h3>
          {game.leftItems.map((item) => {
            const isMatched = matchedLefts.includes(item.id);
            const isSelected = selectedLeft === item.id;
            
            let btnClass = "bg-white border-slate-200 hover:border-slate-300 text-slate-700";
            if (isMatched) {
              btnClass = "bg-success-light border-success text-success opacity-60 pointer-events-none";
            } else if (isSelected) {
              btnClass = "bg-kids-purple-light border-kids-purple text-kids-purple scale-102";
            }

            return (
              <button
                key={item.id}
                onClick={() => handleLeftSelect(item.id)}
                className={`py-4 px-4 border-4 rounded-2xl font-kids font-bold text-sm sm:text-base transition-all active:scale-98 cursor-pointer focus:outline-hidden text-center min-h-[70px] flex items-center justify-center ${btnClass}`}
              >
                {item.content}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-kids font-bold text-center text-xs text-slate-400 uppercase tracking-wide">Sağ Grup</h3>
          {shuffledRightItems.map((item) => {
            const isMatched = matchedRights.includes(item.id);
            const isSelected = selectedRight === item.id;
            
            let btnClass = "bg-white border-slate-200 hover:border-slate-300 text-slate-700";
            if (isMatched) {
              btnClass = "bg-success-light border-success text-success opacity-60 pointer-events-none";
            } else if (isSelected) {
              btnClass = "bg-kids-purple-light border-kids-purple text-kids-purple scale-102";
            }

            return (
              <button
                key={item.id}
                onClick={() => handleRightSelect(item.id)}
                className={`py-4 px-4 border-4 rounded-2xl font-kids font-bold text-sm sm:text-base transition-all active:scale-98 cursor-pointer focus:outline-hidden text-center min-h-[70px] flex items-center justify-center ${btnClass}`}
              >
                {item.content}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`p-4 rounded-2xl text-center font-kids font-bold text-sm sm:text-base border transition-all ${
          isCompleted
            ? "bg-success-light border-success/30 text-success animate-bounce-logo"
            : feedback.includes("deneyelim") || feedback.includes("sayalım") || feedback.includes("bakalım")
            ? "bg-amber-50 border-amber-200 text-amber-700 animate-wiggle"
            : "bg-slate-50 border-slate-100 text-slate-500"
        }`}
      >
        {feedback || "Sol taraftan bir kutu seç, sonra sağdaki doğru eşini bul! 🤝"}
      </div>
    </div>
  );
};
