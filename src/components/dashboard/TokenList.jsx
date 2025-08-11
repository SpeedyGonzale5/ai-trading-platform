import React, { useState } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../data/mockData';

const TokenList = ({ tokens }) => {
  const [sortField, setSortField] = useState('value');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ChevronUp className="sort-icon inactive" size={16} />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="sort-icon active" size={16} /> : 
      <ChevronDown className="sort-icon active" size={16} />;
  };

  return (
    <div className="token-list card">
      <div className="card-header">
        <h3>Your Holdings</h3>
        <span className="token-count">{tokens.length} assets</span>
      </div>

      <div className="table-container">
        <table className="token-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="sortable">
                <span>Asset</span>
                <SortIcon field="name" />
              </th>
              <th onClick={() => handleSort('price')} className="sortable">
                <span>Price</span>
                <SortIcon field="price" />
              </th>
              <th onClick={() => handleSort('balance')} className="sortable">
                <span>Balance</span>
                <SortIcon field="balance" />
              </th>
              <th onClick={() => handleSort('value')} className="sortable">
                <span>Value</span>
                <SortIcon field="value" />
              </th>
              <th onClick={() => handleSort('change24h')} className="sortable">
                <span>24h Change</span>
                <SortIcon field="change24h" />
              </th>
              <th onClick={() => handleSort('allocation')} className="sortable">
                <span>Allocation</span>
                <SortIcon field="allocation" />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens.map((token) => (
              <tr key={token.id} className="token-row">
                <td className="token-info">
                  <div className="token-details">
                    <span className="token-logo">{token.logo}</span>
                    <div>
                      <div className="token-name">{token.name}</div>
                      <div className="token-symbol">{token.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="token-price">
                  {formatCurrency(token.price)}
                </td>
                <td className="token-balance">
                  <div className="balance-info">
                    <div>{token.balance.toFixed(4)}</div>
                    <div className="balance-symbol">{token.symbol}</div>
                  </div>
                </td>
                <td className="token-value">
                  {formatCurrency(token.value)}
                </td>
                <td className={`token-change ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                  <div className="change-content">
                    {token.change24h >= 0 ? 
                      <TrendingUp size={16} /> : 
                      <TrendingDown size={16} />
                    }
                    <span>{formatPercentage(token.change24h)}</span>
                  </div>
                </td>
                <td className="token-allocation">
                  <div className="allocation-content">
                    <span>{token.allocation.toFixed(1)}%</span>
                    <div className="allocation-bar">
                      <div 
                        className="allocation-fill"
                        style={{ width: `${token.allocation}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="token-actions">
                  <div className="action-buttons">
                    <button className="btn btn-success btn-sm">Buy</button>
                    <button className="btn btn-danger btn-sm">Sell</button>
                    <button className="btn btn-secondary btn-icon">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenList;