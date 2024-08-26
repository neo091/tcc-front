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
        resetSession: () => set({ session: [], isLogin: false }),
        accountType: () => {
            const { isLogin, session } = get()

            if (isLogin) {
                const { type } = session
                return type === 1 ? 'Student' : type === 2 ? 'Teacher' : ''
            }

            return 'Invalid'

        }

    }), { 'name': 'auth' })
)
