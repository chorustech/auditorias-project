import { create } from "zustand";

interface MessageUpdated {
  kind: "AGREGADO" | "ACTUALIZADO" | "ELIMINADO" | "FILTRADO";
}

interface MessageUpdatedStore {
  message: MessageUpdated | null;
  setMensaje: (data: MessageUpdated) => void;
}

export const useMessageUpdated = create<MessageUpdatedStore>((set) => ({
  message: null,
  setMensaje: (data: MessageUpdated) => set({ message: data }),
}));
