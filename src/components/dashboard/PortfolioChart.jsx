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

// Custom glow effect plugin
const glowPlugin = {
  id: 'glow',
  beforeDatasetsDraw: (chart) => {
    const { ctx, data } = chart;
    const dataset = data.datasets[0];
    const points = chart.getDatasetMeta(0).data;

    if (points && points.length > 0) {
      ctx.save();
      
      // Create glow effect
      ctx.shadowColor = '#3B82F6';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw the line path for glow
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.restore();
    }
  }
};

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
        backgroundColor: 'rgba(13, 15, 20, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#9CA3AF',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 2,
        cornerRadius: 12,
        displayColors: false,
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
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
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: '#9CA3AF',
          maxTicksLimit: 8,
          font: {
            size: 12,
            weight: 500,
          },
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
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12,
            weight: 500,
          },
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
        borderColor: '#3B82F6',
        borderWidth: 2,
        segment: {
          borderColor: '#3B82F6',
        },
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart || {};
          if (!chartArea) return 'rgba(59, 130, 246, 0.1)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.15)');
          gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.05)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          return gradient;
        },
        fill: true,
        pointRadius: (context) => {
          // Show highlight point on the last data point
          const index = context.dataIndex;
          const isLast = index === data.length - 1;
          return isLast ? 6 : 0;
        },
        pointBackgroundColor: (context) => {
          const index = context.dataIndex;
          const isLast = index === data.length - 1;
          return isLast ? '#ffffff' : 'transparent';
        },
        pointBorderColor: (context) => {
          const index = context.dataIndex;
          const isLast = index === data.length - 1;
          return isLast ? '#3B82F6' : 'transparent';
        },
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#3B82F6',
        pointHoverBorderWidth: 3,
        tension: 0.4,
        shadowColor: 'rgba(59, 130, 246, 0.6)',
        shadowBlur: 15,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
    ],
  };

  return (
    <div className="portfolio-chart card has-grain">
      <div className="chart-container">
        <Line 
          ref={chartRef} 
          data={chartData} 
          options={options} 
          plugins={[glowPlugin]}
        />
      </div>
    </div>
  );
};

export default PortfolioChart;