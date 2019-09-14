import React from 'react'
import Person from './Person'

const Persons = ({values}) => {
  const {setSearched, searched, setPersons, persons, setNotification} = values

  return searched.length > 0 ? (
    searched.map(person=>{
      return (
        <Person key={person.id} setPersons={setPersons} persons={persons} setSearched={setSearched}searched={searched} person={person} setNotification={setNotification}/>
      )
    })
  ) : (
    persons.map(person=>{
      return (
        <Person key={person.id} setPersons={setPersons} persons={persons} person={person} setNotification={setNotification}/>
      )
    })
  )
}

export default Persons