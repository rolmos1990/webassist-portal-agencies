// Component prop interfaces

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
    /** Chart configuration object (alternative to individual props) */
    config?: import('./chart').DoughnutChartConfig;
}

export interface BarChartProps {
    data: import('chart.js').ChartData<'bar'>;
    options?: import('chart.js').ChartOptions<'bar'>;
    width?: number;
    height?: string;
    className?: string;
}

export interface RadioChartProps {
    config: import('./chart').RadioChartConfig;
    data?: any;
    options?: any;
    width?: number;
    height?: number;
    className?: string;
}

export interface HorizontalBarChartProps {
    id: string;
    data: import('./chart').ChartDataItem[];
    backgroundColor: string;
    height?: number;
    maxValue?: number;
    stepSize?: number;
    className?: string;
}

export interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    onPageChange: (pageIndex: number) => void;
    onPrevious: () => void;
    onNext: () => void;
    onFirstPage: () => void;
    onLastPage: () => void;
}
