import React, { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useResource } from './hooks'
import blogServices from './services/blogService'
import Blog from './components/Blog'
import Button from './components/Button'
import Toggle from './components/Toggle'
import Wrapper from './components/Wrapper'

const App =() => {
  const [notify, setNotify] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [bearer, setBearer] = useState('')
  const [blogs, blogService] = useResource('http://localhost:3003/api/blogs')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getResource()
  }, [])

  useEffect(() => {
    const loggedBlogger = window.localStorage.getItem('loggedBlogger')
    if(loggedBlogger){
      const currentUser = JSON.parse(loggedBlogger)
      setBearer(`bearer ${currentUser.token}`)
      setAuthUser(currentUser)
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
        await blogServices.del(id, bearer)
        setNotify({ message: `blog "${title}" deleted`, type: 'success' })
        blogService.getResource()
        setTimeout(() => {
          setNotify(null)
        }, 5000)
      }catch(error){
        setNotify({ message: error.response.data.error, type: 'error' })
        setTimeout(() => {
          setNotify(null)
        }, 5000)
      }
    }
  }

  return authUser === null ?
    <div>
      <Notification notify={notify} />
      <Toggle label='Login...'>
        <LoginForm setAuthUser={setAuthUser} setNotify={setNotify} setBearer={setBearer} />
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
            setBearer={setBearer}
            bearer={bearer}
            blogService={blogService}
            blogs={blogs} />
        </Toggle>
      </div>
      <div className='blogs'>
        {
          sortedArray.map(blog => {
            return <Blog
              key={blog.id}
              blogs={blogs}
              bearer={bearer}
              authUser={authUser}
              deleteBlog={deleteBlog}
              blog={blog} />
          })
        }
      </div>
    </div>
}

export default App
