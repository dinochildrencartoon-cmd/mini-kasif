"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Mascot } from "@/components/Mascot";
import { ParentGateModal } from "@/components/ParentGateModal";

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  const { timeLeft, screenTimeLimit, setScreenTimeLimit } = useApp();
  const [isGateOpen, setIsGateOpen] = useState(false);

  const handleBypassSuccess = () => {
    // Add 15 minutes or disable limit
    setScreenTimeLimit(30); // sets to 30 minutes limit
  };

  // If time is up, show sleep screen
  const isTimeExpired = screenTimeLimit > 0 && timeLeft <= 0;

  if (isTimeExpired) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="space-y-6 max-w-md flex flex-col items-center">
          <Mascot size="lg" isSleeping={true} />
          
          <h2 className="font-kids font-bold text-3xl text-primary mt-6">
            Mini Kâşif Dinleniyor... 💤
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed">
            Bugünlük bu kadar öğrenme macerası yeterli! Gözlerimizi dinlendirelim ve yarın yepyeni maceralara yelken açalım.
          </p>

          <button
            onClick={() => setIsGateOpen(true)}
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-kids font-bold rounded-2xl transition-all cursor-pointer text-sm"
          >
            Ebeveyn Kilidini Aç (Süreyi Uzat)
          </button>
        </div>

        <ParentGateModal
          isOpen={isGateOpen}
          onClose={() => setIsGateOpen(false)}
          onSuccess={handleBypassSuccess}
        />
      </div>
    );
  }

  return <>{children}</>;
}
