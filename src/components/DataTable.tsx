import { useMemo } from 'react';
import { Table as BSTable } from 'react-bootstrap';
import type { Table as TanstackTable } from '@tanstack/react-table';
import { Pagination } from './DataTable/Pagination';
import { TableHeader } from './DataTable/TableHeader';
import { TableBody } from './DataTable/TableBody';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
}

interface DataTableProps<T> {
  table: TanstackTable<T> & {
    getPaginationProps: () => PaginationProps;
  };
  className?: string;
  bordered?: boolean;
  hover?: boolean;
  striped?: boolean;
  size?: 'sm' | 'lg';
  isLoading?: boolean;
}

export function DataTable<T>({ 
  table, 
  className = '',
  bordered = false,
  hover = true,
  striped = false,
  size,
  isLoading = false
}: DataTableProps<T>) {
  const paginationProps = table?.getPaginationProps?.() || {
    currentPage: 1,
    totalPages: 1,
    canPreviousPage: false,
    canNextPage: false,
    onPageChange: () => {},
    onNextPage: () => {},
    onPreviousPage: () => {},
    onFirstPage: () => {},
    onLastPage: () => {},
  };

  const {
    currentPage,
    totalPages: pagesCount,
    canPreviousPage,
    canNextPage,
    onPageChange,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
  } = paginationProps;

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 5;
    if (!pagesCount) return [];
    
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagesCount, startPage + maxVisiblePages - 1);
    
    return Array.from(
      { length: endPage - Math.max(1, endPage - maxVisiblePages + 1) + 1 },
      (_, i) => Math.max(1, endPage - maxVisiblePages + 1) + i
    );
  }, [currentPage, pagesCount]);

  const tableVariant = useMemo(() => {
    const variants: string[] = [];
    if (bordered) variants.push('table-bordered');
    if (hover) variants.push('table-hover');
    if (striped) variants.push('table-striped');
    if (size) variants.push(`table-${size}`);
    return variants.join(' ');
  }, [bordered, hover, striped, size]);

  return (
    <div className={`table-responsive no-scrollbar ${className}`}>
      <BSTable className={`mb-0 ${tableVariant}`} responsive>
        <TableHeader table={table} isLoading={isLoading} />
        <TableBody table={table} isLoading={isLoading} />
      </BSTable>
      
      {pagesCount > 1 && (
        <div className="mt-3 d-flex justify-content-center">
          {/* Page info commented out as per request
          <div className="text-muted small">
            Page {currentPage} of {pagesCount}
          </div>
          */}
          <Pagination
            currentPage={currentPage}
            totalPages={pagesCount}
            pageNumbers={pageNumbers}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            onPageChange={onPageChange}
            onPrevious={onPreviousPage}
            onNext={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
          />
        </div>
      )}
    </div>
  );
}
