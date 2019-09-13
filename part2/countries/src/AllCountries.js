import React from 'react'

const AllCountries = ({countries}) => {
  return countries.map(country=><p key={country.alpha3Code}>{country.name}</p>)
}

export default AllCountries
