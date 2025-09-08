import React from 'react';
import type { ReactNode } from 'react';

export interface HorizontalCardListItemProps {
  /**
   * The title or label for the card item
   */
  title: string;
  /**
   * The value to display (can be string, number, or React node)
   */
  value: ReactNode;
  /**
   * Optional icon to display before the title
   */
  icon?: ReactNode;
  /**
   * Optional info tooltip content
   */
  tooltip?: string;
  /**
   * Additional CSS classes for the item container
   */
  className?: string;
}

export const HorizontalCardListItem: React.FC<HorizontalCardListItemProps> = ({
  title,
  value,
  icon,
  tooltip,
  className = ''
}) => {
  return (
    <div className={`col ${className}`}>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex align-items-center">
          {icon && <span className="me-2">{icon}</span>}
          <span className="text-dark small">{title}</span>
          {tooltip && (
            <span
              className="ms-2 d-inline-flex align-items-center justify-content-center border rounded-circle text-secondary"
              style={{ width: 18, height: 18, fontSize: 12 }}
              title={tooltip}
              aria-label="More info"
            >
              i
            </span>
          )}
        </div>
        <span className="fw-semibold" style={{ fontSize: "1rem", lineHeight: "1.1" }}>
          {value}
        </span>
      </div>
    </div>
  );
};

export interface HorizontalCardListProps {
  /**
   * Array of HorizontalCardListItem components
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for the list container
   */
  className?: string;
  /**
   * Number of columns on mobile (default: 2)
   */
  mobileCols?: number;
  /**
   * Number of columns on desktop (default: 5)
   */
  desktopCols?: number;
}

export const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  children,
  className = '',
  mobileCols = 2,
  desktopCols = 5
}) => {
  return (
    <div 
      className={`card-body row align-items-center border-bottom gy-4 row-cols-${mobileCols} row-cols-md-${desktopCols} py-4 pb-4 ${className}`}
    >
      {children}
    </div>
  );
};

// Add display names for better debugging
HorizontalCardList.displayName = 'HorizontalCardList';
HorizontalCardListItem.displayName = 'HorizontalCardListItem';
