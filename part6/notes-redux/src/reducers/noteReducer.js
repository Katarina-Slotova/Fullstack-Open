const noteReducer = (state = [], action) => {
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
}

const generateId = () =>
	Number((Math.random() * 1000000).toFixed(0))

// separate creating actions into their own functions
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
}

export default noteReducer