import { useAuthStore } from "../stores/useAuthStore";
import { ApiError } from "./errors/ApiError";
import { readEnv } from "../../env";


type FetchParams<TBody = any> = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  data?: TBody;
  params?: Record<string, any>;
  signal?: AbortSignal;
};

const PUBLIC_ENDPOINT_PATTERNS: RegExp[] = [
  /^\/login/i,
  /^\/auth\/refresh/i,
  /^\/public\//i,
];

const bearerToken = readEnv("VITE_API_BEARER_TOKEN") || "";
const baseUrl = readEnv("VITE_API_BASE_URL") || "";

const isAbsolute = (u: string) => /^https?:\/\//i.test(u);

const buildUrl = (base: string | undefined, path: string, params?: Record<string, any>) => {
  const trimmedBase = (base ?? "").replace(/\/+$/, "");
  const finalPath = path || "";
  const absoluteCandidate = isAbsolute(finalPath)
    ? finalPath
    : `${trimmedBase}${finalPath.startsWith("/") ? finalPath : `/${finalPath}`}`;

  const url = isAbsolute(absoluteCandidate)
    ? new URL(absoluteCandidate)
    : new URL(absoluteCandidate, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v == null) return;
      if (Array.isArray(v)) v.forEach(it => url.searchParams.append(k, String(it)));
      else url.searchParams.set(k, String(v));
    });
  } 

  return url.toString();
};

const needsBody = (method: string) => !["GET", "HEAD"].includes(method.toUpperCase());

export const customFetch = async <TResponse = unknown>(
  params: FetchParams
): Promise<TResponse> => {
  const { url, method, headers = {}, data, params: query, signal } = params;

  const fullUrl = buildUrl(baseUrl, url, query);


  const isPublic = PUBLIC_ENDPOINT_PATTERNS.some(rx => rx.test(url));

  // Respetar headers del generado
  const finalHeaders: Record<string, string> = { ...headers };
  if (!finalHeaders["Authorization"] && bearerToken) {
    finalHeaders["Authorization"] = `Bearer ${bearerToken}`;
  }
  
  const userToken = useAuthStore.getState().userToken || ""; 
  if (!finalHeaders["UserToken"] && !isPublic && userToken) {
    finalHeaders["UserToken"] = userToken;
  }

  finalHeaders["Accept"] = "application/json";

  // Body según el Content-Type decidido por Orval
  let body: BodyInit | undefined;

  const ct = (finalHeaders["Content-Type"] || finalHeaders["content-type"] || "").toLowerCase();

  if (needsBody(method) && data != null) {

    if (data instanceof FormData || data instanceof URLSearchParams || data instanceof Blob) {
      body = data as BodyInit;
      if (data instanceof FormData) {
        delete finalHeaders["Content-Type"];
        delete finalHeaders["content-type"];
      }
    } else if (ct.includes("application/json")) {
      body = typeof data === "string" ? data : JSON.stringify(data);
    } else if (ct.includes("text/plain")) {
      body = typeof data === "string" ? data : String(data);
    } else if (ct.includes("application/x-www-form-urlencoded")) {
      const usp = new URLSearchParams();
      Object.entries(data as Record<string, any>).forEach(([k, v]) => {
        if (v != null) usp.append(k, String(v));
      });
      body = usp as BodyInit;
    } else {
      body = typeof data === "string" ? data : JSON.stringify(data);
    }
  }

  if (!ct) finalHeaders["Content-Type"] = "application/json";

  const response = await fetch(fullUrl, {
    method,
    headers: finalHeaders,
    body,
    signal,
  });

  if (response.status === 204) return undefined as TResponse;

  // HTTP error (!2xx)
  if (!response.ok) {
    let errorText = `HTTP ${response.status}`;
    try {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const j = await response.json();
        errorText = j?.message ?? j?.error ?? j?.msg ?? JSON.stringify(j);
        throw new ApiError(errorText, response.status, j);
      } else {
        errorText = await response.text();
        throw new ApiError(errorText || `Error ${response.status}`, response.status, null);
      }
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(errorText || `Error ${response.status}`, response.status, null);
    }
  }

  const respCT = response.headers.get("content-type") || "";
  const result: any = respCT.includes("application/json")
    ? await response.json()
    : await response.text();

  // Sesión inválida → logout + ApiError
  const mensajesSesionInvalida = [
    "Invalid user",
    "Invalid User",
    "Usuario inválido",
    "Sesión inválida o expirada",
    "Debe ingresar para ver estos datos",
  ];
  const lower = (x: any) => String(x ?? "").toLowerCase();
  const msg = lower(result?.msg);
  const err = lower(result?.error);
  
  const sessionInvalidOrExpired =
    !isPublic &&
    (mensajesSesionInvalida.some(m => m.toLowerCase() === msg) ||
     mensajesSesionInvalida.some(m => m.toLowerCase() === err));

  if (sessionInvalidOrExpired) {
    useAuthStore.getState().logout({ expired: true });
    throw new ApiError("Sesión inválida o expirada", 401, result);
  }

  if (result?.ok === false) {
    const message =
      result?.data?.error ??
      result?.msg ??
      result?.message ??
      result?.error ??
      "Ha ocurrido un error inesperado";

      throw new ApiError(message, 500, result);
  }

  return result as TResponse;
};
