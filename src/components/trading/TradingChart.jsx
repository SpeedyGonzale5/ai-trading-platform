import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BarChart3, TrendingUp, Volume2, Settings } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const TradingChart = ({ data, currentPrice, pair }) => {
  const chartRef = useRef();
  const [timeframe, setTimeframe] = useState('1m');
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);

  // Custom candlestick chart plugin
  const candlestickPlugin = {
    id: 'candlestick',
    beforeDatasetsDraw: (chart) => {
      if (chartType !== 'candlestick') return;
      
      const { ctx, data, scales: { x, y } } = chart;
      const candles = data.datasets[0].data;
      
      ctx.save();
      
      candles.forEach((candle, index) => {
        if (!candle || typeof candle !== 'object') return;
        
        const xPos = x.getPixelForValue(index);
        const openY = y.getPixelForValue(candle.o);
        const highY = y.getPixelForValue(candle.h);
        const lowY = y.getPixelForValue(candle.l);
        const closeY = y.getPixelForValue(candle.c);
        
        const candleWidth = Math.max(x.width / candles.length * 0.8, 2);
        const isGreen = candle.c >= candle.o;
        
        // Draw high-low line
        ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xPos, highY);
        ctx.lineTo(xPos, lowY);
        ctx.stroke();
        
        // Draw body rectangle
        ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
        ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
        ctx.lineWidth = 1;
        
        const bodyHeight = Math.abs(closeY - openY);
        const bodyTop = Math.min(openY, closeY);
        
        if (bodyHeight < 2) {
          // Draw thin line for doji
          ctx.beginPath();
          ctx.moveTo(xPos - candleWidth / 2, openY);
          ctx.lineTo(xPos + candleWidth / 2, openY);
          ctx.stroke();
        } else {
          // Draw rectangle
          if (isGreen) {
            ctx.fillRect(xPos - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
          } else {
            ctx.strokeRect(xPos - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
          }
        }
      });
      
      ctx.restore();
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(42, 42, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#b3b3b3',
        borderColor: '#404040',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const candle = data[index];
            if (candle) {
              return new Date(candle.timestamp).toLocaleString();
            }
            return '';
          },
          label: (context) => {
            const candle = data[context.dataIndex];
            if (!candle) return '';
            
            return [
              `Open: $${candle.open.toFixed(2)}`,
              `High: $${candle.high.toFixed(2)}`,
              `Low: $${candle.low.toFixed(2)}`,
              `Close: $${candle.close.toFixed(2)}`,
              `Volume: ${candle.volume.toFixed(2)}`
            ];
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(64, 64, 64, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#b3b3b3',
          maxTicksLimit: 10,
          callback: function(value, index) {
            const candle = data[index];
            if (candle) {
              return new Date(candle.timestamp).toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              });
            }
            return '';
          },
        },
      },
      y: {
        display: true,
        position: 'right',
        grid: {
          color: 'rgba(64, 64, 64, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#b3b3b3',
          callback: function(value) {
            return `$${value.toFixed(2)}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
        tension: 0,
      },
    },
  };

  const getChartData = () => {
    if (!data || data.length === 0) return { datasets: [] };
    
    if (chartType === 'line') {
      return {
        labels: data.map((_, index) => index),
        datasets: [
          {
            label: 'Price',
            data: data.map(candle => candle.close),
            borderColor: currentPrice >= data[0]?.close ? '#10b981' : '#ef4444',
            backgroundColor: 'transparent',
            fill: false,
          },
        ],
      };
    }
    
    // Candlestick data
    return {
      labels: data.map((_, index) => index),
      datasets: [
        {
          label: 'Price',
          data: data.map(candle => ({
            x: candle.timestamp,
            o: candle.open,
            h: candle.high,
            l: candle.low,
            c: candle.close,
          })),
          borderColor: 'transparent',
          backgroundColor: 'transparent',
        },
      ],
    };
  };

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];

  return (
    <div className="trading-chart card">
      <div className="chart-header">
        <div className="chart-title">
          <BarChart3 size={20} />
          <h3>{pair}</h3>
          <span className="current-price-label">
            ${currentPrice.toLocaleString()}
          </span>
        </div>
        
        <div className="chart-controls">
          {/* Timeframe Selector */}
          <div className="timeframe-selector">
            {timeframes.map(tf => (
              <button
                key={tf}
                className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart Type Selector */}
          <div className="chart-type-selector">
            <button
              className={`chart-type-btn ${chartType === 'candlestick' ? 'active' : ''}`}
              onClick={() => setChartType('candlestick')}
              title="Candlestick Chart"
            >
              <BarChart3 size={16} />
            </button>
            <button
              className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
              title="Line Chart"
            >
              <TrendingUp size={16} />
            </button>
          </div>
          
          {/* Volume Toggle */}
          <button
            className={`volume-toggle ${showVolume ? 'active' : ''}`}
            onClick={() => setShowVolume(!showVolume)}
            title="Toggle Volume"
          >
            <Volume2 size={16} />
          </button>
          
          {/* Settings */}
          <button className="chart-settings-btn">
            <Settings size={16} />
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        <Chart
          ref={chartRef}
          type={chartType === 'line' ? 'line' : 'bar'}
          data={getChartData()}
          options={options}
          plugins={chartType === 'candlestick' ? [candlestickPlugin] : []}
        />
      </div>
      
      {showVolume && (
        <div className="volume-chart">
          <div className="volume-bars">
            {data.slice(-20).map((candle, index) => (
              <div
                key={index}
                className="volume-bar"
                style={{
                  height: `${(candle.volume / Math.max(...data.slice(-20).map(c => c.volume))) * 50}px`,
                  backgroundColor: candle.close >= candle.open ? '#10b981' : '#ef4444',
                  opacity: 0.7
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingChart;