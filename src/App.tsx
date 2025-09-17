import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Clients from './pages/Clients';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './routes/PrivateRoute';

//boostrap5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/scss/main.scss';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyQuotes from './pages/MyQuotes';
import ClientDetail from './pages/ClientDetail.tsx';
import PlanDetail from './pages/PlanDetail.tsx';
import Agencies from './pages/Agencies.tsx';
import AgencyDetail from './pages/AgencyDetail.tsx';
import Agents from './pages/Agents.tsx';
import AgentDetail from './pages/AgentDetail.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import CreateNewPassword from './pages/CreateNewPassword.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />  
          <Route path="/create-new-password" element={<CreateNewPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/agency/:id" element={<AgencyDetail />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agent/:id" element={<AgentDetail />} />
            <Route path="/users" element={<Clients />} />
            <Route path="/users/:id" element={<ClientDetail />} />
            <Route path="/users/:id/plan/:planId" element={<PlanDetail />} />
            <Route path="/quotesAgencies" element={<MyQuotes />} />
            <Route path="/assistent" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
