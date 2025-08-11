import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';

const RecentTransactions = ({ transactions }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'buy':
        return <ArrowUpRight className="transaction-icon buy" size={16} />;
      case 'sell':
        return <ArrowDownLeft className="transaction-icon sell" size={16} />;
      default:
        return <Clock className="transaction-icon" size={16} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="status-icon completed" size={14} />;
      case 'pending':
        return <Clock className="status-icon pending" size={14} />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const transactionTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - transactionTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="recent-transactions card">
      <div className="card-header">
        <h3>Recent Transactions</h3>
        <button className="btn btn-secondary btn-sm">View All</button>
      </div>

      <div className="transactions-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-main">
              <div className="transaction-type">
                {getTransactionIcon(transaction.type)}
                <div className="transaction-details">
                  <div className="transaction-action">
                    <span className={`action-text ${transaction.type}`}>
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'}
                    </span>
                    <span className="transaction-token">
                      {transaction.amount} {transaction.token}
                    </span>
                  </div>
                  <div className="transaction-meta">
                    <span className="transaction-time">
                      {formatTimeAgo(transaction.timestamp)}
                    </span>
                    <span className="transaction-price">
                      @ {formatCurrency(transaction.price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="transaction-amount">
                <div className={`amount ${transaction.type}`}>
                  {transaction.type === 'buy' ? '-' : '+'}
                  {formatCurrency(transaction.total)}
                </div>
                <div className="transaction-status">
                  {getStatusIcon(transaction.status)}
                  <span className={`status-text ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="empty-state">
          <Clock size={48} />
          <h4>No Recent Transactions</h4>
          <p>Your trading activity will appear here</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;