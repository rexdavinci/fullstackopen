import React from 'react'

const SearchedCountries = ({searched, handleShow})=> {
  return searched.map(country=>{  
    const {alpha3Code, name} = country        
    return (
      <span key={alpha3Code}>
        <p>{name} <button onClick={()=>handleShow(name)}>show</button></p>
      </span>
    )
  })
}

export default SearchedCountries
