import esKeys from './locales/es/keys.json';
import enKeys from './locales/en/keys.json';
import type { LangStrings } from '../stores/translateStore';

type KeysTree = { [key: string]: string | KeysTree };
type Bundle = { [key: string]: string | Bundle };

const KEYS_BY_LANG: Record<string, KeysTree> = {
  es: esKeys,
  en: enKeys,
};

function resolveBundle(keysTree: KeysTree, translates: LangStrings): Bundle {
  const bundle: Bundle = {};

  for (const [key, value] of Object.entries(keysTree)) {
    if (typeof value === 'string') {
      const translated = translates[value];
      if (translated !== undefined) bundle[key] = translated;
    } else {
      const nested = resolveBundle(value, translates);
      if (Object.keys(nested).length > 0) bundle[key] = nested;
    }
  }

  return bundle;
}

export function buildTranslationBundle(lang: string, translates: LangStrings): Bundle {
  const keysTree = KEYS_BY_LANG[lang];
  if (!keysTree) return {};
  return resolveBundle(keysTree, translates);
}
