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
    <div className='toggle'>
      <div style={hideWhenVisible} className='toggle-row'>
        { 
          label === 'Login...' || 'New Blog' ? <Button method={toggleVisibility} name={label} classStyle={'primary toggle-row-btn'}/>: 
          <Button method={toggleVisibility} name={label} />
        }
      </div>
      <div style={showWhenVisible}>
        {children}
        <div className='cancel-btn-row'>
          <Button method={toggleVisibility} name={'Cancel'} classStyle={'cancel-btn'}/>
        </div>
      </div>
    </div>
  )

})

export default Toggle