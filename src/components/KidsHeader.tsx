"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ParentGateModal } from "./ParentGateModal";

interface KidsHeaderProps {
  title?: string;
  subtitle?: string;
  backUrl?: string;
  onBack?: () => void;
}

export const KidsHeader: React.FC<KidsHeaderProps> = ({
  title = "Merhaba Küçük Kâşif! 🌟",
  subtitle = "Bugün hangi maceraya katılmak istersin?",
  backUrl,
  onBack,
}) => {
  const router = useRouter();
  const [isGateOpen, setIsGateOpen] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      router.push(backUrl);
    } else {
      router.push("/");
    }
  };

  const handleParentSuccess = () => {
    router.push("/parent");
  };

  return (
    <header className="bg-white px-4 sm:px-6 py-4 flex justify-between items-center border-b-4 border-secondary-light">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:scale-105 hover:bg-slate-100 transition-all shadow-xs cursor-pointer focus:outline-hidden"
        title="Geri Dön"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M20,11H7.83L13.41,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z"
          />
        </svg>
      </button>

      {/* Title */}
      <div className="text-center flex-1 mx-4">
        <h2 className="font-kids font-bold text-kids-purple text-xl sm:text-2xl tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="font-kids font-medium text-slate-500 text-xs sm:text-sm mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Parent Area Trigger */}
      <button
        onClick={() => setIsGateOpen(true)}
        className="bg-primary-light border-2 border-dashed border-primary px-3 sm:px-4 py-2 rounded-xl font-kids font-bold text-primary text-xs sm:text-sm hover:bg-primary hover:text-white hover:scale-102 transition-all cursor-pointer focus:outline-hidden"
      >
        Ebeveyn Alanı 🔒
      </button>

      {/* Parent Gate Modal */}
      <ParentGateModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onSuccess={handleParentSuccess}
      />
    </header>
  );
};
