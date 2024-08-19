import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist((set, get) => ({
        session: [],
        isLogin: false,
        setSession: (data) => {
            set({ session: data })
        },
        setIsLogin: (data) => set({ isLogin: data }),
        resetSession: () => set({ session: [], isLogin: false })

    }), { 'name': 'auth' })
)
