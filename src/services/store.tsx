import { create } from "zustand";

interface RowData {
  email: string;
  lastLocation: string;
  name: string;
  numnber: string;
  plate: string;
  vehicle: string;
}

interface ClientStore {
  clients: RowData[];
  page: number;
  totalPages: number;
  nElements: number;
  setClients: (clients: RowData[]) => void;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setNElements: (nElements: number) => void;
}

const useClientStore = create<ClientStore>(set => ({
  clients: [],
  page: 1,
  totalPages: 10,
  nElements: 10,
  setClients: clients => set({ clients }),
  setPage: page => set({ page }),
  setTotalPages: totalPages => set({ totalPages }),
  setNElements: nElements => set({ nElements }),
}));

export default useClientStore;
