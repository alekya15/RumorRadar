import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, AlertTriangle, ArrowUpRight, Flame, Globe, Radio } from 'lucide-react';

export default function TrendingRadar({ onSelectClaim }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => {
        setTrending(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch trending radar:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Live Social Media Misinformation Radar Feed</span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full animate-pulse">
                Live Indic Feed
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              High-velocity viral rumors currently spreading across WhatsApp, Telegram & Indic platforms
            </p>
          </div>
        </div>
      </div>

      {/* Feed Stream */}
      <div className="space-y-3">
        {trending.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectClaim && onSelectClaim(item.claim)}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                  {item.viralityStatus}
                </span>
                <span className="text-[11px] text-slate-400">
                  Origin: <b>{item.originPlatform}</b> • {item.detectedAt}
                </span>
                <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  {item.dialect}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {item.claim}
              </h4>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Velocity</span>
                <span className="text-xs font-bold text-amber-400 font-mono">{item.sharesPerMin}</span>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-slate-900 group-hover:bg-cyan-500/20 text-xs text-cyan-400 font-bold border border-slate-800 group-hover:border-cyan-500/30 transition-all flex items-center space-x-1">
                <span>Analyze</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
