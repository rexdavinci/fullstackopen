import React, { useState } from 'react'
import blogService from '../services/blogService'
import Button from './Button'

const Blog = (({ blog, deleteBlog, authUser }) => {
  const { id, author, title, url, likes, user } = blog

  const [expand, setExpand] = useState(false)
  const [currentLikes, setLikes] = useState(likes)
  const hideWhenVisible = { display: expand ? 'none' : '' }
  const showWhenVisible = { display: expand ? '' : 'none' }

  const updateLikes = async (id, body) => {
    let newLikes = currentLikes+1
    setLikes(newLikes)
    await blogService.updateLikes(id, { ...body, user: body.user.id, likes: newLikes })
  }

  const toggleExpand =() => {
    setExpand(!expand)
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible} onClick={toggleExpand} className='short'>
        <p>{title} - {author}</p>
      </div>
      <div style={showWhenVisible} className='expanded'>
        <p onClick={toggleExpand} className='expandedLong'>{title} - {author}</p>
        <a href={url}>{url}</a>
        <p><span>{currentLikes} likes </span>
          <Button name={'Like'} method={() => updateLikes(id, blog)}/></p>
        <p>added by {user.name}</p>
        {
          user.username === authUser.username ?
            <Button name={'Delete'} method={() => deleteBlog(id, title, author)}/> :
            null
        }
      </div>
    </div>
  )
})

export default Blog