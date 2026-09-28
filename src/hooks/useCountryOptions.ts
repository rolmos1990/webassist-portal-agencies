import { useMemo } from "react";
import { useGetPaises } from "../api/generated";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import type { SelectOption } from "../components/Forms/Inputs/InputSelect";

/** Catálogo de países (GET /{idioma}/paises) como opciones de <InputSelect>. Se cachea por idioma. */
export function useCountryOptions(): SelectOption[] {
  const { lang } = useI18nCache();
  const { data } = useGetPaises(lang, { query: { staleTime: Infinity } });

  return useMemo(
    () =>
      (data?.data ?? [])
        .filter((p) => p.id != null)
        .map((p) => ({ value: p.id as number, label: p.nombre ?? "" })),
    [data]
  );
}
