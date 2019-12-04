import React from 'react'
import Button from './Button'
const NewBlog = ({ titleField, urlField,  authorField, handleSubmit }) => {

  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='author'>Author: </label>
          <input type='text' {...authorField} />
        </div>
        <div>
          <label htmlFor='title:'>Title: </label>
          <input type='text' {...titleField} />
        </div>
        <div>
          <label htmlFor='url'>URL: </label>
          <input type='text' {...urlField} />
        </div>
        <Button name={'Add Blog'}/>
      </form>
    </>
  )
}

export default NewBlog