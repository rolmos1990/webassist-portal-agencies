import { flexRender } from '@tanstack/react-table';
import type { Table as TanstackTable } from '@tanstack/react-table';

type TableBodyProps<T> = {
  table: TanstackTable<T>;
};

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
  const rows = table && table.getRowModel().rows;
  
  if (rows && rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td 
            colSpan={table.getAllColumns().length} 
            className="text-center py-4 text-muted"
          >
            No data available
          </td>
        </tr>
      </tbody>
    );
  }
  
  return (
    <tbody>
      {rows && rows.map((row) => (
        <tr key={row.id} className="border-top">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="border-0">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
