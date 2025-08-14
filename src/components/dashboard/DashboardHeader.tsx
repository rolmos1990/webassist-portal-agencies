interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({ 
  title = "Dashboard", 
  subtitle = "Monitor key performance of Product and Agency sales" 
}: DashboardHeaderProps) {
  return (
    <div className="d-flex justify-content-start justify-content-md-between align-items-start align-items-md-center p-3 flex-column flex-md-row gap-2">
      <div>
        <h5 className="p-0 m-0" style={{ fontWeight: 600, fontSize: "18px" }}>
          {title}
        </h5>
        <p className="p-0 m-0" style={{ color: "#4b647e", fontSize: "13px" }}>
          {subtitle}
        </p>
      </div>
      <div className="d-flex gap-3 justify-content-start align-items-start">
        <button type="button" className="btn btn-outline-primary rounded-pill">
          Filter by
        </button>
        <button type="button" className="btn btn-outline-primary rounded-pill">
          This Year
        </button>
      </div>
    </div>
  );
}
