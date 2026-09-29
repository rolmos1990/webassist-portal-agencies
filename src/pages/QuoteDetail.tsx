import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import TravelersList from '../components/TravelersList';
import { currency } from '../components/DataTable';
import type {
  GetCotizacionesAgenteAgencia200DataItemsItem,
  GetCotizacionesAgenteAgencia200DataItemsItemLineasItem,
} from '../api/schemas';
import { fromCotizacion } from '../adapters/voucherDetail';

// Sin equivalente en el servicio
const HARDCODED_COVERAGE = '__USD / EUR 35,000';
// Rangos de edad: el texto de cada rango es una traducción (quoteDetail.ageRanges.*)
const AGE_RANGES = [
  { min: 0, max: 65, label: 'quoteDetail.ageRanges.upTo65' },
  { min: 66, max: 74, label: 'quoteDetail.ageRanges.from66To74' },
  { min: 75, max: 85, label: 'quoteDetail.ageRanges.from75To85' },
  { min: 86, max: Infinity, label: 'quoteDetail.ageRanges.over85' },
];

const initials = (nombre?: string, apellido?: string) =>
  `${nombre?.trim()[0] ?? ''}${apellido?.trim()[0] ?? ''}`.toUpperCase() || '—';

/** Fechas del servicio en formato dd/mm/yyyy */
const parseDate = (value?: string | null) => {
  const [d, m, y] = (value ?? '').split('/').map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
};

/** Edad a la fecha de salida (o a hoy si la línea no la tiene) */
const ageAt = (birth: Date, ref: Date) => {
  const age = ref.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    ref.getMonth() < birth.getMonth() ||
    (ref.getMonth() === birth.getMonth() && ref.getDate() < birth.getDate());
  return beforeBirthday ? age - 1 : age;
};

/** Pasajeros de la línea agrupados por rango de edad: [{ label, count }] */
const ageGroupsOf = (linea?: GetCotizacionesAgenteAgencia200DataItemsItemLineasItem) => {
  const ref = parseDate(linea?.fecha_salida) ?? new Date();
  const counts = new Map<string, number>();
  (linea?.pasajeros ?? []).forEach((p) => {
    const birth = parseDate(p.fecha_nacimiento);
    const age = birth ? ageAt(birth, ref) : null;
    const range = age === null ? undefined : AGE_RANGES.find((r) => age >= r.min && age <= r.max);
    const label = range?.label ?? '—';
    counts.set(label, (counts.get(label) ?? 0) + 1);
  });
  // Mismo orden que los rangos; sin edad al final
  const order = [...AGE_RANGES.map((r) => r.label), '—'];
  return order.filter((label) => counts.has(label)).map((label) => ({ label, count: counts.get(label) ?? 0 }));
};

/** Upgrades de los pasajeros de la línea agrupados: "1 x Pet Assistance" */
const upgradesOf = (linea?: GetCotizacionesAgenteAgencia200DataItemsItemLineasItem) => {
  const counts = new Map<string, number>();
  (linea?.pasajeros ?? []).forEach((p) =>
    (p.upgrades ?? []).forEach((u) => {
      if (u.nombre) counts.set(u.nombre, (counts.get(u.nombre) ?? 0) + 1);
    })
  );
  return Array.from(counts, ([nombre, count]) => `${count} x ${nombre}`);
};

const withIcon = (icon: string, text: string) => (
  <span className="d-inline-flex align-items-center">
    <i className={`bi ${icon} me-2 text-success`} />
    {text}
  </span>
);

export default function QuoteDetail() {
  const { t } = useTranslation();
  const location = useLocation();

  // No hay endpoint de detalle: la cotización llega desde Standing Quotes del cliente
  const item = (location.state as { item?: GetCotizacionesAgenteAgencia200DataItemsItem } | null)?.item;
  const quote = fromCotizacion(item);
  const multipleBlocks = quote.blocks.length > 1;

  // Los datos de contacto se toman del primer pasajero de la cotización
  const titular = item?.lineas?.[0]?.pasajeros?.[0];
  const name = `${titular?.nombre ?? ''} ${titular?.apellido ?? ''}`.trim() || '—';

  return (
<div className="min-vh-100 bg-light">
  <div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('quoteDetail.back')} hasBack />
        <div className="card shadow">
            <div className="p-4">
            {!item ? (
              <div className="text-muted">{t('noData')}</div>
            ) : (
              <>
            <div className="row g-3 align-items-md-center border-bottom pb-3">
              <div className="col d-flex flex-column flex-md-row gap-3 align-items-center align-items-md-start">
                <div
                  className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center flex-shrink-0 fs-3"
                  style={{ width: '80px', height: '80px' }}
                >
                  {initials(titular?.nombre, titular?.apellido)}
                </div>
                <div className="text-center text-md-start">
                  <h4 className="mb-2">{name}</h4>
                  <p className="mb-1 text-gray small pb-1">
                    <i className="bi bi-envelope me-2 text-success"></i>
                    {titular?.email || '—'}
                  </p>
                  <p className="mb-0 text-gray small pb-1">
                    <i className="bi bi-telephone me-2 text-success"></i>
                    {titular?.telefono || '—'}
                  </p>
                </div>
              </div>
              {/* Derecha: total */}
              <div className="col-12 col-md-auto text-center text-md-start ms-md-auto">
                <p className="mb-1 text-black">{t('quoteDetail.totalQuote')}</p>
                <h4 className="mb-0 fw-semibold">{t('quoteDetail.currency')} {currency(quote.total ?? 0)}</h4>
              </div>
            </div>

            {quote.blocks.length === 0 && <div className="mt-4 text-muted small">{t('noData')}</div>}

            {quote.blocks.map((block, idx) => {
              const linea = item.lineas?.[idx];
              const ageGroups = ageGroupsOf(linea);
              const upgrades = upgradesOf(linea);
              const travelersCount = block.travelers.length;
              return (
                <div key={block.key} className={idx > 0 ? 'mt-4 pt-2' : undefined}>
                  {/* Cotización con varias líneas: cada línea con su plan, datos y pasajeros */}
                  {multipleBlocks && <h6 className="fw-semibold mt-3 mb-2">{block.planName}</h6>}
                  <div className="flex-grow-1 border-bottom pb-3">
                    <HorizontalCardList desktopCols={4}>
                      <HorizontalCardListItem
                        title=""
                        value={
                          <span className="d-flex flex-column gap-1">
                            <b>{block.planName}</b>
                            <span className="text-gray small fw-normal">
                              {HARDCODED_COVERAGE} – {travelersCount} {t('quoteDetail.travellerUnit')}
                            </span>
                          </span>
                        }
                      />
                      <HorizontalCardListItem
                        title=""
                        value={
                          <span className="d-flex flex-column gap-2">
                            {withIcon('bi-calendar3', `${block.exit} - ${block.return}`)}
                            {withIcon('bi-geo-alt', block.destination)}
                          </span>
                        }
                      />
                      <HorizontalCardListItem
                        title={`${travelersCount} ${t('quoteDetail.travellers')}`}
                        icon={<i className="bi bi-person text-success" />}
                        value={
                          <span className="d-flex flex-column text-gray small fw-normal">
                            {ageGroups.length === 0 ? '—' : ageGroups.map((g) => (
                              <span key={g.label}>
                                {g.count} {t('quoteDetail.travellerUnit')} {g.label === '—' ? '—' : t(g.label)} {t('quoteDetail.yearsOld')}
                              </span>
                            ))}
                          </span>
                        }
                      />
                      <HorizontalCardListItem
                        title={t('quoteDetail.upgrades')}
                        icon={<i className="bi bi-arrow-bar-up text-success" />}
                        value={
                          <span className="d-flex flex-column text-gray small fw-normal">
                            {upgrades.length === 0 ? '—' : upgrades.map((u) => <span key={u}>{u}</span>)}
                          </span>
                        }
                      />
                    </HorizontalCardList>
                  </div>
                  <TravelersList travelers={block.travelers} hideDocuments />
                </div>
              );
            })}
              </>
            )}
            </div>
        </div>
  </div>
</div>
  );
}
