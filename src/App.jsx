import React, { useState, useEffect } from 'react';
import RumorRadarHero from './components/RumorRadarHero';
import RumorRadarInput from './components/RumorRadarInput';
import RumorRadarResult from './components/RumorRadarResult';
import TrendingRadar from './components/TrendingRadar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { Radar, Sparkles, Activity, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('checker'); // 'checker' | 'trending' | 'paper'
  const [sampleClaims, setSampleClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    fetch('/api/sample-claims')
      .then(res => res.json())
      .then(data => setSampleClaims(data))
      .catch(err => console.error('Error fetching samples:', err));
  }, []);

  const handleVerify = async ({ claimText, imageBase64, dialectPreference }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimText, imageBase64, dialectPreference })
      });
      const data = await response.json();
      setVerificationResult(data);
    } catch (error) {
      console.error('Verification request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTrendingClaim = (claimText) => {
    setActiveTab('checker');
    handleVerify({ claimText, imageBase64: null, dialectPreference: null });
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      
      {/* Top Header Bar */}
      <header className="border-b border-[#1b2333] bg-[#0d121c]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div 
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => setActiveTab('checker')}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold">
              <Radar className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-serif text-xl font-normal text-white">
              Rumor <span className="text-amber-500">Radar</span>
            </span>
          </div>

          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('checker')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'checker' ? 'bg-[#192233] text-amber-400 border border-[#27354d]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verifier
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'trending' ? 'bg-[#192233] text-amber-400 border border-[#27354d]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Trending Radar
            </button>
            <button
              onClick={() => setActiveTab('paper')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'paper' ? 'bg-[#192233] text-amber-400 border border-[#27354d]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Paper & Metrics
            </button>
          </nav>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {activeTab === 'checker' && (
          <div className="space-y-6">
            <RumorRadarHero />

            <RumorRadarInput
              onVerify={handleVerify}
              isLoading={isLoading}
              sampleClaims={sampleClaims}
            />

            {/* Results section matching Screenshot 1 */}
            {verificationResult && (
              <RumorRadarResult result={verificationResult} />
            )}
          </div>
        )}

        {activeTab === 'trending' && (
          <TrendingRadar onSelectClaim={handleSelectTrendingClaim} />
        )}

        {activeTab === 'paper' && (
          <AnalyticsDashboard />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1b2333] py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span><b>Rumor Radar</b> &mdash; Real Time Multimodal Propagation Analysis for Code-Mixed Social Content</span>
          <span className="text-amber-500 font-medium">Telugish &bull; Hinglish &bull; Tanglish &bull; Banglish</span>
        </div>
      </footer>

    </div>
  );
}
