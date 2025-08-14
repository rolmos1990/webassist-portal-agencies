import { DataTable } from '../components/DataTable';
import { useClientsTable } from '../hooks/useClientTable';

function Clients() {
  const { table } = useClientsTable();
  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <h1 className="h3 mb-4">Client Management</h1>
            <DataTable table={table} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
