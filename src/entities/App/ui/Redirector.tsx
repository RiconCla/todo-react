import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectUser, setUser } from '../../User/model/store/userStore.ts'
import { autoLogin } from '../../../shared/util/autoLogin.ts'
import { Navigate, Outlet, useLocation } from 'react-router'

const Redirector = () => {
	const user = useAppSelector(selectUser)
	const userFromLs = autoLogin()
	const dispatch = useAppDispatch()
	const location = useLocation()
	const userFromLocation = location.pathname //запоминаем откуда пришел юзер

	if (!user && !userFromLs) {
		return <Navigate to="/auth" state={userFromLocation} /> //передаем в стэйт откуда был переход изначально
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
