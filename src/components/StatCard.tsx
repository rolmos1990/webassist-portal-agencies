export interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  changePercent?: number;
  linkLabel?: string;
  onLinkClick?: () => void;
}

export function StatCard({ icon, label, value, changePercent, linkLabel, onLinkClick }: StatCardProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body">
        <div
          className="rounded-circle bg-primary-subtle d-inline-flex align-items-center justify-content-center mb-3"
          style={{ width: 44, height: 44 }}
        >
          <i className={`bi ${icon} text-primary fs-5`} />
        </div>

        <div className="text-muted small mb-1">{label}</div>

        <div className="d-flex align-items-center flex-wrap gap-2">
          <span className="fs-4 fw-bold">{value}</span>
          {typeof changePercent === "number" && (
            <span className="badge rounded-pill bg-success-subtle text-success small fw-semibold d-inline-flex align-items-center gap-1">
              <i className="bi bi-arrow-up" />
              {changePercent}%
            </span>
          )}
          {linkLabel && (
            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none p-0 ms-auto"
              onClick={onLinkClick}
            >
              {linkLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
