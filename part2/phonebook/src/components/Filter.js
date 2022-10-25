import React from 'react'

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

export default Filter