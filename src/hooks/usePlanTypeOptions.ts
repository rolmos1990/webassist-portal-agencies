import { useMemo } from "react";
import { getGetTasaComisionesQueryOptions, useGetTasaComisiones } from "../api/generated";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import type { SelectOption } from "../components/Forms/Inputs/InputSelect";

/** El servicio de tasa de comisiones sólo acepta es | en */
export const toPlanTypesLang = (lang: string): "es" | "en" => (lang === "en" ? "en" : "es");

/**
 * Opciones de GET /{idioma}/tasa-comisiones (catálogo de tipos de plan). Se cachea sin vencer
 * hasta el logout, que limpia el cache de React Query; useLogin la precarga al iniciar sesión.
 */
export const planTypesQueryOptions = (lang: string) =>
  getGetTasaComisionesQueryOptions(toPlanTypesLang(lang), { query: { staleTime: Infinity } });

/** Tipos de plan como opciones de <InputSelect>; el id llega como string y los filtros lo esperan numérico. */
export function usePlanTypeOptions(): SelectOption[] {
  const { lang } = useI18nCache();
  const { data } = useGetTasaComisiones(toPlanTypesLang(lang), { query: { staleTime: Infinity } });

  return useMemo(
    () =>
      (data?.data ?? [])
        .filter((p) => p.id != null && Number.isFinite(Number(p.id)))
        .map((p) => ({ value: Number(p.id), label: p.nombre ?? "" })),
    [data]
  );
}
