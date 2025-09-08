export type StatusBadgeProps = {
  status: 'Activo' | 'Inactivo' | 'Pendiente' | string;
  className?: string;
};

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const statusClasses = {
    Activo: 'bg-light-success text-success',
    Inactivo: 'bg-light-danger text-danger',
    Pendiente: 'bg-light-warning text-warning'
  };

  const dotClasses = {
    Activo: 'bg-success',
    Inactivo: 'bg-danger',
    Pendiente: 'bg-warning'
  };

  const statusClass = statusClasses[status as keyof typeof statusClasses] || 'bg-light-secondary text-secondary';
  const dotClass = dotClasses[status as keyof typeof dotClasses] || 'bg-secondary';

  return (
    <span className={`badge rounded-pill border d-inline-flex align-items-center gap-1 fw-normal small ${statusClass} ${className}`}>
      <span className={`${dotClass} rounded-circle d-inline-block`} style={{ width: '6px', height: '6px' }}></span>
      {status}
    </span>
  );
};