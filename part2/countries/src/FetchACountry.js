import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({param}) =>{
  const {temperature, weather_icons, wind_speed, wind_dir} = param.current
  const icons = weather_icons.map(icon=><span key={Math.random()}><img src={icon} alt="weather-icon"/></span>)
  return(
    <>
      <p><b>temperature: </b>{temperature} Celcius</p>
      {icons}
      <p><b>wind: </b>{wind_speed} kph <b>direction: </b>{wind_dir}</p>
    </>
  )
}



const FetchACountry = ({oneCountry}) =>{
  const [currentWeather, setWeather] = useState({})
  const {name, capital, population, languages, flag} = oneCountry
  const allLanguages = languages.map(language=>{
    const {name, iso639_1} = language
    return <li key={iso639_1}>{name}</li>
  })

  useEffect(()=>{
    const params = {
      access_key: '70265775e561eb98f0ebdbcc1f014ba7',
      query: capital
    }
    
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data
        setWeather(apiResponse)
      }).catch(error => {
        console.log(error)
      })
  }, [capital])

  return Object.keys(currentWeather).length === 0 ? (null) : (
    <>
      <h1>{name}</h1>
      <p>capital - {capital}</p>
      <p>capital - {population}</p>
      <h2>Languages</h2>
      <ul>
        {allLanguages}
      </ul>
      <img width="150" height="150" src={flag} alt={name}/>
      <h2>Weather in {capital}</h2>
      <Weather param={currentWeather}/>
    </>
  )
}

export default FetchACountry