import { useState, useEffect } from 'react'
import pbService from './services/persons'

const Filter = ({value, action}) => {
	return (
		<>
		filter shown with <input 
				value={value}
				onChange={action}
			/>
		</>
	)
}

const PersonForm = ({newName, newNumber, functions}) => {
	return (
		<>
		<form onSubmit={functions[0]}>
			<div>
				name: <input 
						value={newName}
						onChange={functions[1]}
					/>
			</div>
			<div>
				number: <input 
							value={newNumber}
							onChange={functions[2]}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
		</>
	)
}


const Persons = ({persons, action}) => {
	return (
		<>
		{persons.map((person) => ( 
			<p key={person.id}>{person.name} {person.number} <button onClick={() => action(person.id)}>delete</button> </p>
		))}
		</>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [displayFilter, setDisplayFilter] = useState('')

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
			<Filter value={displayFilter} action={handleFilter}/>
			<h3>Add a new contact</h3>
			<PersonForm newName={newName} newNumber={newNumber} functions={[addName, handleNameAddition, handleNumberAddition]}/>
			<h2>Numbers</h2>
			<Persons persons={displayFilteredContacts} action={deleteContact}/>
		</div>
	)
}

export default App
