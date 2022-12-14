//simplify reducer and action creators with Redux toolkit's createSlice function
import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

/* const noteReducer = (state = [], action) => {
	switch(action.type) {
	  case 'NEW_NOTE':
		return state.concat(action.data)
	  case 'TOGGLE_IMPORTANCE': {
		const id = action.data.id
		const noteToChange = state.find(n => n.id === id)
		const changedNote = { 
			...noteToChange, 
			important: !noteToChange.important 
		}
		return state.map(note =>
			note.id !== id ? note : changedNote 
		)
		}
		default:
			return state
	}
} */

/* const initialState = [
	{
		content: 'reducer defines how redux store works',
		important: true,
		id: 1,
	},
	{
		content: 'state of store can contain any data',
		important: false,
		id: 2,
	}
] */

/* const generateId = () =>
	Number((Math.random() * 1000000).toFixed(0)) */

/* // separate creating actions into their own functions
// functions that create actions are called action creators
// keep these where the reducer is defined
// we dispatch action creators when we want to change the state; dispatched from components
export const createNote = (content) => {
	return {
		type: 'NEW_NOTE',
		data: {
			content,
			important: false,
			id: generateId()
		}
	}
}

export const toggleImportanceOf = (id) => {
	return {
		type: 'TOGGLE_IMPORTANCE',
		data: { id }
	}
} */

// create reducer using createSlice function
const noteSlice = createSlice({
	// name parameter defines the prefix which is used in the action's type values
	// for example, the createNote action defined later will have the type value of notes/createNote
	name: 'notes',
	// initialState parameter defines the reducer's initial state
	initialState: [],
	// reducers parameter takes the reducer itself as an object and its functions handle state changes caused by certain action
	reducers: {
		// createNote action creator created by the createSlice function with an asynchronous action creator
		/* createNote(state, action) {
			// action.payload in the function contains the argument provided by calling the action creator,
			// e.g. dispatch(createNote('Redux Toolkit is awesome!'))
			// and dispatch call responds to dispatching the following object: 
			// dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!' })
			const content = action.payload
			state.push(content)
		}, */
		toggleImportanceOf(state, action) {
			const id = action.payload
			const noteToChange = state.find(n => n.id === id)
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important
			}
			return state.map(note => 
				note.id !== id ? note : changedNote
			)
		},
		appendNote(state, action) {
			state.push(action.payload)
		},
		setNotes(state, action) {
			return action.payload
		}
	},
})

// createSlice function returns an object containing the reducer as well as the action creators defined by the reducers parameter
// reducer can be accessed by the noteSlice.reducer property
// action creators by the noteSlice.actions property
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
	// in this inner asynchronous action, the operation first fetches all the notes from the server 
	// and then dispatches the setNotes action, which adds them to the store
	// this allows for App.js to be modified in a way that the communication with the server does not happen inside the functions of the components
	return async dispatch => {
		const notes = await noteService.getAll()
		dispatch(setNotes(notes))
	}
}

export const createNote = (content) => {
	return async dispatch => {
		//first, an asynchronous operation is executed, after which the action changing the state of the store is dispatched
		const newNote = await noteService.createNew(content)
		dispatch(appendNote(newNote))
	}
}

export default noteSlice.reducer