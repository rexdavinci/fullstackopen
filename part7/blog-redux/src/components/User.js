import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const User = props => {
  const { user } = props

  return !user ? <Redirect to='/users' /> : (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {
          user.blogs.map(blog=><li key={blog.id}>
            {blog.title}  
          </li>)
        }
      </ul>
    </div>
  )
}

// const mapStateToProps = state => {
// 	return {
// 		users: state.users.usersList
// 	}
// }

const connectedUser = connect()(User)

export default connectedUser