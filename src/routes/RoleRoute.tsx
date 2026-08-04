import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSecurityStore } from "../stores/securityStore";
import type { SecurityRole } from "../stores/SecurityRole";
import { PATHS } from "./Routes";

interface RoleRouteProps {
  roles: SecurityRole[];
  /** A dónde redirigir si el rol no alcanza. Por defecto, al home del dashboard. */
  redirectTo?: string;
}

/**
 * Guard de rol para rutas anidadas. Se usa DENTRO de PrivateRoute
 * (la autenticación ya está garantizada en ese punto del árbol).
 */
export default function RoleRoute({ roles, redirectTo }: RoleRouteProps) {
  const location = useLocation();
  const allowed = useSecurityStore((state) => state.hasAnyRole(roles));

  if (!allowed) {
    return (
      <Navigate to={redirectTo ?? PATHS.dashboard.home()} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
}
