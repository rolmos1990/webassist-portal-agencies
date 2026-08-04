import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { SecurityRole, parseSecurityRole } from "./SecurityRole";

type SecurityState = {
  currentRole: SecurityRole | null;
  setCurrentRole: (role: SecurityRole | null) => void;
  hasRole: (role: SecurityRole) => boolean;
  hasAnyRole: (roles: SecurityRole[]) => boolean;
  clearSecurity: () => void;
};

export const useSecurityStore = create<SecurityState>((set, get) => ({
  currentRole: null,

  setCurrentRole: (role) => set({ currentRole: role }),

  hasRole: (role) => get().currentRole === role,

  hasAnyRole: (roles) => {
    const current = get().currentRole;
    return current != null && roles.includes(current);
  },

  clearSecurity: () => set({ currentRole: null }),
}));

/**
 * Mantiene currentRole sincronizado con useAuthStore.user.roles.
 * Se llama una única vez a nivel de módulo en App.tsx (igual que bootstrapAuthWatcher),
 * así currentRole ya está resuelto antes del primer render de las rutas.
 */
export function bootstrapSecurityWatcher() {
  const sync = (user: { roles?: string[] } | null | undefined) => {
    useSecurityStore.getState().setCurrentRole(parseSecurityRole(user?.roles));
  };

  // Estado ya rehidratado por persist al momento de llamar esta función.
  sync(useAuthStore.getState().user);

  // Reacciona a login, logout y cualquier setUser() futuro.
  useAuthStore.subscribe((state) => state.user, sync);
}
