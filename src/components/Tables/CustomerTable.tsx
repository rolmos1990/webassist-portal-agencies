import { useCallback, useMemo } from "react";
import { createCustomerColumns } from "./CustomerDataTableConfig";
import type { CustomerRow } from "../../data/customerData";
import { useTranslation } from "react-i18next";
import DataTable, { currency, type SortDir, type SortState } from "../DataTable";

// Define the PaginationProps interface to match the one in DataTable
interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type CustomersTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type CustomersTableProps = {
  data: CustomerRow[];
  loading?: boolean;
  pagination?: CustomersTablePagination;
  sort?: {
    sortBy?: string;
    sortDir?: SortDir;
  };
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  onEdit?: (row: CustomerRow) => void;
  onToggle?: (row: CustomerRow) => void;
  onDelete?: (row: CustomerRow) => void;
};

export function CustomersTable({ 
  data, 
  loading = false, 
  pagination,
  sort,
  onSortChange,
  onEdit: externalOnEdit,
  onToggle: externalOnToggle,
  onDelete: externalOnDelete
}: CustomersTableProps) {
  const { t } = useTranslation('common');
  const handleEdit = useCallback((row: CustomerRow) => {
    externalOnEdit?.(row);
  }, [externalOnEdit]);

  const handleToggle = useCallback((row: CustomerRow) => {
    externalOnToggle?.(row);
  }, [externalOnToggle]);

  const handleDelete = useCallback((row: CustomerRow) => {
    externalOnDelete?.(row);
  }, [externalOnDelete]);

  const columns = useMemo(
    () => createCustomerColumns({ 
      currency, 
      t,
      onEdit: handleEdit, 
      onToggle: handleToggle, 
      onDelete: handleDelete 
    }),
    [t]
  );

  const defaultSort = useMemo<SortState | null>(() => {
    if (sort?.sortBy) {
      return {
        id: sort.sortBy,
        dir: sort.sortDir || 'asc'
      };
    }
    return null;
  }, [sort]);

  return (
    <DataTable<CustomerRow> 
      items={data} 
      columns={columns} 
      loading={loading}
      defaultSort={defaultSort}
      onSortChange={onSortChange}
      pagination={pagination ? {
        totalPages: pagination.totalPages,
        defaultPage: pagination.currentPage || 1,
        align: pagination.align || 'center',
        wrap: pagination.wrap,
        onChange: pagination.onChange
      } : undefined}
    />
  );
}

