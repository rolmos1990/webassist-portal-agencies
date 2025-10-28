// src/components/LanguageSwitcher.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import { useI18nCache } from '../i18n/i18nCacheProvider';

type Lang = 'es' | 'en'; // agrega 'fr' si lo necesitas

function switchLangInPath(pathname: string, next: Lang) {
  const parts = pathname.split('/'); // ['', 'es', 'agencies', ...]
  if (parts[1] === 'es' || parts[1] === 'en') {
    parts[1] = next;
  } else {
    parts.splice(1, 0, next);
  }
  return parts.join('/') || `/${next}`;
}

export function LanguageSwitcher() {
  const { lang, setLang } = useI18nCache();
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLang = e.target.value as Lang;

    // 1) Actualiza cache/store
    setLang(nextLang);

    // 2) Cambia solo el segmento /:lang en la URL manteniendo la ruta actual
    const newPath = switchLangInPath(location.pathname, nextLang);

    // 3) Redirige sin recargar
    navigate(newPath, { replace: true });
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <select
        value={lang}
        onChange={onChange}
        className="form-select form-select-sm"
        style={{ width: 160 }}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
