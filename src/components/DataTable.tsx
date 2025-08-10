import {
  flexRender,
} from "@tanstack/react-table";

import type { Table as TanstackTable } from "@tanstack/react-table";

type Props<T> = {
  table: TanstackTable<T>;
};

export function DataTable<T>({ table }: Props<T>) {
  return (
    <div className="table-responsive">
      <table className="table table-hover border-0">
        <thead className="table-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-bottom">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`border-0 user-select-none cursor-pointer ${
                    header.column.getCanSort() ? "text-black" : ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <i className="bi bi-arrow-up ms-1" />,
                    desc: <i className="bi bi-arrow-down ms-1" />,
                  }[header.column.getIsSorted() as string] ?? (
                    header.column.getCanSort() && (
                      <i className="bi bi-arrow-down text-black ms-1" />
                    )
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-top">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}