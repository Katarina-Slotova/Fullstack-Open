import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
//import { createStore, combineReducers } from 'redux'
/* import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import noteReducer from './reducers/noteReducer' */

/* const reducer =  combineReducers({
	notes: noteReducer,
	filter: filterReducer
})

const store = createStore(reducer) */

//store moved to its own file
/* const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer
	}
}) */

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
	// remember to hook up store to the app!!!
	<Provider store={store}>
		<App />
	</Provider>
)

/* const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
	root.render(
		// The <Provider> component makes the Redux store available to any nested components that need to access the Redux store
		// If the application has many components which need the store, 
		// the App-component must pass store as props to all of those components
		<Provider store={store}>
			<App />
		</Provider>
	);
}

renderApp()
store.subscribe(renderApp) */