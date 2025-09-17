import { useCallback, useMemo } from "react";
import { createAgencyColumns } from "./AgencyDataTableConfig";
import type { AgencyRow } from "../../data/agencyData";
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

type AgencyTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type AgencyTableProps = {
  data: AgencyRow[];
  loading?: boolean;
  pagination?: AgencyTablePagination;
  sort?: {
    sortBy?: string;
    sortDir?: SortDir;
  };
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  onEdit?: (row: AgencyRow) => void;
  onToggle?: (row: AgencyRow) => void;
  onDelete?: (row: AgencyRow) => void;
};

export function AgencyTable({ 
  data, 
  loading = false, 
  pagination,
  sort,
  onSortChange,
  onEdit: externalOnEdit,
  onToggle: externalOnToggle,
  onDelete: externalOnDelete
}: AgencyTableProps) {
  const { t } = useTranslation("common");
  
  const handleEdit = useCallback((row: AgencyRow) => {
    externalOnEdit?.(row);
  }, [externalOnEdit]);

  const handleToggle = useCallback((row: AgencyRow) => {
    externalOnToggle?.(row);
  }, [externalOnToggle]);

  const handleDelete = useCallback((row: AgencyRow) => {
    externalOnDelete?.(row);
  }, [externalOnDelete]);

  const columns = useMemo(
    () => createAgencyColumns({ 
      currency, 
      t, 
      onEdit: handleEdit, 
      onToggle: handleToggle, 
      onDelete: handleDelete 
    }),
    [t, handleEdit, handleToggle, handleDelete]
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
    <DataTable<AgencyRow> 
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
