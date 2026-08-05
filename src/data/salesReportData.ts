export type SalesReportRow = {
  id: string;
  voucher: string;
  salesDate: string;
  agency: string;
  agent: string;
  salePrice: number;
  processingCost: number;
  commissionBasis: number;
  commissionPercent: number;
};

const baseRows: Omit<SalesReportRow, "id" | "salesDate">[] = [
  { voucher: "A93-8J7588", agency: "We Assist", agent: "Alejandro Torres", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-8J7588", agency: "Infinity International", agent: "Jane Cooper", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 30 },
  { voucher: "A93-K3F568", agency: "Palma & Company", agent: "Wade Warren", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 75 },
  { voucher: "A93-D71HG4", agency: "BEN-IN", agent: "Esther Howard", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-D71HG4", agency: "BEN-IN", agent: "Esther Howard", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-C1101H", agency: "Columbia Tours", agent: "Cameron Williamson", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 82 },
  { voucher: "A93-4141GH", agency: "We Assist", agent: "Alejandro Torres", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-4141GH", agency: "We Assist", agent: "Alejandro Torres", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-8J7588", agency: "PBC International", agent: "Leslie Alexander", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 35 },
  { voucher: "A93-K3F568", agency: "Palma & Company", agent: "Wade Warren", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-K3F568", agency: "We Assist", agent: "Wade Warren", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 100 },
  { voucher: "A93-C1101H", agency: "Columbia Tours", agent: "Cameron Williamson", salePrice: 108.49, processingCost: 4.67, commissionBasis: 103.82, commissionPercent: 90 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 132 filas = 11 páginas de 12, para reflejar la paginación del diseño de referencia.
export const salesReportData: SalesReportRow[] = Array.from({ length: baseRows.length * 11 }, (_, i) => {
  const base = baseRows[i % baseRows.length];
  const day = (i % 28) + 1;
  const month = MONTHS[Math.floor(i / 28) % MONTHS.length];
  return {
    ...base,
    id: String(i + 1),
    salesDate: `${day} ${month} 2024`,
  };
});
