export type SalesRow = {
    id: string;
    planName: string;
    saleAmount: number;
    unitQty: number;
    variationsPercent: number;
    unitPrice: number;
    voucher: string;
  };


export const salesData: SalesRow[] = [
{ id: "1", planName: "Panama Tours", saleAmount: 61234.78, unitQty: 3128.67, variationsPercent: 1.5, unitPrice: 352, voucher: "E70-GHI012"},
{ id: "2", planName: "Canal Adventures", saleAmount: 19876.12, unitQty: 2450.89, variationsPercent: 1.5, unitPrice: 410, voucher: "E70-GHI014" },
{ id: "3", planName: "Cultural Trails Panama", saleAmount: 74512.9, unitQty: 3589.12, variationsPercent: -0.3, unitPrice: 150, voucher: "E70-GHI016" },
{ id: "4", planName: "Eco Tours Panama", saleAmount: 12345.67, unitQty: 2987.34, variationsPercent: 0.3, unitPrice: 273, voucher: "E70-GHI018" },
{ id: "5", planName: "Island Hoppers Panama", saleAmount: 28901.34, unitQty: 2205.78, variationsPercent: 1.5, unitPrice: 124, voucher: "E70-GHI020" },
{ id: "6", planName: "Panama City Tours", saleAmount: 45678.9, unitQty: 2650.5, variationsPercent: 0.5, unitPrice: 346, voucher: "E70-GHI022" },
{ id: "7", planName: "Panama Dream Vacations", saleAmount: 67890.12, unitQty: 3871.99, variationsPercent: -0.3, unitPrice: 292, voucher: "E70-GHI024" },
{ id: "8", planName: "Panama Explorers", saleAmount: 54321.0, unitQty: 3054.23, variationsPercent: 0.3, unitPrice: 120, voucher: "E70-GHI026" },
];