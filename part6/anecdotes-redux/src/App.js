import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
		<Anecdotes />
      <h2>create new</h2>
		<NewAnecdote />
    </div>
  )
}

export default App