import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyMultimodalClaim } from './services/verificationEngine.js';
import { analyzePropagationGraph } from './services/propagationGraph.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

// Pre-populated sample rumors in Indic code-mixed languages
const SAMPLE_RUMORS = [
  {
    id: 'sample-1',
    title: 'Free Laptop Scheme 2026',
    dialect: 'Telugish',
    rawText: 'Ee scheme lo government Rs 5000 and free laptop direct bank account lo vesthundha? WhatsApp lo link viral aavthundhi, nijamena ra babu?',
    hasImage: true,
    sampleImageLabel: 'Fake Banner: PIB Free Laptop Registration',
    category: 'Government Policy / Scheme'
  },
  {
    id: 'sample-2',
    title: 'RBI Currency Note Exchange Deadline',
    dialect: 'Hinglish',
    rawText: 'Kya PIB ne ye clarification diya hai ki sabhi old Rs 2000 bank notes kal se completely invalidate ho jayenge aur rbi me exchange nahi hoga?',
    hasImage: true,
    sampleImageLabel: 'Edited Photo: RBI Notification Circular',
    category: 'Finance & Banking'
  },
  {
    id: 'sample-3',
    title: 'Exam Cancellation Leak Circular',
    dialect: 'Tanglish',
    rawText: 'Intha RBI & Board exam circular unmaiya illa fake ah? Online Telegram channel la viral aagudhu, exam postpone aacha?',
    hasImage: false,
    sampleImageLabel: 'N/A',
    category: 'Education / Exams'
  },
  {
    id: 'sample-4',
    title: 'Emergency Public Health Warning',
    dialect: 'Banglish',
    rawText: 'Ei news ta sotti naki rumor? WhatsApp e bolchhe tap water drinking toxic hoye gechhe sarkar bolchhe emergency boil korte.',
    hasImage: false,
    sampleImageLabel: 'N/A',
    category: 'Public Health'
  }
];

const TRENDING_RADAR = [
  {
    id: 'tr-101',
    claim: 'WhatsApp Forward claiming Rs 5000 Direct Cash Transfer link',
    dialect: 'Telugish / Hinglish',
    verdict: 'FALSE',
    viralityScore: 94,
    viralityStatus: 'VIRAL SATURATION RISK',
    sharesPerMin: '280 shares/min',
    originPlatform: 'WhatsApp / Telegram',
    detectedAt: '12 mins ago'
  },
  {
    id: 'tr-102',
    claim: 'Manipulated Circular on Board Examination Dates',
    dialect: 'Tanglish / English',
    verdict: 'FALSE',
    viralityScore: 82,
    viralityStatus: 'HIGH PROPAGATION',
    sharesPerMin: '145 shares/min',
    originPlatform: 'X (Twitter) / Instagram Stories',
    detectedAt: '35 mins ago'
  },
  {
    id: 'tr-103',
    claim: 'Claim regarding Bank Account Freeze for inactive UPI accounts',
    dialect: 'Hinglish',
    verdict: 'PARTIALLY_FALSE',
    viralityScore: 65,
    viralityStatus: 'MODERATE SPREAD',
    sharesPerMin: '70 shares/min',
    originPlatform: 'YouTube Shorts',
    detectedAt: '1 hour ago'
  }
];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'Rumor Radar Multimodal Misinformation Engine', timestamp: new Date() });
});

app.get('/api/sample-claims', (req, res) => {
  res.json(SAMPLE_RUMORS);
});

app.get('/api/trending', (req, res) => {
  res.json(TRENDING_RADAR);
});

app.get('/api/graph/:claimId', (req, res) => {
  const claimId = req.params.claimId;
  const graph = analyzePropagationGraph(claimId, 'Sample query for graph');
  res.json(graph);
});

app.post('/api/verify', upload.single('image'), async (req, res) => {
  try {
    const rawText = req.body.claimText || req.body.rawText || '';
    const dialectPreference = req.body.dialectPreference || null;
    let imageBase64 = null;

    if (req.file) {
      imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    } else if (req.body.imageBase64) {
      imageBase64 = req.body.imageBase64;
    }

    if (!rawText && !imageBase64) {
      return res.status(400).json({ error: 'Please provide text query or upload an image to verify.' });
    }

    const verificationResult = await verifyMultimodalClaim({
      rawText,
      imageFile: imageBase64,
      dialectPreference
    });

    res.json(verificationResult);
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ error: 'Failed to verify content', details: error.message });
  }
});

// Serve frontend static files
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Rumor Radar Backend running on port ${PORT}`);
});
