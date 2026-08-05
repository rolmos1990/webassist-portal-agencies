import { useState, useEffect } from 'react';

import logo from '../assets/images/logo.png';
import iconArrow from '../assets/images/icons/arrow.svg';
import iconDashboard from '../assets/images/icons/icon (9).svg';
import iconAgencies from '../assets/images/icons/icon (8).svg';
import iconAgents from '../assets/images/icons/icon (7).svg';
import iconClients from '../assets/images/icons/icon (1).svg';
//import iconSales from '../assets/images/icons/icon (5).svg';
import iconNewQuote from '../assets/images/icons/icon (4).svg';
import iconStandingQuote from '../assets/images/icons/icon (2).svg';
import iconReports from '../assets/images/icons/icon (10).svg';
import SidebarItem from './SidebarItem';
import { useTranslation } from 'react-i18next';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { PATHS } from '../routes/Routes';
import { useSecurityStore } from '../stores/securityStore';
import { SecurityRole } from '../stores/SecurityRole';
import { useMobileMenuStore } from '../stores/mobileMenuStore';

function NavBar() {
  const [width, setWidth] = useState(window.innerWidth);
  // Escritorio: expandido/colapsado (solo íconos), alternable con el botón flotante.
  // Completamente separado del drawer móvil (mobileMenuStore) — nunca se mezclan.
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { lang } = useI18nCache();
  const isAdmin = useSecurityStore((state) => state.hasRole(SecurityRole.AGENT_ADMIN));
  const isMobileMenuOpen = useMobileMenuStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = useMobileMenuStore((state) => state.closeMobileMenu);

  const { t } = useTranslation();

  // Detecta tamaño de pantalla al cambiar el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Teléfono (<768px): drawer superpuesto, controlado por mobileMenuStore (botón
  // hamburguesa en Header.tsx). Tablet (768–991.98px): sidebar fijo compacto, no
  // expandible. Escritorio (>991.98px): flujo normal, expandible/colapsable.
  const isTablet = width > 767.98 && width <= 991.98;
  const isDesktop = width > 991.98;

  // Si la ventana deja de ser teléfono con el drawer abierto (ej. rotar el
  // dispositivo o redimensionar), lo cerramos para evitar estados inconsistentes.
  useEffect(() => {
    if (width > 767.98 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [width, isMobileMenuOpen, closeMobileMenu]);

  // Cierra el drawer con Escape mientras está abierto.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Solo íconos: en tablet siempre, y en escritorio cuando el usuario colapsa.
  const isCompact = isTablet || (isDesktop && isCollapsed);

  const sidebarClassName = `
    d-flex flex-column flex-shrink-0 sidebar
    ${isMobileMenuOpen ? 'show-sidebar' : ''}
    ${isDesktop && isCollapsed ? 'sidebar-collapsed' : ''}
  `.trim();

  return (
    <>
      {/* Overlay del drawer móvil: debajo del sidebar (z-index), encima del contenido. */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <div className="position-relative" style={{ width: 'fit-content', zIndex: 9999 }}>
        {/* Botón flotante: solo escritorio. En tablet/mobile está oculto por CSS
            (tablet no es expandible, mobile usa el botón hamburguesa del Header). */}
        <button
          type="button"
          className={`sidebar-control position-absolute ${isCollapsed ? 'collapsed' : 'inverted-arrow'}`}
          id="sidebarToggle"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          title={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          <img src={iconArrow} alt="" />
        </button>

        <div className={sidebarClassName} id="sidebarMenu">
          <div className={`d-flex align-items-center p-3 ${isCompact ? 'justify-content-center' : 'justify-content-between'}`}>
            <a href="/" className="d-flex align-items-center">
              <img src={logo} alt="We Assist" className="logo-full" />
            </a>
            {isMobileMenuOpen && (
              <button
                type="button"
                className="sidebar-close-btn"
                onClick={closeMobileMenu}
                aria-label={t('sidebar.closeMenu')}
              >
                <i className="bi bi-x-lg" />
              </button>
            )}
          </div>
          <ul className="nav nav-pills flex-column mb-auto mt-3 ps-3">
          <SidebarItem icon={iconDashboard} label={t('menu.dashboard')} path={PATHS.dashboard.home()} collapsed={isCompact} onNavigate={closeMobileMenu} />
          {/* <SidebarItem icon={iconSales} label={t('perfil')} path="/profile" /> */}
          <SidebarItem icon={iconClients} label={t('menu.clients')} path={PATHS.clients.list()} collapsed={isCompact} onNavigate={closeMobileMenu} />
          {isAdmin && (
            <>
              <SidebarItem icon={iconAgencies} label={t('menu.agencies')} path={PATHS.agencies.list()} collapsed={isCompact} onNavigate={closeMobileMenu} />
              <SidebarItem icon={iconAgents} label={t('menu.agents')} path={PATHS.agents.list()} collapsed={isCompact} onNavigate={closeMobileMenu} />
            </>
          )}
          {/* <SidebarItem icon={iconAgents} label="Administrar Usuarios" path="/users" /> */}
          <SidebarItem icon={iconNewQuote} label={t('menu.agencyQuotes')} path={PATHS.quotes.agency()} collapsed={isCompact} onNavigate={closeMobileMenu} />

          <SidebarItem icon={iconStandingQuote} label={t('menu.agencyAssistances')} path={PATHS.assistances.agency()} collapsed={isCompact} onNavigate={closeMobileMenu} />

          <SidebarItem icon={iconReports} label={t('menu.salesReport')} path={PATHS.reports()} collapsed={isCompact} onNavigate={closeMobileMenu} />
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
