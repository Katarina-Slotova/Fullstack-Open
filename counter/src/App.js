/* import { createStore } from 'redux'

const App = () => {

	// action = a plain JS object that has a type field 
	// action = an event that describes something that happened in the application
	// type field should be a string that gives this action a descriptive name, tells about the specific thing that happend
	// action object can have other fields with additional information about what happened; by convention, we put that information in a field called payload
	const addTodoAction = {
		type: 'INCREMENT'
		// payload: 'Buy milk'
	}

	// reducer is a function that receives the current state in the store and an action object, 
	// decides how to update the state if necessary,
	// and returns the new state: (state, action) => newState
	// reducer = an event listener which handles events based on the received action (event) type.
	// reducer is most commpnly written with switch statement
	// reducer is never supposed to be called directly from the applications code,
	// reducer is only given as a parameter to the createStore-function which creates the store
	const counterReducer = (state = 0, action) => {
		switch (action.type) {
			case 'INCREMENT':
				return state + 1
			case 'DECREMENT':
				return state - 1
			case 'ZERO':
				return 0
			default:
				return state
		}
	}

	// store uses the reducer to handle actions, 
	const store = createStore(counterReducer)

	//which are dispatched or 'sent' to the store with its dispatch-method
	store.dispatch({ type: 'INCREMENT' })

	// find out the state of the store using the method getStat:
 	console.log(store.getState())
	store.dispatch({ type: 'INCREMENT' })
	store.dispatch({ type: 'INCREMENT' })
	store.dispatch({ type: 'INCREMENT' })
	console.log(store.getState())
	store.dispatch({ type: 'ZERO' })
	store.dispatch({ type: 'DECREMENT' })
	console.log(store.getState())

	// subscribe method which is used to create callback functions the store calls whenever an action is dispatched to the store
	store.subscribe(() => {
		const storeNow = store.getState()
		console.log(storeNow)
	})
	return (
		<>

		</>
	);
}

export default App;
 */