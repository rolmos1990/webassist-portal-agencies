import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import logo from "../assets/images/logo.png";
import iconRounded from "../assets/images/icons/rounded-icon.svg";
import GlobalSearch from "./common/GlobalSearch";
import NotificationsDropdown from "./NotificationDropdown";
import type { NotificationItem } from "./NotificationDropdown";
import Dropdown, { DropdownDivider, DropdownItem } from "./Dropdown";
import { useAuthStore } from '../stores/useAuthStore';
import { useTranslation } from "react-i18next";
import { PATHS } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { useMobileMenuStore } from "../stores/mobileMenuStore";
import {
  getGetNotificacionesQueryKey,
  useGetNotificaciones,
  useMarcarNotificacionLeida,
  usePostLogout,
} from "../api/generated";
import { toast } from "../services/toast";
import { getApiErrorMessage } from "../api/errors/ApiError";
import { useI18nCache } from "../i18n/i18nCacheProvider";

function Header() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const { t } = useTranslation();
  const { lang } = useI18nCache();
  const { mutateAsync: postLogout } = usePostLogout();
  const isMobileMenuOpen = useMobileMenuStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useMobileMenuStore((s) => s.toggleMobileMenu);

  const handleLogout = async () => {
    try {
      // Best-effort: invalida el token también del lado del backend. Si falla
      // (red caída, backend abajo), igual cerramos la sesión local.
      await postLogout({ idioma: lang });
    } catch {
      // noop
    } finally {
      logout();
    }
  };

  // Por defecto el servicio devuelve sólo las pendientes; `pendientes` trae siempre el total
  const queryClient = useQueryClient();
  const { data: notificacionesRes } = useGetNotificaciones(lang);
  const { mutateAsync: marcarLeida } = useMarcarNotificacionLeida();

  const notifications = useMemo<NotificationItem[]>(
    () =>
      (notificacionesRes?.data?.items ?? [])
        .filter((n) => n.id != null)
        .map((n) => ({
          id: n.id as number,
          title: n.texto ?? "",
          time: n.fecha ?? "",
          unread: !n.leida,
        })),
    [notificacionesRes]
  );

  const handleNotificationClick = async (item: NotificationItem) => {
    if (!item.unread) return;
    try {
      await marcarLeida({ idioma: lang, id: Number(item.id) });
      await queryClient.invalidateQueries({ queryKey: getGetNotificacionesQueryKey(lang) });
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    }
  };


  return (
    <header className="d-flex align-items-center bg-white justify-content-between py-3">
      <button
        type="button"
        className="btn btn-link d-lg-none p-0 ms-3 me-2 text-dark"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? t('sidebar.closeMenu') : t('sidebar.openMenu')}
      >
        <i className="bi bi-list fs-2" aria-hidden="true" />
      </button>

      <a href="/" className="d-lg-none">
        <img src={logo} alt="We Assist" style={{ height: 32 }} />
      </a>

      <div className="w-100 d-none d-lg-flex justify-content-center align-items-center ms-2 ms-md-0">
        <GlobalSearch />
      </div>

      <div
        style={{ width: "fit-content" }}
        className="col-md-3 text-end px-2 px-md-4 d-flex align-items-center justify-content-end gap-2 gap-md-3"
      >
        <img src={iconRounded} alt="rounded icon" />

        {/* 🔔 Notificaciones */}
        <NotificationsDropdown
          items={notifications}
          count={notificacionesRes?.data?.pendientes ?? notifications.length}
          onItemClick={handleNotificationClick}
        />

        <Dropdown
          align="end"
          trigger={
            <img
              src="https://github.com/mdo.png"
              alt="Profile"
              width="32"
              height="32"
              className="rounded-circle"
            />
          }
        >
          <DropdownItem onClick={() => navigate(PATHS.settings())}>{t('settings')}</DropdownItem>
          <DropdownItem onClick={() => navigate(PATHS.profile())}>{t('profile')}</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
