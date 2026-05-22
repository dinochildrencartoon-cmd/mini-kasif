"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/app/categories");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <span className="text-5xl animate-bounce-logo inline-block">🚀</span>
        <h2 className="font-kids font-bold text-xl text-kids-purple">
          Mini Kâşif Yükleniyor...
        </h2>
      </div>
    </div>
  );
}
