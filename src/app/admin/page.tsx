"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface AdminApplicant {
  id: string;
  parentName: string;
  email: string;
  childAge: string;
  interests: string[];
  submittedAt: string;
  status: "Beklemede" | "Onaylandı" | "Reddedildi";
}

export default function AdminDashboard() {
  const { earlyAccess } = useApp();
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [filterStatus, setFilterStatus] = useState<"All" | "Beklemede" | "Onaylandı">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Populate applicants with mock data + actual context data on mount
  useEffect(() => {
    const mockApplicants: AdminApplicant[] = [
      {
        id: "app_1",
        parentName: "Zeynep Demir",
        email: "zeynep.demir@gmail.com",
        childAge: "3",
        interests: ["Güvenli ve Reklamsız İçerik", "Akıllı Ekran Süresi Kısıtlaması"],
        submittedAt: "20.05.2026",
        status: "Onaylandı",
      },
      {
        id: "app_2",
        parentName: "Murat Kaya",
        email: "murat.kaya@outlook.com",
        childAge: "5",
        interests: ["Fiziksel / Ekran Dışı Etkinlik Önerileri"],
        submittedAt: "21.05.2026",
        status: "Beklemede",
      },
      {
        id: "app_3",
        parentName: "Elif Şahin",
        email: "elif.sahin@hotmail.com",
        childAge: "4",
        interests: ["Güvenli ve Reklamsız İçerik", "Detaylı Gelişim Grafikleri ve Pedagojik Destek"],
        submittedAt: "22.05.2026",
        status: "Onaylandı",
      },
      {
        id: "app_4",
        parentName: "Can Aksoy",
        email: "can.aksoy@yahoo.com",
        childAge: "6",
        interests: ["Akıllı Ekran Süresi Kısıtlaması", "Fiziksel / Ekran Dışı Etkinlik Önerileri"],
        submittedAt: "22.05.2026",
        status: "Beklemede",
      },
    ];

    if (earlyAccess) {
      const userApplicant: AdminApplicant = {
        id: "app_user",
        parentName: earlyAccess.parentName,
        email: earlyAccess.email,
        childAge: earlyAccess.childAge,
        interests: earlyAccess.interestReasons,
        submittedAt: earlyAccess.submittedAt,
        status: "Beklemede",
      };
      setApplicants([userApplicant, ...mockApplicants]);
    } else {
      setApplicants(mockApplicants);
    }
  }, [earlyAccess]);

  const handleApprove = (id: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Onaylandı" } : app))
    );
    triggerFeedback("Kayıt onaylandı, bilgilendirme e-postası sıraya alındı.");
  };

  const handleReject = (id: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Reddedildi" } : app))
    );
    triggerFeedback("Kayıt reddedildi.");
  };

  const handleDelete = (id: string) => {
    setApplicants((prev) => prev.filter((app) => app.id !== id));
    triggerFeedback("Kullanıcı kaydı sistemden silindi.");
  };

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  // Filter & Search logic
  const filteredApplicants = applicants.filter((app) => {
    const matchesStatus = filterStatus === "All" ? true : app.status === filterStatus;
    const matchesSearch =
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Title bar */}
        <div>
          <h1 className="font-kids font-bold text-3xl text-slate-800 flex items-center gap-2">
            <span>Yönetici Paneli</span>
            <span className="text-xs bg-red-100 text-danger border border-red-200 px-2.5 py-1 rounded-full font-sans font-bold uppercase tracking-wider">
              Admin Yetkisi ⚙️
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Mini Kâşif kullanıcı kayıt listeleri, metrikleri ve sistem durum yönetimi.
          </p>
        </div>

        {feedbackMsg && (
          <div className="p-4 bg-slate-800 text-white font-semibold text-sm rounded-2xl shadow-md border border-slate-700 animate-fade-in-up">
            🔔 {feedbackMsg}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Toplam Kayıt", val: 142 + (earlyAccess ? 1 : 0), change: "+%18.2", desc: "Bu ayki yeni kayıtlar", icon: "📧", color: "border-primary-light" },
            { label: "Premium Dönüşüm", val: "%14.8", change: "+%2.4", desc: "Simüle ödeme tamamlayanlar", icon: "💎", color: "border-secondary-light" },
            { label: "Ort. Ekran Süresi", val: "18.4 Dk", change: "-%1.5", desc: "Günlük çocuk portalı kalımı", icon: "⏱️", color: "border-accent/30" },
            { label: "Aktif Kâşifler", val: "1,248", change: "+%8.6", desc: "Haftalık tekil çocuk sayısı", icon: "👶", color: "border-success-light" },
          ].map((stat, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-3xl border-2 ${stat.color} shadow-xs flex flex-col justify-between h-36`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</h4>
                  <p className="font-kids font-bold text-2xl text-slate-800 mt-1">{stat.val}</p>
                </div>
                <span className="text-3xl bg-slate-50 p-2 rounded-2xl">{stat.icon}</span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-xs font-bold text-success bg-success-light px-2 py-0.5 rounded-md">{stat.change}</span>
                <span className="text-[10px] text-slate-400 font-medium">{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mid Section: SVG Trend Chart & Quick Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Trend Chart (SVG) */}
          <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-kids font-bold text-lg text-slate-800">Aylık Kullanıcı Kayıt Trendi</h3>
                <p className="text-slate-400 text-xs mt-0.5">Ocak - Mayıs 2026 Aylık Gelişim Grafiği</p>
              </div>
              <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full">2026 Yılı</span>
            </div>

            {/* SVG graph */}
            <div className="relative">
              <svg className="w-full h-56" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#f8fafc" strokeWidth="1.5" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#f8fafc" strokeWidth="1.5" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#f8fafc" strokeWidth="1.5" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#f8fafc" strokeWidth="1.5" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="#e2e8f0" strokeWidth="2" />

                {/* Left labels */}
                <text x="15" y="24" fill="#94a3b8" fontSize="9" fontWeight="bold">150 Kayıt</text>
                <text x="15" y="64" fill="#94a3b8" fontSize="9" fontWeight="bold">100 Kayıt</text>
                <text x="15" y="104" fill="#94a3b8" fontSize="9" fontWeight="bold">50 Kayıt</text>
                <text x="25" y="174" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>

                {/* SVG Line path for trend data */}
                <path
                  d="M 60 150 L 140 130 L 220 110 L 300 70 L 380 40 L 460 30"
                  fill="none"
                  stroke="#ff6f61"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Animated Dots */}
                <circle cx="60" cy="150" r="6" fill="#white" stroke="#ff6f61" strokeWidth="3" />
                <circle cx="140" cy="130" r="6" fill="#white" stroke="#ff6f61" strokeWidth="3" />
                <circle cx="220" cy="110" r="6" fill="#white" stroke="#ff6f61" strokeWidth="3" />
                <circle cx="300" cy="70" r="6" fill="#white" stroke="#ff6f61" strokeWidth="3" />
                <circle cx="380" cy="40" r="6" fill="#white" stroke="#ff6f61" strokeWidth="3" />
                <circle cx="460" cy="30" r="6" fill="#white" stroke="#ff6f61" strokeWidth="3" />

                {/* X-Axis labels */}
                <text x="60" y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Ocak</text>
                <text x="140" y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Şubat</text>
                <text x="220" y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Mart</text>
                <text x="300" y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Nisan</text>
                <text x="380" y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">Mayıs</text>
                <text x="460" y="190" textAnchor="middle" fill="#ff6f61" fontSize="9" fontWeight="bold">Haziran</text>
              </svg>
            </div>
          </div>

          {/* Quick Tasks / Controls */}
          <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-kids font-bold text-lg text-slate-800">Yönetici Hızlı İşlemleri</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  triggerFeedback("Kullanıcı haber bülteni sıraya alındı, 143 kişiye gönderiliyor.");
                }}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center gap-3 active:scale-99 transition-all cursor-pointer border border-slate-100"
              >
                <span className="text-xl">📢</span>
                <div>
                  <h4 className="font-kids font-bold text-xs text-slate-700">Tüm Listeye E-Posta Gönder</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Kayıtlı kullanıcılara güncelleme yolla</p>
                </div>
              </button>

              <button
                onClick={() => {
                  triggerFeedback("Veritabanı yedeklemesi başarıyla tamamlandı.");
                }}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center gap-3 active:scale-99 transition-all cursor-pointer border border-slate-100"
              >
                <span className="text-xl">💾</span>
                <div>
                  <h4 className="font-kids font-bold text-xs text-slate-700">Sistem Yedeklemesi Al</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Veritabanı kopyasını kaydet</p>
                </div>
              </button>

              <button
                onClick={() => {
                  triggerFeedback("Çerezler ve sistem önbelleği temizlendi.");
                }}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center gap-3 active:scale-99 transition-all cursor-pointer border border-slate-100"
              >
                <span className="text-xl">🧹</span>
                <div>
                  <h4 className="font-kids font-bold text-xs text-slate-700">Önbelleği Temizle</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Uygulama statik verilerini sıfırla</p>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Applicants Management Section */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-kids font-bold text-xl text-slate-800">Kullanıcı Kayıt Listesi</h3>
              <p className="text-slate-400 text-xs mt-0.5">Kullanıcıların formu doldurarak sisteme kaydolduğu ebeveyn listesi.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="İsim veya E-posta ara..."
                className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-primary text-slate-700 placeholder-slate-400 w-full sm:w-48"
              />

              <div className="flex border border-slate-200 rounded-xl overflow-hidden text-xs">
                {(["All", "Beklemede", "Onaylandı"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 cursor-pointer font-semibold ${
                      filterStatus === status ? "bg-primary text-white" : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {status === "All" ? "Hepsi" : status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-4">Veli Adı Soyadı</th>
                  <th className="py-3 px-4">E-posta</th>
                  <th className="py-3 px-4">Çocuk Yaşı</th>
                  <th className="py-3 px-4">İlgi Alanları</th>
                  <th className="py-3 px-4">Kayıt Tarihi</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs italic">
                      Kayıt bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((app) => (
                    <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{app.parentName}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">{app.email}</td>
                      <td className="py-3.5 px-4 text-slate-600">{app.childAge} Yaş</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {app.interests.map((interest, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-500 text-[9px] px-1.5 py-0.5 rounded-sm font-medium">
                              {interest.slice(0, 15)}...
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{app.submittedAt}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          app.status === "Onaylandı"
                            ? "bg-success-light text-success border-success/20"
                            : app.status === "Reddedildi"
                            ? "bg-red-50 text-danger border-red-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          {app.status === "Beklemede" && (
                            <>
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="px-2 py-1 bg-success hover:bg-success/90 text-white font-bold rounded-md text-[10px] active:scale-95 transition-all cursor-pointer"
                                title="Başvuruyu Onayla"
                              >
                                Onayla
                              </button>
                              <button
                                onClick={() => handleReject(app.id)}
                                className="px-2 py-1 bg-red-50 hover:bg-red-100 text-danger font-bold rounded-md text-[10px] active:scale-95 transition-all cursor-pointer"
                                title="Başvuruyu Reddet"
                              >
                                Reddet
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-md text-[10px] active:scale-95 transition-all cursor-pointer"
                            title="Kaydı Tamamen Sil"
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
