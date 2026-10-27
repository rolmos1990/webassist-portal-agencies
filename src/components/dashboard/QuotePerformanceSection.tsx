import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import RadioChart from '../common/RadioChart';
import type { RadioChartConfig } from '../../common/interfaces/chart';
import type { KPIView } from './KPIComparisonSection';
import type { CotizacionesComparativa, GetDashboard200DataCotizacionesPerformance } from '../../api/schemas';

type TranslateFn = (key: string, options?: Record<string, unknown>) => string;

interface QuotePerformanceSectionProps {
  /** Nodo cotizaciones_performance del dashboard */
  data: GetDashboard200DataCotizacionesPerformance | undefined;
  view: KPIView;
  onViewChange: (view: KPIView) => void;
  /** Recargando por cambio de filtros */
  loading?: boolean;
}

type Kpi = {
  key: string;
  label: string;
  value: string;
  /** Variación ya formateada ("+2.5%"); null si el servicio no puede comparar (periodo anterior en 0) */
  variation: string | null;
  negative: boolean;
  /** Valor del periodo anterior, para el tooltip de la variación */
  previous: string;
};

/** Punto de los gráficos: mes o año, con los datos de ambos gráficos */
type ChartPoint = {
  label: string;
  fullLabel: string;
  cantidad: number;
  monto: number;
  cotizaciones: number;
  pedidos: number;
  porcentaje: number;
};

const formatMoney = (value: number | undefined, fractionDigits = 0) =>
  (value ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

const formatAxisMoney = (value: number) => (Math.abs(value) >= 1000 ? `$${value / 1000}K` : `$${value}`);

const formatVariation = (value: number | null | undefined, suffix: string) =>
  value == null ? null : `${value > 0 ? '+' : ''}${value}${suffix}`;

// month_over_month (vista mensual) o year_over_year (vista anual)
function buildKpis(t: TranslateFn, comparativa: CotizacionesComparativa | undefined): Kpi[] {
  const { cantidad, porcentaje_cierre, monto_total } = comparativa ?? {};
  return [
    {
      key: 'cantidad',
      label: t('dashboard.quotePerformance.quotes'),
      value: String(cantidad?.actual ?? 0),
      variation: formatVariation(cantidad?.variacion, '%'),
      negative: (cantidad?.variacion ?? 0) < 0,
      previous: String(cantidad?.anterior ?? 0),
    },
    {
      key: 'porcentaje_cierre',
      label: t('dashboard.quotePerformance.closingRatio'),
      value: `${porcentaje_cierre?.actual ?? 0}%`,
      // En porcentaje_cierre la variación viene en puntos porcentuales
      variation: formatVariation(porcentaje_cierre?.variacion, ` ${t('dashboard.quotePerformance.points')}`),
      negative: (porcentaje_cierre?.variacion ?? 0) < 0,
      previous: `${porcentaje_cierre?.anterior ?? 0}%`,
    },
    {
      key: 'monto_total',
      label: t('dashboard.quotePerformance.totalAmount'),
      value: formatMoney(monto_total?.actual),
      variation: formatVariation(monto_total?.variacion, '%'),
      negative: (monto_total?.variacion ?? 0) < 0,
      previous: formatMoney(monto_total?.anterior),
    },
  ];
}

// Une cotizaciones_generadas y porcentaje_cierre por mes (meses) o por año (anos, en orden ascendente)
function buildPoints(data: GetDashboard200DataCotizacionesPerformance | undefined, view: KPIView): ChartPoint[] {
  if (view === 'monthly') {
    const cierre = new Map((data?.meses?.porcentaje_cierre ?? []).map((c) => [c.mes, c]));
    return (data?.meses?.cotizaciones_generadas ?? []).map((g) => {
      const c = cierre.get(g.mes);
      const nombre = g.nombre ?? String(g.mes ?? '');
      return {
        label: nombre.slice(0, 3),
        fullLabel: nombre,
        cantidad: g.cantidad ?? 0,
        monto: g.monto ?? 0,
        cotizaciones: c?.cotizaciones ?? 0,
        pedidos: c?.pedidos ?? 0,
        porcentaje: c?.porcentaje ?? 0,
      };
    });
  }

  const cierre = new Map((data?.anos?.porcentaje_cierre ?? []).map((c) => [c.ano, c]));
  return [...(data?.anos?.cotizaciones_generadas ?? [])]
    .sort((a, b) => (a.ano ?? 0) - (b.ano ?? 0))
    .map((g) => {
      const c = cierre.get(g.ano);
      const ano = String(g.ano ?? '');
      return {
        label: ano,
        fullLabel: ano,
        cantidad: g.cantidad ?? 0,
        monto: g.monto ?? 0,
        cotizaciones: c?.cotizaciones ?? 0,
        pedidos: c?.pedidos ?? 0,
        porcentaje: c?.porcentaje ?? 0,
      };
    });
}

export default function QuotePerformanceSection({ data, view, onViewChange, loading = false }: QuotePerformanceSectionProps) {
  const { t } = useTranslation();

  const kpis = useMemo(
    () => buildKpis(t, view === 'monthly' ? data?.month_over_month : data?.year_over_year),
    [t, data, view]
  );

  // Memorizados: el gráfico se vuelve a crear cada vez que cambia su config
  const { generatedChartConfig, closingChartConfig } = useMemo(() => {
    const points = buildPoints(data, view);
    const labels = points.map((p) => p.label);
    const title = (i: number) => points[i]?.fullLabel ?? '';

    const generated: RadioChartConfig = {
      id: 'quotesGeneratedChart',
      title: t('dashboard.quotePerformance.generatedChart'),
      data: points.map((p) => p.monto),
      labels,
      borderColor: '#1a2c47',
      backgroundColor: 'rgba(26,44,71,0.08)',
      pointBackgroundColor: '#1a2c47',
      pointBorderColor: '#fff',
      yAxisFormatter: formatAxisMoney,
      height: 250,
      tooltipTitle: title,
      tooltipLines: (i) => [
        `${t('dashboard.quotePerformance.amount')}: ${formatMoney(points[i]?.monto, 2)}`,
        `${t('dashboard.quotePerformance.count')}: ${points[i]?.cantidad ?? 0}`,
      ],
    };

    const closing: RadioChartConfig = {
      id: 'closingRatioChart',
      title: t('dashboard.quotePerformance.closingChart'),
      data: points.map((p) => p.porcentaje),
      labels,
      borderColor: '#7cc249',
      backgroundColor: 'rgba(124,194,73,0.08)',
      pointBackgroundColor: '#7cc249',
      pointBorderColor: '#fff',
      yAxisFormatter: (value: number) => value + '%',
      yAxisMax: 100,
      height: 250,
      tooltipTitle: title,
      tooltipLines: (i) => [
        `${t('dashboard.quotePerformance.closingRatio')}: ${points[i]?.porcentaje ?? 0}%`,
        `${t('dashboard.quotePerformance.quotesCount')}: ${points[i]?.cotizaciones ?? 0}`,
        `${t('dashboard.quotePerformance.orders')}: ${points[i]?.pedidos ?? 0}`,
      ],
    };

    return { generatedChartConfig: generated, closingChartConfig: closing };
  }, [t, data, view]);

  return (
    <div className="p-3">
      <div className="p-3 bg-white rounded-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#21272a",
              margin: 0,
            }}
          >
            {t('dashboard.quotePerformance.title')}
            {loading && <span className="spinner-border spinner-border-sm ms-2 text-secondary" role="status" />}
          </h1>
          <div className="ms-auto">
            <div className="btn-group" role="group">
              <button
                type="button"
                onClick={() => onViewChange('monthly')}
                className={`btn btn-sm btn-outline-success chart-toggle-btn text-dark${view === 'monthly' ? ' active' : ''}`}
                style={{
                  height: "25px",
                  width: "90px",
                  borderRadius: "18px 0 0 18px",
                  fontSize: "12px",
                  fontWeight: 500,
                  backgroundColor: view === 'monthly' ? "#7cc249" : undefined,
                  border: "1px solid #7cc249"
                }}
              >
                {t('dashboard.kpiComparison.monthly')}
              </button>
              <button
                type="button"
                onClick={() => onViewChange('yearly')}
                className={`btn text-dark btn-sm btn-outline-success chart-toggle-btn${view === 'yearly' ? ' active' : ''}`}
                style={{
                  height: "25px",
                  width: "90px",
                  borderRadius: "0 18px 18px 0",
                  fontSize: "12px",
                  fontWeight: 500,
                  backgroundColor: view === 'yearly' ? "#7cc249" : undefined,
                  border: "1px solid #7cc249"
                }}
              >
                {t('dashboard.kpiComparison.yearly')}
              </button>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: "32px", marginTop: "4px" }}
        >
          {kpis.map((kpi) => (
            <div key={kpi.key}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#21272a" }}>
                {kpi.value}
                {kpi.variation !== null && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`quote-kpi-${kpi.key}`}>
                        {t(view === 'monthly' ? 'dashboard.quotePerformance.previousMonth' : 'dashboard.quotePerformance.previousYear')}: {kpi.previous}
                      </Tooltip>
                    }
                  >
                    <span
                      style={{
                        color: kpi.negative ? "#d9534f" : "#4caf50",
                        fontSize: "10px",
                        fontWeight: 500,
                        background: kpi.negative ? "#fdeeee" : "#eefbf0",
                        borderRadius: "12px",
                        padding: "2px 6px",
                        marginLeft: "2px",
                        border: `1px solid ${kpi.negative ? "#d9534f" : "#4caf50"}`,
                        cursor: "default",
                      }}
                    >
                      {kpi.variation}
                    </span>
                  </OverlayTrigger>
                )}
              </div>
              <span style={{ fontSize: "12px", color: "#4b647e" }}>
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column flex-xl-row gap-5 mt-3">
          <RadioChart config={generatedChartConfig} />
          <RadioChart config={closingChartConfig} />
        </div>
      </div>
    </div>
  );
}
