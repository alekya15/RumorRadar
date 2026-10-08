import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, HelpCircle, ExternalLink, 
  CheckCircle, ArrowUpRight, Share2, Award, Network, Eye, Sparkles, MessageSquareQuote
} from 'lucide-react';

export default function VerificationResult({ result, onViewGraph, onViewForensics }) {
  const [copied, setCopied] = useState(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(false);

  if (!result) return null;

  const {
    verdict,
    verdictLabel,
    confidenceScore,
    userClaim,
    detectedDialect,
    normalizedSummary,
    officialProof,
    counterNarrative,
    multimodalForensics,
    propagationMetrics,
    featureAttribution,
    verificationId,
    timestamp
  } = result;

  // Verdict style mapping
  const getVerdictBadge = () => {
    switch (verdict) {
      case 'FALSE':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          glow: 'glow-rose',
          icon: ShieldAlert,
          title: 'DEBUNKED / FALSE INFORMATION',
          colorClass: 'text-rose-400'
        };
      case 'PARTIALLY_FALSE':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          glow: 'glow-amber',
          icon: AlertTriangle,
          title: 'MISLEADING / OUT OF CONTEXT',
          colorClass: 'text-amber-400'
        };
      case 'VERIFIED_TRUE':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          glow: 'glow-emerald',
          icon: ShieldCheck,
          title: 'VERIFIED TRUE INFORMATION',
          colorClass: 'text-emerald-400'
        };
      default:
        return {
          bg: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
          glow: 'glow-cyan',
          icon: HelpCircle,
          title: 'UNVERIFIED / SUSPICIOUS RUMOR',
          colorClass: 'text-sky-400'
        };
    }
  };

  const badgeStyle = getVerdictBadge();
  const IconComponent = badgeStyle.icon;

  const copyRefutation = () => {
    navigator.clipboard.writeText(`RUMOR RADAR FACT CHECK:
Claim: "${userClaim}"
Verdict: ${verdictLabel}
Official Proof: ${officialProof.sourceName} (${officialProof.officialURL})
Refutation (${detectedDialect?.name || 'Code-Mixed'}): ${counterNarrative}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Main Verdict Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${badgeStyle.bg} backdrop-blur-md relative overflow-hidden shadow-xl`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-2xl ${badgeStyle.bg} border border-current shadow-lg shrink-0`}>
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeStyle.bg}`}>
                  {verdictLabel}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ID: {verificationId} • {new Date(timestamp).toLocaleTimeString()}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {officialProof?.summary ? officialProof.summary.split('.')[0] : normalizedSummary}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Detected Script/Dialect: <b className="text-cyan-400">{detectedDialect?.name}</b>
              </p>
            </div>
          </div>

          {/* Confidence Score Dial */}
          <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800 shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wide">Confidence Score</span>
              <span className={`text-xl font-black font-mono ${badgeStyle.colorClass}`}>
                {(confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-cyan-400 flex items-center justify-center font-bold text-xs text-cyan-300 font-mono">
              {(confidenceScore * 100).toFixed(0)}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Official Proof & Source Justification Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Official Proof & Source Justification</span>
          </h4>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{officialProof?.governmentPortalSeal || 'Verified Government Source'}</span>
          </span>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wide">
                {officialProof?.sourceName}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Notice Ref: <b>{officialProof?.officialNoticeId}</b> | Issued: {officialProof?.publishedDate}
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {officialProof?.summary}
            </p>
            {officialProof?.officialURL && (
              <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-500">Official Direct Verification Portal Link:</span>
                <a
                  href={officialProof.officialURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                >
                  <span>Open Govt Notice ({officialProof.officialNoticeId})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Explainable Dialect Counter-Narrative (Telugish / Hinglish / Tanglish) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <MessageSquareQuote className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              Evidence-Backed Counter-Narrative ({detectedDialect?.name || 'Code-Mixed Source Dialect'})
            </h4>
          </div>
          <button
            onClick={copyRefutation}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold border border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copied ? 'Copied Refutation!' : 'Copy to Share'}</span>
          </button>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 p-4 sm:p-5 rounded-xl text-slate-100 font-medium text-sm sm:text-base leading-relaxed relative">
          <p className="font-sans text-amber-100">
            "{counterNarrative}"
          </p>
          <div className="mt-3 pt-3 border-t border-amber-500/10 flex items-center justify-between text-xs text-slate-400">
            <span>Culturally grounded refutation optimized for WhatsApp/Telegram forwards</span>
            <span className="text-amber-400 font-semibold">Ready to Copy & Forward</span>
          </div>
        </div>
      </div>

      {/* 4. Deep Analytical Features & Quick Action Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Graph Diffusion Action Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Network className="w-4 h-4" />
                <span>GNN Propagation Cascade</span>
              </span>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                {propagationMetrics?.graphSummary?.riskLevel}
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Retweet velocity: <b>{propagationMetrics?.graphSummary?.viralityVelocity}</b>. Bot cluster involvement: <b>{propagationMetrics?.graphSummary?.botInvolvementRatio}</b>.
            </p>
          </div>
          <button
            onClick={onViewGraph}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-colors"
          >
            <Network className="w-4 h-4" />
            <span>Interactive Network Diffusion Graph</span>
          </button>
        </div>

        {/* Visual OCR Forensics Action Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Eye className="w-4 h-4" />
                <span>Visual Transformer OCR Alignment</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Cross-Match: {(multimodalForensics?.crossModalMatchScore * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              OCR text extracted from meme overlay vs. post caption alignment. Forensic ELA: <b>{multimodalForensics?.forensicDetails?.elaAnalysis}</b>.
            </p>
          </div>
          <button
            onClick={onViewForensics}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Inspect OCR Text & ELA Details</span>
          </button>
        </div>

      </div>

      {/* 5. Feature Attribution Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Explainable AI Model Feature Attributions</span>
        </h4>
        <div className="space-y-3">
          {featureAttribution && featureAttribution.map((attr, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-200">{attr.feature}</span>
                <span className="font-mono text-cyan-400 font-bold">Weight: {(attr.score * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" style={{ width: `${attr.score * 100}%` }}></div>
              </div>
              <p className="text-[11px] text-slate-400">{attr.detail}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
