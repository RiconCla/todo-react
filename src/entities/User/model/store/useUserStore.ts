import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UserType } from '../userType.ts'

type UserStore = {
	user: UserType | null
	setUser: (user: null | { username: string; access_token: string }) => void
	clearUser: () => void
}

export const useUserStore = create<UserStore>()(
	devtools((set) => {
		return {
			user: null,
			setUser: (user: UserType | null) => set({ user }),
			clearUser: () => set({ user: null }),
		}
	})
)
