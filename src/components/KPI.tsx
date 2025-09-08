export const KPI = ({ label, value, tooltip }) => (
  <div className="col-6 col-md-3">
    <div className="card border-0 bg-body-tertiary">
      <div className="card-body">
        <div className="d-inline-flex align-items-center gap-1 small text-body-secondary">
          {label}
          {tooltip && (
            <span
              className="text-muted"
              data-bs-toggle="tooltip"
              title={tooltip}
            >
              ⓘ
            </span>
          )}
        </div>
        <div className="fw-semibold fs-5 mt-1">{value}</div>
      </div>
    </div>
  </div>
);