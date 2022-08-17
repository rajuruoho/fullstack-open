import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
      { name: "Arto Hellas", number: "040-123456" },
      { name: "Ada Lovelace", number: "39-44-5323523" },
      { name: "Dan Abramov", number: "12-43-234345" },
      { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    
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
    
    const handleNameChange = (event) => {setNewName(event.target.value)}
    const handleNumberChange = (event) => {setNewNumber(event.target.value)}
    const handleSearchChange = (event) => {setNewSearch(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newSearch = {newSearch} handleSearchChange={handleSearchChange}/>
      <h2>Add a new</h2>  
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons newSearch={newSearch} persons={persons} />
    </div>
  )

}

export default App

