import { Outlet } from 'react-router-dom';
import '../assets/scss/layout/_auth.scss'

const AuthLayout = () => (
      <div className="container-fluid bg-primary vh-100 d-flex align-items-center justify-content-center login-container">
            <main className="w-100 row">
                  <Outlet />
            </main>
      </div>
);

export default AuthLayout;