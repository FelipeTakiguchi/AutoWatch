import { create } from "zustand";

interface RowData {
  email: string;
  lastLocation: string;
  name: string;
  numnber: string;
  plate: string;
  vehicle: string;
}

interface AccelerationPerTime{
  acceleration: number,
  time: number,
}

interface ImpactData {
  arising: Date;
  data: AccelerationPerTime[];
}

interface ClientStore {
  clients: RowData[];
  impactData: ImpactData;
  page: number;
  totalPages: number;
  nElements: number;
  setClients: (clients: RowData[]) => void;
  setImpactData: (impactData: ImpactData) => void;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setNElements: (nElements: number) => void;
}

const useClientStore = create<ClientStore>(set => ({
  clients: [],
  impactData: {arising: new Date(), data: []},
  page: 1,
  totalPages: 10,
  nElements: 10,
  setClients: clients => set({ clients }),
  setImpactData: impactData => set({ impactData }),
  setPage: page => set({ page }),
  setTotalPages: totalPages => set({ totalPages }),
  setNElements: nElements => set({ nElements }),
}));

export default useClientStore;
