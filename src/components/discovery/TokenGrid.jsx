import React, { useState } from 'react';
import TokenCard from './TokenCard';
import TokenListItem from './TokenListItem';
import { TrendingUp, Zap, Star } from 'lucide-react';

const TokenGrid = ({ tokens, viewMode }) => {
  const [favorites, setFavorites] = useState(['bitcoin', 'ethereum']);
  const [selectedTokens, setSelectedTokens] = useState([]);

  const toggleFavorite = (tokenId) => {
    setFavorites(prev =>
      prev.includes(tokenId)
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const toggleSelection = (tokenId) => {
    setSelectedTokens(prev =>
      prev.includes(tokenId)
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const handleBuyToken = (token) => {
    // In a real app, this would navigate to trading interface or open a buy modal
    console.log('Buy token:', token);
    alert(`Redirecting to buy ${token.symbol}...`);
  };

  const handleTokenClick = (token) => {
    // In a real app, this would show token details or navigate to token page
    console.log('Token clicked:', token);
  };

  if (tokens.length === 0) {
    return (
      <div className="empty-tokens">
        <div className="empty-icon">🔍</div>
        <h3>No tokens found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  // Group tokens by category for better organization
  const groupedTokens = tokens.reduce((groups, token) => {
    const category = token.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(token);
    return groups;
  }, {});

  const categoryOrder = ['Layer 1', 'Layer 2', 'DeFi', 'AI', 'Gaming', 'Oracle', 'Storage'];
  const sortedCategories = Object.keys(groupedTokens).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  if (viewMode === 'list') {
    return (
      <div className="tokens-list-view">
        {/* List Headers */}
        <div className="list-headers">
          <div className="header-cell token-header">Token</div>
          <div className="header-cell price-header">Price</div>
          <div className="header-cell change-header">24h Change</div>
          <div className="header-cell volume-header">Volume</div>
          <div className="header-cell marketcap-header">Market Cap</div>
          <div className="header-cell actions-header">Actions</div>
        </div>

        {/* Token List */}
        <div className="tokens-list">
          {tokens.map((token) => (
            <TokenListItem
              key={token.id}
              token={token}
              isFavorite={favorites.includes(token.id)}
              onToggleFavorite={() => toggleFavorite(token.id)}
              onBuyToken={() => handleBuyToken(token)}
              onClick={() => handleTokenClick(token)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Grid View - Group by category
  return (
    <div className="tokens-grid-view">
      {sortedCategories.map(category => {
        const categoryTokens = groupedTokens[category];
        const trendingCount = categoryTokens.filter(t => t.trending).length;
        const newCount = categoryTokens.filter(t => t.new).length;

        return (
          <div key={category} className="category-section">
            <div className="category-header">
              <div className="category-title">
                <h3>{category}</h3>
                <span className="token-count">{categoryTokens.length} tokens</span>
              </div>
              
              <div className="category-stats">
                {trendingCount > 0 && (
                  <div className="stat-badge trending">
                    <TrendingUp size={12} />
                    <span>{trendingCount} trending</span>
                  </div>
                )}
                {newCount > 0 && (
                  <div className="stat-badge new">
                    <Zap size={12} />
                    <span>{newCount} new</span>
                  </div>
                )}
              </div>
            </div>

            <div className="tokens-grid">
              {categoryTokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token}
                  isFavorite={favorites.includes(token.id)}
                  onToggleFavorite={() => toggleFavorite(token.id)}
                  onBuyToken={() => handleBuyToken(token)}
                  onClick={() => handleTokenClick(token)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Batch Actions (if any tokens selected) */}
      {selectedTokens.length > 0 && (
        <div className="batch-actions">
          <div className="batch-info">
            <Star size={16} />
            <span>{selectedTokens.length} tokens selected</span>
          </div>
          <div className="batch-buttons">
            <button className="batch-btn">
              Add to Watchlist
            </button>
            <button className="batch-btn">
              Compare Tokens
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenGrid;