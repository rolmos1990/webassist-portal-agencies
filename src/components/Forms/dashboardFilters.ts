import type { GetDashboardParams } from '../../api/schemas';

/** Filtros del dashboard (sólo afectan a cotizaciones_performance). Ids como string; vacío = sin filtro. */
export type DashboardFilterValues = {
  paisOrigen: string;
  tipoPlan: string;
};

export const EMPTY_DASHBOARD_FILTERS: DashboardFilterValues = {
  paisOrigen: '',
  tipoPlan: '',
};

/** Filtros -> query params de GET /dashboard (los undefined no se envían) */
export const toDashboardFilterParams = (f: DashboardFilterValues): GetDashboardParams => ({
  pais_origen: f.paisOrigen ? Number(f.paisOrigen) : undefined,
  tipo_plan: f.tipoPlan ? Number(f.tipoPlan) : undefined,
});
