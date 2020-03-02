import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const User = props => {
  const { user } = props

  return !user ? <Redirect to='/users' /> : (
    <div className='user-blog-list'>
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      <ul className='user-blog-list-items'>
        {
          user.blogs.map(blog=><li key={blog.id} className='blog-item'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>  
          </li>)
        }
      </ul>
    </div>
  )
}

const connectedUser = connect()(User)

export default connectedUser