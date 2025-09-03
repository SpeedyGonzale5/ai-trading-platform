import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Compass, 
  Calendar, 
  MessageCircle,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggle }) => {
  const navItems = [
    { 
      path: '/portfolio', 
      icon: BarChart3, 
      label: 'Portfolio',
      description: 'Track your investments'
    },
    { 
      path: '/trading', 
      icon: TrendingUp, 
      label: 'Trading',
      description: 'Buy & sell stocks'
    },
    { 
      path: '/discover', 
      icon: Compass, 
      label: 'Discover',
      description: 'Find new stocks'
    },
    { 
      path: '/calendar', 
      icon: Calendar, 
      label: 'Calendar',
      description: 'Economic events'
    },
    { 
      path: '/social', 
      icon: MessageCircle, 
      label: 'Social',
      description: 'Market sentiment'
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle"
          onClick={onToggle}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
        {!collapsed && <span className="sidebar-title">Navigation</span>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ path, icon: Icon, label, description }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={20} className="nav-icon" />
            {!collapsed && (
              <div className="nav-content">
                <span className="nav-label">{label}</span>
                <span className="nav-description">{description}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="market-status">
            <div className="status-indicator">
              <div className="status-dot active"></div>
              <span>Markets Open</span>
            </div>
            <div className="market-stats">
              <div className="stat">
                <span className="stat-label">24h Volume</span>
                <span className="stat-value">$847B</span>
              </div>
              <div className="stat">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">$1.2T</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;