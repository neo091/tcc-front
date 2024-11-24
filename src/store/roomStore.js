import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRoomStore = create(
  persist((set, get) => ({
    room: {},
    room_id: null,
    setRoom: (room) => set({ room: room, room_id: room.aula_id }),
    getRoom: () => {

    }
  }), { 'name': 'room' })
)
