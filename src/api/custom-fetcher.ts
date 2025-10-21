import { useAuthStore } from "../stores/useAuthStore";

interface FetchParams {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: unknown;
}


const PUBLIC_ENDPOINT_PATTERNS: RegExp[] = [
  /^\login/i,
  /^\/auth\/refresh/i,
  /^\/public\//i
];

export const customFetch = async <TResponse = unknown>(
  params: FetchParams
): Promise<TResponse> => {
  const { url, method, headers = {}, body } = params;

  const bearerToken = import.meta.env.VITE_API_BEARER_TOKEN || '';
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const fullUrl = `${baseUrl}${url}`;

  const userToken = localStorage.getItem("user_token") || "";
  const isPublicByPattern = PUBLIC_ENDPOINT_PATTERNS.some((rx) => rx.test(url));

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      ...(!isPublicByPattern && userToken ? { user_token: userToken } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorText: string;
    try {
      errorText = await response.text();
    } catch {
      errorText = 'Unknown error';
    }
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const result = await response.json();

  const mensajesSesionInvalida = [
    "Invalid user",
    "Invalid User",
    "Usuario inválido",
    "Sesión inválida o expirada",
    "Debe ingresar para ver estos datos"
  ];

  const msg = String(result?.msg ?? "").toLowerCase();
  const err = String(result?.error ?? "").toLowerCase();

  const invalidByMessage =
  !isPublicByPattern &&
  (mensajesSesionInvalida.some(m => m.toLowerCase() === msg) ||
   mensajesSesionInvalida.some(m => m.toLowerCase() === err));

  if (invalidByMessage) {
    useAuthStore.getState().logout({ expired: true });
    return { sessionExpired: true } as any;
  }   

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return result as TResponse;
};