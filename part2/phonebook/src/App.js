import { useState, useEffect } from 'react'
import pbService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [displayFilter, setDisplayFilter] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		pbService
			.getAll()
			.then(ogNotes => {
				setPersons(ogNotes)
			})
	}, [])

	const deleteContact = (id) => {
		const person = persons.find(person => person.id === id)
		if(window.confirm(`Are you sure you want to delete ${person.name} from your contacts?`)){
			pbService
				.remove(id)
				.then(returnedPerson => {
					setPersons(persons.map(person => person.id === id ? returnedPerson : person))
					setPersons(persons.filter(person => person.id !== id))
					setNotification('Contact was deleted.')
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})
				.catch(error => {
					setErrorMessage(`Information on ${person.name} has already been removed from the server.`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
			}
	}

	const displayFilteredContacts = persons.filter((person) => 
		person.name.toLowerCase().includes(displayFilter.toLowerCase(displayFilter)))

	const updateContact = (id, newNumber) => {
		const person = persons.find(person => person.id === id)
		const changedContact = {...person, number: newNumber}
		
		pbService
			.update(person.id, changedContact)
			.then(returnedPerson => {
				setPersons(persons.map(person => person.id === id ? returnedPerson : person))
				setNewName('')
				setNewNumber('')
				setNotification('Contact number was updated.')
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			})
			.catch(error => {
				setErrorMessage(`Information on ${person.name} has already been removed from the server.`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}
	
	const addName = (e) => {
		const person = persons.find(person => person.name === newName)
		e.preventDefault()
		if (persons.find(person => person.name === newName)){
			if (window.confirm(`${newName} is already in the phonebook. Replace the od number with a new one?`)){
				updateContact(person.id, newNumber)
		}
		} else { 
			const newPerson = {
				name: newName,
				number: newNumber,
			}
	
			pbService
				.create(newPerson)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setNotification(`${newName} was added to the phonebook.`)
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})
		}
	}

	const handleNameAddition = (e) => {
		setNewName(e.target.value)
	}

	const handleNumberAddition = (e) => {
		setNewNumber(e.target.value)
	}

	const handleFilter = (e) => {
		setDisplayFilter(e.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Error message={errorMessage}/>
			<Notification message={notification}/>
			<Filter value={displayFilter} action={handleFilter}/>
			<h3>Add a new contact</h3>
			<PersonForm newName={newName} newNumber={newNumber} functions={[addName, handleNameAddition, handleNumberAddition]}/>
			<h2>Numbers</h2>
			<Persons persons={displayFilteredContacts} action={deleteContact}/>
		</div>
	)
}

export default App
