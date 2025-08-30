import { useMemo } from 'react';
import type { Table as TanstackTable } from '@tanstack/react-table';
import { Pagination } from './DataTable/Pagination';
import { TableHeader } from './DataTable/TableHeader';
import { TableBody } from './DataTable/TableBody';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
};

type DataTableProps<T> = {
  table: TanstackTable<T> & {
    getPaginationProps: () => PaginationProps;
  };
};

export function DataTable<T>({ table }: DataTableProps<T>) {
  const paginationProps = table && table.getPaginationProps?.() || {
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

  return (
    <div className="table-responsive no-scrollbar">
      <table className="table table-hover border-0">
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>
      
      {pagesCount > 1 && (
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
      )}
    </div>
  );
}
