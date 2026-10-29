import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { AgencyTable } from '../components/Tables/AgencyTable';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAgenciasAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import type { GetAgenciasAgencia200DataItem } from '../api/schemas';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import type { SortDir } from '../components/DataTable';
import { PATHS } from '../routes/Routes';

const PAGE_SIZE = 20;

function Agencies() {
  const [loading, setLoading] = useState(false);
  const { lang } = useI18nCache();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);
  const [agenciesData, setAgenciesData] = useState<GetAgenciasAgencia200DataItem[]>([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    onGetAgencies();
  }, []);

  const onGetAgencies = async () => {
    try {
      setLoading(true);
      const res = await getAgenciasAgencia(lang);
      if (res.ok) {
        setAgenciesData(res?.data ?? []);
      }
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    } finally {
      setLoading(false);
    }
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const onSortChange = (next: { id: string; dir: SortDir }) => {
    const sortedData = [...agenciesData].sort((a, b) => {
      const valA = a[next.id as keyof GetAgenciasAgencia200DataItem] ?? '';
      const valB = b[next.id as keyof GetAgenciasAgencia200DataItem] ?? '';

      const normalizedA = typeof valA === 'string' ? valA.toLowerCase() : valA;
      const normalizedB = typeof valB === 'string' ? valB.toLowerCase() : valB;

      if (normalizedA < normalizedB) return next.dir === 'asc' ? -1 : 1;
      if (normalizedA > normalizedB) return next.dir === 'asc' ? 1 : -1;
      return 0;
    });

    setAgenciesData(sortedData);
    setSort(next);
  };

  return (
<div className="min-vh-100 bg-light">
<div className="container-fluid py-3 px-4">
        {/* Sin filtros ni alta de agencias por ahora: no hay servicios para esas acciones */}
        <Breadcrumb title={t('agencias')} />
            <div className="card border-0">
              <div className="card-body p-0 table-scroll-x">
              <AgencyTable
                  data={agenciesData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
                  loading={loading}
                  sort={sort}
                  onEdit={(row) => navigate(PATHS.agencies.detail(row.id))}
                  onToggle={(row) => navigate(PATHS.agencies.detail(row.id))}
                  onDelete={(row) => navigate(PATHS.agencies.detail(row.id))}
                  onSortChange={onSortChange}
                  pagination={{
                      totalPages: Math.max(1, Math.ceil(agenciesData.length / PAGE_SIZE)),
                      currentPage,
                      align: "center",
                      wrap: "none",
                      onChange: onChangePage,
                  }}
                  />
              </div>
            </div>
      </div>
    </div>
  );
}

export default Agencies;
