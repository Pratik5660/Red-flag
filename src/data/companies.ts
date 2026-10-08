import { CompanyProfile, LiveMarketData } from '../types';

export const COMPANIES: Record<string, { profile: CompanyProfile; marketData: LiveMarketData }> = {
  AAPL: {
    profile: {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      cik: '0000320193',
      exchange: 'NASDAQ',
      sector: 'Information Technology',
      industry: 'Consumer Electronics & Hardware',
      auditor: 'Ernst & Young LLP',
      auditOpinion: 'Unqualified (Clean Opinion)',
      keyAuditMatters: [
        'Valuation of revenue recognition on multi-element bundled arrangements (Hardware + Services)',
        'Accrual for uncertain tax positions & global minimum tax provisions'
      ],
      fiscalYearEnd: 'September 30',
      secFilingDate: 'October 31, 2025',
      accessionNumber: '0000320193-25-000108',
      description: 'Designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services.'
    },
    marketData: {
      ticker: 'AAPL',
      price: 234.85,
      change: 1.72,
      changePercent: 0.74,
      marketCap: 3582.4, // $3.58T
      enterpriseValue: 3624.1,
      peRatio: 33.8,
      forwardPe: 29.4,
      evEbitda: 25.1,
      sharesOutstanding: 15.25,
      volume24h: '48.2M',
      high52w: 242.10,
      low52w: 164.08,
      lastReconciledTimestamp: '2026-10-07 10:48:12 EDT',
      reconciliationSource: 'SEC EDGAR 10-K / Yahoo Finance Real-Time API'
    }
  },

  MSFT: {
    profile: {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      cik: '0000789019',
      exchange: 'NASDAQ',
      sector: 'Information Technology',
      industry: 'Systems Software & Cloud Infrastructure',
      auditor: 'Deloitte & Touche LLP',
      auditOpinion: 'Unqualified (Clean Opinion)',
      keyAuditMatters: [
        'Capitalization and useful lives of cloud computing server and network assets',
        'Commercial cloud revenue recognition under complex multi-year enterprise commitments'
      ],
      fiscalYearEnd: 'June 30',
      secFilingDate: 'July 30, 2025',
      accessionNumber: '0000789019-25-000084',
      description: 'Develops and supports software, services, devices and solutions worldwide, including Microsoft Cloud, Azure, Office 365, and AI Infrastructure.'
    },
    marketData: {
      ticker: 'MSFT',
      price: 448.20,
      change: -2.15,
      changePercent: -0.48,
      marketCap: 3328.6, // $3.33T
      enterpriseValue: 3381.2,
      peRatio: 36.2,
      forwardPe: 31.0,
      evEbitda: 23.4,
      sharesOutstanding: 7.43,
      volume24h: '21.4M',
      high52w: 468.35,
      low52w: 388.04,
      lastReconciledTimestamp: '2026-10-07 10:49:05 EDT',
      reconciliationSource: 'SEC EDGAR 10-K / Yahoo Finance Real-Time API'
    }
  },

  NVDA: {
    profile: {
      ticker: 'NVDA',
      name: 'NVIDIA Corporation',
      cik: '0001045810',
      exchange: 'NASDAQ',
      sector: 'Information Technology',
      industry: 'Semiconductors & Accelerated Computing',
      auditor: 'PricewaterhouseCoopers LLP',
      auditOpinion: 'Unqualified (Clean Opinion)',
      keyAuditMatters: [
        'Revenue recognition & customer return reserves on high-density Hopper/Blackwell compute systems',
        'Advance purchase commitments and long-term wafer manufacturing obligations with foundries'
      ],
      fiscalYearEnd: 'January 28',
      secFilingDate: 'February 21, 2026',
      accessionNumber: '0001045810-26-000021',
      description: 'Pioneered GPU-accelerated computing to solve computational problems across AI architectures, hyperscale data centers, and autonomous systems.'
    },
    marketData: {
      ticker: 'NVDA',
      price: 138.90,
      change: 4.20,
      changePercent: 3.12,
      marketCap: 3394.8, // $3.39T
      enterpriseValue: 3372.4,
      peRatio: 48.6,
      forwardPe: 34.2,
      evEbitda: 36.8,
      sharesOutstanding: 24.44,
      volume24h: '78.9M',
      high52w: 153.12,
      low52w: 75.60,
      lastReconciledTimestamp: '2026-10-07 10:50:22 EDT',
      reconciliationSource: 'SEC EDGAR 10-K / Yahoo Finance Real-Time API'
    }
  },

  GOOGL: {
    profile: {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      cik: '0001652044',
      exchange: 'NASDAQ',
      sector: 'Communication Services',
      industry: 'Interactive Media & Services',
      auditor: 'Ernst & Young LLP',
      auditOpinion: 'Unqualified (Clean Opinion)',
      keyAuditMatters: [
        'Accounting for contingencies related to domestic and European regulatory antitrust matters',
        'Useful life assessment of technical infrastructure and TPU AI accelerator assets'
      ],
      fiscalYearEnd: 'December 31',
      secFilingDate: 'February 03, 2026',
      accessionNumber: '0001652044-26-000014',
      description: 'Holding company whose businesses include Google Services (Search, YouTube, Android, Chrome), Google Cloud, and Other Bets.'
    },
    marketData: {
      ticker: 'GOOGL',
      price: 182.40,
      change: 0.95,
      changePercent: 0.52,
      marketCap: 2261.7, // $2.26T
      enterpriseValue: 2192.5,
      peRatio: 23.4,
      forwardPe: 20.8,
      evEbitda: 16.2,
      sharesOutstanding: 12.40,
      volume24h: '28.1M',
      high52w: 191.75,
      low52w: 130.65,
      lastReconciledTimestamp: '2026-10-07 10:49:40 EDT',
      reconciliationSource: 'SEC EDGAR 10-K / Yahoo Finance Real-Time API'
    }
  },

  WMT: {
    profile: {
      ticker: 'WMT',
      name: 'Walmart Inc.',
      cik: '0000104169',
      exchange: 'NYSE',
      sector: 'Consumer Staples',
      industry: 'Hypermarkets & Supercenters',
      auditor: 'Ernst & Young LLP',
      auditOpinion: 'Unqualified (Clean Opinion)',
      keyAuditMatters: [
        'Physical inventory count procedures and shrinkage accrual estimates across retail centers',
        'Vendor allowances and supply chain rebate income recognition timing'
      ],
      fiscalYearEnd: 'January 31',
      secFilingDate: 'March 20, 2026',
      accessionNumber: '0000104169-26-000033',
      description: 'Engages in retail and wholesale operations operating a chain of hypermarkets, discount department stores, and grocery stores globally.'
    },
    marketData: {
      ticker: 'WMT',
      price: 94.30,
      change: -0.45,
      changePercent: -0.47,
      marketCap: 757.2, // $757B
      enterpriseValue: 814.9,
      peRatio: 34.1,
      forwardPe: 28.5,
      evEbitda: 17.5,
      sharesOutstanding: 8.03,
      volume24h: '18.2M',
      high52w: 96.80,
      low52w: 59.20,
      lastReconciledTimestamp: '2026-10-07 10:51:14 EDT',
      reconciliationSource: 'SEC EDGAR 10-K / Yahoo Finance Real-Time API'
    }
  },

  TSLA: {
    profile: {
      ticker: 'TSLA',
      name: 'Tesla, Inc.',
      cik: '0001318605',
      exchange: 'NASDAQ',
      sector: 'Consumer Discretionary',
      industry: 'Automobile Manufacturers & Clean Energy',
      auditor: 'PricewaterhouseCoopers LLP',
      auditOpinion: 'Unqualified (Clean Opinion)',
      keyAuditMatters: [
        'Automotive warranty accrual modeling and recall liability estimates',
        'Full Self-Driving (FSD) deferred revenue recognition and performance obligation releases'
      ],
      fiscalYearEnd: 'December 31',
      secFilingDate: 'January 29, 2026',
      accessionNumber: '0001318605-26-000018',
      description: 'Designs, manufactures, and sells electric vehicles, energy storage systems, solar roofs, and develops autonomous driving and AI robotics technologies.'
    },
    marketData: {
      ticker: 'TSLA',
      price: 242.70,
      change: -5.30,
      changePercent: -2.14,
      marketCap: 772.3, // $772B
      enterpriseValue: 756.8,
      peRatio: 64.5,
      forwardPe: 52.0,
      evEbitda: 42.1,
      sharesOutstanding: 3.18,
      volume24h: '64.5M',
      high52w: 271.00,
      low52w: 138.80,
      lastReconciledTimestamp: '2026-10-07 10:51:48 EDT',
      reconciliationSource: 'SEC EDGAR 10-K / Yahoo Finance Real-Time API'
    }
  }
};
