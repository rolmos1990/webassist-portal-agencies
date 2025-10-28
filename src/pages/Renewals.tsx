import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import CreateAgenciesVertical from '../components/Forms/CreateAgenciesVertical';
import Offcanvas from '../components/Offcanvas';
import { quotesData } from '../data/quotesData';
import { QuotesTable } from '../components/Tables/QuotesTable';
import { useTranslation } from 'react-i18next';

function Renewals() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: any) => {
    handleClose();
  };

  const locations = [
    { value: 'pa-panama', label: 'Panama' },
    { value: 'pa-colon', label: 'Colón' },
  ];

  return (
<div className="min-vh-100 bg-light">
<div className="container-fluid py-3 px-4">
<Breadcrumb title={t("todas_cotizaciones")} rightContent={
          <div className="d-flex gap-2">
        <UIButton
        variant="outline-primary"
        icon=""
        >
        {t("filtrar_por")}
        </UIButton>
        <UIButton
        variant="dark"
        icon=""
        onClick={handleShow}
        >
        {t("create_new_agency")}
        </UIButton>
          </div>
        } />      
        <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        title="Create New Agent"
        canClose={true}
        scroll={true}
        backdrop="static"
        width="380px"
      >
        <CreateAgenciesVertical onSubmit={handleSubmit} onCancel={handleClose} locations={locations} />
        </Offcanvas>
            <div className="card">
              <div className="card-body p-0">
              <QuotesTable
                  data={quotesData}
                  loading={false}
                  sort={{ sortBy: "name", sortDir: "desc" }}
                  onSortChange={({ id, dir }) => {
                      console.log(id, dir);
                  }}
                  pagination={{
                      totalPages: 11,
                      currentPage: 3,
                      align: "center",
                      wrap: "none",
                      onChange: (p) => console.log("Ir a página:", p),
                  }}
                  />
              </div>
            </div>
      </div>
    </div>
  );
}

export default Renewals;
