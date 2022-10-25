import React from 'react'

const Persons = ({persons, action}) => {
	return (
		<>
		{persons.map((person) => ( 
			<p key={person.id}>{person.name} {person.number} <button onClick={() => action(person.id)}>delete</button> </p>
		))}
		</>
	)
}

export default Persons