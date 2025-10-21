import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
};

type AuthState = {
  userToken: string | null;
  tokenExpiresAt: number | null;   // epoch ms
  user: User | null;

  // flags planos
  isAuthenticated: boolean;
  isExpired: boolean;

  // NUEVO: control de notificación de logout
  lastLogoutExpired: boolean;   // el último logout fue por expiración
  notifiedLogout: boolean;      // ya mostramos el toast por ese logout
  markLogoutNotified: () => void;

  // acciones
  login: (opts: { userToken?: string | null; expiresAt?: number | null; user?: User | null }) => void;
  setUserToken: (userToken: string | null) => void;
  setUser: (user: User | null) => void;
  logout: (opts?: { expired?: boolean }) => void;

  // watcher de expiración
  _expiryTimeoutId?: number | null;
  _startExpiryWatcher: () => void;
  _stopExpiryWatcher: () => void;
};

const EXPIRY_GRACE_MS = 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      userToken: null,
      tokenExpiresAt: null,
      user: null,

      isAuthenticated: false,
      isExpired: false,

      // NUEVO
      lastLogoutExpired: false,
      notifiedLogout: false,
      markLogoutNotified: () => set({ notifiedLogout: true }),

      login: ({ userToken = null, expiresAt = null, user = null }) => {
        set({
          userToken,
          tokenExpiresAt: expiresAt,
          user,
          isAuthenticated: !!userToken,
          isExpired: false,
          // reset ciclo de notificación
          lastLogoutExpired: false,
          notifiedLogout: false,
        });
        get()._stopExpiryWatcher();
        if (expiresAt) get()._startExpiryWatcher();
      },

      setUserToken: (userToken) =>
        set({
          userToken,
          isAuthenticated: !!userToken,
        }),

      setUser: (user) => set({ user }),

      logout: ({ expired = false } = {}) => {
        set({
          userToken: null,
          tokenExpiresAt: null,
          user: null,
          isAuthenticated: false,
          isExpired: expired,
          lastLogoutExpired: expired,
          notifiedLogout: false, // habilita notificación pendiente
        });
        get()._stopExpiryWatcher();
      },

      _expiryTimeoutId: null,

      _startExpiryWatcher: () => {
        const { tokenExpiresAt } = get();
        if (!tokenExpiresAt) return;
        const msLeft = Math.max(tokenExpiresAt - Date.now(), 0);
        const id = window.setTimeout(() => {
          // Logout directo por expiración (sin set extra)
          get().logout({ expired: true });
        }, msLeft + EXPIRY_GRACE_MS);
        set({ _expiryTimeoutId: id });
      },

      _stopExpiryWatcher: () => {
        const id = get()._expiryTimeoutId;
        if (id) {
          clearTimeout(id);
          set({ _expiryTimeoutId: null });
        }
      },
    })),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos lo necesario; NO persistas flags de notificación
      partialize: (s) => ({
        userToken: s.userToken,
        tokenExpiresAt: s.tokenExpiresAt,
        user: s.user,
        // isAuthenticated/isExpired se recomponen con login/logout
      }),
    }
  )
);

export function bootstrapAuthWatcher() {
  const { userToken, tokenExpiresAt, _startExpiryWatcher, isAuthenticated } = useAuthStore.getState();
  if (userToken && tokenExpiresAt) _startExpiryWatcher();
  // Alinea flag tras recarga
  if (!!userToken !== isAuthenticated) {
    useAuthStore.setState({ isAuthenticated: !!userToken });
  }
}
