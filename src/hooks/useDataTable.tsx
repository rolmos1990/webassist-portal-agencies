import { useCallback, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type RowSelectionState,
  type Table,
  type ColumnFiltersState,
  type Column,
  type Row,
  type FilterFn,
  type ColumnFilter,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData = unknown, TValue = unknown> {
    /** Tooltip text to display on column header */
    tooltip?: string;
    /** Whether the column is filterable */
    filterable?: boolean;
    /** Custom filter component */
    filterComponent?: React.ComponentType<{ column: Column<TData, TValue> }>;
    /** Whether to disable sorting for this column */
    disableSortBy?: boolean;
    /** Custom cell renderer */
    cellClassName?: string | ((row: Row<TData>) => string);
  }
}

// Define a custom filter function for fuzzy search
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export interface UseDataTableOptions<TData> {
  /** The data to be displayed in the table */
  data: TData[];
  
  /** Column definitions for the table */
  columns: ColumnDef<TData>[];
  
  /** Initial number of rows per page, defaults to 10 */
  initialPageSize?: number;
  
  /** Total number of pages (required for server-side pagination) */
  pageCount?: number;
  
  /** Total number of items (for pagination info) */
  totalItems?: number;
  
  /** Enable server-side pagination, defaults to false */
  manualPagination?: boolean;
  
  /** Enable server-side sorting, defaults to false */
  manualSorting?: boolean;
  
  /** Enable server-side filtering, defaults to false */
  manualFiltering?: boolean;
  
  /** Callback when pagination changes */
  onPaginationChange?: (pagination: PaginationState) => void;
  
  /** Callback when sorting changes */
  onSortingChange?: (sorting: SortingState) => void;
  
  /** Callback when filters change */
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  
  /** Callback when row selection changes */
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  
  /** 
   * Enable row selection
   * - `boolean`: Enable/disable for all rows
   * - `(row: Row<TData>) => boolean`: Function to determine if a row is selectable
   */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  
  /** Initial sorting state */
  initialSorting?: SortingState;
  
  /** Initial pagination state */
  initialState?: Partial<PaginationState>;
  
  /** Initial column filters */
  initialColumnFilters?: ColumnFiltersState;
  
  /** Global filter value */
  globalFilter?: string;
  
  /** Callback when global filter changes */
  onGlobalFilterChange?: (value: string) => void;
  
  /** Enable multi-sort, defaults to false */
  enableMultiSort?: boolean;
  
  /** Enable column resizing, defaults to false */
  enableColumnResizing?: boolean;
  
  /** Default column options */
  defaultColumn?: Partial<ColumnDef<TData>>;
  
  /** Enable column visibility controls, defaults to false */
  enableHiding?: boolean;
  
  /** Enable virtualization for better performance with large datasets, defaults to false */
  enableVirtualization?: boolean;
  
  /** Custom filter function, defaults to fuzzyFilter */
  filterFns?: Record<string, FilterFn<TData>>;
}

// Create a type that includes all table methods we want to keep from the original Table type
type TableMethods<TData> = Omit<
  Table<TData>,
  | 'getPaginationRowModel'
  | 'getCoreRowModel'
  | 'getSortedRowModel'
  | 'getFilteredRowModel'
  | 'setPageSize'
  | 'setGlobalFilter'
  | 'pagination'
  | 'sorting'
  | 'columnFilters'
  | 'globalFilter'
  | 'rowSelection'
>;

export interface DataTableInstance<TData> extends TableMethods<TData> {
  /** Current pagination state */
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalItems: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
  };
  
  /** Current sorting state */
  sorting: SortingState;
  
  /** Current filter state */
  columnFilters: ColumnFiltersState;
  
  /** Current global filter */
  globalFilter: string;
  
  /** Current row selection state */
  rowSelection: RowSelectionState;
  
  /** Navigate to a specific page */
  goToPage: (pageIndex: number) => void;
  
  /** Go to the next page */
  nextPage: () => void;
  
  /** Go to the previous page */
  previousPage: () => void;
  
  /** Set the number of rows per page */
  setPageSize: (size: number) => void;
  
  /** Set the global filter value */
  setGlobalFilter: (value: string) => void;
  
  /** Reset all filters and sorting */
  reset: () => void;
  
  /** Get props for table container */
  getTableProps: () => { 
    className: string;
    style: React.CSSProperties;
  };
  
  /** Get props for pagination component */
  getPaginationProps: () => {
    currentPage: number;
    totalPages: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
    onFirstPage: () => void;
    onLastPage: () => void;
    onPageSizeChange: (size: number) => void;
  };
}

/**
 * A powerful table hook that handles common table functionality with TypeScript support
 * @param options Configuration options for the table
 * @returns Table instance with additional utilities
 */
export function useDataTable<TData>({
  data,
  columns,
  initialPageSize = 10,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pageCount: controlledPageCount,
  totalItems = data.length,
  onPaginationChange: onPaginationChangeCallback,
  onSortingChange: onSortingChangeCallback,
  onColumnFiltersChange: onColumnFiltersChangeCallback,
  onRowSelectionChange: onRowSelectionChangeCallback,
  onGlobalFilterChange: onGlobalFilterChangeCallback,
  enableRowSelection = false,
  initialSorting = [],
  initialState,
  initialColumnFilters = [],
  globalFilter: controlledGlobalFilter,
  enableMultiSort = false,
  enableColumnResizing = false,
  defaultColumn,
  enableHiding = false,
  enableVirtualization = false,
  filterFns = { fuzzy: fuzzyFilter },
}: UseDataTableOptions<TData>): DataTableInstance<TData> {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters);
  const [globalFilter, setGlobalFilter] = useState<string>(controlledGlobalFilter || '');
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialState?.pageIndex || 0,
    pageSize: initialState?.pageSize || initialPageSize,
  });

  // Handle controlled global filter
  const handleGlobalFilterChange = useCallback((value: string) => {
    setGlobalFilter(value);
    onGlobalFilterChangeCallback?.(value);
  }, [onGlobalFilterChangeCallback]);

  // Handle pagination changes
  const handlePaginationChange = useCallback((updater: any) => {
    setPagination((old) => {
      const newPagination = typeof updater === 'function' ? updater(old) : updater;
      onPaginationChangeCallback?.(newPagination);
      return newPagination;
    });
  }, [onPaginationChangeCallback]);

  // Handle sorting changes
  const handleSortingChange = useCallback((updater: any) => {
    setSorting((old) => {
      const newSorting = typeof updater === 'function' ? updater(old) : updater;
      onSortingChangeCallback?.(newSorting);
      return newSorting;
    });
  }, [onSortingChangeCallback]);

  // Handle column filter changes
  const handleColumnFiltersChange = useCallback((updater: any) => {
    setColumnFilters((old) => {
      const newFilters = typeof updater === 'function' ? updater(old) : updater;
      onColumnFiltersChangeCallback?.(newFilters);
      return newFilters;
    });
  }, [onColumnFiltersChangeCallback]);

  // Handle row selection changes
  const handleRowSelectionChange = useCallback((updater: any) => {
    setRowSelection((old) => {
      const newRowSelection = typeof updater === 'function' ? updater(old) : updater;
      onRowSelectionChangeCallback?.(newRowSelection);
      return newRowSelection;
    });
  }, [onRowSelectionChangeCallback]);

  // Initialize the table
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
      globalFilter: controlledGlobalFilter !== undefined ? controlledGlobalFilter : globalFilter,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      columnVisibility: {},
      columnOrder: [],
    },
    pageCount: controlledPageCount,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onGlobalFilterChange: handleGlobalFilterChange,
    onRowSelectionChange: enableRowSelection ? handleRowSelectionChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    manualPagination,
    manualSorting,
    manualFiltering,
    enableMultiSort,
    enableColumnResizing,
    enableRowSelection,
    enableHiding,
    enableColumnFilters: !manualFiltering,
    enableGlobalFilter: Boolean(onGlobalFilterChangeCallback) || controlledGlobalFilter !== undefined,
    defaultColumn,
    filterFns,
    debugTable: process.env.NODE_ENV === 'development',
  });

  // Navigation helpers
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

  // Reset all state
  const reset = useCallback(() => {
    table.setSorting(initialSorting);
    table.setPagination({
      pageIndex: 0,
      pageSize: initialPageSize,
    });
    table.setColumnFilters(initialColumnFilters);
    if (onGlobalFilterChangeCallback) {
      setGlobalFilter('');
    }
    table.resetRowSelection();
  }, [table, initialSorting, initialPageSize, initialColumnFilters, onGlobalFilterChangeCallback]);

  // Memoize pagination state
  const paginationState = useMemo(() => ({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    pageCount: controlledPageCount || table.getPageCount(),
    totalItems,
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
  }), [pagination, table, controlledPageCount, totalItems]);

  // Get pagination props
  const getPaginationProps = useCallback(() => ({
    currentPage: pagination.pageIndex + 1,
    totalPages: controlledPageCount || table.getPageCount(),
    pageSize: pagination.pageSize,
    totalItems,
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
    onPageChange: goToPage,
    onNextPage: nextPage,
    onPreviousPage: previousPage,
    onPageSizeChange: setPageSize,
    onFirstPage: () => goToPage(0),
    onLastPage: () => goToPage((controlledPageCount || table.getPageCount()) - 1),
  }), [pagination, table, controlledPageCount, totalItems, goToPage, nextPage, previousPage, setPageSize]);

  // Get table props
  const getTableProps = useCallback(() => ({
    className: [
      'table',
      'table-hover',
      enableColumnResizing && 'table-resizable',
    ].filter(Boolean).join(' '),
    style: {
      '--bs-table-bg': 'transparent',
      '--bs-table-striped-bg': 'rgba(0, 0, 0, 0.02)',
      '--bs-table-hover-bg': 'rgba(0, 0, 0, 0.03)',
      '--bs-table-active-bg': 'rgba(0, 0, 0, 0.05)',
    } as React.CSSProperties,
  }), [enableColumnResizing]);

  // Create the extended table instance
  const extendedTable: DataTableInstance<TData> = {
    // Spread all table methods and properties except the ones we're overriding
    ...Object.fromEntries(
      Object.entries(table).filter(
        ([key]) => !['pagination', 'sorting', 'columnFilters', 'globalFilter', 'rowSelection'].includes(key)
      )
    ) as TableMethods<TData>,
    pagination: paginationState,
    sorting,
    columnFilters,
    globalFilter: controlledGlobalFilter !== undefined ? controlledGlobalFilter : globalFilter,
    rowSelection,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter: handleGlobalFilterChange,
    reset,
    getTableProps,
    getPaginationProps,
  };

  return extendedTable;
}

// Re-export common types for convenience
export type { ColumnDef, Row, Header, Cell, Column, ColumnFilter } from '@tanstack/react-table';

// Helper function to create column helper
export function createColumnHelper<T>() {
  return function <TValue = unknown>(
    id: string,
    header: string | ((props: any) => React.ReactNode),
    cell: (props: { row: Row<T>; getValue: () => TValue }) => React.ReactNode,
    meta?: ColumnDef<T, TValue>['meta']
  ): ColumnDef<T, TValue> {
    return {
      id,
      accessorKey: id,
      header: typeof header === 'function' ? header : () => header,
      cell: (props) => cell({ ...props, getValue: () => props.getValue() as TValue }),
      meta,
    };
  };
}
