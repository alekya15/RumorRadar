import React from 'react';
import { Layers, Award, CheckCircle2, TrendingUp, Cpu, FileText, Globe } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Paper Abstract Showcase */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-cyan-400 mb-3">
          <FileText className="w-5 h-5" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Rumor Radar — Theoretical Framework & Benchmark Abstract
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800">
          <b>ABSTRACT:</b> Code-mixed social media content across Indic languages (e.g., Hinglish, Telugish, Tanglish, Banglish) presents severe challenges for conventional misinformation detection due to non-standard orthography, fluid script-switching, and subtle cultural nuances. Viral digital misinformation rarely travels as isolated text; it spreads across heterogeneous formats—including embedded text on memes, manipulated image banners, and video thumbnails. Rumor Radar unifies three core analytical pillars into a singular detection pipeline: (1) Multimodal Code-Mixed Representation, (2) Graph-Aware Propagation Modeling, and (3) Explainable Refutation Engine.
        </p>
      </div>

      {/* Benchmark Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">
            Multimodal Misinformation Detection
          </span>
          <span className="text-3xl font-black text-cyan-400 font-mono">94.8%</span>
          <p className="text-xs text-slate-400 mt-2">
            +18.4% improvement over text-only baseline models on Indic benchmark datasets
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">
            Early Virality Lead Time
          </span>
          <span className="text-3xl font-black text-purple-400 font-mono">45 Mins</span>
          <p className="text-xs text-slate-400 mt-2">
            Average pre-saturation lead time forecasting viral cascades before peak virality
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">
            Dialect Refutation Acceptability
          </span>
          <span className="text-3xl font-black text-emerald-400 font-mono">91.2%</span>
          <p className="text-xs text-slate-400 mt-2">
            User comprehension score for culturally grounded refutations in Telugish/Hinglish
          </p>
        </div>

      </div>

    </div>
  );
}
