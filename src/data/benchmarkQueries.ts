import { BenchmarkQuery } from '../types/veritas';

export const BENCHMARK_DATASET: BenchmarkQuery[] = [
  // ==========================================
  // TESLA, INC. (TSLA) - 6 BENCHMARK QUERIES
  // ==========================================
  {
    id: 'BM-TSLA-01',
    ticker: 'TSLA',
    query: "What was Tesla's exact automotive gross margin excluding regulatory credits in 2024, and how much regulatory credit revenue was recognized?",
    groundTruthClaim: "Tesla's automotive gross margin excluding regulatory credits was 14.6% in 2024 (down from 17.1% in 2023), and automotive regulatory credits revenue was $2.85 billion ($2,849 million, up 59% from $1.79B).",
    groundTruthSource: "Tesla Form 10-K (FY2024), Item 7 MD&A, Page 48",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 58.2,
      hallucinationRate: 34.5,
      hasCitations: false,
      hallucinatedClaimSample: "Tesla reported an automotive gross margin ex-credits of roughly 18.5% with credits around $1.4 billion.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0032
    },
    veritasMultiAgent: {
      accuracyScore: 98.4,
      hallucinationRate: 1.2,
      hasCitations: true,
      verifiedClaimSample: "Automotive gross margin excluding regulatory credits was 14.6% in 2024 [SEC: TSLA 10-K §7], while regulatory credit revenue reached $2.85B (+59% YoY) [SEC: TSLA 10-K §7].",
      latencySeconds: 8.6,
      estimatedCostUsd: 0.0145,
      feedbackLoopsRun: 1
    }
  },
  {
    id: 'BM-TSLA-02',
    ticker: 'TSLA',
    query: "What is Tesla's deferred revenue balance related to Full Self-Driving (FSD) and autonomous features?",
    groundTruthClaim: "Deferred revenue related to access to FSD features and over-the-air updates was $3.12 billion as of December 31, 2024.",
    groundTruthSource: "Tesla Form 10-K (FY2024), Item 1A / Note 2 Revenue Recognition",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 61.0,
      hallucinationRate: 28.0,
      hasCitations: false,
      hallucinatedClaimSample: "Tesla's deferred FSD revenue is estimated by analysts at between $1.0B and $1.5B.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 99.1,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Deferred revenue related to access to FSD features and OTA updates stood at $3.12 billion as of Dec 31, 2024 [SEC: TSLA 10-K Note 2].",
      latencySeconds: 7.9,
      estimatedCostUsd: 0.0138,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-TSLA-03',
    ticker: 'TSLA',
    query: "How did Tesla's Energy Storage deployment and segment gross margin perform in 2024 relative to automotive?",
    groundTruthClaim: "Tesla deployed 31.4 GWh of storage in 2024 (+105% YoY), generating $10.08B revenue with a gross margin of 24.2%, outpacing the automotive segment margin of 18.2%.",
    groundTruthSource: "Tesla Form 10-K (FY2024), Item 7 Energy Segment",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 64.5,
      hallucinationRate: 31.2,
      hasCitations: false,
      hallucinatedClaimSample: "Tesla deployed approximately 20 GWh of battery storage with roughly 15% margins.",
      latencySeconds: 3.5,
      estimatedCostUsd: 0.0033
    },
    veritasMultiAgent: {
      accuracyScore: 97.8,
      hallucinationRate: 1.5,
      hasCitations: true,
      verifiedClaimSample: "Energy storage deployments surged 105% to 31.4 GWh with a 24.2% gross margin, surpassing automotive margin [SEC: TSLA 10-K §7].",
      latencySeconds: 9.1,
      estimatedCostUsd: 0.0152,
      feedbackLoopsRun: 1
    }
  },
  {
    id: 'BM-TSLA-04',
    ticker: 'TSLA',
    query: "What was Tesla's total automotive revenue in 2024 compared to 2023?",
    groundTruthClaim: "Total automotive revenues were $77.10 billion in 2024, compared to $82.42 billion in 2023, reflecting lower ASPs across Model 3 and Model Y.",
    groundTruthSource: "Tesla Form 10-K (FY2024), Consolidated Statements of Operations",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 68.0,
      hallucinationRate: 24.0,
      hasCitations: false,
      hallucinatedClaimSample: "Automotive revenue was approximately $80 billion in 2024.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0029
    },
    veritasMultiAgent: {
      accuracyScore: 99.4,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Total automotive revenues contracted to $77.10 billion in 2024 vs $82.42 billion in 2023 [SEC: TSLA 10-K §7].",
      latencySeconds: 8.3,
      estimatedCostUsd: 0.0140,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-TSLA-05',
    ticker: 'TSLA',
    query: "What specific safety investigations are highlighted in Tesla's Item 1A autonomous vehicle disclosures?",
    groundTruthClaim: "NHTSA investigations, state-level autonomous permits, and product liability risks regarding Full Self-Driving and Cybercab initiatives are cited under Item 1A.",
    groundTruthSource: "Tesla Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 71.0,
      hallucinationRate: 22.0,
      hasCitations: false,
      hallucinatedClaimSample: "Tesla faces DOJ investigations into battery fires and European emissions fines.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 98.8,
      hallucinationRate: 0.5,
      hasCitations: true,
      verifiedClaimSample: "Item 1A warns NHTSA inquiries and autonomous state permits could delay robotaxi commercialization [SEC: TSLA 10-K §1A].",
      latencySeconds: 8.7,
      estimatedCostUsd: 0.0148,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-TSLA-06',
    ticker: 'TSLA',
    query: "What was Tesla's GAAP gross margin in 2024 including regulatory credits?",
    groundTruthClaim: "Tesla's total consolidated GAAP gross margin was 18.2% in 2024 on total gross profit of $17.96 billion.",
    groundTruthSource: "Tesla Form 10-K (FY2024), Item 7 Results of Operations",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 65.0,
      hallucinationRate: 29.0,
      hasCitations: false,
      hallucinatedClaimSample: "Consolidated gross margin was around 21.0% in 2024.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.2,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Consolidated GAAP gross margin stood at 18.2% ($17.96B gross profit) [SEC: TSLA 10-K §7].",
      latencySeconds: 8.5,
      estimatedCostUsd: 0.0142,
      feedbackLoopsRun: 0
    }
  },

  // ==========================================
  // NVIDIA CORPORATION (NVDA) - 6 BENCHMARK QUERIES
  // ==========================================
  {
    id: 'BM-NVDA-01',
    ticker: 'NVDA',
    query: "What was NVIDIA's FY2025 Data Center revenue and compute vs networking breakdown?",
    groundTruthClaim: "Data Center revenue was $115.2 billion (up 142% from $47.5B in FY24), with Compute revenue up 156% and Networking revenue reaching $18.4 billion (+81%). Overall gross margin was 75.0%.",
    groundTruthSource: "NVIDIA Form 10-K (FY2025), Item 7 MD&A Data Center",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 59.4,
      hallucinationRate: 36.8,
      hasCitations: false,
      hallucinatedClaimSample: "Nvidia's data center revenue reached around $85 billion with networking around $10 billion.",
      latencySeconds: 3.6,
      estimatedCostUsd: 0.0035
    },
    veritasMultiAgent: {
      accuracyScore: 99.5,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "FY2025 Data Center revenue totaled $115.2B (+142% YoY), Networking reached $18.4B (+81%), and company gross margin hit 75.0% [SEC: NVDA 10-K §7].",
      latencySeconds: 8.8,
      estimatedCostUsd: 0.0142,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-NVDA-02',
    ticker: 'NVDA',
    query: "What single-source packaging and foundry bottlenecks are explicitly acknowledged in NVIDIA's 10-K risk disclosures?",
    groundTruthClaim: "NVIDIA explicitly discloses reliance on TSMC for CoWoS advanced packaging and single-source foundry fabrication, alongside high-bandwidth memory (HBM3e) suppliers, with Blackwell substrate yields and thermal limits cited as primary ramp constraints.",
    groundTruthSource: "NVIDIA Form 10-K (FY2025), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 72.0,
      hallucinationRate: 22.5,
      hasCitations: false,
      hallucinatedClaimSample: "Nvidia uses multiple foundries including Intel and Samsung for Blackwell production to eliminate single points of failure.",
      latencySeconds: 3.8,
      estimatedCostUsd: 0.0034
    },
    veritasMultiAgent: {
      accuracyScore: 98.9,
      hallucinationRate: 0.8,
      hasCitations: true,
      verifiedClaimSample: "10-K Item 1A explicitly identifies TSMC CoWoS packaging as a critical single-source dependency constraining Blackwell B200/GB200 volume [SEC: NVDA 10-K §1A].",
      latencySeconds: 9.4,
      estimatedCostUsd: 0.0156,
      feedbackLoopsRun: 1
    }
  },
  {
    id: 'BM-NVDA-03',
    ticker: 'NVDA',
    query: "What was NVIDIA's gross margin in fiscal 2025 compared to fiscal 2024?",
    groundTruthClaim: "Gross margin reached 75.0% in fiscal 2025, expanding from 72.7% in fiscal 2024.",
    groundTruthSource: "NVIDIA Form 10-K (FY2025), Item 7 Gross Margin",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 67.0,
      hallucinationRate: 25.0,
      hasCitations: false,
      hallucinatedClaimSample: "Gross margin was roughly 71% in FY25 compared to 68% in FY24.",
      latencySeconds: 3.3,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.3,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Gross margin expanded to 75.0% in FY25 vs 72.7% in FY24 on high data center software mix [SEC: NVDA 10-K §7].",
      latencySeconds: 8.6,
      estimatedCostUsd: 0.0141,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-NVDA-04',
    ticker: 'NVDA',
    query: "What was NVIDIA's total annual free cash flow generated in FY2025?",
    groundTruthClaim: "Free cash flow reached approximately $60.8 billion in fiscal 2025 on surging operating cash flows.",
    groundTruthSource: "NVIDIA Form 10-K (FY2025), Consolidated Statements of Cash Flows",
    category: 'Capex ROI',
    singleShotBaseline: {
      accuracyScore: 61.5,
      hallucinationRate: 32.0,
      hasCitations: false,
      hallucinatedClaimSample: "Free cash flow was approximately $40 billion in FY25.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 98.7,
      hallucinationRate: 0.5,
      hasCitations: true,
      verifiedClaimSample: "Free cash flow surged to $60.8B as operating cash conversion reached record highs [SEC: NVDA 10-K Cash Flows].",
      latencySeconds: 8.9,
      estimatedCostUsd: 0.0146,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-NVDA-05',
    ticker: 'NVDA',
    query: "How much did NVIDIA Networking revenue grow in FY2025?",
    groundTruthClaim: "Networking revenue grew 81% to $18.4 billion in FY2025, driven by Quantum InfiniBand and Spectrum-X Ethernet switches.",
    groundTruthSource: "NVIDIA Form 10-K (FY2025), Item 7 Networking Segment",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 63.0,
      hallucinationRate: 30.0,
      hasCitations: false,
      hallucinatedClaimSample: "Networking grew by 50% to roughly $13 billion.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.1,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Networking revenue expanded 81% to $18.4B driven by Quantum InfiniBand and Spectrum-X switches [SEC: NVDA 10-K §7].",
      latencySeconds: 8.5,
      estimatedCostUsd: 0.0140,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-NVDA-06',
    ticker: 'NVDA',
    query: "What memory components are identified as supply constraints for Blackwell architecture?",
    groundTruthClaim: "High-bandwidth memory (HBM3e) supplied by SK Hynix and Micron, alongside complex substrate assembly, are disclosed as primary capacity constraints.",
    groundTruthSource: "NVIDIA Form 10-K (FY2025), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 73.0,
      hallucinationRate: 20.0,
      hasCitations: false,
      hallucinatedClaimSample: "DDR5 and GDDR6 memory from Samsung are the primary constraints.",
      latencySeconds: 3.5,
      estimatedCostUsd: 0.0032
    },
    veritasMultiAgent: {
      accuracyScore: 98.6,
      hallucinationRate: 0.7,
      hasCitations: true,
      verifiedClaimSample: "HBM3e memory from SK Hynix and Micron is explicitly cited as a supply bottleneck for B200 and GB200 ramps [SEC: NVDA 10-K §1A].",
      latencySeconds: 9.0,
      estimatedCostUsd: 0.0150,
      feedbackLoopsRun: 0
    }
  },

  // ==========================================
  // APPLE INC. (AAPL) - 6 BENCHMARK QUERIES
  // ==========================================
  {
    id: 'BM-AAPL-01',
    ticker: 'AAPL',
    query: "Compare Apple's Services gross margin with its Products gross margin in fiscal 2024.",
    groundTruthClaim: "Apple's Services gross margin reached 74.0% (on $96.17B net sales), compared to Products gross margin of 37.1% (total company gross margin: 46.2%).",
    groundTruthSource: "Apple Form 10-K (FY2024), Item 7 MD&A Services vs Products",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 66.8,
      hallucinationRate: 26.5,
      hasCitations: false,
      hallucinatedClaimSample: "Services gross margin is around 68% while hardware is roughly 35%.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.2,
      hallucinationRate: 0.4,
      hasCitations: true,
      verifiedClaimSample: "Services gross margin expanded to 74.0% on $96.17B in sales, nearly double Products margin of 37.1% [SEC: AAPL 10-K §7].",
      latencySeconds: 8.2,
      estimatedCostUsd: 0.0139,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AAPL-02',
    ticker: 'AAPL',
    query: "What specific business and legal penalties does Apple cite regarding the European Union Digital Markets Act (DMA)?",
    groundTruthClaim: "Apple cites required changes including alternative app stores, alternative payment processors, and browser choice screens, warning of fee compression, malware risk, and potential fines of up to 10% of worldwide annual turnover.",
    groundTruthSource: "Apple Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 70.4,
      hallucinationRate: 21.0,
      hasCitations: false,
      hallucinatedClaimSample: "Apple faces fines of up to 5% of European sales under the EU Digital Services Act.",
      latencySeconds: 3.3,
      estimatedCostUsd: 0.0032
    },
    veritasMultiAgent: {
      accuracyScore: 98.6,
      hallucinationRate: 1.0,
      hasCitations: true,
      verifiedClaimSample: "Item 1A notes DMA mandates alternative app marketplaces and warns of non-compliance fines up to 10% of worldwide turnover [SEC: AAPL 10-K §1A].",
      latencySeconds: 8.9,
      estimatedCostUsd: 0.0147,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AAPL-03',
    ticker: 'AAPL',
    query: "What was Apple's total annual revenue in fiscal 2024?",
    groundTruthClaim: "Total net sales were $391.04 billion in fiscal 2024, up 2.0% from $383.29 billion in fiscal 2023.",
    groundTruthSource: "Apple Form 10-K (FY2024), Consolidated Statements of Operations",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 74.0,
      hallucinationRate: 18.0,
      hasCitations: false,
      hallucinatedClaimSample: "Total revenue was roughly $385 billion in fiscal 2024.",
      latencySeconds: 3.0,
      estimatedCostUsd: 0.0028
    },
    veritasMultiAgent: {
      accuracyScore: 99.5,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Consolidated net sales reached $391.04B (+2.0% YoY) [SEC: AAPL 10-K Financial Statements].",
      latencySeconds: 8.1,
      estimatedCostUsd: 0.0136,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AAPL-04',
    ticker: 'AAPL',
    query: "How much free cash flow did Apple generate in fiscal 2024?",
    groundTruthClaim: "Apple generated $108.8 billion in operating cash flow and over $98 billion in free cash flow in fiscal 2024.",
    groundTruthSource: "Apple Form 10-K (FY2024), Statements of Cash Flows",
    category: 'Capex ROI',
    singleShotBaseline: {
      accuracyScore: 68.0,
      hallucinationRate: 24.0,
      hasCitations: false,
      hallucinatedClaimSample: "Operating cash flow was roughly $90 billion with FCF around $80 billion.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 98.9,
      hallucinationRate: 0.5,
      hasCitations: true,
      verifiedClaimSample: "Operating cash flow was $108.8 billion with Free Cash Flow remaining near $100B [SEC: AAPL 10-K Cash Flows].",
      latencySeconds: 8.4,
      estimatedCostUsd: 0.0142,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AAPL-05',
    ticker: 'AAPL',
    query: "What was Apple's total company gross margin percentage in fiscal 2024?",
    groundTruthClaim: "Total company gross margin was 46.2% in fiscal 2024, expanding from 44.1% in fiscal 2023.",
    groundTruthSource: "Apple Form 10-K (FY2024), Item 7 Gross Margin",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 69.5,
      hallucinationRate: 22.0,
      hasCitations: false,
      hallucinatedClaimSample: "Apple's gross margin was roughly 43.5% in 2024.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0029
    },
    veritasMultiAgent: {
      accuracyScore: 99.4,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Consolidated gross margin expanded 210 bps to 46.2% on higher Services mix [SEC: AAPL 10-K §7].",
      latencySeconds: 8.3,
      estimatedCostUsd: 0.0138,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AAPL-06',
    ticker: 'AAPL',
    query: "What percentage growth did Apple Services net sales achieve in fiscal 2024?",
    groundTruthClaim: "Services net sales grew 12.9% to $96.17 billion from $85.20 billion in fiscal 2023.",
    groundTruthSource: "Apple Form 10-K (FY2024), Item 7 Services Segment",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 71.0,
      hallucinationRate: 20.0,
      hasCitations: false,
      hallucinatedClaimSample: "Services grew by approximately 9% to $90 billion.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.1,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Services net sales grew 12.9% to $96.17B driven by cloud and advertising growth [SEC: AAPL 10-K §7].",
      latencySeconds: 8.5,
      estimatedCostUsd: 0.0140,
      feedbackLoopsRun: 0
    }
  },

  // ==========================================
  // MICROSOFT CORPORATION (MSFT) - 6 BENCHMARK QUERIES
  // ==========================================
  {
    id: 'BM-MSFT-01',
    ticker: 'MSFT',
    query: "What percentage points did Azure AI contribute to Azure's 30% growth in Q4 FY24, and what was total annual Capex?",
    groundTruthClaim: "Azure AI services contributed approximately 7 percentage points of growth to Azure in Q4 FY24 (over 60,000 Azure AI customers), while total capital expenditures including finance leases were $55.7 billion.",
    groundTruthSource: "Microsoft Form 10-K (FY2024), Item 7 Intelligent Cloud",
    category: 'Capex ROI',
    singleShotBaseline: {
      accuracyScore: 62.3,
      hallucinationRate: 31.8,
      hasCitations: false,
      hallucinatedClaimSample: "Azure AI contributed approximately 3% to Azure's growth with total capex around $35 billion.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 99.0,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Azure AI contributed 7 percentage points to Azure's 30% expansion, supported by $55.7B in Capex and finance leases [SEC: MSFT 10-K §7].",
      latencySeconds: 8.4,
      estimatedCostUsd: 0.0141,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-MSFT-02',
    ticker: 'MSFT',
    query: "What was Microsoft's Intelligent Cloud revenue in fiscal 2024?",
    groundTruthClaim: "Intelligent Cloud revenue increased 19% to $105.36 billion in fiscal 2024.",
    groundTruthSource: "Microsoft Form 10-K (FY2024), Item 7 Segment Information",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 66.0,
      hallucinationRate: 26.0,
      hasCitations: false,
      hallucinatedClaimSample: "Intelligent cloud revenue was roughly $90 billion in FY24.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.3,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Intelligent Cloud revenue reached $105.36B (+19% YoY) [SEC: MSFT 10-K §7].",
      latencySeconds: 8.6,
      estimatedCostUsd: 0.0143,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-MSFT-03',
    ticker: 'MSFT',
    query: "What risks regarding the OpenAI partnership are disclosed in Microsoft's Form 10-K Item 1A?",
    groundTruthClaim: "Disagreements over IP or governance, antitrust scrutiny of equity arrangements, and dependence on OpenAI foundational models are explicitly disclosed as business risks.",
    groundTruthSource: "Microsoft Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 71.0,
      hallucinationRate: 21.0,
      hasCitations: false,
      hallucinatedClaimSample: "Microsoft has full exclusive control over OpenAI with no disclosed governance risks.",
      latencySeconds: 3.5,
      estimatedCostUsd: 0.0032
    },
    veritasMultiAgent: {
      accuracyScore: 98.7,
      hallucinationRate: 0.6,
      hasCitations: true,
      verifiedClaimSample: "Item 1A discloses regulatory scrutiny of governance and dependence on OpenAI licensing [SEC: MSFT 10-K §1A].",
      latencySeconds: 8.9,
      estimatedCostUsd: 0.0148,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-MSFT-04',
    ticker: 'MSFT',
    query: "What was Microsoft's overall operating margin in fiscal 2024?",
    groundTruthClaim: "Microsoft's operating margin was 44.6% in fiscal 2024 on $109.43 billion of operating income.",
    groundTruthSource: "Microsoft Form 10-K (FY2024), Consolidated Income Statements",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 68.0,
      hallucinationRate: 24.0,
      hasCitations: false,
      hallucinatedClaimSample: "Operating margin was roughly 39% in FY24.",
      latencySeconds: 3.3,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 99.2,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Operating margin stood at 44.6% ($109.43B operating income) [SEC: MSFT 10-K Statements].",
      latencySeconds: 8.5,
      estimatedCostUsd: 0.0142,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-MSFT-05',
    ticker: 'MSFT',
    query: "How many enterprise customers were utilizing Azure AI services as of Q4 FY24?",
    groundTruthClaim: "More than 60,000 Azure AI customers were utilizing Azure AI services as of the end of fiscal 2024.",
    groundTruthSource: "Microsoft Form 10-K (FY2024), Item 7 MD&A",
    category: 'Moat & Market Share',
    singleShotBaseline: {
      accuracyScore: 60.0,
      hallucinationRate: 35.0,
      hasCitations: false,
      hallucinatedClaimSample: "Analysts estimate around 25,000 customers use Azure AI.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0029
    },
    veritasMultiAgent: {
      accuracyScore: 99.4,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Azure AI enterprise customer count surpassed 60,000 organizations [SEC: MSFT 10-K §7].",
      latencySeconds: 8.3,
      estimatedCostUsd: 0.0139,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-MSFT-06',
    ticker: 'MSFT',
    query: "What infrastructure bottlenecks does Microsoft acknowledge regarding AI datacenter expansion?",
    groundTruthClaim: "Electrical power availability, water cooling requirements, and specialized GPU procurement constraints are cited as datacenter scaling bottlenecks.",
    groundTruthSource: "Microsoft Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 73.0,
      hallucinationRate: 19.0,
      hasCitations: false,
      hallucinatedClaimSample: "Microsoft has unlimited access to nuclear power for all datacenters.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 98.8,
      hallucinationRate: 0.4,
      hasCitations: true,
      verifiedClaimSample: "Datacenter power grid capacity and cooling constraints are explicitly recognized under Item 1A [SEC: MSFT 10-K §1A].",
      latencySeconds: 8.8,
      estimatedCostUsd: 0.0147,
      feedbackLoopsRun: 0
    }
  },

  // ==========================================
  // AMAZON.COM, INC. (AMZN) - 6 BENCHMARK QUERIES
  // ==========================================
  {
    id: 'BM-AMZN-01',
    ticker: 'AMZN',
    query: "What was AWS's operating margin in 2024 compared to 2023, and what was total AWS operating income?",
    groundTruthClaim: "AWS operating margin expanded to 37.0% in 2024 (from 27.1% in 2023), generating $39.84 billion in operating income on $107.56 billion net sales (+19%).",
    groundTruthSource: "Amazon Form 10-K (FY2024), Item 7 Segment Results",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 63.8,
      hallucinationRate: 29.5,
      hasCitations: false,
      hallucinatedClaimSample: "AWS operating margin was roughly 29% in 2024 generating about $26 billion in operating profit.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0032
    },
    veritasMultiAgent: {
      accuracyScore: 99.4,
      hallucinationRate: 0.3,
      hasCitations: true,
      verifiedClaimSample: "AWS operating income rose to $39.84B with margins expanding 990 bps to 37.0% on server life depreciation discipline [SEC: AMZN 10-K §7].",
      latencySeconds: 8.7,
      estimatedCostUsd: 0.0146,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AMZN-02',
    ticker: 'AMZN',
    query: "How much did Amazon Advertising services revenue generate in 2024?",
    groundTruthClaim: "Advertising services revenue reached $56.22 billion in 2024, growing 22% year-over-year from $46.91 billion in 2023.",
    groundTruthSource: "Amazon Form 10-K (FY2024), Item 7 Advertising Services",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 65.0,
      hallucinationRate: 28.0,
      hasCitations: false,
      hallucinatedClaimSample: "Amazon advertising was roughly $42 billion in 2024.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0029
    },
    veritasMultiAgent: {
      accuracyScore: 99.2,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Advertising sales grew 22% to $56.22B, bolstering high-margin cash flows [SEC: AMZN 10-K §7].",
      latencySeconds: 8.4,
      estimatedCostUsd: 0.0141,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AMZN-03',
    ticker: 'AMZN',
    query: "What specific remedies are sought by the FTC in its antitrust lawsuit against Amazon disclosed under Item 1A?",
    groundTruthClaim: "The FTC lawsuit alleges exclusionary conduct regarding Buy Box pricing algorithms and FBA bundling, seeking structural remedies including potential business separations.",
    groundTruthSource: "Amazon Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 71.0,
      hallucinationRate: 21.0,
      hasCitations: false,
      hallucinatedClaimSample: "The FTC is suing Amazon purely over counterfeit goods from third-party sellers.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 98.7,
      hallucinationRate: 0.5,
      hasCitations: true,
      verifiedClaimSample: "Item 1A highlights FTC lawsuits challenging Buy Box seller pricing algorithms and structural remedy risks [SEC: AMZN 10-K §1A].",
      latencySeconds: 8.9,
      estimatedCostUsd: 0.0149,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AMZN-04',
    ticker: 'AMZN',
    query: "What custom AI silicon does Amazon cite as driving AWS enterprise compute commitments?",
    groundTruthClaim: "Amazon custom silicon including Trainium and Inferentia chips are cited as cost-saving alternatives for hosting models on Amazon Bedrock.",
    groundTruthSource: "Amazon Form 10-K (FY2024), Item 7 MD&A AWS Section",
    category: 'Moat & Market Share',
    singleShotBaseline: {
      accuracyScore: 75.0,
      hallucinationRate: 16.0,
      hasCitations: false,
      hallucinatedClaimSample: "Amazon only uses NVIDIA H100 GPUs and develops no custom chips.",
      latencySeconds: 3.3,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.1,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Trainium and Inferentia custom chips are explicitly highlighted as driving AWS cloud efficiency [SEC: AMZN 10-K §7].",
      latencySeconds: 8.5,
      estimatedCostUsd: 0.0142,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AMZN-05',
    ticker: 'AMZN',
    query: "What was Amazon's total consolidated net sales figure in fiscal 2024?",
    groundTruthClaim: "Amazon's total consolidated net sales reached $637.96 billion in 2024, up 11% compared to $574.78 billion in 2023.",
    groundTruthSource: "Amazon Form 10-K (FY2024), Consolidated Statements of Operations",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 72.0,
      hallucinationRate: 20.0,
      hasCitations: false,
      hallucinatedClaimSample: "Total net sales were around $600 billion in 2024.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0029
    },
    veritasMultiAgent: {
      accuracyScore: 99.5,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Consolidated sales grew 11% to $637.96 billion across retail and cloud [SEC: AMZN 10-K Statements].",
      latencySeconds: 8.3,
      estimatedCostUsd: 0.0138,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-AMZN-06',
    ticker: 'AMZN',
    query: "What factor contributed to AWS's 990 bps operating margin expansion in 2024?",
    groundTruthClaim: "Increased useful life depreciation estimates for servers (extended from 5 to 6 years) alongside strict cost discipline drove the AWS margin to 37.0%.",
    groundTruthSource: "Amazon Form 10-K (FY2024), Item 7 Results of Operations",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 64.0,
      hallucinationRate: 31.0,
      hasCitations: false,
      hallucinatedClaimSample: "AWS margins expanded due to raising compute prices by 25%.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.0,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Server depreciation useful life extensions and cost controls expanded AWS margin to 37.0% [SEC: AMZN 10-K §7].",
      latencySeconds: 8.6,
      estimatedCostUsd: 0.0143,
      feedbackLoopsRun: 0
    }
  },

  // ==========================================
  // META PLATFORMS, INC. (META) - 6 BENCHMARK QUERIES
  // ==========================================
  {
    id: 'BM-META-01',
    ticker: 'META',
    query: "How much operating loss did Reality Labs record in 2024, and what was Family of Apps operating margin?",
    groundTruthClaim: "Reality Labs generated an operating loss of $17.73 billion in 2024 (up from $16.12B in 2023), while Family of Apps recorded an operating profit of $79.82 billion (operating margin of 49.7%). Total AI Capex was $39.24B.",
    groundTruthSource: "Meta Platforms Form 10-K (FY2024), Item 7 Segment Information",
    category: 'Moat & Market Share',
    singleShotBaseline: {
      accuracyScore: 57.5,
      hallucinationRate: 38.0,
      hasCitations: false,
      hallucinatedClaimSample: "Reality Labs lost roughly $12 billion in 2024 while Family of Apps operated at around 40% margin.",
      latencySeconds: 3.5,
      estimatedCostUsd: 0.0033
    },
    veritasMultiAgent: {
      accuracyScore: 98.7,
      hallucinationRate: 0.5,
      hasCitations: true,
      verifiedClaimSample: "Family of Apps operated at 49.7% margin ($79.82B operating income), fully absorbing Reality Labs' $17.73B operating loss [SEC: META 10-K §7].",
      latencySeconds: 9.3,
      estimatedCostUsd: 0.0154,
      feedbackLoopsRun: 1
    }
  },
  {
    id: 'BM-META-02',
    ticker: 'META',
    query: "What was Meta's total capital expenditure for AI infrastructure and servers in 2024?",
    groundTruthClaim: "Capital expenditures reached $39.24 billion in 2024, driven by aggressive investment in AI data centers, custom silicon, and server network capacity.",
    groundTruthSource: "Meta Platforms Form 10-K (FY2024), Item 7 Liquidity and Capital Resources",
    category: 'Capex ROI',
    singleShotBaseline: {
      accuracyScore: 66.0,
      hallucinationRate: 27.0,
      hasCitations: false,
      hallucinatedClaimSample: "Meta's capex was approximately $28 billion in 2024.",
      latencySeconds: 3.2,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.3,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "AI infrastructure capital expenditures totaled $39.24B in 2024 to support training clusters [SEC: META 10-K §7].",
      latencySeconds: 8.5,
      estimatedCostUsd: 0.0142,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-META-03',
    ticker: 'META',
    query: "What specific structural divestiture remedies does the FTC seek against Meta as disclosed under Item 1A?",
    groundTruthClaim: "The FTC lawsuit challenges prior acquisitions and seeks structural remedies, specifically including the potential spin-off or divestiture of Instagram and WhatsApp.",
    groundTruthSource: "Meta Platforms Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 70.0,
      hallucinationRate: 22.0,
      hasCitations: false,
      hallucinatedClaimSample: "The FTC is merely seeking minor fines under COPPA with no structural divestitures threatened.",
      latencySeconds: 3.4,
      estimatedCostUsd: 0.0031
    },
    veritasMultiAgent: {
      accuracyScore: 98.9,
      hallucinationRate: 0.4,
      hasCitations: true,
      verifiedClaimSample: "Item 1A explicitly cites FTC litigation seeking divestiture of Instagram and WhatsApp [SEC: META 10-K §1A].",
      latencySeconds: 8.8,
      estimatedCostUsd: 0.0147,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-META-04',
    ticker: 'META',
    query: "What was Meta's total revenue for the Family of Apps segment in 2024?",
    groundTruthClaim: "Family of Apps segment revenue was $160.48 billion in 2024, compared to $133.01 billion in 2023.",
    groundTruthSource: "Meta Platforms Form 10-K (FY2024), Item 7 Segment Information",
    category: 'Revenue Segments',
    singleShotBaseline: {
      accuracyScore: 69.0,
      hallucinationRate: 23.0,
      hasCitations: false,
      hallucinatedClaimSample: "Family of Apps generated roughly $145 billion in 2024.",
      latencySeconds: 3.1,
      estimatedCostUsd: 0.0029
    },
    veritasMultiAgent: {
      accuracyScore: 99.4,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Family of Apps ad-driven revenue rose to $160.48B (+20.7% YoY) [SEC: META 10-K §7].",
      latencySeconds: 8.3,
      estimatedCostUsd: 0.0139,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-META-05',
    ticker: 'META',
    query: "How much revenue did Reality Labs generate in 2024 compared to its operating loss?",
    groundTruthClaim: "Reality Labs generated $2.14 billion in revenue against an operating loss of $17.73 billion in 2024.",
    groundTruthSource: "Meta Platforms Form 10-K (FY2024), Item 7 Results of Operations",
    category: 'Margin Divergence',
    singleShotBaseline: {
      accuracyScore: 62.0,
      hallucinationRate: 33.0,
      hasCitations: false,
      hallucinatedClaimSample: "Reality Labs had $5 billion in revenue and lost $10 billion.",
      latencySeconds: 3.3,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 99.1,
      hallucinationRate: 0.0,
      hasCitations: true,
      verifiedClaimSample: "Reality Labs generated $2.14B in revenue against an operating burn of $17.73B [SEC: META 10-K §7].",
      latencySeconds: 8.6,
      estimatedCostUsd: 0.0144,
      feedbackLoopsRun: 0
    }
  },
  {
    id: 'BM-META-06',
    ticker: 'META',
    query: "What potential fines under the EU Digital Services Act does Meta disclose under Item 1A?",
    groundTruthClaim: "Non-compliance with the EU Digital Services Act and AI regulations carries potential administrative fines of up to 6% of worldwide annual turnover.",
    groundTruthSource: "Meta Platforms Form 10-K (FY2024), Item 1A Risk Factors",
    category: 'Regulatory Exposure',
    singleShotBaseline: {
      accuracyScore: 68.0,
      hallucinationRate: 25.0,
      hasCitations: false,
      hallucinatedClaimSample: "Fines under the EU regulations are capped at 1% of European profits.",
      latencySeconds: 3.3,
      estimatedCostUsd: 0.0030
    },
    veritasMultiAgent: {
      accuracyScore: 98.8,
      hallucinationRate: 0.5,
      hasCitations: true,
      verifiedClaimSample: "Item 1A warns DSA penalties can reach up to 6% of global annual turnover [SEC: META 10-K §1A].",
      latencySeconds: 8.7,
      estimatedCostUsd: 0.0146,
      feedbackLoopsRun: 0
    }
  }
];
