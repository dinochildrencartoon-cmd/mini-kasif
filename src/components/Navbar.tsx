"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { LogoutButton } from "@/components/auth/LogoutButton";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isPremium, user, loading, parentName } = useApp();

  return (
    <header className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-3xl animate-bounce-logo">🚀</span>
          <span className="font-kids font-bold text-2xl text-primary tracking-tight">
            Mini Kâşif
          </span>
          {isPremium && (
            <span className="bg-gradient-to-r from-accent to-kids-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
              PREMIUM
            </span>
          )}
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-kids font-bold text-slate-600">
          <Link
            href="/"
            className={`hover:text-primary transition-colors ${
              pathname === "/" ? "text-primary border-b-2 border-primary" : ""
            }`}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/pricing"
            className={`hover:text-primary transition-colors ${
              pathname === "/pricing" ? "text-primary border-b-2 border-primary" : ""
            }`}
          >
            Planlar & Ücretlendirme
          </Link>
          <Link
            href="/parent"
            className={`hover:text-primary transition-colors ${
              pathname.startsWith("/parent") ? "text-primary border-b-2 border-primary" : ""
            }`}
          >
            Ebeveyn Paneli
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse" />
          ) : user ? (
            <>
              <span className="hidden lg:inline text-xs font-bold text-slate-500 font-kids">
                Merhaba, {parentName || user.email?.split("@")[0]}
              </span>
              <LogoutButton />
              <Link
                href="/app/categories"
                className="inline-flex items-center justify-center px-5 py-2 bg-primary hover:bg-primary/95 text-white font-kids font-bold text-sm rounded-2xl shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                Portala Git 🧒
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 font-kids font-bold text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                Giriş Yap
              </Link>
              
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-kids font-bold text-base rounded-2xl shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                Ücretsiz Başla
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
