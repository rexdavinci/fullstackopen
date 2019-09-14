import React from 'react'

const Filter = ({persons, setSearched}) =>{

  const handleSearch = (e) => {
    const newValue = e.target.value.toLowerCase()
    const newList = persons.filter(person => {
      return person.name.toLowerCase().includes(newValue)
    })
    return setSearched(newList)
  }

  return(
    <div>
      filter shown with <input onChange={handleSearch}/>
    </div>
  )
}

export default Filter