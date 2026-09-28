import { useCallback, useMemo } from "react";
import { createAgentColumns } from "./AgentsDataTableConfig";
import { useTranslation } from "react-i18next";
import DataTable, { currency, type SortDir, type SortState } from "../DataTable";
import type { GetAgentesAgencia200DataItem } from "../../api/schemas";

// Define the PaginationProps interface to match the one in DataTable
interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type AgentsTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type AgentsTableProps = {
  data: GetAgentesAgencia200DataItem[];
  loading?: boolean;
  pagination?: AgentsTablePagination;
  sort?: SortState | null;
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  onEdit?: (row: GetAgentesAgencia200DataItem) => void;
  onToggle?: (row: GetAgentesAgencia200DataItem) => void;
  onDelete?: (row: GetAgentesAgencia200DataItem) => void;
};

export function AgentsTable({ 
  data, 
  loading = false, 
  pagination,
  sort,
  onSortChange,
  onEdit: externalOnEdit,
  onToggle: externalOnToggle,
  onDelete: externalOnDelete
}: AgentsTableProps) {
  const { t } = useTranslation();

  const handleEdit = useCallback((row: GetAgentesAgencia200DataItem) => {
    externalOnEdit?.(row);
  }, [externalOnEdit]);

  const handleToggle = useCallback((row: GetAgentesAgencia200DataItem) => {
    externalOnToggle?.(row);
  }, [externalOnToggle]);

  const handleDelete = useCallback((row: GetAgentesAgencia200DataItem) => {
    externalOnDelete?.(row);
  }, [externalOnDelete]);

  const columns = useMemo(
    () => createAgentColumns({ 
      currency, 
      t, 
      onEdit: handleEdit, 
      onToggle: handleToggle, 
      onDelete: handleDelete 
    }),
    [t, handleEdit, handleToggle, handleDelete]
  );

  return (
    <DataTable<GetAgentesAgencia200DataItem> 
      items={data} 
      columns={columns} 
      loading={loading}
      pagination={pagination}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
