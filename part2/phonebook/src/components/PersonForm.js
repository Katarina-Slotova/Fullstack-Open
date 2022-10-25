import React from 'react'

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

export default PersonForm