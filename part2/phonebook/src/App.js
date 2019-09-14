import React, { useState, useEffect} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/person'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searched, setSearched ] = useState([])
  const [ notifyMessage, setNotification ] = useState({message: '', classType: ''})

  useEffect(()=>{
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

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
    const personExists  = persons.find(person=>person.name === newPerson.name)
    return allPersons.includes(newName) ? (
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ? (
        personService
          .update(personExists.id, {...personExists, number: newPerson.number})
          .then(response=>{
            setPersons(persons.map(person => person.id !== personExists.id ? person : response.data))
            setNotification({message: `Entry ${newPerson.name} updated!`, classType: 'success'})
            setTimeout(() => {
              setNotification({})
            }, 5000);
          }).catch(error=>{
            setNotification({message: `Entry ${newPerson.name} has already been removed from database!`, classType: 'error'})
            setTimeout(() => {
              setNotification({})
            }, 5000);
          })
          
        ) : (null)
      ) : (
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person.data))
          setNotification({message: `Entry ${person.data.name} added!`, classType: 'success'})
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotification({})
          }, 5000);
        }).catch(error=>{
          setNotification({message: `Entry ${newPerson.name} has already been removed from database!`, classType: 'error'})
          setTimeout(() => {
            setNotification({})
          }, 5000);
        })
      )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification notification={notifyMessage}/>

      <Filter persons={persons} setSearched={setSearched}/>

      <h2>Add a new contact</h2>
      <PersonForm values={{addPerson, newName, newNumber, handleName, handleNumber}}/>

      <h2>Numbers</h2>
      <Persons values={{setSearched, searched, persons, setPersons, setNotification}} />
    </div>
  )
}

export default App