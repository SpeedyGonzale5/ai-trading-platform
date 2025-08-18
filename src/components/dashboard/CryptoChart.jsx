import React from 'react';
import { LineChart, Line, ResponsiveContainer, Dot, ReferenceLine, Area, AreaChart } from 'recharts';

const CryptoChart = ({ crypto, data, className = "" }) => {
  // Generate realistic market data with volatility patterns and key price points
  const generateMarketData = (symbol) => {
    const basePrice = crypto?.price || 100;
    const dataPoints = 25;
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const timeVariation = i / dataPoints;
      let priceMultiplier = 1;
      let isKeyPoint = false;
      
      // Add realistic crypto volatility patterns
      if (symbol === 'BTC') {
        priceMultiplier = 1 + Math.sin(timeVariation * Math.PI * 2) * 0.15 + 
                          Math.sin(timeVariation * Math.PI * 6) * 0.08 + 
                          (Math.random() - 0.5) * 0.05;
        isKeyPoint = i === Math.floor(dataPoints * 0.2) || i === Math.floor(dataPoints * 0.8) || i === dataPoints - 1;
      } else if (symbol === 'ETH') {
        priceMultiplier = 1 + Math.sin(timeVariation * Math.PI * 1.8) * 0.12 + 
                          Math.cos(timeVariation * Math.PI * 4) * 0.06 + 
                          (Math.random() - 0.5) * 0.04;
        isKeyPoint = i === Math.floor(dataPoints * 0.3) || i === Math.floor(dataPoints * 0.7) || i === dataPoints - 1;
      } else if (symbol === 'SOL') {
        priceMultiplier = 1 + Math.sin(timeVariation * Math.PI * 2.2) * 0.18 + 
                          Math.sin(timeVariation * Math.PI * 8) * 0.09 + 
                          (Math.random() - 0.5) * 0.06;
        isKeyPoint = i === Math.floor(dataPoints * 0.25) || i === Math.floor(dataPoints * 0.75) || i === dataPoints - 1;
      } else if (symbol === 'BNB') {
        priceMultiplier = 0.95 + Math.sin(timeVariation * Math.PI * 1.5) * 0.08 + 
                          Math.cos(timeVariation * Math.PI * 5) * 0.04 + 
                          (Math.random() - 0.5) * 0.03;
        isKeyPoint = i === Math.floor(dataPoints * 0.15) || i === Math.floor(dataPoints * 0.85) || i === dataPoints - 1;
      } else if (symbol === 'ADA') {
        priceMultiplier = 0.92 + Math.sin(timeVariation * Math.PI * 1.3) * 0.10 + 
                          Math.cos(timeVariation * Math.PI * 7) * 0.05 + 
                          (Math.random() - 0.5) * 0.04;
        isKeyPoint = i === Math.floor(dataPoints * 0.35) || i === Math.floor(dataPoints * 0.65) || i === dataPoints - 1;
      }
      
      const currentPrice = basePrice * priceMultiplier;
      data.push({
        time: i,
        price: currentPrice,
        isKeyPoint: isKeyPoint,
        priceLabel: isKeyPoint ? `$${currentPrice.toFixed(2)}` : null
      });
    }
    
    return data;
  };

  const chartData = data || generateMarketData(crypto?.symbol);
  
  // Determine color based on crypto and change
  const getChartColor = () => {
    if (crypto?.change24h >= 0) {
      return '#3B82F6'; // Blue for positive
    } else {
      return '#EF4444'; // Red for negative
    }
  };
  
  // Custom dot component for key price points
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!payload?.isKeyPoint) return null;
    
    return (
      <Dot 
        cx={cx} 
        cy={cy} 
        r={3} 
        fill={getChartColor()} 
        stroke="#ffffff" 
        strokeWidth={1.5}
        style={{
          filter: `drop-shadow(0 0 4px ${getChartColor()})`,
        }}
      />
    );
  };

  // Enhanced chart with gradient fill like reference
  const chartColor = getChartColor();
  const gradientId = `gradient-${crypto?.symbol || 'default'}`;
  
  return (
    <div className={`crypto-chart-container ${className}`}>
      <ResponsiveContainer width="100%" height={80}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
              <stop offset="50%" stopColor={chartColor} stopOpacity={0.1} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
            <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Gradient for glowing only middle segment of the stroke */}
            <linearGradient id={`glow-stroke-${gradientId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0} />
              <stop offset="30%" stopColor={chartColor} stopOpacity={1} />
              <stop offset="70%" stopColor={chartColor} stopOpacity={1} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Main area with gradient fill */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="none"
            strokeWidth={0}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={false}
          />
          {/* Solid line without glow for entire path */}
          <Line
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={2}
            dot={{ r: 2, stroke: '#ffffff', strokeWidth: 1, fill: chartColor }}
            isAnimationActive={false}
          />
          {/* Glowing overlay line limited to middle via stroke gradient */}
          <Line
            type="monotone"
            dataKey="price"
            stroke={`url(#glow-stroke-${gradientId})`}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            style={{ filter: `drop-shadow(0 0 8px ${chartColor})` }}
          />
          {/* Dashed baseline reference like the mock */}
          <ReferenceLine
            y={chartData[Math.floor(chartData.length * 0.7)]?.price}
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Value label like in reference */}
      {chartData.length > 0 && (
        <div className="chart-value-label">
          <span className={`chart-value ${crypto?.change24h >= 0 ? 'positive' : 'negative'}`}>
            {crypto?.change24h >= 0 ? '-' : '-'}${Math.abs(crypto?.value * 0.1).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CryptoChart;