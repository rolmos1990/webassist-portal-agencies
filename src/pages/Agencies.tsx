import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import CreateAgenciesVertical from '../components/Forms/CreateAgenciesVertical';
import Offcanvas from '../components/Offcanvas';
import { AgencyTable } from '../components/Tables/AgencyTable';
import { agencyData } from '../data/agencyData';
import { useNavigate } from 'react-router-dom';

function Agencies() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

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
              <AgencyTable
                  data={agencyData}
                  loading={loading}
                  sort={{ sortBy: 'name', sortDir: 'desc' }}
                  onEdit={(row) => navigate(`/agency/${row.id}`)}
                  onToggle={(row) => navigate(`/agency/${row.id}`)}
                  onDelete={(row) => navigate(`/agency/${row.id}`)}
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

export default Agencies;
