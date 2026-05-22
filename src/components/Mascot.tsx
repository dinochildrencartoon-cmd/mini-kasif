"use client";

import React from "react";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  isSleeping?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({ size = "md", isSleeping = false }) => {
  const sizeClasses = {
    sm: "w-40 h-40",
    md: "w-64 h-64",
    lg: "w-80 h-80",
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${sizeClasses[size]}`}>
      {/* Floating Mascot Body Wrapper */}
      <div
        className={`w-full h-full bg-gradient-to-br from-accent to-kids-orange relative flex flex-col justify-center items-center shadow-2xl transition-all duration-500 select-none
          ${isSleeping ? "opacity-90 scale-95" : "animate-float-mascot animate-morph-mascot"}
        `}
        style={{
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        }}
      >
        {/* Face */}
        <div className="w-[80%] h-[60%] relative flex flex-col justify-center">
          {isSleeping ? (
            /* Sleeping Face */
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <span className="text-5xl animate-pulse">😴</span>
            </div>
          ) : (
            /* Happy Awake Face */
            <>
              {/* Eyes */}
              <div className="flex justify-around w-[70%] mx-auto mb-2">
                {/* Left Eye */}
                <div className="w-8 h-8 bg-slate-800 rounded-full relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1.5 left-1.5 animate-look-around" />
                </div>
                {/* Right Eye */}
                <div className="w-8 h-8 bg-slate-800 rounded-full relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1.5 left-1.5 animate-look-around" />
                </div>
              </div>

              {/* Cheeks */}
              <div className="flex justify-between w-[85%] mx-auto absolute top-12 left-[7.5%]">
                <div className="w-5 h-2.5 bg-rose-500/30 rounded-full" />
                <div className="w-5 h-2.5 bg-rose-500/30 rounded-full" />
              </div>

              {/* Smile */}
              <div className="w-12 h-6 border-b-4 border-x-4 border-slate-800 rounded-b-full bg-white mx-auto mt-2" />
            </>
          )}
        </div>

        {/* Mascot Hands */}
        {!isSleeping && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Left Hand */}
            <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-3xl animate-wave-left origin-right">
              👋
            </div>
            {/* Right Hand */}
            <div className="absolute -right-5 top-[40%] -translate-y-1/2 text-3xl animate-float-sparkle">
              ✨
            </div>
          </div>
        )}
      </div>

      {/* Sleeping Zzz letters */}
      {isSleeping && (
        <div className="absolute top-0 right-4 font-kids font-bold text-slate-500 select-none">
          <span className="absolute -top-6 right-8 text-3xl animate-bounce-logo duration-1000">Z</span>
          <span className="absolute -top-2 right-4 text-xl animate-bounce-logo duration-700">z</span>
          <span className="absolute top-2 right-1 text-sm animate-bounce-logo duration-500">z</span>
        </div>
      )}

      {/* Mascot Shadow */}
      <div
        className={`w-[70%] h-4 bg-slate-900/10 rounded-full mt-8 blur-[2px] transition-all duration-500
          ${isSleeping ? "scale-90 opacity-70" : "animate-shadow-scale"}
        `}
      />
    </div>
  );
};
