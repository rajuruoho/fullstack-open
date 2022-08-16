import { useState } from 'react'
import Person from './components/Person'

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
    //const names = persons.map(person => person.name)
    //console.log()
    //console.log(persons.map(person => person.name).includes(newName))
    if(persons.map(person => person.name).includes(newName))
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
    //ei tee järkevää
    const handleSearchChange = (event) => {setNewSearch(event.target.value)}

    console.log(persons[1].name.toLocaleLowerCase())
    const personsToShow = newSearch ? persons.filter(person => person.name.toLocaleLowerCase().includes(newSearch)) : persons 

    /*
    const dada () => {
      return
    }
    */

  //<p>{persons.map(person => <Person key={person.id} person ={person}/>)}</p>
  
  return (
    <div>
      <h2>Phonebook</h2>
        filter shown with<input value={newSearch} onChange={handleSearchChange}/>
      <h2>Add a new</h2>  
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> 
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>{personsToShow.map((person, i) => <Person key={i} person={person}/>)}</p>
    </div>
  )

}

export default App
