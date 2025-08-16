import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PortfolioChart = ({ data }) => {
  const chartRef = useRef();

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
            const date = new Date(tooltipItems[0].label);
            return date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          },
          label: (context) => {
            return `Portfolio Value: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(64, 64, 64, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#b3b3b3',
          maxTicksLimit: 8,
          callback: function(value, index) {
            const date = new Date(this.getLabelForValue(value));
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
          },
        },
      },
      y: {
        display: true,
        position: 'right',
        grid: {
          color: 'rgba(64, 64, 64, 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: '#b3b3b3',
          callback: function(value) {
            return formatCurrency(value, 0);
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 8,
        hoverRadius: 6,
        hoverBackgroundColor: '#3b82f6',
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 2,
      },
      line: {
        tension: 0.2,
        borderWidth: 2,
      },
    },
  };

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.map(item => item.value),
        borderColor: '#00d4ff',
        borderWidth: 2,
        segment: {
          // Add subtle glow-like shadow effect
          borderColor: '#00d4ff',
        },
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart || {};
          if (!chartArea) return 'rgba(0, 212, 255, 0.08)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(0, 212, 255, 0.20)');
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0.00)');
          return gradient;
        },
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#00d4ff',
        pointHoverBorderWidth: 2,
        tension: 0.35,
      },
    ],
  };

  return (
    <div className="portfolio-chart card has-grain">
      <div className="card-header">
        <h3>Portfolio Performance</h3>
        <div className="chart-timeframe">
          <button className="timeframe-btn active">30D</button>
          <button className="timeframe-btn">90D</button>
          <button className="timeframe-btn">1Y</button>
          <button className="timeframe-btn">ALL</button>
        </div>
      </div>
      <div className="chart-container">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PortfolioChart;