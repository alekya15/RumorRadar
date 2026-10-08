import React, { useEffect, useRef, useState } from 'react';
import { Network, Activity, AlertTriangle, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export default function PropagationGraph({ graphData }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = graphData?.networkData?.nodes || [
    { id: 'seed-1', label: '@ViralNewsIndic', type: 'origin', followers: 142000, isBot: false, x: 100, y: 200 },
    { id: 'hub-1', label: '@WhatsApp_Admin1', type: 'hub', followers: 45000, isBot: false, x: 280, y: 120 },
    { id: 'hub-2', label: '@Telegram_Alerts', type: 'hub', followers: 38000, isBot: true, x: 280, y: 280 },
    { id: 'bot-1', label: '@AutoBot_302', type: 'bot', followers: 120, isBot: true, x: 450, y: 80 },
    { id: 'bot-2', label: '@AutoBot_303', type: 'bot', followers: 150, isBot: true, x: 450, y: 160 },
    { id: 'user-1', label: '@PublicUser_89', type: 'user', followers: 890, isBot: false, x: 600, y: 220 }
  ];

  const edges = graphData?.networkData?.edges || [
    { source: 'seed-1', target: 'hub-1' },
    { source: 'seed-1', target: 'hub-2' },
    { source: 'hub-1', target: 'bot-1' },
    { source: 'hub-1', target: 'bot-2' },
    { source: 'hub-2', target: 'user-1' }
  ];

  const summary = graphData?.graphSummary || {
    totalNodes: 35,
    cascadeDepth: 6,
    viralityVelocity: '142.5 shares/min',
    botInvolvementRatio: '28%',
    structuralViralityIndex: '78/100',
    riskLevel: 'HIGH VIRALITY RISK',
    earlySaturationWarning: true,
    predictedPeakTime: 'Within 45 minutes (Pre-saturation warning)'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = 360;

    // Position nodes nicely on canvas
    const positionedNodes = nodes.map((node, i) => {
      let x = 120;
      let y = height / 2;

      if (node.type === 'origin') {
        x = 80;
        y = height / 2;
      } else if (node.type === 'hub') {
        x = 240 + (i % 3) * 60;
        y = 90 + (i % 4) * 80;
      } else if (node.type === 'bot') {
        x = 420 + (i % 4) * 50;
        y = 60 + (i % 5) * 65;
      } else {
        x = 600 + (i % 5) * 40;
        y = 80 + (i % 6) * 50;
      }

      return { ...node, x, y };
    });

    let pulseStep = 0;

    const render = () => {
      pulseStep += 0.05;
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Edges with animated signal pulse
      edges.forEach((edge) => {
        const sourceNode = positionedNodes.find(n => n.id === edge.source) || positionedNodes[0];
        const targetNode = positionedNodes.find(n => n.id === edge.target) || positionedNodes[1];

        ctx.strokeStyle = sourceNode.isBot ? 'rgba(244, 63, 94, 0.4)' : 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.stroke();

        // Pulsing packet traveling down edge
        const t = (Math.sin(pulseStep + (sourceNode.x * 0.01)) + 1) / 2;
        const px = sourceNode.x + (targetNode.x - sourceNode.x) * t;
        const py = sourceNode.y + (targetNode.y - sourceNode.y) * t;

        ctx.fillStyle = sourceNode.isBot ? '#f43f5e' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Nodes
      positionedNodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const radius = node.type === 'origin' ? 14 : node.type === 'hub' ? 10 : 7;

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

        if (node.isBot) {
          ctx.fillStyle = '#f43f5e';
          ctx.shadowColor = '#f43f5e';
        } else if (node.type === 'origin') {
          ctx.fillStyle = '#06b6d4';
          ctx.shadowColor = '#06b6d4';
        } else if (node.type === 'hub') {
          ctx.fillStyle = '#a855f7';
          ctx.shadowColor = '#a855f7';
        } else {
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#10b981';
        }

        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.fill();

        // Node outline
        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();
        ctx.restore();

        // Node Label
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px sans-serif';
        ctx.fillText(node.label, node.x - 20, node.y + radius + 12);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [graphData, selectedNode]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Graph Neural Network (GNN) Cascade Analysis</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time social network graph diffusion modeling & early-stage virality risk forecasting
          </p>
        </div>

        {/* Saturation Badge */}
        <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 ${
          summary.earlySaturationWarning
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 glow-rose'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        }`}>
          {summary.earlySaturationWarning ? <AlertTriangle className="w-4 h-4 animate-bounce" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{summary.riskLevel}</span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">Diffusion Velocity</span>
          <span className="text-lg font-black text-cyan-400 font-mono">{summary.viralityVelocity}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">Bot Cluster Ratio</span>
          <span className="text-lg font-black text-rose-400 font-mono">{summary.botInvolvementRatio}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">Structural Virality Index</span>
          <span className="text-lg font-black text-amber-400 font-mono">{summary.structuralViralityIndex}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">Forecast Peak Saturation</span>
          <span className="text-xs font-bold text-slate-200 mt-1 block truncate">{summary.predictedPeakTime}</span>
        </div>
      </div>

      {/* Interactive Network Graph Canvas */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex items-center space-x-3 text-[11px] bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300">Origin Seed</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span className="text-slate-300">Repost Hub</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">Bot Amplifiers</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">Organic Viewers</span>
          </span>
        </div>

        <canvas ref={canvasRef} className="w-full h-[360px] cursor-crosshair" />
      </div>

    </div>
  );
}
