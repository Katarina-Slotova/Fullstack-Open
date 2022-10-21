import React from 'react';

const Header = ({name}) => (
	<>
		<h2>{name}</h2>
	</>
)

const Part = ({part}) => {
	return (
		<>
			<p>{part.name} {part.exercises}</p>
		</>
	)
}

const Content = ({parts}) => {
	return (
	<>
		{parts.map(part => {
				return (
					<div key={part.id}>
						<Part part={part}/>
					</div>
					)
				}
			)
		}
	</>
	)
}

const Total = ({total}) => {
	const sum = total.reduce((sum, item) => {
		return sum + item.exercises
	}, 0)
	return (
		<>
			<b>total of {sum} exercises</b>
		</>
	)
}

const Course = ({course}) => {
	return (
		<>
			<Header name={course.name}/>
			<Content parts={course.parts}/>
			<Total total={course.parts}/>
	 	</>
	)
}

export default Course