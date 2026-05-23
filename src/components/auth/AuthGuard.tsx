"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <span className="text-6xl animate-bounce inline-block">🚀</span>
            <span className="text-2xl absolute -top-1 -right-1 animate-pulse">✨</span>
          </div>
          <h2 className="font-kids font-bold text-2xl text-slate-700">
            Yükleniyor...
          </h2>
          <p className="text-xs text-slate-400 font-medium max-w-xs">
            Küçük Kâşif'in macera dünyası hazırlanıyor. Lütfen bekleyin! 🌟
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
