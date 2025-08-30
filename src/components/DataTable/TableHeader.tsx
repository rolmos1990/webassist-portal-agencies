import { flexRender } from '@tanstack/react-table';
import type { Table as TanstackTable } from '@tanstack/react-table';

const SortIndicator = ({ column }: { column: any }) => {
  const sortState = column.getIsSorted();
  
  if (!column.getCanSort()) return null;
  
  const sortIcons = {
    asc: <i className="bi bi-arrow-up ms-1" />,
    desc: <i className="bi bi-arrow-down ms-1" />,
  };
  
  return sortIcons[sortState as keyof typeof sortIcons] || (
    <i className="bi bi-arrow-down-up text-black-50 ms-1" />
  );
};

type TableHeaderProps<T> = {
  table: TanstackTable<T>;
};

export const TableHeader = <T,>({ table }: TableHeaderProps<T>) => (
  <thead className="table-light">
    {table && table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id} className="border-bottom">
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
            className={`border-0 user-select-none ${
              header.column.getCanSort() ? 'cursor-pointer text-black' : ''
            }`}
            style={{ minWidth: header.getSize() }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            <SortIndicator column={header.column} />
          </th>
        ))}
      </tr>
    ))}
  </thead>
);
