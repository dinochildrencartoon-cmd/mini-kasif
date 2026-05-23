"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PremiumLockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumLockModal: React.FC<PremiumLockModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleGoToPremium = () => {
    onClose();
    // Redirect to parent page's billing section
    router.push("/parent");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("parent_redirect_tab", "billing");
    }
  };

  const handleContinueColors = () => {
    onClose();
    router.push("/app/category/colors");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-4 border-kids-orange animate-float-sparkle text-center">
        {/* Decorative close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center focus:outline-hidden cursor-pointer"
        >
          ×
        </button>

        {/* Lock emoji with mascot style pulsing */}
        <span className="inline-block text-6xl my-4 animate-star-pulse select-none">🔒💎</span>
        
        <h3 className="font-kids text-2xl font-bold text-slate-800 mb-3">
          Premium Macera Kapısı!
        </h3>
        
        <p className="text-sm text-slate-600 mb-6 px-4 leading-relaxed font-medium">
          Bu kategori Premium plan ile açılır. Çocuğunuzun tüm öğrenme alanlarına erişmesi için Premium’a geçebilirsiniz.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoToPremium}
            className="w-full py-4 bg-accent hover:bg-accent/95 text-white font-kids font-bold rounded-2xl shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-99 transition-all text-base cursor-pointer"
          >
            Premium’a Geç 🚀
          </button>
          
          <button
            onClick={handleContinueColors}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-kids font-bold rounded-2xl active:scale-98 transition-all text-sm cursor-pointer"
          >
            Şimdilik Renkler ile Devam Et 🎨
          </button>
        </div>
      </div>
    </div>
  );
};
