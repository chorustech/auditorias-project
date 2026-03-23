import { create } from "zustand";

interface DownloadState {
  downloading: boolean;
  progress: number;
  start: () => void;
  setProgress: (p: number) => void;
  finish: () => void;
}

export const useDownloadStore = create<DownloadState>((set) => ({
  downloading: false,
  progress: 0,

  start: () =>
    set({
      downloading: true,
      progress: 0,
    }),

  setProgress: (p) =>
    set({
      progress: p,
    }),

  finish: () =>
    set({
      downloading: false,
      progress: 100,
    }),
}));
