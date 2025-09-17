export type ReportingAgentData = {
  id: string;
  name: string;
  email: string;       
  phone: string;       
  photoUrl: string;       
  status: "Active" | "Inactive";          
};

export const reportingAgentsData: ReportingAgentData[] = [
  {
    id: "1",
    name: "Santiago Mendoza",
    email: "santiagom@mail.com",
    phone: "+50768934567",
    photoUrl: "https://placehold.co/80x80",
    status: "Active"
  } ,
  {
    id: "2",
    name: "Alejandro Torres",
    email: "alejandrot@mail.com",
    phone: "+50768934568",
    photoUrl: "https://placehold.co/80x80",
    status: "Active"
  } ,
  {
    id: "3",
    name: "Valeria Castillo",
    email: "valeria.castillo@mail.com",
    phone: "+50768934569",
    photoUrl: "https://placehold.co/80x80",
    status: "Active"
  },
  {
    id: "4",
    name: "Jorge Rios",
    email: "jorge.rios@mail.com",
    phone: "+50768934570",
    photoUrl: "https://placehold.co/80x80",
    status: "Active"
  } 
];