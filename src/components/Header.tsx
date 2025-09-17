import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import iconRounded from '../assets/images/icons/rounded-icon.svg';
import Search from './common/Search';
import NotificationsDropdown from './NotificationDropdown';
import type { NotificationItem } from './NotificationDropdown';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // TODO -- definir dentro de hooks estos states (verificar si usar context/sustants)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: "Target Achieved", time: "2 mins ago", message: "Congrats! You’ve hit 80%.", unread: true },
    { id: 2, title: "Agent Joined",  time: "1 hr ago",    message: "Sarah Parker joined your team.", unread: true },
    { id: 3, title: "New Program Added", time: "3 hr ago", message: "“Premium Travel Care” is now available." },
  ]);

  return (
    <header className="d-flex align-items-center bg-white justify-content-center justify-content-md-between py-3">
      <div className="w-100 d-flex justify-content-center align-items-center ms-2 ms-md-0">
        <Search />
      </div>

      <div
        style={{ width: "fit-content" }}
        className="col-md-3 text-end px-2 px-md-4 d-flex align-items-center justify-content-end gap-2 gap-md-3"
      >
        <img src={iconRounded} alt="rounded icon" />

        {/* 🔔 Notificaciones */}
        <NotificationsDropdown
          items={notifications}
          onItemClick={(item) => {
            navigate(`/users/${item.id}`);
            setNotifications(prev =>
              prev.map(n => n.id === item.id ? { ...n, unread: false } : n)
            );
          }}
          onOpenAll={() => navigate(`/users`)}
        />

        {/* 👤 User dropdown */}
        <Dropdown show={showDropdown} onToggle={setShowDropdown}>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-user"
            className="text-decoration-none p-0"
          >
            <img
              src="https://github.com/mdo.png"
              alt="Profile"
              width="32"
              height="32"
              className="rounded-circle"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="text-small">
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Item href="#">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/login">Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
