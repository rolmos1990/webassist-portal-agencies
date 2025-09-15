import { useMemo } from 'react';
import { DataTable } from '../components/DataTable';
import { useClientTable, type Client, defaultClientColumns } from '../hooks/useClientTable';
import type { ColumnDef, Table } from '@tanstack/react-table';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export interface ExtendedClient extends Client {
  id: string;
  email: string;
  name: string;
  phone: string;
  agentCode: string;
  commission: number;
  status: 'Activo' | 'Inactivo' | 'Pendiente';
}

const sampleClients: ExtendedClient[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  email: `client${i + 1}@example.com`,
  name: `Client ${i + 1} Name`,
  phone: `+1 234 567 89${i.toString().padStart(2, '0')}`,
  agentCode: `WSA-${(i + 1).toString().padStart(7, '0')}`,
  commission: 0.00,
  status: i % 3 === 0 ? 'Activo' : i % 3 === 1 ? 'Inactivo' : 'Pendiente'
}));
function Clients() {
const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const columns = useMemo<ColumnDef<ExtendedClient>[]>(
    () => [
      ...(defaultClientColumns as ColumnDef<ExtendedClient>[]),
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-sm btn-outline-primary"
              onClick={(e) => {
                navigate(`/users/1`);
                e.stopPropagation();
              }}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                navigate(`/users/1`);
                e.stopPropagation();
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useClientTable<ExtendedClient>({
    data: sampleClients,
    columns,
    initialPageSize: 10,
  });

  const table = tableInstance as unknown as Table<ExtendedClient> & {
    getPaginationProps: () => {
      currentPage: number;
      totalPages: number;
      canPreviousPage: boolean;
      canNextPage: boolean;
      onPageChange: (page: number) => void;
      onNextPage: () => void;
      onPreviousPage: () => void;
      onFirstPage: () => void;
      onLastPage: () => void;
    };
    bordered: false,
    striped: false,
    hover: true,
    size: 'sm',
    isLoading: true;
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Agentes</h1>

              <Button variant="outline-primary" className="rounded-pill" onClick={handleShow}>
                <i className="bi bi-plus-lg me-2"></i>Agregar agente
              </Button>
              <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Agregar agente</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column" style={{ minHeight: 'calc(100vh - 100px)' }}>
                  <form id="newClientForm" onSubmit={(e) => {
                    e.preventDefault();
                    handleClose();
                  }} className="d-flex flex-column flex-grow-1">
                    <div>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="name" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" id="email" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="phone" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="commission" className="form-label">Comisión (%)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="commission" 
                          min="0" 
                          max="100" 
                          step="0.01"
                          required 
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="role" className="form-label">Rol</label>
                        <select className="form-select" id="role" required>
                          <option value="">Seleccionar rol</option>
                          <option value="regular">Agente Regular</option>
                          <option value="admin">Agente Administrador</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Estado</label>
                        <div className="d-flex gap-3">
                          {['Activo', 'Inactivo', 'Pendiente'].map((status) => (
                            <div key={status} className="form-check">
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="status" 
                                id={`status-${status.toLowerCase()}`} 
                                value={status}
                                defaultChecked={status === 'Activo'}
                                required 
                              />
                              <label className="form-check-label" htmlFor={`status-${status.toLowerCase()}`}>
                                {status}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    
                    <div className="mt-auto pt-4 border-top d-flex justify-content-end gap-3">
                      <Button 
                        type="button" 
                        variant="link" 
                        className="text-secondary text-decoration-none rounded-pill px-4"
                        onClick={() => {
                          const form = document.getElementById('newClientForm') as HTMLFormElement | null;
                          form?.reset();
                          handleClose();
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="rounded-pill px-4"
                      >
                        Guardar
                      </Button>
                    </div>
                  </form>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <DataTable table={table} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
