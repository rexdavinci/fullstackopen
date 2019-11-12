import React, { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogService'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Button from './components/Button'
import Toggle from './components/Toggle'

const App =() => {
  const [blogs, setBlogs] = useState([])
  const [notify, setNotify] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [user, setUser] = useState({ username: '', password: '' })
  const [notCreating, setCreating] = useState(true)

  useEffect(() => {
    blogService
      .getBlogs()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedBlogger = window.localStorage.getItem('loggedBlogger')
    if(loggedBlogger){
      const currentUser = JSON.parse(loggedBlogger)
      setAuthUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

  const logout =() => {
    window.localStorage.clear()
    window.location.href = '/'
  }

  const sortByLikes=(blog1,blog2) => {
    if(blog1.likes < blog2.likes) return 1
    if(blog1.likes === blog2.likes) return 0
    if(blog1.likes > blog2.likes) return -1
  }

  const sortedArray = blogs.sort(sortByLikes)
  return authUser === null ?
    <div>
      <Notification notify={notify}/>
      <Toggle label='Login'>
        <LoginForm setAuthUser={setAuthUser} setNotify={setNotify} setUser={setUser} user={user} />
      </Toggle>
    </div> :
    <div>
      <Notification notify={notify}/>
      <h2>Blogs</h2>
      <div>
        logged in as {authUser.name}
        <Button method={logout} name={'Logout'}/>
        <NewBlog user={authUser} notify={setNotify} setBlogs={setBlogs} blogs={blogs} notCreating={notCreating} setCreating={setCreating}/>
      </div>
      <div>
        {
          sortedArray.map(blog => {
            return <Blog
              key={blog.id} blogs={blogs} setBlogs={setBlogs} notify={setNotify} authUser={authUser}>
              {blog}
            </Blog>
          })
        }
      </div>
    </div>
}

export default App
