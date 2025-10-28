import { useCallback, useMemo } from "react";
import { createAgencyAssistanceColumns } from "./AgencyAssistanceDataTableConfig";
import { useTranslation } from "react-i18next";
import DataTable, { currency, type SortDir, type SortState } from "../DataTable";
import type { GetIdiomaAsistenciasPagina200DataItemsItem } from "../../api/schemas";

// Define the PaginationProps interface to match the one in DataTable
interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type AgencyAssistanceTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type AgencyAssistanceTableProps = {
  data: GetIdiomaAsistenciasPagina200DataItemsItem[];
  loading?: boolean;
  pagination?: AgencyAssistanceTablePagination;
  sort?: SortState | null;
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
  onShow?: (row: GetIdiomaAsistenciasPagina200DataItemsItem) => void;
};

export function AgencyAssistanceTable({ 
  data, 
  loading = false, 
  pagination,
  sort,
  onSortChange,
  onShow: externalOnShow
}: AgencyAssistanceTableProps) {
  const { t } = useTranslation();

  const handleShow = useCallback((row: GetIdiomaAsistenciasPagina200DataItemsItem) => {
    externalOnShow?.(row);
  }, [externalOnShow]);

  const columns = useMemo(
    () => createAgencyAssistanceColumns({ 
      currency, 
      t, 
      onShow: handleShow, 
    }),
    [t, handleShow]
  );

  return (
    <DataTable<GetIdiomaAsistenciasPagina200DataItemsItem> 
      items={data} 
      columns={columns} 
      loading={loading}
      pagination={pagination}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
