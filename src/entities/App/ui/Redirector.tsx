import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectUser, setUser } from '../../User/model/store/userStore.ts'
import { autoLogin } from '../../../shared/util/autoLogin.ts'
import { Navigate, Outlet } from 'react-router'

const Redirector = () => {
	const user = useAppSelector(selectUser)
	const userFromLs = autoLogin()
	const dispatch = useAppDispatch()

	if (!user && !userFromLs) {
		return <Navigate to="/auth" />
	}

	if (!user && userFromLs) {
		dispatch(setUser(userFromLs))
	}
	return (
		<div>
			<Outlet />
		</div>
	)
}

export default Redirector
