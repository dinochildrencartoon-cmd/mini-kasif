"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParentGateModal } from "@/components/ParentGateModal";
import { supabase } from "@/lib/supabase";

export default function ParentDashboard() {
  const router = useRouter();
  const {
    starsCount,
    unlockedBadges,
    completedMissions,
    timeSpent,
    screenTimeLimit,
    isPremium,
    completedAdventures,
    progress,
    earlyAccess,
    setScreenTimeLimit,
    setIsPremium,
    submitEarlyAccess,
    resetProgress,
    childAge,
    parentName,
    user,
  } = useApp();

  // Verification Gate State
  const [isVerified, setIsVerified] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"reports" | "screentime" | "billing" | "earlyaccess">("reports");

  // Local feedback states
  const [showTimeSuccess, setShowTimeSuccess] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [showBillingSuccess, setShowBillingSuccess] = useState(false);

  // Db Progress state
  const [dbProgress, setDbProgress] = useState<any[]>([]);

  // Early access form states
  const [formParentName, setFormParentName] = useState("");
  const [email, setEmail] = useState("");
  const [formChildAge, setFormChildAge] = useState("4");
  const [interestReasons, setInterestReasons] = useState<string[]>([]);
  const [formSuccess, setFormSuccess] = useState(false);

  // Checkout form states (Simulated)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verified = sessionStorage.getItem("mk_parent_verified");
      if (verified === "true") {
        setIsVerified(true);
      } else {
        setIsGateOpen(true);
      }

      // Check if redirecting from premium lock modal to billing section
      const redirectTab = sessionStorage.getItem("parent_redirect_tab");
      if (redirectTab) {
        setActiveTab(redirectTab as any);
        sessionStorage.removeItem("parent_redirect_tab");
      }
    }
  }, []);

  // Fetch real-time progress data from Supabase
  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id);
        if (error) {
          console.error("Error loading progress in parent dashboard:", error);
        } else if (data) {
          setDbProgress(data);
        }
      } catch (err) {
        console.error("Error fetching progress from DB:", err);
      }
    };
    fetchProgress();
  }, [user, starsCount]);

  const handleGateSuccess = () => {
    sessionStorage.setItem("mk_parent_verified", "true");
    setIsVerified(true);
    setIsGateOpen(false);
  };

  const handleGateClose = () => {
    setIsGateOpen(false);
    if (!isVerified) {
      router.push("/");
    }
  };

  const handleTimePresetClick = (minutes: number) => {
    setScreenTimeLimit(minutes);
    setShowTimeSuccess(true);
    setTimeout(() => setShowTimeSuccess(false), 3000);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPremium(true);
    setShowBillingSuccess(true);
    setTimeout(() => setShowBillingSuccess(false), 3000);
    // Reset inputs
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
  };

  const handleCancelPremium = () => {
    setIsPremium(false);
    setShowBillingSuccess(true);
    setTimeout(() => setShowBillingSuccess(false), 3000);
  };

  const handleEarlyAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formParentName || !email) return;

    submitEarlyAccess({
      parentName: formParentName,
      email,
      childAge: formChildAge,
      interestReasons,
    });
    setFormSuccess(true);
  };

  const handleCheckboxChange = (val: string) => {
    setInterestReasons((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const handleResetData = () => {
    if (window.confirm("Tüm çocuk gelişim verilerini sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
      resetProgress();
      setShowResetSuccess(true);
      setTimeout(() => setShowResetSuccess(false), 3000);
    }
  };

  if (!isVerified) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-md max-w-sm w-full">
            <span className="text-4xl inline-block mb-3 animate-bounce">🔒</span>
            <h2 className="font-kids font-bold text-slate-800 text-lg mb-2">Ebeveyn Doğrulaması Bekleniyor</h2>
            <p className="text-sm text-slate-500 mb-4">Paneli görüntülemek için matematik sorusunu doğru cevaplamalısınız.</p>
            <button
              onClick={() => setIsGateOpen(true)}
              className="px-6 py-2.5 bg-primary text-white font-kids font-bold text-sm rounded-xl hover:bg-primary/95 transition-colors cursor-pointer"
            >
              Doğrulamayı Aç
            </button>
          </div>
        </main>
        <Footer />
        <ParentGateModal
          isOpen={isGateOpen}
          onClose={handleGateClose}
          onSuccess={handleGateSuccess}
        />
      </div>
    );
  }

  // Define Category Information for Progress Display
  const categoriesList = [
    { key: "colors" as const, name: "Renkler", emoji: "🎨", desc: "Mavi, kırmızı, sarı...", colorClass: "bg-primary", borderClass: "border-primary/20", isFree: true },
    { key: "numbers" as const, name: "Sayılar", emoji: "🔢", desc: "1-10 arası sayılar", colorClass: "bg-secondary", borderClass: "border-secondary/20", isFree: false },
    { key: "shapes" as const, name: "Şekiller", emoji: "📐", desc: "Daire, kare, üçgen...", colorClass: "bg-accent", borderClass: "border-accent/20", isFree: false },
    { key: "animals" as const, name: "Hayvanlar", emoji: "🦁", desc: "Sesler ve habitatlar", colorClass: "bg-success", borderClass: "border-success/20", isFree: false },
    { key: "emotions" as const, name: "Duygularımız", emoji: "😊", desc: "Duygu tanıma", colorClass: "bg-kids-pink", borderClass: "border-kids-pink/20", isFree: false },
    { key: "manners" as const, name: "Görgü Kuralları", emoji: "🤝", desc: "Nezaket ifadeleri", colorClass: "bg-kids-purple", borderClass: "border-kids-purple/20", isFree: false },
    { key: "english" as const, name: "İngilizce Kelimeler", emoji: "🇬🇧", desc: "Basit kelimeler", colorClass: "bg-kids-orange", borderClass: "border-kids-orange/20", isFree: false },
    { key: "attention" as const, name: "Dikkat & Mantık", emoji: "🧠", desc: "Odaklanma oyunları", colorClass: "bg-kids-mint", borderClass: "border-kids-mint/20", isFree: false },
  ];

  // Pedagogical reviews dictionary
  const pedagogicalReviews: Record<string, string> = {
    colors: "Kâşifiniz renkleri ayırt etme ve eşleştirmede oldukça aktif. Özellikle 'Mavi Rengi Keşfedelim' macerasını tamamlayarak görsel gruplama becerisini kanıtladı. Ekran dışı görevi başarıyla getirdi.",
    numbers: "Çocuğunuz sayılarla ilk etkileşimleri gerçekleştiriyor. 1'den 10'a kadar olan sayılardaki görsel nesne sayımı yeteneği gelişmektedir.",
    shapes: "Köşe, kenar ve form analizlerini başarıyla yapıyor. Geometrik nesneleri ev içerisindeki eşyalarla bağdaştırmada başarılı.",
    animals: "Hayvanlar alemi ve sesleri arasındaki işitsel-görsel eşleştirmeleri tamamlıyor. Canlı sevgisi ve kelime dağarcığı pekişiyor.",
    emotions: "Mutluluk, şaşkınlık ve üzüntü gibi temel yüz ifadelerini ve empati kurma mantığını analiz etmede hevesli bir tutum sergiliyor.",
    manners: "Paylaşım, teşekkür etme ve özür dileme gibi sosyal kuralları içeren durum eşleştirmelerini büyük ölçüde kavradı.",
    english: "İlk yabancı dil seslerini ve İngilizce kelimeleri (renkler, selamlaşma) merakla dinliyor ve tekrar ediyor.",
    attention: "Görsel hafıza, farklı olanı bulma ve parça-bütün ilişkisi kurma egzersizlerinde odaklanma süresi uzuyor."
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header section with Reset option */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-kids font-bold text-3xl sm:text-4xl text-slate-800 flex items-center gap-2">
              <span>Ebeveyn Kontrol Paneli</span>
              <span className="text-xl px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg border border-slate-200">🔒 Kilit Açık</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Çocuğunuzun gelişimini izleyin, ekran sınırlarını belirleyin ve üyelik ayarlarını yapın.
            </p>
          </div>
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-red-50 text-danger border border-red-100 font-kids text-xs font-bold rounded-xl hover:bg-red-100 hover:scale-102 active:scale-98 transition-all cursor-pointer"
          >
            🗑️ Tüm Verileri Sıfırla
          </button>
        </div>

        {showResetSuccess && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-danger text-sm font-semibold rounded-2xl animate-pulse">
            Tüm çocuk gelişim verileri, kazanılan yıldızlar ve süre limitleri başarıyla sıfırlandı.
          </div>
        )}

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Tabs - Sidebar (Desktop) / Pill Bar (Mobile) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-3 lg:pb-0 border-b lg:border-b-0 border-slate-200">
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex-none font-kids font-bold text-left px-5 py-3.5 rounded-2xl text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "reports"
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-102"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              📊 Gelişim Raporu
            </button>
            <button
              onClick={() => setActiveTab("screentime")}
              className={`flex-none font-kids font-bold text-left px-5 py-3.5 rounded-2xl text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "screentime"
                  ? "bg-secondary text-white shadow-md shadow-secondary/20 scale-102"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              ⏱️ Ekran Süresi Kontrolü
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`flex-none font-kids font-bold text-left px-5 py-3.5 rounded-2xl text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "billing"
                  ? "bg-accent text-white shadow-md shadow-accent/20 scale-102"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              💎 Üyelik & Abonelik
            </button>
            <button
              onClick={() => setActiveTab("earlyaccess")}
              className={`flex-none font-kids font-bold text-left px-5 py-3.5 rounded-2xl text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "earlyaccess"
                  ? "bg-kids-purple text-white shadow-md shadow-kids-purple/20 scale-102"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              👤 Hesap Durumu
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-9 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* TAB 1: Gelişim Raporu */}
            {activeTab === "reports" && (
              <div className="space-y-8">
                {/* Profile Overview Banner */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-kids font-bold text-xl text-slate-800">
                      Merhaba, Ebeveyn {parentName || "Kullanıcı"} 👋
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Çocuğunuzun yaşı: <strong className="text-slate-700">{childAge ? `${childAge} yaş` : "Belirtilmemiş"}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-400 font-kids uppercase">Mevcut Plan:</span>
                    <span className={`font-kids font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isPremium 
                        ? "bg-gradient-to-r from-accent to-kids-orange text-white" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {isPremium ? "Premium Plan" : "Ücretsiz Plan"}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-kids font-bold text-2xl text-slate-800 mb-1">Gelişim ve İlerleme Raporu</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Çocuğunuzun tamamladığı aktiviteler ve pedagojik yetkinlik kazanımları.
                  </p>
                </div>

                {/* Kids Status Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                    <span className="text-3xl block mb-1">🌟</span>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Toplam Yıldız</h5>
                    <p className="font-kids font-bold text-xl text-slate-700 mt-1">{starsCount} Yıldız</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                    <span className="text-3xl block mb-1">⏱️</span>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ekran Süresi</h5>
                    <p className="font-kids font-bold text-xl text-slate-700 mt-1">{timeSpent} Dakika</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                    <span className="text-3xl block mb-1">🏃</span>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Görevler</h5>
                    <p className="font-kids font-bold text-xl text-slate-700 mt-1">{completedMissions} Görev</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                    <span className="text-3xl block mb-1">🏅</span>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rozetler</h5>
                    <p className="font-kids font-bold text-xl text-slate-700 mt-1">{unlockedBadges.length} Rozet</p>
                  </div>
                </div>

                {/* Badges List */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <h4 className="font-kids font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">Kazanılan Rozetler</h4>
                  {unlockedBadges.length === 0 ? (
                    <p className="text-xs text-slate-400">Henüz kazanılan rozet yok. Renkler kategorisindeki quizleri tamamlayarak rozet kazanabilirsiniz!</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {unlockedBadges.map((badge, idx) => (
                        <span key={idx} className="inline-block bg-white border border-slate-200 font-kids font-bold text-xs text-slate-700 px-3 py-1.5 rounded-full shadow-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Detailed Category Progress */}
                <div className="space-y-4">
                  <h4 className="font-kids font-bold text-lg text-slate-800 border-b pb-2">Kategori İlerleme Durumları</h4>

                  {/* Helpers inside component */}
                  {(() => {
                    const getCategoryStats = (catKey: string) => {
                      const catRows = dbProgress.filter((row) => row.category_slug === catKey);
                      const completedGames = catRows.filter((row) => row.content_slug.startsWith("game-") && row.completed).length;
                      const totalStars = catRows.reduce((sum, row) => sum + (row.stars || 0), 0);
                      const completedTask = catRows.some((row) => row.content_slug === "completed" && row.completed);
                      const badgeRow = catRows.find((row) => row.badge);
                      const badge = badgeRow ? badgeRow.badge : null;

                      let pct = 0;
                      if (completedTask) {
                        pct = 100;
                      } else {
                        pct = Math.min(80, completedGames * 25);
                        if (catKey === "colors" && pct === 0) pct = 20; // default initial color progress
                      }

                      return {
                        completedGames,
                        totalStars,
                        completedTask,
                        badge,
                        pct,
                        totalScore: totalStars + (completedTask ? 50 : 0)
                      };
                    };

                    const getMostActiveCategoryKey = () => {
                      if (dbProgress.length === 0) return null;
                      const scores: Record<string, number> = {};
                      categoriesList.forEach((cat) => {
                        const stats = getCategoryStats(cat.key);
                        scores[cat.key] = stats.totalScore;
                      });
                      
                      let maxKey: string | null = null;
                      let maxVal = 0;
                      Object.entries(scores).forEach(([key, val]) => {
                        if (val > maxVal) {
                          maxVal = val;
                          maxKey = key;
                        }
                      });
                      return maxVal > 0 ? maxKey : null;
                    };

                    const mostActiveCategoryKey = getMostActiveCategoryKey();

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoriesList.map((cat) => {
                          const isCategoryAccessible = isPremium || cat.isFree;
                          const stats = getCategoryStats(cat.key);
                          const pct = isCategoryAccessible ? stats.pct : 0;
                          const isMostActive = mostActiveCategoryKey === cat.key;

                          return (
                            <div
                              key={cat.key}
                              className={`bg-white border rounded-2xl p-5 transition-all relative overflow-hidden ${
                                isCategoryAccessible ? `border-slate-100 shadow-xs` : `bg-slate-50/50 border-slate-200/60 opacity-60`
                              }`}
                            >
                              {/* Most Active Ribbon */}
                              {isCategoryAccessible && isMostActive && (
                                <span className="absolute top-2 right-2 bg-rose-500 text-white font-kids font-bold text-[8px] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider animate-pulse z-10">
                                  🔥 En Çok İlgi Gösterilen
                                </span>
                              )}

                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-3xl select-none">{cat.emoji}</span>
                                  <div>
                                    <h5 className="font-kids font-bold text-sm text-slate-800">{cat.name}</h5>
                                    <p className="text-[10px] text-slate-400">{cat.desc}</p>
                                  </div>
                                </div>
                                
                                {!isCategoryAccessible && (
                                  <span className="bg-red-50 text-danger border border-red-100 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                                    🔒 Premium
                                  </span>
                                )}

                                {isCategoryAccessible && (
                                  <span className="font-kids font-bold text-xs text-slate-500">{pct}%</span>
                                )}
                              </div>

                              {/* Progress Bar Container */}
                              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${cat.colorClass}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>

                              {/* Interactive Child Metrics List */}
                              {isCategoryAccessible && (
                                <div className="grid grid-cols-2 gap-2 bg-slate-50/70 border border-slate-100 rounded-xl p-3 mb-3 text-[11px] font-medium text-slate-600">
                                  <div>🎮 Oyunlar: <strong className="text-slate-800">{stats.completedGames} / 3</strong></div>
                                  <div>⭐ Yıldızlar: <strong className="text-slate-800">{stats.totalStars} ⭐</strong></div>
                                  <div className="col-span-2 border-t border-slate-100 pt-1.5 mt-0.5 flex flex-col gap-1">
                                    <div>🏃 Görev: <span className={stats.completedTask ? "text-success font-bold" : "text-slate-500"}>{stats.completedTask ? "Tamamlandı ✅" : "Onay Bekliyor ⏳"}</span></div>
                                    <div>🏅 Rozet: <span className={stats.badge ? "text-accent font-bold" : "text-slate-400"}>{stats.badge ? stats.badge : "Henüz Kazanılmadı ⏳"}</span></div>
                                  </div>
                                </div>
                              )}

                              {/* Evaluation Text / Pedagogical comments */}
                              {isCategoryAccessible ? (
                                <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                  💡 {pct > 20 || (cat.key === "colors" && stats.completedGames > 0) ? pedagogicalReviews[cat.key] : "Çocuğunuz bu kategoriye henüz başlamadı."}
                                </p>
                              ) : (
                                <p className="text-[11px] text-slate-400 leading-normal">
                                  Çocuğunuzun bu kategorideki ilerlemesini takip etmek ve uzman pedagojik yorumları almak için Premium plana geçin.
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* SVG Activity Graph section */}
                <div className="space-y-4">
                  <h4 className="font-kids font-bold text-lg text-slate-800">Haftalık Ekran Süresi Analizi</h4>
                  
                  {!isPremium ? (
                    <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50/50">
                      <div className="filter blur-xs pointer-events-none select-none opacity-40">
                        {/* Fake chart template */}
                        <div className="h-32 flex items-end justify-between gap-2 max-w-sm mx-auto">
                          <div className="w-8 bg-slate-300 h-10 rounded-t" />
                          <div className="w-8 bg-slate-300 h-16 rounded-t" />
                          <div className="w-8 bg-slate-300 h-8 rounded-t" />
                          <div className="w-8 bg-slate-300 h-24 rounded-t" />
                          <div className="w-8 bg-slate-300 h-32 rounded-t" />
                        </div>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-white/70 rounded-2xl">
                        <span className="text-2xl mb-1">💎</span>
                        <h5 className="font-kids font-bold text-base text-slate-800">Tüm kategorileri açın</h5>
                        <p className="text-xs text-slate-500 max-w-sm my-2 leading-relaxed">
                          Premium plan ile tüm içeriklere, haftalık gelişim raporlarına ve gelişmiş ebeveyn özelliklerine erişebilirsiniz.
                        </p>
                        <button
                          onClick={() => setActiveTab("billing")}
                          className="px-5 py-2.5 bg-accent hover:bg-accent/95 text-white font-kids font-bold text-xs rounded-xl hover:scale-102 active:scale-98 transition-all cursor-pointer"
                        >
                          Premium’u İncele
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-slate-200/80 rounded-2xl p-6 bg-slate-50/50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h5 className="font-kids font-bold text-sm text-slate-700">Haftalık Kullanım Süresi (Dakika)</h5>
                        <span className="text-xs text-slate-500">Son 7 Günlük İstatistik</span>
                      </div>

                      {/* Render Premium SVG Chart */}
                      <div className="relative">
                        <svg className="w-full h-48" viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">
                          {/* Grid Lines */}
                          <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="40" y1="140" x2="480" y2="140" stroke="#cbd5e1" strokeWidth="1" />

                          {/* Y-Axis Labels */}
                          <text x="15" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">30 Dk</text>
                          <text x="15" y="65" fill="#94a3b8" fontSize="10" fontWeight="bold">20 Dk</text>
                          <text x="15" y="105" fill="#94a3b8" fontSize="10" fontWeight="bold">10 Dk</text>
                          <text x="20" y="145" fill="#94a3b8" fontSize="10" fontWeight="bold">0</text>

                          {/* Bars with gradients */}
                          {/* Mon (2 Dk) */}
                          <rect x="65" y="132" width="28" height="8" rx="4" fill="#ff6f61" opacity="0.6" />
                          {/* Tue (10 Dk) */}
                          <rect x="125" y="100" width="28" height="40" rx="4" fill="#ffb703" opacity="0.7" />
                          {/* Wed (5 Dk) */}
                          <rect x="185" y="120" width="28" height="20" rx="4" fill="#9b5de5" opacity="0.7" />
                          {/* Thu (15 Dk) */}
                          <rect x="245" y="80" width="28" height="60" rx="4" fill="#2ec4b6" opacity="0.8" />
                          {/* Fri (18 Dk) */}
                          <rect x="305" y="68" width="28" height="72" rx="4" fill="#f15bb5" opacity="0.8" />
                          {/* Sat (22 Dk) */}
                          <rect x="365" y="52" width="28" height="88" rx="4" fill="#4ea8de" opacity="0.9" />
                          {/* Sun (Today: timeSpent Dk) */}
                          <rect
                            x="425"
                            y={Math.max(20, 140 - Math.min(30, timeSpent) * 4)}
                            width="28"
                            height={Math.min(30, timeSpent) * 4}
                            rx="4"
                            fill="url(#primaryGradient)"
                          />

                          {/* Gradients definitions */}
                          <defs>
                            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ff6f61" />
                              <stop offset="100%" stopColor="#f15bb5" />
                            </linearGradient>
                          </defs>

                          {/* X-Axis Labels */}
                          <text x="79" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">Pzt</text>
                          <text x="139" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">Sal</text>
                          <text x="199" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">Çar</text>
                          <text x="259" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">Per</text>
                          <text x="319" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">Cum</text>
                          <text x="379" y="160" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">Cmt</text>
                          <text x="439" y="160" textAnchor="middle" fill="#ff6f61" fontSize="10" fontWeight="bold">Paz (Bugün)</text>
                        </svg>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
                        📊 <strong>Süre Analizi:</strong> Hafta sonu kullanım süresinde küçük bir artış gözleniyor. Çocuğunuzun günlük limit dolunca maskotumuzla birlikte ekran başından ayrılma oranı %92'dir. Bu da ekran sınırları bilincinin başarıyla oturduğunu göstermektedir.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Ekran Süresi Kontrolü */}
            {activeTab === "screentime" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-kids font-bold text-2xl text-slate-800 mb-1">Ekran Süresi Limit Yönetimi</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Çocuğunuzun günlük dijital oyun süresini belirleyin. Süre dolduğunda portal kilitlenir.
                  </p>
                </div>

                {showTimeSuccess && (
                  <div className="p-4 bg-success-light border border-success/30 text-success text-sm font-semibold rounded-2xl animate-fade-in-up">
                    Süre sınırı başarıyla güncellendi! Yeni limit hemen çocuk portalında geçerli olacaktır.
                  </div>
                )}

                {/* Status Indicator */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">⏱️</span>
                    <div>
                      <h4 className="font-kids font-bold text-slate-700">Aktif Günlük Limit</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Değişiklikler anında kaydedilir</p>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-secondary-light text-secondary rounded-2xl font-kids font-bold text-lg border border-secondary/10">
                    {screenTimeLimit === 0 ? "Sınırsız ♾️" : `${screenTimeLimit} Dakika`}
                  </div>
                </div>

                {/* Preset Options */}
                <div className="space-y-3">
                  <h4 className="font-kids font-bold text-slate-700 text-sm">Zaman Sınırı Seçin</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { minutes: 15, title: "15 Dakika (Önerilen)", desc: "3-4 yaş çocukları için ideal günlük sınırlama", recommended: true },
                      { minutes: 30, title: "30 Dakika", desc: "5-6 yaş okul öncesi grubu için uygun süre", recommended: false },
                      { minutes: 45, title: "45 Dakika", desc: "Maksimum ekran süresi olarak önerilen limit", recommended: false },
                      { minutes: 0, title: "Sınırsız / Serbest", desc: "Zaman sınırlaması olmaksızın sürekli açık kalır", recommended: false },
                    ].map((opt) => {
                      const isSelected = screenTimeLimit === opt.minutes;
                      return (
                        <button
                          key={opt.minutes}
                          onClick={() => handleTimePresetClick(opt.minutes)}
                          className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer hover:-translate-y-0.5 relative flex flex-col justify-between h-28 focus:outline-hidden ${
                            isSelected
                              ? "border-secondary bg-secondary-light/20 scale-101"
                              : "border-slate-100 bg-white hover:border-slate-200"
                          }`}
                        >
                          {opt.recommended && (
                            <span className="absolute top-3 right-3 bg-success-light text-success text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-success/15 animate-pulse">
                              Önerilen 👶
                            </span>
                          )}
                          <h5 className="font-kids font-bold text-sm text-slate-800">{opt.title}</h5>
                          <p className="text-[11px] text-slate-400 mt-1 leading-normal">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-500 leading-relaxed mt-4">
                  ℹ️ <strong>Nasıl Çalışır?</strong> Çocuğunuz `/app` altındaki çocuk portalında oynamaya başladığında süre sayacı geri sayar. Süre sıfıra ulaştığında ekran kapanır, sevimli maskotumuz esneyip uyku moduna geçer. Ebeveyn matematiksel kilidini çözerek süre limitini buradan uzatabilir ya da kaldırabilir.
                </div>
              </div>
            )}

            {/* TAB 3: Üyelik & Abonelik (Simüle Ödeme) */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-kids font-bold text-2xl text-slate-800 mb-1">Üyelik ve Abonelik Yönetimi</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Ücretsiz ve Premium planlar arasında geçiş yapın. Premium özellikleri anında deneyimleyin.
                  </p>
                </div>

                {showBillingSuccess && (
                  <div className="p-4 bg-success-light border border-success/30 text-success text-sm font-semibold rounded-2xl animate-fade-in-up">
                    Abonelik durumunuz başarıyla güncellendi! Çocuk portalındaki tüm kilitler senkronize edildi.
                  </div>
                )}

                {/* Plan Status Banner */}
                <div className={`p-6 rounded-3xl border-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                  isPremium
                    ? "bg-gradient-to-r from-accent/10 to-kids-orange/10 border-accent/30"
                    : "bg-slate-50 border-slate-200/80"
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{isPremium ? "💎" : "🆓"}</span>
                    <div>
                      <h4 className="font-kids font-bold text-slate-800">
                        Mevcut Planınız: {isPremium ? "Mini Kâşif Premium" : "Ücretsiz Sürüm"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isPremium ? "Tüm içerikler, süre kilidi ve analizler aktif!" : "Sadece Renkler kategorisine erişim mevcuttur."}
                      </p>
                    </div>
                  </div>

                  {isPremium ? (
                    <button
                      onClick={handleCancelPremium}
                      className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-kids font-bold text-xs rounded-xl active:scale-98 transition-all cursor-pointer"
                    >
                      Ücretsiz Plana Dön (Simüle)
                    </button>
                  ) : (
                    <span className="bg-gradient-to-r from-accent to-kids-orange text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs animate-pulse">
                      YÜKSELTİN
                    </span>
                  )}
                </div>

                {/* Premium checkout simulation form */}
                {!isPremium && (
                  <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50/50 space-y-6">
                    <div>
                      <h4 className="font-kids font-bold text-lg text-slate-700 flex items-center gap-2">
                        <span>💎 Premium Plana Yükselt (Simülasyon)</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Premium ödeme sistemi yakında aktif olacaktır. Şimdilik ücretsiz planla başlayabilir ve Premium özellikleri inceleyebilirsiniz. Aşağıdaki kart formu üzerinden Premium satın alımı simüle ederek tüm özellikleri test edebilirsiniz.
                      </p>
                    </div>

                    <form onSubmit={handleSimulatePayment} className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kart Numarası</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-accent text-slate-700 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Son Kullanma</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                            placeholder="AA/YY"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-accent text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CVV / CVC</label>
                          <input
                            type="text"
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-accent text-slate-700 font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-accent hover:bg-accent/95 text-white font-kids font-bold text-sm rounded-xl hover:-translate-y-0.5 shadow-md active:translate-y-0 active:scale-99 transition-all cursor-pointer mt-2"
                      >
                        💳 Premium Satın Alımı Simüle Et (99 ₺ / Ay)
                      </button>
                    </form>

                    <div className="border-t pt-4">
                      <h5 className="font-kids font-bold text-xs text-slate-500 mb-2">Premium Ayrıcalıkları:</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 font-medium">
                        <li className="flex items-center gap-1.5"><span className="text-accent">✓</span> 8 Kategorinin Tamamına Sınırsız Erişim</li>
                        <li className="flex items-center gap-1.5"><span className="text-accent">✓</span> Akıllı Ekran Kilidi Özelleştirme</li>
                        <li className="flex items-center gap-1.5"><span className="text-accent">✓</span> Tüm Rozet ve Görev Döngüleri Açık</li>
                        <li className="flex items-center gap-1.5"><span className="text-accent">✓</span> Detaylı Gelişim Grafikleri ve Pedagojik Raporlar</li>
                      </ul>
                    </div>
                  </div>
                )}

                {isPremium && (
                  <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 text-xs text-slate-500 space-y-2">
                    <p className="font-semibold text-slate-700">🔒 Premium Modu Aktif</p>
                    <p>Mevcut planınız test modunda Premium olarak güncellenmiştir. Çocuk portalına geçerek 8 kategorinin tamamını kilitler olmadan inceleyebilirsiniz. Gelişim raporu sayfasında da tüm kategorilerin ilerleme ve süre analiz grafikleri aktiftir.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Hesap Durumu */}
            {activeTab === "earlyaccess" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-kids font-bold text-2xl text-slate-800 mb-1">Hesap Bilgileri ve Durumu</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Mini Kâşif hesap bilgileriniz ve aktif profil durumunuz.
                  </p>
                </div>

                {earlyAccess ? (
                  <div className="space-y-6">
                    {/* Access Approved Status Card */}
                    <div className="p-6 bg-kids-purple/5 border-2 border-dashed border-kids-purple/30 rounded-3xl text-center space-y-3">
                      <span className="text-4xl inline-block animate-bounce">🎉</span>
                      <h4 className="font-kids font-bold text-xl text-kids-purple">Hesabınız Aktif!</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        Mini Kâşif ailesine katıldığınız için teşekkür ederiz. Ücretsiz planınız aktiftir. İstediğiniz zaman Premium plana geçiş yapabilirsiniz.
                      </p>
                    </div>

                    {/* Application Details Summary */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-3">
                      <h5 className="font-kids font-bold text-slate-700 border-b pb-2 mb-2">Hesap Detayları</h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <span className="text-slate-400 block">Veli Adı Soyadı:</span>
                          <strong className="text-slate-700 font-semibold">{earlyAccess.parentName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">E-Posta Adresi:</span>
                          <strong className="text-slate-700 font-semibold">{earlyAccess.email}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Çocuğun Yaşı:</span>
                          <strong className="text-slate-700 font-semibold">{earlyAccess.childAge} Yaş</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Kayıt Tarihi:</span>
                          <strong className="text-slate-700 font-semibold">{earlyAccess.submittedAt}</strong>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-slate-400 block text-xs mb-1">İlgi Duyulan Konular:</span>
                        <div className="flex flex-wrap gap-2">
                          {earlyAccess.interestReasons && earlyAccess.interestReasons.length > 0 ? (
                            earlyAccess.interestReasons.map((reason, idx) => (
                              <span key={idx} className="bg-white border border-slate-200 text-xs px-3 py-1 rounded-full text-slate-600 font-medium">
                                {reason}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 italic">Detay belirtilmemiş</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Notice */}
                    <div className="p-4 bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl text-xs sm:text-sm leading-relaxed">
                      ⚠️ <strong>Profil Bilgisi Bulunamadı:</strong> Lütfen ebeveyn profilinizi tamamlamak ve ücretsiz kullanıma başlamak için aşağıdaki formu doldurun.
                    </div>

                    {/* Inline Form */}
                    <form onSubmit={handleEarlyAccessSubmit} className="space-y-4 max-w-md bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      {formSuccess && (
                        <div className="p-4 bg-success-light border border-success/20 text-success text-xs font-semibold rounded-xl">
                          Hesabınız başarıyla oluşturuldu!
                        </div>
                      )}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Adınız Soyadınız</label>
                        <input
                          type="text"
                          required
                          value={formParentName}
                          onChange={(e) => setFormParentName(e.target.value)}
                          placeholder="Ahmet Yılmaz"
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-kids-purple text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">E-Posta Adresiniz</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ahmet@example.com"
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-kids-purple text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Çocuğunuzun Yaşı</label>
                        <select
                          value={formChildAge}
                          onChange={(e) => setFormChildAge(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-kids-purple text-slate-700"
                        >
                          <option value="2">2 Yaş</option>
                          <option value="3">3 Yaş</option>
                          <option value="4">4 Yaş</option>
                          <option value="5">5 Yaş</option>
                          <option value="6">6 Yaş</option>
                          <option value="7">7+ Yaş</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mini Kâşif'te Sizin İçin En Önemli Özellik Hangisi?</label>
                        {[
                          "Güvenli ve Reklamsız İçerik",
                          "Akıllı Ekran Süresi Kısıtlaması",
                          "Fiziksel / Ekran Dışı Etkinlik Önerileri",
                          "Detaylı Gelişim Grafikleri ve Pedagojik Destek",
                        ].map((reason) => (
                          <label key={reason} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer">
                            <input
                              type="checkbox"
                              checked={interestReasons.includes(reason)}
                              onChange={() => handleCheckboxChange(reason)}
                              className="mt-0.5 rounded-sm border-slate-300 text-kids-purple focus:ring-kids-purple"
                            />
                            <span>{reason}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-kids-purple hover:bg-kids-purple/95 text-white font-kids font-bold text-sm rounded-xl shadow-md active:translate-y-0.5 transition-all cursor-pointer mt-2"
                      >
                        Ücretsiz Hesabımı Oluştur
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />

      {/* Parent Gate for tab/security validation */}
      <ParentGateModal
        isOpen={isGateOpen}
        onClose={handleGateClose}
        onSuccess={handleGateSuccess}
      />
    </div>
  );
}
