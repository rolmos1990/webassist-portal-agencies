import { useMemo, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import { StatCard } from '../components/StatCard';
import { SalesReportTable } from '../components/Tables/SalesReportTable';
import { useTranslation } from 'react-i18next';
import type { SortDir } from '../components/DataTable';
import { salesReportData } from '../data/salesReportData';

const PAGE_SIZE = 12;

function SalesReports() {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const sortedData = useMemo(() => {
    if (!sort) return salesReportData;

    return [...salesReportData].sort((a, b) => {
      const valA = a[sort.id as keyof typeof a];
      const valB = b[sort.id as keyof typeof b];

      const normalizedA = typeof valA === 'string' ? valA.toLowerCase() : valA;
      const normalizedB = typeof valB === 'string' ? valB.toLowerCase() : valB;

      if (normalizedA < normalizedB) return sort.dir === 'asc' ? -1 : 1;
      if (normalizedA > normalizedB) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sort]);

  const pageData = sortedData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

  const onSortChange = (next: { id: string; dir: SortDir }) => {
    setSort(next);
    setCurrentPage(1);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('menu.salesReport')} rightContent={
          <div className="d-flex gap-2">
            <UIButton variant="outline-primary" icon="">
              {t('salesReport.filterBy')}
            </UIButton>
          </div>
        } />

        <div className="row g-3 mb-3">
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-graph-up-arrow"
              label={t('salesReport.totalSales')}
              value="$120,000"
              changePercent={36}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-wallet2"
              label={t('salesReport.totalCommission')}
              value="$30,000"
              changePercent={36}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-coin"
              label={t('salesReport.balance')}
              value="$15,000"
              changePercent={36}
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-currency-exchange"
              label={t('salesReport.agentsPayments')}
              value="$5,000"
              changePercent={36}
              linkLabel={t('salesReport.viewBreakup')}
            />
          </div>
        </div>

        <div className="card border-0">
          <div className="card-body p-0">
            <SalesReportTable
              data={pageData}
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
