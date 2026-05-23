"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ColorsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/app/category/colors");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <span className="text-xl font-kids font-bold text-slate-400 animate-pulse">
        Yönlendiriliyorsunuz... 🚀
      </span>
    </div>
  );
}
