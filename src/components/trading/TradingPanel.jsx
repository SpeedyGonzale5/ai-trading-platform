import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Percent, DollarSign } from 'lucide-react';

const TradingPanel = ({ pair, currentPrice }) => {
  const [activeTab, setActiveTab] = useState('spot');
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [percentage, setPercentage] = useState('');

  const handleAmountChange = (value) => {
    setAmount(value);
    if (orderType === 'market') {
      setTotal((parseFloat(value || 0) * currentPrice).toFixed(2));
    } else if (price) {
      setTotal((parseFloat(value || 0) * parseFloat(price)).toFixed(2));
    }
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    if (amount) {
      setTotal((parseFloat(amount) * parseFloat(value || 0)).toFixed(2));
    }
  };

  const handleTotalChange = (value) => {
    setTotal(value);
    const priceToUse = orderType === 'market' ? currentPrice : parseFloat(price || 0);
    if (priceToUse > 0) {
      setAmount((parseFloat(value || 0) / priceToUse).toFixed(6));
    }
  };

  const handlePercentageClick = (percent) => {
    setPercentage(percent);
    // Mock balance calculation - in real app this would come from user's balance
    const mockBalance = side === 'buy' ? 10000 : 5.0; // $10,000 USDT or 5.0 BTC
    const targetAmount = (mockBalance * percent) / 100;
    
    if (side === 'buy') {
      const cryptoAmount = targetAmount / currentPrice;
      handleAmountChange(cryptoAmount.toFixed(6));
    } else {
      handleAmountChange(targetAmount.toFixed(6));
    }
  };

  const handleSubmitOrder = () => {
    const order = {
      pair,
      side,
      type: orderType,
      amount: parseFloat(amount),
      price: orderType === 'limit' ? parseFloat(price) : currentPrice,
      total: parseFloat(total),
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting order:', order);
    // In a real app, this would send the order to the exchange API
    alert(`${side.toUpperCase()} order submitted: ${amount} ${pair.replace('USDT', '')} at $${orderType === 'market' ? currentPrice : price}`);
  };

  const isFormValid = () => {
    return amount && (orderType === 'market' || price) && parseFloat(amount) > 0;
  };

  return (
    <div className="trading-panel card">
      <div className="panel-header">
        <div className="panel-tabs">
          <button
            className={`panel-tab ${activeTab === 'spot' ? 'active' : ''}`}
            onClick={() => setActiveTab('spot')}
          >
            Spot
          </button>
          <button
            className={`panel-tab ${activeTab === 'margin' ? 'active' : ''}`}
            onClick={() => setActiveTab('margin')}
          >
            Margin
          </button>
        </div>
      </div>

      <div className="trading-form">
        {/* Buy/Sell Toggle */}
        <div className="side-selector">
          <button
            className={`side-btn buy-btn ${side === 'buy' ? 'active' : ''}`}
            onClick={() => setSide('buy')}
          >
            <TrendingUp size={16} />
            Buy
          </button>
          <button
            className={`side-btn sell-btn ${side === 'sell' ? 'active' : ''}`}
            onClick={() => setSide('sell')}
          >
            <TrendingDown size={16} />
            Sell
          </button>
        </div>

        {/* Order Type Selector */}
        <div className="order-type-selector">
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="order-type-select"
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
            <option value="stop">Stop Order</option>
          </select>
        </div>

        {/* Price Input (for limit orders) */}
        {orderType === 'limit' && (
          <div className="form-group">
            <label className="form-label">
              Price
              <span className="label-currency">USDT</span>
            </label>
            <div className="input-container">
              <DollarSign size={16} className="input-icon" />
              <input
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="0.00"
                className="form-input"
              />
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="form-group">
          <label className="form-label">
            Amount
            <span className="label-currency">{pair.replace('USDT', '')}</span>
          </label>
          <div className="input-container">
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.000000"
              className="form-input"
            />
          </div>
        </div>

        {/* Percentage Buttons */}
        <div className="percentage-selector">
          {[25, 50, 75, 100].map(percent => (
            <button
              key={percent}
              className={`percentage-btn ${percentage === percent ? 'active' : ''}`}
              onClick={() => handlePercentageClick(percent)}
            >
              {percent}%
            </button>
          ))}
        </div>

        {/* Total Input */}
        <div className="form-group">
          <label className="form-label">
            Total
            <span className="label-currency">USDT</span>
          </label>
          <div className="input-container">
            <DollarSign size={16} className="input-icon" />
            <input
              type="number"
              value={total}
              onChange={(e) => handleTotalChange(e.target.value)}
              placeholder="0.00"
              className="form-input"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-row">
            <span>Available:</span>
            <span>{side === 'buy' ? '$10,000.00' : '5.000000 BTC'}</span>
          </div>
          <div className="summary-row">
            <span>Fee (0.1%):</span>
            <span>${(parseFloat(total || 0) * 0.001).toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`submit-btn ${side === 'buy' ? 'buy-submit' : 'sell-submit'} ${!isFormValid() ? 'disabled' : ''}`}
          onClick={handleSubmitOrder}
          disabled={!isFormValid()}
        >
          {side === 'buy' ? 'Buy' : 'Sell'} {pair.replace('USDT', '')}
        </button>

        {/* Balance Info */}
        <div className="balance-info">
          <div className="balance-item">
            <span className="balance-currency">USDT</span>
            <span className="balance-amount">10,000.00</span>
          </div>
          <div className="balance-item">
            <span className="balance-currency">BTC</span>
            <span className="balance-amount">5.000000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;