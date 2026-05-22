"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { KidsHeader } from "@/components/KidsHeader";
import { KidsFooter } from "@/components/KidsFooter";
import { PremiumUpsellModal } from "@/components/PremiumUpsellModal";

export default function KidsCategories() {
  const router = useRouter();
  const { isPremium } = useApp();
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [comingSoonCategory, setComingSoonCategory] = useState<string | null>(null);

  const categories = [
    { id: "colors", title: "Renkler", emoji: "🎨", desc: "Mavi, kırmızı ve sarıyı sevimli balıklarla öğrenelim!", isFree: true, borderClass: "border-b-8 border-primary hover:border-primary/80" },
    { id: "numbers", title: "Sayılar", emoji: "🔢", desc: "1'den 10'a kadar sayalım, adetleri öğrenelim!", isFree: false, borderClass: "border-b-8 border-secondary hover:border-secondary/80" },
    { id: "shapes", title: "Şekiller", emoji: "📐", desc: "Kare, daire, üçgen ve yıldızları tanıyalım!", isFree: false, borderClass: "border-b-8 border-accent hover:border-accent/80" },
    { id: "animals", title: "Hayvanlar", emoji: "🦁", desc: "Sevimli orman ve deniz canlılarını keşfedelim!", isFree: false, borderClass: "border-b-8 border-success hover:border-success/80" },
    { id: "emotions", title: "Duygular", emoji: "😊", desc: "Mutluluk, şaşkınlık ve hislerimizi tanıyalım!", isFree: false, borderClass: "border-b-8 border-kids-pink hover:border-kids-pink/80" },
    { id: "manners", title: "Görgü Kuralları", emoji: "🤝", desc: "Paylaşma, teşekkür ve nezaket kuralları!", isFree: false, borderClass: "border-b-8 border-kids-purple hover:border-kids-purple/80" },
    { id: "english", title: "İngilizce", emoji: "🇬🇧", desc: "İlk İngilizce kelimeleri ve basit selamlaşmayı öğrenelim!", isFree: false, borderClass: "border-b-8 border-kids-orange hover:border-kids-orange/80" },
    { id: "attention", title: "Süper Dikkat", emoji: "🧠", desc: "Odaklanma, eşleştirme ve dikkat oyunları!", isFree: false, borderClass: "border-b-8 border-kids-mint hover:border-kids-mint/80" },
  ];

  const handleCategoryClick = (cat: typeof categories[0]) => {
    if (cat.isFree) {
      router.push("/app/learn/colors");
    } else {
      if (isPremium) {
        // Simulated premium is active, category is "coming soon" in MVP
        setComingSoonCategory(cat.title);
      } else {
        // Show premium lock modal
        setIsUpsellOpen(true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <KidsHeader
        title="Merhaba Küçük Kâşif! 🌟"
        subtitle="Bugün hangi maceraya katılmak istersin?"
        backUrl="/"
      />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const hasAccess = cat.isFree || isPremium;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`bg-white rounded-3xl p-6 shadow-md hover:-translate-y-2 hover:shadow-lg active:scale-98 transition-all duration-300 cursor-pointer flex flex-col items-center text-center gap-4 relative group ${cat.borderClass} ${
                  !hasAccess ? "opacity-80 grayscale-50" : ""
                }`}
              >
                {/* Ribbon lock/unlock */}
                {!hasAccess ? (
                  <span className="absolute top-3 right-3 bg-rose-500 text-white font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    Premium 🔒
                  </span>
                ) : cat.isFree ? (
                  <span className="absolute top-3 right-3 bg-success text-white font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                    Açık 🔓
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 bg-kids-purple text-white font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                    Premium 💎
                  </span>
                )}

                <span className="text-6xl group-hover:scale-115 group-hover:rotate-6 transition-all duration-300 mt-4 select-none">
                  {cat.emoji}
                </span>

                <h3 className="font-kids font-bold text-lg sm:text-xl text-slate-800">
                  {cat.title}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      <KidsFooter />

      {/* Premium Upsell Modal */}
      <PremiumUpsellModal
        isOpen={isUpsellOpen}
        onClose={() => setIsUpsellOpen(false)}
      />

      {/* Coming Soon Modal */}
      {comingSoonCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-kids-purple animate-float-sparkle text-center">
            <button
              onClick={() => setComingSoonCategory(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-slate-400 hover:text-slate-600 focus:outline-hidden"
            >
              ×
            </button>

            <span className="inline-block text-5xl my-4 animate-bounce-logo">🚀</span>
            
            <h3 className="font-kids text-2xl font-bold text-kids-purple mb-2">
              Çok Yakında!
            </h3>
            
            <p className="text-sm text-slate-600 mb-6 px-4">
              Tebrikler, Premium üyesiniz! <strong>{comingSoonCategory}</strong> kategorisi şu anda pedagoji ekibimiz tarafından test edilmektedir. Çok yakında yeni maceralar ve oyunlarla burada yayında olacak! 🌟
            </p>

            <button
              onClick={() => setComingSoonCategory(null)}
              className="w-full py-3.5 bg-kids-purple hover:bg-kids-purple/95 text-white font-kids font-bold rounded-2xl transition-all text-sm cursor-pointer"
            >
              Harika, Bekliyorum! 🧒
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
