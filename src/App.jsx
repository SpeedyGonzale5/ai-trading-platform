import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/common/TopBar';
import Sidebar from './components/common/Sidebar';
import Portfolio from './components/dashboard/Portfolio';
import Trading from './components/trading/Trading';
import TokenDiscovery from './components/discovery/TokenDiscovery';
import EconomicCalendar from './components/calendar/EconomicCalendar';
import SocialFeed from './components/social/SocialFeed';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="app-layout">
        <TopBar />
        <div className="main-layout">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/discover" element={<TokenDiscovery />} />
              <Route path="/calendar" element={<EconomicCalendar />} />
              <Route path="/social" element={<SocialFeed />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;