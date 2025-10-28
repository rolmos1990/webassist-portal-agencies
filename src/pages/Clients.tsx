import { useState } from 'react';
import Offcanvas from '../components/Offcanvas';
import { customersData, type CustomerRow } from '../data/customerData';
import { UIButton } from '../components/Button';
import Breadcrumb from '../components/Breadcrumb';
import CreateClientVertical from '../components/Forms/CreateClientVertical';
import { CustomersTable } from '../components/Tables/CustomerTable';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/Routes';

function Clients() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ sortBy: 'name', sortDir: 'desc' as 'desc' | 'asc' });

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch data for the new page
    console.log("Page changed to:", page);
  };

  const handleSortChange = ({ id, dir }: { id: string; dir: 'desc' | 'asc' }) => {
    setSort({ sortBy: id, sortDir: dir });
    // Here you would typically refetch data with the new sort
    console.log("Sort changed:", { sortBy: id, sortDir: dir });
  };

  const handleEdit = (row: CustomerRow) => {
    navigate(PATHS.agencies.detail(row.id));
  };

  const handleToggle = (row: CustomerRow) => {
    console.log("Toggle", row);
  };

  const handleDelete = (row: CustomerRow) => {
    console.log("Delete", row);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          title="Create New Client"
          canClose={true}
          scroll={true}
          backdrop="static"
          width="380px"
        >
          <CreateClientVertical onSubmit={handleSubmit} onCancel={handleClose} />
        </Offcanvas>

        <Breadcrumb 
          title="Agencies" 
          rightContent={
            <div className="d-flex gap-2">
              <UIButton variant="outline-primary" icon="">
                Filter By
              </UIButton>
              <UIButton variant="dark" icon="" onClick={handleShow}>
                Create a Client
              </UIButton>
            </div>
          } 
        />

        <div className="card">
          <div className="card-body p-0">
            <CustomersTable
              data={customersData}
              loading={loading}
              sort={sort}
              onSortChange={handleSortChange}
              onEdit={handleEdit}
              onToggle={handleToggle}
              onDelete={handleDelete}
              pagination={{
                totalPages: 11,
                currentPage,
                align: "center",
                wrap: "none",
                onChange: handlePageChange,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
