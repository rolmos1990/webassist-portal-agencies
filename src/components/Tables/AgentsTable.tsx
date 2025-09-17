import { useCallback, useMemo } from "react";
import { createAgentColumns } from "./AgentsDataTableConfig";
import type { AgentRow } from "../../data/agentData";
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

type AgentsTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type AgentsTableProps = {
  data: AgentRow[];
  loading?: boolean;
  pagination?: AgentsTablePagination;
  sort?: SortState | null;
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  onEdit?: (row: AgentRow) => void;
  onToggle?: (row: AgentRow) => void;
  onDelete?: (row: AgentRow) => void;
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
  const { t } = useTranslation('common');

  const handleEdit = useCallback((row: AgentRow) => {
    externalOnEdit?.(row);
  }, [externalOnEdit]);

  const handleToggle = useCallback((row: AgentRow) => {
    externalOnToggle?.(row);
  }, [externalOnToggle]);

  const handleDelete = useCallback((row: AgentRow) => {
    externalOnDelete?.(row);
  }, [externalOnDelete]);

  const columns = useMemo(
    () => createAgentColumns({ 
      currency, 
      t: (key: string) => t(`agents.${key}`), 
      onEdit: handleEdit, 
      onToggle: handleToggle, 
      onDelete: handleDelete 
    }),
    [t, handleEdit, handleToggle, handleDelete]
  );

  return (
    <DataTable<AgentRow> 
      items={data} 
      columns={columns} 
      loading={loading}
      pagination={pagination}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
