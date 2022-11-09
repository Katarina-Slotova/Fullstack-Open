import { createSlice } from '@reduxjs/toolkit'
import adService from '../services/anecdotes'

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

//const getId = () => (100000 * Math.random()).toFixed(0)

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject) */

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		setAnecdotes(state, action) {
			return action.payload
		},
/* 		createAnecdote(state, action) {
			const content = action.payload
			state.push(content)
		}, */
/* 		vote(state, action) {
			const id = action.payload
			const anecdoteToVoteFor = state.find(a => a.id === id)
			const supportedAnecdote = {
				...anecdoteToVoteFor,
				votes: anecdoteToVoteFor.votes + 1
			}
			return state.map(anecdote => 
				anecdote.id !== id ? anecdote : supportedAnecdote
			)
		}, */
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
	},
})

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await adService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await adService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteForAnecdote = (anecdotes, id) => {
	const anecdoteToVoteFor = anecdotes.find(a => a.id === id)
	const supportedAnecdote = {
		...anecdoteToVoteFor,
		votes: anecdoteToVoteFor.votes + 1
	}
	return async dispatch => {
		await adService.vote(supportedAnecdote, id)
		const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === id ? supportedAnecdote : anecdote)
		dispatch(setAnecdotes(updatedAnecdotes))
	}
	
}

export default anecdoteSlice.reducer