import { useRadioChart } from '../../hooks/useRadioChart';
import type { RadioChartProps } from '../../interfaces';

export default function RadioChart({ config }: RadioChartProps) {
  const { chartRef } = useRadioChart({ config });

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
