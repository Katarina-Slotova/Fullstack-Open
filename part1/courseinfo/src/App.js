const Header = (props) => {
	return (
		<>
			<h1>{props.course}</h1>
		</>
	)
}

const Part = (props) => {
	return (
		<>
			<p>
				{props.part} {props.exercises}
			</p>
		</>
	)
}

const Content = (props) => { 
	return (
		<>
			{props.contents.details.map((item) => {
				return (
					<>
						<Part part={item.part} exercises={item.exercises}/>
					</>
				)
			})}
		</>
	)
}

const Total = (props) => {
	let sum = 0
	props.total.details.map((item) => {sum = sum + item.exercises})
	return (
		<>
			<p>Number of exercises {sum}</p>
		</>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const courseinfo = {
		details: [
			{
				part: 'Fundamentals of React',
				exercises: 10
			},
			{
				part: 'Using props to pass data',
				exercises: 7
			},
			{
				part: 'State of a component',
				exercises: 14
			}
		]
	}
  
	return (
	  <div>
		<Header course={course}/>
		<Content contents={courseinfo}/>
		<Total total={courseinfo}/>
	  </div>
	)
  }
  
  export default App