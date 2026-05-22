"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
          <h1 className="font-kids font-bold text-3xl text-slate-800 mb-6 border-b pb-4">
            Kullanım Şartları
          </h1>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              Son güncelleme: 23 Mayıs 2026
            </p>
            <p>
              Mini Kâşif web sitesine ve uygulamasına hoş geldiniz. Bu platformu kullanarak, aşağıda belirtilen kullanım şartlarını ve kuralları peşinen kabul etmiş bulunmaktasınız.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              1. Platformun Amacı ve Sorumluluk
            </h2>
            <p>
              Mini Kâşif, 3-6 yaş aralığındaki çocukların bilişsel gelişimini desteklemek amacıyla hazırlanmış bir eğitim ve aktivite portalıdır. Platform, bir ebeveynin gözetimi ve kontrolü altında kullanılmalıdır. Ekran dışı fiziksel görevlerin güvenliği ebeveynin sorumluluğundadır.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              2. Fikri Mülkiyet Hakları
            </h2>
            <p>
              Platformdaki tüm tasarımlar, maskot çizimleri, animasyonlar, oyunlar, kod yapıları ve seslendirmelerin telif hakkı Mini Kâşif ekibine aittir. İzinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              3. Üyelik ve Abonelik
            </h2>
            <p>
              Platformda Ücretsiz planda Renkler kategorisine kısıtlı erişim sunulmaktadır. Premium üyelik, aylık abonelik ücreti ile tüm özellikleri ve kategorileri etkinleştirir. İstediğiniz zaman aboneliğinizi hiçbir ek taahhüt olmadan iptal edebilirsiniz.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              4. Değişiklik Hakları
            </h2>
            <p>
              Mini Kâşif, platformun içeriğini, özelliklerini veya paket fiyatlarını önceden bildirimde bulunarak güncelleme ve değiştirme hakkını saklı tutar.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
