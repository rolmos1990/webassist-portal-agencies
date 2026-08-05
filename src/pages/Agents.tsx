import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { AgentsTable } from '../components/Tables/AgentsTable';
//import { agentsData } from '../data/agentData';
import CreateAgentVertical from '../components/Forms/CreateAgentVertical';
import { useTranslation } from 'react-i18next';
import { getAgentesAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import type { GetAgentesAgencia200DataItem, GetAgentesAgenciaParams } from '../api/schemas';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import { useAuthStore } from '../stores/useAuthStore';
import type { SortDir } from '../components/DataTable';
import { PATHS } from '../routes/Routes';

function Agents() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang } = useI18nCache();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [agentsData, setAgentsData] = useState<GetAgentesAgencia200DataItem[]>([]);

  useEffect(() => {
    onGetAgents();
  }, []);


  const navigate = useNavigate();
    const { t } = useTranslation();

  const agenciaId = useAuthStore((s) => s.user?.agencia) 

  const handleSubmit = (data: any) => {
    handleClose();
  };

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
    const sortedData = [...agentsData].sort((a, b) => {
      const valA = a[sort.id as keyof GetAgentesAgencia200DataItem] ?? ''; 
      const valB = b[sort.id as keyof GetAgentesAgencia200DataItem] ?? '';
  
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
        onHide={() => setShow(false)}
        placement="end"
        title={t('create_new_agent')}
        canClose={true}
        scroll={true}
        backdrop="static"
        width="380px"
      >
        <CreateAgentVertical onSubmit={handleSubmit} onCancel={handleClose} />
        </Offcanvas>
            <div className="card border-0">
              <div className="card-body p-0">
              <AgentsTable
                  data={agentsData.slice((currentPage - 1) * 20, currentPage * 20)}
                  loading={loading}
                  sort={sort}
                  onEdit={(row) => navigate(PATHS .agencies.detail(row.id))}
                  onToggle={(row) => navigate(PATHS.agencies.detail(row.id))}
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
