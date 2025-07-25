import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable} from "@tanstack/react-table";

import type { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";

//TODO -- definir aqui donde registramos la data
import { clientData, type Client } from "../data/clientData";

export function useClientsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Client>[]>(() => [
    {
      accessorKey: "name",
      header: "Client Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },
    {
      accessorKey: "totalPurchase",
      header: "Total Purchase",
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as Client["status"];
        const isActive = status === "Activo";
        return (
          <span
            className={`badge fw-normal ${
              isActive
                ? "bg-success-subtle text-success border border-success-subtle"
                : "bg-secondary-subtle text-secondary border border-secondary-subtle"
            }`}
          >
            ● {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <div className="dropdown">
          <button
            className="btn btn-link text-muted p-0"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-three-dots"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item" href="#">View</a></li>
            <li><a className="dropdown-item" href="#">Edit</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
          </ul>
        </div>
      ),
    },
  ], []);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
    const totalPages = Math.ceil(clientData.length / pagination.pageSize);


  const table = useReactTable({
    data: clientData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false, // deja que TanStack maneje la paginación automáticamente
    pageCount: totalPages,   // opcional, para paginación manual
  });

  return { table, totalPages, pagination };
}
