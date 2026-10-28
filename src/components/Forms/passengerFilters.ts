import type { GetAsistenciasAgenteAgenciaParams, GetCotizacionesAgenteAgenciaParams } from '../../api/schemas';

/**
 * Filtros de cotizaciones / asistencias. Vacío = sin filtro. Países, plan y tipo de plan como id
 * en string; fechas como YYYY-MM-DD (valor de <input type="date">).
 */
export type PassengerFilterValues = {
  voucher: string;
  nombre: string;
  pasaporte: string;
  pais: string;
  nacionalidad: string;
  fechaInicio: string;
  fechaFinal: string;
  tipoPlan: string;
  plan: string;
};

export const EMPTY_PASSENGER_FILTERS: PassengerFilterValues = {
  voucher: '',
  nombre: '',
  pasaporte: '',
  pais: '',
  nacionalidad: '',
  fechaInicio: '',
  fechaFinal: '',
  tipoPlan: '',
  plan: '',
};

const textOrUndefined = (v: string) => v.trim() || undefined;
const idOrUndefined = (v: string) => (v ? Number(v) : undefined);

// El servicio de asistencias espera DD/MM/YYYY
const toDmy = (v: string) => {
  if (!v) return undefined;
  const [year, month, day] = v.split('-');
  return `${day}/${month}/${year}`;
};

/** Filtros -> query params de GET /cotizaciones (los undefined no se envían) */
export const toQuoteFilterParams = (
  f: PassengerFilterValues
): Omit<GetCotizacionesAgenteAgenciaParams, 'pagina'> => ({
  nombre: textOrUndefined(f.nombre),
  pasaporte: textOrUndefined(f.pasaporte),
  pais: idOrUndefined(f.pais),
  pais_nacionalidad: idOrUndefined(f.nacionalidad),
});

/** Filtros -> query params de GET /asistencias (los undefined no se envían; nacionalidad por ahora no se filtra) */
export const toAssistanceFilterParams = (
  f: PassengerFilterValues
): Omit<GetAsistenciasAgenteAgenciaParams, 'pagina'> => ({
  fecha_inicio: toDmy(f.fechaInicio),
  fecha_final: toDmy(f.fechaFinal),
  voucher: textOrUndefined(f.voucher),
  tipo_plan: idOrUndefined(f.tipoPlan),
  plan: idOrUndefined(f.plan),
  nombre: textOrUndefined(f.nombre),
  pasaporte: textOrUndefined(f.pasaporte),
});

/** Cantidad de filtros con valor, para el contador del botón "Filtrar por (n)" */
export const countActiveFilters = (f: Record<string, string>) =>
  Object.values(f).filter((v) => v.trim() !== '').length;
