import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [newSearch, setNewSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [matchingCountries, setMatchingCountries] = useState([])
    const [currentWeather, setCurrentWeather] = useState(0)

    const api_key = process.env.REACT_APP_API_KEY

    const getCurrentWeather = (capital) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`

        // avoid spamming the API with duplicate requests
        if (currentWeather == 0) {
          axios
            .get(`${url}`)
            .then(response => {
              setCurrentWeather(response.data)
            })
        }
        else
        {
          if (currentWeather.name !== capital) {
            axios
              .get(`${url}`)
              .then(response => {
                setCurrentWeather(response.data)
              })
          }
        }
    }

    const valueChangeHandle = (inputCountryName) => {
        setNewSearch(inputCountryName)
        const countryList = countries.filter(country => country.name.common.toLowerCase().includes(inputCountryName.toLowerCase()))
        if (countryList.length == 1) {
            getCurrentWeather(countryList[0].capital[0])
        }
        setMatchingCountries(countryList)
    }

    const handleSearchChange = (event) => {
        valueChangeHandle(event.target.value)
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

            if (currentWeather !== 0) {
            const imageURL = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
            const celsiusTemperature = (currentWeather.main.temp - 273.15).toFixed(2)
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
                  <h2>Weather in {matchingCountries[0].capital[0]}</h2>
                  <p>temperature {celsiusTemperature} Celsius </p>
                  <img alt={"weather icon"} src={imageURL} />
                  <p>wind {currentWeather.wind.speed} m/s </p>
                </div>
              )
	    }
            else
            {
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
        }
        else
        {
            return (
              <div>
                <ul>
                  {Object.values(matchingCountries).map((country, i) =>
                    <li key={i}>
                      {country.name.common}
                        <button onClick={() => valueChangeHandle(country.name.common)}>
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

    const countriesToShow = countMatchingCountries() ? fetchCountryInformation : palautus

    return (
      <div>
        find countries <input value={newSearch} onChange={handleSearchChange}/>
        <div>{countriesToShow()}</div>
      </div>
    )
}

export default App

