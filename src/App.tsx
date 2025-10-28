// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocaleGate from './routes/LocalGate';

// layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './routes/PrivateRoute';

// pages...
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agencies from './pages/Agencies';
import AgencyDetail from './pages/AgencyDetail';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import ForgotPassword from './pages/ForgotPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import AssistanceAgency from './pages/AssistanceAgency';
import AssistanceAgencyDetail from './pages/AssistanceDetail';
import QuotesAgency from './pages/QuotesAgency';
import MyAssistances from './pages/MyAssistences';
import MyQuotes from './pages/MyQuotes';
import SalesReports from './pages/SalesReports';
import Renewals from './pages/Renewals';
import Settings from './pages/Settings';

// estilos/watchers
import './assets/scss/main.scss';
import { bootstrapAuthWatcher } from './stores/useAuthStore';
bootstrapAuthWatcher();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entradas sin lang → que caigan a ES por defecto */}
        <Route path="/" element={<Navigate to="/es" replace />} />

        {/* Todo lo real vive bajo /:lang */}
        <Route path="/:lang" element={<LocaleGate />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="create-new-password" element={<CreateNewPassword />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="agencies" element={<Agencies />} />
              <Route path="agency/:id" element={<AgencyDetail />} />
              <Route path="agents" element={<Agents />} />
              <Route path="agent/:id" element={<AgentDetail />} />
              <Route path="renewals" element={<Renewals />} />
              <Route path="quotesAgencies" element={<QuotesAgency />} />
              <Route path="my-quotes" element={<MyQuotes />} />
              <Route path="my-assistances" element={<MyAssistances />} />
              <Route path="agency-assistances" element={<AssistanceAgency />} />
              <Route path="assistance/:id" element={<AssistanceAgencyDetail />} />
              <Route path="reports" element={<SalesReports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 404 con lang */}
          <Route path="*" element={<Navigate to="/es/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
