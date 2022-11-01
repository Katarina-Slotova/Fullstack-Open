import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
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
store.subscribe(renderApp)