import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = props => {
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

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input {...bindUsername} type='text'/>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input {...bindPassword} type='password'/>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
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
