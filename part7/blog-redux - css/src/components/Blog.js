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

  const sortByTime=(comment1,comment2) => {
    if(comment1.added < comment2.added) return 1
    if(comment1.added === comment2.added) return 0
    if(comment1.added > comment2.added) return -1
  }

  const addComment = e => {
    e.preventDefault()
    postComment(blog.id, {comment, by: authUser.username, added: new Date().toLocaleString()})
    resetComment()
  }

  return !blog ? <Redirect to='/' /> : (
    <div className='blog-detail'>
      <h3 className='blog-title'>{blog.title} - <em>{blog.author}</em></h3>
        <p className='blog-link'><a href={blog.url} rel='noopener noreferrer' target='_blank'><em>Link: {blog.url}</em></a></p>
        <p className='blog-added-by'>Added By: {blog.user.name}</p>
        <p><span>{blog.likes} likes </span>
        {
          blog.user.username === authUser.username ? null :
          <Button name={'Like'} method={() => voteFor(blog)} classStyle={'like-btn btn'}/>
        }
        {
          blog.user.username === authUser.username ?
            <Button name={'Delete'} method={() => deleteBlog(blog.id, blog.title, blog.author)} classStyle={'delete-blog-btn btn'}/> :
            null
        }
        </p>
          <form onSubmit={addComment}>
            <div className='form-row row'>
              <label htmlFor='comment'>Comment: </label>
              <input {...bindComment} type='text'/>
              </div>
              <div className='submit-row div-submit'>
                <Button name={'Add Comment'} classStyle={'add-comment-btn btn'}/>
              </div>
          </form>
          <ul className='comments'>
            {blog.comments.sort(sortByTime).map(comment => <li className='comment' key={comment.added}>{comment.comment} - <em>{comment.by}</em> <small>({comment.added})</small></li>)}
          </ul>
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