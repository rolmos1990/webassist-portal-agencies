import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  height?: string;
  className?: string;
}

export default function BarChart({ 
  data, 
  options, 
  height = '420px', 
  className = '' 
}: BarChartProps) {
  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          padding: 16,
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 13 },
        },
        grid: { 
          color: "#e0e0e0"
        },
      },
      x: {
        grid: { 
          display: false 
        },
        ticks: { 
          font: { size: 13 } 
        },
      },
    },
  };

  // Merge default options with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options?.plugins,
    },
    scales: {
      ...defaultOptions.scales,
      ...options?.scales,
    },
  };

  return (
    <div className={className} style={{ height }}>
      <Bar data={data} options={mergedOptions} />
    </div>
  );
}
