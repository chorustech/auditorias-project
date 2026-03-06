import { create } from "zustand";

// Tipado del estado global
interface Announcement {
  isActivated: boolean | null;
  isOk: boolean | null;
  message: string | null;
  setAnnouncement: (
    isActivated: boolean,
    isOk: boolean,
    message?: string,
  ) => void;
}

// Crear el store
export const useAnnouncement = create<Announcement>((set) => ({
  isActivated: null,
  isOk: null,
  message: null,
  setAnnouncement: (isActivated, isOk, message = "") =>
    set({
      isActivated,
      isOk,
      message,
    }),
}));
