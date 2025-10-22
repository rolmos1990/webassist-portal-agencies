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

function Agents() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang } = useI18nCache();
  const [currentPage, setCurrentPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [agentsData, setAgentsData] = useState<GetAgentesAgencia200DataItem[]>([]);

  useEffect(() => {
    onGetAgents();
  }, []);


  const navigate = useNavigate();
    const { t } = useTranslation();

  const handleSubmit = (data: any) => {
    handleClose();
  };

  const onGetAgents = async () => {
    try {
      setLoading(true);
      const params: GetAgentesAgenciaParams = { agencia: 123 };
      const res = await getAgentesAgencia(lang, params);
      if(res.ok){
        setAgentsData(res?.data ?? []);
      }
    } catch (e) {
      toast.error("Error", t('error_generico'));
    } finally {
      setLoading(false);
    }
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
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
            <div className="card">
              <div className="card-body p-0">
              <AgentsTable
                  data={agentsData.slice((currentPage - 1) * 20, currentPage * 20)}
                  loading={loading}
                  sort={{ id: 'name', dir: 'desc' }}
                  onEdit={(row) => navigate(`/agent/${row.id}`)}
                  onToggle={(row) => navigate(`/agent/${row.id}`)}
                  onDelete={(row) => navigate(`/agent/${row.id}`)}
                  onSortChange={({ id, dir }) => {
                      console.log(id, dir);
                  }}
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
