import React from 'react';
import { TrendingUp, TrendingDown, Star, Zap, ShoppingCart } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../data/mockData';

const TokenListItem = ({ token, isFavorite, onToggleFavorite, onBuyToken, onClick }) => {
  const isPositive = token.change24h >= 0;

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`;
    return formatCurrency(marketCap, 0);
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(1)}K`;
    return formatCurrency(volume, 0);
  };

  return (
    <div className="token-list-item" onClick={onClick}>
      {/* Token Info */}
      <div className="list-cell token-cell">
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={14} />
        </button>
        
        <div className="token-logo-container">
          <span className="token-logo">{token.logo}</span>
          {token.trending && (
            <div className="trending-indicator">
              <TrendingUp size={10} />
            </div>
          )}
          {token.new && (
            <div className="new-indicator">
              <Zap size={10} />
            </div>
          )}
        </div>
        
        <div className="token-info">
          <div className="token-name">{token.name}</div>
          <div className="token-details">
            <span className="token-symbol">{token.symbol}</span>
            <span className="token-category">{token.category}</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="list-cell price-cell">
        <div className="price-value">
          {formatCurrency(token.price, token.price < 1 ? 4 : 2)}
        </div>
      </div>

      {/* 24h Change */}
      <div className="list-cell change-cell">
        <div className={`change-value ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{formatPercentage(token.change24h)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="list-cell volume-cell">
        <div className="volume-value">
          {formatVolume(token.volume24h)}
        </div>
      </div>

      {/* Market Cap */}
      <div className="list-cell marketcap-cell">
        <div className="marketcap-value">
          {formatMarketCap(token.marketCap)}
        </div>
      </div>

      {/* Actions */}
      <div className="list-cell actions-cell">
        <div className="list-actions">
          <button
            className="action-btn watchlist-btn"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to watchlist
            }}
            title="Add to watchlist"
          >
            Watchlist
          </button>
          
          <button
            className="action-btn buy-btn"
            onClick={(e) => {
              e.stopPropagation();
              onBuyToken();
            }}
            title="Quick buy"
          >
            <ShoppingCart size={14} />
            Buy
          </button>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="hover-indicator"></div>
    </div>
  );
};

export default TokenListItem;