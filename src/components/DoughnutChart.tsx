import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export interface DoughnutChartProps {
  /** Percentage value to display (0-100) */
  percentage: number;
  /** Primary color for the filled portion */
  primaryColor?: string;
  /** Background color for the unfilled portion */
  backgroundColor?: string;
  /** Color for the center text */
  textColor?: string;
  /** Font family for the center text */
  fontFamily?: string;
  /** Size of the chart (width and height) */
  size?: number;
  /** Thickness of the doughnut (0-100, where 100 is a full circle) */
  cutout?: string;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Custom text to display in center (if not provided, shows percentage) */
  centerText?: string;
  /** Whether to show tooltips on hover */
  showTooltips?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export default function DoughnutChart({
  percentage,
  primaryColor = '#7ac142',
  backgroundColor = '#f0f2f4',
  textColor = '#333333',
  fontFamily = 'Arial, sans-serif',
  size = 52,
  cutout = '80%',
  animationDuration = 1000,
  centerText,
  showTooltips = false,
  className = '',
}: DoughnutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const displayText = centerText || `${clampedPercentage}%`;

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [clampedPercentage, 100 - clampedPercentage],
            backgroundColor: [primaryColor, backgroundColor],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: { enabled: showTooltips },
          legend: { display: false },
        },
        hover: { mode: showTooltips ? 'nearest' : undefined },
        animation: {
          duration: animationDuration,
        },
        responsive: false,
        maintainAspectRatio: false,
        cutout,
      },
      plugins: [
        {
          id: 'centerText',
          beforeDraw: function (chart) {
            const { width, height, ctx } = chart;
            ctx.restore();
            
            // Calculate font size based on chart size
            const fontSize = Math.max(10, height / 3.5);
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            
            const textX = width / 2;
            const textY = height / 2;
            
            ctx.fillStyle = textColor;
            ctx.fillText(displayText, textX, textY);
            ctx.save();
          },
        },
      ],
    };

    chartRef.current = new Chart(ctx, config);

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [
    clampedPercentage,
    primaryColor,
    backgroundColor,
    textColor,
    fontFamily,
    cutout,
    animationDuration,
    displayText,
    showTooltips,
  ]);

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
