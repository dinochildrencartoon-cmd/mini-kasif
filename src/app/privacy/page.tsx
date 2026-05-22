"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
          <h1 className="font-kids font-bold text-3xl text-slate-800 mb-6 border-b pb-4">
            Gizlilik Politikası
          </h1>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              Son güncelleme: 23 Mayıs 2026
            </p>
            <p>
              Mini Kâşif olarak, çocuklarınızın güvenliği ve gizliliği bizim birinci önceliğimizdir. Bu Gizlilik Politikası, platformumuzu kullanırken hangi verilerin toplandığını, nasıl işlendiğini ve çocuk verilerinin korunması için aldığımız özel tedbirleri açıklamaktadır.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              1. Toplanan Bilgiler
            </h2>
            <p>
              Mini Kâşif, çocukların kullanım alışkanlıklarını reklama dönüştürmez. Toplanan veriler yalnızca çocukların eğitimsel gelişimini ebeveynlere raporlamak için kullanılan minimum verilerdir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ebeveyn hesap bilgileri (Ad soyadı, e-posta adresi, şifre).</li>
              <li>Çocuk gelişim istatistikleri (Yıldız sayısı, tamamlanan görevler, kazanılan rozetler).</li>
              <li>Uygulama kullanım süresi (Göz sağlığı ve ekran sınırlaması takibi için).</li>
            </ul>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              2. Çocuk Verilerinin Güvenliği
            </h2>
            <p>
              Mini Kâşif, COPPA (Çocukların Çevrimiçi Gizliliğini Koruma Yasası) ve KVKK (Kişisel Verilerin Korunması Kanunu) prensipleriyle uyumlu çalışır. Çocukların kişisel verileri hiçbir üçüncü taraf kuruluşla paylaşılmaz, satılmaz veya reklam ağlarına sunulmaz.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              3. Çerezler (Cookies)
            </h2>
            <p>
              Platformumuzda yalnızca kullanıcı oturumlarını yönetmek ve performansı iyileştirmek amacıyla teknik çerezler kullanılmaktadır. Reklam hedeflemesi yapan takip çerezleri kesinlikle barındırılmaz.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              4. İletişim
            </h2>
            <p>
              Gizlilik politikamız veya çocuklarınızın verileriyle ilgili sorularınız için bizimle <strong className="text-primary">destek@minikasif.com</strong> adresinden iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
