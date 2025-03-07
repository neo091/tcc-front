import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set, get) => ({
    session: [],
    isLogin: false,
    token: null,
    getToken: () => {
      const session = get().session

      if (get().token === null) {
        set({ token: session.token })
      }

      return get().token
    },
    setUserPic: (data)=>{
      const mySession = get().session
      mySession.pic = data
     
      set({session:mySession})
    },
    setUserBg: (data)=>{

      const mySession = get().session
      mySession.bg = data
     
      set({session:mySession})
    },
    setSession: (data) => {
      set({ session: data, token: data.token })
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
