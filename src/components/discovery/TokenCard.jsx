import React from 'react';
import { TrendingUp, TrendingDown, Star, Zap, ShoppingCart, MoreVertical } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../data/mockData';

const TokenCard = ({ token, isFavorite, onToggleFavorite, onBuyToken, onClick }) => {
  const isPositive = token.change24h >= 0;
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(1)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`;
    return formatCurrency(marketCap, 0);
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(1)}K`;
    return formatCurrency(volume, 0);
  };

  return (
    <div className="token-card" onClick={onClick}>
      {/* Card Header */}
      <div className="token-card-header">
        <div className="token-info">
          <div className="token-logo-container">
            <span className="token-logo">{token.logo}</span>
            {token.trending && (
              <div className="trending-badge">
                <TrendingUp size={10} />
              </div>
            )}
            {token.new && (
              <div className="new-badge">
                <Zap size={10} />
              </div>
            )}
          </div>
          
          <div className="token-names">
            <h4 className="token-name">{token.name}</h4>
            <span className="token-symbol">{token.symbol}</span>
          </div>
        </div>

        <div className="card-actions">
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={16} />
          </button>
          
          <button
            className="more-btn"
            onClick={(e) => e.stopPropagation()}
            title="More options"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Price Information */}
      <div className="price-section">
        <div className="current-price">
          {formatCurrency(token.price, token.price < 1 ? 4 : 2)}
        </div>
        
        <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{formatPercentage(token.change24h)}</span>
        </div>
      </div>

      {/* Token Stats */}
      <div className="token-stats">
        <div className="stat-item">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatMarketCap(token.marketCap)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Volume 24h</span>
          <span className="stat-value">{formatVolume(token.volume24h)}</span>
        </div>
      </div>

      {/* Token Description */}
      <div className="token-description">
        <p>{token.description}</p>
      </div>

      {/* Category Badge */}
      <div className="token-category">
        <span className="category-badge">{token.category}</span>
      </div>

      {/* Action Buttons */}
      <div className="token-actions">
        <button
          className="action-btn secondary"
          onClick={(e) => {
            e.stopPropagation();
            // Handle add to watchlist
          }}
          title="Add to watchlist"
        >
          <Star size={14} />
          Watchlist
        </button>
        
        <button
          className="action-btn primary"
          onClick={(e) => {
            e.stopPropagation();
            onBuyToken();
          }}
          title="Quick buy"
        >
          <ShoppingCart size={14} />
          Quick Buy
        </button>
      </div>

      {/* Hover Effects */}
      <div className="card-overlay">
        <div className="overlay-content">
          <h5>Quick Actions</h5>
          <div className="overlay-actions">
            <button className="overlay-btn">View Chart</button>
            <button className="overlay-btn">Token Details</button>
            <button className="overlay-btn">Add Alert</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;