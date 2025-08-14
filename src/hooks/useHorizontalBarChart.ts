import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { UseHorizontalBarChartProps } from '../interfaces';

export function useHorizontalBarChart({
    data,
    backgroundColor,
    height = 450,
    maxValue = 10000,
    stepSize = 2000,
    config,
}: UseHorizontalBarChartProps) {
    // Use config if provided, otherwise use legacy props
    const chartData = config?.data || data || [];
    const chartBackgroundColor = config?.backgroundColor || backgroundColor || '#7ac142';
    const chartHeight = config?.height || height;
    const chartMaxValue = config?.maxValue || maxValue;
    const chartStepSize = config?.stepSize || stepSize;
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
                labels: chartData.map(() => ''), // Hide y-axis labels, use custom HTML for labels
                datasets: [
                    {
                        label: '',
                        data: chartData.map(item => item.value),
                        backgroundColor: chartBackgroundColor,
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
                                const item = chartData[dataIndex];
                                return `${item.name}: $${(item.value / 1000).toFixed(1)}K`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: chartMaxValue,
                        min: 0,
                        ticks: {
                            callback: function (value: any) {
                                return '$' + value / 1000 + 'K';
                            },
                            font: { size: 13 },
                            stepSize: chartStepSize,
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
    }, [chartData, chartBackgroundColor, chartHeight, chartMaxValue, chartStepSize]);

    return {
        canvasRef,
    };
}


