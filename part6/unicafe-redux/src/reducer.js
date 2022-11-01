const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

const counterReducer = (state = initialState, action) => {
	console.log(state)
	switch (action.type) {
		case 'GOOD': {
			const changedRating = {
				...state,
				good: state.good + 1
			}
			return changedRating
		}
		case 'OK': {
			const changedRating = {
				...state,
				ok: state.ok + 1
			}
			return changedRating
		}
		case 'BAD': {
			const changedRating = {
				...state,
				bad: state.bad + 1
			}
			return changedRating
		}
		case 'ZERO': {
			const changedRating = {
				good: 0, 
				ok: 0, 
				bad: 0
			}
			return changedRating
		}
		default: 
			return state
	}
}

export default counterReducer