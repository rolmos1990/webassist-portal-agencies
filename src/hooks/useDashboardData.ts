import { useGetDashboard } from '../api/generated';
import type { GetDashboard200Data } from '../api/schemas';
import { useI18nCache } from '../i18n/i18nCacheProvider';

interface UseDashboardDataReturn {
  data: GetDashboard200Data | undefined;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboardData(): UseDashboardDataReturn {
  const { lang } = useI18nCache();
  const idioma = lang === 'en' ? 'en' : 'es';

  const { data, isLoading, error, refetch } = useGetDashboard(idioma);

  return {
    data: data?.data,
    loading: isLoading,
    error: error ? (error as unknown as Error)?.message ?? 'Failed to fetch dashboard data' : null,
    refetch: () => { void refetch(); },
  };
}
