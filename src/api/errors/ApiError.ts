/** Códigos de error_code documentados en el contrato (ver ErrorRespuesta en openapi.yaml). */
export const API_ERROR_CODE = {
  INVALID_API_TOKEN: 5000,
  UNSUPPORTED_LANGUAGE: 5001,
  INVALID_USER_TOKEN: 5002,
  NOT_FOUND: 5003,
  METHOD_NOT_ALLOWED: 5004,
  INTERNAL_ERROR: 5005,
} as const;

export class ApiError extends Error {
    public statusCode?: number;
    public raw?: any;
    public isApiError: boolean = true;
    /** error_code del contrato (5000-5005), si el servicio lo envió */
    public errorCode?: number;
    /** errores de validación por campo: { campo: motivo } */
    public fieldErrors?: Record<string, string>;

    constructor(message: string, statusCode?: number, raw?: any) {
      super(message);
      this.name = "ApiError";
      this.statusCode = statusCode;
      this.raw = raw;
      this.errorCode = typeof raw?.error_code === "number" ? raw.error_code : undefined;
      this.fieldErrors = isFieldErrors(raw?.errores) ? raw.errores : undefined;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
  }

function isFieldErrors(value: unknown): value is Record<string, string> {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === "string")
  );
}

/**
 * Extrae el mensaje de error real devuelto por el servicio (customFetch ya lo
 * resuelve desde `mensaje`/`data.error`/`msg`/`message`/`error` del payload) en vez de
 * mostrar siempre un mensaje genérico.
 */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback;
}
