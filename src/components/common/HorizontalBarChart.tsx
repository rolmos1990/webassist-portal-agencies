import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartDataItem {
  name: string;
  subtitle: string;
  value: number;
}

interface HorizontalBarChartProps {
  id: string;
  data: ChartDataItem[];
  backgroundColor: string;
  height?: number;
  maxValue?: number;
  stepSize?: number;
}

export default function HorizontalBarChart({
  id,
  data,
  backgroundColor,
  height = 450,
  maxValue = 10000,
  stepSize = 2000,
}: HorizontalBarChartProps) {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(() => ''), // Hide y-axis labels, use custom HTML for labels
        datasets: [
          {
            label: '',
            data: data.map(item => item.value),
            backgroundColor: backgroundColor,
            borderRadius: 8,
            barPercentage: 0.7,
            categoryPercentage: 0.7,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: 'y', // This makes it horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context: any) {
                const dataIndex = context.dataIndex;
                const item = data[dataIndex];
                return `${item.name}: $${(item.value / 1000).toFixed(1)}K`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: maxValue,
            min: 0,
            ticks: {
              callback: function (value: any) {
                return '$' + value / 1000 + 'K';
              },
              font: { size: 13 },
              stepSize: stepSize,
            },
            grid: { 
              color: '#e0e0e0',
              drawOnChartArea: true,
            },
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 13 }, display: false },
          },
        },
        animation: {
          onComplete: function (this: any) {
            const chartInstance = this;
            const ctx = chartInstance.ctx;
            ctx.font = '13px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = '#21272a';
            
            this.data.datasets.forEach((dataset: any, i: number) => {
              const meta = chartInstance.getDatasetMeta(i);
              meta.data.forEach((bar: any, index: number) => {
                const value = dataset.data[index];
                const x = bar.x;
                const y = bar.y;
                ctx.fillText(
                  '$' + (value / 1000).toFixed(1) + 'K',
                  x + 8,
                  y + 18
                );
              });
            });
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, backgroundColor, height, maxValue, stepSize]);

  return (
    <div className="performance-chart-container">
      <div className="performance-labels">
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: index === data.length - 1 ? 0 : 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
              {item.name}
            </div>
            <div style={{ fontSize: 11, color: '#4b647e' }}>
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
      <div className="performance-chart">
        <canvas ref={canvasRef} id={id} height={height}></canvas>
      </div>
    </div>
  );
}
