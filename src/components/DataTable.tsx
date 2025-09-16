// DataTable.tsx
import React, { useMemo, useState } from "react";
import "../assets/scss/components/_row-actions.scss";
import TablePagination from "./TablaPagination";

type Align = "start" | "center" | "end";

type AccessorValue = string | number | boolean | Date | null | undefined;

export type ColumnDef<T> = {
  id: string;
  label: string | React.ReactNode;
  width?: string | number;
  align?: Align;
  headerAlign?: Align;
  sortable?: boolean;
  accessor?: (row: T) => AccessorValue;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export type SortDir = "asc" | "desc";
export type SortState = { id: string; dir: SortDir };

interface PaginationProps {
  totalPages: number;
  defaultPage?: number;
  align?: Align;
  wrap?: "none" | "container" | "container-fluid";
  onChange: (page: number) => void;
}

interface Props<T extends object> {
  title?: string;
  items: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  pagination?: PaginationProps;
  sort?: SortState | null;
  defaultSort?: SortState | null;
  onSortChange?: (next: SortState) => void;
}

const textAlign = (align?: Align) =>
  align === "end" ? "text-end" : align === "center" ? "text-center" : "text-start";

const SortIcon: React.FC<{ dir?: SortDir }> = ({ dir }) => {
  if (!dir) return <i className="bi bi-arrow-down-up ms-1 text-muted fs-bold" />;
  return dir === "asc" ? (
    <i className="bi bi-arrow-up ms-1 text-muted fs-bold" />
  ) : (
    <i className="bi bi-arrow-down ms-1 text-muted fs-bold" />
  );
};

export default function DataTable<T extends object>({
  items,
  columns,
  loading = false,
  pagination,
  sort,
  defaultSort = null,
  onSortChange
}: Props<T>) {

  const [innerSort, setInnerSort] = useState<SortState | null>(defaultSort);
  const effectiveSort = sort ?? innerSort;

  const toggleSort = (id: string) => {
    const next: SortState = (() => {
      if (!effectiveSort || effectiveSort.id !== id) return { id, dir: "asc" };
      return { id, dir: effectiveSort.dir === "asc" ? "desc" : "asc" };
    })();
    if (sort == null) setInnerSort(next);
    onSortChange?.(next);
  };

  const displayed = useMemo(() => items, [items]);

  const thBtn = (col: ColumnDef<T>) => {
    const isSorted = effectiveSort?.id === col.id;
    const canSort = !!col.sortable;
    const dir = isSorted ? effectiveSort?.dir : undefined;

    const content = (
      <>
        {col.label}
        {canSort ? <SortIcon dir={dir} /> : null}
      </>
    );

    return canSort ? (
      <button
        type="button"
        className={`btn btn-link p-0 fw-semibold text-decoration-none text-body d-inline-flex align-items-center ${textAlign(col.headerAlign ?? col.align)}`}
        onClick={() => toggleSort(col.id)}
      >
        {content}
      </button>
    ) : (
      <div className={`btn btn-link p-0 fw-semibold text-decoration-none text-body d-inline-flex align-items-center ${textAlign(col.headerAlign ?? col.align)}`}>
        {content}
      </div>
    );
  };

  const colCount = columns.length;

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr className="text-muted small">
            {columns.map((col) => (
              <th
                key={col.id}
                className={`${col.headerClassName ?? ""} ${textAlign(col.headerAlign ?? col.align)}`}
                style={col.width != null ? { width: typeof col.width === "number" ? `${col.width}px` : col.width } : undefined}
                scope="col"
              >
                {thBtn(col)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={colCount} className="text-center py-5">
                <div className="d-inline-flex align-items-center gap-2">
                  <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  <span className="text-muted">Loading data…</span>
                </div>
              </td>
            </tr>
          ) : displayed.length === 0 ? (
            <tr>
              <td colSpan={colCount} className="text-center text-muted py-5">
                No data to display
              </td>
            </tr>
          ) : (
            displayed.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.id} className={`${col.className ?? ""} ${textAlign(col.align)}`}>
                    {col.render
                      ? col.render(row, i)
                      : (col.accessor ? String(col.accessor(row) ?? "") : null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="card-footer bg-body-tertiary px-0">
          <TablePagination
            totalPages={pagination.totalPages}
            defaultPage={pagination.defaultPage ?? 1}
            align={pagination.align ?? "center"}
            wrap={pagination.wrap ?? "none"}
            onChange={pagination.onChange}
          />
        </div>
      )}
    </div>
  );
}

/* Utils que ya tenías */
export const currency = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export const StatusBadge: React.FC<{ status: "Active" | "Inactive" }> = ({ status }) => (
  <span
    className={`badge rounded-pill d-inline-flex align-items-center gap-1 ${
      status === "Active" ? "bg-light text-success border" : "bg-light text-secondary border"
    }`}
    style={{ fontWeight: 500 }}
  >
    <span
      className={`rounded-circle ${status === "Active" ? "bg-success" : "bg-secondary"}`}
      style={{ width: 6, height: 6 }}
    />
    {status}
  </span>
);
