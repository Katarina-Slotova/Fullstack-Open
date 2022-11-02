import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from  'react-redux'

const VisibilityFilter = (props) => {
	const dispatch = useDispatch()
	return (
		<div>
		{/* the name attribute of all the radio buttons is the same, they form a button group where only one option can be selected */}
		all 
		<input 
			type="radio" 
			name="filter"
			onChange={() => dispatch(filterChange('ALL'))} 
		/>
		important 
		<input 
			type="radio" 
			name="filter"
			onChange={() => dispatch(filterChange('IMPORTANT'))} 
		/>
		nonimportant 
		<input 
			type="radio" 
			name="filter"
			onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
		</div>
		
	)
}

export default VisibilityFilter