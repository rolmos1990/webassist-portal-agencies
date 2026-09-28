import type { GetAsistenciasAgenteAgenciaParams, GetCotizacionesAgenteAgenciaParams } from '../../api/schemas';

/** Filtros de cotizaciones / asistencias. Vacío = sin filtro. Países como id en string. */
export type PassengerFilterValues = {
  voucher: string;
  nombre: string;
  pasaporte: string;
  pais: string;
  nacionalidad: string;
};

export const EMPTY_PASSENGER_FILTERS: PassengerFilterValues = {
  voucher: '',
  nombre: '',
  pasaporte: '',
  pais: '',
  nacionalidad: '',
};

const textOrUndefined = (v: string) => v.trim() || undefined;
const idOrUndefined = (v: string) => (v ? Number(v) : undefined);

/** Filtros -> query params de GET /cotizaciones (los undefined no se envían) */
export const toQuoteFilterParams = (
  f: PassengerFilterValues
): Omit<GetCotizacionesAgenteAgenciaParams, 'pagina'> => ({
  nombre: textOrUndefined(f.nombre),
  pasaporte: textOrUndefined(f.pasaporte),
  pais: idOrUndefined(f.pais),
  pais_nacionalidad: idOrUndefined(f.nacionalidad),
});

/** Filtros -> query params de GET /asistencias (los undefined no se envían) */
export const toAssistanceFilterParams = (
  f: PassengerFilterValues
): Omit<GetAsistenciasAgenteAgenciaParams, 'pagina'> => ({
  voucher: textOrUndefined(f.voucher),
  nombre: textOrUndefined(f.nombre),
  pasaporte: textOrUndefined(f.pasaporte),
  nacionalidad: idOrUndefined(f.nacionalidad),
});
