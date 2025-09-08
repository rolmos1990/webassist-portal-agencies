import { useDataTable, type UseDataTableOptions } from './useDataTable';
import { type ColumnDef, type Table } from '@tanstack/react-table';
import { Badge } from 'react-bootstrap';

/**
 * Type representing a client in the table
 */
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  agentCode: string;
  commission: number;
  status: 'Activo' | 'Inactivo' | 'Pendiente';
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

  // Client-specific methods
  const getClientStatusColor = (status: Client['status']): string => {
    const statusColors = {
      'Activo': 'text-green-500',
      'Inactivo': 'text-red-500',
      'Pendiente': 'text-yellow-500',
    } as const;
    return statusColors[status] || 'text-gray-500';
  };

  // Create an extended table object with custom methods
  const extendedTable = {
    ...table,
    getClientStatusColor,
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
  } & typeof table;

  return extendedTable;
}

/**
 * Default columns configuration for the clients table
 * Can be extended or overridden as needed
 */
export const defaultClientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue(),
    size: 60,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue() || '-',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: (info) => info.getValue() || '-',
  },
  {
    accessorKey: 'agentCode',
    header: 'Código de Agente',
    cell: (info) => info.getValue() || '-',
  },
  {
    accessorKey: 'commission',
    header: 'Comisión',
    cell: (info) => {
      const value = info.getValue() as number;
      return value ? `${value.toFixed(2)}%` : '-';
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: (info) => {
      const status = info.getValue() as Client['status'];
      
      const variantMap = {
        'Activo': 'success',
        'Inactivo': 'danger',
        'Pendiente': 'warning'
      } as const;
      
      return (
        <Badge pill bg={variantMap[status] || 'secondary'} className="text-uppercase">
          {status}
        </Badge>
      );
    },
  }
];
