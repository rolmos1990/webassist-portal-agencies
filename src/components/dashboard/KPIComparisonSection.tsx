import BarChart from '../BarChart';
import type { ChartData, ChartOptions } from 'chart.js';

export default function KPIComparisonSection() {
  const chartData: ChartData<'bar'> = {
    labels: [
      "# of sales",
      "# of vouchers", 
      "# of Enrollments",
      "Avg Ticket",
    ],
    datasets: [
      {
        label: "September",
        backgroundColor: "#d3d3d3",
        data: [6600, 4700, 9500, 9000],
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
      },
      {
        label: "October",
        backgroundColor: "#4fc3f7",
        data: [8400, 6600, 2600, 7100],
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
              className="btn btn-sm btn-outline-success active chart-toggle-btn text-dark"
              style={{
                height: "25px",
                width: "90px",
                borderRadius: "18px 0 0 18px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: "#7cc249",
                border: "1px solid #7cc249"
              }}
            >
              Monthly
            </button>
            <button
              type="button"
              className="btn text-dark btn-sm btn-outline-success chart-toggle-btn"
              style={{
                height: "25px",
                width: "90px",
                borderRadius: "0 18px 18px 0",
                fontSize: "12px",
                fontWeight: "500",
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
