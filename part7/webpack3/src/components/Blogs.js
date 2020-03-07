import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Wrapper from './Wrapper'
import Toggle from './Toggle'
import { Header, Container } from 'semantic-ui-react'

const Blogs = props => {
  const { blogs } = props
  const blogFormRef = React.createRef()

  const sortByLikes=(blog1,blog2) => {
    if(blog1.likes < blog2.likes) return 1
    if(blog1.likes === blog2.likes) return 0
    if(blog1.likes > blog2.likes) return -1
  }

  const sortedByLikes = blogs.sort(sortByLikes)
  return (
    <Container>
      {
        sortedByLikes.length === 0 ? <Header as='p' textAlign='center'> There are no blogs yet</Header> :
        null
      }
      <Toggle label='New Blog' ref={blogFormRef}>
        <Wrapper
          blogFormRef={blogFormRef}/>
      </Toggle>
      <div className='blogs'>
        {
          sortedByLikes.map(blog=>{
            return <Link to={`/blogs/${blog.id}`}
              key={blog.id}>
              <div className='blog'>
                <p className='blog-title'>{blog.title} <small className='added-by'><em>added by <span>{blog.user.username}</span></em></small></p>
              </div>
            </Link>
          })
        }
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    authUser: state.users.authUser
  }
}

const connectedBlogs = connect(mapStateToProps, null)(Blogs)

export default connectedBlogs