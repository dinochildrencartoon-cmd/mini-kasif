"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childAge, setChildAge] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Form validations
    if (!name.trim()) {
      setErrorMsg("Lütfen adınızı ve soyadınızı girin.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMsg("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Şifreniz en az 8 karakter olmalıdır.");
      return;
    }

    if (!childAge) {
      setErrorMsg("Lütfen çocuğunuzun yaşını seçin.");
      return;
    }

    if (!acceptedTerms) {
      setErrorMsg("Devam etmek için kullanım koşullarını ve gizlilik politikasını kabul etmelisiniz.");
      return;
    }

    setLoading(true);

    try {
      // 1. Sign up user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        // Handle common errors
        if (error.message.includes("already registered") || error.status === 422 || error.message.includes("user_already_exists")) {
          setErrorMsg("Bu e-posta adresiyle daha önce hesap oluşturulmuş.");
        } else {
          setErrorMsg(error.message || "Şu anda kayıt işlemi tamamlanamadı. Lütfen biraz sonra tekrar deneyin.");
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        // 2. Insert parent profile from frontend
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: name,
          email: email,
          plan: "free",
        });

        if (profileError) {
          console.error("Error inserting parent profile from frontend:", profileError);
        }

        // 3. Insert child profile
        const { error: childError } = await supabase.from("child_profiles").insert({
          parent_id: data.user.id,
          child_age: parseInt(childAge),
        });

        if (childError) {
          console.error("Error inserting child profile:", childError);
        }

        // 4. Pre-populate initial progress (colors / Mavi Rengi Keşfedelim)
        const { error: progressError } = await supabase.from("user_progress").insert({
          user_id: data.user.id,
          category_slug: "colors",
          content_slug: "Mavi Rengi Keşfedelim",
          completed: true,
          stars: 25,
          badge: "🔵 Mavi Kâşifi",
          completed_at: new Date().toISOString(),
        });

        if (progressError) {
          console.error("Error inserting initial progress:", progressError);
        }

        setSuccessMsg("Hesabınız oluşturuldu. Mini Kâşif’i ücretsiz planla kullanmaya başlayabilirsiniz.");
        
        // Wait and redirect to app
        setTimeout(() => {
          router.push("/app/categories");
        }, 1500);
      } else {
        setErrorMsg("Bir sorun oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setErrorMsg("Bir sorun oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-slate-50/50 py-16 px-4">
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl max-w-md w-full">
          <div className="text-center mb-6">
            <span className="text-4xl animate-bounce inline-block">🌱</span>
            <h2 className="font-kids font-bold text-2xl text-slate-800 mt-2">
              Ücretsiz Hesap Oluştur
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Mini Kâşif’i ücretsiz kullanmaya başlamak için ebeveyn bilgilerinizi girin. Ücretsiz planda Renkler kategorisindeki sınırlı içeriklerle çocuğunuzun öğrenme deneyimini keşfedebilirsiniz.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-danger border border-red-200 text-xs font-bold rounded-xl p-3 mb-4 text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 text-success border border-green-200 text-xs font-bold rounded-xl p-3 mb-4 text-center">
              🎉 {successMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ebeveyn Adı Soyadı
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmet Yılmaz"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-posta Adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                disabled={loading}
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
                placeholder="En az 8 karakter"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Çocuğun Yaşı
              </label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-primary focus:outline-hidden bg-white text-slate-700 font-medium"
                disabled={loading}
              >
                <option value="">Seçiniz</option>
                <option value="3">3 yaş</option>
                <option value="4">4 yaş</option>
                <option value="5">5 yaş</option>
                <option value="6">6 yaş</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-500 text-[11px] leading-tight select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="accent-primary h-4 w-4 mt-0.5 flex-none"
                  disabled={loading}
                />
                <span>
                  <Link href="/terms" className="text-primary hover:underline font-bold">Kullanım koşullarını</Link>{" "}
                  ve{" "}
                  <Link href="/privacy" className="text-primary hover:underline font-bold">gizlilik politikasını</Link>{" "}
                  kabul ediyorum.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary disabled:opacity-50 text-white font-kids font-bold rounded-2xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-base cursor-pointer mt-4"
            >
              {loading ? "Hesap Oluşturuluyor..." : "Ücretsiz Hesabımı Oluştur"}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              Giriş Yap
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
