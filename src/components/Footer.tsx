"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-kids font-bold text-xl text-white">Mini Kâşif</span>
          </div>
          <p className="text-sm text-slate-500 max-w-sm">
            Çocuklar için güvenli ekran süresi kontrollü, pedagojik onaylı oyunlaştırma ve dijital eğitim platformu.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-semibold mb-4">Hızlı Menü</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white transition-colors">
                Planlar & Ücretlendirme
              </Link>
            </li>
            <li>
              <Link href="/parent" className="hover:text-white transition-colors">
                Ebeveyn Portalı
              </Link>
            </li>
            <li>
              <Link href="/app/categories" className="hover:text-white transition-colors">
                Çocuk Portalı
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-white font-semibold mb-4">Sözleşmeler & Yasal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link href="/kvkk" className="hover:text-white transition-colors">
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Kullanım Şartları
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
        <p>&copy; {new Date().getFullYear()} Mini Kâşif. Tüm hakları saklıdır. Yapay zeka ve uzman pedagoglarla sevgiyle geliştirilmiştir.</p>
      </div>
    </footer>
  );
};
