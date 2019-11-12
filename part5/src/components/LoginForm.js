import React from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const LoginForm = ({ setAuthUser, setNotify, setUser, user }) => {


  const handleUser = async({ target }) => {
    if(target.type === 'text'){
      setUser({ ...user, username: target.value })
    } else{
      setUser({ ...user, password: target.value })
    }
  }

  const handleLogin =async (event) => {
    event.preventDefault()
    try{
      const { username, password } = user
      const result = await loginService.login({ username, password })
      blogService.setToken(result.token)
      setAuthUser(result)
      setUser({ username: '', password: '' })
      window.localStorage.setItem(
        'loggedBlogger', JSON.stringify(result)
      )
    }catch(exception){
      setNotify({ message: 'Incorrect credentials or combination', type: 'error' })
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
          <input type="text" value={user.username} onChange={handleUser}/>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" value={user.password} onChange={handleUser}/>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
