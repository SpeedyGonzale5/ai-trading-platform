import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const OrderBook = ({ data, currentPrice }) => {
  const { bids, asks } = data;

  const formatPrice = (price) => price.toFixed(2);
  const formatQuantity = (quantity) => quantity.toFixed(4);

  // Calculate cumulative quantities for depth visualization
  const calculateCumulative = (orders) => {
    let cumulative = 0;
    return orders.map(order => {
      cumulative += order.quantity;
      return { ...order, cumulative };
    });
  };

  const cumulativeBids = calculateCumulative(bids);
  const cumulativeAsks = calculateCumulative(asks);
  const maxCumulative = Math.max(
    ...cumulativeBids.map(b => b.cumulative),
    ...cumulativeAsks.map(a => a.cumulative)
  );

  const getDepthBarWidth = (cumulative) => {
    return (cumulative / maxCumulative) * 100;
  };

  return (
    <div className="order-book card">
      <div className="card-header">
        <h3>Order Book</h3>
        <div className="spread-info">
          <span className="spread-label">Spread:</span>
          <span className="spread-value">
            ${asks.length > 0 && bids.length > 0 ? (asks[0].price - bids[0].price).toFixed(2) : '0.00'}
          </span>
        </div>
      </div>

      <div className="orderbook-content">
        {/* Column Headers */}
        <div className="orderbook-headers">
          <div className="header-item">Price (USDT)</div>
          <div className="header-item">Amount</div>
          <div className="header-item">Total</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="asks-section">
          {cumulativeAsks.slice(0, 8).reverse().map((ask, index) => (
            <div key={`ask-${index}`} className="order-row ask-row">
              <div
                className="depth-bar ask-depth"
                style={{ width: `${getDepthBarWidth(ask.cumulative)}%` }}
              />
              <div className="order-price ask-price">
                {formatPrice(ask.price)}
              </div>
              <div className="order-quantity">
                {formatQuantity(ask.quantity)}
              </div>
              <div className="order-total">
                {formatQuantity(ask.total)}
              </div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="current-price-row">
          <div className="current-price-indicator">
            <span className="price-value">${formatPrice(currentPrice)}</span>
            <span className="price-direction">
              <ArrowUp size={12} className="price-arrow up" />
            </span>
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="bids-section">
          {cumulativeBids.slice(0, 8).map((bid, index) => (
            <div key={`bid-${index}`} className="order-row bid-row">
              <div
                className="depth-bar bid-depth"
                style={{ width: `${getDepthBarWidth(bid.cumulative)}%` }}
              />
              <div className="order-price bid-price">
                {formatPrice(bid.price)}
              </div>
              <div className="order-quantity">
                {formatQuantity(bid.quantity)}
              </div>
              <div className="order-total">
                {formatQuantity(bid.total)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Book Controls */}
      <div className="orderbook-controls">
        <button className="orderbook-control-btn active">
          <span className="control-label">All</span>
        </button>
        <button className="orderbook-control-btn">
          <ArrowUp size={14} className="sell-icon" />
          <span className="control-label">Sell</span>
        </button>
        <button className="orderbook-control-btn">
          <ArrowDown size={14} className="buy-icon" />
          <span className="control-label">Buy</span>
        </button>
      </div>
    </div>
  );
};

export default OrderBook;