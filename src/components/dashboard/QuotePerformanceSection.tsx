import RadioChart, { type RadioChartConfig } from '../common/RadioChart';

export default function QuotePerformanceSection() {
  // Chart configurations
  const avgQuotesChartConfig: RadioChartConfig = {
    id: 'avgQuotesChart',
    title: 'Average Quotes Generated',
    data: [25000, 18000, 21000, 22000, 20000, 19000, 21000, 25000, 26000, 32000],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    borderColor: '#1a2c47',
    backgroundColor: 'rgba(26,44,71,0.08)',
    pointBackgroundColor: '#1a2c47',
    pointBorderColor: '#fff',
    yAxisFormatter: (value: number) => '$' + value / 1000 + 'K',
    height: 250,
  };

  const closingRatioChartConfig: RadioChartConfig = {
    id: 'closingRatioChart',
    title: 'Closing Ratio Percentage',
    data: [35, 40, 45, 33, 50, 60, 48, 52, 30, 65],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    borderColor: '#7cc249',
    backgroundColor: 'rgba(124,194,73,0.08)',
    pointBackgroundColor: '#7cc249',
    pointBorderColor: '#fff',
    yAxisFormatter: (value: number) => value + '%',
    yAxisMax: 100,
    height: 250,
  };

  return (
    <div className="p-3">
      <div className="p-3 bg-white rounded-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#21272a",
              margin: 0,
            }}
          >
            Quote Performance Overview
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
                  fontWeight: 500,
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
                  fontWeight: 500,
                  border: "1px solid #7cc249"
                }}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center"
          style={{ gap: "32px", marginTop: "4px" }}
        >
          <div className="">
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#21272a" }}>
              $342k
              <span
                style={{
                  color: "#4caf50",
                  fontSize: "10px",
                  fontWeight: "500",
                  background: "#eefbf0",
                  borderRadius: "12px",
                  padding: "2px 6px",
                  marginLeft: "2px",
                  border: "1px solid #4caf50"
                }}
              >
                +2.5%
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "#4b647e" }}>
              Total Quotes Generated
            </span>
          </div>
          <div className="">
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#21272a" }}>
              80%
              <span
                style={{
                  color: "#4caf50",
                  fontSize: "10px",
                  fontWeight: 500,
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
            <span style={{ fontSize: "12px", color: "#4b647e" }}>
              Closing Ratio
            </span>
          </div>
          <div className="">
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#21272a" }}>
              $43K
              <span
                style={{
                  color: "#4caf50",
                  fontSize: "10px",
                  fontWeight: 500,
                  background: "#eefbf0",
                  borderRadius: "12px",
                  padding: "2px 6px",
                  marginLeft: "2px",
                  border: "1px solid #4caf50"
                }}
              >
                +2.3%
              </span>
            </div>
            <span style={{ fontSize: 12, color: '#4b647e' }}>
              Average Quotes Generated
            </span>
          </div>
        </div>
        <div className="d-flex flex-column flex-xl-row gap-5 mt-3">
          <RadioChart config={avgQuotesChartConfig} />
          <RadioChart config={closingRatioChartConfig} />
        </div>
      </div>
    </div>
  );
}
