import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "./ApiError";

type TranslateFn = (key: string) => string;

/**
 * Pasa los errores de validación del servicio (`errores: { campo: motivo }`) a React Hook Form.
 * `fieldMap` traduce el nombre del campo de la API al nombre del campo del formulario.
 * Devuelve true si se asignó al menos un error.
 */
export function applyApiFieldErrors<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>,
  fieldMap: Partial<Record<string, Path<T>>>,
  t: TranslateFn
): boolean {
  if (!(err instanceof ApiError) || !err.fieldErrors) return false;

  let applied = false;
  for (const [apiField, motivo] of Object.entries(err.fieldErrors)) {
    const field = fieldMap[apiField];
    if (!field) continue;
    setError(field, { type: "server", message: t(`errors.fieldReason.${motivo}`) });
    applied = true;
  }
  return applied;
}
