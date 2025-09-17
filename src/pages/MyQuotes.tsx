import { t } from 'i18next';
import { useMemo, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import DataTable, { currency } from '../components/DataTable';
import CreateAgenciesVertical from '../components/Forms/CreateAgenciesVertical';
import Offcanvas from '../components/Offcanvas';
import { createQuotesColumns } from '../components/Tables/QuotesDataTableConfig';
import { quotesData, type QuotesRow } from '../data/quotesData';
import { QuotesTable } from '../components/Tables/QuotesTable';

function MyQuotes() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

  const locations = [
    { value: 'pa-panama', label: 'Panama' },
    { value: 'pa-colon', label: 'Colón' },
  ];

  return (
<div className="min-vh-100 bg-light">
<div className="container-fluid py-3 px-4">
<Breadcrumb title="Agencies" rightContent={
          <div className="d-flex gap-2">
        <UIButton
        variant="outline-primary"
        icon=""
        >
        Filter By
        </UIButton>
        <UIButton
        variant="dark"
        icon=""
        onClick={handleShow}
        >
        Create an Agency
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
                      // fetchData({ sortBy: id, sortDir: dir }); // si haces server-side
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

export default MyQuotes;
