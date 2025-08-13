import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export interface RadioChartConfig {
  id: string;
  title: string;
  data: number[];
  labels: string[];
  borderColor: string;
  backgroundColor: string;
  pointBackgroundColor: string;
  pointBorderColor?: string;
  yAxisFormatter?: (value: number) => string;
  yAxisMax?: number;
  height?: number;
}

interface RadioChartProps {
  config: RadioChartConfig;
}

export default function RadioChart({ config }: RadioChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: config.labels,
        datasets: [
          {
            label: '',
            data: config.data,
            borderColor: config.borderColor,
            backgroundColor: config.backgroundColor,
            pointBackgroundColor: config.pointBackgroundColor,
            pointBorderColor: config.pointBorderColor || '#fff',
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false,
            tension: 0.3,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          y: {
            beginAtZero: true,
            ...(config.yAxisMax && { max: config.yAxisMax }),
            ticks: {
              callback: config.yAxisFormatter 
                ? (value) => config.yAxisFormatter!(typeof value === 'number' ? value : parseFloat(value as string))
                : undefined,
              font: { size: 13 },
              maxTicksLimit: 6,
            },
            grid: { color: '#e0e0e0' },
            border: { display: false },
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 13 } },
          },
        },
      },
    };

    chartInstanceRef.current = new Chart(ctx, chartConfig);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [config]);

  return (
    <div className="border w-100 p-3">
      <h1 className="mb-5" style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
        {config.title}
      </h1>
      <div className="ratio-chart">
        <canvas ref={chartRef} height={config.height || 250} />
      </div>
    </div>
  );
}
