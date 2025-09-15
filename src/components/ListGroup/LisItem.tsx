import React from 'react';
import { ListContent } from './ListContent';

interface ListItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  href,
  onClick,
  className = ''
}) => {
  const content = (
    <div className={`border rounded-3 p-3 p-md-4 mb-3 bg-body ${className}`}>
      <div className="row align-items-center g-3">
        {children}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="text-decoration-none text-reset cursor-pointer">
        {content}
      </div>
    );
  }

  return (
    <a href={href || '#'} className="text-decoration-none text-reset">
      {content}
    </a>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;