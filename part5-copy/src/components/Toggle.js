/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Toggle = React.forwardRef((props, ref) => {
  const { label, children } = props
  const [visible, setVisible] = useState(false)

  Toggle.propTypes = {
    label: PropTypes.string.isRequired
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility =() => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return toggleVisibility
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button method={toggleVisibility} name={label}/>
      </div>
      <div style={showWhenVisible} className='toggleContent'>
        {children}
        <Button method={toggleVisibility} name={'Cancel'}/>
      </div>
    </>
  )

})

export default Toggle