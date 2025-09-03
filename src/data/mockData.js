// Mock data for the stock trading platform

// Portfolio data with current holdings
export const mockPortfolio = {
  totalValue: 127840.50,
  totalChange24h: 4.2,
  totalChangePercent24h: 3.4,
  totalChangeDollar24h: 4180.20,
  tokens: [
    {
      id: 'apple',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      logo: '🍎',
      balance: 435.2,
      price: 186.12,
      change24h: 2.1,
      value: 81005.74,
      allocation: 63.3
    },
    {
      id: 'google',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      logo: '🔍',
      balance: 245.8,
      price: 143.95,
      change24h: 1.4,
      value: 35387.67,
      allocation: 27.7
    },
    {
      id: 'meta',
      symbol: 'META',
      name: 'Meta Platforms',
      logo: '📘',
      balance: 176.5,
      price: 51.45,
      change24h: -1.2,
      value: 9083.15,
      allocation: 7.1
    },
    {
      id: 'amazon',
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      logo: '📦',
      balance: 15.67,
      price: 145.60,
      change24h: 0.8,
      value: 2281.55,
      allocation: 1.8
    },
    {
      id: 'tesla',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      logo: '⚡',
      balance: 4.12,
      price: 247.83,
      change24h: -2.1,
      value: 1020.64,
      allocation: 0.8
    }
  ]
};

// Historical portfolio performance data (last 30 days)
export const mockPortfolioHistory = [
  { date: '2024-01-15', value: 95420.30 },
  { date: '2024-01-16', value: 97234.50 },
  { date: '2024-01-17', value: 94567.80 },
  { date: '2024-01-18', value: 98345.60 },
  { date: '2024-01-19', value: 101234.70 },
  { date: '2024-01-20', value: 99876.40 },
  { date: '2024-01-21', value: 103456.20 },
  { date: '2024-01-22', value: 105678.90 },
  { date: '2024-01-23', value: 107890.30 },
  { date: '2024-01-24', value: 104567.80 },
  { date: '2024-01-25', value: 108234.50 },
  { date: '2024-01-26', value: 110456.70 },
  { date: '2024-01-27', value: 112678.90 },
  { date: '2024-01-28', value: 115234.60 },
  { date: '2024-01-29', value: 118456.80 },
  { date: '2024-01-30', value: 120678.30 },
  { date: '2024-01-31', value: 123456.70 },
  { date: '2024-02-01', value: 125678.90 },
  { date: '2024-02-02', value: 127234.50 },
  { date: '2024-02-03', value: 124567.80 },
  { date: '2024-02-04', value: 126789.30 },
  { date: '2024-02-05', value: 128345.60 },
  { date: '2024-02-06', value: 125678.20 },
  { date: '2024-02-07', value: 127890.40 },
  { date: '2024-02-08', value: 129456.70 },
  { date: '2024-02-09', value: 126789.90 },
  { date: '2024-02-10', value: 128234.50 },
  { date: '2024-02-11', value: 125890.30 },
  { date: '2024-02-12', value: 127456.80 },
  { date: '2024-02-13', value: 127840.50 }
];

// Recent transactions
export const mockTransactions = [
  {
    id: '1',
    type: 'buy',
    token: 'AMZN',
    tokenName: 'Amazon.com Inc.',
    amount: 2.5,
    price: 145.60,
    total: 364.00,
    timestamp: '2024-02-13T10:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'sell',
    token: 'META',
    tokenName: 'Meta Platforms',
    amount: 12,
    price: 320.45,
    total: 384.54,
    timestamp: '2024-02-13T09:15:00Z',
    status: 'completed'
  },
  {
    id: '3',
    type: 'buy',
    token: 'GOOGL',
    tokenName: 'Alphabet Inc.',
    amount: 10,
    price: 143.95,
    total: 1439.50,
    timestamp: '2024-02-12T16:45:00Z',
    status: 'completed'
  },
  {
    id: '4',
    type: 'sell',
    token: 'TSLA',
    tokenName: 'Tesla Inc.',
    amount: 5,
    price: 247.83,
    total: 1239.15,
    timestamp: '2024-02-12T14:20:00Z',
    status: 'completed'
  },
  {
    id: '5',
    type: 'buy',
    token: 'AAPL',
    tokenName: 'Apple Inc.',
    amount: 25,
    price: 186.12,
    total: 4653.00,
    timestamp: '2024-02-11T11:30:00Z',
    status: 'completed'
  }
];

// Stock discovery data
export const mockTokens = [
  {
    id: 'apple',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: '🍎',
    price: 186.12,
    change24h: 2.1,
    volume24h: 152345678,
    marketCap: 2847623456789,
    category: 'Technology',
    trending: true,
    new: false,
    description: 'The world\'s most valuable technology company'
  },
  {
    id: 'google',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    logo: '🔍',
    price: 143.95,
    change24h: 1.7,
    volume24h: 89345678,
    marketCap: 1841234567890,
    category: 'Technology',
    trending: true,
    new: false,
    description: 'Leading search engine and cloud services provider'
  },
  {
    id: 'meta',
    symbol: 'META',
    name: 'Meta Platforms',
    logo: '📘',
    price: 51.45,
    change24h: -1.2,
    volume24h: 234567890,
    marketCap: 1345678901,
    category: 'Technology',
    trending: true,
    new: false,
    description: 'Leading social media and virtual reality platform'
  },
  {
    id: 'amazon',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    logo: '📦',
    price: 145.60,
    change24h: 0.8,
    volume24h: 456789012,
    marketCap: 1534567890,
    category: 'Consumer Discretionary',
    trending: true,
    new: false,
    description: 'Leading e-commerce and cloud computing company'
  },
  {
    id: 'tesla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    logo: '⚡',
    price: 247.83,
    change24h: -2.1,
    volume24h: 567890123,
    marketCap: 823456789,
    category: 'Automotive',
    trending: true,
    new: false,
    description: 'Leading electric vehicle and energy company'
  },
  {
    id: 'microsoft',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    logo: '🪟',
    price: 423.42,
    change24h: 1.3,
    volume24h: 345678901,
    marketCap: 3145678901,
    category: 'Technology',
    trending: true,
    new: false,
    description: 'Leading software and cloud services company'
  },
  {
    id: 'nvidia',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    logo: '🎮',
    price: 895.45,
    change24h: 3.2,
    volume24h: 123456789,
    marketCap: 2234567890,
    category: 'Technology',
    trending: true,
    new: false,
    description: 'Leading AI and graphics processing company'
  },
  {
    id: 'netflix',
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    logo: '📺',
    price: 432.15,
    change24h: 2.4,
    volume24h: 234567890,
    marketCap: 189456789012,
    category: 'Communication Services',
    trending: true,
    new: false,
    description: 'Leading streaming entertainment platform'
  },
  {
    id: 'paypal',
    symbol: 'PYPL',
    name: 'PayPal Holdings',
    logo: '💳',
    price: 78.60,
    change24h: -0.8,
    volume24h: 1234567890,
    marketCap: 89345678901,
    category: 'Financial Services',
    trending: false,
    new: false,
    description: 'Leading digital payments platform'
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    logo: '🏔️',
    price: 34.78,
    change24h: 4.6,
    volume24h: 456789012,
    marketCap: 12345678901,
    category: 'Layer 1',
    trending: false,
    new: false,
    description: 'Platform for decentralized applications and custom blockchains'
  },
  {
    id: 'immutable',
    symbol: 'IMX',
    name: 'Immutable X',
    logo: '🎮',
    price: 1.87,
    change24h: 23.4,
    volume24h: 89012345,
    marketCap: 1890123456,
    category: 'Gaming',
    trending: true,
    new: true,
    description: 'NFT scaling solution for gaming'
  },
  {
    id: 'apecoin',
    symbol: 'APE',
    name: 'ApeCoin',
    logo: '🐒',
    price: 2.34,
    change24h: -8.7,
    volume24h: 123456789,
    marketCap: 890123456,
    category: 'Gaming',
    trending: false,
    new: false,
    description: 'Token for APE ecosystem and metaverse projects'
  },
  {
    id: 'render',
    symbol: 'RNDR',
    name: 'Render Token',
    logo: '🎨',
    price: 8.92,
    change24h: 18.6,
    volume24h: 234567890,
    marketCap: 3456789012,
    category: 'AI',
    trending: true,
    new: true,
    description: 'Distributed GPU rendering network'
  },
  {
    id: 'ocean',
    symbol: 'OCEAN',
    name: 'Ocean Protocol',
    logo: '🌊',
    price: 0.67,
    change24h: 11.2,
    volume24h: 67890123,
    marketCap: 456789012,
    category: 'AI',
    trending: true,
    new: false,
    description: 'Decentralized data exchange protocol'
  },
  {
    id: 'fetch',
    symbol: 'FET',
    name: 'Fetch.ai',
    logo: '🤖',
    price: 1.23,
    change24h: 9.8,
    volume24h: 45678901,
    marketCap: 234567890,
    category: 'AI',
    trending: true,
    new: false,
    description: 'Autonomous economic agents platform'
  },
  {
    id: 'filecoin',
    symbol: 'FIL',
    name: 'Filecoin',
    logo: '📁',
    price: 5.67,
    change24h: -4.3,
    volume24h: 345678901,
    marketCap: 2345678901,
    category: 'Storage',
    trending: false,
    new: false,
    description: 'Decentralized storage network'
  }
];

// Economic calendar events
export const mockEconomicEvents = [
  {
    id: '1',
    title: 'Federal Reserve Interest Rate Decision',
    date: '2024-02-14',
    time: '14:00',
    impact: 'high',
    aiScore: 8.5,
    prediction: 'Likely to maintain current rates, potentially bullish for crypto',
    category: 'monetary-policy'
  },
  {
    id: '2',
    title: 'US Consumer Price Index (CPI)',
    date: '2024-02-15',
    time: '08:30',
    impact: 'high',
    aiScore: 7.8,
    prediction: 'Lower than expected inflation could boost risk assets',
    category: 'inflation'
  },
  {
    id: '3',
    title: 'Bitcoin ETF Decision Deadline',
    date: '2024-02-16',
    time: '16:00',
    impact: 'very-high',
    aiScore: 9.2,
    prediction: 'Approval would be extremely bullish for Bitcoin',
    category: 'regulatory'
  },
  {
    id: '4',
    title: 'Ethereum Shanghai Upgrade Completion',
    date: '2024-02-18',
    time: '12:00',
    impact: 'high',
    aiScore: 8.1,
    prediction: 'Could reduce staking selling pressure, bullish for ETH',
    category: 'technical'
  }
];

// Social media / Twitter feed data
export const mockSocialFeed = [
  {
    id: '1',
    platform: 'twitter',
    username: '@whale_tracker',
    content: '🚨 WHALE ALERT: 2,500 BTC moved from unknown wallet to Coinbase. Possible selling pressure incoming.',
    timestamp: '2024-02-13T11:45:00Z',
    engagement: 1248,
    sentiment: 'bearish',
    verified: true
  },
  {
    id: '2',
    platform: 'twitter',
    username: '@crypto_analyst_pro',
    content: 'ETH breaking out of the ascending triangle pattern. Target $3,200 if we hold above $2,800 support.',
    timestamp: '2024-02-13T11:30:00Z',
    engagement: 892,
    sentiment: 'bullish',
    verified: true
  },
  {
    id: '3',
    platform: 'twitter',
    username: '@defi_updates',
    content: 'New DeFi protocol launched on Arbitrum with 2000% APY. DYOR but looks promising for early adopters.',
    timestamp: '2024-02-13T11:15:00Z',
    engagement: 456,
    sentiment: 'neutral',
    verified: false
  },
  {
    id: '4',
    platform: 'twitter',
    username: '@market_maker_mm',
    content: 'Market sentiment extremely greedy right now. Fear & Greed Index at 82. Time to be cautious?',
    timestamp: '2024-02-13T10:45:00Z',
    engagement: 678,
    sentiment: 'bearish',
    verified: true
  }
];

// Whale tracking data
export const mockWhaleTransactions = [
  {
    id: '1',
    wallet: '0x1234...abcd',
    action: 'bought',
    token: 'BTC',
    amount: 156.7,
    usdValue: 6789234.56,
    timestamp: '2024-02-13T11:20:00Z',
    exchange: 'Binance'
  },
  {
    id: '2',
    wallet: '0x5678...efgh',
    action: 'sold',
    token: 'ETH',
    amount: 2340.5,
    usdValue: 6654832.45,
    timestamp: '2024-02-13T10:55:00Z',
    exchange: 'Coinbase Pro'
  },
  {
    id: '3',
    wallet: '0x9012...ijkl',
    action: 'transferred',
    token: 'USDT',
    amount: 10000000,
    usdValue: 10000000,
    timestamp: '2024-02-13T10:30:00Z',
    exchange: 'Cold Storage'
  }
];

// Trading pairs for the trading interface
export const mockTradingPairs = [
  { symbol: 'AAPL', price: 186.12, change24h: 2.1, volume: 152345678 },
  { symbol: 'GOOGL', price: 143.95, change24h: 1.7, volume: 89345678 },
  { symbol: 'META', price: 51.45, change24h: -1.2, volume: 234567890 },
  { symbol: 'AMZN', price: 145.60, change24h: 0.8, volume: 123456789 },
  { symbol: 'TSLA', price: 247.83, change24h: -2.1, volume: 87654321 }
];

// Market sentiment indicators
export const mockMarketSentiment = {
  fearGreedIndex: 82,
  fearGreedLabel: 'Extreme Greed',
  socialSentiment: 'Bullish',
  socialScore: 76,
  whaleActivity: 'High Buying',
  technicalIndicator: 'Bullish',
  overallSentiment: 'Bullish'
};

// Utility function to generate random price movements
export const generateRandomPrice = (basePrice, volatility = 0.05) => {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
};

// Utility function to format currency
export const formatCurrency = (amount, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

// Utility function to format percentage
export const formatPercentage = (percentage, decimals = 2) => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(decimals)}%`;
};