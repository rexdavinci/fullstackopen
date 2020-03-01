import React, { useState } from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import Button from './Button'
import SignupForm from './SignupForm'

const LoginForm = props => {
  const [register, setRegister] = useState(false)
  const { login } = props
  const [username, bindUsername, resetUsername] = useField('')
  const [password, bindPassword, resetPassword] = useField('')

  LoginForm.propTypes = {
    login: PropTypes.func.isRequired
  }

  const handleLogin = async event => {
    event.preventDefault()
    login({username, password})
    resetUsername()
    resetPassword()
  }

  const toggleRegister = () => {
    setRegister(!register)
  }

  return (
    <>
    {
      !register ? <div className='login-form'>
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <div className='form-row'>
            <label htmlFor="username">Username: </label><br/>
            <input {...bindUsername} type='text'/>
          </div>
          <div className='form-row'>
            <label htmlFor="password">Password: </label><br/>
            <input {...bindPassword} type='password'/>
          </div>
          <div className='submit-row'>
            <Button name={'Login'} classStyle={'submit-btn'}/>
          </div>
        </form>
      </div> : <SignupForm setRegister={setRegister}/>
    }
    <div className='submit-row'>
      <Button name={ register ? 'Login' : 'Signup'} classStyle={'signup-btn'} method={toggleRegister}/>
    </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    authUser: state.users.authUser
  }
}

const mapDispatchToProps = {
  login
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm
