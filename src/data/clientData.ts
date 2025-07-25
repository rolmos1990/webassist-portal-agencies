export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalPurchase: string;
  createdOn: string;
  city: string;
  country: string;
  status: 'Activo' | 'Inactivo';
};

export const clientData: Client[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+507 6000-0001',
    totalPurchase: '$1200',
    createdOn: '2024-06-01',
    city: 'Panamá',
    country: 'Panamá',
    status: 'Activo',
  },
  {
    id: 2,
    name: 'Ana Gómez',
    email: 'ana.gomez@example.com',
    phone: '+507 6000-0002',
    totalPurchase: '$850',
    createdOn: '2024-05-15',
    city: 'David',
    country: 'Panamá',
    status: 'Inactivo',
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    phone: '+507 6000-0003',
    totalPurchase: '$3000',
    createdOn: '2024-07-10',
    city: 'Colón',
    country: 'Panamá',
    status: 'Activo',
  },
  {
    id: 4,
    name: 'María Torres',
    email: 'maria.torres@example.com',
    phone: '+507 6000-0004',
    totalPurchase: '$450',
    createdOn: '2024-04-20',
    city: 'Chitré',
    country: 'Panamá',
    status: 'Activo',
  },
  {
    id: 5,
    name: 'Luis Martínez',
    email: 'luis.martinez@example.com',
    phone: '+507 6000-0005',
    totalPurchase: '$1750',
    createdOn: '2024-03-05',
    city: 'Santiago',
    country: 'Panamá',
    status: 'Inactivo',
  },
];
