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

        {/* Right Side - My Top Coins */}
        <div className="top-coins-section-horizontal">
          <div className="section-header">
            <h2>My Top Coins</h2>
            <div className="assets-count">
              <span>{portfolio.tokens.slice(0, 3).length} Assets</span>
            </div>
          </div>
          <div className="top-coins-horizontal-grid">
            {portfolio.tokens.slice(0, 3).map((token, index) => (
              <div key={token.id} className={`top-coin-card glassmorphism-card`}>
                <div className="coin-header">
                  <div className="coin-logo">
                      {token.symbol === 'BTC' && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#F7931A"/>
                          <path d="M17.207 10.534c.118-1.283-.783-1.978-2.118-2.436l.433-1.735-1.055-.263-.422 1.69a52.01 52.01 0 00-.845-.2l.425-1.704-1.055-.263-.433 1.735c-.228-.052-.452-.101-.669-.154l.001-.005-1.456-.363-.281 1.127s.783.18.766.191c.426.106.503.39.49.614l-.49 1.963c.029.008.067.019.109.037l-.111-.028-.686 2.75c-.052.128-.184.321-.481.248.01.015-.767-.191-.767-.191l-.524 1.208 1.374.343c.255.064.505.131.751.194l-.437 1.754 1.055.263.433-1.735c.286.078.564.15.837.218l-.431 1.73 1.055.263.437-1.752c1.788.338 3.132.202 3.695-1.415.454-1.305-.023-2.058-1.25-2.547.89-.205 1.56-.791 1.739-2z" fill="white"/>
                        </svg>
                      )}
                      {token.symbol === 'ETH' && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#627EEA"/>
                          <path d="M12 4l-5.5 9.19L12 16l5.5-2.81L12 4z" fill="white" opacity="0.6"/>
                          <path d="M12 4l-5.5 9.19L12 11.24V4z" fill="white"/>
                          <path d="M12 16.96L6.5 14.44L12 20l5.5-5.56L12 16.96z" fill="white" opacity="0.6"/>
                          <path d="M12 16.96v3.04l5.5-5.56L12 16.96z" fill="white"/>
                        </svg>
                      )}
                      {token.symbol === 'SOL' && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#9945FF"/>
                          <path d="M17.392 8.692a.623.623 0 00-.44-.182H8.544c-.35 0-.526.423-.278.671l1.609 1.609c.116.116.275.182.44.182h8.407c.35 0 .526-.423.278-.671l-1.608-1.609zm-1.609 4.436a.623.623 0 00-.44-.182H7.048c-.35 0-.526.423-.278.671l1.609 1.609c.116.116.275.182.44.182h8.407c.35 0 .526-.423.278-.671l-1.721-1.609zm-9.175 3.564a.623.623 0 01.44-.182h8.407c.35 0 .526.423.278.671l-1.609 1.609a.623.623 0 01-.44.182H7.048c-.35 0-.526-.423-.278-.671l1.838-1.609z" fill="white"/>
                        </svg>
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
                    {token.symbol === 'BTC' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#F7931A"/>
                        <path d="M17.207 10.534c.118-1.283-.783-1.978-2.118-2.436l.433-1.735-1.055-.263-.422 1.69a52.01 52.01 0 00-.845-.2l.425-1.704-1.055-.263-.433 1.735c-.228-.052-.452-.101-.669-.154l.001-.005-1.456-.363-.281 1.127s.783.18.766.191c.426.106.503.39.49.614l-.49 1.963c.029.008.067.019.109.037l-.111-.028-.686 2.75c-.052.128-.184.321-.481.248.01.015-.767-.191-.767-.191l-.524 1.208 1.374.343c.255.064.505.131.751.194l-.437 1.754 1.055.263.433-1.735c.286.078.564.15.837.218l-.431 1.73 1.055.263.437-1.752c1.788.338 3.132.202 3.695-1.415.454-1.305-.023-2.058-1.25-2.547.89-.205 1.56-.791 1.739-2z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'ETH' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#627EEA"/>
                        <path d="M12 4l-5.5 9.19L12 16l5.5-2.81L12 4z" fill="white" opacity="0.6"/>
                        <path d="M12 4l-5.5 9.19L12 11.24V4z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'SOL' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#9945FF"/>
                        <path d="M17.392 8.692a.623.623 0 00-.44-.182H8.544c-.35 0-.526.423-.278.671l1.609 1.609c.116.116.275.182.44.182h8.407c.35 0 .526-.423.278-.671l-1.608-1.609z" fill="white"/>
                      </svg>
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