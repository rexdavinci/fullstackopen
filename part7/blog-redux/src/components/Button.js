import React from 'react'

const Button = ({ method, name, classStyle }) => {
  return (
    <button onClick={method} className={classStyle}>{name}</button>
  )
}

export default Button
