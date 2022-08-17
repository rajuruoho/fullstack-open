import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [newSearch, setNewSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [matchingCountries, setMatchingCountries] = useState([])
    
    useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])
    
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
        setMatchingCountries(countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase())))
    }

    const countMatchingCountries = () => {
        if (matchingCountries.length > 10 || matchingCountries.length == 0) {
            return false
        }
        else
        {
            return true
        }
    }
	/*
                <ul>
                  {matchingCountries[0].languages.map((language, i) =>
                    <li key={i}>
                      {language[i]}
                    </li>
                  )}
                </ul>
        */	

    const fetchCountryInformation = () => {
        if (matchingCountries.length == 1) {
            return (
              <div>
                <h1>{matchingCountries[0].name.common}</h1>
                <p> capital {matchingCountries[0].capital[0]}</p>
                <p>area {matchingCountries[0].area}</p>
                <img alt={matchingCountries[0].name.common} flag src={matchingCountries[0].flags[0]} />
              </div>
            )
        }
        else
        {
            return (
              <p>"maita ois täs"</p>
            )
        }
    }

    //ei vielä toimi oikein. Puuttuu, ehto, että milloin näyttää
    const countriesToShow = countMatchingCountries ? fetchCountryInformation : "too many matches, please be more specific"

  return (
    <div>
      find countries <input value={newSearch} onChange={handleSearchChange}/>
      <div>{countriesToShow()}</div>
    </div>
  )
}

export default App
