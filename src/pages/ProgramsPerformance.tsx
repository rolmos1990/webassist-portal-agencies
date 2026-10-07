import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import { currency } from '../components/DataTable';
import ProgramPerformanceSummary from '../components/dashboard/ProgramPerformanceSummary';
import type { ProgramPerformanceMetric, ProgramPeriod } from '../components/dashboard/ProgramPerformanceSummary';
// import ProgramPlanCard from '../components/dashboard/ProgramPlanCard';
import { useDashboardData } from '../hooks/useDashboardData';

/** Detalle de "Planes más vendidos por programa": se alimenta de programs_performance del dashboard */
function ProgramsPerformance() {
  const { data, loading, error } = useDashboardData();
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const programs = data?.programs_performance ?? [];
  const program = programs[selectedIndex] ?? programs[0];

  const periodLabels: Record<ProgramPeriod, string> = {
    ytd: t('dashboard.programsPerformance.periods.ytd'),
    mes_actual: t('dashboard.programsPerformance.periods.mom'),
    ano_anterior: t('dashboard.programsPerformance.periods.yoy'),
  };

  const unitsLabel = t('dashboard.programsPerformance.units');
  const daysLabel = t('dashboard.programsPerformance.days');

  const metrics: ProgramPerformanceMetric[] = [
    { key: 'revenue', field: 'total_ventas', title: t('dashboard.programsPerformance.totalRevenue'), format: currency },
    { key: 'commissions', field: 'total_comisiones', title: t('dashboard.programsPerformance.totalCommissions'), format: currency },
    { key: 'units', field: 'cantidad_ventas', title: t('dashboard.programsPerformance.totalUnits'), format: (v) => `${v} ${unitsLabel}` },
    { key: 'days', field: 'cantidad_dias', title: t('dashboard.programsPerformance.totalDays'), format: (v) => `${v} ${daysLabel}` },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t('dashboard.programsPerformance.loading')}</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }

    if (!program) {
      return (
        <div className="p-3 bg-white rounded-2">
          <p className="p-0 m-0" style={{ color: '#4b647e', fontSize: '13px' }}>
            {t('dashboard.programsPerformance.noData')}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="d-flex flex-wrap gap-2 mb-3" role="tablist">
          {programs.map((item, index) => {
            const isActive = item === program;
            return (
              <button
                key={item.id ?? index}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedIndex(index)}
                className="btn"
                style={{
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '8px 20px',
                  border: 'none',
                  color: '#21272a',
                  backgroundColor: isActive ? '#4fc3f7' : 'transparent',
                }}
              >
                {item.nombre ?? ''}
              </button>
            );
          })}
        </div>

        <ProgramPerformanceSummary program={program} metrics={metrics} periodLabels={periodLabels} />

        {/* Tarjetas por plan (SILVER, GOLD, ...): pendiente de API.
        <div className="row g-3 mt-1">
          {plans.map((plan) => (
            <div className="col-12 col-md-6 col-xl-4" key={plan.id}>
              <ProgramPlanCard
                name={plan.nombre}
                rows={[
                  { label: t('dashboard.programsPerformance.plan.totalRevenue'), value: currency(plan.total_ventas) },
                  { label: t('dashboard.programsPerformance.plan.totalCommissions'), value: currency(plan.total_comisiones) },
                  { label: t('dashboard.programsPerformance.plan.totalDays'), value: `${plan.cantidad_dias} ${daysLabel}` },
                  { label: t('dashboard.programsPerformance.plan.totalUnits'), value: `${plan.cantidad_ventas} ${unitsLabel}` },
                ]}
              />
            </div>
          ))}
        </div>
        */}
      </>
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Breadcrumb
          hasBack
          title={t('dashboard.programsPerformance.title')}
          description={t('dashboard.programsPerformance.subtitle')}
        />
        <div className="px-3">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ProgramsPerformance;
