import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "../services/toast";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores/useAuthStore";
import { PATHS } from "./Routes";

const PrivateRoute = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isExpired = useAuthStore((s) => s.isExpired);
  const lastLogoutExpired = useAuthStore((s) => s.lastLogoutExpired);
  const notifiedLogout = useAuthStore((s) => s.notifiedLogout);
  const markLogoutNotified = useAuthStore((s) => s.markLogoutNotified);

  useEffect(() => {
    const shouldNotify =
      (!isAuthenticated || isExpired) &&
      lastLogoutExpired &&
      !notifiedLogout &&
      location.pathname !== PATHS.auth.login();

    if (shouldNotify) {
      toast.error("Disconnected", t("errors.sessionExpired"));
      markLogoutNotified();
    }
  }, [
    isAuthenticated,
    isExpired,
    lastLogoutExpired,
    notifiedLogout,
    location.pathname,
    t,
    markLogoutNotified,
  ]);

  if (!isAuthenticated || isExpired) {
    return <Navigate to={PATHS.auth.login()} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;