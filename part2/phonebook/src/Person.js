import React from 'react'
import Button from './Button'
import personService from './services/person'

const Person = ({searched, setSearched, person, persons, setPersons, setNotification}) => {
  const {name, number, id} = person

  const notify = () => {
    return (
      setSearched(searched.filter(person => person.id !== id)) &&
      setNotification({message: `Entry ${name} deleted successfully`}) &&
      setTimeout(() => {
        setNotification({})
      }, 5000)
    )

  }
  
  const handleDelete = (id, name) => {
    return window.confirm(`Delete ${name}?`) ? (
      personService
      .del(id)
      .then(response=>{
        searched ? notify() : 
          setPersons(persons.filter(person => person.id !== id))
          setPersons(persons.filter(person => person.id !== id))
          setNotification({message: `Entry ${name} deleted successfully`, classType: 'success'})
          setTimeout(() => {
            setNotification({})
          }, 5000);
          
      }).catch(error=>{
        setNotification({message: `Entry ${name} has already been removed from database!`, classType: 'error'})
          setTimeout(() => {
            setNotification({})
          }, 5000);
      })
    ) : ( null )
    
  }

  return (
    <>
      <p>{name} - {number} <Button id={id} name={name} handleClick={handleDelete} text='del'/>
      </p>
    </>
  )
}


export default Person