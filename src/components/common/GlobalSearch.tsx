import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Search from './Search';
import { useGetBusqueda } from '../../api/generated';
import { BusquedaItemTipo, type BusquedaItem } from '../../api/schemas';
import { useI18nCache } from '../../i18n/i18nCacheProvider';
import { PATHS } from '../../routes/Routes';

const MIN_CHARS = 2; // el servicio exige al menos 2 caracteres
const DEBOUNCE_MS = 300;

// Tipos de resultado que el buscador sabe abrir (enum generado del contrato), en el orden en que se agrupan
const TYPE_ORDER: BusquedaItemTipo[] = [
  BusquedaItemTipo.agente,
  BusquedaItemTipo.agencia,
  BusquedaItemTipo.asistencia,
];

/**
 * Ruta del detalle de cada resultado: asistencia por `referencia` (voucher); agente y agencia por
 * `id`. null = no se puede abrir (tipo desconocido, excluido o sin clave), y el resultado se omite
 * de la lista.
 */
function detailPath(item: BusquedaItem): string | null {
  switch (item.tipo) {
    case BusquedaItemTipo.asistencia:
      return item.referencia ? PATHS.assistances.detail(item.referencia) : null;
    // Cotizaciones excluidas por ahora: no hay servicio para cargar una cotización por su token
    case BusquedaItemTipo.cotizacion:
      return null;
    case BusquedaItemTipo.agente:
      return item.id != null ? PATHS.agents.detail(item.id) : null;
    case BusquedaItemTipo.agencia:
      return item.id != null ? PATHS.agencies.detail(item.id) : null;
    // Clientes excluidos por ahora: no hay servicio para cargar un cliente por su id
    case BusquedaItemTipo.cliente:
      return null;
    default:
      return null;
  }
}

/** Buscador del header: busca en agentes, agencias, asistencias, cotizaciones y clientes. */
export default function GlobalSearch() {
  const { t } = useTranslation();
  const { lang } = useI18nCache();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState('');
  const [debounced, setDebounced] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(text.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [text]);

  const enabled = debounced.length >= MIN_CHARS;
  const { data, isFetching, isError } = useGetBusqueda(
    lang,
    { texto: debounced },
    { query: { enabled, staleTime: 30_000 } }
  );

  // Cerrar al hacer click fuera o con Escape
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const goTo = (path: string) => {
    navigate(path);
    setOpen(false);
    setText('');
  };

  // Sólo resultados que se pueden abrir; cualquier otro tipo se omite
  const items = (enabled ? data?.items ?? [] : []).filter((i) => detailPath(i) !== null);
  const groups = TYPE_ORDER.map((tipo) => ({ tipo, items: items.filter((i) => i.tipo === tipo) })).filter(
    (g) => g.items.length > 0
  );
  const showMenu = open && enabled;

  return (
    <div ref={rootRef} className="position-relative">
      <Search
        value={text}
        onChange={(v) => {
          setText(v);
          setOpen(true);
        }}
      />

      {showMenu && (
        <div
          className="dropdown-menu show shadow-sm p-0"
          role="listbox"
          style={{ width: 320, maxHeight: 420, overflowY: 'auto', top: '100%', left: 0, marginTop: 4 }}
        >
          {isFetching && groups.length === 0 && (
            <div className="text-center text-muted small py-3">{t('search.searching')}</div>
          )}

          {!isFetching && isError && (
            <div className="text-center text-muted small py-3">{t('error_generico')}</div>
          )}

          {!isFetching && !isError && groups.length === 0 && (
            <div className="text-center text-muted small py-3">{t('search.noResults')}</div>
          )}

          {groups.map((g) => (
            <div key={g.tipo}>
              <h6 className="dropdown-header text-uppercase small">{t(`search.types.${g.tipo}`)}</h6>
              {g.items.map((item, idx) => (
                <button
                  key={`${g.tipo}-${item.id ?? item.referencia ?? idx}`}
                  type="button"
                  role="option"
                  className="dropdown-item text-wrap py-2"
                  onClick={() => {
                    const path = detailPath(item);
                    if (path) goTo(path);
                  }}
                >
                  <div className="fw-semibold small">{item.nombre || item.referencia || '—'}</div>
                  {(item.referencia || item.detalle) && (
                    <div className="text-muted small">
                      {[item.referencia, item.detalle].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
