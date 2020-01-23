import React from 'react'
import NewBlog from './NewBlog'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { create } from '../reducers/blogReducer'

const Wrapper = props => {
  const { addBlog, authUser } = props
  const [author, bindAuthor, resetAuthor] = useField('')
  const [title, bindTitle, resetTitle] = useField('')
  const [url, bindUrl, resetUrl] = useField('')

  const handleSubmit = async(event) => {
    event.preventDefault()
    addBlog({ title, author, url }, authUser)
    resetAuthor()
    resetTitle()
    resetUrl()
  }

  return (
    <div>
      <NewBlog
        handleSubmit={handleSubmit}
        titleField={bindTitle}
        authorField={bindAuthor}
        urlField={bindUrl}
      />
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
  addBlog: create
}

const connectedWrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

export default connectedWrapper

