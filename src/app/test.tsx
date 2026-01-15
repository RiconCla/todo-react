import { useState } from 'react'

function TotalLength() {
	const [items, setItems] = useState([])
	const [text, setText] = useState('')

	const addItem = () => {
		setItems((prev) => [...prev, text]) // твой код
		setText('')
	}

	const totalLength = items.join('').length

	return (
		<div>
			<input value={text} onChange={(e) => setText(e.target.value)} placeholder="Слово" />

			<button onClick={addItem}>Добавить</button>

			<ul>
				{items.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>

			<p>Всего символов: {totalLength}</p>
		</div>
	)
}

export default TotalLength
