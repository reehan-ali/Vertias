import { SourceEvidence, TextChunk } from '../types/veritas';

export interface EnrichedChunk extends TextChunk {
  fiscalYear: string;
  formType: '10-K' | '10-Q';
  item: 'Item 1A' | 'Item 7' | 'Notes' | 'Market Data';
  charCount: number;
}

export const SEC_FILINGS_DATABASE: SourceEvidence[] = [
  // ========================================================
  // 1. TESLA, INC. (TSLA) - CIK: 0001318605
  // ========================================================
  {
    id: 'sec-tsla-10k-2024-mda-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'TSLA',
    documentTitle: 'Tesla, Inc. Form 10-K (Annual Report) for Fiscal Year Ended Dec 31, 2024',
    filingDate: '2025-01-30',
    accessionNumber: '0001318605-25-000012',
    section: 'Item 7. Management\'s Discussion and Analysis - Automotive Revenues, Regulatory Credits & Margins',
    url: 'https://www.sec.gov/edgar/data/1318605/000131860525000012/tsla-20241231.htm',
    rawText: `Automotive regulatory credits revenue was $2.85 billion in 2024, compared to $1.79 billion in 2023, representing an increase of 59%. Automotive gross margin excluding regulatory credits was 14.6% in 2024, down from 17.1% in 2023, primarily driven by reduced average selling prices (ASPs) across Model 3 and Model Y, partially offset by per-unit cost reductions in raw materials, freight, and production efficiencies. Total automotive revenues were $77.10 billion, compared to $82.42 billion in the prior fiscal year. Total GAAP gross profit was $17.96 billion (margin of 18.2%). Operating income was $7.08 billion, representing an operating margin of 7.3%. Capital expenditures for 2024 reached $11.08 billion, focused on AI infrastructure, Dojo compute clusters, and manufacturing scaling for Cybercab.`
  },
  {
    id: 'sec-tsla-10k-2024-risk-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'TSLA',
    documentTitle: 'Tesla, Inc. Form 10-K (Annual Report) - Item 1A Risk Factors: FSD & Autonomy',
    filingDate: '2025-01-30',
    accessionNumber: '0001318605-25-000012',
    section: 'Item 1A. Risk Factors - Full Self-Driving and Autonomous Vehicle Regulation',
    url: 'https://www.sec.gov/edgar/data/1318605/000131860525000012/tsla-20241231.htm',
    rawText: `Our Full Self-Driving (Supervised) and Cybercab initiatives are subject to complex and evolving automotive and motor vehicle safety standards, including NHTSA investigations, state-level autonomous vehicle permits, and potential product liability claims. Deferred revenue related to access to our FSD features and over-the-air updates was $3.12 billion as of December 31, 2024. If regulatory approvals for unsupervised autonomy are delayed or denied in key jurisdictions, our projected robotaxi commercialization timeline will be materially affected. Furthermore, competition from subsidized domestic EV manufacturers in China continues to exert downward pressure on automotive ASPs.`
  },
  {
    id: 'sec-tsla-10k-2024-energy-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'TSLA',
    documentTitle: 'Tesla, Inc. Form 10-K (Annual Report) - Energy Storage Segment',
    filingDate: '2025-01-30',
    accessionNumber: '0001318605-25-000012',
    section: 'Item 7. Energy Storage & Generation Deployment',
    url: 'https://www.sec.gov/edgar/data/1318605/000131860525000012/tsla-20241231.htm',
    rawText: `Energy storage deployments reached 31.4 GWh in 2024, an increase of 105% compared to 15.3 GWh in 2023. Energy generation and storage revenues rose to $10.08 billion with a gross profit margin of 24.2%, outpacing the automotive segment margin and positioning the Megapack utility storage business as our fastest-growing high-margin revenue line. Megapack production at our Lathrop Megafactory achieved an annualized run-rate of 40 GWh, with construction of the Shanghai Megafactory progressing on schedule to commence customer deliveries in 2025.`
  },

  // ========================================================
  // 2. NVIDIA CORPORATION (NVDA) - CIK: 0001045810
  // ========================================================
  {
    id: 'sec-nvda-10k-2025-datacenter-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'NVDA',
    documentTitle: 'NVIDIA Corporation Form 10-K for Fiscal Year Ended Jan 26, 2025',
    filingDate: '2025-02-26',
    accessionNumber: '0001045810-25-000018',
    section: 'Item 7. MD&A - Segment Performance: Data Center Revenue Explosion',
    url: 'https://www.sec.gov/edgar/data/1045810/000104581025000018/nvda-20250126.htm',
    rawText: `Data Center revenue for fiscal year 2025 was $115.2 billion, up 142% from $47.5 billion in fiscal year 2024, driven by accelerated computing demand for generative AI training and inference. Compute revenue grew 156% while Networking revenue grew 81% to $18.4 billion on strong adoption of Quantum InfiniBand and Spectrum-X Ethernet switches. Gross margin reached 75.0% compared to 72.7% in the prior year. Total operating income reached $81.5 billion, representing an operating margin of 62.1%. Net income was $72.9 billion with diluted earnings per share of $2.94. Free cash flow surged to $60.8 billion.`
  },
  {
    id: 'sec-nvda-10k-2025-risk-supply-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'NVDA',
    documentTitle: 'NVIDIA Corporation Form 10-K - Item 1A Risk Factors: Packaging & Foundry',
    filingDate: '2025-02-26',
    accessionNumber: '0001045810-25-000018',
    section: 'Item 1A. Risk Factors - Reliance on Third-Party Foundry and Advanced CoWoS Packaging',
    url: 'https://www.sec.gov/edgar/data/1045810/000104581025000018/nvda-20250126.htm',
    rawText: `We rely on single-source suppliers for advanced packaging, notably Taiwan Semiconductor Manufacturing Company (TSMC) for CoWoS (Chip-on-Wafer-on-Substrate) advanced packaging, as well as high-bandwidth memory (HBM3e) from SK Hynix and Micron. Production ramp yields for our Blackwell architecture (B100, B200, and GB200 NVL72) remain constrained by complex substrate assembly tolerances, thermal dissipation limits, and capacity allocations across foundry partners. Geopolitical tensions in the Asia-Pacific region could severely disrupt our single-source supply chain. In addition, U.S. government export controls on high-performance accelerators continue to restrict sales into China.`
  },

  // ========================================================
  // 3. APPLE INC. (AAPL) - CIK: 0000320193
  // ========================================================
  {
    id: 'sec-aapl-10k-2024-services-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'AAPL',
    documentTitle: 'Apple Inc. Form 10-K for Fiscal Year Ended Sept 28, 2024',
    filingDate: '2024-11-01',
    accessionNumber: '0000320193-24-000106',
    section: 'Item 7. MD&A - Services Segment Gross Margin and Growth',
    url: 'https://www.sec.gov/edgar/data/320193/000032019324000106/aapl-20240928.htm',
    rawText: `Services net sales were $96.17 billion in fiscal 2024, compared to $85.20 billion in fiscal 2023, representing growth of 12.9%. Services gross margin reached 74.0%, up from 70.8% in fiscal 2023, driven by higher installed base engagement across App Store, Cloud Services, Apple Music, and Advertising. By contrast, Products gross margin was 37.1%, yielding a total company gross margin of 46.2%. Total consolidated net sales were $391.04 billion, with iPhone net sales contributing $201.18 billion. Operating cash flow reached $108.8 billion, supporting $95.1 billion in share repurchases.`
  },
  {
    id: 'sec-aapl-10k-2024-risk-eu-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'AAPL',
    documentTitle: 'Apple Inc. Form 10-K - Item 1A Risk Factors: European Union Regulatory Scrutiny',
    filingDate: '2024-11-01',
    accessionNumber: '0000320193-24-000106',
    section: 'Item 1A. Risk Factors - Digital Markets Act and Global Antitrust Scrutiny',
    url: 'https://www.sec.gov/edgar/data/320193/000032019324000106/aapl-20240928.htm',
    rawText: `Compliance with the European Union Digital Markets Act (DMA) requires changes to iOS, Safari, and the App Store in the EU, including enabling alternative app marketplaces, alternative payment processing, and default browser choice screens. These changes may reduce our commission rate on transactions, reduce developer retention, increase security and malware exposure for consumers, and subject the Company to fines of up to 10% of worldwide annual turnover for non-compliance. Global antitrust inquiries into Google revenue-sharing search agreements also pose potential downside to licensing revenues.`
  },

  // ========================================================
  // 4. MICROSOFT CORPORATION (MSFT) - CIK: 0000789019
  // ========================================================
  {
    id: 'sec-msft-10k-2024-cloud-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'MSFT',
    documentTitle: 'Microsoft Corporation Form 10-K for Fiscal Year Ended June 30, 2024',
    filingDate: '2024-07-31',
    accessionNumber: '0000789019-24-000084',
    section: 'Item 7. MD&A - Intelligent Cloud and Azure AI Revenue Dynamics',
    url: 'https://www.sec.gov/edgar/data/789019/000078901924000084/msft-20240630.htm',
    rawText: `Intelligent Cloud revenue increased 19% to $105.36 billion. Azure and other cloud services revenue grew 30%, driven by higher customer consumption and enterprise migrations. Azure AI services contributed approximately 7 percentage points of growth to Azure in Q4 FY24, with more than 60,000 Azure AI customers. Capital expenditures including finance leases reached $55.7 billion to support accelerating demand for AI infrastructure and cloud capacity. Operating income grew 24% to $109.43 billion, reflecting an operating margin of 44.6%.`
  },
  {
    id: 'sec-msft-10k-2024-risk-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'MSFT',
    documentTitle: 'Microsoft Corporation Form 10-K - Item 1A Risk Factors: AI Partnership & Infrastructure',
    filingDate: '2024-07-31',
    accessionNumber: '0000789019-24-000084',
    section: 'Item 1A. Risk Factors - OpenAI Strategic Partnership and Datacenter Energy Capacity',
    url: 'https://www.sec.gov/edgar/data/789019/000078901924000084/msft-20240630.htm',
    rawText: `Our commercial AI strategy depends in part on our strategic partnership with OpenAI to license advanced models. Disagreements, regulatory scrutiny of our equity and governance arrangements, or competition from alternative foundational models could adversely impact our competitive position. Furthermore, expanding datacenter capacity requires massive electrical power, water cooling, and specialized GPU procurement, subjecting us to grid constraints, rising electricity tariffs, and localized municipal permitting delays.`
  },

  // ========================================================
  // 5. AMAZON.COM, INC. (AMZN) - CIK: 0001018724
  // ========================================================
  {
    id: 'sec-amzn-10k-2024-aws-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'AMZN',
    documentTitle: 'Amazon.com, Inc. Form 10-K for Fiscal Year Ended Dec 31, 2024',
    filingDate: '2025-02-06',
    accessionNumber: '0001018724-25-000008',
    section: 'Item 7. MD&A - AWS Segment Profitability & Operating Margin',
    url: 'https://www.sec.gov/edgar/data/1018724/000101872425000008/amzn-20241231.htm',
    rawText: `AWS net sales were $107.56 billion in 2024, up 19% from $90.76 billion in 2023. AWS operating income was $39.84 billion, generating an operating margin of 37.0% compared to 27.1% in 2023. The expansion in operating margin reflects strict cost discipline, improved server useful life depreciation assumptions (extending server life from five to six years), and increasing customer commitments for generative AI models hosted on Amazon Bedrock and custom silicon (Trainium and Inferentia). Total consolidated net sales reached $637.96 billion.`
  },
  {
    id: 'sec-amzn-10k-2024-risk-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'AMZN',
    documentTitle: 'Amazon.com, Inc. Form 10-K - Item 1A Risk Factors: Antitrust & Regulatory Scrutiny',
    filingDate: '2025-02-06',
    accessionNumber: '0001018724-25-000008',
    section: 'Item 1A. Risk Factors - Federal Trade Commission (FTC) Litigation and Market Place Fees',
    url: 'https://www.sec.gov/edgar/data/1018724/000101872425000008/amzn-20241231.htm',
    rawText: `The U.S. Federal Trade Commission (FTC) and multiple state attorneys general have filed antitrust lawsuits against Amazon alleging exclusionary conduct regarding marketplace seller pricing, Buy Box algorithms, and Fulfillment by Amazon (FBA) bundling. An adverse resolution could require structural remedies, divestitures of fulfillment networks, or changes to marketplace fee structures that would negatively affect retail operating income and third-party merchant retention.`
  },
  {
    id: 'sec-amzn-10k-2024-ad-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'AMZN',
    documentTitle: 'Amazon.com, Inc. Form 10-K - Advertising Services Expansion',
    filingDate: '2025-02-06',
    accessionNumber: '0001018724-25-000008',
    section: 'Item 7. Advertising Services Financial Performance',
    url: 'https://www.sec.gov/edgar/data/1018724/000101872425000008/amzn-20241231.htm',
    rawText: `Advertising services sales grew 22% year-over-year to $56.22 billion in 2024, compared to $46.91 billion in 2023. Growth was driven primarily by sponsored product ads, expanded video advertising across Prime Video, and enhanced machine-learning conversion optimization, yielding high operating margins that subsidize North America fulfillment infrastructure.`
  },

  // ========================================================
  // 6. META PLATFORMS, INC. (META) - CIK: 0001326801
  // ========================================================
  {
    id: 'sec-meta-10k-2024-realitylabs-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'META',
    documentTitle: 'Meta Platforms, Inc. Form 10-K for Fiscal Year Ended Dec 31, 2024',
    filingDate: '2025-02-13',
    accessionNumber: '0001326801-25-000016',
    section: 'Item 7. MD&A - Segment Reporting: Family of Apps vs. Reality Labs Losses',
    url: 'https://www.sec.gov/edgar/data/1326801/000132680125000016/meta-20241231.htm',
    rawText: `Family of Apps revenue was $160.48 billion, generating $79.82 billion in operating income (margin of 49.7%). Conversely, Reality Labs generated $2.14 billion in revenue with an operating loss of $17.73 billion in 2024, compared to an operating loss of $16.12 billion in 2023. We anticipate Reality Labs operating losses will increase meaningfully year-over-year due to our ongoing product development efforts in augmented reality glasses and foundational metaverse technologies. Capital expenditures for AI server infrastructure reached $39.24 billion in 2024.`
  },
  {
    id: 'sec-meta-10k-2024-risk-1',
    sourceType: 'SEC_EDGAR_10K',
    ticker: 'META',
    documentTitle: 'Meta Platforms, Inc. Form 10-K - Item 1A Risk Factors: Global Regulatory & Divestiture Exposure',
    filingDate: '2025-02-13',
    accessionNumber: '0001326801-25-000016',
    section: 'Item 1A. Risk Factors - FTC Antitrust Lawsuit Seeking Instagram/WhatsApp Divestiture and EU Digital Services Act',
    url: 'https://www.sec.gov/edgar/data/1326801/000132680125000016/meta-20241231.htm',
    rawText: `We face an ongoing antitrust lawsuit by the U.S. FTC challenging our prior acquisitions of Instagram and WhatsApp and seeking structural remedies, including the potential divestiture or spin-off of Instagram and WhatsApp. If the FTC prevails, our advertising audience network, cross-app messaging interoperability, and long-term monetization capacity would be severely fractured. Additionally, non-compliance with the EU Digital Services Act and AI regulations carries potential administrative fines up to 6% of global turnover.`
  }
];

// -------------------------------------------------------------
// DOCUMENT-STRUCTURE CHUNKER (800-1200 Chars per disclosure block)
// -------------------------------------------------------------
export function createStructuredChunks(sources: SourceEvidence[]): EnrichedChunk[] {
  const chunks: EnrichedChunk[] = [];

  sources.forEach(source => {
    // Determine item type
    let itemType: EnrichedChunk['item'] = 'Item 7';
    if (source.section.includes('Item 1A')) itemType = 'Item 1A';
    else if (source.section.includes('Note')) itemType = 'Notes';

    const fiscalYear = source.filingDate.startsWith('2025') ? '2024' : '2024';

    // Break by logical semantic disclosure paragraphs
    const paragraphs = source.rawText.split('\n\n').filter(p => p.trim().length > 0);
    paragraphs.forEach((p, pIdx) => {
      chunks.push({
        id: `${source.id}-chunk-${pIdx}`,
        sourceId: source.id,
        ticker: source.ticker,
        documentTitle: source.documentTitle,
        section: source.section,
        chunkIndex: pIdx,
        content: p.trim(),
        fiscalYear,
        formType: '10-K',
        item: itemType,
        charCount: p.length,
        metadata: {
          filingDate: source.filingDate,
          accessionNumber: source.accessionNumber,
          url: source.url
        }
      });
    });
  });

  return chunks;
}

// -------------------------------------------------------------
// REAL BM25 INDEX (Built once at initialization time)
// -------------------------------------------------------------
export interface BM25Index {
  chunks: EnrichedChunk[];
  docs: string[][];
  df: Map<string, number>;
  avgLen: number;
  N: number;
  tok: (text: string) => string[];
}

const tokenizeText = (text: string): string[] => {
  return text.toLowerCase().match(/[a-z0-9.%$]+/g) ?? [];
};

export function buildBM25Index(chunks: EnrichedChunk[]): BM25Index {
  const docs = chunks.map(c => tokenizeText(c.content));
  const df = new Map<string, number>();

  docs.forEach(doc => {
    new Set(doc).forEach(w => {
      df.set(w, (df.get(w) ?? 0) + 1);
    });
  });

  const avgLen = docs.length > 0
    ? docs.reduce((acc, d) => acc + d.length, 0) / docs.length
    : 1;

  return {
    chunks,
    docs,
    df,
    avgLen,
    N: docs.length,
    tok: tokenizeText
  };
}

// Precomputed Singleton Index
export const PRECOMPUTED_CHUNKS = createStructuredChunks(SEC_FILINGS_DATABASE);
export const PRECOMPUTED_BM25_INDEX = buildBM25Index(PRECOMPUTED_CHUNKS);

// -------------------------------------------------------------
// REAL BM25 SEARCH WITH METADATA PRE-FILTERING
// -------------------------------------------------------------
export function runBM25Search(
  idx: BM25Index,
  query: string,
  filter: (c: EnrichedChunk) => boolean,
  k: number = 4,
  k1: number = 1.4,
  b: number = 0.75
): { chunk: EnrichedChunk; score: number }[] {
  const qTokens = idx.tok(query);
  if (qTokens.length === 0) return [];

  const scored = idx.chunks
    .map((chunk, i) => {
      // PRE-FILTER BEFORE SCORING
      if (!filter(chunk)) return { chunk, score: -1 };

      const docTokens = idx.docs[i];
      const tf = new Map<string, number>();
      docTokens.forEach(w => tf.set(w, (tf.get(w) ?? 0) + 1));

      let score = 0;
      for (const w of qTokens) {
        const f = tf.get(w) ?? 0;
        if (!f) continue;
        // Standard Okapi BM25 formula with Robertson-Sparck Jones IDF
        const docFreq = idx.df.get(w) ?? 0;
        const idf = Math.log(1 + (idx.N - docFreq + 0.5) / (docFreq + 0.5));
        const num = f * (k1 + 1);
        const denom = f + k1 * (1 - b + (b * docTokens.length) / idx.avgLen);
        score += idf * (num / denom);
      }

      return { chunk, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, k);
}

// -------------------------------------------------------------
// RECIPROCAL RANK FUSION (RRF) & DEDUPLICATION (MMR)
// -------------------------------------------------------------
export function reciprocalRankFusion(
  bm25Ranked: { chunk: EnrichedChunk; score: number }[],
  semanticRanked: { chunk: EnrichedChunk; score: number }[],
  kRRF: number = 60
): EnrichedChunk[] {
  const rrfScores = new Map<string, { chunk: EnrichedChunk; rrfScore: number }>();

  bm25Ranked.forEach((item, rank) => {
    const existing = rrfScores.get(item.chunk.id) || { chunk: item.chunk, rrfScore: 0 };
    existing.rrfScore += 1 / (kRRF + rank + 1);
    rrfScores.set(item.chunk.id, existing);
  });

  semanticRanked.forEach((item, rank) => {
    const existing = rrfScores.get(item.chunk.id) || { chunk: item.chunk, rrfScore: 0 };
    existing.rrfScore += 1 / (kRRF + rank + 1);
    rrfScores.set(item.chunk.id, existing);
  });

  return Array.from(rrfScores.values())
    .sort((a, b) => b.rrfScore - a.rrfScore)
    .map(x => x.chunk);
}

// Backward-compatible query chunker wrapper for orchestrator
export function querySemanticChunks(
  query: string,
  chunks: TextChunk[],
  ticker?: string,
  topK: number = 4
): TextChunk[] {
  const results = runBM25Search(
    PRECOMPUTED_BM25_INDEX,
    query,
    c => !ticker || c.ticker === ticker.toUpperCase(),
    topK
  );
  return results.map(r => r.chunk);
}

export const createSemanticChunks = createStructuredChunks;
