import BarChart from '../components/common/BarChart';

export default function BarChartExample() {
    // Ejemplo usando la nueva interfaz semántica
    const salesConfig = {
        id: 'sales-chart',
        title: 'Ventas Mensuales 2024',
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ventas',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                backgroundColor: '#3B82F6',
                borderColor: '#2563EB',
                borderWidth: 2,
                borderRadius: 8,
                maxBarThickness: 50,
            },
            {
                label: 'Objetivo',
                data: [15000, 20000, 18000, 28000, 25000, 32000],
                backgroundColor: '#10B981',
                borderColor: '#059669',
                borderWidth: 2,
                borderRadius: 8,
                maxBarThickness: 50,
            }
        ],
        yAxisFormatter: (value: number) => `$${value.toLocaleString()}`,
        yAxisMax: 35000,
        showLegend: true,
        showGrid: true,
        horizontal: false,
    };

    // Ejemplo de gráfico horizontal
    const performanceConfig = {
        id: 'performance-chart',
        title: 'Rendimiento por Departamento',
        labels: ['Marketing', 'Ventas', 'Desarrollo', 'Soporte'],
        datasets: [{
            label: 'Eficiencia (%)',
            data: [85, 92, 78, 88],
            backgroundColor: [
                '#EF4444',
                '#F59E0B',
                '#10B981',
                '#3B82F6'
            ],
            borderColor: [
                '#DC2626',
                '#D97706',
                '#059669',
                '#2563EB'
            ],
            borderWidth: 1,
            borderRadius: 4,
        }],
        yAxisFormatter: (value: number) => `${value}%`,
        yAxisMax: 100,
        showLegend: false,
        showGrid: true,
        horizontal: true,
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Ejemplos de BarChart Mejorado</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gráfico Vertical */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Gráfico Vertical</h2>
                    <BarChart 
                        data={salesConfig}
                        height="400px"
                        className="w-full"
                    />
                </div>

                {/* Gráfico Horizontal */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Gráfico Horizontal</h2>
                    <BarChart 
                        data={performanceConfig}
                        height="400px"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Comparación de sintaxis */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Comparación de Sintaxis</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">❌ Antes (Genérico)</h3>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`<BarChart 
  data={{
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [{
      label: 'Ventas',
      data: [100, 200, 150],
      backgroundColor: '#3B82F6',
      // ... muchas más propiedades
    }]
  }}
  options={{
    responsive: true,
    plugins: {
      legend: { display: true },
      // ... configuración compleja
    },
    scales: {
      // ... configuración compleja
    }
  }}
/>`}
                        </pre>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">✅ Ahora (Semántico)</h3>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`<BarChart 
  data={{
    id: 'sales-chart',
    title: 'Ventas Mensuales',
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [{
      label: 'Ventas',
      data: [100, 200, 150],
      backgroundColor: '#3B82F6'
    }],
    yAxisFormatter: (v) => \`$\${v}\`,
    showLegend: true,
    horizontal: false
  }}
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
