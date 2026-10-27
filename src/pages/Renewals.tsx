import { useEffect, useState } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import { currency } from '../components/DataTable';
import { StatCard } from '../components/StatCard';
import { RenewalsTable } from '../components/Tables/RenewalsTable';
import FilterRenewalsForm from '../components/Forms/FilterRenewalsForm';
import {
  EMPTY_RENEWAL_FILTERS,
  toRenewalFilterParams,
  type RenewalFilterValues,
} from '../components/Forms/renewalFilters';
import { useGetRenovacionesPendientes } from '../api/generated';
import { usePlanTypeOptions } from '../hooks/usePlanTypeOptions';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';

function Renewals() {
  const { lang } = useI18nCache();
  const { t } = useTranslation();

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<RenewalFilterValues>(EMPTY_RENEWAL_FILTERS);
  const planTypeOptions = usePlanTypeOptions();

  const handleApplyFilter = (values: RenewalFilterValues) => {
    setFilters(values);
    setShowFilter(false);
  };

  // Lista del agente (o de toda la agencia si es agente_administrador)
  const { data, isLoading, error } = useGetRenovacionesPendientes(
    lang,
    toRenewalFilterParams(filters),
    // Las estadísticas no dependen de los filtros: se mantienen mientras recarga la lista
    { query: { placeholderData: keepPreviousData } }
  );

  useEffect(() => {
    if (error) {
      toast.error("Error", getApiErrorMessage(error, t('error_generico')));
    }
  }, [error, t]);

  const items = data?.data?.items ?? [];
  const stats = data?.data?.estadisticas;
  const activeFilters = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('renewals.title')} rightContent={
          <div className="d-flex gap-2">
            <UIButton variant="outline-primary" icon="" onClick={() => setShowFilter(true)}>
              {t('filter_by')}{activeFilters > 0 && ` (${activeFilters})`}
            </UIButton>
          </div>
        } />
        <Offcanvas
          show={showFilter}
          onHide={() => setShowFilter(false)}
          placement="end"
          title={t('filter_by')}
          canClose={true}
          scroll={true}
          backdrop={true}
          width="380px"
        >
          <FilterRenewalsForm
            defaultValues={filters}
            planTypeOptions={planTypeOptions}
            onSubmit={handleApplyFilter}
            onCancel={() => setShowFilter(false)}
          />
        </Offcanvas>

        {/* Mismo estilo de tarjetas que el reporte de ventas */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-3 mb-3">
          <div className="col">
            <StatCard
              icon="bi-arrow-repeat"
              label={t('renewals.stats.renewalsYtd')}
              value={String(stats?.renovaciones_ytd ?? '—')}
            />
          </div>
          <div className="col">
            <StatCard
              icon="bi-calendar-event"
              label={t('renewals.stats.upcoming')}
              value={String(stats?.cantidad_futuras ?? '—')}
            />
          </div>
          <div className="col">
            <StatCard
              icon="bi-calendar-x"
              label={t('renewals.stats.expired')}
              value={String(stats?.cantidad_expiradas ?? '—')}
            />
          </div>
          <div className="col">
            <StatCard
              icon="bi-graph-up-arrow"
              label={t('renewals.stats.sales')}
              value={stats?.ventas_realizadas == null ? '—' : currency(stats.ventas_realizadas)}
            />
          </div>
          <div className="col">
            <StatCard
              icon="bi-cash-coin"
              label={t('renewals.stats.commissions')}
              value={stats?.comisiones_realizadas == null ? '—' : currency(stats.comisiones_realizadas)}
            />
          </div>
        </div>

        <div className="card border-0">
          <div className="card-body p-0">
            <RenewalsTable data={items} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Renewals;
