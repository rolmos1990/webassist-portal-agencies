import keys from './locales/keys.json';
import type { LangStrings } from '../stores/translateStore';

type KeysTree = { [key: string]: string | KeysTree };
type Bundle = { [key: string]: string | Bundle };

// El mapeo dot-path -> key de servicio es el mismo sin importar el idioma;
// lo único que cambia por idioma es `translates` (el texto que trae el backend)
// y default.json (el fallback visual mientras no haya traducción del backend).
const KEYS_TREE: KeysTree = keys;

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

export function buildTranslationBundle(translates: LangStrings): Bundle {
  return resolveBundle(KEYS_TREE, translates);
}
