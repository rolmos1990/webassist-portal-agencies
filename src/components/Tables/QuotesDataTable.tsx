import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable, { currency, type SortDir, type SortState } from "../DataTable";
import { createQuotesColumns } from "./QuotesDataTableConfig";
import type { QuotesRow } from "../../data/quotesData";

// Define the PaginationProps interface to match the one in DataTable
interface DataTablePaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: 'start' | 'center' | 'end';
  wrap?: 'none' | 'container' | 'container-fluid';
  onChange: (page: number) => void;
}

type QuotesTablePagination = Omit<DataTablePaginationProps, 'defaultPage'> & {
  currentPage?: number;
};

type QuotesTableProps = {
  data: QuotesRow[];
  loading?: boolean;
  pagination?: QuotesTablePagination;
  sort?: {
    sortBy?: string;
    sortDir?: SortDir;
  };
  onSortChange?: (sort: { id: string; dir: SortDir }) => void;
};

export function QuotesTable({ 
  data, 
  loading = false, 
  pagination,
  sort,
  onSortChange,
}: QuotesTableProps) {
  const { t } = useTranslation('common');

  const columns = useMemo(
    () => createQuotesColumns({ 
      currency, 
      t: (key: string) => t(`${key}`),
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
    <DataTable<QuotesRow> 
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
