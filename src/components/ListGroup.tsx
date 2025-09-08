import type { ReactNode } from 'react';
import React from 'react';

type ListGroupItemValue = string | ReactNode;

export interface ListGroupItem {
  title: string;
  value: ListGroupItemValue;
  className?: string;
}

interface ListGroupProps {
  items: ListGroupItem[][]; // Array of item groups (each group is a row)
  onClick?: (index: number) => void;
  className?: string;
}

const getColumnClass = (totalItems: number): string => {
  if (totalItems >= 12) return 'col-6 col-md-1';
  if (totalItems >= 6) return 'col-6 col-md-2';
  if (totalItems >= 4) return 'col-6 col-md-3';
  if (totalItems >= 3) return 'col-6 col-md-4';
  if (totalItems === 2) return 'col-6 col-md-6';
  return 'col-12';
};

export const ListGroup: React.FC<ListGroupProps> = ({ 
  items, 
  onClick, 
  className = '' 
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`list-group ${className}`}>
      {items.map((itemGroup, groupIndex) => (
        <div 
          key={groupIndex}
          className={`list-group-item list-group-item-action border rounded-4 mb-3 py-4 px-4 ${onClick ? 'cursor-pointer' : ''}`}
          onClick={() => onClick?.(groupIndex)}
        >
          <div className="row g-3 align-items-center">
            {itemGroup.map((item, itemIndex) => {
              const columnClass = getColumnClass(itemGroup.length);
              const isLastItem = itemIndex === itemGroup.length - 1;
              
              return (
                <div 
                  key={`${groupIndex}-${itemIndex}`}
                  className={`${columnClass} ${item.className || ''} ${isLastItem ? 'd-flex align-items-center justify-content-between' : ''}`}
                >
                  <div>
                    <div className="text-muted fw-semibold small">{item.title}</div>
                    <div>{item.value}</div>
                  </div>
                  {isLastItem && (
                    <span className="ms-2 text-primary fs-4" aria-hidden="true">
                      <i className="bi bi-arrow-right-short"></i>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};