import React from 'react'
import Button from './Button'

const NewBlog = ({ newBlog, handleBlog, handleSubmit }) => {

  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='author'>Author: </label>
          <input type='text'  value={newBlog.author} name='author' onChange={handleBlog}/>
        </div>
        <div>
          <label htmlFor='title:'>Title: </label>
          <input type='text' value={newBlog.title} name='title' onChange={handleBlog}/>
        </div>
        <div>
          <label htmlFor='url'>URL: </label>
          <input type='text' value={newBlog.url} name='url' onChange={handleBlog}/>
        </div>
        <Button name={'Add Blog'}/>
      </form>
    </>
  )
}

export default NewBlog