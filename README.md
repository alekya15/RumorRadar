# 📡 Rumor Radar — Real-Time Multimodal Propagation Analysis for Code-Mixed Social Content

[![Live Deployment](https://img.shields.io/badge/Render-Live%20Deployment-success?style=for-the-badge&logo=render)](https://dashboard.render.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-alekya15%2FRumorRadar-blue?style=for-the-badge&logo=github)](https://github.com/alekya15/RumorRadar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-v24%2B-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

> **Rumor Radar** is a multimodal framework and web application designed for real-time misinformation detection, official proof verification, and virality forecasting across Indic code-mixed social media content (**Telugish**, **Hinglish**, **Tanglish**, **Banglish**, and **Standard English**).

---

## 📌 Abstract

Code-mixed social media content across Indic languages presents severe challenges for conventional misinformation detection due to non-standard orthography, fluid script-switching, and subtle cultural nuances. Moreover, viral digital misinformation rarely travels as isolated text; it spreads across heterogeneous formats—including embedded text on memes, manipulated image banners, and video thumbnails—while propagating rapidly through complex online social networks. Existing frameworks predominantly evaluate code-mixed textual claims in isolation, neglecting cross-modal contextual inconsistencies and real-time diffusion dynamics.

To address these limitations, **Rumor Radar** unifies three core analytical pillars into a singular detection pipeline:

1. **Multimodal Code-Mixed Representation**: Combines fine-tuned multilingual textual embeddings with an OCR-enabled visual transformer pipeline to align and cross-verify code-mixed text overlays inside images/memes against surrounding post captions.
2. **Graph-Aware Propagation Modeling**: Integrates structural Graph Neural Networks (GNNs) with diffusion metrics to model user network topology, retweet/repost cascades, and temporal velocity, predicting a claim's virality risk before peak saturation.
3. **Explainable Refutation Engine**: Employs an LLM-driven counter-narrative module that produces evidence-backed, culturally grounded refutations in the source code-mixed dialect alongside confidence scores and feature attributions.

---

## ✨ Key Features

- **🗣️ Indic Code-Mixed Language Support**: Automatically identifies and normalizes claims in **Telugish** (*Telugu + English*), **Hinglish** (*Hindi + English*), **Tanglish** (*Tamil + English*), **Banglish** (*Bengali + English*), and **Standard English**.
- **📸 Multimodal OCR & Image Forensics**: Accepts meme uploads, screenshot posts, and manipulated news banners. Extracts embedded text via OCR and performs Error Level Analysis (ELA) and typography authenticity verification.
- **📜 Official Proof & Source Justification**: Cross-verifies claims against verified official registries including **PIB Fact Check (Govt of India)**, **Reserve Bank of India (RBI)**, **World Health Organization (WHO)**, and **National Testing Agency (NTA)** with official notice IDs and direct reference links.
- **💬 WhatsApp-Ready Dialect Refutations**: Generates culturally grounded refutations in the source dialect with 1-click copying for WhatsApp/Telegram forwards.
- **🕸️ Interactive GNN Propagation Cascade**: Visualizes network propagation topology (Seed users, Repost hubs, Bot amplification clusters, Organic viewers) with real-time diffusion velocity ($\text{shares/min}$) and early saturation warnings.
- **🎨 Sleek Dark UI/UX**: Built with an elegant dark interface, custom serif typography, and clear verdict card structures.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Canvas API, Lucide Icons
- **Backend**: Node.js, Express.js, Multer (Multimodal File Uploads), CORS
- **NLP & Forensics Engine**: Code-Mixed Dialect Identification, Visual Alignment Parser, GNN Graph Simulator
- **Deployment**: Render / Vercel / Railway

---

## 📁 Repository Directory Structure

```text
RumorRadar/
├── server/
│   ├── index.js                     # Express API Server & Production Static Host
│   └── services/
│       ├── codeMixedNLP.js          # Dialect Identification & Claim Normalizer
│       ├── multimodalOCR.js         # Image Forensics & Visual Transformer OCR Engine
│       ├── propagationGraph.js      # GNN Cascade Network & Virality Simulator
│       └── verificationEngine.js   # Explainable Refutation & Fact-Check DB Engine
├── src/
│   ├── components/
│   │   ├── RumorRadarHero.jsx       # Hero Title & Header Pill Badge
│   │   ├── RumorRadarInput.jsx      # Multimodal Input Card with Example Presets
│   │   ├── RumorRadarResult.jsx     # Screenshot-Aligned Verdict & Evidence Cards
│   │   ├── PropagationGraph.jsx     # Interactive GNN Network Canvas Visualizer
│   │   ├── MultimodalOCRViewer.jsx  # Side-by-side Caption vs OCR Overlay Comparator
│   │   ├── TrendingRadar.jsx        # Live Indic Misinformation Stream
│   │   └── AnalyticsDashboard.jsx   # Research Paper Benchmark Metrics
│   ├── App.jsx                      # Main React Application
│   └── index.css                    # Tailwind CSS & Typography Configuration
├── index.html                       # HTML Entry Point with Custom Fonts
├── package.json                     # Node Dependencies & Build Scripts
└── vite.config.js                   # Vite Bundler & Proxy Configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alekya15/RumorRadar.git
   cd RumorRadar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the production bundle**:
   ```bash
   npm run build
   ```

4. **Start the application server**:
   ```bash
   npm start
   ```

5. **Open in browser**:
   Navigate to `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/verify` | Accepts `claimText`, `image` file, and `dialectPreference`. Returns full multimodal analysis, verdict, official proof, and GNN metrics. |
| `GET` | `/api/sample-claims` | Returns pre-populated Indic code-mixed sample rumors for testing. |
| `GET` | `/api/trending` | Returns live social media misinformation stream across Indic social networks. |
| `GET` | `/api/graph/:claimId` | Returns network node topology and GNN diffusion cascade data for a claim. |
| `GET` | `/api/health` | System health status endpoint. |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/alekya15/RumorRadar/issues).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
