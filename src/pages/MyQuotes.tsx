import { useMemo } from 'react';
import { DataTable } from '../components/DataTable';
import { useMyQuotesTable, type Quote, defaultQuoteColumns } from '../hooks/useMyQuotesTable';
import type { ColumnDef, Table } from '@tanstack/react-table';

// Sample data - in a real app, this would come from an API
const sampleQuotes: Quote[] = [
  {
    id: '57605',
    name: 'Operaciones',
    email: 'operaciones@asesoresdeexcelencia.com',
    products: 'Travel Viajes por día GOLD USD / EUR 35,000',
    total: 39.97,
    currency: 'USD'
  },
  {
    id: '57606',
    name: 'Ventas',
    email: 'ventas@asesoresdeexcelencia.com',
    products: 'Seguro de Viaje Platinum / USD 50,000',
    total: 75.50,
    currency: 'USD'
  },
  {
    id: '57607',
    name: 'Soporte',
    email: 'soporte@asesoresdeexcelencia.com',
    products: 'Asistencia Médica Internacional / USD 100,000',
    total: 120.00,
    currency: 'USD'
  }
];
function MyQuotes() {
  // Define table columns with proper typing
  const columns = useMemo<ColumnDef<Quote>[]>(
    () => [
      // Use default quote columns
      ...(defaultQuoteColumns as ColumnDef<Quote>[]),
      {
        id: 'actions',
        header: 'Acciones',
        cell: () => (
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-sm btn-outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                // Handle view details
              }}
              title="Ver detalles"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-success"
              onClick={(e) => {
                e.stopPropagation();
                // Handle download
              }}
              title="Descargar"
            >
              <i className="bi bi-download"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Initialize the table with data and columns
  const tableInstance = useMyQuotesTable<Quote>({
    data: sampleQuotes,
    columns,
    initialPageSize: 10, // Show 10 items per page by default
  });

  // Cast the table instance to the expected type for DataTable
  const table = tableInstance as unknown as Table<Quote> & {
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
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Cotizaciones de la Agencia</h1>
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

export default MyQuotes;
