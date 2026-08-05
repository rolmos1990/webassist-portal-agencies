import { QueryClient } from '@tanstack/react-query';
import { useAuthStore } from './stores/useAuthStore';

export const queryClient = new QueryClient();

/**
 * Limpia el cache de React Query cada vez que se pierde la autenticación
 * (sign out manual, expiración de token, o sesión inválida detectada por el
 * backend en custom-fetcher.ts). Sin esto, las queries no están particionadas
 * por usuario (ej. la key de useGetDashboard es solo `/${idioma}/dashboard`),
 * así que tras un logout el siguiente login mostraba datos cacheados del
 * usuario anterior hasta el próximo refetch.
 */
export function bootstrapQueryClientWatcher() {
  useAuthStore.subscribe(
    (state) => state.isAuthenticated,
    (isAuthenticated, wasAuthenticated) => {
      if (wasAuthenticated && !isAuthenticated) {
        queryClient.clear();
      }
    }
  );
}
