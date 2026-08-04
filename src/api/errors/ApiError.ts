export class ApiError extends Error {
    public statusCode?: number;
    public raw?: any;
    public isApiError: boolean = true;

    constructor(message: string, statusCode?: number, raw?: any) {
      super(message);
      this.name = "ApiError";
      this.statusCode = statusCode;
      this.raw = raw;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
  }

/**
 * Extrae el mensaje de error real devuelto por el servicio (customFetch ya lo
 * resuelve desde `data.error`/`msg`/`message`/`error` del payload) en vez de
 * mostrar siempre un mensaje genérico.
 */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback;
}
