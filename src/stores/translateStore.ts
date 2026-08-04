import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type LangStrings = Record<string, string>;

type TranslateState = {
  lang: string;
  version: string | null;
  translates: LangStrings;
  createdAt: string | null;

  setLang: (lang: string) => void;
  setTranslations: (payload: { lang: string; version: string; translates: LangStrings }) => void;
};

export const useTranslateStore = create<TranslateState>()(
  persist(
    (set) => ({
      lang: "es",
      version: null,
      translates: {},
      createdAt: null,

      setLang: (lang) =>
        set((state) =>
          state.lang === lang ? state : { lang, version: null, translates: {}, createdAt: null }
        ),

      setTranslations: ({ lang, version, translates }) =>
        set({ lang, version, translates, createdAt: new Date().toISOString() }),
    }),
    {
      name: "translate-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
