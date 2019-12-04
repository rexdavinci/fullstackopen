import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import loginService from '../services/loginService'

const LoginForm = ({ setAuthUser, setNotify, setBearer }) => {
  const [username, bindUsername, resetUsername] = useField('')
  const [password, bindPassword, resetPassword] = useField('')

  LoginForm.propTypes = {
    setAuthUser: PropTypes.func.isRequired,
    setNotify: PropTypes.func.isRequired
  }

  const handleLogin = async event => {
    event.preventDefault()
    try{
      const result = await loginService.login({ username, password })
      resetUsername()
      resetPassword()
      setAuthUser(result)
      setBearer(`bearer ${result.token}`)
      window.localStorage.setItem(
        'loggedBlogger', JSON.stringify(result)
      )
    }catch(error){
      setNotify({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotify(null)
      }, 5000)
    }
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

export default LoginForm
