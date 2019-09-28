import React from 'react'

const PersonForm = ({values})=>{
  const {addOrUpdatePerson, newName, newNumber, handleName, handleNumber} = values
  return(
    <form onSubmit={addOrUpdatePerson}>
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