import DoughnutChart from '../common/DoughnutChart';

interface SalesTargetSectionProps {
  data?: {
    percentage: number;
    centerText?: string;
  };
}

export default function SalesTargetSection({ data }: SalesTargetSectionProps) {
  // Use provided data or fallback to default data
  const chartConfig = {
    percentage: data?.percentage || 65,
    primaryColor: '#7ac142',
    backgroundColor: '#f0f2f4',
    textColor: '#333333',
    centerText: data?.centerText || `${data?.percentage || 65}%`,
    showTooltips: false,
  };

  return (
    <div className="p-3 bg-white rounded-2 mx-3" style={{ marginTop: "16px" }}>
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            Sales Target Progress
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            Current progress towards monthly sales target
          </p>
        </div>
      </div>
      
      <div className="row mt-3">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div style={{ width: '200px', height: '200px' }}>
            <DoughnutChart 
              percentage={data?.percentage || 65}
              config={chartConfig} 
            />
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
          <div className="mb-3">
            <div style={{ color: "#21272a", fontSize: "24px", fontWeight: "700" }}>
              {data?.percentage || 65}%
            </div>
            <div style={{ color: "#4b647e", fontSize: "13px" }}>
              Target Achievement
            </div>
          </div>
          <div className="mb-2">
            <div style={{ color: "#21272a", fontSize: "16px", fontWeight: "600" }}>
              $85,420
            </div>
            <div style={{ color: "#4b647e", fontSize: "12px" }}>
              Current Sales
            </div>
          </div>
          <div>
            <div style={{ color: "#21272a", fontSize: "16px", fontWeight: "600" }}>
              $131,200
            </div>
            <div style={{ color: "#4b647e", fontSize: "12px" }}>
              Target Amount
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
