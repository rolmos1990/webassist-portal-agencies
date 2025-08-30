import { useDataTable, type UseDataTableOptions, type DataTableInstance } from './useDataTable';
import { type ColumnDef, type Table } from '@tanstack/react-table';

/**
 * Type representing a client in the table
 */
export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  // Add other client properties as needed
}

/**
 * Hook for managing the clients table
 * @param options - Configuration options for the clients table
 * @returns Table instance with client-specific functionality
 */
export function useClientTable<TData = Client>({
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

  // Create a new object with all table methods and our custom methods
  const extendedTable: Table<TData> & {
    getClientStatusColor: (status: Client['status']) => string;
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
  } = {
    ...table,
    // Client-specific methods
    getClientStatusColor: (status: Client['status']) => {
      const statusColors = {
        active: 'text-green-500',
        inactive: 'text-red-500',
        pending: 'text-yellow-500',
      };
      return statusColors[status] || 'text-gray-500';
    },
    
    // Pagination props for DataTable
    getPaginationProps: () => ({
      currentPage: table.getState().pagination.pageIndex + 1,
      totalPages: table.getPageCount(),
      canPreviousPage: table.getCanPreviousPage(),
      canNextPage: table.getCanNextPage(),
      onPageChange: (page: number) => table.setPageIndex(page - 1),
      onNextPage: () => table.nextPage(),
      onPreviousPage: () => table.previousPage(),
      onFirstPage: () => table.setPageIndex(0),
      onLastPage: () => table.setPageIndex(table.getPageCount() - 1),
    })
  };

  return extendedTable;
}

/**
 * Default columns configuration for the clients table
 * Can be extended or overridden as needed
 */
export const defaultClientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as Client['status'];
      const colors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
      };
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  // Add more default columns as needed
];
