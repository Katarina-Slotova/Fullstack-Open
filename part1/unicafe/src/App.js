import { useState } from 'react'

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
	return (
		<>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</>
	)
}

const Statistics = ({good, neutral, bad, allFeedback}) => {
	if (allFeedback === 0) {
		return (
			<>
				no feedback submitted yet
			</>
		)
	}
	return (
		<>
			<table>
				<tbody>
					<StatisticLine text="good" value ={good} />
					<StatisticLine text="neutral" value ={neutral} />
					<StatisticLine text="bad" value ={bad} />
					<StatisticLine text="all" value ={allFeedback} />
					<StatisticLine text="average" value ={(good - bad) / allFeedback} />
					<StatisticLine text="positive" value ={((good / allFeedback) * 100) + ' %'} />
				</tbody>
			</table>
		</>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [allFeedback, setFeedback] = useState(0);

	const handleGood = () => {
		setGood(good + 1)
		setFeedback(allFeedback + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
		setFeedback(allFeedback + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
		setFeedback(allFeedback + 1)
	}

	return (
		<>
			<h1>give feedback</h1>
			<Button handleClick={handleGood} text='good'/>
			<Button handleClick={handleNeutral} text='neutral'/>
			<Button handleClick={handleBad} text='bad'/>
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} allFeedback={allFeedback}/>
		</>
	)
}

export default App;
