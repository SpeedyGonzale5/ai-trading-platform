import React, { useState } from 'react';
import { Search, Bell, Settings, Wallet, ChevronDown } from 'lucide-react';

const TopBar = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);

  const mockWalletBalance = {
    address: '0x1234...5678',
    balance: 2.45,
    usdValue: 3287.50
  };

  const handleWalletConnect = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <h1>CryptoTrader Pro</h1>
        </div>
        
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search tokens, pairs, or addresses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="topbar-right">
        <div className="notifications">
          <button className="notification-btn">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>
        </div>

        <div className="wallet-section">
          {walletConnected ? (
            <div className="wallet-info">
              <div className="wallet-balance">
                <span className="balance">{mockWalletBalance.balance} ETH</span>
                <span className="usd-value">${mockWalletBalance.usdValue.toLocaleString()}</span>
              </div>
              <div className="wallet-address">
                <Wallet size={16} />
                <span>{mockWalletBalance.address}</span>
                <ChevronDown size={16} />
              </div>
            </div>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={handleWalletConnect}
            >
              <Wallet size={16} />
              Connect Wallet
            </button>
          )}
        </div>

        <button className="settings-btn">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;