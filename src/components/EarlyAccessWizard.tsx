"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export const EarlyAccessWizard: React.FC = () => {
  const { earlyAccess, submitEarlyAccess } = useApp();
  const [step, setStep] = useState(1);
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [childAge, setChildAge] = useState("4");
  const [interestReasons, setInterestReasons] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const reasonsOptions = [
    "Ekran süresini kontrol etmek",
    "Eğitici ve pedagojik oyunlar",
    "Reklamsız ve güvenli bir alan",
    "Haftalık gelişim raporlarını izlemek",
    "Ekran dışı ev içi fiziksel görevler",
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (step === 1) {
      if (!parentName.trim() || !email.trim()) {
        setErrorMsg("Lütfen tüm alanları doldurun.");
        return;
      }
      if (!email.includes("@")) {
        setErrorMsg("Geçerli bir e-posta adresi girin.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleCheckboxChange = (reason: string) => {
    setInterestReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interestReasons.length === 0) {
      setErrorMsg("Lütfen en az bir neden seçin.");
      return;
    }

    submitEarlyAccess({
      parentName,
      email,
      childAge,
      interestReasons,
    });
    setStep(4);
  };

  // If already applied, show confirmation view
  if (earlyAccess) {
    return (
      <div className="bg-white border-4 border-success-light rounded-3xl p-8 shadow-xl text-center max-w-md mx-auto">
        <span className="text-5xl my-4 inline-block animate-bounce-logo">🎉</span>
        <h3 className="font-kids text-2xl font-bold text-success mb-2">
          Başvurunuz Alındı!
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          Sevgili <strong>{earlyAccess.parentName}</strong>, Mini Kâşif lansman listesine katıldığınız için teşekkür ederiz.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs text-slate-500 mb-6 space-y-2 border border-slate-100">
          <p>📍 <strong>E-posta:</strong> {earlyAccess.email}</p>
          <p>👶 <strong>Çocuk Yaşı:</strong> {earlyAccess.childAge} Yaş</p>
          <p>📅 <strong>Tarih:</strong> {earlyAccess.submittedAt}</p>
          <p>🎯 <strong>Seçilen Odak Alanları:</strong> {earlyAccess.interestReasons.join(", ")}</p>
        </div>
        <div className="text-xs text-slate-400">
          Lansman indirim kodunuz ve davetiyeniz bu e-posta adresine gönderilecektir.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-primary-light rounded-3xl p-6 sm:p-8 shadow-xl max-w-md mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-kids font-bold text-xl text-slate-800">
          Erken Erişim Başvurusu
        </h3>
        <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
          Adım {step} / 3
        </span>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-danger border border-red-200 text-xs font-bold rounded-xl p-3 mb-4 text-center">
          {errorMsg}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-4">
          <p className="text-xs text-slate-500">
            Lansman öncesi sınırlı kontenjana katılmak ve özel indirim fırsatlarından yararlanmak için bilgilerinizi girin.
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ebeveyn Adı Soyadı
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Örn: Ahmet Yılmaz"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl font-kids text-sm focus:border-primary focus:outline-hidden"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              E-posta Adresiniz
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Örn: ebeveyn@mail.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl font-kids text-sm focus:border-primary focus:outline-hidden"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-kids font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
          >
            Devam Et 🚀
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNext} className="space-y-5">
          <p className="text-xs text-slate-500">
            Çocuğunuzun yaş grubuna göre eğitici oyun ve macera zorluk seviyeleri özel olarak ayarlanacaktır.
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Çocuğunuz Kaç Yaşında?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["3", "4", "5", "6"].map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setChildAge(age)}
                  className={`py-3 rounded-xl font-kids font-bold text-lg border-2 transition-all cursor-pointer ${
                    childAge === age
                      ? "border-primary bg-primary-light text-primary"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-kids font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              Geri
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 bg-primary text-white font-kids font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
            >
              Devam Et 🚀
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-slate-500">
            Platformu en çok hangi özellik için kullanmak istersiniz? (Birden fazla seçebilirsiniz)
          </p>
          <div className="space-y-2">
            {reasonsOptions.map((reason) => (
              <label
                key={reason}
                className="flex items-start gap-3 p-3 border-2 border-slate-100 hover:border-slate-200 rounded-xl cursor-pointer text-xs font-medium text-slate-700 select-none"
              >
                <input
                  type="checkbox"
                  checked={interestReasons.includes(reason)}
                  onChange={() => handleCheckboxChange(reason)}
                  className="mt-0.5 accent-primary h-4 w-4 rounded-sm"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-kids font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              Geri
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 bg-success hover:bg-success/95 text-white font-kids font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
            >
              Başvuruyu Gönder 🏆
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
