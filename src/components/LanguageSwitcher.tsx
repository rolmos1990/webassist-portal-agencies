import { useI18nCache } from '../i18n/i18nCacheProvider';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18nCache();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <select value={lang} onChange={onChange} className="form-select form-select-sm" style={{ width: 160 }}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
