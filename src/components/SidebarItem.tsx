import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { FC, MouseEvent } from 'react';
import TooltipJS from 'bootstrap/js/dist/tooltip';

type SidebarItemProps = {
  icon: string;
  label: string;
  path: string;
  /** Modo compacto (tablet o escritorio colapsado): solo ícono, con tooltip al hover/focus. */
  collapsed?: boolean;
  /** Se llama después de navegar. Usado para cerrar el drawer móvil al elegir una opción. */
  onNavigate?: () => void;
};

const SidebarItem: FC<SidebarItemProps> = ({ icon, label, path, collapsed = false, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const isActive = location.pathname === path;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(path);
    onNavigate?.();
  };

  // El tooltip solo tiene sentido colapsado: expandido, el label ya es visible.
  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    if (!collapsed) {
      TooltipJS.getInstance(el)?.dispose();
      return;
    }

    const instance =
      TooltipJS.getInstance(el) ??
      new TooltipJS(el, {
        title: label,
        placement: 'right',
        trigger: 'hover focus',
      });

    return () => {
      instance.dispose();
    };
  }, [collapsed, label]);

  return (
    <li>
      <a
        ref={linkRef}
        href="#"
        onClick={handleClick}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={`nav-link py-3 d-flex align-items-center ${isActive ? 'active' : ''} ${
          collapsed ? 'justify-content-center nav-link-collapsed' : 'gap-3'
        }`}
      >
        <img src={icon} alt="" className="icon" />
        <span className="nav-label" aria-hidden={collapsed || undefined}>
          {label}
        </span>
      </a>
    </li>
  );
};

export default SidebarItem;
