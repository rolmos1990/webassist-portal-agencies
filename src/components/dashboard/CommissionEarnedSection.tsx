import BarChart from '../common/BarChart';
import type { ChartData, ChartOptions } from 'chart.js';

interface CommissionEarnedSectionLabels {
  title: string;
  totalCommissions: string;
  avgCommissions: string;
}

interface CommissionEarnedSectionProps {
  labels: CommissionEarnedSectionLabels;
  chartData: ChartData<'bar'>;
}

export default function CommissionEarnedSection({ labels, chartData }: CommissionEarnedSectionProps) {
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          padding: 16,
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
    },
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
        grid: {
          color: "#e0e0e0"
        },
        border: {
          display: false
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
  };

  return (
    <div className="p-3 bg-white rounded-2 flex-fill" style={{ minWidth: 0, overflow: 'hidden', flex: '1 1 50%' }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: "16px" }}
      >
        <div>
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#21272a",
              margin: "0"
            }}
          >
            {labels.title}
          </h1>
          <div
            className="d-flex align-items-center"
            style={{ gap: "32px", marginTop: "4px" }}
          >
            <div
              style={{ fontSize: "13px", fontWeight: "600", color: "#21272a" }}
            >
              $4.2k
              <span
                style={{
                  color: "#4caf50",
                  fontSize: "10px",
                  fontWeight: "500",
                  background: "#eefbf0",
                  borderRadius: "12px",
                  padding: "2px 6px",
                  marginLeft: "2px",
                  border: "1px solid #4caf50",
                }}
              >
                +3.2%
              </span>
            </div>
            <div
              style={{ fontSize: "13px", fontWeight: "600", color: "#21272a" }}
            >
              $2.1k
              <span
                style={{
                  color: "#4caf50",
                  fontSize: "10px",
                  fontWeight: "500",
                  background: "#eefbf0",
                  borderRadius: "12px",
                  padding: "2px 6px",
                  marginLeft: "2px",
                  border: "1px solid #4caf50",
                }}
              >
                +1.5%
              </span>
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ gap: "16px", marginTop: "2px" }}
          >
            <span style={{ fontSize: "12px", color: "#4b647e" }}>
              {labels.totalCommissions}
            </span>
            <span style={{ fontSize: "12px", color: "#4b647e" }}>
              {labels.avgCommissions}
            </span>
          </div>
        </div>
      </div>

      <BarChart
        data={chartData}
        options={chartOptions}
        height="420px"
        className="commission-chart"
      />
    </div>
  );
}
