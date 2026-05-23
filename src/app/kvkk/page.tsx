"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function KVKK() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
          <h1 className="font-kids font-bold text-3xl text-slate-800 mb-6 border-b pb-4">
            KVKK Aydınlatma Metni
          </h1>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              Son güncelleme: 23 Mayıs 2026
            </p>
            <p>
              Mini Kâşif olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla, kullanıcılarımızın (özellikle çocuk kâşiflerimizin ve ebeveynlerinin) kişisel verilerinin korunmasına büyük önem vermekteyiz.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              1. Kişisel Verilerin Hangi Amaçla İşleneceği
            </h2>
            <p>
              Toplanan kişisel verileriniz, aşağıdaki amaçlarla kanunun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde işlenecektir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mini Kâşif öğrenme portalının kesintisiz ve güvenli işletilmesi.</li>
              <li>Ebeveyn paneli üzerinden çocukların gelişim raporlarının gösterilmesi.</li>
              <li>Ekran süre sınırlama tercihlerinin kaydedilmesi ve uygulanması.</li>
              <li>Kullanıcı kayıt taleplerinin değerlendirilmesi ve bildirimlerin yapılması.</li>
            </ul>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              2. İşlenen Kişisel Verilerin Aktarılması
            </h2>
            <p>
              Toplanan veriler, yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşları dışında, hiçbir ticari üçüncü şahsa veya reklam şirketine aktarılmaz. Tüm veriler yurt içi sunucularda en yüksek güvenlik önlemleriyle saklanır.
            </p>

            <h2 className="font-kids font-bold text-xl text-slate-800 mt-8">
              3. Haklarınız
            </h2>
            <p>
              KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, silinmesini veya düzeltilmesini talep etme ve verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarına sahiptir. Haklarınızı kullanmak için destek@minikasif.com adresine yazılı başvuru iletebilirsiniz.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
