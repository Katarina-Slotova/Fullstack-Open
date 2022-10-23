import {useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
	const languages = Object.values(country.languages)
	const [weather, setWeather] = useState('')
	
	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY
		axios
		.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
		.then(response => {
			setWeather(response.data)
		})
	}, [country.capital])

	console.log("this is weather", weather)

	
	return (
		<>
			<h2 key={country.id}>{country.name.common}</h2>
			<p key={country.id}>capital {country.capital}</p>
			<p key={country.id}>area {country.area}</p>
			<h4>languages</h4>
			<ul>
				{languages.map((language) => 
					<li>{language}</li>
				)}
			</ul>
			<img src={country.flags.png} alt="flag"/>
			<h3>Weather in {country.capital}</h3>
			{weather.length !== 0 ?
				<>
					<p>temperature {weather.main.temp} Celcius</p>
					<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon"/>
					<p>wind {weather.wind.speed} m/s</p>
				</>
			: <p></p>}
		</>
	)
			
}

const ListCountries = ({countries, action}) => {
	if(countries.length > 10){
		return <p>Too many matches, specify another filter</p>
	} else if(countries.length <= 10 && countries.length > 1) {
		return (
			<>
			{countries.map((country) => {
				return (
					<p key={country.id}>{country.name.common} <button onClick={() => action(country.name.common)}>show</button></p>
				)
			})}
			</>
		)
	} else if(countries.length === 1) {
		return (
			<CountryDetails country={countries[0]}/>
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

	console.log(countries)

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
			<ListCountries countries={countriesFound} action={setSearch}/>
		</>
	)
}

export default App;
