import { create } from "zustand";

// Tipado del estado global
interface Announcement {
  announcement: {
    isActivated: boolean | null;
    isOk: boolean | null;
    message: string | null;
  };

  setAnnouncement: (announcement: {
    isActivated: boolean | null;
    isOk: boolean | null;
    message: string | null;
  }) => void;
}

// Crear el store
export const useAnnouncement = create<Announcement>((set) => ({
  announcement: {
    isActivated: null,
    isOk: null,
    message: null,
  },

  setAnnouncement: (announcement) => set({ announcement }),
}));
