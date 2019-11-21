import React, { useState } from 'react'
import NewBlog from './NewBlog'
import blogService from '../services/blogService'

const Wrapper = (props) => {
  const { blogFormRef, notify, setBlogs } = props

  const [newBlog, setBlog] = useState({ title: '', url: '', author: '' })

  const handleSubmit = async(event) => {
    event.preventDefault()
    try{
      const { title, url, author } = newBlog
      if(title.length > 0 && url.length > 0 && author.length > 0){
        const blog = await blogService.create(newBlog) // Add new blog to database
        const newBlogs = await blogService.getBlogs() // Fetch all blogs again so that all fields are populated correctly
        blogFormRef.current()
        setBlogs(newBlogs) // set blogs displayed to user
        setBlog({ title: '', url: '', author: '' })
        notify({ message: `new blog '${blog.title}' created`, type: 'success' })
        setTimeout(() => {
          notify(null)
        }, 2000)
      } else {
        notify({ message: 'Ensure all fields are supplied and try again', type: 'error' })
        setTimeout(() => {
          notify(null)
        }, 2000)
      }
    }catch(exception){
      notify({ message: 'Ensure all fields are supplied and try again', type: 'error' })
      setTimeout(() => {
        notify(null)
      }, 2000)
    }
  }

  const handleBlog = ({ target }) => {
    if(target.name === 'title'){
      setBlog({ ...newBlog, title: target.value })
    } else if(target.name === 'url'){
      setBlog({ ...newBlog, url: target.value })
    } else {
      setBlog({ ...newBlog, author: target.value })
    }
  }

  return (
    <div>
      <NewBlog
        newBlog={newBlog}
        handleBlog={handleBlog}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Wrapper
