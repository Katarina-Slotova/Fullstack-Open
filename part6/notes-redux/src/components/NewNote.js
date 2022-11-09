import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"

const NewNote = (props) => {
	const dispatch = useDispatch()
	const addNote = async (event) => {
		console.log(event)
		event.preventDefault()
		// get the content of the new note straight from the form field
		// the field has a name, 
		// so we can access the content via the event object event.target.note.value
		const content = event.target.note.value
		event.target.note.value = ''
		// replaced with calling an async function from noteReducer
		/* const newNote = await noteService.createNew(content)
		dispatch(createNote(newNote)) */
		dispatch(createNote(content))
	}

	return (
		<>
			<form onSubmit={addNote}>
				<input name="note"/>
				<button type="submit">add</button>
			</form>
		</>
	)
}

export default NewNote