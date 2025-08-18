import React from 'react';
import CryptoChart from '../dashboard/CryptoChart';

const CryptoTopCards = () => {
  // Mock data matching the reference image
  const cryptoData = [
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '0.823075',
      value: 57096.48,
      change24h: 1.63,
      chartValue: -2058.40,
      price: 69500,
      balance: 0.823075
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      amount: '2.9383',
      value: 10793.64,
      change24h: -0.84,
      chartValue: -811.73,
      price: 3673,
      balance: 2.9383
    },
    {
      id: 3,
      symbol: 'SOL',
      name: 'Solana',
      amount: '419.68',
      value: 67108.32,
      change24h: -3.09,
      chartValue: -4194.23,
      price: 159.85,
      balance: 419.68
    }
  ];

  return (
    <div className="crypto-top-cards-section">
      <div className="crypto-top-cards-grid">
        {cryptoData.map((crypto, index) => (
          <div key={crypto.id} className={`crypto-top-card glassmorphism-card`}>
            {/* Header Section */}
            <div className="crypto-card-header">
              <div className="crypto-icon-wrapper">
                <div className="crypto-icon">
                  {crypto.symbol === 'BTC' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="#F7931A"/>
                      <path d="M17.207 10.534c.118-1.283-.783-1.978-2.118-2.436l.433-1.735-1.055-.263-.422 1.69a52.01 52.01 0 00-.845-.2l.425-1.704-1.055-.263-.433 1.735c-.228-.052-.452-.101-.669-.154l.001-.005-1.456-.363-.281 1.127s.783.18.766.191c.426.106.503.39.49.614l-.49 1.963c.029.008.067.019.109.037l-.111-.028-.686 2.75c-.052.128-.184.321-.481.248.01.015-.767-.191-.767-.191l-.524 1.208 1.374.343c.255.064.505.131.751.194l-.437 1.754 1.055.263.433-1.735c.286.078.564.15.837.218l-.431 1.73 1.055.263.437-1.752c1.788.338 3.132.202 3.695-1.415.454-1.305-.023-2.058-1.25-2.547.89-.205 1.56-.791 1.739-2z" fill="white"/>
                    </svg>
                  )}
                  {crypto.symbol === 'ETH' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="#627EEA"/>
                      <path d="M12 4l-5.5 9.19L12 16l5.5-2.81L12 4z" fill="white" opacity="0.6"/>
                      <path d="M12 4l-5.5 9.19L12 11.24V4z" fill="white"/>
                      <path d="M12 16.96L6.5 14.44L12 20l5.5-5.56L12 16.96z" fill="white" opacity="0.6"/>
                      <path d="M12 16.96v3.04l5.5-5.56L12 16.96z" fill="white"/>
                    </svg>
                  )}
                  {crypto.symbol === 'SOL' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="#FFFFFF"/>
                      <g transform="translate(6, 8)">
                        <rect x="0" y="0" width="12" height="1.5" fill="#000000" rx="0.75"/>
                        <rect x="0" y="3.25" width="12" height="1.5" fill="#000000" rx="0.75"/>
                        <rect x="0" y="6.5" width="12" height="1.5" fill="#000000" rx="0.75"/>
                      </g>
                    </svg>
                  )}
                </div>
                <div className="crypto-label">
                  <div className="crypto-symbol">{crypto.symbol}</div>
                  <div className="crypto-name">{crypto.name}</div>
                </div>
              </div>
              
              {/* Change Badge */}
              <div className={`change-badge ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
                <span className="change-icon">
                  {crypto.change24h >= 0 ? '▲' : '▼'}
                </span>
                <span className="change-text">
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="crypto-price-section">
              <div className="crypto-amount">{crypto.amount}</div>
              <div className="crypto-value">${crypto.value.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            </div>

            {/* Chart Section */}
            <div className="crypto-chart-section">
              <CryptoChart crypto={crypto} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTopCards;