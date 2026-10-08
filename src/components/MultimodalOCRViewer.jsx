import React from 'react';
import { Eye, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function MultimodalOCRViewer({ forensics, userClaim }) {
  const data = forensics || {
    hasImage: true,
    ocrText: 'FREE LAPTOP SCHEME 2026 - Click link to register immediate!',
    crossModalMatchScore: 0.42,
    manipulationScore: 0.78,
    visualInconsistencyAlert: 'WARNING: Visual Text Overlay shows mismatched fonts, unnatural compression artifacts, or edited seal signatures typical of manipulated graphics.',
    forensicDetails: {
      elaAnalysis: 'High Error Level Analysis (ELA) variance detected on text box borders',
      metadataIntact: false,
      fontAuthenticity: 'Inconsistent font family & pixel kerning on official logo',
      textOverlayMismatch: true
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-400" />
            <span>Visual Transformer & Multimodal OCR Forensics</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Extracts embedded meme text overlays & cross-verifies against caption context
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold">
          OCR Visual Alignment Pipeline
        </span>
      </div>

      {/* Main Forensic Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Caption Text Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Surrounding Social Post Caption</span>
          </span>
          <p className="text-sm text-slate-200 font-sans leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
            "{userClaim || 'Ee scheme lo government Rs 5000 and free laptop direct bank account lo vesthundha? WhatsApp lo link viral aavthundhi...'}"
          </p>
        </div>

        {/* OCR Image Text Overlay Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>Extracted Meme/Image Text Overlay (OCR)</span>
          </span>
          <p className="text-sm text-purple-200 font-mono leading-relaxed bg-purple-950/40 p-3 rounded-lg border border-purple-900/60">
            "{data.ocrText}"
          </p>
        </div>

      </div>

      {/* Inconsistency Warning Alert */}
      {data.visualInconsistencyAlert && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block uppercase tracking-wide">Image Forensic Inconsistency Alert</span>
            <p className="mt-0.5 leading-relaxed">{data.visualInconsistencyAlert}</p>
          </div>
        </div>
      )}

      {/* Technical Forensic Attributes */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Image Forensic Diagnostic Metrics</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">Error Level Analysis (ELA)</span>
            <span className="font-semibold text-slate-200">{data.forensicDetails?.elaAnalysis}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">Typography & Seal Authenticity</span>
            <span className="font-semibold text-rose-400">{data.forensicDetails?.fontAuthenticity}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">Cross-Modal Alignment Score</span>
            <span className="font-bold font-mono text-cyan-400">{(data.crossModalMatchScore * 100).toFixed(0)}% Match</span>
          </div>
        </div>
      </div>

    </div>
  );
}
