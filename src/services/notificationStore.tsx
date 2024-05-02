import { create } from "zustand";

interface Notifications {
  plate: string;
  status: string;
  accidentDate: Date;
}

interface NotificationStore {
  notifications: Notifications[];
  newNotification: Notifications;
  setNotifications: (notifications: Notifications[]) => void;
  setNewNotification: (notification: Notifications) => void;
}

const useNotificationStore = create<NotificationStore>(set => ({
  notifications: [],
  newNotification: {plate: "", status: "", accidentDate: new Date()},
  setNotifications: notifications => set({ notifications }),
  setNewNotification: notification => set({ newNotification: notification }),
}));

export default useNotificationStore;
