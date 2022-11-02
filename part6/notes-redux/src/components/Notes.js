import { toggleImportanceOf } from "../reducers/noteReducer"
import { useDispatch, useSelector } from "react-redux"

const Note = ({note, handleClick}) => {
	return (
		<li onClick={handleClick}>
			{note.content} <strong>{note.important ? 'important' : ''}</strong>
		</li>
	)
}

const Notes = () => {
	const dispatch = useDispatch()
	const notes = useSelector((state) => {
		return state
	})
	return (
		<ul>
			{notes.map(note =>
				<Note 
					key={note.id}
					note={note}
					handleClick={() =>
						dispatch(toggleImportanceOf(note.id))
					}
				/>
			)}
		</ul>
	)
}

export default Notes