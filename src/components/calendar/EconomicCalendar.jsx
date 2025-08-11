import React from 'react';
import { Calendar, Brain, TrendingUp } from 'lucide-react';

const EconomicCalendar = () => {
  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>Economic Calendar</h1>
        <p>Track important economic events with AI-powered market impact predictions</p>
      </div>

      <div className="coming-soon">
        <Calendar size={64} className="coming-soon-icon" />
        <h2>AI-Powered Economic Calendar</h2>
        <p>Smart economic calendar with AI impact scoring coming soon...</p>
        
        <div className="feature-list">
          <div className="feature-item">
            <Brain size={20} />
            <span>AI Impact Scoring</span>
          </div>
          <div className="feature-item">
            <Calendar size={20} />
            <span>Economic Events Timeline</span>
          </div>
          <div className="feature-item">
            <TrendingUp size={20} />
            <span>Market Predictions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicCalendar;