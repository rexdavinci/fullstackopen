import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        blog has {blog.likes}
        <button onClick={onClick} className='like'>like</button>
      </div>
    </div>
  )
}

export default SimpleBlog