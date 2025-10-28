import { useState, useEffect } from 'react';

import logo from '../assets/images/logo.png';
import iconArrow from '../assets/images/icons/arrow.svg';
import iconDashboard from '../assets/images/icons/icon (9).svg';
import iconAgencies from '../assets/images/icons/icon (8).svg';
import iconAgents from '../assets/images/icons/icon (7).svg';
//import iconSales from '../assets/images/icons/icon (5).svg';
import iconNewQuote from '../assets/images/icons/icon (4).svg';
import iconStandingQuote from '../assets/images/icons/icon (2).svg';
import iconReports from '../assets/images/icons/icon (10).svg';
import SidebarItem from './SidebarItem';
import { useTranslation } from 'react-i18next';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { PATHS } from '../routes/Routes';

function NavBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991.98);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { lang } = useI18nCache();

  const { t } = useTranslation();

  // Detecta tamaño de pantalla al cambiar el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991.98);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  // Clases condicionales basadas en la lógica original
  const sidebarClassName = `
    d-flex flex-column flex-shrink-0 sidebar
    ${isMobile ? (sidebarOpen ? 'show-sidebar' : '') : (sidebarOpen ? '' : 'hide-sidebar')}
  `.trim();

  const toggleClassName = `
    sidebar-control position-absolute
    ${sidebarOpen ? 'inverted-arrow' : ''}
    ${!sidebarOpen ? 'right-0' : ''}
  `.trim();

  return (
    <div className="position-relative" style={{ width: 'fit-content', zIndex: 9999 }}>
      <div
        className={toggleClassName}
        id="sidebarToggle"
        style={{ cursor: 'pointer' }}
        onClick={handleSidebarToggle}
      >
        <img src={iconArrow} alt="arrow" />
      </div>

      <div className={sidebarClassName} id="sidebarMenu">
        <a href="/" className="d-flex align-items-center p-3">
          <img src={logo} alt="logo" />
        </a>
        <ul className="nav nav-pills flex-column mb-auto mt-3 ps-3">
        <SidebarItem icon={iconDashboard} label={t('dashboard')} path={PATHS.dashboard.home()} />
        {/* <SidebarItem icon={iconSales} label={t('perfil')} path="/profile" /> */}
        <SidebarItem icon={iconAgencies} label={t('agencias')} path={PATHS.agencies.list()} />
        <SidebarItem icon={iconAgents} label={t('agentes')} path={PATHS.agents.list()} />
        {/* <SidebarItem icon={iconAgents} label="Administrar Usuarios" path="/users" /> */}
        <SidebarItem icon={iconNewQuote} label={t('mis_cotizaciones')} path={PATHS.quotes.mine()} />
        <SidebarItem icon={iconNewQuote} label={t('todas_cotizaciones')} path={PATHS.quotes.agency()} />

        <SidebarItem icon={iconStandingQuote} label={t('mis_asistencias')} path={PATHS.assistances.mine()} />
        <SidebarItem icon={iconStandingQuote} label={t('todas_asistencias')} path={PATHS.assistances.agency()} />

        <SidebarItem icon={iconReports} label={t('reporte_ventas')} path={PATHS.reports()} />
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
