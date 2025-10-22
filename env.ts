export function readEnv(key: string, fallback = ''): string {
  // Browser (Vite)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env?.[key] != null) {
      // @ts-ignore
      return String(import.meta.env[key]);
    }
  } catch {}

  // Node (Orval / Vitest / SSR)
  if (typeof process !== 'undefined' && process?.env?.[key] != null) {
    return String(process.env[key]);
  }

  return fallback;
}