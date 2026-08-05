import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable, { type SortDir, type SortState } from "../DataTable";
import { createSalesReportColumns } from "./SalesReportDataTableConfig";
import type { SalesReportRow } from "../../data/salesReportData";

interface SalesReportTablePagination {
  totalPages: number;
  currentPage?: number;
  align?: "start" | "center" | "end";
  wrap?: "none" | "container" | "container-fluid";
  onChange: (page: number) => void;
}

type SalesReportTableProps = {
  data: SalesReportRow[];
  loading?: boolean;
  pagination?: SalesReportTablePagination;
  sort?: SortState | null;
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
};

export function SalesReportTable({
  data,
  loading = false,
  pagination,
  sort,
  onSortChange,
  selectedIds,
  onSelectionChange,
}: SalesReportTableProps) {
  const { t } = useTranslation();

  const columns = useMemo(() => createSalesReportColumns({ t }), [t]);

  return (
    <DataTable<SalesReportRow>
      items={data}
      columns={columns}
      loading={loading}
      emptyMessage={t("noData")}
      selectable
      getRowId={(row) => row.id}
      selectedIds={selectedIds}
      onSelectionChange={onSelectionChange as (ids: (string | number)[]) => void}
      pagination={pagination ? {
        totalPages: pagination.totalPages,
        defaultPage: pagination.currentPage || 1,
        align: pagination.align || "center",
        wrap: pagination.wrap,
        onChange: pagination.onChange,
      } : undefined}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
