import React from 'react'

const Button = ({handleClick, text, id, name}) => {
  return (
    <button onClick={()=>handleClick(id, name)}>{text}</button>
  )
}

export default Button
