"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mascot } from "@/components/Mascot";
import { EarlyAccessWizard } from "@/components/EarlyAccessWizard";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const categories = [
    { title: "Renkler", emoji: "🎨", desc: "Temel renkleri ve tonları eğlenceli şekillerle keşfedin.", isFree: true, color: "border-primary text-primary bg-primary/5" },
    { title: "Sayılar", emoji: "🔢", desc: "1'den 10'a kadar saymayı, adetleri ve eşleştirmeleri öğrenin.", isFree: false, color: "border-secondary text-secondary bg-secondary/5" },
    { title: "Şekiller", emoji: "📐", desc: "Kare, daire, üçgen ve temel şekilleri ayırt edin.", isFree: false, color: "border-accent text-accent bg-accent/5" },
    { title: "Hayvanlar", emoji: "🦁", desc: "Sevimli hayvanları, çıkardıkları sesleri ve habitatlarını tanıyın.", isFree: false, color: "border-success text-success bg-success/5" },
    { title: "Duygularımız", emoji: "😊", desc: "Mutluluk, şaşkınlık, kızgınlık gibi temel duyguları tanıma.", isFree: false, color: "border-kids-pink text-kids-pink bg-kids-pink/5" },
    { title: "Görgü Kuralları", emoji: "🤝", desc: "Teşekkür etme, paylaşma ve nezaket ifadelerini oyunlarla pekiştirme.", isFree: false, color: "border-kids-purple text-kids-purple bg-kids-purple/5" },
    { title: "İngilizce Kelimeler", emoji: "🇬🇧", desc: "Günlük hayattan ilk İngilizce kelimeler ve basit selamlaşmalar.", isFree: false, color: "border-kids-orange text-kids-orange bg-kids-orange/5" },
    { title: "Dikkat & Mantık", emoji: "🧠", desc: "Gözlem becerileri, eşleştirme ve basit odaklanma oyunları.", isFree: false, color: "border-kids-mint text-kids-mint bg-kids-mint/5" },
  ];

  const faqs: FAQItem[] = [
    {
      question: "Mini Kâşif çocuğumu ekrana daha fazla bağlar mı?",
      answer: "Hayır. Mini Kâşif'in temel amacı pasif ekran süresini aktif ve sınırlı bir süreye dönüştürmektir. Ekran dışı fiziksel görev önerilerimiz ve akıllı süre sınırlayıcımız sayesinde çocuğunuzun dijital süresi bittiğinde ekrandan kopması çok daha kolaylaşır.",
    },
    {
      question: "Çevrimdışı (ekran dışı) görevler tam olarak nedir?",
      answer: "Öğrenilen kategorilerle ilgili çocuğun evde yapabileceği fiziksel etkinliklerdir. Örneğin şekiller kategorisinde çocuktan evdeki yuvarlak eşyaları bulup ebeveynine göstermesi istenir. Bu durum zihinsel öğrenmeyi fiziksel dünya ile birleştirir.",
    },
    {
      question: "Herhangi bir taahhüt var mı? İstediğim zaman iptal edebilir miyim?",
      answer: "Kesinlikle taahhüt yoktur. Aboneliğinizi ebeveyn paneli üzerinden saniyeler içinde tek tıkla iptal edebilirsiniz. İptal sonrasında abonelik döneminizin sonuna kadar Premium haklarınızı kullanmaya devam edersiniz.",
    },
    {
      question: "3 yaşındaki bir çocuk uygulamayı tek başına kullanabilir mi?",
      answer: "Evet. Uygulama içerisindeki tüm adımlar sesli yönergelerle desteklenmiştir. Okuma bilmeyen çocukların bile sadece sesleri ve simgeleri takip ederek bağımsızca öğrenebilmesi amaçlanmıştır.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <span className="inline-block bg-primary-light text-primary text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full select-none">
              👶 3-6 Yaş Grubu Çocuklar İçin Güvenli & Pedagojik Alan
            </span>
            <h1 className="font-kids font-bold text-4xl sm:text-6xl text-slate-800 leading-tight">
              Ekran süresini öğrenme süresine dönüştürün.
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto md:mx-0">
              Mini Kâşif; reklamsız, yaşa özel hazırlanan mini oyunlar ve ekrandan uzaklaştıran fiziksel görevlerle çocuklarınızın dijital süresini aktif ve güvenli bir gelişim macerasına dönüştürür.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/app/categories"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-kids font-bold text-lg rounded-2xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer animate-star-pulse"
              >
                🚀 Ücretsiz Başla
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary-light text-secondary hover:bg-secondary hover:text-white font-kids font-bold text-lg rounded-2xl transition-all cursor-pointer"
              >
                💎 Premium Özellikleri Gör
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              Mini Kâşif şu anda erken erişim aşamasındadır. İlk kullanıcı ailelerle birlikte geliştiriyoruz.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center items-center">
            <Mascot size="lg" />
          </div>
        </section>

        {/* 2. Trust Badges */}
        <section className="bg-white border-y border-slate-100 py-8 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "👶", title: "3-6 Yaş Pedagojisi", desc: "Yaşa uygun güvenli içerik" },
              { icon: "🛡️", title: "%100 Reklamsız", desc: "Kesintisiz, güvenli alan" },
              { icon: "⏰", title: "Ekran Süresi Kilidi", desc: "Uzman onaylı sınırlama" },
              { icon: "🔒", title: "Veri Güvenliği", desc: "Çocuk verileri paylaşılmaz" },
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                <span className="text-3xl bg-slate-50 p-2.5 rounded-2xl">{badge.icon}</span>
                <div>
                  <h4 className="font-kids font-bold text-sm text-slate-800">{badge.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="bg-slate-50/50 py-16 sm:py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">NEYİN FARKINDAYIZ?</span>
            <h2 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800">
              Ebeveynlerin En Büyük İkilemi: Sağlıklı Ekran Sınırları
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "📱", title: "Otomatik Oynatma ve Öneriler", text: "Popüler video platformlarında reklamlar, otomatik oynatma ve öneri akışları çocukların ekran başında planlanandan daha uzun kalmasına neden olabilir." },
              { emoji: "🛋️", title: "Pasif İzleme Deneyimi", text: "Çocuklar dijital dünyada sadece izleyici konumunda kaldıklarında, aktif öğrenme fırsatları sınırlanabilir. Zengin bir deneyim için dokunmaya, düşünmeye ve etkileşime ihtiyaç duyarlar." },
              { emoji: "😭", title: "Ekran Ekseninden Ayrılma Zorluğu", text: "Ekran süresini sonlandırmak bazı çocuklar için zorlayıcı olabilir. Bu nedenle ekran sınırlarının daha planlı ve çocukla iş birliği içinde yönetilmesi önemlidir." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                <span className="text-4xl">{item.emoji}</span>
                <h3 className="font-kids font-bold text-lg text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Solution & Ethical Approach */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 text-center">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">NASIL ÇÖZÜYORUZ?</span>
            <h2 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800">
              Amacımız Ekran Süresini Artırmak Değil, Kalitesini Yükseltmek
            </h2>

            <div className="bg-primary-light/40 border-l-4 border-primary rounded-2xl p-6 text-left text-sm text-slate-700 max-w-3xl leading-relaxed mt-4">
              <strong>Etik Yaklaşımımız:</strong> Mini Kâşif, çocukların ekranda kalma sürelerini yapay olarak uzatmayı amaçlayan otomatik oynatma veya reklam mekanizmaları barındırmaz. Amacımız, çocuğunuzun halihazırda var olan ekran süresini daha güvenli, planlı ve eğitici bir deneyime dönüştürmektir.
            </div>

            <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
              Mini Kâşif, çocuk gelişim uzmanları tarafından belirlenen süre limitlerine sadık kalır. Günlük limit dolduğunda sevimli maskotumuz uyku moduna geçer ve çocuğunuzu ekranı kapatıp dinlenmeye teşvik eder.
            </p>
          </div>
        </section>

        {/* 5. How It Works (Loop) */}
        <section className="bg-gradient-to-b from-secondary-light/20 to-white py-16 sm:py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">3 ADIMDA ETKİN ÖĞRENME</span>
            <h2 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800">
              Mini Kâşif Döngüsü Nasıl Çalışır?
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { step: "1", title: "İzle & Keşfet", desc: "Kısa ve pedagojik animasyonlarla yeni kavramları eğlenceli hikayeler üzerinden öğrenir.", icon: "📺" },
              { step: "2", title: "Oyna & Pekiştir", desc: "Sesli yönlendirmeli mini quizler ile kararlar alarak bilgilerini test eder ve pekiştirir.", icon: "🎮" },
              { step: "3", title: "Ekrandan Uzaklaş", desc: "Fiziksel dünya ile zihinsel öğrenmeyi birleştiren eğlenceli ev içi görevleri ebeveyni ile tamamlar.", icon: "🏃" },
            ].map((stepItem, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md relative flex flex-col gap-4 text-center items-center">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-kids font-bold text-xl shadow-md">
                  {stepItem.step}
                </span>
                <span className="text-5xl mt-4">{stepItem.icon}</span>
                <h3 className="font-kids font-bold text-xl text-slate-800 mt-2">{stepItem.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Categories Catalog */}
        <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-kids-purple uppercase tracking-widest">NELER ÖĞRENİYORLAR?</span>
            <h2 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800">
              İlgi Alanlarına Göre Keşif Yolculuğu
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 relative hover:scale-102 transition-transform duration-300 group cursor-pointer"
              >
                {/* Free vs Premium Badge */}
                {cat.isFree ? (
                  <span className="absolute top-3 right-3 bg-success-light text-success font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-success/20">
                    Açık 🔓
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 bg-red-50 text-danger font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-100">
                    Premium 💎
                  </span>
                )}
                
                <span className="text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mt-3">{cat.emoji}</span>
                <h3 className="font-kids font-bold text-lg text-slate-800">{cat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Parent Dashboard Promo Mockup */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side text */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-kids-orange uppercase tracking-widest">YÖNETİM SİZDE</span>
              <h2 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800">
                Kontrolü Tamamen Size Bırakan Panel
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Çocuğunuz güvenle öğrenirken siz arka planda her şeyi yönetin. Ebeveyn paneline geçişler, çocukların rastgele tuşlamalarla aşamayacağı <strong>"Matematiksel Ebeveyn Kilidi"</strong> ile korunur.
              </p>
              <ul className="space-y-3 text-slate-600 font-medium text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-success text-lg">✓</span>
                  <span><strong>İlgi Alanlarını Keşfedin:</strong> Çocuğunuzun en çok hangi alanlara yatkın olduğunu grafiklerle görün.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success text-lg">✓</span>
                  <span><strong>Süre Sınırı Koyun:</strong> Çocuğunuza hissettirmeden ekran süresini önceden belirleyin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success text-lg">✓</span>
                  <span><strong>Ekran Dışı Görevleri Onaylayın:</strong> Çocuğunuzun fiziksel olarak tamamlayıp size getirdiği görevleri onaylayarak yeni yıldızları birlikte kazanın.</span>
                </li>
              </ul>
            </div>

            {/* Right side mockup */}
            <div className="bg-slate-50 border-4 border-slate-100 rounded-3xl p-6 shadow-xl relative max-w-md mx-auto w-full">
              <div className="flex gap-1.5 mb-4 border-b border-slate-200/80 pb-3">
                <span className="w-3 h-3 bg-red-400 rounded-full" />
                <span className="w-3 h-3 bg-amber-400 rounded-full" />
                <span className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-[10px] text-slate-400 font-bold ml-2 uppercase tracking-wider">Ebeveyn Gelişim Raporu</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-xs">
                    <span className="text-xl">⏱️</span>
                    <h5 className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Kullanım</h5>
                    <p className="font-kids font-bold text-sm text-slate-700">12 Dakika</p>
                  </div>
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-xs">
                    <span className="text-xl">⭐</span>
                    <h5 className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Yıldızlar</h5>
                    <p className="font-kids font-bold text-sm text-slate-700">25 Yıldız</p>
                  </div>
                </div>

                {/* SVG Mini Chart */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                  <h5 className="text-[10px] text-slate-400 font-bold uppercase mb-2">Haftalık Aktivite Dağılımı (Dk)</h5>
                  <div className="h-28 flex items-end justify-between gap-1 pt-4">
                    <div className="w-6 bg-primary-light rounded-t-sm h-[30%]" />
                    <div className="w-6 bg-primary-light rounded-t-sm h-[50%]" />
                    <div className="w-6 bg-primary-light rounded-t-sm h-[40%]" />
                    <div className="w-6 bg-primary rounded-t-sm h-[75%]" />
                    <div className="w-6 bg-secondary rounded-t-sm h-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Ethics Scorecard */}
        <section className="bg-slate-900 text-slate-300 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">ETİK VE SORUMLU DİJİTAL DÜNYA</span>
            <h2 className="font-kids font-bold text-3xl sm:text-4xl text-white">
              Biz Neden Farklıyız? Sorumluluk Sözümüz
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Dengeli ve Sakin Tasarım", icon: "❌", text: "Çocukları ekran başında aşırı uyarmak için tasarlanmış ani ve hızlı görsel geçişler, yüksek tempolu müzikler veya kesintisiz akışlar bulunmaz." },
              { title: "Reklam Amacıyla Kullanılmaz", icon: "🔒", text: "Mini Kâşif, çocuğunuzun kullanım verilerini reklam hedeflemesi için kullanmaz ve üçüncü taraf reklam ağlarıyla paylaşılmaz. Gelişim takibi için yalnızca minimum veriyi işler." },
              { title: "Gizli Satışlar Yok", icon: "❌", text: "Uygulama içinde çocukların karşısına yanlışlıkla satın alabilecekleri hiçbir ödeme butonu çıkarılmaz. Ödeme alanı sadece ebeveyn panelindedir." },
            ].map((card, idx) => (
              <div key={idx} className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-lg flex flex-col gap-3">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="font-kids font-bold text-lg text-white mt-1">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Pricing & Lead Capture */}
        <section id="early-access" className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">BÜTÇE DOSTU VE ŞEFFAF</span>
            <h2 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800">
              Premium Avantajları ve Erken Erişim
            </h2>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Price Card */}
            <div className="bg-white border-4 border-primary-light rounded-3xl p-6 sm:p-8 shadow-xl relative hover:scale-102 transition-transform duration-300">
              <span className="absolute -top-4 left-6 bg-gradient-to-r from-accent to-kids-orange text-white font-bold text-xs px-4 py-1 rounded-full shadow-sm">
                Lansman Fırsatı
              </span>
              <h3 className="font-kids font-bold text-2xl text-primary mt-2">Mini Kâşif Premium</h3>
              <div className="font-kids font-bold text-4xl text-slate-800 my-4">
                99 ₺ <span className="text-base text-slate-400 font-medium">/ aylık</span>
              </div>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Mini Kâşif şu anda erken erişim aşamasındadır. Ücretsiz kullanım modeli ve Premium özellikler lansman sürecinde aktif edilecektir. Şu anda ödeme işlemi aktif değildir; ilgi durumunuzu belirtmek için formumuzu doldurabilirsiniz.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>8 Eğitici Kategorinin Tamamı (Renkler, Sayılar, Hayvanlar...)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Günlük Akıllı Süre Sınırlayıcı Kilidi</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Sınırsız Ekran Dışı Görev Önerisi</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Detaylı Haftalık Gelişim Grafik Raporları</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Reklamsız, Güvenli ve Pedagojik Yapı</span>
                </li>
              </ul>
              <Link
                href="/app/categories"
                className="w-full py-4.5 bg-primary text-white font-kids font-bold text-center block rounded-2xl hover:bg-primary/95 shadow-md active:translate-y-0.5 transition-all text-base cursor-pointer"
              >
                🚀 Şimdi Ücretsiz Dene
              </Link>
              <p className="text-center text-[10px] text-slate-400 mt-3 font-semibold">
                Ücretsiz planda Renkler kategorisini sınırlı içerikle deneyebilirsiniz.
              </p>
            </div>

            {/* Early Access Wizard */}
            <div className="w-full">
              <EarlyAccessWizard />
            </div>
          </div>
        </section>

        {/* 10. FAQs Accordion */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-kids font-bold text-3xl text-slate-800 text-center mb-12">
              Ebeveynlerin Kafasındaki Sorular
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 bg-slate-50/50 hover:bg-slate-50 flex justify-between items-center text-left transition-colors focus:outline-hidden"
                    >
                      <span className="font-kids font-bold text-sm sm:text-base text-slate-800">
                        {faq.question}
                      </span>
                      <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
