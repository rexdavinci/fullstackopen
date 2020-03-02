import React from 'react'
import Button from './Button'
const NewBlog = ({ titleField, urlField,  authorField, handleSubmit }) => {
  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-row'>
          <label htmlFor='author'>Author: </label><br />
          <input type='text' {...authorField} />
        </div>
        <div className='form-row'>
          <label htmlFor='title:'>Title: </label><br />
          <input type='text' {...titleField} />
        </div>
        <div className='form-row'>
          <label htmlFor='url'>URL: </label><br />
          <input type='text' {...urlField} />
        </div>
        <div className='submit-row'>
          <Button classStyle={'submit-btn'} name={'Add Blog'}/>
        </div>
      </form>
    </>
  )
}

export default NewBlog