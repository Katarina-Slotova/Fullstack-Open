import { toggleImportanceOf } from "./reducers/noteReducer"
import { useSelector, useDispatch } from 'react-redux' // import hooks from react-redux library
import NewNote from './components/NewNote'

// useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js
// component can access the notes stored in the store with the useSelector-hook of the react-redux library; it receives a function as a parameter
// we need all of the notes, so our selector function returns the whole stat, but it can also search for or select data from the redux-storee

const App = () => {
	const dispatch = useDispatch()
	// const importantNotes = useSelector(state => state.filter(note => note.important)) --> this is how useSelector can filter out the result
	const notes = useSelector((state) => {
		return state
	})
	// to add a note, dispatch the action for adding notes --> moved to a separate component
/* 	const addNote = (event) => {
		console.log(event)
		event.preventDefault()
		// get the content of the new note straight from the form field
		// the field has a name, 
		// so we can access the content via the event object event.target.note.value
		const content = event.target.note.value
		event.target.note.value = ''
		dispatch(createNote(content))
	} */

	// event handler for changing the importance of a note
	const toggleImportance = (id) => {
		dispatch(toggleImportanceOf(id))
	}

	return (
		<div>
			{/* form moved to separate component NewNote */}
{/* 			<form onSubmit={addNote}>
				<input name="note" />
				<button type="submit">add</button>
			</form> */}
			<NewNote />
			<ul>
				{notes.map(note =>
				<li
					key={note.id}
					onClick={() => toggleImportance(note.id)}
				>
					{note.content} <strong>{note.important ? 'important' : ''}</strong>
				</li>
				)}
			</ul>
		</div>
	)
}

export default App;