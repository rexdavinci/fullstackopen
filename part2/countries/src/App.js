import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import FetchACountry from './FetchACountry'
import Countries from './Countries'
import AllCountries from './AllCountries'
import SearchedCountries from './SearchedCountries'
import TooManyCountries from './TooManyCountries'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ searched, setSearched ] = useState([])

  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (e) => {
    const newValue = e.target.value.toLowerCase()
    const newList = countries.filter(country => {
      return country.name.toLowerCase().includes(newValue)
    })
    return setSearched(newList)
  }

  const handleShow = (name)=>{
    const found = searched.filter(country=>country.name === name)
    setSearched(found)
  }

  

  const displayCountries = () => {
    const {length} = searched
    return length === 1 ? (
      <FetchACountry oneCountry={searched[0]}/>
    ): length > 10 ? (
      <TooManyCountries />
      ) : length > 0 ? (
        <SearchedCountries searched={searched} handleShow={handleShow}/>
        ) : (
          <AllCountries countries={countries}/>
        )
  }

  return (
    <div>
      <Filter handleSearch={handleSearch}/>
      <Countries display={displayCountries} />
    </div>
  )
}

export default App