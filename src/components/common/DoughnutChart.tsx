import type { DoughnutChartConfig } from '../../common/interfaces/chart';
import { useDoughnutChart } from '../../hooks/useDoughnutChart';

export interface DoughnutChartProps {
    percentage: number;
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    size?: number;
    cutout?: string;
    animationDuration?: number;
    centerText?: string;
    showTooltips?: boolean;
    className?: string;
    config?: DoughnutChartConfig;
}


export default function DoughnutChart({
  percentage,
  primaryColor,
  backgroundColor,
  textColor,
  fontFamily,
  size = 52,
  cutout,
  animationDuration,
  centerText,
  showTooltips,
  className = '',
  config,
}: DoughnutChartProps) {
  const chartConfig: DoughnutChartConfig = config || {
    percentage,
    primaryColor,
    backgroundColor,
    textColor,
    fontFamily,
    cutout,
    animationDuration,
    centerText,
    showTooltips,
  };

  const { canvasRef } = useDoughnutChart({ config: chartConfig });

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ display: 'block' }}
    />
  );
}
