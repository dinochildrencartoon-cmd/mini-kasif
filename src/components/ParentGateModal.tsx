"use client";

import React, { useState, useEffect } from "react";

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Generate math question
  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const n2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const isPlus = Math.random() > 0.3; // 70% chance of plus

    if (isPlus) {
      setNum1(n1);
      setNum2(n2);
      setOperator("+");
      setAnswer(n1 + n2);
    } else {
      // Ensure positive result for subtraction
      const max = Math.max(n1, n2);
      const min = Math.min(n1, n2);
      setNum1(max);
      setNum2(min);
      setOperator("-");
      setAnswer(max - min);
    }
    setInputVal("");
    setErrorMsg("");
  };

  useEffect(() => {
    if (isOpen) {
      generateQuestion();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyClick = (key: string) => {
    setErrorMsg("");
    if (key === "clear") {
      setInputVal("");
    } else {
      if (inputVal.length < 3) {
        setInputVal((prev) => prev + key);
      }
    }
  };

  const handleSubmit = () => {
    const userAns = parseInt(inputVal);
    if (userAns === answer) {
      onSuccess();
      onClose();
    } else {
      setErrorMsg("Yanlış cevap, lütfen tekrar deneyin.");
      setInputVal("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-primary-light animate-float-sparkle">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-slate-400 hover:text-slate-600 focus:outline-hidden"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <span className="inline-block text-4xl mb-2">🔒</span>
          <h2 className="font-kids text-2xl font-bold text-slate-800">
            Sadece Anne & Babalar İçin
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Ebeveyn alanına geçmek için lütfen basit doğrulamayı tamamlayın.
          </p>
        </div>

        <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 text-center mb-4">
          <span className="font-kids text-3xl font-bold text-primary">
            {num1} {operator} {num2} = ?
          </span>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyClick(num.toString())}
              className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-bold rounded-xl active:scale-95 transition-all focus:outline-hidden"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleKeyClick("clear")}
            className="py-3 bg-red-50 hover:bg-red-100 text-red-500 font-bold rounded-xl active:scale-95 transition-all text-sm focus:outline-hidden"
          >
            Temizle
          </button>
          <button
            onClick={() => handleKeyClick("0")}
            className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-bold rounded-xl active:scale-95 transition-all focus:outline-hidden"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={!inputVal}
            className="py-3 bg-success hover:bg-success/90 disabled:opacity-50 text-white font-bold rounded-xl active:scale-95 transition-all text-sm focus:outline-hidden"
          >
            Giriş
          </button>
        </div>

        <div className="text-center font-kids text-lg text-slate-700 mb-4 bg-slate-50 rounded-xl py-2">
          Cevabınız:{" "}
          <strong className="text-primary text-xl">
            {inputVal || "-"}
          </strong>
        </div>

        {errorMsg && (
          <div className="text-center text-danger text-sm font-semibold mb-4 animate-pulse">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};
