import React from 'react';
import ListItem from './ListItem';
import ListContent from './ListContent';

interface ListGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ListGroup: React.FC<ListGroupProps> = ({ 
  children, 
  className = '' 
}) => {
  if (!children) return null;

  return (
    <div className={`list-group ${className}`}>
      {children}
    </div>
  );
};

ListGroup.displayName = 'ListGroup';

export { ListItem, ListContent };
export default ListGroup;