import React, { useState } from 'react';
import { Search, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../data/mockData';

const TradingPairs = ({ pairs, selectedPair, onPairChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(['BTCUSDT', 'ETHUSDT']);

  const filteredPairs = pairs.filter(pair =>
    pair.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (symbol) => {
    setFavorites(prev =>
      prev.includes(symbol)
        ? prev.filter(fav => fav !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="trading-pairs">
      <div className="pairs-header">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search pairs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pairs-search"
          />
        </div>
      </div>

      <div className="pairs-list">
        {filteredPairs.map((pair) => (
          <div
            key={pair.symbol}
            className={`pair-item ${selectedPair === pair.symbol ? 'active' : ''}`}
            onClick={() => onPairChange(pair.symbol)}
          >
            <div className="pair-main">
              <button
                className={`favorite-btn ${favorites.includes(pair.symbol) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(pair.symbol);
                }}
              >
                <Star size={12} />
              </button>
              
              <div className="pair-info">
                <div className="pair-symbol">{pair.symbol}</div>
                <div className="pair-volume">
                  Vol: {(pair.volume / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>

            <div className="pair-price">
              <div className="price-value">
                ${pair.price.toLocaleString()}
              </div>
              <div className={`price-change ${pair.change24h >= 0 ? 'positive' : 'negative'}`}>
                {pair.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {formatPercentage(pair.change24h)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradingPairs;