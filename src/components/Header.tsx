import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import iconRounded from '../assets/images/icons/rounded-icon.svg';
import iconNotification from '../assets/images/icons/notification.svg';
import Search from './common/Search';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className="position-relative">
          <img src={iconNotification} alt="notification icon" />
          <span
            className="position-absolute d-flex justify-content-center align-items-center"
            style={{
              top: "0",
              backgroundColor: "brown",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              right: "-5px",
              width: "17px",
              height: "17px",
            }}
          >
            9
          </span>
        </div>
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
