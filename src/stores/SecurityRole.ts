/**
 * Roles de negocio soportados por el frontend.
 * El backend no expone un enum formal (openapi.yaml no restringe `roles`),
 * por eso el valor crudo se trata como no confiable y se parsea en el borde.
 *
 * Se usa un objeto `as const` en vez de `enum`: el tsconfig de este proyecto
 * tiene `erasableSyntaxOnly: true`, que no permite `enum` (no es sintaxis
 * borrable en la transpilación). Este patrón da el mismo uso (`SecurityRole.AGENT_ADMIN`)
 * tanto como valor y como tipo.
 */
export const SecurityRole = {
  AGENT: "agente",
  AGENT_ADMIN: "agente_administrador",
} as const;

export type SecurityRole = (typeof SecurityRole)[keyof typeof SecurityRole];

/** Lo que realmente puede llegar del backend: string libre, sin garantías. */
export type BackendRole = string;

const KNOWN_ROLES = new Set<string>(Object.values(SecurityRole));

/**
 * Reduce el array de roles del backend a un único SecurityRole válido.
 * - Si el usuario tiene varios roles reconocidos, prioriza el más privilegiado.
 * - Si no hay ningún rol reconocido (undefined, vacío, o valores desconocidos), devuelve null.
 * Un rol desconocido/inválido nunca habilita accesos: se resuelve a null (fail-closed).
 */
export function parseSecurityRole(roles?: BackendRole[] | null): SecurityRole | null {
  if (!roles || roles.length === 0) return null;
  if (roles.includes(SecurityRole.AGENT_ADMIN)) return SecurityRole.AGENT_ADMIN;
  const match = roles.find((role) => KNOWN_ROLES.has(role));
  return (match as SecurityRole) ?? null;
}
