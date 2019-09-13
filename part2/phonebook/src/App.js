import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searched, setSearched ] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleSearch = (e) => {
    const newValue = e.target.value.toLowerCase()
    const newList = persons.filter(person => {
      return person.name.toLowerCase().includes(newValue)
    })
    return setSearched(newList)
  }

  const handleName = (e)=>{
    setNewName(e.target.value)
  }

  const handleNumber =(e)=>{
    setNewNumber(e.target.value)
  }
  

  const addPerson=(e)=>{
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const allPersons = persons.map(person=>person.name)
    allPersons.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const displayPersons = () => {
    return searched.length > 0 ? (
      searched.map(person=><p key={person.name}>{person.name} - {person.number}</p>)
      ) : (
        persons.map(person=><p key={person.name}>{person.name} - {person.number}</p>)
        )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch}/>

      <h2>Add a new contact</h2>
      <PersonForm values={{addPerson, newName, newNumber, handleName, handleNumber}}/>

      <h2>Numbers</h2>
        <Persons display={displayPersons} />
    </div>
  )
}

export default App