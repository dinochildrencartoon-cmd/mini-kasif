"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.push("/app");
      } else {
        setErrorMsg("Bir sorun oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-slate-50/50 py-16 px-4">
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <span className="text-4xl animate-bounce-logo inline-block">🔐</span>
            <h2 className="font-kids font-bold text-2xl text-slate-800 mt-2">
              Giriş Yap
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Gelişim raporları ve süre limitleri yönetimine erişmek için giriş yapın.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-danger border border-red-200 text-xs font-bold rounded-xl p-3 mb-4 text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary disabled:opacity-50 text-white font-kids font-bold rounded-2xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-base cursor-pointer mt-2"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-primary hover:underline font-bold">
              Ücretsiz Hesap Oluştur
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
