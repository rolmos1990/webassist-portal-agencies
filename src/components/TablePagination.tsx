import { useEffect, useMemo, useState } from "react";
import "../assets/scss/components/_table-pagination.scss";
import { t } from "i18next";

type Align = "start" | "center" | "end";
type Wrap = "none" | "container" | "container-fluid";

interface Props {
  totalPages: number;           // ← total de páginas (>= 1)
  defaultPage?: number;         // ← página inicial (1-based)
  onChange?: (page: number) => void; // ← callback al cambiar de página
  align?: Align;                // default: 'center'
  wrap?: Wrap;                  // default: 'none'
  className?: string;
  window?: number;              // cuántos números visibles en la ventana (default: 5)
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

/** Genera lista de páginas con elipsis: [1, '…', 4,5,6,7,8, '…', 20] */
function buildPageItems(current: number, total: number, win: number): Array<number | "…"> {
  const maxWindow = Math.max(3, win); // mínimo razonable
  const half = Math.floor(maxWindow / 2);

  let start = current - half;
  let end = current + half;

  if (start < 1) {
    end += 1 - start;
    start = 1;
  }
  if (end > total) {
    start -= end - total;
    end = total;
  }
  start = Math.max(1, start);
  end = Math.min(total, end);

  const pages: Array<number | "…"> = [];

  // Siempre mostrar 1 si el rango no lo incluye
  if (start > 1) {
    pages.push(1);
  }
  // Elipsis si hay hueco entre 1 y start
  if (start > 2) {
    pages.push("…");
  }

  for (let p = start; p <= end; p++) pages.push(p);

  // Elipsis si hay hueco entre end y total
  if (end < total - 1) {
    pages.push("…");
  }
  // Siempre mostrar total si el rango no lo incluye
  if (end < total) {
    pages.push(total);
  }

  return pages;
}

export default function TablePagination({
  totalPages,
  defaultPage = 1,
  onChange,
  align = "center",
  wrap = "none",
  className = "",
  window = 5,
}: Props) {
  const safeTotal = Math.max(1, totalPages || 1);
  const [page, setPage] = useState<number>(clamp(defaultPage, 1, safeTotal));

  useEffect(() => {
    setPage((p) => clamp(p, 1, Math.max(1, totalPages || 1)));
  }, [totalPages]);

  const justify =
    align === "start" ? "justify-content-start" :
    align === "end"   ? "justify-content-end"   :
                        "justify-content-center";

  const items = useMemo(() => buildPageItems(page, safeTotal, window), [page, safeTotal, window]);

  const gotoPage = (next: number) => {
    const target = clamp(next, 1, safeTotal);
    if (target !== page) {
      setPage(target);
      onChange?.(target);
    }
  };

  const isFirst = page <= 1;
  const isLast = page >= safeTotal;

  const prevBtn = (
    <li>
      <a
        className={`nav-btn ${isFirst ? "is-disabled" : ""}`}
        href="#"
        role="button"
        aria-label="Previous page"
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : 0}
        onClick={(e) => {
          e.preventDefault();
          if (!isFirst) gotoPage(page - 1);
        }}
      >
        <i className="bi bi-chevron-left me-2" aria-hidden="true" />
        <span>{t('datatable_previous')}</span>
      </a>
    </li>
  );

  const nextBtn = (
    <li>
      <a
        className={`nav-btn ${isLast ? "is-disabled" : ""}`}
        href="#"
        role="button"
        aria-label="Next page"
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : 0}
        onClick={(e) => {
          e.preventDefault();
          if (!isLast) gotoPage(page + 1);
        }}
      >
        <span className="me-2">{t('datatable_next')}</span>
        <i className="bi bi-chevron-right" aria-hidden="true" />
      </a>
    </li>
  );

  const nav = (
    <nav
      className={`pagerbar w-100 d-flex ${justify} align-items-center py-2 ${className}`}
      aria-label="Table pagination"
    >
      <ul className="pager list-unstyled d-flex align-items-center justify-content-center mb-0">
        {prevBtn}

        {items.map((it, idx) =>
          it === "…" ? (
            <li key={`dots-${idx}`} className="dots" aria-hidden="true">…</li>
          ) : (
            <li key={it}>
              <a
                className={`page-pill ${it === page ? "is-active" : ""}`}
                href="#"
                role="button"
                aria-label={`Page ${it}`}
                aria-current={it === page ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  gotoPage(it);
                }}
              >
                {it}
              </a>
            </li>
          )
        )}

        {nextBtn}
      </ul>
    </nav>
  );

  if (wrap === "container" || wrap === "container-fluid") {
    return <div className={wrap}>{nav}</div>;
  }
  return nav;
}