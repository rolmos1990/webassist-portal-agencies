import type { ReactNode } from "react";
import { useSecurityStore } from "../stores/securityStore";
import type { SecurityRole } from "../stores/SecurityRole";

interface RoleGuardProps {
  roles: SecurityRole[];
  children: ReactNode;
  /** Qué mostrar si el rol no alcanza. Por defecto no renderiza nada. */
  fallback?: ReactNode;
}

export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const allowed = useSecurityStore((state) => state.hasAnyRole(roles));
  return <>{allowed ? children : fallback}</>;
}
