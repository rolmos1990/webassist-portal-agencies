import { Bar } from 'react-chartjs-2';
import { useBarChart } from '../../hooks/useBarChart';

export interface BarChartProps {
    data: import('chart.js').ChartData<'bar'>;
    options?: import('chart.js').ChartOptions<'bar'>;
    height?: string;
    className?: string;
}

export default function BarChart({ 
  data, 
  options, 
  height = '420px', 
  className = '' 
}: BarChartProps) {
  const { chartData, chartOptions } = useBarChart({ data, options });

  return (
    <div className={className} style={{ height }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
