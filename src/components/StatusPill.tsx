export const StatusPill = ({ label = "Active", variant = "success" }) => (
  <span
    className={`badge rounded-pill bg-${variant}-subtle text-${variant}-emphasis d-inline-flex align-items-center`}
  >
    <span
      className="me-1"
      style={{
        width: ".5rem",
        height: ".5rem",
        borderRadius: "50%",
        backgroundColor: `var(--bs-${variant})`,
        display: "inline-block",
      }}
    />
    {label}
  </span>
);