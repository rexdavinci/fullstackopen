import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from '../reducers/userReducer'
import Button from './Button'

const SignupForm = props => {
  const { signup } = props
  const [username, bindUsername, resetUsername] = useField('')
  const [name, bindFullname, resetFullname] = useField('')
  const [password, bindPassword, resetPassword] = useField('')

  SignupForm.propTypes = {
    signup: PropTypes.func.isRequired
  }

  const handleSignup = async event => {
    event.preventDefault()
    signup({username, name, password})
    resetUsername()
    resetPassword()
    resetFullname()
  }

  return (
    <div className='register-form'>
      <h2>Register</h2>
      <form onSubmit={handleSignup}>
        <div className='form-row'>
          <label htmlFor="username">Username: </label><br/>
          <input {...bindUsername} type='text'/>
        </div>
        <div className='form-row'>
          <label htmlFor='full-name'>Full Name: </label><br/>
          <input {...bindFullname} type='text'/>
        </div>
        <div className='form-row'>
          <label htmlFor="password">Password: </label><br/>
          <input {...bindPassword} type='password'/>
        </div>
        <div className='submit-row'>
          <Button name={'Register'} classStyle={'submit-btn'}/>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authUser: state.users.authUser
  }
}

const mapDispatchToProps = {
  signup
}

const connectedSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

export default connectedSignupForm
