# Chart Components Refactoring Guide

## Overview

Los componentes de gráficos han sido refactorizados para ser completamente **stateless** y recibir datos desde fuentes externas (APIs, servicios, etc.). Esto permite mayor reutilización, testabilidad y flexibilidad.

## Antes vs Después

### ❌ Antes (Datos Hardcodeados)
```tsx
// Los datos estaban hardcodeados dentro del componente
export default function CommissionEarnedSection() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar"], // Datos fijos
    datasets: [{ data: [9000, 8000, 6700] }] // Datos fijos
  };
  
  return <BarChart data={chartData} />;
}
```

### ✅ Después (Datos Externos)
```tsx
// Los datos vienen desde props/APIs externas
interface CommissionEarnedSectionProps {
  data?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string | string[] | ((ctx: any) => string);
    }>;
  };
}

export default function CommissionEarnedSection({ data }: CommissionEarnedSectionProps) {
  const chartData = data ? {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    }))
  } : defaultData; // Fallback si no hay datos
  
  return <BarChart data={chartData} />;
}
```

## Hooks Refactorizados

### 1. useBarChart
```tsx
// Soporta tanto la interfaz legacy como la nueva BarChartConfig
const { chartData, chartOptions } = useBarChart({
  // Opción 1: Legacy (mantiene compatibilidad)
  data: legacyChartData,
  options: legacyOptions,
  
  // Opción 2: Nueva interfaz semántica
  config: {
    id: 'sales-chart',
    title: 'Sales Performance',
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: '2024',
      data: [100, 200, 300],
      backgroundColor: '#7ac142'
    }],
    showLegend: true,
    showGrid: true
  }
});
```

### 2. useHorizontalBarChart
```tsx
const { canvasRef } = useHorizontalBarChart({
  // Opción 1: Legacy props
  data: agentData,
  backgroundColor: '#7ac142',
  height: 450,
  
  // Opción 2: Nueva config interface
  config: {
    id: 'agent-performance',
    title: 'Agent Performance',
    data: [
      { name: 'John Smith', subtitle: 'Senior Agent', value: 8500 },
      { name: 'Sarah Johnson', subtitle: 'Lead Agent', value: 7200 }
    ],
    backgroundColor: '#7ac142',
    height: 450,
    maxValue: 10000,
    stepSize: 2000
  }
});
```

### 3. useDoughnutChart
```tsx
const { canvasRef } = useDoughnutChart({
  config: {
    percentage: 78,
    primaryColor: '#7ac142',
    backgroundColor: '#f0f2f4',
    centerText: '78% Complete',
    showTooltips: false
  }
});
```

## Servicio de Datos

### DashboardService
```tsx
// Simula llamadas API reales
export class DashboardService {
  static async getCommissionEarnedData() {
    // En una aplicación real, esto sería una llamada HTTP
    const response = await fetch('/api/commission-earned');
    return response.json();
  }
  
  static async getAllDashboardData(): Promise<DashboardData> {
    const [commissionEarned, agentPerformance, salesTarget] = await Promise.all([
      this.getCommissionEarnedData(),
      this.getAgentPerformanceData(),
      this.getSalesTargetData(),
    ]);

    return {
      commissionEarned,
      agentPerformance: { data: agentPerformance },
      salesTarget,
    };
  }
}
```

### Hook de Datos
```tsx
// Hook personalizado para manejar datos del dashboard
export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dashboardData = await DashboardService.getAllDashboardData();
      setData(dashboardData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
```

## Dashboard Refactorizado

```tsx
function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <NoDataMessage />;

  return (
    <>
      <DashboardHeader />
      
      {/* Los datos se pasan desde el Dashboard a cada sección */}
      <SalesTargetSection data={data.salesTarget} />
      <CommissionEarnedSection data={data.commissionEarned} />
      <AgentPerformanceSection data={data.agentPerformance} />
      <RevenueRenewalsSection data={data.revenueRenewals} />
    </>
  );
}
```

## Beneficios de la Refactorización

### 🔄 **Reutilización**
```tsx
// Los mismos componentes pueden usarse en diferentes páginas
<CommissionEarnedSection data={monthlyData} />
<CommissionEarnedSection data={yearlyData} />
<CommissionEarnedSection data={quarterlyData} />
```

### 🧪 **Testabilidad**
```tsx
// Fácil testing con datos mock
const mockData = {
  labels: ['Test1', 'Test2'],
  datasets: [{ label: 'Test', data: [100, 200] }]
};

render(<CommissionEarnedSection data={mockData} />);
```

### 📊 **Flexibilidad de Datos**
```tsx
// Los datos pueden venir de cualquier fuente
const apiData = await fetch('/api/charts/commission');
const localData = getLocalStorageData();
const calculatedData = processBusinessLogic(rawData);

<CommissionEarnedSection data={apiData || localData || calculatedData} />
```

### ⚡ **Performance**
- Los componentes solo se re-renderizan cuando cambian los datos
- No hay lógica de datos innecesaria en los componentes de UI
- Mejor separación de responsabilidades

## Migración

### Para Componentes Existentes
1. Agregar interface de props que incluya `data?`
2. Usar datos de props o fallback a datos por defecto
3. Mantener compatibilidad hacia atrás

### Para Nuevos Componentes
1. Usar directamente las nuevas interfaces
2. Recibir datos siempre como props
3. No incluir lógica de datos en componentes de UI

## Ejemplo Completo de Uso

```tsx
// 1. Definir el servicio de datos
class MyChartService {
  static async getChartData() {
    return await fetch('/api/my-chart').then(r => r.json());
  }
}

// 2. Crear hook de datos
function useMyChartData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    MyChartService.getChartData().then(setData).finally(() => setLoading(false));
  }, []);
  
  return { data, loading };
}

// 3. Usar en el componente
function MyPage() {
  const { data, loading } = useMyChartData();
  
  if (loading) return <div>Loading...</div>;
  
  return <CommissionEarnedSection data={data} />;
}
```

## Conclusión

La refactorización permite que los gráficos sean:
- ✅ **Stateless**: No manejan datos internamente
- ✅ **Reutilizables**: Pueden usarse en cualquier contexto
- ✅ **Testables**: Fácil testing con datos mock
- ✅ **Flexibles**: Datos pueden venir de cualquier fuente
- ✅ **Mantenibles**: Separación clara de responsabilidades

Los componentes ahora funcionan exactamente como solicitaste: **reciben datos desde afuera** y son **completamente funcionales**.
