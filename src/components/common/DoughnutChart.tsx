import { useDoughnutChart } from '../../hooks/useDoughnutChart';
import type { DoughnutChartProps, DoughnutChartConfig } from '../../interfaces';

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
  // Use config if provided, otherwise use individual props
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
