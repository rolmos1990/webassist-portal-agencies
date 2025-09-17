// data/customersData.ts
export type CustomerStatus = "Active" | "Inactive";

export type CustomerRow = {
  id: string;
  name: string;           // Client Name
  email: string;          // Email
  phoneNumber: string;    // Phone Number
  totalPurchase: number;  // Total Purchase (conteo)
  createdOn: string;      // Created on (dd MMM yyyy)
  city: string;           // City
  country: string;        // Country
  status: CustomerStatus; // Status
};

export const customersData: CustomerRow[] = [
  {
    id: "1",
    name: "Ana Gómez",
    email: "ana.gomez@example.com",
    phoneNumber: "+507 6789-34567",
    totalPurchase: 5,
    createdOn: "05 Mar 2024",
    city: "La Palma",
    country: "Panama",
    status: "Active",
  },
  {
    id: "2",
    name: "Luis González",
    email: "luis.gonzalez@example.com",
    phoneNumber: "+507 6200-1002",
    totalPurchase: 2,
    createdOn: "18 Apr 2024",
    city: "David",
    country: "Panama",
    status: "Inactive",
  },
  {
    id: "3",
    name: "María Rodríguez",
    email: "maria.rodriguez@example.com",
    phoneNumber: "+507 6200-1003",
    totalPurchase: 9,
    createdOn: "22 May 2024",
    city: "Santiago",
    country: "Panama",
    status: "Active",
  },
  {
    id: "4",
    name: "Jorge Pérez",
    email: "jorge.perez@example.com",
    phoneNumber: "+507 6200-1004",
    totalPurchase: 1,
    createdOn: "01 Jun 2024",
    city: "Chitré",
    country: "Panama",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Carolina Díaz",
    email: "carolina.diaz@example.com",
    phoneNumber: "+507 6200-1005",
    totalPurchase: 7,
    createdOn: "14 Jun 2024",
    city: "Colón",
    country: "Panama",
    status: "Active",
  },
  {
    id: "6",
    name: "Ricardo Moreno",
    email: "ricardo.moreno@example.com",
    phoneNumber: "+507 6200-1006",
    totalPurchase: 0,
    createdOn: "02 Jul 2024",
    city: "Penonomé",
    country: "Panama",
    status: "Inactive",
  },
  {
    id: "7",
    name: "Valeria Castillo",
    email: "valeria.castillo@example.com",
    phoneNumber: "+507 6200-1007",
    totalPurchase: 11,
    createdOn: "19 Jul 2024",
    city: "Panamá",
    country: "Panama",
    status: "Active",
  },
  {
    id: "8",
    name: "Daniel Ríos",
    email: "daniel.rios@example.com",
    phoneNumber: "+507 6200-1008",
    totalPurchase: 3,
    createdOn: "03 Aug 2024",
    city: "Las Tablas",
    country: "Panama",
    status: "Inactive",
  },
  {
    id: "9",
    name: "Andrea Vega",
    email: "andrea.vega@example.com",
    phoneNumber: "+507 6200-1009",
    totalPurchase: 4,
    createdOn: "21 Aug 2024",
    city: "Aguadulce",
    country: "Panama",
    status: "Active",
  },
  {
    id: "10",
    name: "Sergio Álvarez",
    email: "sergio.alvarez@example.com",
    phoneNumber: "+507 6200-1010",
    totalPurchase: 6,
    createdOn: "05 Sep 2024",
    city: "Boquete",
    country: "Panama",
    status: "Inactive",
  },
];
