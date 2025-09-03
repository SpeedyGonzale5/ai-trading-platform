import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Settings, Wallet, Star, Calendar, User } from 'lucide-react';

const TopBar = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  const mockWalletBalance = {
    address: '0x1234...5678',
    balance: 2.45,
    usdValue: 3287.50
  };

  const navItems = [
    { name: 'Discover', path: '/discover' },
    { name: 'Pulse', path: '/pulse' },
    { name: 'Trackers', path: '/trackers' },
    { name: 'Perpetuals', path: '/trading' },
    { name: 'Yield', path: '/yield' },
    { name: 'Vision', path: '/vision' },
    { name: 'Portfolio', path: '/' },
    { name: 'Rewards', path: '/rewards' }
  ];

  const handleWalletConnect = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <header className="modern-topbar">
      <div className="topbar-left">
        <div className="logo">
          <span className="logo-icon">▲</span>
          <span className="logo-text">Point</span>
        </div>
        
        <nav className="main-nav">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className={`nav-link ${
                (location.pathname === item.path || 
                 (item.path === '/' && (location.pathname === '/' || location.pathname === '/portfolio')))
                ? 'active' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="topbar-center">
        <div className="search-container-modern">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input-modern" 
            placeholder="Search stocks, symbols, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="topbar-right">
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">AAPL</span>
            <span className="stat-value positive">+2.56%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">GOOGL</span>
            <span className="stat-value positive">+1.34%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">META</span>
            <span className="stat-value negative">-1.45%</span>
          </div>
        </div>

        {walletConnected ? (
          <div className="wallet-connected">
            <div className="wallet-balance-modern">
              <span className="balance">${mockWalletBalance.usdValue.toLocaleString()}</span>
            </div>
            <div className="wallet-address-modern">
              <Wallet size={14} />
              <span>{mockWalletBalance.address}</span>
            </div>
          </div>
        ) : (
          <button 
            className="connect-wallet-btn"
            onClick={handleWalletConnect}
          >
            Connect Wallet
          </button>
        )}

        <button className="icon-btn favorites-btn">
          <Star size={18} />
        </button>
        
        <button className="icon-btn notifications-btn">
          <Bell size={18} />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>
        
        <button className="icon-btn calendar-btn">
          <Calendar size={18} />
        </button>
        
        <button className="icon-btn profile-btn">
          <User size={18} />
        </button>
        
        <button className="icon-btn settings-btn">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;