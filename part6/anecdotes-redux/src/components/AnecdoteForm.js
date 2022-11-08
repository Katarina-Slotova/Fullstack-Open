import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import adService from '../services/anecdotes'

const NewAnecdote = (props) => {
	const dispatch = useDispatch()
	const addAnecdote = async (e) => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		const newAnecdote = await adService.createNew(content)
		dispatch(createAnecdote(newAnecdote))
	}
	return (
		<>
			<form onSubmit={addAnecdote}>
				<div><input name="anecdote" /></div>
				<button type="submit">create</button>
			</form>
		</>
	)
}

export default NewAnecdote

