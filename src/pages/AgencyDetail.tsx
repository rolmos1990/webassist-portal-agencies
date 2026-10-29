import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Breadcrumb from '../components/Breadcrumb';
import { CardAvatar } from '../components/CardAvatar';
import { agencyStatusTheme } from '../components/StatusBadge/StatusBadgeThemes';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { AgencyTable } from '../components/Tables/AgencyTable';
import { currency } from '../components/DataTable';
import { useGetAgenciasAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import { PATHS } from '../routes/Routes';

const PAGE_SIZE = 20;

export default function AgencyDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const { lang } = useI18nCache();
    const [currentPage, setCurrentPage] = useState(1);

    // No hay endpoint de detalle de agencia: se toma del listado de agencias
    const { data, isLoading, error } = useGetAgenciasAgencia(lang);

    useEffect(() => {
        if (error) {
            toast.error("Error", getApiErrorMessage(error, t('error_generico')));
        }
    }, [error, t]);

    const agencies = data?.data ?? [];
    const agency = agencies.find((a) => String(a.id) === id);

    const renderBody = () => {
        if (isLoading) {
            return (
                <div className="d-flex justify-content-center p-5">
                    <div className="spinner-border" role="status" />
                </div>
            );
        }

        if (!agency) {
            return (
                <div className="p-4">
                    <div className="border rounded-4 p-4 text-muted">{t('agency.detail.notFound')}</div>
                </div>
            );
        }

        return (
            <div className="p-4">
                <CardAvatar
                    avatarUrl={agency.logo || undefined}
                    name={agency.nombre || '—'}
                    status={String(agency.status?.id ?? '')}
                    statusLabel={agency.status?.nombre || '—'}
                    statusTheme={agencyStatusTheme}
                    email={agency.email || '—'}
                    phone={agency.telefono || '—'}
                    location={[agency.direccion, agency.ciudad, agency.pais?.nombre].filter(Boolean).join(', ') || '—'}
                    extraInfo={
                        <>
                            <i className="bi bi-wallet2 me-2 text-success"></i>
                            {t('agency.paymentType')}:{' '}
                            <span>
                                {(typeof agency.tipo_pago?.nombre === 'string' && agency.tipo_pago.nombre) || ''}
                            </span>
                        </>
                    }
                />
                <div className="">
                    <HorizontalCardList desktopCols={5}>
                        <HorizontalCardListItem
                            title={t('agency.detail.totalSales')}
                            value={currency(Number(agency.total_ventas_monto ?? 0))}
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agency.detail.standingQuoteValue')}
                            value={currency(Number(agency.cotizaciones_vigentes_monto ?? 0))}
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agency.detail.totalCommissionEarned')}
                            value={currency(Number(agency.total_comisiones ?? 0))}
                            icon={""}
                        />
                        {/* El servicio aún no envía la cantidad de agentes de la agencia */}
                        <HorizontalCardListItem
                            title={t('agency.detail.numberOfAgents')}
                            value="0"
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agency.detail.commissionPercentage')}
                            value={`${agency.comision ?? 0}%`}
                            icon={""}
                        />
                    </HorizontalCardList>
                </div>
                <div className="mt-4">
                    <h5 className="mb-4">{t('agency.detail.subAgencies')}</h5>
                    {/* Por ahora muestra todas las agencias del listado */}
                    <AgencyTable
                        data={agencies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
                        onEdit={(row) => navigate(PATHS.agencies.detail(row.id))}
                        onToggle={(row) => navigate(PATHS.agencies.detail(row.id))}
                        onDelete={(row) => navigate(PATHS.agencies.detail(row.id))}
                        pagination={{
                            totalPages: Math.max(1, Math.ceil(agencies.length / PAGE_SIZE)),
                            currentPage,
                            align: "center",
                            wrap: "none",
                            onChange: setCurrentPage,
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
    <div className="min-vh-100 bg-light">
    <div className="container-fluid py-3 px-4">
            <Breadcrumb title={t('agency.detail.back')} hasBack />
            <div className="card shadow">
                {renderBody()}
            </div>
        </div>
    </div>
    );
}
