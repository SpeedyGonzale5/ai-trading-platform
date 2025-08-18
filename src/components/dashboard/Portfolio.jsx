import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import PortfolioChart from './PortfolioChart';
import TokenList from './TokenList';
import RecentTransactions from './RecentTransactions';
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
      {/* Top Stats Grid - Reference Style */}
      <div className="portfolio-stats-grid">
        <div className="stat-card main-portfolio">
          <div className="stat-header">
            <span className="stat-label">MY BALANCE</span>
          </div>
          <div className="stat-main">
            <div className="main-balance">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className="balance-details">
              <div className={`balance-change ${isPositive ? 'positive' : 'negative'}`}>
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
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">24H CHANGE</span>
            <TrendingUp className="stat-icon" size={20} />
          </div>
          <div className="stat-main">
            <div className={`stat-value ${isPositive ? 'positive' : 'negative'}`}>
              {formatCurrency(portfolio.totalChangeDollar24h)}
            </div>
            <div className="stat-subtitle">
              {formatPercentage(portfolio.totalChangePercent24h)}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">ASSETS</span>
            <PieChart className="stat-icon" size={20} />
          </div>
          <div className="stat-main">
            <div className="stat-value">{portfolio.tokens.length}</div>
            <div className="stat-subtitle">Active Positions</div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="portfolio-performance-section">
        <div className="section-header">
          <h2>Portfolio Performance</h2>
          <div className="time-selector">
            <button className="time-btn active">30D</button>
            <button className="time-btn">90D</button>
            <button className="time-btn">1Y</button>
            <button className="time-btn">ALL</button>
          </div>
        </div>
        <div className="chart-container">
          <PortfolioChart data={portfolioHistory} />
        </div>
      </div>

      {/* My Top Coins Section - Reference Style */}
      <div className="my-top-coins-section">
        <h2>
          My Top Coins
          <span className="assets-count">{portfolio.tokens.length} Assets</span>
        </h2>
        <div className="top-coins-grid">
          {portfolio.tokens.map((token, index) => (
            <div key={token.id} className={`top-coin-card ${token.symbol.toLowerCase()}-card`}>
              <div className="coin-gradient-header">
                <div className="coin-logo">
                    {token.symbol === 'BTC' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#F7931A"/>
                        <path d="M17.207 10.534c.118-1.283-.783-1.978-2.118-2.436l.433-1.735-1.055-.263-.422 1.69a52.01 52.01 0 00-.845-.2l.425-1.704-1.055-.263-.433 1.735c-.228-.052-.452-.101-.669-.154l.001-.005-1.456-.363-.281 1.127s.783.18.766.191c.426.106.503.39.49.614l-.49 1.963c.029.008.067.019.109.037l-.111-.028-.686 2.75c-.052.128-.184.321-.481.248.01.015-.767-.191-.767-.191l-.524 1.208 1.374.343c.255.064.505.131.751.194l-.437 1.754 1.055.263.433-1.735c.286.078.564.15.837.218l-.431 1.73 1.055.263.437-1.752c1.788.338 3.132.202 3.695-1.415.454-1.305-.023-2.058-1.25-2.547.89-.205 1.56-.791 1.739-2z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'ETH' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#627EEA"/>
                        <path d="M12 4l-5.5 9.19L12 16l5.5-2.81L12 4z" fill="white" opacity="0.6"/>
                        <path d="M12 4l-5.5 9.19L12 11.24V4z" fill="white"/>
                        <path d="M12 16.96L6.5 14.44L12 20l5.5-5.56L12 16.96z" fill="white" opacity="0.6"/>
                        <path d="M12 16.96v3.04l5.5-5.56L12 16.96z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'BNB' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#F3BA2F"/>
                        <path d="M12 6.45L14.55 9l1.95-1.95L12 2.55l-4.5 4.5L9.45 9 12 6.45zm-5.55 3L4.5 11.4 9 15.9l1.95-1.95L6.45 9.45zm11.1 0L15.6 11.4l1.95 1.95 1.95-1.95-1.95-1.95zm-5.55 3L9.45 15 12 17.55 14.55 15 12 12.45zm0-3.9l1.95 1.95-1.95 1.95-1.95-1.95L12 8.55z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'SOL' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#9945FF"/>
                        <path d="M17.392 8.692a.623.623 0 00-.44-.182H8.544c-.35 0-.526.423-.278.671l1.609 1.609c.116.116.275.182.44.182h8.407c.35 0 .526-.423.278-.671l-1.608-1.609zm-1.609 4.436a.623.623 0 00-.44-.182H7.048c-.35 0-.526.423-.278.671l1.609 1.609c.116.116.275.182.44.182h8.407c.35 0 .526-.423.278-.671l-1.721-1.609zm-9.175 3.564a.623.623 0 01.44-.182h8.407c.35 0 .526.423.278.671l-1.609 1.609a.623.623 0 01-.44.182H7.048c-.35 0-.526-.423-.278-.671l1.838-1.609z" fill="white"/>
                      </svg>
                    )}
                    {token.symbol === 'ADA' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#0033AD"/>
                        <path d="M12 8.5c-.69 0-1.25.56-1.25 1.25S11.31 11 12 11s1.25-.56 1.25-1.25S12.69 8.5 12 8.5zm-3.5 2c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zm7 0c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zm-7 3c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zm7 0c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zM12 15c-.69 0-1.25.56-1.25 1.25S11.31 17.5 12 17.5s1.25-.56 1.25-1.25S12.69 15 12 15z" fill="white"/>
                      </svg>
                    )}
                </div>
                <div className="coin-name-center">
                  <h3>{token.symbol}</h3>
                  <p>{token.name}</p>
                </div>
                <div className={`coin-change-badge ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </div>
              </div>
              <div className={`mini-chart ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                <svg width="100%" height="100%" viewBox="0 0 120 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#93C5FD" />
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="50%" stopColor="#F87171" />
                      <stop offset="100%" stopColor="#FCA5A5" />
                    </linearGradient>
                    <linearGradient id="blueFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                      <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
                    </linearGradient>
                    <linearGradient id="redFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
                      <stop offset="50%" stopColor="rgba(239, 68, 68, 0.1)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0.02)" />
                    </linearGradient>
                  </defs>
                  {/* Gradient fill area */}
                  <path
                    d={`M0,${30 + Math.sin(0) * 6} L20,${25 + Math.sin(1) * 4} L40,${20 + Math.sin(2) * 5} L60,${22 + Math.sin(3) * 3} L80,${18 + Math.sin(4) * 4} L100,${15 + Math.sin(5) * 2} L120,${token.change24h >= 0 ? 10 : 30} L120,40 L0,40 Z`}
                    fill={token.change24h >= 0 ? 'url(#blueFill)' : 'url(#redFill)'}
                  />
                  {/* Chart line */}
                  <path
                    d={`M0,${30 + Math.sin(0) * 6} L20,${25 + Math.sin(1) * 4} L40,${20 + Math.sin(2) * 5} L60,${22 + Math.sin(3) * 3} L80,${18 + Math.sin(4) * 4} L100,${15 + Math.sin(5) * 2} L120,${token.change24h >= 0 ? 10 : 30}`}
                    stroke={token.change24h >= 0 ? 'url(#blueGradient)' : 'url(#redGradient)'}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Chart endpoint highlight */}
                  <circle
                    cx="120"
                    cy={token.change24h >= 0 ? 10 : 30}
                    r="3"
                    fill="#FFFFFF"
                    stroke={token.change24h >= 0 ? '#3B82F6' : '#EF4444'}
                    strokeWidth="2"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                  />
                </svg>
              </div>
              <div className="coin-stats">
                <div className="coin-balance">
                  <h4>{token.balance.toFixed(4)}</h4>
                  <p>{formatCurrency(token.value)}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Promotional Card - Reference Design */}
          <div className="top-coin-card promo-card">
            <div className="promo-content">
              <div className="promo-header">
                <div className="promo-icon">+</div>
                <h3>Unlimited Access</h3>
                <p>to Trading AI Bots</p>
              </div>
              <div className="promo-description">
                <p>Trade from any exchange using smart
trading. Smart alerts and world class liquidity.</p>
              </div>
              <button className="promo-btn">Try it Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;