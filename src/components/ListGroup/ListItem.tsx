import React from 'react';

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
    <div 
      className={`list-group-item-action border rounded-3 p-3 p-md-4 mb-3 bg-body 
        transition-all duration-200 ease-in-out
        hover:shadow-sm hover:border-primary hover:translate-y-[-2px]
        active:shadow-inner active:bg-light active:translate-y-0
        ${className}`}
    >
      <div className="row align-items-center g-3">
        {children}
      </div>
    </div>
  );

  const commonProps = {
    className: 'text-decoration-none text-reset',
    style: { display: 'block' },
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && onClick) {
        e.preventDefault();
        onClick();
      }
    }
  };

  if (onClick) {
    return (
      <div 
        {...commonProps}
        onClick={onClick}
        className={`${commonProps.className} cursor-pointer`}
      >
        {content}
      </div>
    );
  }

  return (
    <a 
      href={href || '#'} 
      {...commonProps}
      className={`${commonProps.className} hover:text-reset`}
    >
      {content}
    </a>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;