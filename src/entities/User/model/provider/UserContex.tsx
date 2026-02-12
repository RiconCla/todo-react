import { createContext, useContext } from 'react'
import type { UserType } from '../userType.ts'

type UserContext = {
	user: UserType | undefined
	setUser: (user: UserType | undefined) => void
}

export const UserContext = createContext<UserContext>({
	user: undefined,
	setUser: () => {},
})

export const useUserStore = () => {
	return useContext(UserContext)
}
