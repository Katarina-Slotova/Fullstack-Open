import {useState, useEffect} from 'react'
import axios from 'axios'

const ListCountries = ({countries}) => {
	if(countries.length > 10){
		return <p>Too many matches, specify another filter</p>
	} else if(countries.length <= 10 && countries.length > 1) {
		return (
			<>
			{countries.map((country) => {
				return (
					<p key={country.id}>{country.name.common}</p>
				)
			})}
			</>
		)
	} else if(countries.length === 1) {
		return (
			<>
			{countries.map((country) => {
				return (
					<p key={country.id}>{country.name.common}</p>
				)
			})}
			</>
		)
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	console.log("List of countries ", countries)

	let countriesFound = []

	if (search === '')
		countriesFound = []
	else {
		countriesFound = countries.filter((country) => 
			country.name.common.toLowerCase().includes(search.toLowerCase(search)))
	}

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}
	return (
		<>
			<p>find countries <input value={search} onChange={handleSearch}/></p>
			<ListCountries countries={countriesFound}/>
		</>
	);
}

export default App;
