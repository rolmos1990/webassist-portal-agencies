import { useCallback, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type RowSelectionState,
  type Table,
} from '@tanstack/react-table';

export interface UseDataTableOptions<TData> {
  /**
   * The data to be displayed in the table
   */
  data: TData[];
  
  /**
   * Column definitions for the table
   */
  columns: ColumnDef<TData>[];
  
  /**
   * Initial number of rows per page
   * @default 10
   */
  initialPageSize?: number;
  
  /**
   * Total number of pages (required for server-side pagination)
   */
  pageCount?: number;
  
  /**
   * Total number of items (for pagination info)
   */
  totalItems?: number;
  
  /**
   * Enable server-side pagination
   * @default false
   */
  manualPagination?: boolean;
  
  /**
   * Callback when pagination changes
   */
  onPaginationChange?: (pagination: PaginationState) => void;
  
  /**
   * Callback when sorting changes
   */
  onSortingChange?: (sorting: SortingState) => void;
  
  /**
   * Callback when row selection changes
   */
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  
  /**
   * Enable row selection
   * @default false
   */
  enableRowSelection?: boolean | ((row: any) => boolean);
}

// We use Omit to exclude the properties we're going to override
type TableWithoutOverrides<TData> = Omit<Table<TData>, 
  | 'getPaginationRowModel'
  | 'getCoreRowModel'
  | 'getSortedRowModel'
  | 'setPageSize'
>;

export interface DataTableInstance<TData> extends TableWithoutOverrides<TData> {
  /**
   * Current pagination state
   */
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalItems: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
  };
  
  /**
   * Current sorting state
   */
  sorting: SortingState;
  
  /**
   * Current row selection state
   */
  rowSelection: RowSelectionState;
  
  /**
   * Navigate to a specific page
   */
  goToPage: (pageIndex: number) => void;
  
  /**
   * Go to the next page
   */
  nextPage: () => void;
  
  /**
   * Go to the previous page
   */
  previousPage: () => void;
  
  /**
   * Set the number of rows per page
   */
  setPageSize: (size: number) => void;
  
  /**
   * Get props for table container
   */
  getTableProps: () => { className: string };
  
  /**
   * Get props for pagination component
   */
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
}

/**
 * A generic table hook that handles common table functionality
 * @param options Configuration options for the table
 * @returns Table instance with additional utilities
 */
export function useDataTable<TData>({
  data,
  columns,
  initialPageSize = 10,
  manualPagination = false,
  pageCount: controlledPageCount,
  totalItems = data.length,
  onPaginationChange: onPaginationChangeCallback,
  onSortingChange: onSortingChangeCallback,
  onRowSelectionChange: onRowSelectionChangeCallback,
  enableRowSelection = false,
}: UseDataTableOptions<TData>): DataTableInstance<TData> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const handlePaginationChange = useCallback((updater: any) => {
    setPagination((old) => {
      const newPagination = typeof updater === 'function' ? updater(old) : updater;
      onPaginationChangeCallback?.(newPagination);
      return newPagination;
    });
  }, [onPaginationChangeCallback]);

  const handleSortingChange = useCallback((updater: any) => {
    setSorting((old) => {
      const newSorting = typeof updater === 'function' ? updater(old) : updater;
      onSortingChangeCallback?.(newSorting);
      return newSorting;
    });
  }, [onSortingChangeCallback]);

  const handleRowSelectionChange = useCallback((updater: any) => {
    setRowSelection((old) => {
      const newRowSelection = typeof updater === 'function' ? updater(old) : updater;
      onRowSelectionChangeCallback?.(newRowSelection);
      return newRowSelection;
    });
  }, [onRowSelectionChangeCallback]);

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection: enableRowSelection ? rowSelection : undefined,
    },
    pageCount: controlledPageCount,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: enableRowSelection ? handleRowSelectionChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    manualPagination,
    enableRowSelection: enableRowSelection,
    debugTable: process.env.NODE_ENV === 'development',
  });

  const goToPage = useCallback((pageIndex: number) => {
    table.setPageIndex(pageIndex);
  }, [table]);

  const nextPage = useCallback(() => {
    table.nextPage();
  }, [table]);

  const previousPage = useCallback(() => {
    table.previousPage();
  }, [table]);

  const setPageSize = useCallback((size: number) => {
    table.setPageSize(size);
  }, [table]);

  const paginationState = useMemo(() => ({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    pageCount: controlledPageCount || table.getPageCount(),
    totalItems,
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
  }), [pagination, table, controlledPageCount, totalItems]);

  const getPaginationProps = useCallback(() => ({
    currentPage: pagination.pageIndex + 1,
    totalPages: controlledPageCount || table.getPageCount(),
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
    onPageChange: goToPage,
    onNextPage: nextPage,
    onPreviousPage: previousPage,
    onFirstPage: () => goToPage(0),
    onLastPage: () => goToPage((controlledPageCount || table.getPageCount()) - 1),
  }), [pagination, table, controlledPageCount, goToPage, nextPage, previousPage]);

  // Create the extended table instance
  const extendedTable = {
    ...table,
    pagination: paginationState,
    sorting,
    rowSelection,
    goToPage,
    nextPage,
    previousPage,
    setPageSize: (size: number) => table.setPageSize(size),
    getTableProps: () => ({
      className: 'table table-hover border-0',
    }),
    getPaginationProps,
  } as unknown as DataTableInstance<TData>;

  return extendedTable;
}
