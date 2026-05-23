"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PremiumUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumUpsellModal: React.FC<PremiumUpsellModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleReviewPremium = () => {
    onClose();
    router.push("/pricing");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-accent animate-float-sparkle text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-slate-400 hover:text-slate-600 focus:outline-hidden"
        >
          ×
        </button>

        <span className="inline-block text-6xl my-4 animate-star-pulse">💎</span>
        
        <h3 className="font-kids text-2xl font-bold text-slate-800 mb-2">
          Premium Maceralar Seni Bekliyor!
        </h3>
        
        <p className="text-sm text-slate-600 mb-6 px-4">
          Bu kategori Premium plan ile açılır. Çocuğunuzun tüm öğrenme alanlarına erişmesi için Premium’u inceleyebilirsiniz.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleReviewPremium}
            className="w-full py-4 bg-primary text-white font-kids font-bold rounded-2xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all text-lg cursor-pointer"
          >
            Premium’u İncele
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-kids font-bold rounded-2xl active:scale-98 transition-all text-sm cursor-pointer"
          >
            Şimdilik Renkler ile Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};
