import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist((set, get) => ({
        session: [],
        isLoggin: false,
        setSession: (data) => {
            set({ session: data })
        },
        setIsLoggin: (data) => set({ isLoggin: data }),
        resetSession: () => set({ session: [], isLoggin: false })

    }), { 'name': 'auth' })
)
