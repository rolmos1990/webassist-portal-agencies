import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BarChart from '../common/BarChart';
import type { ChartData, ChartOptions } from 'chart.js';
import type { GetDashboard200DataKpisVentas } from '../../api/schemas';

interface KPIComparisonSectionProps {
  data?: GetDashboard200DataKpisVentas;
}

type KPIPeriod = {
  cantidad_ventas?: number;
  cantidad_vouchers?: number;
  clientes?: number;
  monto?: number;
  ticket_promedio?: number;
  nombre?: string;
};

type KPIView = 'monthly' | 'yearly';

const KPI_FIELDS = ['cantidad_ventas', 'cantidad_vouchers', 'clientes', 'monto', 'ticket_promedio'] as const;

export default function KPIComparisonSection({ data }: KPIComparisonSectionProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<KPIView>('monthly');

  const current: KPIPeriod | undefined = view === 'monthly' ? data?.mes : data?.ano;
  const previous: KPIPeriod | undefined = view === 'monthly' ? data?.mes_anterior : data?.ano_anterior;

  const chartData: ChartData<'bar'> = {
    labels: KPI_FIELDS.map(field => t(`dashboard.kpis.${field}`)),
    datasets: [
      {
        label: previous?.nombre ?? (view === 'monthly' ? 'Previous month' : 'Previous year'),
        backgroundColor: "#d3d3d3",
        data: KPI_FIELDS.map(field => previous?.[field] ?? 0),
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
      },
      {
        label: current?.nombre ?? (view === 'monthly' ? 'Current month' : 'Current year'),
        backgroundColor: "#4fc3f7",
        data: KPI_FIELDS.map(field => current?.[field] ?? 0),
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "$" + value / 1000 + "K";
          },
          stepSize: 2000,
          font: { size: 13 },
        },
      },
    },
  };

  return (
    <div className="p-3 bg-white rounded-2 flex-fill" style={{ minWidth: 0, overflow: 'hidden', flex: '1 1 50%' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#21272a",
            margin: 0,
          }}
        >
          KPI Comparison
        </h1>
        <div className="ms-auto">
          <div className="btn-group" role="group">
            <button
              type="button"
              onClick={() => setView('monthly')}
              className={`btn btn-sm btn-outline-success chart-toggle-btn text-dark${view === 'monthly' ? ' active' : ''}`}
              style={{
                height: "25px",
                width: "90px",
                borderRadius: "18px 0 0 18px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: view === 'monthly' ? "#7cc249" : undefined,
                border: "1px solid #7cc249"
              }}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setView('yearly')}
              className={`btn text-dark btn-sm btn-outline-success chart-toggle-btn${view === 'yearly' ? ' active' : ''}`}
              style={{
                height: "25px",
                width: "90px",
                borderRadius: "0 18px 18px 0",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: view === 'yearly' ? "#7cc249" : undefined,
                border: "1px solid #7cc249"
              }}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <BarChart
        data={chartData}
        options={chartOptions}
        height="420px"
        className="kpi-chart"
      />
    </div>
  );
}
