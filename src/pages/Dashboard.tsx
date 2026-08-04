import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChartData } from 'chart.js';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import {
  DashboardHeader,
  // SalesTargetSection,
  RevenueRenewalsSection,
  TopSellingPlansSection,
  KPIComparisonSection,
  CommissionEarnedSection,
  // QuotePerformanceSection,
  // AgentPerformanceSection,
  // AgencyPerformanceSection
} from '../components/dashboard';
import type { KPIView } from '../components/dashboard/KPIComparisonSection';
import type { TopSellingPlanItem } from '../components/dashboard/TopSellingPlansSection';
import CreateAgenciesVertical from '../components/Forms/CreateAgenciesVertical';
import FilterByAgencyForm from '../components/Forms/FilterByAgencyForm';
import Offcanvas from '../components/Offcanvas';
import { useDashboardData } from '../hooks/useDashboardData';
import type {
  GetDashboard200DataComisionesItem,
  GetDashboard200DataKpisVentas,
  GetDashboard200DataTopPlanesItem,
} from '../api/schemas';

type TranslateFn = (key: string) => string;

type KPIPeriod = {
  cantidad_ventas?: number;
  cantidad_vouchers?: number;
  clientes?: number;
  monto?: number;
  ticket_promedio?: number;
  nombre?: string;
};

const KPI_FIELDS = ['cantidad_ventas', 'cantidad_vouchers', 'clientes', 'monto', 'ticket_promedio'] as const;

const COMMISSION_FALLBACK_CHART_DATA: ChartData<'bar'> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "2023",
      backgroundColor: "#d3d3d3",
      data: [9000, 8000, 6700, 7200, 8000, 8200, 7900, 7000, 6700, 8000],
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    },
    {
      label: "2024",
      backgroundColor: function (ctx: any) {
        const colors = ["#1e3a5c", "#7be495", "#1e3a5c", "#1e3a5c", "#1e3a5c", "#1e3a5c", "#1e3a5c", "#1e3a5c", "#1e3a5c", "#1e3a5c"];
        return colors[ctx.dataIndex];
      },
      data: [8500, 8200, 7500, 8000, 8500, 8600, 8300, 7800, 7600, 8200],
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    },
  ],
};

function formatCurrency(value: number | undefined, fractionDigits = 2): string {
  return (value ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function buildTopSellingPlanItems(
  items: GetDashboard200DataTopPlanesItem[] | undefined,
  unitsSoldLabel: string
): TopSellingPlanItem[] {
  return (items ?? []).slice(0, 3).map((item, index) => ({
    key: `${item.plan ?? 'plan'}-${index}`,
    name: item.plan ?? '',
    amount: formatCurrency(item.monto, 0),
    unitsSoldText: `${item.ventas ?? 0} ${unitsSoldLabel}`,
  }));
}

function buildKpiChartData(
  t: TranslateFn,
  ventas: GetDashboard200DataKpisVentas | undefined,
  view: KPIView
): ChartData<'bar'> {
  const current: KPIPeriod | undefined = view === 'monthly' ? ventas?.mes : ventas?.ano;
  const previous: KPIPeriod | undefined = view === 'monthly' ? ventas?.mes_anterior : ventas?.ano_anterior;

  return {
    labels: KPI_FIELDS.map((field) => t(`dashboard.kpis.${field}`)),
    datasets: [
      {
        label: previous?.nombre ?? (view === 'monthly' ? 'Previous month' : 'Previous year'),
        backgroundColor: "#d3d3d3",
        data: KPI_FIELDS.map((field) => previous?.[field] ?? 0),
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
      },
      {
        label: current?.nombre ?? (view === 'monthly' ? 'Current month' : 'Current year'),
        backgroundColor: "#4fc3f7",
        data: KPI_FIELDS.map((field) => current?.[field] ?? 0),
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.9,
      },
    ],
  };
}

function buildCommissionChartData(comisiones: GetDashboard200DataComisionesItem[]): ChartData<'bar'> {
  const labels: string[] = [];
  comisiones.forEach((item) => {
    (item.meses ?? []).forEach((mes) => {
      if (mes.nombre && !labels.includes(mes.nombre)) labels.push(mes.nombre);
    });
  });

  const datasets = comisiones.map((item, index) => {
    const montoByMonth = new Map((item.meses ?? []).map((mes) => [mes.nombre, mes.monto ?? 0]));
    const isLatestYear = index === comisiones.length - 1;

    return {
      label: item.ano ?? '',
      backgroundColor: isLatestYear ? "#1e3a5c" : "#d3d3d3",
      data: labels.map((label) => montoByMonth.get(label) ?? 0),
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    };
  });

  return { labels, datasets };
}

function Dashboard() {
  const { data, loading, error } = useDashboardData();
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [kpiView, setKpiView] = useState<KPIView>('monthly');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        <h4 className="alert-heading">Error loading dashboard data</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="alert alert-warning m-3" role="alert">
        No dashboard data available
      </div>
    );
  }

  const revenueRenewalsLabels = {
    title: t('dashboard.revenueRenewals.title'),
    subtitle: t('dashboard.revenueRenewals.subtitle'),
    pending: t('dashboard.revenueRenewals.pending'),
    completed: t('dashboard.revenueRenewals.completed'),
    pendingTotal: t('dashboard.revenueRenewals.pendingTotal'),
    completedTotal: t('dashboard.revenueRenewals.completedTotal'),
    commissions: t('dashboard.revenueRenewals.commissions'),
  };

  const revenueRenewalsPending = {
    total: formatCurrency(data.renovaciones?.pendientes?.monto),
    commissions: formatCurrency(data.renovaciones?.pendientes?.comisiones),
  };

  const revenueRenewalsCompleted = {
    total: formatCurrency(data.renovaciones?.completadas?.monto),
    commissions: formatCurrency(data.renovaciones?.completadas?.comisiones),
  };

  const topSellingPlansLabels = {
    title: t('dashboard.topSellingPlans.title'),
    subtitle: t('dashboard.topSellingPlans.subtitle'),
    noData: t('dashboard.topSellingPlans.noData'),
  };

  const topSellingPlanItems = buildTopSellingPlanItems(data.top_planes, t('dashboard.topSellingPlans.unitsSold'));

  const kpiComparisonLabels = {
    title: t('dashboard.kpiComparison.title'),
    monthly: t('dashboard.kpiComparison.monthly'),
    yearly: t('dashboard.kpiComparison.yearly'),
  };

  const kpiChartData = buildKpiChartData(t, data.kpis?.ventas, kpiView);

  const commissionEarnedLabels = {
    title: t('dashboard.commissionEarned.title'),
    totalCommissions: t('dashboard.commissionEarned.totalCommissions'),
    avgCommissions: t('dashboard.commissionEarned.avgCommissions'),
  };

  const commissionChartData =
    data.comisiones && data.comisiones.length > 0
      ? buildCommissionChartData(data.comisiones)
      : COMMISSION_FALLBACK_CHART_DATA;

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
    <Breadcrumb title="Dashboard" description="Monitor key performance of Product and Agency sales"
    rightContent={
      <div className="d-flex gap-2">
        <UIButton variant="outline-primary" icon=""  onClick={handleShow}>
          Filter By
        </UIButton>
        <UIButton variant="outline-primary" icon="">
          This year
        </UIButton>
      </div>
    }
    />

      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        title="Filter By Agency"
        canClose={true}
        scroll={true}
        backdrop="static"
        width="380px"
        keyboard={true}
      >
        <FilterByAgencyForm onSubmit={handleSubmit} onCancel={handleClose} />
        </Offcanvas>

      {/* <SalesTargetSection /> */}

      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <RevenueRenewalsSection
          labels={revenueRenewalsLabels}
          pending={revenueRenewalsPending}
          completed={revenueRenewalsCompleted}
        />
        <TopSellingPlansSection labels={topSellingPlansLabels} items={topSellingPlanItems} />
      </div>
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <KPIComparisonSection
          labels={kpiComparisonLabels}
          chartData={kpiChartData}
          view={kpiView}
          onViewChange={setKpiView}
        />
        <CommissionEarnedSection labels={commissionEarnedLabels} chartData={commissionChartData} />
      </div>
      {/* <QuotePerformanceSection /> */}
      {/* <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <AgentPerformanceSection />
        <AgencyPerformanceSection />
      </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
