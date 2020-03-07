import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import Button from './Button'

import { upvote, deleteBlog, newComment } from '../reducers/blogReducer'
import { Redirect, Link } from 'react-router-dom'
import { Container, Header, Form, Input } from 'semantic-ui-react'

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
    <Container className='blog-detail'>
      <Header as='h3' textAlign='center'>{blog.title} - <em>{blog.author}</em></Header>
        <Header as='p' className='blog-link' textAlign='center'><a href={blog.url} rel='noopener noreferrer' target='_blank'><em>Link: {blog.url}</em></a></Header>
        <Header as='p' textAlign='center' className='blog-added-by'>Added By: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></Header>
        <p><span>{blog.likes} likes </span>
        {
          blog.user.username === authUser.username ? 
          <Button classStyle={'basic red'} id={'del'} name={'Delete'} method={() => deleteBlog(blog.id, blog.title, blog.author)} /> :
          <Button classStyle={'basic green'} name={'Like'} method={() => voteFor(blog)} />
        }
        </p>
          <Form onSubmit={addComment}>
            <Form.Field className='form-row row'>
              <Input label='Comment' {...bindComment} />
            </Form.Field>
            <Form.Field className='submit-row'>
              <Button name={'Add Comment'} classStyle={'olive'}/>
            </Form.Field>
          </Form>
          <ul className='comments'>
            {blog.comments.sort(sortByTime).map(comment => <li className='comment' key={comment.added}>{comment.comment} - <em>{comment.by}</em> <small>({comment.added})</small></li>)}
          </ul>
    </Container>
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