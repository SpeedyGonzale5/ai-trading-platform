import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import PortfolioChart from './PortfolioChart';
import TokenList from './TokenList';
import RecentTransactions from './RecentTransactions';
import CryptoChart from './CryptoChart';
import { mockPortfolio, mockPortfolioHistory, mockTransactions, formatCurrency, formatPercentage } from '../../data/mockData';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [portfolioHistory, setPortfolioHistory] = useState(mockPortfolioHistory);
  const [transactions, setTransactions] = useState(mockTransactions);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update portfolio values with small random changes
      setPortfolio(prev => ({
        ...prev,
        totalValue: prev.totalValue * (1 + (Math.random() - 0.5) * 0.001),
        tokens: prev.tokens.map(token => ({
          ...token,
          price: token.price * (1 + (Math.random() - 0.5) * 0.01),
          change24h: token.change24h + (Math.random() - 0.5) * 0.5
        }))
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const isPositive = portfolio.totalChangePercent24h >= 0;

  return (
    <div className="modern-portfolio-page">
      {/* Top Section - Two Card Layout */}
      <div className="top-section-layout">
        {/* Left Side - My Balance */}
        <div className="balance-section">
          <div className="stat-card main-portfolio gradient-outline has-grain">
            <div className="stat-header">
              <span className="stat-label">My Balance</span>
              <div className="time-selector">
                <button className="time-btn active">24h</button>
              </div>
            </div>
            
            <div className="stat-main">
              <div className="main-balance">
                {formatCurrency(portfolio.totalValue)}
              </div>
              <div className="balance-details">
                <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="change-text">
                    {formatPercentage(portfolio.totalChangePercent24h)}
                  </span>
                  <span className="change-amount">
                    ({formatCurrency(portfolio.totalChangeDollar24h, 2)})
                  </span>
                </div>
              </div>
            </div>
            
            {/* Integrate Chart */}
            <div className="chart-container">
              <PortfolioChart data={portfolioHistory} />
            </div>
          </div>
        </div>

        {/* Right Side - My Top Stocks */}
        <div className="top-coins-section-horizontal">
          <div className="section-header">
            <h2>My Top Stocks</h2>
            <div className="assets-count">
              <span>{portfolio.tokens.slice(0, 3).length} Assets</span>
            </div>
          </div>
          <div className="top-coins-horizontal-grid">
            {portfolio.tokens.slice(0, 3).map((token, index) => (
              <div key={token.id} className={`top-coin-card glassmorphism-card`}>
                <div className="coin-header">
                  <div className="coin-logo">
                      {token.symbol === 'AAPL' && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#000000"/>
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white"/>
                        </svg>
                      )}
                      {token.symbol === 'GOOGL' && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#4285F4"/>
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                        </svg>
                      )}
                      {token.symbol === 'META' && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
                        </svg>
                      )}
                      {!['AAPL', 'GOOGL', 'META'].includes(token.symbol) && (
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#6366f1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: 'white'
                        }}>
                          {token.symbol.charAt(0)}
                        </div>
                      )}
                  </div>
                  <div className="coin-title">
                    <h3>{token.symbol}</h3>
                    <p>{token.name}</p>
                  </div>
                  <div className={`coin-change ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </div>
                </div>
                
                <div className="coin-main-values">
                  <div className="crypto-amount">{token.balance.toFixed(4)}</div>
                  <div className="usd-amount">${token.value.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
                </div>
                
                <div className="coin-chart">
                  <CryptoChart crypto={token} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Three Card Layout */}
      <div className="bottom-section-layout">
        {/* Left - Markets */}
        <div className="markets-section gradient-outline has-grain">
          <div className="section-header">
            <h2>Markets</h2>
            <button className="learn-more-btn">Learn more</button>
          </div>
          <div className="markets-list">
            {portfolio.tokens.slice(0, 3).map((token, index) => (
              <div key={token.id} className="market-item">
                <div className="market-info">
                  <div className="coin-logo market-coin-icon">
                    {token.symbol === 'AAPL' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#000000"/>
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'GOOGL' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#4285F4"/>
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'META' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
                      </svg>
                    )}
                    {!['AAPL', 'GOOGL', 'META'].includes(token.symbol) && (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'white'
                      }}>
                        {token.symbol.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="market-name">{token.name}</span>
                </div>
                <div className="market-chart">
                  <CryptoChart crypto={token} />
                </div>
                <div className="market-price">
                  ${token.price.toFixed(2)}
                </div>
                <div className={`market-change ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Quick Swap */}
        <div className="quick-swap-section gradient-outline has-grain">
          <div className="section-header">
            <h2>Quick Swap</h2>
            <span className="all-currencies">All Currencies</span>
          </div>
          <div className="swap-interface">
            <div className="swap-input">
              <div className="input-row">
                <div className="token-selector">
                  <div className="token-icon">T</div>
                  <span>TON</span>
                </div>
                <input type="text" value="54.87" className="amount-input" readOnly />
              </div>
              <div className="balance-text">Balance: 54.87</div>
            </div>
            
            <div className="swap-arrows">
              <div className="arrows-icon">⇅</div>
            </div>
            
            <div className="swap-input">
              <div className="input-row">
                <div className="token-selector">
                  <div className="token-icon">$</div>
                  <span>USDT</span>
                </div>
                <input type="text" value="436.161" className="amount-input" readOnly />
              </div>
              <div className="balance-text">Updated Balance: 436.161</div>
            </div>
          </div>
        </div>

        {/* Right - Promotional */}
        <div className="promo-section gradient-outline has-grain">
          <div className="promo-icon-star">★</div>
          <div className="promo-content">
            <h3>Unlimited Access</h3>
            <p>to Trading AI BOTs!</p>
            <p className="promo-desc">
              Get free beta access, you'll have access to the
              world's best trading and new features.
            </p>
            <button className="promo-button">Try It Now →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;