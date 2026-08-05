import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import { StatCard } from '../components/StatCard';
import { SalesReportTable } from '../components/Tables/SalesReportTable';
import { usd, toAmount } from '../components/Tables/SalesReportDataTableConfig';
import FilterByDateForm from '../components/Forms/FilterByDateForm';
import type { SortDir } from '../components/DataTable';
import { useGetReporteVentasAgencia, useGetReporteVentasAgenciaFiltrado } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import type { ReporteVentasAgenciaResponseDataItemsItem } from '../api/schemas';

// El DataTable no pagina contra el servicio: siempre trae el reporte completo
// (mes actual o mes filtrado) y se corta del lado del cliente en bloques de PAGE_SIZE.
const PAGE_SIZE = 25;

// <input type="month"> entrega "YYYY-MM"; el servicio espera "MM-YYYY".
function toMesAno(monthValue: string): string {
  const [year, month] = monthValue.split('-');
  return `${month}-${year}`;
}

function SalesReports() {
  const { t } = useTranslation();
  const { lang } = useI18nCache();

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterMonth, setFilterMonth] = useState(''); // "YYYY-MM" o "" (sin filtro)

  const mesAno = filterMonth ? toMesAno(filterMonth) : null;

  const baseQuery = useGetReporteVentasAgencia(lang, {
    query: { enabled: !mesAno, placeholderData: keepPreviousData },
  });

  const filteredQuery = useGetReporteVentasAgenciaFiltrado(lang, mesAno ?? '', {
    // Evita que la tabla se vacíe al cambiar de mes filtrado mientras carga el nuevo mes.
    query: { placeholderData: keepPreviousData },
  });

  const activeQuery = mesAno ? filteredQuery : baseQuery;
  const { data, isLoading, error } = activeQuery;

  useEffect(() => {
    if (error) {
      toast.error("Error", getApiErrorMessage(error, t('error_generico')));
    }
  }, [error, t]);

  const items = useMemo(() => data?.data?.items ?? [], [data]);
  const acums = data?.data?.acums;

  const sortedItems = useMemo(() => {
    if (!sort) return items;

    return [...items].sort((a, b) => {
      const valA = a[sort.id as keyof ReporteVentasAgenciaResponseDataItemsItem];
      const valB = b[sort.id as keyof ReporteVentasAgenciaResponseDataItemsItem];

      if (valA == null) return 1;
      if (valB == null) return -1;

      // "monto" llega como string numérico (ej. "33.18") desde el API: se compara
      // como número cuando ambos valores lo permiten, en vez de orden lexicográfico.
      const numA = typeof valA === 'number' ? valA : Number(valA);
      const numB = typeof valB === 'number' ? valB : Number(valB);
      const bothNumeric = !Number.isNaN(numA) && !Number.isNaN(numB);

      const normalizedA = bothNumeric ? numA : String(valA).toLowerCase();
      const normalizedB = bothNumeric ? numB : String(valB).toLowerCase();

      if (normalizedA < normalizedB) return sort.dir === 'asc' ? -1 : 1;
      if (normalizedA > normalizedB) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / PAGE_SIZE));
  const pageItems = sortedItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const onSortChange = (next: { id: string; dir: SortDir }) => {
    setSort(next);
    setCurrentPage(1);
  };

  const handleApplyFilter = (month: string) => {
    setFilterMonth(month);
    setCurrentPage(1);
    setShowFilter(false);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('menu.salesReport')} rightContent={
          <div className="d-flex gap-2">
            <UIButton variant="outline-primary" icon="" onClick={() => setShowFilter(true)}>
              {t('salesReport.filterBy')}
            </UIButton>
          </div>
        } />

        <Offcanvas
          show={showFilter}
          onHide={() => setShowFilter(false)}
          placement="end"
          title={t('salesReport.filterByDateLabel')}
          canClose={true}
          scroll={true}
          backdrop="static"
          width="380px"
          keyboard={true}
        >
          <FilterByDateForm
            defaultValue={filterMonth}
            onSubmit={handleApplyFilter}
            onCancel={() => setShowFilter(false)}
          />
        </Offcanvas>

        <div className="row g-3 mb-3">
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-graph-up-arrow"
              label={t('salesReport.precio')}
              value={usd(toAmount(acums?.precio))}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-receipt"
              label={t('salesReport.costoAdministrativo')}
              value={usd(toAmount(acums?.costo_administrativo))}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-wallet2"
              label={t('salesReport.baseComision')}
              value={usd(toAmount(acums?.base_comision))}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-cash-coin"
              label={t('salesReport.monto')}
              value={usd(toAmount(acums?.monto))}
            />
          </div>
        </div>

        <div className="card border-0">
          <div className="card-body p-0">
            <SalesReportTable
              data={pageItems}
              loading={isLoading}
              sort={sort}
              onSortChange={onSortChange}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              pagination={{
                totalPages,
                currentPage,
                align: "center",
                wrap: "none",
                onChange: setCurrentPage,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReports;
