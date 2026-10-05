import { useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import UIModal from '../components/UIModal';
import { AgentsTable } from '../components/Tables/AgentsTable';
import CreateAgentVertical, { type CreateAgentFormData } from '../components/Forms/CreateAgentVertical';
import { useTranslation } from 'react-i18next';
import {
  getGetAgentesAgenciaQueryKey,
  useActualizarAgentePorId,
  useCrearAgente,
  useGetAgentesAgencia,
} from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import type { ActualizarAgentePorIdBody, AgenteItem, GetAgentesAgencia200, GetAgentesAgencia200DataItem, GetAgentesAgenciaParams } from '../api/schemas';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import { useAuthStore } from '../stores/useAuthStore';
import { parseSecurityRole, SecurityRole } from '../stores/SecurityRole';
import { isAgentActive } from '../components/Tables/AgentsDataTableConfig';
import type { SortDir } from '../components/DataTable';
import { PATHS } from '../routes/Routes';

// Valores del contrato para POST /agentes y /agente/{id}
const AGENT_ROLE_ID = { AGENT: 1, ADMIN: 2 } as const;
const AGENT_STATUS_ID = { ACTIVE: 1, INACTIVE: 2 } as const;

const PAGE_SIZE = 20;
// Espera tras el toast de creación antes de mostrar la contraseña temporal
const TEMP_PASSWORD_DELAY_MS = 1000;

// Datos del agente -> valores del formulario de edición
const toAgentFormValues = (agent: GetAgentesAgencia200DataItem): CreateAgentFormData => ({
  firstName: agent.nombre ?? '',
  lastName: agent.apellido ?? '',
  email: agent.email ?? '',
  commission: agent.comision != null ? String(agent.comision) : '',
  role: parseSecurityRole(agent.roles) === SecurityRole.AGENT_ADMIN ? 'admin' : 'regular',
  phone: agent.telefono ?? '',
  whatsapp: agent.whatsapp ?? '',
  language: agent.idioma ?? '',
  alternateEmail: agent.correo_renovaciones_alternativo ?? '',
  receiveRenewals: agent.recibir_correos_renovaciones ?? false,
  active: isAgentActive(agent),
});

// Campos comunes de POST /agentes y /agente/{id}
const toBaseBody = (form: CreateAgentFormData) => ({
  nombre: form.firstName,
  apellido: form.lastName,
  email: form.email,
  rol: form.role === 'admin' ? AGENT_ROLE_ID.ADMIN : AGENT_ROLE_ID.AGENT,
  comision: form.commission ? Number(form.commission) : undefined,
});

// Cadena vacía limpia teléfono, whatsapp y correo alternativo (según el contrato)
const toUpdateBody = (form: CreateAgentFormData): ActualizarAgentePorIdBody => ({
  ...toBaseBody(form),
  telefono: form.phone,
  whatsapp: form.whatsapp,
  idioma: form.language || undefined,
  correo_renovaciones_alternativo: form.alternateEmail,
  recibir_correos_renovaciones: form.receiveRenewals,
  status: form.active ? AGENT_STATUS_ID.ACTIVE : AGENT_STATUS_ID.INACTIVE,
});

function Agents() {
  const [show, setShow] = useState(false);
  // Se incrementa en cada apertura para montar el formulario limpio (el panel también se cierra con click fuera)
  const [formKey, setFormKey] = useState(0);
  const { lang } = useI18nCache();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);

  // Agente en edición (null = creación)
  const [editingAgent, setEditingAgent] = useState<GetAgentesAgencia200DataItem | null>(null);
  // Contraseña temporal devuelta al crear: sólo vive mientras el modal está abierto
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [showTempPassword, setShowTempPassword] = useState(false);
  const tempPasswordTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { mutateAsync: crearAgente } = useCrearAgente();
  const { mutateAsync: actualizarAgente, isPending: isUpdating } = useActualizarAgentePorId();

  const agenciaId = useAuthStore((s) => s.user?.agencia?.id);
  const params: GetAgentesAgenciaParams = { agencia: Number(agenciaId) };

  const { data, isLoading, error } = useGetAgentesAgencia(lang, params, {
    query: { enabled: agenciaId != null },
  });

  useEffect(() => {
    if (error) {
      toast.error("Error", getApiErrorMessage(error, t('error_generico')));
    }
  }, [error, t]);

  useEffect(() => () => {
    if (tempPasswordTimer.current) clearTimeout(tempPasswordTimer.current);
  }, []);

  const agentsQueryKey = getGetAgentesAgenciaQueryKey(lang, params);
  const refreshAgents = () => queryClient.invalidateQueries({ queryKey: agentsQueryKey });

  // Reemplaza la fila con el agente que devuelve POST /agente/{id}, sin esperar al refetch del listado
  // (conserva los totales de ventas/comisiones, que sólo vienen en el listado)
  const applyUpdatedAgent = (updated?: AgenteItem) => {
    if (updated?.id == null) {
      refreshAgents();
      return;
    }
    queryClient.setQueryData<GetAgentesAgencia200>(agentsQueryKey, (old) =>
      old ? { ...old, data: old.data?.map((a) => (a.id === updated.id ? { ...a, ...updated } : a)) } : old
    );
  };

  const handleClose = () => {
    setShow(false);
    setEditingAgent(null);
  };
  const handleShow = () => {
    setEditingAgent(null);
    setFormKey((k) => k + 1);
    setShow(true);
  };
  const handleView = (row: GetAgentesAgencia200DataItem) => {
    if (row.id != null) navigate(PATHS.agents.detail(row.id));
  };
  const handleEdit = (row: GetAgentesAgencia200DataItem) => {
    setEditingAgent(row);
    setFormKey((k) => k + 1);
    setShow(true);
  };

  // Muestra el error y lo propaga para que el formulario marque los campos (errores por campo)
  const failSave = (e: unknown): never => {
    toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    throw e;
  };

  const handleSubmit = async (form: CreateAgentFormData) => {
    try {
      if (editingAgent?.id != null) {
        const res = await actualizarAgente({ idioma: lang, id: editingAgent.id, data: toUpdateBody(form) });
        toast.success(t('agents.updated'));
        applyUpdatedAgent(res.data);
      } else {
        const res = await crearAgente({ idioma: lang, data: { ...toBaseBody(form), status: AGENT_STATUS_ID.ACTIVE } });
        toast.success(t('agents.created'));
        // La contraseña temporal sólo viene en esta respuesta
        const password = res.password_temporal;
        if (password) {
          tempPasswordTimer.current = setTimeout(() => setTempPassword(password), TEMP_PASSWORD_DELAY_MS);
        }
        refreshAgents();
      }
      handleClose();
    } catch (e) {
      failSave(e);
    }
  };

  // Sólo cambia el status: 1 = activo, 2 = inactivo, según el estado actual del agente
  const handleToggle = async (row: GetAgentesAgencia200DataItem) => {
    if (row.id == null || isUpdating) return;
    const status = isAgentActive(row) ? AGENT_STATUS_ID.INACTIVE : AGENT_STATUS_ID.ACTIVE;
    try {
      const res = await actualizarAgente({ idioma: lang, id: row.id, data: { status } });
      toast.success(t('agents.updated'));
      applyUpdatedAgent(res.data);
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    }
  };

  const copyTempPassword = async () => {
    if (!tempPassword) return;
    try {
      await navigator.clipboard.writeText(tempPassword);
      toast.success(t('agents.copied'));
    } catch {
      toast.error("Error", t('error_generico'));
    }
  };

  const closeTempPassword = () => {
    setTempPassword(null);
    setShowTempPassword(false);
  };

  const editingInitialValues = editingAgent ? toAgentFormValues(editingAgent) : undefined;

  // status es un objeto { id, nombre }, rol se deriva de roles[] y el nombre se muestra concatenado
  const agents = useMemo(() => {
    const items = data?.data ?? [];
    if (!sort) return items;

    const sortValue = (row: GetAgentesAgencia200DataItem) => {
      if (sort.id === 'status') return row.status?.nombre ?? '';
      if (sort.id === 'rol') return parseSecurityRole(row.roles) ?? '';
      if (sort.id === 'agencia') return row.agencia?.nombre ?? '';
      if (sort.id === 'name') return `${row.nombre ?? ''} ${row.apellido ?? ''}`;
      return row[sort.id as keyof GetAgentesAgencia200DataItem] ?? '';
    };

    return [...items].sort((a, b) => {
      const valA = sortValue(a);
      const valB = sortValue(b);

      const normalizedA = typeof valA === 'string' ? valA.toLowerCase() : valA;
      const normalizedB = typeof valB === 'string' ? valB.toLowerCase() : valB;

      if (normalizedA < normalizedB) return sort.dir === 'asc' ? -1 : 1;
      if (normalizedA > normalizedB) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  return (
<div className="min-vh-100 bg-light">
<div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('agentes')} rightContent={
                  <div className="d-flex gap-2">
                <UIButton
                variant="outline-primary"
                icon=""
                >
                {t('filter_by')}
                </UIButton>
                <UIButton
                variant="dark"
                icon=""
                onClick={handleShow}
                >
                {t('create_new_agent')}
                </UIButton>
                  </div>
        } />      
        <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        title={editingAgent ? t('agents.edit') : t('create_new_agent')}
        canClose={true}
        scroll={true}
        backdrop={true}
        width="380px"
      >
          <CreateAgentVertical
            key={formKey}
            mode={editingAgent ? 'edit' : 'create'}
            initialValues={editingInitialValues}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Offcanvas>
        <UIModal
          show={tempPassword != null}
          onClose={closeTempPassword}
          icon="info"
          title={t('agents.tempPasswordTitle')}
          subtitle={t('agents.tempPasswordHint')}
          primaryLabel={t('agents.close')}
          onPrimaryClick={closeTempPassword}
          backdrop="static"
        >
          <div className="d-flex align-items-center gap-2 px-3">
            <div className="position-relative flex-grow-1">
              <input
                className="form-control rounded-pill ps-3 font-monospace"
                style={{ paddingRight: '2.75rem' }}
                type={showTempPassword ? 'text' : 'password'}
                readOnly
                value={tempPassword ?? ''}
                aria-label={t('agents.tempPasswordTitle')}
              />
              <button
                type="button"
                className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 p-0 lh-1"
                onClick={() => setShowTempPassword((v) => !v)}
                aria-label={showTempPassword ? t('agents.hide') : t('agents.show')}
                title={showTempPassword ? t('agents.hide') : t('agents.show')}
              >
                <i className={`bi ${showTempPassword ? 'bi-eye-slash' : 'bi-eye'} fs-5`} aria-hidden="true" />
              </button>
            </div>
            <UIButton variant="outline-primary" pill className="px-4" type="button" onClick={copyTempPassword}>
              {t('agents.copy')}
            </UIButton>
          </div>
        </UIModal>
            <div className="card border-0">
              <div className="card-body p-0">
              <AgentsTable
                  data={agents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
                  loading={isLoading}
                  sort={sort}
                  onView={handleView}
                  onEdit={handleEdit}
                  onToggle={handleToggle}
                  onSortChange={setSort}
                  pagination={{
                      totalPages: Math.max(1, Math.ceil(agents.length / PAGE_SIZE)),
                      currentPage: currentPage,
                      align: "center",
                      wrap: "none",
                      onChange: setCurrentPage,
                  }}
                  />
              </div>
            </div>
      </div>
    </div>
  );
}

export default Agents;
