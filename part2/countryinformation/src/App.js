import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [newSearch, setNewSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [matchingCountries, setMatchingCountries] = useState([])

    const buttonClick = (input) => {
      setNewSearch(input)
      setMatchingCountries(countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase())))
    }
    
    useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])
    
    const countMatchingCountries = () => {
        if (matchingCountries.length > 10 || matchingCountries.length == 0) {
            return false
        }
        else
        {
            return true
        }
    }

    const fetchCountryInformation = () => {
        if (matchingCountries.length === 1) {
            const altName = `${matchingCountries[0].name.common}'s flag`

            return (
              <div>
                <h1>{matchingCountries[0].name.common}</h1>
                <p> capital {matchingCountries[0].capital[0]}</p>
                <p>area {matchingCountries[0].area}</p>
                <p><b>languages:</b></p>
                <ul>
                  {Object.values(matchingCountries[0].languages).map((language, i) =>
                    <li key={i}>
                      {language}
                    </li>
                  )}
                </ul>
                <img alt={altName} src={matchingCountries[0].flags.png} />
              </div>
            )
        }
        else
        {
            return (
              <div>
                <ul>
                  {Object.values(matchingCountries).map((country, i) =>
                    <li key={i}>
                      {country.name.common}
                        <button onClick={() => buttonClick(country.name.common)}>
			  show
                        </button>
                    </li>
                  )}
                </ul>
              </div>
            )
        }
    }

    const palautus = () => {
      return (
        <div>
          <p>too many matches, please be more specific</p>
        </div>
      )
    }

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
        setMatchingCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const countriesToShow = countMatchingCountries() ? fetchCountryInformation : palautus

    return (
      <div>
        find countries <input value={newSearch} onChange={handleSearchChange}/>
        <div>{countriesToShow()}</div>
      </div>
    )
}

export default App

