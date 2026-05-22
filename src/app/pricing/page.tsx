"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EarlyAccessWizard } from "@/components/EarlyAccessWizard";

export default function Pricing() {
  const comparisonData = [
    { feature: "Eğitici Kategoriler", free: "Sadece Renkler (Sınırlı İçerik)", premium: "Tüm 8 Kategori (Sayılar, Şekiller, Hayvanlar...)" },
    { feature: "Gelişim Raporu", free: "Sınırlı Özet", premium: "Detaylı Haftalık Analiz & Haftalık Grafikler" },
    { feature: "Akıllı Ekran Sınırı", free: "Sabit (15 Dakika)", premium: "Özelleştirilebilir (15, 30, 45 Dakika veya Sınırsız)" },
    { feature: "Ekran Dışı Görevler", free: "1 Görev Açık", premium: "Sınırsız & Ebeveyn Onaylı Görevler" },
    { feature: "Reklamsız Alan", free: "Evet (%100 Reklamsız)", premium: "Evet (%100 Reklamsız)" },
    { feature: "Veri Güvenliği", free: "Evet", premium: "Evet" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-slate-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block bg-primary-light text-primary text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider select-none">
              Abonelik ve Planlar
            </span>
            <h1 className="font-kids font-bold text-4xl sm:text-5xl text-slate-800">
              Şeffaf ve Esnek Paketler
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Çocuğunuzun eğitimini desteklemek için tasarlanan iki farklı kullanım planını karşılaştırın. Taahhüt yok, gizli ücretler yok.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-sm flex flex-col justify-between h-full">
              <div>
                <h3 className="font-kids font-bold text-xl text-slate-700">Ücretsiz Kullanım</h3>
                <div className="font-kids font-bold text-3xl text-slate-800 my-4">0 ₺</div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Çocuğunuzun Mini Kâşif deneyimini gerçek şekilde denemesi için hazırlanan başlangıç planı. Renkler kategorisine kısıtlı erişim sağlar.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-8 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">✓</span>
                    <span>Sadece Renkler Kategorisi (Mavi Keşfi)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">✓</span>
                    <span>Sabit 15 Dakika Ekran Süresi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">✓</span>
                    <span>Sınırlı Ebeveyn Rapor Özeti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">✓</span>
                    <span>%100 Reklamsız ve Güvenli</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/categories"
                className="w-full py-4.5 bg-slate-100 text-slate-700 font-kids font-bold text-center block rounded-2xl hover:bg-slate-200 transition-colors shadow-xs"
              >
                Ücretsiz Başla 🧒
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl p-8 border-4 border-primary-light shadow-md flex flex-col justify-between h-full relative">
              <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-accent to-kids-orange text-white font-bold text-xs px-4 py-1 rounded-full shadow-xs">
                Önerilen
              </span>
              <div>
                <h3 className="font-kids font-bold text-xl text-primary">Premium Üyelik</h3>
                <div className="font-kids font-bold text-3xl text-slate-800 my-4">
                  99 ₺ <span className="text-xs text-slate-400 font-normal">/ aylık</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Çocuğunuzun tüm öğrenme kategorilerine sınırsızca erişebileceği, gelişmiş ebeveyn kontrolleri sunan tam sürüm plan.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-8 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="font-bold text-slate-800">Tüm 8 Eğitici Kategorinin Tamamı</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Özelleştirilebilir Ekran Süre Ayarı</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Detaylı Haftalık Gelişim Grafikleri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Sürekli Güncellenen Ekran Dışı Görevler</span>
                  </li>
                </ul>
              </div>
              <a
                href="#early-access-form-block"
                className="w-full py-4.5 bg-primary text-white font-kids font-bold text-center block rounded-2xl hover:bg-primary/95 shadow-md active:translate-y-0.5 transition-all text-base"
              >
                Erken Erişime Katıl 💎
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="font-kids font-bold text-2xl text-slate-800 text-center mb-8">
              Detaylı Karşılaştırma
            </h2>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-kids font-bold border-b border-slate-100 text-sm">
                    <th className="p-4 sm:p-5">Özellik</th>
                    <th className="p-4 sm:p-5 text-center">Ücretsiz</th>
                    <th className="p-4 sm:p-5 text-center text-primary">Premium</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm text-slate-600 font-medium">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-slate-800">{row.feature}</td>
                      <td className="p-4 sm:p-5 text-center text-slate-500">{row.free}</td>
                      <td className="p-4 sm:p-5 text-center font-semibold text-slate-700">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Early Access Form Block */}
          <div id="early-access-form-block" className="py-8 scroll-mt-24">
            <EarlyAccessWizard />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
