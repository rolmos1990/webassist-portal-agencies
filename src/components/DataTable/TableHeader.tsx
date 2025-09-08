import { flexRender } from '@tanstack/react-table';
import type { Table as TanstackTable, Header } from '@tanstack/react-table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface SortIndicatorProps {
  column: Header<any, unknown>['column'];
}

const SortIndicator = ({ column }: SortIndicatorProps) => {
  const sortState = column.getIsSorted();
  if (!column.getCanSort()) return null;

  const sortIcons = {
    asc: <i className="bi bi-arrow-up ms-1" />,
    desc: <i className="bi bi-arrow-down ms-1" />,
  } as const;
  
  const sortIcon = sortIcons[sortState as keyof typeof sortIcons] || (
    <i className="bi bi-arrow-down-up text-black-50 ms-1" />
  );

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`sort-${column.id}`}>
          {!sortState ? 'Sort' : sortState === 'asc' ? 'Sort ascending' : 'Sort descending'}
        </Tooltip>
      }
    >
      <span>{sortIcon}</span>
    </OverlayTrigger>
  );
};

interface TableHeaderProps<T> {
  /** The table instance from useDataTable hook */
  table: TanstackTable<T>;
  /** Show loading state */
  isLoading?: boolean;
}

export const TableHeader = <T,>({ table, isLoading = false }: TableHeaderProps<T>) => {
  if (isLoading) {
    return (
      <thead className="table-light">
        <tr>
          <th colSpan={table.getAllColumns().length} className="text-center py-4">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </th>
        </tr>
      </thead>
    );
  }

  return (
    <thead className="table-light">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className={`user-select-none position-relative ${
                header.column.getCanSort() ? 'cursor-pointer' : ''
              }`}
              style={{
                width: header.getSize(),
                minWidth: header.column.columnDef.minSize,
                maxWidth: header.column.columnDef.maxSize,
              }}
              title={header.column.columnDef.meta?.tooltip}
            >
              <div className="d-flex align-items-center">
                {flexRender(header.column.columnDef.header, header.getContext())}
                <SortIndicator column={header.column} />
              </div>
              {header.column.getCanResize() && (
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                />
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

// Add some basic styles for the column resizer
const styles = document.createElement('style');
styles.textContent = `
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0.1);
    cursor: col-resize;
    user-select: none;
    touch-action: none;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  .resizer:hover, .resizer.isResizing {
    opacity: 1;
  }
  
  th:hover .resizer {
    opacity: 0.5;
  }
`;
document.head.appendChild(styles);
