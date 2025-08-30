import { useMemo } from 'react';
import { DataTable } from '../components/DataTable';
import { useClientTable, type Client, defaultClientColumns } from '../hooks/useClientTable';
import type { ColumnDef, Table } from '@tanstack/react-table';

// Extend the base Client interface with additional fields
interface ExtendedClient extends Client {
  lastLogin: string;
  joinDate: string;
}

// Sample data - in a real app, this would come from an API
const sampleClients: ExtendedClient[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '6',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '7',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '8',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '9',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '6',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '7',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '8',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '9',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '6',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '7',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '8',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '9',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '6',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
    {
    id: '7',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastLogin: '2023-08-29T14:32:00',
    joinDate: '2023-01-15',
  },
  {
    id: '8',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    lastLogin: '2023-08-20T09:15:00',
    joinDate: '2023-02-20',
  },
  {
    id: '9',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    status: 'pending',
    lastLogin: '2023-08-28T16:45:00',
    joinDate: '2023-03-10',
  },
];

function Clients() {


  // Define table columns with proper typing
  const columns = useMemo<ColumnDef<ExtendedClient>[]>(
    () => [
      // Use default columns with proper typing
      ...(defaultClientColumns as ColumnDef<ExtendedClient>[]),
      // Add additional columns
      {
        accessorKey: 'lastLogin',
        header: 'Last Login',
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        accessorKey: 'joinDate',
        header: 'Join Date',
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-sm btn-outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                // Handle delete
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

  // Initialize the table with data and columns
  const tableInstance = useClientTable<ExtendedClient>({
    data: sampleClients,
    columns,
    initialPageSize: 10, // Show 10 items per page by default
  });

  // Cast the table instance to the expected type for DataTable
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
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0">Client Management</h1>
              <button type="button" className="btn btn-outline-primary rounded-pill"><i className="bi bi-plus-lg me-2"></i> Add Customer</button>
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
