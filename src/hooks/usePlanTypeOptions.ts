import { useMemo } from "react";
import { getGetV2TiposPlanesQueryOptions, useGetV2TiposPlanes } from "../api/generated";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import type { SelectOption } from "../components/Forms/Inputs/InputSelect";

/** El servicio de tipos de plan sólo acepta es | en */
export const toPlanTypesLang = (lang: string): "es" | "en" => (lang === "en" ? "en" : "es");

/**
 * Opciones de GET /{idioma}/v2/tipos-planes (catálogo de tipos de plan). Se cachea sin vencer
 * hasta el logout, que limpia el cache de React Query; useLogin la precarga al iniciar sesión.
 */
export const planTypesQueryOptions = (lang: string) =>
  getGetV2TiposPlanesQueryOptions(toPlanTypesLang(lang), { query: { staleTime: Infinity } });

/** Categorías de tipos de plan (data.tipos) como opciones de <InputSelect>. */
export function usePlanTypeOptions(): SelectOption[] {
  const { lang } = useI18nCache();
  const { data } = useGetV2TiposPlanes(toPlanTypesLang(lang), { query: { staleTime: Infinity } });

  return useMemo(
    () =>
      (data?.data?.tipos ?? [])
        .filter((p) => p.id != null)
        .map((p) => ({ value: Number(p.id), label: p.nombre ?? "" })),
    [data]
  );
}
