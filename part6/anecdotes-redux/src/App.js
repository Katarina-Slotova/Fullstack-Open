import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'
import adService from './services/anecdotes'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		adService
			.getAll()
			.then(anecdotes => dispatch(setAnecdotes(anecdotes)))
	}, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
	  	<Notification />
		<Anecdotes />
      <h2>create new</h2>
		<NewAnecdote />
    </div>
  )
}

export default App