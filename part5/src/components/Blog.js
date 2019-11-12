import React, { useState } from 'react'
import blogService from '../services/blogService'
import Button from './Button'

const Blog = (({ children, setBlogs, blogs, notify, authUser }) => {
  const [expand, setExpand] = useState(false)
  const { id, author, title, url, likes, user } = children
  const [currentLikes, setLikes] = useState(likes)

  const hideWhenVisible = { display: expand ? 'none' : '' }
  const showWhenVisible = { display: expand ? '' : 'none' }

  const updateLikes = async (id, body) => {
    let newLikes = currentLikes+1
    await blogService.updateLikes(id, { ...body, user: body.user.id, likes: newLikes })
    setLikes(newLikes)
  }

  const deleteBlog = async id => {
    const confirmDelete = window.confirm(`remove blog "${title}" by ${author}?`)
    if(confirmDelete){
      try{
        const deleteSuccess = await blogService.del(id)
        if(deleteSuccess){
          notify({ message: `blog "${title}" deleted`, type: 'success' })
          const updateBlogs = blogs.filter(blog => blog.id!==id)
          setBlogs(updateBlogs)
          setTimeout(() => {
            notify(null)
          }, 1500)
        }
      }catch(exception){
        notify({ message: 'An error occured. Please try again', type: 'error' })
        setTimeout(() => {
          notify(null)
        }, 1500)
      }
    }
  }

  const toggleExpand =() => {
    setExpand(!expand)
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible} onClick={toggleExpand}>
        <p className='expand'>{title} - {author}</p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleExpand} className='expand'>{title} - {author}</p>
        <a href={url}>{url}</a>
        <p><span>{currentLikes} likes </span>
          <Button name={'Like'} method={() => updateLikes(id, children)}/></p>
        <p>added by {user.name}</p>
        {
          user.username === authUser.username ?
            <Button name={'Remove'} method={() => deleteBlog(id)}/> :
            null
        }
      </div>
    </div>
  )
})

export default Blog