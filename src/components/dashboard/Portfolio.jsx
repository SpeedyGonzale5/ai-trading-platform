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
      {/* Top Stats Grid */}
      <div className="portfolio-stats-grid">
        <div className="stat-card main-portfolio">
          <div className="stat-header">
            <span className="stat-label">Total Portfolio Value</span>
            <DollarSign className="stat-icon" size={20} />
          </div>
          <div className="stat-main">
            <div className="stat-value">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>
                {formatPercentage(portfolio.totalChangePercent24h)} ({formatCurrency(portfolio.totalChangeDollar24h, 2)})
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">24h Change</span>
            <TrendingUp className="stat-icon" size={20} />
          </div>
          <div className="stat-main">
            <div className={`stat-value ${isPositive ? 'positive' : 'negative'}`}>
              {formatCurrency(portfolio.totalChangeDollar24h)}
            </div>
            <div className="stat-subtitle">
              +3.40%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Assets</span>
            <PieChart className="stat-icon" size={20} />
          </div>
          <div className="stat-main">
            <div className="stat-value">{portfolio.tokens.length}</div>
            <div className="stat-subtitle">Active Positions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Best Performer</span>
            <TrendingUp className="stat-icon positive" size={20} />
          </div>
          <div className="stat-main">
            <div className="stat-value positive">SOL</div>
            <div className="stat-subtitle">+8.1%</div>
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

      {/* Your Holdings Section */}
      <div className="holdings-section">
        <div className="section-header">
          <h2>Your Holdings</h2>
          <div className="holdings-info">
            <span>5 assets</span>
          </div>
        </div>
        <div className="holdings-table">
          <TokenList tokens={portfolio.tokens} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;