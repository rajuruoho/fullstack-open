import Person from './Person'

const Persons = ({newSearch, persons}) => {
    const personsToShow = newSearch === '' ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(newSearch.toLowerCase()))  
  
  return (
      <p>{personsToShow.map((person, i) => <Person key={i} person={person}/>)}</p>
  )
}

export default Persons

