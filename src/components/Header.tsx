import iconRounded from '../assets/images/icons/rounded-icon.svg';
import iconNotification from '../assets/images/icons/notification.svg';
import Search from './common/Search';

function Header() {
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
        <div className="dropdown text-end">
          <a
            href="#"
            className="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              className="rounded-circle"
            />
          </a>
          <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
