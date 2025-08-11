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
    <div className="portfolio-page">
      {/* Portfolio Summary Cards */}
      <div className="portfolio-summary">
        <div className="summary-card main-balance">
          <div className="summary-header">
            <h2>Total Portfolio Value</h2>
            <DollarSign className="summary-icon" size={24} />
          </div>
          <div className="summary-content">
            <div className="main-value">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className={`change-indicator ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="change-percent">
                {formatPercentage(portfolio.totalChangePercent24h)}
              </span>
              <span className="change-amount">
                ({formatCurrency(portfolio.totalChangeDollar24h, 2)})
              </span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <h3>24h Change</h3>
            {isPositive ? <TrendingUp className="summary-icon positive" size={20} /> : <TrendingDown className="summary-icon negative" size={20} />}
          </div>
          <div className="summary-content">
            <div className={`value ${isPositive ? 'positive' : 'negative'}`}>
              {formatCurrency(Math.abs(portfolio.totalChangeDollar24h))}
            </div>
            <div className="sub-value">
              {formatPercentage(portfolio.totalChangePercent24h)}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <h3>Assets</h3>
            <PieChart className="summary-icon" size={20} />
          </div>
          <div className="summary-content">
            <div className="value">{portfolio.tokens.length}</div>
            <div className="sub-value">Active Positions</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <h3>Best Performer</h3>
            <TrendingUp className="summary-icon positive" size={20} />
          </div>
          <div className="summary-content">
            <div className="value positive">
              {portfolio.tokens.reduce((best, token) => 
                token.change24h > (best?.change24h || -Infinity) ? token : best
              )?.symbol || 'N/A'}
            </div>
            <div className="sub-value">
              +{Math.max(...portfolio.tokens.map(t => t.change24h)).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="portfolio-grid">
        {/* Portfolio Chart */}
        <div className="portfolio-chart-container">
          <PortfolioChart data={portfolioHistory} />
        </div>

        {/* Token Holdings */}
        <div className="token-list-container">
          <TokenList tokens={portfolio.tokens} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-container">
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Portfolio;