import React from 'react';
import { Sparkles, Network, FileCheck2, Cpu, ArrowRight } from 'lucide-react';

export default function HeroSection({ onStartClick }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Paper Pill Header */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Multimodal Propagation Analysis for Code-Mixed Indic Social Content</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Verify Social Media Claims in <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
            Telugish, Hinglish & Code-Mixed Indic Dialects
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
          Combat high-velocity digital misinformation with <b>Rumor Radar</b>. Upload photos or type queries in fluid code-mixed scripts to extract official government proof, analyze manipulated image banners, and track GNN retweet virality before saturation.
        </p>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-5xl mx-auto mb-8">
          
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">1. Code-Mixed Multimodal Alignment</h3>
            <p className="text-xs text-slate-400">
              Combines multilingual text embeddings with OCR visual transformers to detect contradictions between meme overlays and post captions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">2. Graph Propagation & Virality</h3>
            <p className="text-xs text-slate-400">
              Integrates Graph Neural Networks (GNNs) with retweet metrics to forecast early-stage virality risk and bot cluster amplification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">3. Official Proof & Dialect Refutation</h3>
            <p className="text-xs text-slate-400">
              Generates evidence-backed refutations with official portal links (PIB, RBI, NTA) in the user's source code-mixed dialect (Telugish/Hinglish).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
