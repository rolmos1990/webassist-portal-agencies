import { useDataTable, type UseDataTableOptions } from './useDataTable';
import { type ColumnDef, type Table } from '@tanstack/react-table';

/**
 * Type representing a quote in the table
 */
export interface Quote {
  id: string;
  name: string;
  email: string;
  products: string;
  total: number;
  currency: string;
}

/**
 * Hook for managing the quotes table
 * @param options - Configuration options for the quotes table
 * @returns Table instance with quote-specific functionality
 */
export function useMyQuotesTable<TData = Quote>({
  data,
  columns,
  initialPageSize = 10,
  manualPagination = false,
  pageCount,
  onPaginationChange,
  onSortingChange,
  onRowSelectionChange,
}: UseDataTableOptions<TData>) {
  // Use the generic data table hook with client-specific defaults
  const table = useDataTable<TData>({
    data,
    columns,
    initialPageSize,
    manualPagination,
    pageCount,
    onPaginationChange,
    onSortingChange,
    onRowSelectionChange,
    // Enable row selection by default for clients
    enableRowSelection: true,
  });

  // Create an extended table object with custom methods
  const extendedTable = {
    ...table,
    getPaginationProps: () => ({
      currentPage: table.getState().pagination.pageIndex + 1,
      totalPages: table.getPageCount(),
      canPreviousPage: table.getCanPreviousPage(),
      canNextPage: table.getCanNextPage(),
      onPageChange: (page: number) => table.setPageIndex(page - 1),
      onNextPage: () => table.nextPage(),
      onPreviousPage: () => table.previousPage(),
      onFirstPage: () => table.setPageIndex(0),
      onLastPage: () => table.setPageIndex(Math.max(0, table.getPageCount() - 1)),
    })
  } as Table<TData> & {
    getPaginationProps: () => {
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
  } & typeof table;

  return extendedTable;
}

/**
 * Default columns configuration for the quotes table
 */
export const defaultQuoteColumns: ColumnDef<Quote>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: (info) => `#${info.getValue()}`,
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: (info) => {
      const email = info.row.original.email;
      return (
        <div className="d-flex flex-column">
          <span>{info.getValue() as string}</span>
          <small className="text-muted">({email})</small>
        </div>
      );
    },
  },
  {
    accessorKey: 'products',
    header: 'Productos',
    cell: (info) => info.getValue(),
    size: 400,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: (info) => {
      const row = info.row.original as Quote;
      return `USD$ ${row.total.toFixed(2)}`;
    },
    size: 120,
  }
];
