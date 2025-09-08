import { flexRender } from '@tanstack/react-table';
import type { Table as TanstackTable, Row } from '@tanstack/react-table';
import { Spinner } from 'react-bootstrap';
import { useCallback } from 'react';

interface TableBodyProps<T> {
  table: TanstackTable<T>;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  onRowClick?: (row: Row<T>, e: React.MouseEvent) => void;
  isRowClickable?: (row: Row<T>) => boolean;
}

export const TableBody = <T,>({
  table,
  isLoading = false,
  emptyState,
  loadingState,
  onRowClick,
  isRowClickable,
}: TableBodyProps<T>) => {
  const rows = table.getRowModel().rows;
  
  const handleRowClick = useCallback((row: Row<T>, e: React.MouseEvent) => {
    if (onRowClick && (!isRowClickable || isRowClickable(row))) {
      onRowClick(row, e);
    }
  }, [onRowClick, isRowClickable]);

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={table.getAllColumns().length} className="text-center py-5">
            {loadingState || (
              <div className="d-flex flex-column align-items-center">
                <Spinner animation="border" role="status" className="mb-2">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span className="text-muted">Loading data...</span>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    );
  }

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={table.getAllColumns().length} className="text-center py-5 text-muted">
            {emptyState || 'No data available'}
          </td>
        </tr>
      </tbody>
    );
  }
  
  return (
    <tbody>
      {rows.map((row) => (
        <tr 
          key={row.id} 
          className={`${onRowClick && (!isRowClickable || isRowClickable(row)) ? 'clickable-row' : ''}`}
          onClick={(e) => handleRowClick(row, e)}
          style={{
            cursor: onRowClick && (!isRowClickable || isRowClickable(row)) ? 'pointer' : 'default',
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <td 
              key={cell.id} 
              className="align-middle"
              style={{
                maxWidth: cell.column.columnDef.maxSize,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={String(cell.getValue() as any)}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const styles = document.createElement('style');
styles.textContent = `
  .clickable-row {
    transition: background-color 0.15s ease-in-out;
  }
  
  .clickable-row:hover {
    background-color: rgba(0, 0, 0, 0.03) !important;
  }
  
  .clickable-row:active {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
`;
document.head.appendChild(styles);
