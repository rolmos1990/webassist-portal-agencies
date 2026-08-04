import { useCallback, useMemo } from "react";
import { createAgencyColumns } from "./AgencyDataTableConfig";
import type { GetAgenciasAgencia200DataItem } from "../../api/schemas";
import { useTranslation } from "react-i18next";
import DataTable, { type SortDir, type SortState } from "../DataTable";

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
  data: GetAgenciasAgencia200DataItem[];
  loading?: boolean;
  pagination?: AgencyTablePagination;
  sort?: SortState | null;
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  onEdit?: (row: GetAgenciasAgencia200DataItem) => void;
  onToggle?: (row: GetAgenciasAgencia200DataItem) => void;
  onDelete?: (row: GetAgenciasAgencia200DataItem) => void;
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
  const { t } = useTranslation();

  const handleEdit = useCallback((row: GetAgenciasAgencia200DataItem) => {
    externalOnEdit?.(row);
  }, [externalOnEdit]);

  const handleToggle = useCallback((row: GetAgenciasAgencia200DataItem) => {
    externalOnToggle?.(row);
  }, [externalOnToggle]);

  const handleDelete = useCallback((row: GetAgenciasAgencia200DataItem) => {
    externalOnDelete?.(row);
  }, [externalOnDelete]);

  const columns = useMemo(
    () => createAgencyColumns({
      t,
      onEdit: handleEdit,
      onToggle: handleToggle,
      onDelete: handleDelete
    }),
    [t, handleEdit, handleToggle, handleDelete]
  );

  return (
    <DataTable<GetAgenciasAgencia200DataItem>
      items={data}
      columns={columns}
      loading={loading}
      emptyMessage={t('noData')}
      sort={sort}
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
