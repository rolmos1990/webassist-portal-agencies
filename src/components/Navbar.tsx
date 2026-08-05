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

function NavBar() {
  const [width, setWidth] = useState(window.innerWidth);
  // Drawer superpuesto: solo en teléfono (<768px). Arranca cerrado para no
  // tapar el contenido al cargar la página en pantallas angostas.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Modo compacto de escritorio (solo íconos), alternable con el botón.
  const [collapsed, setCollapsed] = useState(false);
  const { lang } = useI18nCache();
  const isAdmin = useSecurityStore((state) => state.hasRole(SecurityRole.AGENT_ADMIN));

  const { t } = useTranslation();

  // Detecta tamaño de pantalla al cambiar el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Teléfono: drawer superpuesto (show/hide), como siempre.
  // Tablet: sidebar fijo y compacto, no expandible (sin drawer, sin overlay).
  // Desktop: sidebar en flujo normal, alternable entre completo y compacto.
  const isMobile = width <= 991.98;
  const isTablet = width > 767.98 && width <= 991.98;
  const isDesktop = width > 991.98;

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  // Solo íconos: en desktop cuando el usuario colapsa, y siempre en tablet.
  const isCompact = isTablet || (isDesktop && collapsed);

  // Clases condicionales basadas en la lógica original
  const sidebarClassName = `
    d-flex flex-column flex-shrink-0 sidebar
    ${isMobile ? (sidebarOpen ? 'show-sidebar' : '') : (collapsed ? 'sidebar-collapsed' : '')}
  `.trim();

  const toggleClassName = `
    sidebar-control position-absolute
    ${isMobile
      ? (sidebarOpen ? 'inverted-arrow' : 'right-0')
      : (collapsed ? 'collapsed' : 'inverted-arrow')}
  `.trim();

  const isExpanded = isMobile ? sidebarOpen : !collapsed;
  const toggleLabel = isMobile
    ? (sidebarOpen ? t('sidebar.closeMenu') : t('sidebar.openMenu'))
    : (collapsed ? t('sidebar.expand') : t('sidebar.collapse'));

  return (
    <div className="position-relative" style={{ width: 'fit-content', zIndex: 9999 }}>
      <button
        type="button"
        className={toggleClassName}
        id="sidebarToggle"
        style={{ cursor: 'pointer' }}
        onClick={handleSidebarToggle}
        aria-expanded={isExpanded}
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        <img src={iconArrow} alt="" />
      </button>

      <div className={sidebarClassName} id="sidebarMenu">
        <a
          href="/"
          className={`d-flex align-items-center p-3 ${isCompact ? 'justify-content-center' : ''}`}
        >
          <img src={logo} alt="We Assist" className="logo-full" />
        </a>
        <ul className="nav nav-pills flex-column mb-auto mt-3 ps-3">
        <SidebarItem icon={iconDashboard} label={t('menu.dashboard')} path={PATHS.dashboard.home()} collapsed={isCompact} />
        {/* <SidebarItem icon={iconSales} label={t('perfil')} path="/profile" /> */}
        <SidebarItem icon={iconClients} label={t('menu.clients')} path={PATHS.clients.list()} collapsed={isCompact} />
        {isAdmin && (
          <>
            <SidebarItem icon={iconAgencies} label={t('menu.agencies')} path={PATHS.agencies.list()} collapsed={isCompact} />
            <SidebarItem icon={iconAgents} label={t('menu.agents')} path={PATHS.agents.list()} collapsed={isCompact} />
          </>
        )}
        {/* <SidebarItem icon={iconAgents} label="Administrar Usuarios" path="/users" /> */}
        <SidebarItem icon={iconNewQuote} label={t('menu.myQuotes')} path={PATHS.quotes.mine()} collapsed={isCompact} />
        <SidebarItem icon={iconNewQuote} label={t('menu.agencyQuotes')} path={PATHS.quotes.agency()} collapsed={isCompact} />

        <SidebarItem icon={iconStandingQuote} label={t('menu.myAssistances')} path={PATHS.assistances.mine()} collapsed={isCompact} />
        <SidebarItem icon={iconStandingQuote} label={t('menu.agencyAssistances')} path={PATHS.assistances.agency()} collapsed={isCompact} />

        <SidebarItem icon={iconReports} label={t('menu.salesReport')} path={PATHS.reports()} collapsed={isCompact} />
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
