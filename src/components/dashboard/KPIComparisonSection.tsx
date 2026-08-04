import BarChart from '../common/BarChart';
import type { ChartData, ChartOptions } from 'chart.js';

export type KPIView = 'monthly' | 'yearly';

interface KPIComparisonSectionLabels {
  title: string;
  monthly: string;
  yearly: string;
}

interface KPIComparisonSectionProps {
  labels: KPIComparisonSectionLabels;
  chartData: ChartData<'bar'>;
  view: KPIView;
  onViewChange: (view: KPIView) => void;
}

export default function KPIComparisonSection({ labels, chartData, view, onViewChange }: KPIComparisonSectionProps) {
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
          {labels.title}
        </h1>
        <div className="ms-auto">
          <div className="btn-group" role="group">
            <button
              type="button"
              onClick={() => onViewChange('monthly')}
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
              {labels.monthly}
            </button>
            <button
              type="button"
              onClick={() => onViewChange('yearly')}
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
              {labels.yearly}
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
