import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { keepPreviousData } from "@tanstack/react-query";
import Breadcrumb from '../components/Breadcrumb';
import { CardAvatar } from '../components/CardAvatar';
import ContactCard from "../components/ContactCard";
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { AgencyQuotesTable } from "../components/Tables/AgencyQuotesTable";
import { AgencyAssistanceTable } from "../components/Tables/AgencyAssistanceTable";
import TabPanel from '../components/TabPanel';
import { StatusBadge } from "../components/StatusBadge";
import { agentStatusTheme } from "../components/StatusBadge/StatusBadgeThemes";
import { currency } from "../components/DataTable";
import { PATHS } from "../routes/Routes";
import {
    useGetAgentesAgencia,
    useGetAsistenciasAgenteAgencia,
    useGetCotizacionesAgenteAgencia,
} from "../api/generated";
import type { GetAgentesAgencia200DataItem } from "../api/schemas";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import { useAuthStore } from "../stores/useAuthStore";
import { parseSecurityRole, SecurityRole } from "../stores/SecurityRole";
import { toast } from "../services/toast";
import { getApiErrorMessage } from "../api/errors/ApiError";

type TabId = 'reporting-agents' | 'quotes' | 'sales';

const AGENT_SEARCH_DELAY_MS = 250;

// Minúsculas y sin acentos para que "castanon" encuentre "Castañon"
const normalize = (value: string) =>
    value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const fullName = (agent: GetAgentesAgencia200DataItem) =>
    agent.nombre_completo || `${agent.nombre ?? ''} ${agent.apellido ?? ''}`.trim() || '—';

// pais.nombre llega en false cuando el agente no tiene país asignado
const countryName = (agent: GetAgentesAgencia200DataItem) =>
    typeof agent.pais?.nombre === 'string' && agent.pais.nombre ? agent.pais.nombre : '';

// fecha_creacion llega ya formateada desde el servicio (dd/mm/yyyy, timestamp o ISO): se muestra como "15 mar 2022"
const formatJoinDate = (value: string | undefined, lang: string) => {
    if (!value) return '—';
    const dmy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    const date = dmy
        ? new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]))
        : /^\d+$/.test(value) ? new Date(Number(value) * 1000) : new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date
        .toLocaleDateString(lang === 'es' ? 'es' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        .replace(/\./g, '');
};


const NoContent = () => {
    const { t } = useTranslation();
    return <div className="border rounded-4 p-4 text-muted">{t('noData')}</div>;
};

// Cotizaciones creadas por el agente (id_agente)
function AgentQuotesTab({ agentId }: { agentId: number }) {
    const { t } = useTranslation();
    const { lang } = useI18nCache();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useGetCotizacionesAgenteAgencia(
        lang,
        { pagina: currentPage, id_agente: agentId },
        { query: { placeholderData: keepPreviousData } }
    );

    useEffect(() => {
        if (error) {
            toast.error("Error", getApiErrorMessage(error, t('error_generico')));
        }
    }, [error, t]);

    return (
        <AgencyQuotesTable
            data={data?.data?.items ?? []}
            loading={isLoading}
            onShow={(row) => { if (row.token) navigate(PATHS.quotes.detail(row.token), { state: { item: row } }); }}
            pagination={{
                totalPages: data?.data?.paginacion?.cantidad_paginas ?? 1,
                currentPage,
                align: "center",
                wrap: "none",
                onChange: setCurrentPage,
            }}
        />
    );
}

// Ventas = asistencias vendidas por el agente (id_agente)
function AgentSalesTab({ agentId }: { agentId: number }) {
    const { t } = useTranslation();
    const { lang } = useI18nCache();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useGetAsistenciasAgenteAgencia(
        lang,
        { pagina: currentPage, id_agente: agentId },
        { query: { placeholderData: keepPreviousData } }
    );

    useEffect(() => {
        if (error) {
            toast.error("Error", getApiErrorMessage(error, t('error_generico')));
        }
    }, [error, t]);

    return (
        <AgencyAssistanceTable
            data={data?.data?.items ?? []}
            loading={isLoading}
            onShow={(row) => navigate(PATHS.assistances.detail(row.token), { state: { item: row } })}
            pagination={{
                totalPages: data?.data?.paginacion?.cantidad_paginas ?? 1,
                currentPage,
                align: "center",
                wrap: "none",
                onChange: setCurrentPage,
            }}
        />
    );
}

export default function AgentDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const { lang } = useI18nCache();
    // Pestañas ya abiertas: Quotes y Sales sólo consultan la API la primera vez que se abren
    const [visitedTabs, setVisitedTabs] = useState<Set<string>>(() => new Set(['reporting-agents']));

    // No hay endpoint de detalle de agente: se toma del listado de agentes (misma query que la página de Agentes)
    const agenciaId = useAuthStore((s) => s.user?.agencia?.id);
    const { data, isLoading, error } = useGetAgentesAgencia(
        lang,
        { agencia: Number(agenciaId) },
        { query: { enabled: agenciaId != null } }
    );

    useEffect(() => {
        if (error) {
            toast.error("Error", getApiErrorMessage(error, t('error_generico')));
        }
    }, [error, t]);

    const agents = data?.data ?? [];
    const agent = agents.find((a) => String(a.id) === id);
    const reportingAgents = agents.filter((a) => String(a.id) !== id);

    // Búsqueda local de agentes de la agencia (nombre, correo o teléfono), con 250 ms de espera
    const [agentSearch, setAgentSearch] = useState('');
    const [agentQuery, setAgentQuery] = useState('');
    useEffect(() => {
        const timer = window.setTimeout(() => setAgentQuery(normalize(agentSearch)), AGENT_SEARCH_DELAY_MS);
        return () => window.clearTimeout(timer);
    }, [agentSearch]);

    const visibleAgents = agentQuery
        ? reportingAgents.filter((a) =>
            [fullName(a), a.email, a.telefono].some((v) => normalize(v ?? '').includes(agentQuery)))
        : reportingAgents;

    const handleTabChange = (tabId: string) =>
        setVisitedTabs((prev) => (prev.has(tabId) ? prev : new Set(prev).add(tabId)));
    const isVisited = (tabId: TabId) => visitedTabs.has(tabId);

    const role = agent ? parseSecurityRole(agent.roles) : null;
    const roleLabel = role === SecurityRole.AGENT_ADMIN
        ? t('agents.roleAgentAdmin')
        : role === SecurityRole.AGENT ? t('agents.roleAgent') : '—';

    const renderBody = () => {
        if (isLoading) {
            return (
                <div className="d-flex justify-content-center p-5">
                    <div className="spinner-border" role="status" />
                </div>
            );
        }

        if (!agent) {
            return (
                <div className="p-4">
                    <div className="border rounded-4 p-4 text-muted">{t('agents.detail.notFound')}</div>
                </div>
            );
        }

        return (
            <div className="p-4">
                <CardAvatar
                    avatarUrl={agent.imagen || undefined}
                    name={fullName(agent)}
                    status={String(agent.status?.id ?? '')}
                    statusLabel={agent.status?.nombre || '—'}
                    statusTheme={agentStatusTheme}
                    email={agent.email || ''}
                    phone={agent.telefono || ''}
                    location={countryName(agent)}
                    rightContent={
                        <>
                            <div className="small text-black">{t('agents.detail.associatedAgency')}</div>
                            <div className="fs-5 fw-bold text-black">{agent.agencia?.nombre || '—'}</div>
                        </>
                    }
                />
                <div className="">
                    <HorizontalCardList desktopCols={6}>
                        <HorizontalCardListItem
                            title={t('agents.detail.totalSales')}
                            value={currency(Number(agent.total_ventas_monto ?? 0))}
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agents.detail.standingQuoteValue')}
                            value={currency(Number(agent.cotizaciones_vigentes_monto ?? 0))}
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agents.detail.totalCommissionEarned')}
                            value={currency(Number(agent.total_comisiones ?? 0))}
                            icon={""}
                            tooltip={t('agents.detail.totalCommissionHint')}
                        />
                        <HorizontalCardListItem
                            title={t('agents.detail.role')}
                            value={roleLabel}
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agents.detail.reportingAgents')}
                            value={String(reportingAgents.length)}
                            icon={""}
                        />
                        <HorizontalCardListItem
                            title={t('agents.detail.dateJoined')}
                            value={formatJoinDate(agent.fecha_creacion, lang)}
                            icon={""}
                        />
                    </HorizontalCardList>
                </div>
                <div className="mt-4">
                    <TabPanel
                        onTabChange={handleTabChange}
                        renderExtra={(activeTab) => activeTab === 'reporting-agents' && (
                            <div className="tab-search position-relative">
                                <i className="bi bi-search tab-search__icon" aria-hidden="true" />
                                <input
                                    type="text"
                                    className="form-control tab-search__input"
                                    placeholder={t('agents.detail.searchAgents')}
                                    aria-label={t('agents.detail.searchAgents')}
                                    value={agentSearch}
                                    onChange={(e) => setAgentSearch(e.target.value)}
                                />
                                {agentSearch && (
                                    <button
                                        type="button"
                                        className="tab-search__clear"
                                        aria-label={t('filters.clear')}
                                        title={t('filters.clear')}
                                        onClick={() => {
                                            // Limpia sin esperar el delay
                                            setAgentSearch('');
                                            setAgentQuery('');
                                        }}
                                    >
                                        <i className="bi bi-x-circle-fill" aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                        )}
                        tabs={[
                            {
                                id: 'reporting-agents',
                                title: t('agents.detail.reportingAgents'),
                                content: visibleAgents.length === 0 ? <NoContent /> : (
                                    <div className="row g-3">
                                        {visibleAgents.map((reportingAgent) => (
                                            <div className="col-12 col-md-6 col-lg-4" key={reportingAgent.id}>
                                                <ContactCard
                                                    name={fullName(reportingAgent)}
                                                    photoUrl={reportingAgent.imagen || undefined}
                                                    status={
                                                        <StatusBadge
                                                            status={String(reportingAgent.status?.id ?? '')}
                                                            label={reportingAgent.status?.nombre || '—'}
                                                            theme={agentStatusTheme}
                                                        />
                                                    }
                                                    items={[
                                                        {
                                                            icon: <i className="bi bi-envelope"></i>,
                                                            content: reportingAgent.email || ''
                                                        },
                                                        {
                                                            icon: <i className="bi bi-telephone"></i>,
                                                            content: reportingAgent.telefono || ''
                                                        },
                                                    ]}
                                                    action={{
                                                        label: t('agents.detail.viewProfile'),
                                                        icon: <i className="bi bi-arrow-right"></i>,
                                                        onClick: () => navigate(PATHS.agents.detail(reportingAgent.id))
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )
                            },
                            {
                                id: 'quotes',
                                title: t('agents.detail.quotes'),
                                content: isVisited('quotes') ? <AgentQuotesTab agentId={Number(agent.id)} /> : null
                            },
                            {
                                id: 'sales',
                                title: t('agents.detail.sales'),
                                content: isVisited('sales') ? <AgentSalesTab agentId={Number(agent.id)} /> : null
                            },
                        ]}
                        defaultActiveTab="reporting-agents"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="min-vh-100 bg-light">
            <div className="container-fluid py-3 px-4">
                <Breadcrumb title={t('agents.detail.back')} hasBack />
                <div className="card shadow">
                    {renderBody()}
                </div>
            </div>
        </div>
    );
}
