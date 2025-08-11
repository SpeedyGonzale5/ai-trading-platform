import React from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

const RecentTrades = ({ trades }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatPrice = (price) => price.toFixed(2);
  const formatQuantity = (quantity) => quantity.toFixed(4);

  return (
    <div className="recent-trades card">
      <div className="card-header">
        <h3>Recent Trades</h3>
        <div className="trades-info">
          <Clock size={14} />
          <span>Live</span>
        </div>
      </div>

      <div className="trades-content">
        {/* Column Headers */}
        <div className="trades-headers">
          <div className="header-item">Price (USDT)</div>
          <div className="header-item">Amount</div>
          <div className="header-item">Time</div>
        </div>

        {/* Trades List */}
        <div className="trades-list">
          {trades.map((trade) => (
            <div key={trade.id} className={`trade-row ${trade.side}`}>
              <div className="trade-indicator">
                {trade.side === 'buy' ? (
                  <TrendingUp size={12} className="buy-indicator" />
                ) : (
                  <TrendingDown size={12} className="sell-indicator" />
                )}
              </div>
              
              <div className={`trade-price ${trade.side === 'buy' ? 'buy-price' : 'sell-price'}`}>
                ${formatPrice(trade.price)}
              </div>
              
              <div className="trade-quantity">
                {formatQuantity(trade.quantity)}
              </div>
              
              <div className="trade-time">
                {formatTime(trade.timestamp)}
              </div>
            </div>
          ))}
        </div>

        {trades.length === 0 && (
          <div className="empty-trades">
            <Clock size={32} />
            <span>No recent trades</span>
          </div>
        )}
      </div>

      {/* Trade Summary */}
      <div className="trades-summary">
        <div className="summary-item">
          <span className="summary-label">24h Volume:</span>
          <span className="summary-value">
            {trades.reduce((sum, trade) => sum + trade.total, 0).toFixed(2)} USDT
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">24h Trades:</span>
          <span className="summary-value">{trades.length}</span>
        </div>
      </div>
    </div>
  );
};

export default RecentTrades;