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
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="portfolio-chart card">
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