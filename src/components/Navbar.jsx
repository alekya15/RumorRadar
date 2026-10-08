import React from 'react';
import { Radar, ShieldCheck, Activity, Eye, Layers, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'checker', label: 'Multimodal Verifier', icon: ShieldCheck },
    { id: 'radar', label: 'Live Virality Radar', icon: Activity },
    { id: 'forensics', label: 'Visual OCR Forensics', icon: Eye },
    { id: 'paper', label: 'Architecture & Paper', icon: Layers }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('checker')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <Radar className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200">
                RUMOR RADAR
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                Indic AI Multimodal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Code-Mixed Misinformation Detection & Real-Time Virality Analysis
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dialect Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Supports <b>Telugish</b>, <b>Hinglish</b>, <b>Tanglish</b></span>
        </div>

      </div>
    </header>
  );
}
