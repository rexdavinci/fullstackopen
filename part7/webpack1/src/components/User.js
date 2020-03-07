import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'

const User = props => {
  const { user } = props

  return !user ? <Redirect to='/users' /> : (
    <Container className='user-blog-list'>
      <Header as='h2' textAlign='center'>{user.name}</Header>
      <h4>Added Blogs</h4>
      <ul className='user-blog-list-items'>
        {
          user.blogs.map(blog=><li key={blog.id} className='blog-item'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>  
          </li>)
        }
      </ul>
    </Container>
  )
}

const connectedUser = connect()(User)

export default connectedUser