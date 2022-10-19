const Header = (props) => {
	return (
		<>
			<h1>{props.course.name}</h1>
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
			{props.parts.parts.map((item) => {
				return (
					<>
						<Part part={item.name} exercises={item.exercises}/>
					</>
				)
			})}
		</>
	)
}

const Total = (props) => {
	let sum = 0
	props.total.parts.map((item) => {sum = sum + item.exercises})
	return (
		<>
			<p>Number of exercises {sum}</p>
		</>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}
  
	return (
	  <div>
		<Header course={course}/>
		<Content parts={course}/>
		<Total total={course}/>
	  </div>
	)
  }
  
  export default App