import { useMemo } from 'react';
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
import type { UseBarChartProps } from '../interfaces';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function useBarChart({ data, options, config }: UseBarChartProps) {
    // Convert config to ChartData if provided, ensuring we always have valid data
    const chartData = useMemo((): ChartData<'bar'> => {
        if (config) {
            return {
                labels: config.labels,
                datasets: config.datasets.map(dataset => ({
                    ...dataset,
                    borderRadius: dataset.borderRadius || 6,
                    barPercentage: dataset.barPercentage || 0.7,
                    categoryPercentage: dataset.categoryPercentage || 0.8,
                }))
            } as ChartData<'bar'>;
        }
        
        if (data) {
            return data;
        }
        
        // Fallback empty data if neither config nor data provided
        return {
            labels: [],
            datasets: []
        };
    }, [config, data]);

    const defaultOptions: ChartOptions<'bar'> = useMemo(() => ({
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
    }), []);

    // Merge default options with provided options
    const mergedOptions = useMemo(() => ({
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
    }), [defaultOptions, options]);

    return {
        chartData,
        chartOptions: mergedOptions,
    };
}
