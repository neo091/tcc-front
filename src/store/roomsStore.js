import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRoomsStore = create(
    persist((set, get) => ({
        rooms: [],
        isNew: true,
        setRooms: (data) => {
            set({ rooms: data, isNew: false })
        },
        setIsNew: (data) => { set({ isNew: data }) }
    }), { 'name': 'rooms' })
)
