const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

const counterReducer = (state = initialState, action) => {
	console.log(state)
	const elements = {...state}
	switch (action.type) {
		case 'GOOD':
			return {good: elements.good + 1}
		case 'OK':
			return {ok: elements.ok + 1}
		case 'BAD':
			return {bad: elements.bad + 1}
		case 'ZERO':
			return {good: 0, ok: 0, bad: 0}
		default: 
			return state
	}
}

export default counterReducer