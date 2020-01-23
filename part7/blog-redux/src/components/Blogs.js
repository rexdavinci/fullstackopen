import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Wrapper from './Wrapper'
import Toggle from './Toggle'

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
    <div>
      <Toggle label='New Blog' ref={blogFormRef}>
        <Wrapper
          blogFormRef={blogFormRef}/>
      </Toggle>
      {
        sortedByLikes.map(blog=>{
          return <div 
            key={blog.id} 
            className='blog'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        })
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

// const mapDispatchToProps = {
//   voteFor: upvote,
//   removeBlog: deleteBlog,
// }

const connectedBlogs = connect(mapStateToProps, null)(Blogs)

export default connectedBlogs