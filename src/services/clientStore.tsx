import { create } from "zustand";

interface RowData {
  email: string;
  lastLocation: string;
  lastUpdated: Date;
  name: string;
  number: string;
  plate: string;
  vehicle: string;
  status: string;
}

interface AccelerationPerTime {
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
  totalElements: number;
  expandedRow: number | null;
  elementsReturned: number;
  statusFilter: string;
  setClients: (clients: RowData[]) => void;
  setImpactData: (impactData: ImpactData) => void;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setNElements: (nElements: number) => void;
  setTotalElements: (totalElements: number) => void;
  setElementsReturned: (elementsReturned: number) => void;
  setExpandedRow: (expandedRow: number | null) => void;
  setStatusFilter: (statusFilter: string) => void;
}

const useClientStore = create<ClientStore>(set => ({
  clients: [],
  impactData: { arising: new Date(), data: [] },
  page: 1,
  totalPages: 10,
  nElements: 10,
  totalElements: 10,
  elementsReturned: 10,
  expandedRow: null,
  statusFilter: "",
  setClients: clients => set({ clients }),
  setImpactData: impactData => set({ impactData }),
  setPage: page => set({ page }),
  setTotalPages: totalPages => set({ totalPages }),
  setNElements: nElements => set({ nElements }),
  setTotalElements: totalElements => set({ totalElements }),
  setElementsReturned: elementsReturned => set({ elementsReturned }),
  setExpandedRow: expandedRow => set({ expandedRow }),
  setStatusFilter: statusFilter => set({ statusFilter }),
}));

export default useClientStore;
