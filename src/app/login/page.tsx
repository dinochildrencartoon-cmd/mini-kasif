"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);

    // Mock successful login delay
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("mk_user_session", JSON.stringify({ email }));
      router.push("/parent");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-slate-50/50 py-16 px-4">
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h2 className="font-kids font-bold text-2xl text-slate-800 mt-2">
              Ebeveyn Girişi
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Gelişim raporları ve süre limitleri yönetimine erişmek için giriş yapın.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-danger border border-red-200 text-xs font-bold rounded-xl p-3 mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Şifreniz
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                required
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                <input type="checkbox" className="accent-primary h-3.5 w-3.5" />
                <span>Beni Hatırla</span>
              </label>
              <Link href="#" className="text-primary hover:underline font-semibold">
                Şifremi Unuttum
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary disabled:opacity-50 text-white font-kids font-bold rounded-2xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-base cursor-pointer"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-primary hover:underline font-bold">
              Kayıt Olun
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
