import React, { useState, useRef } from 'react';
import { Search, Image as ImageIcon, X, Check, Globe } from 'lucide-react';

export default function RumorRadarInput({ onVerify, isLoading, sampleClaims }) {
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
    if (e) e.preventDefault();
    if (!claimText.trim() && !imagePreview) return;

    onVerify({
      claimText,
      imageBase64: imagePreview,
      dialectPreference: selectedDialect === 'auto' ? null : selectedDialect
    });
  };

  const loadExample = (num) => {
    if (num === 1) {
      setClaimText('Drinking hot water every morning kills coronavirus 100%; even doctors have agreed 🥳 Bhai ye sach hai kya?');
      setSelectedDialect('hinglish');
      removeImage();
    } else if (num === 2) {
      setClaimText('Ee scheme lo government Rs 5000 and free laptop direct bank account lo vesthundha? WhatsApp lo link viral aavthundhi, nijamena ra babu?');
      setSelectedDialect('telugish');
      setImagePreview(`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-size="22" font-family="sans-serif" font-weight="bold">PIB FREE LAPTOP REGISTRATION BANNER</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14" font-family="sans-serif">WhatsApp Forward Graphic • Rumor Radar Analysis</text></svg>`);
    } else if (num === 3) {
      setClaimText('Intha RBI & Board exam circular unmaiya illa fake ah? Online Telegram channel la viral aagudhu, exam postpone aacha?');
      setSelectedDialect('tanglish');
      removeImage();
    }
  };

  return (
    <div className="bg-[#121826] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
      
      {/* Input Area */}
      <div className="relative">
        <textarea
          value={claimText}
          onChange={(e) => setClaimText(e.target.value)}
          placeholder="Paste the post here... e.g. 'Bhai ye sach hai kya? Sarkar ne bola...'"
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 border-none outline-none focus:outline-none focus:ring-0 resize-none min-h-[110px] text-sm sm:text-base font-sans leading-relaxed"
        />
        {claimText && (
          <button
            type="button"
            onClick={() => setClaimText('')}
            className="absolute top-1 right-1 text-slate-500 hover:text-slate-300 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Image Uploaded Preview if any */}
      {imagePreview && (
        <div className="flex items-center justify-between bg-[#192233] border border-[#27354d] p-2.5 rounded-xl">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img src={imagePreview} alt="Uploaded rumor" className="w-12 h-12 object-cover rounded-lg border border-slate-700" />
            <div className="truncate">
              <span className="text-xs font-semibold text-amber-400 block">Photo attached for OCR analysis</span>
              <span className="text-xs text-slate-400 truncate block">{imageFile ? imageFile.name : 'Sample Rumor Graphic'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10"
          >
            Remove
          </button>
        </div>
      )}

      {/* Middle Row: Photo Upload Button & Format Label */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-full bg-[#1a2333] hover:bg-[#243047] text-slate-200 border border-[#28354d] text-xs font-medium flex items-center space-x-2 transition-all cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5 text-slate-300" />
          <span>Upload photo</span>
        </button>
        <span className="text-xs text-slate-500 font-sans">
          JPG, PNG, WebP &middot; up to 5 MB
        </span>

        {/* Optional Dialect Select Pill */}
        <div className="ml-auto flex items-center space-x-1 text-xs text-slate-400">
          <Globe className="w-3.5 h-3.5 text-amber-500" />
          <select
            value={selectedDialect}
            onChange={(e) => setSelectedDialect(e.target.value)}
            className="bg-transparent text-slate-300 font-medium focus:outline-none cursor-pointer"
          >
            <option value="auto" className="bg-[#121826] text-slate-200">Auto-detect dialect</option>
            <option value="hinglish" className="bg-[#121826] text-slate-200">Hinglish</option>
            <option value="telugish" className="bg-[#121826] text-slate-200">Telugish</option>
            <option value="tanglish" className="bg-[#121826] text-slate-200">Tanglish</option>
            <option value="banglish" className="bg-[#121826] text-slate-200">Banglish</option>
            <option value="english" className="bg-[#121826] text-slate-200">English</option>
          </select>
        </div>
      </div>

      <div className="border-t border-[#1e293b] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left Side Example Buttons */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => loadExample(1)}
            className="px-3.5 py-1.5 rounded-full bg-[#1a2333] hover:bg-[#243047] text-slate-300 text-xs font-medium border border-[#28354d] transition-colors shrink-0"
          >
            Example 1
          </button>
          <button
            type="button"
            onClick={() => loadExample(2)}
            className="px-3.5 py-1.5 rounded-full bg-[#1a2333] hover:bg-[#243047] text-slate-300 text-xs font-medium border border-[#28354d] transition-colors shrink-0"
          >
            Example 2
          </button>
          <button
            type="button"
            onClick={() => loadExample(3)}
            className="px-3.5 py-1.5 rounded-full bg-[#1a2333] hover:bg-[#243047] text-slate-300 text-xs font-medium border border-[#28354d] transition-colors shrink-0"
          >
            Example 3
          </button>
        </div>

        {/* Right Side Primary Action Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || (!claimText.trim() && !imagePreview)}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 shadow-lg transition-all ${
            isLoading || (!claimText.trim() && !imagePreview)
              ? 'bg-[#1a2333] text-slate-500 cursor-not-allowed border border-[#28354d]'
              : 'bg-[#b45309] hover:bg-[#d97706] text-white active:scale-95 shadow-amber-900/30'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{isLoading ? 'Fact-checking...' : 'Fact-check'}</span>
        </button>

      </div>

    </div>
  );
}
