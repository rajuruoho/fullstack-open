import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [newSearch, setNewSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [matchingCountries, setMatchingCountries] = useState([])
    
    useEffect(() => {
      axios
        //pitäsköhän tää hakea omalta JSON servulta kuitenkin?
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])
    
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
        setMatchingCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const countMatchingCountries = () => {
      console.log(matchingCountries.length)
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
                  {matchingCountries[0].languages.map((i, language) =>
                    <li key={i}>
                      {language[i]}
                    </li>
                  )}
                </ul>
                  <ul>
                  <li>{matchingCountries[0].languages.fin}</li>
                </ul>

        */	

    const fetchCountryInformation = () => {
      //console.log(matchingCountries[0].languages[0])
        if (matchingCountries.length === 1) {
            return (
              <div>
                <h1>{matchingCountries[0].name.common}</h1>
                <p> capital {matchingCountries[0].capital[0]}</p>
                <p>area {matchingCountries[0].area}</p>
                <p><b>languages:</b></p>
                <img alt={matchingCountries[0].name.common} flag src={matchingCountries[0].flags.png} />
              </div>
            )
        }
        else
        {
            return (
              <div>
                <p>"maita ois täs"</p>
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

    //ei vielä toimi oikein. Puuttuu, ehto, että milloin näyttää
    const countriesToShow = countMatchingCountries ? fetchCountryInformation : palautus
  return (
    <div>
      find countries <input value={newSearch} onChange={handleSearchChange}/>
      <div>{countriesToShow()}</div>
    </div>
  )
}

export default App
