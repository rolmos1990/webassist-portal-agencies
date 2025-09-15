import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbProps {
  title?: string;
  hasBack?: boolean;
  rightContent?: ReactNode;
  className?: string;
}

const Breadcrumb = ({
  title,
  hasBack = false,
  rightContent,
  className = ''
}: BreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className={`container-fluid border-bottom py-3 ${className}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {hasBack && (
            <button 
              onClick={() => navigate(-1)} 
              type="button" 
              className="btn fw-semibold text-decoration-none p-0 d-flex align-items-center fs-4 me-3"
            >
              <i className="bi bi-arrow-left-short me-2"></i>
              {title || 'Back'}
            </button>
          )}
          {!hasBack && title && (
            <h1 className="h4 mb-0 fw-semibold">{title}</h1>
          )}
        </div>

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