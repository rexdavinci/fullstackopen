import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import Button from './Button'

import { upvote, deleteBlog, newComment } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'

const Blog = props => {
  const { blog, authUser, voteFor, removeBlog, postComment } = props
  const [comment, bindComment, resetComment] = useField('')

  const deleteBlog = async (id, title, author) => {
    const confirmDelete = window.confirm(`Delete blog "${title}" by ${author}?`)
    if(confirmDelete){
      removeBlog(id, title)
    }
  }

  const addComment = e => {
    e.preventDefault()
    postComment(blog.id, {comment})
    resetComment()
  }

  return !blog ? <Redirect to='/' /> : (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
        <a href={blog.url}>{blog.url}</a>
        <p><span>{blog.likes} likes </span>
          <Button name={'Like'} method={() => voteFor(blog)}/></p>
        <p>added by {blog.user.name}</p>
        <h3>Comments</h3>
          <form onSubmit={addComment}>
            <div>
              <label htmlFor="username">Username: </label>
              <input {...bindComment} type='text'/>
              </div>
              <Button name={'Add Comment'}/>
          </form>
          <ul>
            {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
          {
            blog.user.username === authUser.username ?
              <Button name={'Delete'} method={() => deleteBlog(blog.id, blog.title, blog.author)}/> :
              null
          }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    authUser: state.users.authUser
  }
}

const mapDispatchToProps = {
  voteFor: upvote,
  removeBlog: deleteBlog,
  postComment: newComment
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default connectedBlog