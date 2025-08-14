import BarChart from '../common/BarChart';
import type { ChartData, ChartOptions } from 'chart.js';

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
  // Use provided data or fallback to default data
  const chartData: ChartData<'bar'> = data ? {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    }))
  } : {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct"
    ],
    datasets: [
      {
        label: "2023",
        backgroundColor: "#d3d3d3",
        data: [
          9000, 8000, 6700, 7200, 8000, 8200, 7900, 7000, 6700, 8000,
        ],
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: "2024",
        backgroundColor: function (ctx: any) {
          // Highlight Feb bar in green
          var colors = [
            "#1e3a5c",
            "#7be495",
            "#1e3a5c",
            "#1e3a5c",
            "#1e3a5c",
            "#1e3a5c",
            "#1e3a5c",
            "#1e3a5c",
            "#1e3a5c",
            "#1e3a5c",
          ];
          return colors[ctx.dataIndex];
        },
        data: [
          8500, 8200, 7500, 8000, 8500, 8600, 8300, 7800, 7600, 8200,
        ],
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

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
            Total Commission Earned
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
              Total commissions
            </span>
            <span style={{ fontSize: "12px", color: "#4b647e" }}>
              Avg. Commissions paid
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
