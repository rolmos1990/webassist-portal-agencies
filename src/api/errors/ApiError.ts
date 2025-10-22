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
  