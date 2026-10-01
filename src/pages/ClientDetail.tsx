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
import type { GetClientes200DataItemsItem } from '../api/schemas';

export default function ClientDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    // No hay endpoint de detalle de cliente: el item llega desde la lista de clientes
    const item = (location.state as { item?: GetClientes200DataItemsItem } | null)?.item;

    // Ventas vigentes y no canceladas: llegan con el cliente desde /clientes
    const planes = item?.planes_activos ?? [];

    const noContent = <div className="border rounded-4 p-4 text-muted">
                        {t('noData')}
                      </div>;

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
                  status="Active"
                  email={item?.email || '—'}
                  phone={item?.telefono || '—'}
                  location={item?.pais_id?.nombre || '—'}
                />
                <div className="">
                    <HorizontalCardList desktopCols={3}>
                      <HorizontalCardListItem
                        title="Total Amount"
                        value={currency(Number(item?.ventas?.precio ?? 0))}
                        icon={""}
                      />
                      <HorizontalCardListItem
                        title="Number of Purchases"
                        value={String(item?.ventas?.cantidad ?? 0)}
                        icon={""}
                      />
                      <HorizontalCardListItem
                        title="Active Plans"
                        value={String(planes.length)}
                        icon={""}
                      />
                    </HorizontalCardList>
                </div>

                <div className="mt-4">
                    <TabPanel
                      tabs={[
                        {
                          id: 'active-plans',
                          title: 'Active Plans',
                          content: planes.length === 0 ? noContent : (
                            <ListGroup>
                              {planes.map((plan, index) => (
                                <ListItem
                                  key={plan.voucher ?? index}
                                  // planes_activos no trae la asistencia completa: el detalle la busca por voucher
                                  onClick={plan.voucher ? () => navigate(
                                    item?.id ? PATHS.clients.assistance(item.id, plan.voucher as string) : PATHS.assistances.detail(plan.voucher as string)
                                  ) : undefined}
                                >
                                  <ListContent title="Plan Number" colSize={6}>{plan.voucher ?? '—'}</ListContent>
                                  <ListContent title="Plan Name" colSize={6}>{plan.plan?.nombre ?? '—'}</ListContent>
                                  <ListContent title="Status" colSize={6}>
                                    <StatusBadge
                                      status="Active"
                                      label="Active"
                                      theme={defaultStatusTheme}
                                    />
                                  </ListContent>
                                  <ListContent title="Start Date" colSize={6}>{plan.fecha_inicio ?? '—'}</ListContent>
                                  <ListContent title="End Date" colSize={6} isLast>{plan.fecha_fin ?? '—'}</ListContent>
                                </ListItem>
                              ))}
                            </ListGroup>
                          )
                        },
                      ]}
                      defaultActiveTab="active-plans"
                    />
                </div>
            </div>
        </div>
  </div>
</div>

    );
}
