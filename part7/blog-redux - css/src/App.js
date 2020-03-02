import React, { useEffect } from 'react'
import { Route, NavLink } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Button from './components/Button'
import Toggle from './components/Toggle'
import Users from './components/Users'
import User from './components/User'
import { connect } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import { reloadUser } from './reducers/userReducer'

const App = props => {
  const { fetchBlogs, blogs, returningUser, authUser, users } = props

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  useEffect(() => {
    const loggedBlogger = window.localStorage.getItem('loggedBlogger')
    if(loggedBlogger){
      returningUser(loggedBlogger)
    }
  }, [returningUser])

  const logout =() => {
    window.localStorage.clear()
    window.location.href = '/'
  }

  const getById = (id, arr) => arr.find(item=>item.id===id)

  return (
    <div className='App'>
      <nav className='nav'>
        <div className='nav-link-group'>
          <NavLink className='App-logo' to='/'>Erudite</NavLink>
          { authUser ? <NavLink className='nav-link' to='/users'>users</NavLink> : null }
        </div>
        <div className='nav-authentication'>
          {authUser ? <span className='logout'><em>Hi</em>, {authUser.name}<Button method={logout} classStyle={'logout-btn'} name={'Logout'}/></span>: null}
        </div>
      </nav>
      <div className='nav-notification'>
        <Notification />
      </div>
      {
        !authUser ?
          <div className='App'>
            <div className='login-view'>
              <Toggle label='Login...'>
                <LoginForm />
              </Toggle>
            </div>
          </div> :
          <div className='App'>
            <div className='main'>
              <Route exact path='/' render={()=> <Blogs />} />
              <Route exact path='/users' render={()=> <Users />} />
              <Route exact path='/users/:id' render={({match})=> <User user={getById(match.params.id, users)}/>} />
              <Route exact path='/blogs/:id' render={({match})=> <Blog blog={getById(match.params.id, blogs)}/>} />
            </div>
          </div>
      }
    </div>
  )
    
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    authUser: state.users.authUser,
    users: state.users.usersList
  }
}

const mapDispatchToProps = {
  fetchBlogs: getBlogs,
  returningUser: reloadUser
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default connectedApp

