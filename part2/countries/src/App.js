import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Weather = ({ capital, weather }) => {
  if (weather) {
    return (
      <>
        <h3>Weather in {capital}</h3>
        Temperature {weather.temperature} Celsius <br />
        <img src={weather.weather_icons} alt="weather icon" width="100" height="80" />
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState({})

  const params = {
    access_key: 'KEY-CODE',
    query: country.capital
  }

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {params})
      .then(response => {
        setWeather(response.data.current)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [params])

  const languages = country.languages.map(l => <li key={l.iso639_2}>{l.name}</li>)

  const flagOf = `Flag of ${country.name}`

  return (
    <div id="coutrydetails">
      <h1>{country.name}</h1>
      Capital {country.capital}<br />
      Population {country.population}<br />
      <h3>Languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={flagOf} width="100" height="80" />
      <Weather capital={country.capital} weather={weather} />
    </div>
  )
}

const ListOfCountries = ({ countries, onClickShowButton }) => {
  const rows = countries.map(c => 
    <li key={c.numericCode}>
      {c.name} <button onClick={onClickShowButton(c.name)}>Show</button>
    </li>)

  if (countries.length === 0) {
    return (
      <>No countries to show</>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else if (countries.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  }
  return (
    <ul>
      {rows}
    </ul>
  )
}

const App = () => {
  const [ nameFilter, setNameFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleOnClickShowButton = (countryName) => () => {
    setNameFilter(countryName)
  }

  const countriesToShow = countries.filter(c => nameFilter ? 
    c.name.toLowerCase().startsWith(nameFilter.toLowerCase()) : true)
  console.log('render', countriesToShow.length, 'countries')

  return (
    <div>
    <p>Find countries <input value={nameFilter} onChange={handleNameFilterChange}/></p>
    <ListOfCountries countries={countriesToShow} onClickShowButton={handleOnClickShowButton}/>
    </div>
  )
}

export default App;
