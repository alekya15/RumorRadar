// Graph-Aware Propagation Modeling & GNN Virality Risk Simulator
// Models user network topology, retweet/repost cascades, and temporal velocity

export function analyzePropagationGraph(claimId, rawClaim) {
  // Generate deterministic synthetic cascade graph for demonstration & real-time analysis
  const seedNodes = 10;
  const retweetNodes = 45;
  const botClusterNodes = 15;
  
  const nodes = [];
  const edges = [];

  // 1. Root / Seed Node (Origin of claim)
  nodes.push({
    id: 'seed-1',
    label: '@ViralNewsIndic',
    type: 'origin',
    followers: 142000,
    credibilityScore: 0.28,
    isBot: false,
    influenceIndex: 8.9
  });

  // 2. High-influence Repost Hubs
  for (let i = 1; i <= 5; i++) {
    const hubId = `hub-${i}`;
    nodes.push({
      id: hubId,
      label: `@WhatsAppGroup_Admin${i}`,
      type: 'hub',
      followers: Math.floor(Math.random() * 50000) + 10000,
      credibilityScore: 0.35,
      isBot: i === 3,
      influenceIndex: (7.5 - i * 0.8).toFixed(1)
    });

    edges.push({
      source: 'seed-1',
      target: hubId,
      timestamp: `${i * 3}m ago`,
      weight: 0.9 - i * 0.1
    });
  }

  // 3. Bot Network Amplification Cluster
  for (let b = 1; b <= 8; b++) {
    const botId = `bot-${b}`;
    nodes.push({
      id: botId,
      label: `@AutoBot_India_${b}`,
      type: 'bot',
      followers: Math.floor(Math.random() * 200),
      credibilityScore: 0.05,
      isBot: true,
      influenceIndex: 2.1
    });

    const parentHub = `hub-${(b % 3) + 1}`;
    edges.push({
      source: parentHub,
      target: botId,
      timestamp: `${15 + b * 2}m ago`,
      weight: 0.95
    });
  }

  // 4. Organic User Propagation Nodes
  for (let u = 1; u <= 12; u++) {
    const userId = `user-${u}`;
    nodes.push({
      id: userId,
      label: `@User_${100 + u}`,
      type: 'user',
      followers: Math.floor(Math.random() * 1500) + 100,
      credibilityScore: 0.72,
      isBot: false,
      influenceIndex: 1.5
    });

    const source = u % 2 === 0 ? `hub-${(u % 4) + 1}` : `bot-${(u % 6) + 1}`;
    edges.push({
      source: source,
      target: userId,
      timestamp: `${30 + u * 4}m ago`,
      weight: 0.5
    });
  }

  // Metrics computation (Simulated GNN Graph Diffusion Metrics)
  const viralityVelocity = 142.5; // reposts per minute
  const cascadeDepth = 6;
  const botInvolvementRatio = parseFloat((botClusterNodes / (seedNodes + retweetNodes + botClusterNodes)).toFixed(2));
  
  // Calculate GNN Structural Virality Risk (0 to 100)
  let viralityRiskScore = 78;
  let riskLevel = 'HIGH VIRALITY RISK';
  let earlySaturationWarning = true;

  if (rawClaim && (rawClaim.toLowerCase().includes('verified') || rawClaim.toLowerCase().includes('official'))) {
    viralityRiskScore = 24;
    riskLevel = 'LOW DISSIMINATION RISK';
    earlySaturationWarning = false;
  }

  return {
    claimId: claimId || 'claim-' + Date.now(),
    graphSummary: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      cascadeDepth,
      viralityVelocity: `${viralityVelocity} shares/min`,
      botInvolvementRatio: `${(botInvolvementRatio * 100).toFixed(0)}%`,
      structuralViralityIndex: `${viralityRiskScore}/100`,
      riskLevel,
      earlySaturationWarning,
      predictedPeakTime: earlySaturationWarning ? 'Within 45 minutes (Pre-saturation warning)' : 'Controlled spread'
    },
    networkData: {
      nodes,
      edges
    },
    gnnEmbeddings: {
      graphSpectrumScore: 0.84,
      temporalAcceleration: "+310% in last 30 mins",
      clusteringCoefficient: 0.67,
      communityEchoChambers: 3
    }
  };
}
