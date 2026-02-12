import type { UserType } from '../userType.ts'
import { autoLogin } from '../../../../shared/util/autoLogin.ts'
import { type PropsWithChildren, useState } from 'react'
import { UserContext } from './UserContex.tsx'

export const UserProvider = ({ children }: PropsWithChildren) => {
	const userFromLS = autoLogin()
	const [user, setUser] = useState<UserType | undefined>(userFromLS)

	const handleSetUser = (user?: UserType) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
			setUser(user)
		} else {
			localStorage.removeItem('user')
			setUser(undefined)
		}
	}

	return <UserContext.Provider value={{ user, setUser: handleSetUser }}>{children}</UserContext.Provider>
}
