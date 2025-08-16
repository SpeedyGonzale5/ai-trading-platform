import React, { useState, useEffect } from 'react';
import TokenGrid from './TokenGrid';
import TokenFilters from './TokenFilters';
import { mockTokens, generateRandomPrice } from '../../data/mockData';
import { Search, TrendingUp, Zap, Filter } from 'lucide-react';

const TokenDiscovery = () => {
  const [tokens, setTokens] = useState(mockTokens);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens =>
        prevTokens.map(token => ({
          ...token,
          price: generateRandomPrice(token.price, 0.01),
          change24h: token.change24h + (Math.random() - 0.5) * 2,
          volume24h: token.volume24h * (1 + (Math.random() - 0.5) * 0.05),
          trending: Math.random() > 0.7 ? true : token.trending
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter and sort tokens
  const filteredTokens = tokens
    .filter(token => {
      const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || token.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change24h - a.change24h;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'marketcap':
          return b.marketCap - a.marketCap;
        case 'trending':
        default:
          // Sort by trending first, then by price change
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.change24h - a.change24h;
      }
    });

  const categories = ['all', ...new Set(tokens.map(token => token.category))];

  const trendingCount = tokens.filter(t => t.trending).length;
  const newCount = tokens.filter(t => t.new).length;
  const topGainersCount = tokens.filter(t => t.change24h > 5).length;

  return (
    <div className="modern-pulse-page">
      {/* Pulse Header */}
      <div className="pulse-header">
        <h1>Pulse</h1>
        <div className="pulse-controls">
          <div className="display-controls">
            <button className="display-btn active">
              <span className="display-icon">≡</span>
              <span>Display</span>
              <span className="chevron">⌄</span>
            </button>
            <button className="sound-btn">
              <span className="sound-icon">🔊</span>
            </button>
            <button className="settings-btn">
              <span className="settings-icon">⚙</span>
            </button>
          </div>
          <div className="quick-buy">
            <button className="quick-buy-btn">
              <span>Quick Buy 0.0</span>
              <span className="quick-buy-icon">≡</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pulse Sections */}
      <div className="pulse-sections">
        {/* New Pairs Section */}
        <div className="pulse-section">
          <div className="section-header">
            <div className="section-title">
              <span className="section-icon">⚡</span>
              <span>New Pairs</span>
              <span className="count-badge">0</span>
            </div>
            <div className="section-controls">
              <button className="preset-btn active">≡ P1</button>
              <button className="preset-btn">P2</button>
              <button className="preset-btn">P3</button>
              <button className="sort-btn">
                <span>≡</span>
              </button>
            </div>
          </div>
          
          <div className="token-grid">
            {filteredTokens.slice(0, 6).map((token) => (
              <div key={token.id} className="token-card new-pair">
                <div className="token-header">
                  <div className="token-info">
                    <span className="token-logo">{token.logo}</span>
                    <div className="token-details">
                      <div className="token-symbol">{token.symbol}</div>
                      <div className="token-name">{token.name.slice(0, 10)}...</div>
                    </div>
                  </div>
                  <div className="token-actions">
                    <button className="watch-btn">👁</button>
                    <button className="more-btn">⚙</button>
                  </div>
                </div>
                
                <div className="token-metrics">
                  <div className="metric">
                    <span className="metric-label">MC</span>
                    <span className="metric-value">${(token.marketCap / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">v</span>
                    <span className="metric-value">${(token.volume24h / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                <div className="token-chart">
                  <div className="mini-chart">
                    <svg width="100%" height="40" viewBox="0 0 100 40">
                      <path
                        d="M5,35 Q25,20 45,25 T85,15"
                        stroke={token.change24h > 0 ? "#10b981" : "#ef4444"}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                <div className="token-footer">
                  <div className="token-time">
                    <span className="age">0s</span>
                    <span className="chain-icon">🔗</span>
                    <span className="volume">💧 {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%</span>
                  </div>
                  <button className="buy-btn">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Stretch Section */}
        <div className="pulse-section">
          <div className="section-header">
            <div className="section-title">
              <span className="section-icon">⏰</span>
              <span>Final Stretch</span>
              <span className="count-badge">0</span>
            </div>
            <div className="section-controls">
              <button className="preset-btn active">≡ P1</button>
              <button className="preset-btn">P2</button>
              <button className="preset-btn">P3</button>
              <button className="sort-btn">
                <span>≡</span>
              </button>
            </div>
          </div>
          
          <div className="token-grid">
            {filteredTokens.slice(6, 12).map((token) => (
              <div key={token.id} className="token-card final-stretch">
                <div className="token-header">
                  <div className="token-info">
                    <span className="token-logo">{token.logo}</span>
                    <div className="token-details">
                      <div className="token-symbol">{token.symbol}</div>
                      <div className="token-name">{token.name.slice(0, 10)}...</div>
                    </div>
                  </div>
                  <div className="token-actions">
                    <button className="watch-btn">👁</button>
                    <button className="more-btn">⚙</button>
                  </div>
                </div>
                
                <div className="token-metrics">
                  <div className="metric">
                    <span className="metric-label">MC</span>
                    <span className="metric-value">${(token.marketCap / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">v</span>
                    <span className="metric-value">${(token.volume24h / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                <div className="token-chart">
                  <div className="mini-chart">
                    <svg width="100%" height="40" viewBox="0 0 100 40">
                      <path
                        d="M5,35 Q25,30 45,15 T85,10"
                        stroke={token.change24h > 0 ? "#10b981" : "#ef4444"}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                <div className="token-footer">
                  <div className="token-time">
                    <span className="age">6h</span>
                    <span className="chain-icon">🔗</span>
                    <span className="volume">💧 {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%</span>
                  </div>
                  <button className="buy-btn">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Migrated Section */}
        <div className="pulse-section">
          <div className="section-header">
            <div className="section-title">
              <span className="section-icon">🔄</span>
              <span>Migrated</span>
              <span className="count-badge">0</span>
            </div>
            <div className="section-controls">
              <button className="preset-btn active">≡ P1</button>
              <button className="preset-btn">P2</button>
              <button className="preset-btn">P3</button>
              <button className="sort-btn">
                <span>≡</span>
              </button>
            </div>
          </div>
          
          <div className="token-grid">
            {filteredTokens.slice(12, 18).map((token) => (
              <div key={token.id} className="token-card migrated">
                <div className="token-header">
                  <div className="token-info">
                    <span className="token-logo">{token.logo}</span>
                    <div className="token-details">
                      <div className="token-symbol">{token.symbol}</div>
                      <div className="token-name">{token.name.slice(0, 10)}...</div>
                    </div>
                  </div>
                  <div className="token-actions">
                    <button className="watch-btn">👁</button>
                    <button className="more-btn">⚙</button>
                  </div>
                </div>
                
                <div className="token-metrics">
                  <div className="metric">
                    <span className="metric-label">MC</span>
                    <span className="metric-value">${(token.marketCap / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">v</span>
                    <span className="metric-value">${(token.volume24h / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                <div className="token-chart">
                  <div className="mini-chart">
                    <svg width="100%" height="40" viewBox="0 0 100 40">
                      <path
                        d="M5,25 Q25,15 45,20 T85,18"
                        stroke={token.change24h > 0 ? "#10b981" : "#ef4444"}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                <div className="token-footer">
                  <div className="token-time">
                    <span className="age">1m</span>
                    <span className="chain-icon">🔗</span>
                    <span className="volume">💧 {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%</span>
                  </div>
                  <button className="buy-btn">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDiscovery;