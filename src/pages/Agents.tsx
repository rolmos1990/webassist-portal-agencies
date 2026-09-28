import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { AgentsTable } from '../components/Tables/AgentsTable';
//import { agentsData } from '../data/agentData';
import CreateAgentVertical, { type CreateAgentFormData } from '../components/Forms/CreateAgentVertical';
import { useTranslation } from 'react-i18next';
import { getAgentesAgencia, useActualizarAgentePorId, useCrearAgente } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import type { GetAgentesAgencia200DataItem, GetAgentesAgenciaParams } from '../api/schemas';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import { useAuthStore } from '../stores/useAuthStore';
import { parseSecurityRole, SecurityRole } from '../stores/SecurityRole';
import type { SortDir } from '../components/DataTable';
import { PATHS } from '../routes/Routes';

// Valores del contrato para POST /agentes y /agente/{id}
const AGENT_ROLE_ID = { AGENT: 1, ADMIN: 2 } as const;
const AGENT_STATUS_ID = { ACTIVE: 1, INACTIVE: 0 } as const;

function Agents() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang } = useI18nCache();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);

  // Agente en edición (null = creación) y contraseña temporal devuelta al crear
  const [editingAgent, setEditingAgent] = useState<GetAgentesAgencia200DataItem | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const { mutateAsync: crearAgente } = useCrearAgente();
  const { mutateAsync: actualizarAgente } = useActualizarAgentePorId();

  const handleClose = () => {
    setShow(false);
    setEditingAgent(null);
    setTempPassword(null);
  };
  const handleShow = () => {
    setEditingAgent(null);
    setTempPassword(null);
    setShow(true);
  };
  const handleEdit = (row: GetAgentesAgencia200DataItem) => {
    setEditingAgent(row);
    setTempPassword(null);
    setShow(true);
  };
  const [agentsData, setAgentsData] = useState<GetAgentesAgencia200DataItem[]>([]);

  useEffect(() => {
    onGetAgents();
  }, []);


  const navigate = useNavigate();
    const { t } = useTranslation();

  const agenciaId = useAuthStore((s) => s.user?.agencia?.id)

  // Muestra el error y lo propaga para que el formulario marque los campos (errores por campo)
  const failSave = (e: unknown): never => {
    toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    throw e;
  };

  const handleSubmit = async (data: CreateAgentFormData) => {
    const body = {
      nombre: data.firstName,
      apellido: data.lastName,
      email: data.email,
      rol: data.role === 'admin' ? AGENT_ROLE_ID.ADMIN : AGENT_ROLE_ID.AGENT,
      comision: data.commission ? Number(data.commission) : undefined,
    };
    try {
      if (editingAgent?.id != null) {
        await actualizarAgente({ idioma: lang, id: editingAgent.id, data: body });
        toast.success(t('agents.updated'));
        handleClose();
      } else {
        const res = await crearAgente({ idioma: lang, data: { ...body, status: AGENT_STATUS_ID.ACTIVE } });
        toast.success(t('agents.created'));
        // La contraseña temporal sólo viene en esta respuesta: se muestra hasta cerrar el panel
        if (res.password_temporal) setTempPassword(res.password_temporal);
        else handleClose();
      }
      onGetAgents();
    } catch (e) {
      failSave(e);
    }
  };

  const handleToggle = async (row: GetAgentesAgencia200DataItem) => {
    if (row.id == null) return;
    const status = row.status?.id === AGENT_STATUS_ID.ACTIVE ? AGENT_STATUS_ID.INACTIVE : AGENT_STATUS_ID.ACTIVE;
    try {
      await actualizarAgente({ idioma: lang, id: row.id, data: { status } });
      toast.success(t('agents.updated'));
      onGetAgents();
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

  const editingInitialValues: Partial<CreateAgentFormData> | undefined = editingAgent
    ? {
        firstName: editingAgent.nombre ?? '',
        lastName: editingAgent.apellido ?? '',
        email: editingAgent.email ?? '',
        commission: editingAgent.comision != null ? String(editingAgent.comision) : '',
        role: parseSecurityRole(editingAgent.roles) === SecurityRole.AGENT_ADMIN ? 'admin' : 'regular',
      }
    : undefined;

  const onGetAgents = async () => {
    try {
      setLoading(true);
      const params: GetAgentesAgenciaParams = { agencia: Number(agenciaId) };
      const res = await getAgentesAgencia(lang, params);
      if(res.ok){
        setAgentsData(res?.data ?? []);
      }
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    } finally {
      setLoading(false);
    }
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const onSortChange = (sort: { id: string; dir: SortDir }) => {
    // status es un objeto { id, nombre } y rol se deriva de roles[]
    const sortValue = (row: GetAgentesAgencia200DataItem) => {
      if (sort.id === 'status') return row.status?.nombre ?? '';
      if (sort.id === 'rol') return parseSecurityRole(row.roles) ?? '';
      return row[sort.id as keyof GetAgentesAgencia200DataItem] ?? '';
    };

    const sortedData = [...agentsData].sort((a, b) => {
      const valA = sortValue(a);
      const valB = sortValue(b);
  
      const normalizedA = typeof valA === 'string' ? valA.toLowerCase() : valA;
      const normalizedB = typeof valB === 'string' ? valB.toLowerCase() : valB;
  
      if (normalizedA < normalizedB) return sort.dir === 'asc' ? -1 : 1;
      if (normalizedA > normalizedB) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  
    setAgentsData(sortedData);
    setSort(sort);
  };

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
        backdrop="static"
        width="380px"
      >
        {tempPassword ? (
          <div className="d-flex flex-column gap-3">
            <h6 className="fw-semibold mb-0">{t('agents.tempPasswordTitle')}</h6>
            <p className="small text-secondary mb-0">{t('agents.tempPasswordHint')}</p>
            <div className="input-group">
              <input className="form-control font-monospace" readOnly value={tempPassword} aria-label={t('agents.tempPasswordTitle')} />
              <UIButton variant="outline-primary" type="button" onClick={copyTempPassword}>
                {t('agents.copy')}
              </UIButton>
            </div>
            <div className="d-flex justify-content-end">
              <UIButton variant="primary" pill className="px-4" type="button" onClick={handleClose}>
                {t('agents.close')}
              </UIButton>
            </div>
          </div>
        ) : (
          <CreateAgentVertical
            key={editingAgent?.id ?? 'new'}
            initialValues={editingInitialValues}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
        </Offcanvas>
            <div className="card border-0">
              <div className="card-body p-0">
              <AgentsTable
                  data={agentsData.slice((currentPage - 1) * 20, currentPage * 20)}
                  loading={loading}
                  sort={sort}
                  onEdit={handleEdit}
                  onToggle={handleToggle}
                  onDelete={(row) => navigate(PATHS.agencies.detail(row.id))}
                  onSortChange={onSortChange}
                  pagination={{
                      totalPages: agentsData.length / 20,
                      currentPage: currentPage,
                      align: "center",
                      wrap: "none",
                      onChange: onChangePage,
                  }}
                  />
              </div>
            </div>
      </div>
    </div>
  );
}

export default Agents;
