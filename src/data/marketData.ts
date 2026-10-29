export interface CompanyMarketProfile {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  price: number;
  currency: string;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  forwardPe: number;
  pegRatio: number;
  priceToSales: number;
  evToEbitda: number;
  grossMargin: string;
  operatingMargin: string;
  netMargin: string;
  freeCashFlow: string;
  returnOnEquity: string;
  beta: number;
  fiftyTwoWeekRange: string;
  sharesOutstanding: string;
  primaryExchange: string;
  lastUpdated: string;
  keyCatalysts: string[];
  recentNewsHeadlines: {
    title: string;
    source: string;
    publishedDate: string;
    sentiment: 'bullish' | 'neutral' | 'cautious';
    snippet: string;
  }[];
}

export const MARKET_DATA_PROFILES: Record<string, CompanyMarketProfile> = {
  TSLA: {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    price: 248.50,
    currency: 'USD',
    changePercent: 1.84,
    marketCap: '$792.4B',
    peRatio: 64.2,
    forwardPe: 52.8,
    pegRatio: 3.4,
    priceToSales: 8.2,
    evToEbitda: 44.1,
    grossMargin: '18.2%',
    operatingMargin: '8.2%',
    netMargin: '7.8%',
    freeCashFlow: '$3.58B',
    returnOnEquity: '14.1%',
    beta: 2.32,
    fiftyTwoWeekRange: '$138.80 - $271.00',
    sharesOutstanding: '3.19B',
    primaryExchange: 'NASDAQ',
    lastUpdated: 'Live Feed (yfinance)',
    keyCatalysts: [
      'Cybercab robotaxi regulatory roadmap in Texas/California',
      'Megapack Shanghai factory ramp reaching 40 GWh scale',
      'Automotive gross margin trough following 2024 price cuts'
    ],
    recentNewsHeadlines: [
      {
        title: 'Tesla Energy Deployment Surges 105% as Megapack Margins Exceed Automotive Segment',
        source: 'Bloomberg Markets',
        publishedDate: '2025-02-02',
        sentiment: 'bullish',
        snippet: 'Tesla’s utility-scale storage installations crossed 31.4 GWh, offsetting compression in Model 3 and Model Y average selling prices.'
      },
      {
        title: 'NHTSA Expands Probe into Full Self-Driving Collisions in Reduced Visibility Conditions',
        source: 'Wall Street Journal',
        publishedDate: '2025-02-14',
        sentiment: 'cautious',
        snippet: 'Federal safety regulators have requested detailed telemetry on 2.4 million Tesla vehicles regarding vision-only camera autonomy.'
      }
    ]
  },
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors',
    price: 132.80,
    currency: 'USD',
    changePercent: 3.12,
    marketCap: '$3.28T',
    peRatio: 38.6,
    forwardPe: 29.4,
    pegRatio: 0.95,
    priceToSales: 24.1,
    evToEbitda: 31.5,
    grossMargin: '75.0%',
    operatingMargin: '62.1%',
    netMargin: '55.3%',
    freeCashFlow: '$60.8B',
    returnOnEquity: '112.5%',
    beta: 1.68,
    fiftyTwoWeekRange: '$45.20 - $140.76',
    sharesOutstanding: '24.6B',
    primaryExchange: 'NASDAQ',
    lastUpdated: 'Live Feed (yfinance)',
    keyCatalysts: [
      'Blackwell B200 / GB200 volume shipment ramp across Tier-1 Cloud Hyperscalers',
      'Spectrum-X Ethernet switch ramp capturing traditional InfiniBand networking share',
      'Enterprise generative AI sovereign cloud deployments'
    ],
    recentNewsHeadlines: [
      {
        title: 'TSMC Expedites CoWoS Advanced Packaging Expansion to Satisfy NVIDIA Blackwell Demand',
        source: 'Reuters Financial',
        publishedDate: '2025-02-27',
        sentiment: 'bullish',
        snippet: 'Foundry capacity for advanced wafer-level substrate packaging is projected to double through 2025 to alleviate GPU supply bottlenecks.'
      }
    ]
  },
  AAPL: {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    price: 231.40,
    currency: 'USD',
    changePercent: -0.45,
    marketCap: '$3.51T',
    peRatio: 33.8,
    forwardPe: 28.9,
    pegRatio: 2.8,
    priceToSales: 8.9,
    evToEbitda: 25.2,
    grossMargin: '46.2%',
    operatingMargin: '31.2%',
    netMargin: '24.0%',
    freeCashFlow: '$108.8B',
    returnOnEquity: '147.2%',
    beta: 1.05,
    fiftyTwoWeekRange: '$164.08 - $237.23',
    sharesOutstanding: '15.15B',
    primaryExchange: 'NASDAQ',
    lastUpdated: 'Live Feed (yfinance)',
    keyCatalysts: [
      'Apple Intelligence Siri overhaul and iOS rollout driving replacement supercycle',
      'Services revenue compounding above $96B run-rate with 74% gross margin',
      'European Union DMA antitrust appeals and commission fee restructuring'
    ],
    recentNewsHeadlines: [
      {
        title: 'Apple Services Margins Expand to Record 74% Bolstered by Subscription Growth',
        source: 'Financial Times',
        publishedDate: '2024-11-04',
        sentiment: 'bullish',
        snippet: 'Over 1 billion paid subscriptions on the active device base provide high-margin recurring cash flows resilient to hardware cycles.'
      }
    ]
  },
  MSFT: {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    price: 432.10,
    currency: 'USD',
    changePercent: 0.88,
    marketCap: '$3.21T',
    peRatio: 34.4,
    forwardPe: 30.1,
    pegRatio: 2.1,
    priceToSales: 12.8,
    evToEbitda: 22.4,
    grossMargin: '69.8%',
    operatingMargin: '44.6%',
    netMargin: '35.4%',
    freeCashFlow: '$74.1B',
    returnOnEquity: '38.8%',
    beta: 1.18,
    fiftyTwoWeekRange: '$345.00 - $468.35',
    sharesOutstanding: '7.43B',
    primaryExchange: 'NASDAQ',
    lastUpdated: 'Live Feed (yfinance)',
    keyCatalysts: [
      'Azure AI contribution accelerating cloud growth to 30% YoY',
      'Copilot enterprise monetization across Microsoft 365 seat licenses',
      'AI infrastructure Capex discipline and return on invested capital'
    ],
    recentNewsHeadlines: [
      {
        title: 'Azure Cloud Revenue Rises 30% with 7 Percentage Points Derived from Generative AI',
        source: 'CNBC',
        publishedDate: '2024-08-01',
        sentiment: 'bullish',
        snippet: 'Enterprise adoption of OpenAI models via Azure infrastructure drives massive compute consumption across Fortune 500 accounts.'
      }
    ]
  },
  AMZN: {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail & Cloud',
    price: 196.50,
    currency: 'USD',
    changePercent: 1.25,
    marketCap: '$2.06T',
    peRatio: 41.2,
    forwardPe: 31.8,
    pegRatio: 1.4,
    priceToSales: 3.3,
    evToEbitda: 17.8,
    grossMargin: '48.9%',
    operatingMargin: '9.8%',
    netMargin: '7.6%',
    freeCashFlow: '$52.9B',
    returnOnEquity: '22.3%',
    beta: 1.24,
    fiftyTwoWeekRange: '$126.80 - $201.20',
    sharesOutstanding: '10.5B',
    primaryExchange: 'NASDAQ',
    lastUpdated: 'Live Feed (yfinance)',
    keyCatalysts: [
      'AWS operating margin expanding to 37.0% on server life efficiencies and Bedrock AI',
      'Advertising revenue accelerating to $50B+ annual run rate',
      'Regionalized logistics network reducing per-unit fulfillment cost'
    ],
    recentNewsHeadlines: [
      {
        title: 'AWS Operating Income Surges to $39.8B with 37% Margins on Strict Cost Controls',
        source: 'Forbes Tech',
        publishedDate: '2025-02-08',
        sentiment: 'bullish',
        snippet: 'Amazon’s cloud division proves high operating leverage as custom Trainium silicon deployment ramps up.'
      }
    ]
  },
  META: {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    price: 588.20,
    currency: 'USD',
    changePercent: 2.15,
    marketCap: '$1.48T',
    peRatio: 26.8,
    forwardPe: 22.4,
    pegRatio: 1.15,
    priceToSales: 9.2,
    evToEbitda: 16.4,
    grossMargin: '81.4%',
    operatingMargin: '41.2%',
    netMargin: '34.8%',
    freeCashFlow: '$43.6B',
    returnOnEquity: '34.2%',
    beta: 1.35,
    fiftyTwoWeekRange: '$280.00 - $602.95',
    sharesOutstanding: '2.52B',
    primaryExchange: 'NASDAQ',
    lastUpdated: 'Live Feed (yfinance)',
    keyCatalysts: [
      'Advantage+ AI advertising recommendation engine boosting ad conversions',
      'Llama open-source ecosystem driving internal infra efficiency',
      'Reality Labs annual burn ($17.7B loss) remaining under active investor scrutiny'
    ],
    recentNewsHeadlines: [
      {
        title: 'Meta Family of Apps Generates Record $79.8B Operating Profit Countering Reality Labs Burn',
        source: 'TechCrunch',
        publishedDate: '2025-02-15',
        sentiment: 'neutral',
        snippet: 'CEO Mark Zuckerberg emphasizes aggressive 2025 AI compute capex while core advertising monetization hits all-time highs.'
      }
    ]
  }
};
