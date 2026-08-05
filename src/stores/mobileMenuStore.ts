import { create } from "zustand";

/**
 * Estado del drawer móvil del sidebar. Separado a propósito del estado
 * isCollapsed de escritorio (Navbar.tsx) — nunca se reutilizan entre sí.
 * No persiste: es puramente una preferencia de sesión de la pantalla actual,
 * y debe arrancar cerrado en cada carga (ver Navbar.tsx).
 * Vive en su propio store (no en un prop de DashboardLayout) porque tanto
 * Header.tsx (botón hamburguesa) como Navbar.tsx (drawer) necesitan
 * leerlo/escribirlo sin acoplarse entre sí.
 */
type MobileMenuState = {
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
};

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
}));
