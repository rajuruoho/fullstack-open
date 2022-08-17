import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState('Finland')
    
    useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])
    
    /*
    const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase()))
    {
        window.alert(`${newName} is already added to phonebook`);
        return
    }
    const noteObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNumber('')
    }
    */

    const handleSearchChange = (event) => {setNewSearch(event.target.value)}

    //ei vielä toimi oikein. Puuttuu, ehto, että milloin näyttää
    const countriesToShow = newSearch === '' ? countries.filter(person => person.name.toLowerCase().includes(newSearch)) : countries

  return (
    <div>
      find countries <input value={newSearch} onChange={handleSearchChange}/>
      <div>
        tahan sitten vaihtuva osio
      </div>
    </div>
  )

}

export default App