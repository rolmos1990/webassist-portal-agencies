import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { AgencyAssistanceTable } from '../components/Tables/AgencyAssistanceTable';
import CreateAgentVertical from '../components/Forms/CreateAgentVertical';
import { useTranslation } from 'react-i18next';
import { getAsistenciasAgenteAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import type { GetIdiomaAsistenciasPagina200DataItemsItem } from '../api/schemas';
import { toast } from '../services/toast';
import type { SortDir } from '../components/DataTable';
import { PATHS } from '../routes/Routes';

function AssistanceAgency() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang } = useI18nCache();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; dir: SortDir } | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [agentsData, setAgentsData] = useState<GetIdiomaAsistenciasPagina200DataItemsItem[]>([]);

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
      const res = await getAsistenciasAgenteAgencia(lang);
      if(res.ok){
        setAgentsData(res?.data?.items ?? []);
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

  const onSortChange = (sort: { id: string; dir: SortDir }) => {
    const sortedData = [...agentsData].sort((a, b) => {
      const valA = a[sort.id as keyof GetIdiomaAsistenciasPagina200DataItemsItem] ?? ''; 
      const valB = b[sort.id as keyof GetIdiomaAsistenciasPagina200DataItemsItem] ?? '';
  
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
        <Breadcrumb title={t('todas_asistencias')} rightContent={
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
              <AgencyAssistanceTable
                  data={agentsData.slice((currentPage - 1) * 20, currentPage * 20)}
                  loading={loading}
                  sort={sort}
                  onShow={(row) => navigate(PATHS.assistances.detail(row.vouchers?.[0].voucher))}
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

export default AssistanceAgency;
