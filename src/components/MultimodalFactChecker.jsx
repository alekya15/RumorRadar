import React, { useState, useRef } from 'react';
import { 
  Upload, Image as ImageIcon, Sparkles, Send, RefreshCw, X, AlertCircle, 
  HelpCircle, Globe, CheckCircle2, FileText, ArrowRight 
} from 'lucide-react';

export default function MultimodalFactChecker({ onVerify, isLoading, sampleClaims }) {
  const [claimText, setClaimText] = useState('');
  const [selectedDialect, setSelectedDialect] = useState('auto');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimText.trim() && !imagePreview) return;

    onVerify({
      claimText,
      imageBase64: imagePreview,
      dialectPreference: selectedDialect === 'auto' ? null : selectedDialect
    });
  };

  const loadSample = (sample) => {
    setClaimText(sample.rawText);
    setSelectedDialect(sample.dialect.toLowerCase().includes('telugish') ? 'telugish' : sample.dialect.toLowerCase());
    
    // Create visual synthetic placeholder preview if sample has image
    if (sample.hasImage) {
      // Mock visual banner image for sample
      setImagePreview(`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" fill="%2338bdf8" font-size="22" font-family="sans-serif" font-weight="bold">${encodeURIComponent(sample.sampleImageLabel)}</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14" font-family="sans-serif">WhatsApp Viral Graphic • Rumor Radar Analysis</text></svg>`);
    } else {
      removeImage();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8">
      
      {/* Header & Dialect Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Multimodal Fact Verification Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ask in <b>Telugish</b>, <b>Hinglish</b>, <b>Tanglish</b> or standard English. Upload memes or photos for visual OCR cross-verification.
          </p>
        </div>

        {/* Dialect Selector */}
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400 font-medium">Dialect:</span>
          <select
            value={selectedDialect}
            onChange={(e) => setSelectedDialect(e.target.value)}
            className="bg-transparent text-cyan-300 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="auto" className="bg-slate-900 text-white">Auto-Detect Dialect</option>
            <option value="telugish" className="bg-slate-900 text-white">Telugish (Telugu + Eng)</option>
            <option value="hinglish" className="bg-slate-900 text-white">Hinglish (Hindi + Eng)</option>
            <option value="tanglish" className="bg-slate-900 text-white">Tanglish (Tamil + Eng)</option>
            <option value="banglish" className="bg-slate-900 text-white">Banglish (Bengali + Eng)</option>
            <option value="english" className="bg-slate-900 text-white">Standard English</option>
          </select>
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Text Area */}
        <div className="relative">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            placeholder="Type or paste the social media rumor here (e.g. 'Ee scheme lo government Rs 5000 direct bank account lo vesthundha? Nijamena ra babu?' or 'Kya PIB ne notice issue kiya hai ki free laptop milega?')..."
            className="w-full h-32 bg-slate-950 text-slate-100 placeholder-slate-500 rounded-xl p-4 text-sm border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all resize-none font-sans"
          />
          {claimText && (
            <button
              type="button"
              onClick={() => setClaimText('')}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Image Upload Drag-Drop / Preview */}
        <div>
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-2 flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <img src={imagePreview} alt="Uploaded rumor meme" className="w-16 h-16 object-cover rounded-lg border border-slate-800" />
                <div className="truncate">
                  <span className="text-xs font-semibold text-cyan-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Photo Ready for OCR & ELA Forensics</span>
                  </span>
                  <p className="text-xs text-slate-400 truncate">
                    {imageFile ? imageFile.name : 'Sample Rumor Graphic Image'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="px-2.5 py-1.5 text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg font-medium transition-colors"
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 text-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center justify-center space-x-2 text-slate-400 group-hover:text-cyan-400 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-xs font-semibold">Upload Meme, News Thumbnail or Post Photo to Verify Text Overlay</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Supports PNG, JPG, WEBP (Extracts embedded text via OCR visual transformer)</p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          
          {/* Quick Preset Samples */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-400 flex items-center space-x-1 mr-1">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Try Presets:</span>
            </span>
            {sampleClaims && sampleClaims.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSample(sample)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                {sample.dialect}: {sample.title}
              </button>
            ))}
          </div>

          {/* Submit Verification Button */}
          <button
            type="submit"
            disabled={isLoading || (!claimText.trim() && !imagePreview)}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all ${
              isLoading || (!claimText.trim() && !imagePreview)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/25 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-200" />
                <span>Analyzing Multimodal Radar...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Verify Claim with Rumor Radar</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}
