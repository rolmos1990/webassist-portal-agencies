import React from 'react';

interface ListContentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
  colSize?: 'auto' | number;
}

export const ListContent: React.FC<ListContentProps> = ({
  title,
  children,
  className = '',
  isLast = false,
  colSize = 'auto'
}) => {
  const colClass = colSize === 'auto' 
    ? 'col' 
    : `col-${12 / colSize} col-md-${12 / colSize}`;

  return (
    <div className={`${colClass} ${className}`}>
      <div className={isLast ? 'd-flex align-items-center justify-content-between' : ''}>
        <div>
          <div className="text-uppercase small text-body-secondary fw-semibold">{title}</div>
          <div className="fw-medium">{children}</div>
        </div>
        {isLast && (
          <span className="ms-2 text-primary fs-4" aria-hidden="true">
            <i className="bi bi-arrow-right-short"></i>
          </span>
        )}
      </div>
    </div>
  );
};

ListContent.displayName = 'ListContent';

export default ListContent;
