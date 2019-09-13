import React from 'react'

const PersonForm = ({values})=>{
  const {addPerson, newName, newNumber, handleName, handleNumber} = values
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleName}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm