import { keepPreviousData } from '@tanstack/react-query';
import { useGetDashboard } from '../api/generated';
import type { GetDashboard200Data, GetDashboardParams } from '../api/schemas';
import { useI18nCache } from '../i18n/i18nCacheProvider';

interface UseDashboardDataReturn {
  data: GetDashboard200Data | undefined;
  loading: boolean;
  /** Recargando con datos previos en pantalla (p. ej. al cambiar filtros) */
  fetching: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboardData(params?: GetDashboardParams): UseDashboardDataReturn {
  const { lang } = useI18nCache();
  const idioma = lang === 'en' ? 'en' : 'es';

  // Los filtros sólo cambian cotizaciones_performance: se mantienen los datos previos mientras recarga
  // para no volver al spinner de pantalla completa
  const { data, isLoading, isFetching, error, refetch } = useGetDashboard(idioma, params, {
    query: { placeholderData: keepPreviousData },
  });

  return {
    data: data?.data,
    loading: isLoading,
    fetching: isFetching,
    error: error ? (error as unknown as Error)?.message ?? 'Failed to fetch dashboard data' : null,
    refetch: () => { void refetch(); },
  };
}
