import { useLocation, useNavigate } from 'react-router-dom';
import type { FC, MouseEvent } from 'react';

type SidebarItemProps = {
  icon: string;
  label: string;
  path: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ icon, label, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === path;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <li>
      <a
        href="#"
        onClick={handleClick}
        className={`nav-link gap-3 py-3 d-flex align-items-center ${isActive ? 'active' : ''}`}
      >
        <img src={icon} alt={`${label} icon`} className="icon" />
        <span>{label}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
