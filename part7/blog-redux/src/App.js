import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
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

  return !authUser ?
    <div className='App'>
      <Notification />
      <Toggle label='Login...'>
        <LoginForm />
      </Toggle>
    </div> :
    <Router>
      <div className='App'>
        <>
          <nav className='nav'>
            <div className='nav-link-group'>
              <NavLink className='App-logo' to='/'>Blog App</NavLink>
              <NavLink className='navLink' to='/users'>users</NavLink>
            </div>
            <div className='nav-notification'>
              <Notification />
            </div>
            <div className='nav-authentication'>
              <span className='logout'>logged in as {authUser.name}<Button method={logout} name={'Logout'}/></span>
            </div>
          </nav>
          <div className='main'>
            <Route exact path='/' render={()=> <Blogs />} />
            <Route exact path='/users' render={()=> <Users />} />
            <Route exact path='/users/:id' render={({match})=> <User user={getById(match.params.id, users)}/>} />
            <Route exact path='/blogs/:id' render={({match})=> <Blog blog={getById(match.params.id, blogs)}/>} />
          </div>
        </>
      </div>
    </Router>
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

