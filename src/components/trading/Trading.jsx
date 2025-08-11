import React, { useState, useEffect } from 'react';
import TradingChart from './TradingChart';
import OrderBook from './OrderBook';
import TradingPanel from './TradingPanel';
import RecentTrades from './RecentTrades';
import TradingPairs from './TradingPairs';
import { mockTradingPairs, generateRandomPrice } from '../../data/mockData';

const Trading = () => {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');
  const [tradingPairs, setTradingPairs] = useState(mockTradingPairs);
  const [currentPrice, setCurrentPrice] = useState(43250.80);
  const [priceHistory, setPriceHistory] = useState([]);
  const [orderBookData, setOrderBookData] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);

  // Initialize price history and real-time updates
  useEffect(() => {
    // Generate initial price history (last 100 candles)
    const initialHistory = [];
    let basePrice = currentPrice;
    const now = new Date();
    
    for (let i = 99; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000); // 1-minute intervals
      const open = basePrice;
      const change = (Math.random() - 0.5) * 0.02; // ±2% change
      const close = basePrice * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      
      initialHistory.push({
        timestamp: timestamp.toISOString(),
        open,
        high,
        low,
        close,
        volume: Math.random() * 100 + 50
      });
      
      basePrice = close;
    }
    
    setPriceHistory(initialHistory);
    setCurrentPrice(basePrice);
    
    // Generate initial order book
    generateOrderBook(basePrice);
    
    // Generate initial recent trades
    generateRecentTrades(basePrice);
  }, [selectedPair]);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = generateRandomPrice(currentPrice, 0.001);
      setCurrentPrice(newPrice);
      
      // Update price history with new candle
      const now = new Date();
      setPriceHistory(prev => {
        const newCandle = {
          timestamp: now.toISOString(),
          open: prev[prev.length - 1]?.close || newPrice,
          high: newPrice * (1 + Math.random() * 0.005),
          low: newPrice * (1 - Math.random() * 0.005),
          close: newPrice,
          volume: Math.random() * 100 + 50
        };
        
        return [...prev.slice(1), newCandle]; // Keep last 100 candles
      });
      
      // Update order book
      generateOrderBook(newPrice);
      
      // Add new trades occasionally
      if (Math.random() > 0.7) {
        generateRecentTrades(newPrice, 1);
      }
      
      // Update trading pairs list
      setTradingPairs(prev => prev.map(pair => 
        pair.symbol === selectedPair 
          ? { ...pair, price: newPrice, change24h: pair.change24h + (Math.random() - 0.5) * 0.1 }
          : pair
      ));
      
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [currentPrice, selectedPair]);

  const generateOrderBook = (price) => {
    const bids = [];
    const asks = [];
    
    // Generate bids (buy orders) below current price
    for (let i = 0; i < 15; i++) {
      const bidPrice = price * (1 - (i + 1) * 0.001);
      const quantity = Math.random() * 10 + 0.1;
      bids.push({
        price: bidPrice,
        quantity,
        total: bidPrice * quantity
      });
    }
    
    // Generate asks (sell orders) above current price
    for (let i = 0; i < 15; i++) {
      const askPrice = price * (1 + (i + 1) * 0.001);
      const quantity = Math.random() * 10 + 0.1;
      asks.push({
        price: askPrice,
        quantity,
        total: askPrice * quantity
      });
    }
    
    setOrderBookData({ bids, asks });
  };

  const generateRecentTrades = (price, count = 20) => {
    const trades = [];
    const now = Date.now();
    
    for (let i = 0; i < count; i++) {
      const tradePrice = price * (1 + (Math.random() - 0.5) * 0.002);
      const quantity = Math.random() * 5 + 0.1;
      const side = Math.random() > 0.5 ? 'buy' : 'sell';
      
      trades.push({
        id: `trade_${now}_${i}`,
        price: tradePrice,
        quantity,
        side,
        timestamp: new Date(now - i * 1000).toISOString(),
        total: tradePrice * quantity
      });
    }
    
    if (count === 1) {
      setRecentTrades(prev => [trades[0], ...prev.slice(0, 19)]);
    } else {
      setRecentTrades(trades);
    }
  };

  const handlePairChange = (newPair) => {
    setSelectedPair(newPair);
    const pairData = tradingPairs.find(p => p.symbol === newPair);
    if (pairData) {
      setCurrentPrice(pairData.price);
    }
  };

  return (
    <div className="trading-page">
      <div className="trading-header">
        <div className="pair-info">
          <h2>{selectedPair}</h2>
        </div>
        
        <div className="price-ticker">
          <div className="current-price">
            <span className="price-value">${currentPrice.toLocaleString()}</span>
            <span className={`price-change ${tradingPairs.find(p => p.symbol === selectedPair)?.change24h >= 0 ? 'positive' : 'negative'}`}>
              {tradingPairs.find(p => p.symbol === selectedPair)?.change24h >= 0 ? '+' : ''}
              {tradingPairs.find(p => p.symbol === selectedPair)?.change24h?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="trading-layout">
        {/* Trading Pairs */}
        <div className="pairs-section">
          <TradingPairs 
            pairs={tradingPairs}
            selectedPair={selectedPair}
            onPairChange={handlePairChange}
          />
        </div>

        {/* Main Chart Area */}
        <div className="chart-section">
          <TradingChart 
            data={priceHistory}
            currentPrice={currentPrice}
            pair={selectedPair}
          />
        </div>

        {/* Order Book */}
        <div className="orderbook-section">
          <OrderBook data={orderBookData} currentPrice={currentPrice} />
        </div>

        {/* Trading Panel */}
        <div className="trading-panel-section">
          <TradingPanel 
            pair={selectedPair}
            currentPrice={currentPrice}
          />
        </div>

        {/* Recent Trades */}
        <div className="trades-section">
          <RecentTrades trades={recentTrades} />
        </div>
      </div>
    </div>
  );
};

export default Trading;