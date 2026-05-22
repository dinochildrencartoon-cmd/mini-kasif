"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Lütfen tüm alanları doldurun.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Şifreler uyuşmuyor.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);

    // Mock successful signup delay
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("mk_user_session", JSON.stringify({ email, name }));
      router.push("/parent");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-slate-50/50 py-16 px-4">
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl max-w-md w-full">
          <div className="text-center mb-6">
            <span className="text-4xl">🌱</span>
            <h2 className="font-kids font-bold text-2xl text-slate-800 mt-2">
              Ebeveyn Kayıt Formu
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Çocuğunuzun gelişimini desteklemek için hemen hesap oluşturun.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-danger border border-red-200 text-xs font-bold rounded-xl p-3 mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmet Yılmaz"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                required
              />
            </div>

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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Şifre Tekrarı
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                required
              />
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              Kaydolarak, Kullanım Şartları ve Gizlilik Politikası hükümlerini kabul etmiş olursunuz.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary disabled:opacity-50 text-white font-kids font-bold rounded-2xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-base cursor-pointer"
            >
              {loading ? "Hesap Oluşturuluyor..." : "Kayıt Ol"}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              Giriş Yapın
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
