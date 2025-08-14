# BarChart Component - Migration Guide

## 🎯 Overview

The `BarChart` component has been enhanced with a more semantic and developer-friendly interface while maintaining backward compatibility.

## ✨ What's New

### Before: Generic Chart.js Interface
```typescript
import { BarChart } from '../components/common/BarChart';
import type { ChartData, ChartOptions } from 'chart.js';

const chartData: ChartData<'bar'> = {
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Sales',
    data: [100, 200, 150],
    backgroundColor: '#3B82F6',
    borderColor: '#2563EB',
    borderWidth: 1,
    // ... many more Chart.js specific properties
  }]
};

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    // ... complex Chart.js configuration
  },
  scales: {
    y: { beginAtZero: true },
    // ... more complex configuration
  }
};

<BarChart data={chartData} options={chartOptions} />
```

### After: Semantic BarChartConfig Interface
```typescript
import { BarChart, type BarChartConfig } from '../components/common/BarChart';

const config: BarChartConfig = {
  id: 'sales-chart',
  title: 'Monthly Sales',
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Sales',
    data: [100, 200, 150],
    backgroundColor: '#3B82F6'
  }],
  yAxisFormatter: (value) => `$${value}`,
  showLegend: true,
  horizontal: false
};

<BarChart config={config} />
```

## 🔧 BarChartConfig Interface

```typescript
interface BarChartConfig {
  id: string;                    // Unique identifier
  title?: string;                // Chart title
  labels: string[];              // X-axis labels
  datasets: Array<{              // Chart datasets
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    borderRadius?: number;
    maxBarThickness?: number;
  }>;
  yAxisFormatter?: (value: number) => string;  // Format Y-axis values
  yAxisMax?: number;             // Maximum Y-axis value
  yAxisMin?: number;             // Minimum Y-axis value
  showLegend?: boolean;          // Show/hide legend
  showGrid?: boolean;            // Show/hide grid lines
  horizontal?: boolean;          // Horizontal orientation
}
```

## 🚀 Benefits

### 1. **More Intuitive**
- Clear, descriptive property names
- No need to understand Chart.js internals
- Better IntelliSense and autocompletion

### 2. **Simplified Configuration**
- Common use cases are now one-liners
- Sensible defaults for styling
- Built-in formatters and utilities

### 3. **Backward Compatible**
- Existing code continues to work
- Gradual migration possible
- No breaking changes

### 4. **Consistent with Other Components**
- Follows the same pattern as `RadioChart`
- Unified API across chart components
- Easier to maintain and understand

## 📝 Migration Examples

### Simple Bar Chart
```typescript
// Before
const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'Revenue',
    data: [10000, 15000, 12000, 18000],
    backgroundColor: '#3B82F6'
  }]
};

<BarChart data={data} />

// After
<BarChart config={{
  id: 'quarterly-revenue',
  title: 'Quarterly Revenue',
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'Revenue',
    data: [10000, 15000, 12000, 18000],
    backgroundColor: '#3B82F6'
  }],
  yAxisFormatter: (value) => `$${value.toLocaleString()}`
}} />
```

### Multi-Dataset Chart
```typescript
// Before
const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Sales',
      data: [100, 200, 150],
      backgroundColor: '#3B82F6'
    },
    {
      label: 'Target',
      data: [120, 180, 160],
      backgroundColor: '#10B981'
    }
  ]
};

<BarChart data={data} />

// After
<BarChart config={{
  id: 'sales-vs-target',
  title: 'Sales vs Target',
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Sales',
      data: [100, 200, 150],
      backgroundColor: '#3B82F6'
    },
    {
      label: 'Target',
      data: [120, 180, 160],
      backgroundColor: '#10B981'
    }
  ],
  showLegend: true,
  yAxisFormatter: (value) => `${value} units`
}} />
```

### Horizontal Bar Chart
```typescript
// Before (required complex Chart.js configuration)
const options = {
  indexAxis: 'y',
  // ... many more options
};

<BarChart data={data} options={options} />

// After
<BarChart config={{
  id: 'horizontal-chart',
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [{
    label: 'Sales',
    data: [100, 200, 150]
  }],
  horizontal: true
}} />
```

## 🔄 Migration Strategy

### Phase 1: Immediate (No Changes Required)
- All existing `BarChart` usage continues to work
- No breaking changes

### Phase 2: Gradual Migration
- Start using `config` prop for new charts
- Migrate existing charts when making updates
- Both interfaces can coexist

### Phase 3: Optimization
- Fully migrate to `BarChartConfig` interface
- Remove legacy `data` and `options` props if desired
- Enjoy cleaner, more maintainable code

## 🎨 Best Practices

### 1. Use Semantic IDs
```typescript
// Good
id: 'monthly-sales-2024'

// Avoid
id: 'chart1'
```

### 2. Provide Meaningful Titles
```typescript
// Good
title: 'Monthly Revenue Comparison'

// Avoid
title: 'Chart'
```

### 3. Format Axis Values
```typescript
// Currency
yAxisFormatter: (value) => `$${value.toLocaleString()}`

// Percentage
yAxisFormatter: (value) => `${value}%`

// Custom units
yAxisFormatter: (value) => `${value} units`
```

### 4. Use Appropriate Colors
```typescript
// Use consistent color palette
datasets: [{
  backgroundColor: '#3B82F6',  // Primary blue
  borderColor: '#2563EB'       // Darker blue
}]
```

## 🤝 Support

The new interface is designed to handle 90% of common use cases. For advanced Chart.js features, you can still use the legacy `data` and `options` props or combine both approaches as needed.
