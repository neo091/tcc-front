import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRoomStore = create(
    persist((set, get) => ({
        room: {},
        setRoom: (room) => set({ room: room }),
        getRoom: () => {

        }
    }), { 'name': 'room' })
)
