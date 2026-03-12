import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Todos from '../entities/Todo/ui/Todos.tsx'
import TodosFilter from '../entities/Todo/ui/TodosFilter.tsx'

function App() {
	return (
		<>
			<TodosFilter />
			<Todos />
		</>
	)
}

export default App
