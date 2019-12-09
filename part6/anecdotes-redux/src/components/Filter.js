import React from 'react'
import { filterSet } from '../reducers/filterReducer'
import {connect} from 'react-redux'

const Filter = (props) => {

  const handleChange = event => {
    props.filterSet(event.target.value)
  }
  
  const style = {
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterSet })(Filter)