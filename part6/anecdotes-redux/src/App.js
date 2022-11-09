import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAnecdotes())
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