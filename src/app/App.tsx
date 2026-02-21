import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Todos from '../entities/Todo/ui/Todos.tsx'

function App() {
	//const user = useAppSelector(selectUser)

	return (
		<>
			<Todos />
		</>
	)
	// return <>{user ? <Todos /> : <Auth />}</>
}

export default App
