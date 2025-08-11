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
    <div className="token-discovery-page">
      <div className="discovery-header">
        <div className="header-content">
          <h1>Token Discovery</h1>
          <p>Discover trending and promising cryptocurrency tokens</p>
        </div>
        
        <div className="discovery-stats">
          <div className="stat-item">
            <TrendingUp className="stat-icon trending" size={16} />
            <span className="stat-value">{trendingCount}</span>
            <span className="stat-label">Trending</span>
          </div>
          <div className="stat-item">
            <Zap className="stat-icon new" size={16} />
            <span className="stat-value">{newCount}</span>
            <span className="stat-label">New</span>
          </div>
          <div className="stat-item">
            <TrendingUp className="stat-icon gainers" size={16} />
            <span className="stat-value">{topGainersCount}</span>
            <span className="stat-label">Top Gainers</span>
          </div>
        </div>
      </div>

      <div className="discovery-content">
        <div className="discovery-controls">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search tokens by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="filter-section">
            <TokenFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <div className="results-count">
            Showing {filteredTokens.length} tokens
            {searchTerm && (
              <span className="search-term"> for "{searchTerm}"</span>
            )}
            {activeCategory !== 'all' && (
              <span className="category-filter"> in {activeCategory}</span>
            )}
          </div>
          
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1"/>
                <rect x="9" y="1" width="6" height="6" rx="1"/>
                <rect x="1" y="9" width="6" height="6" rx="1"/>
                <rect x="9" y="9" width="6" height="6" rx="1"/>
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="3" width="12" height="2" rx="1"/>
                <rect x="2" y="7" width="12" height="2" rx="1"/>
                <rect x="2" y="11" width="12" height="2" rx="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Token Grid/List */}
        <div className="tokens-container">
          <TokenGrid 
            tokens={filteredTokens}
            viewMode={viewMode}
          />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="action-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn trending-btn">
                <TrendingUp size={16} />
                View All Trending
              </button>
              <button className="action-btn new-btn">
                <Zap size={16} />
                View New Tokens
              </button>
              <button className="action-btn filter-btn">
                <Filter size={16} />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDiscovery;