import React, { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogService'
import Blog from './components/Blog'
import Button from './components/Button'
import Toggle from './components/Toggle'
import Wrapper from './components/Wrapper'

const App =() => {
  const [blogs, setBlogs] = useState([])
  const [notify, setNotify] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [user, setUser] = useState({ username: '', password: '' })

  const blogFormRef = React.createRef()

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

  const deleteBlog = async (id, title, author) => {
    const confirmDelete = window.confirm(`Delete blog "${title}" by ${author}?`)
    if(confirmDelete){
      try{
        const deleteSuccess = await blogService.del(id)
        if(deleteSuccess){
          setNotify({ message: `blog "${title}" deleted`, type: 'success' })
          const updateBlogs = blogs.filter(blog => blog.id!==id)
          setBlogs(updateBlogs)
          setTimeout(() => {
            setNotify(null)
          }, 1500)
        }
      }catch(exception){
        setNotify({ message: 'An error occured. Please try again', type: 'error' })
        setTimeout(() => {
          setNotify(null)
        }, 1500)
      }
    }
  }


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
        <Toggle label='New Blog' ref={blogFormRef}>
          <Wrapper
            blogFormRef={blogFormRef}
            user={authUser}
            notify={setNotify}
            setBlogs={setBlogs}
            blogs={blogs} />
        </Toggle>
      </div>
      <div>
        {
          sortedArray.map(blog => {
            return <Blog
              key={blog.id}
              blogs={blogs}
              authUser={authUser}
              deleteBlog={deleteBlog}
              blog={blog} />
          })
        }
      </div>
    </div>
}

export default App
