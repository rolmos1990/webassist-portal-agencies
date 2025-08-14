import { useHorizontalBarChart } from '../../hooks/useHorizontalBarChart';
import type { HorizontalBarChartProps } from '../../interfaces';

export default function HorizontalBarChart({
  id,
  data,
  backgroundColor,
  height = 450,
  maxValue = 10000,
  stepSize = 2000,
}: HorizontalBarChartProps) {
  const { canvasRef } = useHorizontalBarChart({
    data,
    backgroundColor,
    height,
    maxValue,
    stepSize,
  });

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
