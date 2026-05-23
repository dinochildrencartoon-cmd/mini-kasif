"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className, children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={
        className ||
        "px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-kids font-bold text-xs rounded-xl transition-all cursor-pointer hover:scale-102 active:scale-98"
      }
    >
      {children || "Çıkış Yap 🔐"}
    </button>
  );
};
