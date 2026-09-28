import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardAvatar } from '../components/CardAvatar';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { TabPanel } from '../components/TabPanel';
import ListGroup from '../components/ListGroup/ListGroup';
import ListItem from '../components/ListGroup/ListItem';
import ListContent from '../components/ListGroup/ListContent';
import { StatusBadge } from '../components/StatusBadge';
import Breadcrumb from '../components/Breadcrumb';
import { defaultStatusTheme } from '../components/StatusBadge/StatusBadgeThemes';
import { PATHS } from '../routes/Routes';
import { currency } from '../components/DataTable';
import { planNames } from '../components/Tables/AgencyQuotesDataTableConfig';
import { useGetAsistenciasAgenteAgencia, useGetCotizacionesAgenteAgencia } from '../api/generated';
import type { GetClientes200DataItemsItem } from '../api/schemas';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';

export default function ClientDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { lang } = useI18nCache();

    // No hay endpoint de detalle de cliente: el item llega desde la lista de clientes
    const item = (location.state as { item?: GetClientes200DataItemsItem } | null)?.item;

    // /asistencias y /cotizaciones no filtran por id de cliente: se filtra por su pasaporte
    const pasaporte = item?.pasaporte?.trim() || undefined;

    const asistencias = useGetAsistenciasAgenteAgencia(
      lang,
      { pasaporte },
      { query: { enabled: !!pasaporte } }
    );
    const cotizaciones = useGetCotizacionesAgenteAgencia(
      lang,
      { pasaporte },
      { query: { enabled: !!pasaporte } }
    );

    useEffect(() => {
      const error = asistencias.error ?? cotizaciones.error;
      if (error) {
        toast.error("Error", getApiErrorMessage(error, t('error_generico')));
      }
    }, [asistencias.error, cotizaciones.error, t]);

    const planes = asistencias.data?.data?.items ?? [];
    const quotes = cotizaciones.data?.data?.items ?? [];

    const noContent = <div className="border rounded-4 p-4 text-muted">
                        {t('noData')}
                      </div>;

    const loadingContent = <div className="my-4"><div className="spinner-border" role="status" /></div>;

    return (
<div className="min-vh-100 bg-light">
  <div className="container-fluid py-3 px-4">
        <Breadcrumb title="Back" hasBack rightContent={
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-primary rounded-pill bg-white">
              <i className="bi bi-envelope me-1"></i>Resend the Voucher
            </button>
            <button type="button" className="btn btn-outline-primary rounded-pill bg-white">
              <i className="bi bi-pencil me-1"></i>Modify Voucher Data
            </button>
          </div>
        } />
        <div className="card shadow">
            <div className="p-4">
                <CardAvatar
                  avatarUrl="https://placehold.co/80x80"
                  name={`${item?.nombre ?? ''} ${item?.apellido ?? ''}`.trim() || '—'}
                  status="__Active"
                  email={item?.email || '—'}
                  phone={item?.telefono || '—'}
                  location={item?.pais_nombre || '—'}
                />
                <div className="">
                    <HorizontalCardList desktopCols={5}>
                      <HorizontalCardListItem
                        title="Total Premiums Paid"
                        value={currency(Number(item?.ventas?.precio ?? 0))}
                        icon={""}
                      />
                      <HorizontalCardListItem
                        title="Standing Quote Value"
                        value="__$344.25"
                        icon={""}
                      />
                      <HorizontalCardListItem
                        title="Total Commission Earned"
                        value="__$344.25"
                        icon={""}
                        tooltip="Total commission earned from all policies"
                      />
                      <HorizontalCardListItem
                        title="Number of Purchases"
                        value={String(item?.ventas?.cantidad ?? 0)}
                        icon={""}
                      />
                      <HorizontalCardListItem
                        title="Active Plans"
                        value="__2"
                        icon={""}
                      />
                    </HorizontalCardList>
                </div>

                <div className="mt-4">
                    <TabPanel
                      tabs={[
                        {
                          id: 'plan-list',
                          title: 'Plan List',
                          content: asistencias.isLoading ? loadingContent : planes.length === 0 ? noContent : (
                            <ListGroup>
                              {planes.map((plan, index) => (
                                <ListItem
                                  key={plan.token ?? index}
                                  onClick={() => navigate(PATHS.assistances.detail(plan.token), { state: { item: plan } })}
                                >
                                  <ListContent title="Plan Number" colSize={6}>{plan.voucher?.codigo ?? plan.token}</ListContent>
                                  <ListContent title="Plan Name" colSize={6}>{plan.plan?.nombre}</ListContent>
                                  <ListContent title="Status" colSize={6}>
                                    <StatusBadge
                                      status={plan.cancelada ? 'Inactive' : 'Active'}
                                      label={plan.cancelada ? 'Cancelled' : 'Active'}
                                      theme={defaultStatusTheme}
                                    />
                                  </ListContent>
                                  <ListContent title="Start Date" colSize={6}>{plan.fecha_inicio}</ListContent>
                                  <ListContent title="End Date" colSize={6}>{plan.fecha_fin}</ListContent>
                                  <ListContent title="Amount Paid" colSize={6} isLast>{currency(Number(plan.total ?? 0))}</ListContent>
                                </ListItem>
                              ))}
                            </ListGroup>
                          )
                        },
                        {
                          id: 'standing-quotes',
                          title: 'Standing Quotes',
                          content: cotizaciones.isLoading ? loadingContent : quotes.length === 0 ? noContent : (
                            <ListGroup>
                          {quotes.map((quote, index) => {
                            const primeraLinea = quote.lineas?.[0];
                            const travelers = (quote.lineas ?? []).reduce((acc, l) => acc + (l.pasajeros?.length ?? 0), 0);
                            return (
                            <ListItem
                              key={quote.token ?? index}
                              onClick={quote.token ? () => navigate(PATHS.quotes.detail(quote.token as string), { state: { item: quote } }) : undefined}
                            >
                              <ListContent title="Plan Name" colSize={6}>{planNames(quote)}</ListContent>
                              <ListContent title="Travelers Number" colSize={6}>{travelers}</ListContent>
                              <ListContent title="Quote Amount" colSize={6}>{currency(Number(quote.total ?? 0))}</ListContent>
                              <ListContent title="Start Date" colSize={6}>{primeraLinea?.fecha_salida ?? '—'}</ListContent>
                              <ListContent title="End Date" colSize={6}>{primeraLinea?.fecha_regreso ?? '—'}</ListContent>
                              <ListContent title="Quote Amount" colSize={6} isLast>{currency(Number(quote.total ?? 0))}</ListContent>
                            </ListItem>
                            );
                          })}
                        </ListGroup>
                        )}
                      ]}
                      defaultActiveTab="plan-list"
                    />
                </div>
            </div>
        </div>
  </div>
</div>

    );
}
