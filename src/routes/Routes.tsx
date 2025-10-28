// src/routes.ts
export type Lang = 'es' | 'en'; // agrega 'fr' si la necesitas
export type Id = string | number;

const SUPPORTED: Lang[] = ['es', 'en'];
const DEFAULT_LANG: Lang = 'es';

// Detecta el lang real desde la URL (ej: /es/agencies)
export function getLangFromPath(pathname = window.location.pathname): Lang {
  const seg = pathname.split('/')[1];
  return SUPPORTED.includes(seg as Lang) ? (seg as Lang) : DEFAULT_LANG;
}

// Inserta /:lang si no está en el path
function ensureLang(path: string, lang = getLangFromPath()): string {
  if (!path.startsWith('/')) path = `/${path}`;
  const parts = path.split('/');
  if (SUPPORTED.includes(parts[1] as Lang)) return path;
  parts.splice(1, 0, lang);
  return parts.join('/');
}

// Templates de rutas (main source of truth)
const T = {
  // Auth
  login: '/:lang/login',
  forgotPassword: '/:lang/forgot-password',
  createNewPassword: '/:lang/create-new-password',

  // Dashboard
  dashboardHome: '/:lang',

  // Agencies / Agency
  agencies: '/:lang/agencies',
  agencyDetail: '/:lang/agency/:id',

  // Agents / Agent
  agents: '/:lang/agents',
  agentDetail: '/:lang/agent/:id',

  // Assistances
  myAssistances: '/:lang/my-assistances',
  agencyAssistances: '/:lang/agency-assistances',
  assistanceDetail: '/:lang/assistance/:id',

  // Renewals
  renewals: '/:lang/renewals',

  // Quotes
  quotesAgency: '/:lang/quotesAgencies',
  myQuotes: '/:lang/my-quotes',

  // Reports & Settings
  reports: '/:lang/reports',
  settings: '/:lang/settings',

  // Not Found
  notFound: '/:lang/404',
} as const;

// Reemplaza :params
function build(tpl: string, params: Record<string, string | number>) {
  return tpl.replace(/:([A-Za-z0-9_]+)/g, (_, key) => encodeURIComponent(String(params[key])));
}

// Builder final
function withLang(tpl: string, params: Record<string, string | number> = {}, lang?: Lang) {
  return ensureLang(build(tpl, { lang: lang ?? getLangFromPath(), ...params }));
}

// ✅ ÚNICO objeto público
export const PATHS = {
  auth: {
    login: (lang?: Lang) => withLang(T.login, {}, lang),
    forgotPassword: (lang?: Lang) => withLang(T.forgotPassword, {}, lang),
    createNewPassword: (lang?: Lang) => withLang(T.createNewPassword, {}, lang),
  },
  dashboard: {
    home: (lang?: Lang) => withLang(T.dashboardHome, {}, lang),
  },
  agencies: {
    list: (lang?: Lang) => withLang(T.agencies, {}, lang),
    detail: (id: any, lang?: Lang) => withLang(T.agencyDetail, { id }, lang),
  },
  agents: {
    list: (lang?: Lang) => withLang(T.agents, {}, lang),
    detail: (id: any, lang?: Lang) => withLang(T.agentDetail, { id }, lang),
  },
  assistances: {
    mine: (lang?: Lang) => withLang(T.myAssistances, {}, lang),
    agency: (lang?: Lang) => withLang(T.agencyAssistances, {}, lang),
    detail: (id: any, lang?: Lang) => withLang(T.assistanceDetail, { id }, lang),
  },
  renewals: {
    list: (lang?: Lang) => withLang(T.renewals, {}, lang),
  },
  quotes: {
    agency: (lang?: Lang) => withLang(T.quotesAgency, {}, lang),
    mine: (lang?: Lang) => withLang(T.myQuotes, {}, lang),
  },
  reports: (lang?: Lang) => withLang(T.reports, {}, lang),
  settings: (lang?: Lang) => withLang(T.settings, {}, lang),
  notFound: (lang?: Lang) => withLang(T.notFound, {}, lang),
} as const;
