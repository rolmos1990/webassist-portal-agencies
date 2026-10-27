import type { GetRenovacionesPendientesParams } from '../../api/schemas';

/** Filtros de renovaciones pendientes. Vacío = sin filtro. Fechas en YYYY-MM-DD (input date). */
export type RenewalFilterValues = {
  tipoPlan: string;
  fechaInicio: string;
  fechaFinal: string;
};

export const EMPTY_RENEWAL_FILTERS: RenewalFilterValues = {
  tipoPlan: '',
  fechaInicio: '',
  fechaFinal: '',
};

/** Filtros -> query params de GET /renovaciones-pendientes (los undefined no se envían) */
export const toRenewalFilterParams = (f: RenewalFilterValues): GetRenovacionesPendientesParams => ({
  tipo_plan: f.tipoPlan ? Number(f.tipoPlan) : undefined,
  fecha_inicio: f.fechaInicio || undefined,
  fecha_final: f.fechaFinal || undefined,
});
