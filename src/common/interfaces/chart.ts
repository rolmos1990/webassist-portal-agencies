// Enhanced Chart configuration interfaces for stateless components
export interface DoughnutChartConfig {
    /** Unique identifier for the chart */
    id?: string;
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
    /** Thickness of the doughnut (0-100, where 100 is a full circle) */
    cutout?: string;
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Custom text to display in center (if not provided, shows percentage) */
    centerText?: string;
    /** Whether to show tooltips on hover */
    showTooltips?: boolean;
}

// Enhanced BarChart configuration interface (following the pattern from memory)
export interface BarChartConfig {
    /** Unique identifier for the chart */
    id: string;
    /** Chart title */
    title?: string;
    /** Data labels for the chart */
    labels: string[];
    /** Chart datasets */
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string | string[] | ((ctx: any) => string);
        borderRadius?: number;
        barPercentage?: number;
        categoryPercentage?: number;
    }[];
    /** Y-axis formatter function */
    yAxisFormatter?: (value: number) => string;
    /** Whether to show legend */
    showLegend?: boolean;
    /** Whether to show grid */
    showGrid?: boolean;
    /** Whether chart is horizontal */
    horizontal?: boolean;
    /** Chart height */
    height?: number;
    /** Y-axis maximum value */
    yAxisMax?: number;
    /** Y-axis step size */
    yAxisStepSize?: number;
}

// Enhanced HorizontalBarChart configuration interface
export interface HorizontalBarChartConfig {
    /** Unique identifier for the chart */
    id: string;
    /** Chart title */
    title?: string;
    /** Chart data items */
    data: ChartDataItem[];
    /** Background color for bars */
    backgroundColor: string;
    /** Chart height */
    height?: number;
    /** Maximum value for scaling */
    maxValue?: number;
    /** Step size for Y-axis */
    stepSize?: number;
}

export interface RadioChartConfig {
    /** Unique identifier for the chart */
    id: string;
    /** Chart title */
    title: string;
    /** Data labels for the chart */
    labels: string[];
    /** Data values corresponding to labels */
    data: number[];
    /** Border color for the line */
    borderColor: string;
    /** Background color for the line */
    backgroundColor: string;
    /** Point background color */
    pointBackgroundColor: string;
    /** Point border color */
    pointBorderColor?: string;
    /** Y-axis formatter function */
    yAxisFormatter?: (value: number) => string;
    /** Maximum value for Y-axis */
    yAxisMax?: number;
    /** Chart height */
    height?: number;
}

// Chart data interfaces for horizontal bar chart
export interface ChartDataItem {
    name: string;
    subtitle: string;
    value: number;
    color?: string;
}

// Hook prop interfaces - Updated for stateless components
export interface UseBarChartProps {
    // Support both legacy ChartData and new BarChartConfig for backward compatibility
    data?: import('chart.js').ChartData<'bar'>;
    options?: import('chart.js').ChartOptions<'bar'>;
    config?: BarChartConfig;
}

export interface UseRadioChartProps {
    config: RadioChartConfig;
}

export interface UseHorizontalBarChartProps {
    // Support both legacy props and new config interface
    data?: ChartDataItem[];
    backgroundColor?: string;
    height?: number;
    maxValue?: number;
    stepSize?: number;
    config?: HorizontalBarChartConfig;
}

export interface UseDoughnutChartProps {
    config: DoughnutChartConfig;
}
