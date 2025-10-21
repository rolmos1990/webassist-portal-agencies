// src/i18n/i18nStorage.ts
export type LangStrings = Record<string, string>;

const NS = 'i18n';
const K = {
  lang: `${NS}:lang`,
  token: (lang: string) => `${NS}:token:${lang}`,
  strings: (lang: string) => `${NS}:strings:${lang}`,
} as const;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
function safeStringify<T>(v: T) {
  try { return JSON.stringify(v); } catch { return ''; }
}
function deepEqual(a: unknown, b: unknown) {
  try { return JSON.stringify(a) === JSON.stringify(b); } catch { return a === b; }
}

export const i18nStorage = {
  getLang(): string | null { return localStorage.getItem(K.lang); },
  setLang(lang: string) { localStorage.setItem(K.lang, lang); },

  getToken(lang: string): string | null { return localStorage.getItem(K.token(lang)); },
  setToken(lang: string, token: string) { localStorage.setItem(K.token(lang), token); },
  isTokenChanged(lang: string, next?: string | null) {
    return (i18nStorage.getToken(lang) ?? null) !== (next ?? null);
  },

  getStrings(lang: string): LangStrings { return safeParse(localStorage.getItem(K.strings(lang)), {}); },
  setStrings(lang: string, strings: LangStrings) {
    localStorage.setItem(K.strings(lang), safeStringify(strings));
  },
  areStringsDifferent(lang: string, incoming: LangStrings) {
    return !deepEqual(i18nStorage.getStrings(lang), incoming);
  },
};
