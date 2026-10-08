// Code-Mixed Language Identification & Processing Engine
// Handles Hinglish, Telugish (Telgish), Tanglish, Banglish & English

const DIALECT_PATTERNS = {
  telugish: {
    name: 'Telugish (Telugu + English)',
    code: 'telugish',
    keywords: ['nijamena', 'nijama', 'cheppinadi', 'isthundha', 'unnadi', 'ra', 'babu', 'chudu', 'sarkaru', 'gurinchi', 'entante', 'yentha', 'yela', 'emi', 'kadhantunnaru', 'poyindi', 'vachindi', 'dabbulu', 'scheme', 'yojana'],
    greeting: 'Namaskaram',
    sampleQuery: 'Ee scheme lo government Rs 5000 direct bank account lo vesthundha? Nijamena?'
  },
  hinglish: {
    name: 'Hinglish (Hindi + English)',
    code: 'hinglish',
    keywords: ['sach', 'jhooth', 'kya', 'hai', 'baat', 'ho', 'gaya', 'raha', 'rahie', 'rha', 'paisa', 'milega', 'modi', 'sarkar', 'daava', 'viral', 'chal', 'rha', 'ha', 'bhai', 'dikhao', 'sabko', 'share', 'karo'],
    greeting: 'Namaste',
    sampleQuery: 'Kya PIB ne ye notification issue kiya hai ki sabhi students ko free laptop milega?'
  },
  tanglish: {
    name: 'Tanglish (Tamil + English)',
    code: 'tanglish',
    keywords: ['unmaiya', 'solranga', 'ilaya', 'iruku', 'varudhu', 'panam', 'arasu', 'stalin', 'news', 'paatheengala', 'dosth', 'makkale', 'nambadheenga', 'solranga'],
    greeting: 'Vanakkam',
    sampleQuery: 'Intha RBI news unmaiya illa fake ah? Online la viral aagudhu.'
  },
  banglish: {
    name: 'Banglish (Bengali + English)',
    code: 'banglish',
    keywords: ['sotti', 'naki', 'bhai', 'taka', 'kotha', 'dekho', 'sarkar', 'schem', 'hochhe', 'bolchhe', 'shob', 'mithya'],
    greeting: 'Nomoshkar',
    sampleQuery: 'Ei news ta sotti naki rumor? Sarkar Rs 2000 dibe?'
  },
  english: {
    name: 'Standard English',
    code: 'english',
    keywords: ['is', 'it', 'true', 'that', 'government', 'giving', 'official', 'news', 'fake', 'claim', 'fact', 'check', 'verified'],
    greeting: 'Hello',
    sampleQuery: 'Is the viral news about free electricity subsidy scheme authentic or a rumor?'
  }
};

export function detectCodeMixedLanguage(text) {
  if (!text) return DIALECT_PATTERNS.english;
  
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  
  let scores = {
    telugish: 0,
    hinglish: 0,
    tanglish: 0,
    banglish: 0,
    english: 0
  };

  for (const word of words) {
    for (const [lang, data] of Object.entries(DIALECT_PATTERNS)) {
      if (data.keywords.some(kw => word.includes(kw))) {
        scores[lang] += 2;
      }
    }
  }

  // Check specific Indic code-mixed patterns
  if (/\b(nijam|nijamena|chep|isthun|unnadi|dabbulu|kadhantunnaru)\b/i.test(lower)) scores.telugish += 5;
  if (/\b(kya|hai|jhooth|sach|chal|rha|rhi|milega|bhai)\b/i.test(lower)) scores.hinglish += 5;
  if (/\b(unmai|unmaiya|solranga|iruku|nambadheenga|illa|ah)\b/i.test(lower)) scores.tanglish += 5;
  if (/\b(sotti|naki|bhai|taka|bolchhe|mithya)\b/i.test(lower)) scores.banglish += 5;

  let topLang = 'english';
  let maxScore = -1;

  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      topLang = lang;
    }
  }

  // If low confidence and has English words, fallback appropriately
  if (maxScore <= 0) topLang = 'english';

  return DIALECT_PATTERNS[topLang];
}

export function normalizeCodeMixedClaim(text, dialectCode) {
  let cleaned = text.trim();
  let normalizedEnglishSummary = cleaned;

  // Domain entity mapping
  if (/laptop|tablet/i.test(cleaned)) normalizedEnglishSummary = "Claim regarding free laptop/tablet distribution scheme";
  else if (/5000|2000|10000|paisa|dabbulu|taka|money|fund/i.test(cleaned)) normalizedEnglishSummary = "Claim regarding direct cash transfer or government money scheme";
  else if (/electricity|power|bill|free/i.test(cleaned)) normalizedEnglishSummary = "Claim regarding free electricity or power bill waiver";
  else if (/exam|postpone|cancelled|paper leak/i.test(cleaned)) normalizedEnglishSummary = "Claim regarding exam cancellation or paper leak alert";
  else if (/bank|rbi|note|2000|currency/i.test(cleaned)) normalizedEnglishSummary = "Claim regarding RBI currency note exchange/legal tender rules";
  else if (/virus|covid|health|water|poison|vaccine/i.test(cleaned)) normalizedEnglishSummary = "Claim regarding public health warning or medical emergency";

  return {
    rawClaim: text,
    detectedDialect: dialectCode,
    normalizedSummary: normalizedEnglishSummary,
    extractedEntities: extractEntities(text)
  };
}

function extractEntities(text) {
  const entities = [];
  const orgs = text.match(/\b(PIB|RBI|SBI|WHO|NCERT|UPSC|ISRO|PMO|Government|Sarkar|Arasu|NITI Aayog)\b/gi);
  if (orgs) entities.push(...orgs);
  
  const amounts = text.match(/(\$|₹|Rs\.?|Rupees|INR)\s?\d+([\d,]*\d+)?/gi);
  if (amounts) entities.push(...amounts);

  const dates = text.match(/\b\d{1,2}(st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s?\d{2,4}\b/gi);
  if (dates) entities.push(...dates);

  return [...new Set(entities)];
}
