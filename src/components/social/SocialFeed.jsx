import React from 'react';
import { MessageCircle, Twitter, Activity } from 'lucide-react';
import StockTopCards from './CryptoTopCards';
import '../../styles/social-cards.css';

const SocialFeed = () => {
  return (
    <div className="social-page">
      <div className="page-header">
        <h1>Social Feed</h1>
        <p>Monitor market sentiment through social media and whale tracking</p>
      </div>

      {/* Stock Top Cards Section */}
      <StockTopCards />

      <div className="coming-soon">
        <MessageCircle size={64} className="coming-soon-icon" />
        <h2>Social Sentiment Analytics</h2>
        <p>Real-time social media monitoring and whale tracking coming soon...</p>
        
        <div className="feature-list">
          <div className="feature-item">
            <Twitter size={20} />
            <span>Twitter Sentiment Analysis</span>
          </div>
          <div className="feature-item">
            <Activity size={20} />
            <span>Whale Transaction Tracking</span>
          </div>
          <div className="feature-item">
            <MessageCircle size={20} />
            <span>Community Discussion Feed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;