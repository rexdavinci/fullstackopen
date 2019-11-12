import React, { useState } from 'react'
import Button from './Button'

const Toggle = (({ label, children }) => {
  const [formVisible, setFormVisible] = useState(false)

  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  const toggleVisibility =() => {
    setFormVisible(!formVisible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <Button method={toggleVisibility} name={label}/>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button method={toggleVisibility} name={'Cancel'}/>
      </div>
    </>
  )
})

export default Toggle