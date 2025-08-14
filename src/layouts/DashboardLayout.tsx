import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import '../assets/scss/layout/_sidebar.scss';

const DashboardLayout = () => (
  <div className="layout d-flex w-100 flex-shrink-0">
    <NavBar />
    <div
      className="flex-grow-1 content-box"
      style={{ minWidth: 0, overflowX: 'hidden', overflowY: 'auto' }}
    >
      <Header />
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
