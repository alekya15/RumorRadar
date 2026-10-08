import React, { useState } from 'react';
import { Share2, ExternalLink, Network, Eye, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import PropagationGraph from './PropagationGraph';
import MultimodalOCRViewer from './MultimodalOCRViewer';

export default function RumorRadarResult({ result }) {
  const [copied, setCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  if (!result) return null;

  const {
    verdictTitle = 'False',
    confidenceText = '99% confidence',
    verdictSummary,
    allClaimsDetected = [],
    mainClaimChecked,
    codeMixedLabel,
    sampleForwardText,
    userClaim,
    evidence,
    counterNarrative,
    multimodalForensics,
    propagationMetrics,
    detectedDialect
  } = result;

  // Color schemes matching screenshot 1
  const isFalse = verdictTitle.toLowerCase().includes('false');
  const isTrue = verdictTitle.toLowerCase().includes('true');
  const isMisleading = verdictTitle.toLowerCase().includes('misleading');

  let bannerBg = 'bg-[#201013] border-[#3f191d]';
  let bannerText = 'text-[#fca5a5]';
  let bannerSubtext = 'text-[#f87171]/90';

  if (isTrue) {
    bannerBg = 'bg-[#0d221c] border-[#164338]';
    bannerText = 'text-[#6ee7b7]';
    bannerSubtext = 'text-[#34d399]/90';
  } else if (isMisleading) {
    bannerBg = 'bg-[#241c0e] border-[#443319]';
    bannerText = 'text-[#fde047]';
    bannerSubtext = 'text-[#facc15]/90';
  }

  const copyRefutation = () => {
    navigator.clipboard.writeText(`RUMOR RADAR VERDICT: ${verdictTitle.toUpperCase()} (${confidenceText})
Main Claim: "${mainClaimChecked || userClaim}"
Evidence: ${evidence?.sourceTitle} (${evidence?.officialURL || ''})
Refutation: ${counterNarrative}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-5 animate-fadeIn pt-2">
      
      {/* 1. Top Verdict Banner Card (Screenshot 1 Top Box) */}
      <div className={`p-6 sm:p-7 rounded-2xl border ${bannerBg} shadow-2xl space-y-3`}>
        <div className="flex items-baseline justify-between">
          <h2 className={`text-4xl sm:text-5xl font-serif font-normal ${bannerText} tracking-tight`}>
            {verdictTitle}
          </h2>
          <span className="text-slate-400 font-sans text-sm sm:text-base font-normal">
            {confidenceText}
          </span>
        </div>
        <p className={`text-sm sm:text-base font-sans leading-relaxed ${bannerSubtext}`}>
          {verdictSummary}
        </p>
      </div>

      {/* 2. ALL CLAIMS DETECTED Card (Screenshot 1 Card 2) */}
      <div className="bg-[#121826] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
        <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
          ALL CLAIMS DETECTED
        </span>
        <div className="space-y-2 text-slate-300 text-sm font-sans leading-relaxed">
          {allClaimsDetected.map((claim, idx) => (
            <p key={idx} className="flex items-start space-x-2">
              <span className="text-slate-500 font-bold font-mono">&middot;</span>
              <span>{claim}</span>
            </p>
          ))}
        </div>
      </div>

      {/* 3. Side-by-Side Grid Cards (Screenshot 1 Card 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left: MAIN CLAIM CHECKED */}
        <div className="bg-[#121826] border border-[#1e293b] rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
            MAIN CLAIM CHECKED
          </span>
          <p className="text-slate-100 text-sm font-medium leading-relaxed">
            {mainClaimChecked || userClaim}
          </p>
        </div>

        {/* Right: CODE-MIXED LANGUAGE BADGE & ORIGINAL TEXT */}
        <div className="bg-[#121826] border border-[#1e293b] rounded-2xl p-5 shadow-xl space-y-2">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
            {codeMixedLabel || `${detectedDialect?.name?.toUpperCase()}: CODE-MIXED SOCIAL POST.`}
          </span>
          <p className="text-slate-300 text-sm italic font-sans leading-relaxed">
            "{sampleForwardText || userClaim}"
          </p>
        </div>

      </div>

      {/* 4. EVIDENCE Card (Screenshot 1 Card 4) */}
      <div className="bg-[#121826] border border-[#1e293b] rounded-2xl p-6 shadow-xl space-y-4">
        
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 tracking-wider uppercase">
          <span className="font-serif italic text-base text-slate-300 font-bold">&bdquo;&ldquo;</span>
          <span>EVIDENCE</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-white mb-1">
            {evidence?.sourceTitle}
          </h3>
          <span className="text-xs font-black tracking-wider uppercase text-amber-500 block mb-3">
            {evidence?.verdictTag || 'CONTRADICTS THE POST'}
          </span>

          {/* Left Orange Accent Bar Bullet Points */}
          <div className="border-l-2 border-amber-500/80 pl-4 space-y-2.5">
            {evidence?.bulletPoints?.map((bp, idx) => (
              <p key={idx} className="text-slate-300 text-sm leading-relaxed">
                {bp}
              </p>
            ))}
          </div>

          {evidence?.officialURL && (
            <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs">
              <span className="text-slate-500">Source Document Notice: <b>{evidence.officialNoticeId}</b></span>
              <a
                href={evidence.officialURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center space-x-1 underline"
              >
                <span>Verify Official Notice</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

      </div>

      {/* 5. Evidence-Backed Counter Narrative (WhatsApp / Social Ready) */}
      <div className="bg-[#121826] border border-[#1e293b] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            CULTURALLY GROUNDED REFUTATION ({detectedDialect?.name || 'Code-Mixed Source'})
          </span>
          <button
            onClick={copyRefutation}
            className="px-3 py-1 rounded-full bg-[#1a2333] hover:bg-[#243047] text-amber-400 border border-[#28354d] text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Refutation'}</span>
          </button>
        </div>

        <div className="bg-[#192233] p-4 rounded-xl border border-[#27354d] text-amber-200 text-sm font-sans leading-relaxed">
          "{counterNarrative}"
        </div>
      </div>

      {/* 6. Collapsible Deep Technical Analysis (GNN Virality & Multimodal OCR) */}
      <div className="pt-2">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full py-3 px-4 rounded-2xl bg-[#121826] hover:bg-[#182133] border border-[#1e293b] text-slate-300 text-xs font-semibold flex items-center justify-between transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Network className="w-4 h-4 text-amber-500" />
            <span>Inspect GNN Diffusion Graph & Visual OCR Forensics</span>
          </div>
          {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showTechnicalDetails && (
          <div className="space-y-4 pt-4 animate-fadeIn">
            <PropagationGraph graphData={propagationMetrics} />
            <MultimodalOCRViewer forensics={multimodalForensics} userClaim={userClaim} />
          </div>
        )}
      </div>

    </div>
  );
}
