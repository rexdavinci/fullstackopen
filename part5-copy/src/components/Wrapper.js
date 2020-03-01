import React from 'react'
import NewBlog from './NewBlog'
import { useField } from '../hooks'

const Wrapper = (props) => {
  const { notify, blogService, bearer } = props
  const [author, bindAuthor, resetAuthor] = useField('')
  const [title, bindTitle, resetTitle] = useField('')
  const [url, bindUrl, resetUrl] = useField('')

  const handleSubmit = async(event) => {
    event.preventDefault()
    try{
      await blogService.create({ title, author, url }, bearer) // Add new blog to database
      await blogService.getResource()
      notify({ message: `New blog '${title}' created`, type: 'success' })
      setTimeout(() => {
        resetAuthor()
        resetTitle()
        resetUrl()
        notify(null)
      }, 2000)
    }catch(error){
      notify({ message: error.response.data.error, type: 'error' })
      setTimeout(() => {
        notify(null)
      }, 2000)
    }
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

export default Wrapper
