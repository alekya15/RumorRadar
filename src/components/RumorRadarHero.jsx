import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function RumorRadarHero() {
  return (
    <div className="text-left space-y-4 max-w-4xl pt-4 pb-2">
      
      {/* Top Pill Tag */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121927] border border-[#1e293b] text-slate-400 text-xs font-semibold tracking-wider uppercase">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
        <span>CLAIM &rarr; EVIDENCE &rarr; VERDICT</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-serif tracking-tight leading-tight">
        <span className="text-white">Rumor </span>
        <span className="text-amber-500 font-serif">Radar</span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
        Fact-check Indian social posts and photos, with verdicts, reasoning, and named sources.
      </p>

    </div>
  );
}
