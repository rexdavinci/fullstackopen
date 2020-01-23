import React from 'react'

const Button = ({ method, name }) => {
  return (
    <button onClick={method}>{name}</button>
  )
}

export default Button
