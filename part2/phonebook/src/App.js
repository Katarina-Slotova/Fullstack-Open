import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({persons}) => {
	return (
		<>
		{persons.map((person) => ( 
			<p key={person.id}>{person.name} {person.number}</p>
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
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	const displayFilteredContacts = persons.filter((person) => 
		person.name.toLowerCase().includes(displayFilter.toLowerCase(displayFilter)))

	const addName = (e) => {
		e.preventDefault()
		persons.map((person) => {
			if(person.name === newName)
				alert(`${newName} is already in phonebook`)
			else {
				const newPerson = {
					name: newName,
					number: newNumber,
				}
				setPersons(persons.concat(newPerson))
			}
		})
		setNewName('')
		setNewNumber('')
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
			<Persons persons={displayFilteredContacts} />
		</div>
	)
}

export default App
