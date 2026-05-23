"use client";

import React, { useState } from "react";
import { ParentGateModal } from "@/components/ParentGateModal";

interface OfflineTaskCardProps {
  taskText: string;
  onVerifySuccess: () => void;
  onLater: () => void;
}

export const OfflineTaskCard: React.FC<OfflineTaskCardProps> = ({
  taskText,
  onVerifySuccess,
  onLater,
}) => {
  const [isGateOpen, setIsGateOpen] = useState(false);

  const handleVerifySuccess = () => {
    onVerifySuccess();
    setIsGateOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6 max-w-lg mx-auto">
      <div className="text-center">
        <span className="text-6xl my-4 inline-block animate-bounce-logo select-none">🏃✨</span>
        
        <h2 className="font-kids text-2xl font-bold text-slate-800 mb-2">
          Sıradaki Macera Ekran Dışında!
        </h2>
        
        <p className="text-xs text-slate-400 font-medium">
          Denge kurmak için ekran başından biraz uzaklaşalım.
        </p>
      </div>

      <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-center">
        <p className="font-kids font-bold text-slate-700 text-lg leading-relaxed">
          {taskText}
        </p>
      </div>

      <div className="bg-primary-light/40 border-l-4 border-primary rounded-xl p-4 text-left text-xs text-slate-700 leading-relaxed font-medium">
        💡 <strong>Ebeveynlere Not:</strong> Ekran süresini dengelemek için bu görevi çocuğunuzla birlikte yapın. Çocuğunuz tamamladığında aşağıdaki butona basıp basit doğrulamayı çözerek onaylayın.
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={() => setIsGateOpen(true)}
          className="w-full py-4 bg-success hover:bg-success/95 text-white font-kids font-bold rounded-2xl shadow-lg hover:shadow-success/20 active:translate-y-0.5 transition-all text-base cursor-pointer focus:outline-hidden"
        >
          Görevi Tamamladım! (Ebeveyn Onayı) ✅
        </button>
        <button
          onClick={onLater}
          className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 font-kids font-bold rounded-2xl text-xs transition-all cursor-pointer focus:outline-hidden"
        >
          Daha Sonra Yapacağım
        </button>
      </div>

      {/* Parent verification gate */}
      <ParentGateModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onSuccess={handleVerifySuccess}
      />
    </div>
  );
};
