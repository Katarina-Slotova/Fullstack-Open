import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer" 

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div >
			<div>
				<div>
					{anecdote.content}
				</div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const Anecdotes = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	const result = Array.from(anecdotes)
	result.sort((a, b) => (a.votes < b.votes ? 1 : -1))

	return (
		<>
			{result.map(anecdote =>
				<Anecdote 
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() =>{
						dispatch(vote(anecdote.id))
						dispatch(setNotification(`you voted '${anecdote.content}'`))
					}
					}
				/>
			)}
		</>
	)
}

export default Anecdotes