import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbProps {
  title?: string;
  description?: string;
  hasBack?: boolean;
  rightContent?: ReactNode;
  className?: string;
}

const Breadcrumb = ({
  title,
  description = '',
  hasBack = false,
  rightContent,
  className = ''
}: BreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className={`container-fluid py-3 ${className}`}>
      <div className="d-flex justify-content-between align-items-start">
        {/* IZQUIERDA: título/back + descripción en columna */}
        <div className="d-flex flex-column">
          {hasBack ? (
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="btn fw-semibold text-decoration-none p-0 d-inline-flex align-items-center fs-4 text-start"
            >
              <i className="bi bi-arrow-left-short me-2"></i>
              {title || 'Back'}
            </button>
          ) : (
            title && <h1 className="h4 mb-1 fw-semibold">{title}</h1>
          )}

          {description && (
            <p className="mb-0 small text-muted">{description}</p>
          )}
        </div>

        {/* DERECHA: acciones */}
        {rightContent && (
          <div className="d-flex gap-2">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
