import { create } from "zustand";

interface Notifications {
  plate: string;
  status: string;
}

interface NotificationStore {
  notifications: Notifications[];
  setNotifications: (notifications: Notifications[]) => void;
}

const useNotificationStore = create<NotificationStore>(set => ({
  notifications: [],
  setNotifications: notifications => set({ notifications }),
}));

export default useNotificationStore;