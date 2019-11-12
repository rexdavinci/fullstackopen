import React, { useState } from 'react'
import blogService from '../services/blogService'
import Button from './Button'


const NewBlog = ({ 
  notify, setBlogs, blogs, notCreating, setCreating }) => {

  const [newBlog, setBlog] = useState({ title: '', url: '', author: '' })

  const handleSubmit = async(event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create(newBlog)
      notify({ message: `new blog '${blog.title}' created`, type: 'success' })
      setCreating(!notCreating)
      setBlogs(blogs.concat(blog))
      setBlog({ title: '', url: '', author: '' })
      setTimeout(() => {
        notify(null)
      }, 1500)
    }catch(exception){
      notify({ message: 'Ensure all fields are supplied and try again', type: 'error' })
      setTimeout(() => {
        notify(null)
      }, 1500)
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

  return notCreating ? <Button method={() => setCreating(!notCreating)} name={'New Blog'}/> : (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='author'>Author: </label>
          <input type='text'  value={newBlog.author} name='author' onChange={handleBlog}/>
        </div>
        <div>
          <label htmlFor='title:'>Title: </label>
          <input type='text' value={newBlog.title} name='title' onChange={handleBlog}/>
        </div>
        <div>
          <label htmlFor='url'>URL: </label>
          <input type='text' value={newBlog.url} name='url' onChange={handleBlog}/>
        </div>
        <Button name={'Create'}/>
        <Button method={() => setCreating(!notCreating)} name={'Cancel'}/>
      </form>
    </>
  )
}

export default NewBlog