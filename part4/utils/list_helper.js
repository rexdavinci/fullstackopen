const dummy = blogs => {
  return 1
}

const totalLikes = blogs =>{
  const reducer = (sum, item)=>{
    return sum+item
  }
  return blogs.map(blog=>blog.likes).reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  let mostLikes = Math.max(...blogs.map(blog=>blog.likes))
  const mostLikedBlog = blogs.find(blog=>blog.likes === mostLikes)
  if((blogs.length === 1 && mostLikedBlog.likes === 0) || blogs.length === 0){
    return {}
  }else{
    return {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
    }
  }
}

const mostBlogs = blogs =>{
  if(blogs.length ===0 ){
    return {}
  }
  const formattedBlogs = []
  blogs.map(blog=>{
    // Create a sample formatted result
    const author = {author: blog.author, blogs: 1}
    // Check if current blog in the map exists in the blogs
    let exists = formattedBlogs.find(foundBlog=>foundBlog.author == blog.author)
    if(exists){
      // if it already exists, find its position and update the blogs count
      const position = formattedBlogs.indexOf(exists)
      formattedBlogs[position].blogs+=1
    }else{
      // if the blog doesn't already exists, add it to the array under construction
      formattedBlogs.push(author)
    }
  })
  if(formattedBlogs.length>0){
    const highest = Math.max(...formattedBlogs.map(blog=>blog.blogs))
    const mostBlogs = formattedBlogs.find(blog=>blog.blogs === highest)
    return mostBlogs
  }
}

const mostLikes = blogs =>{
  if(blogs.length === 0 || (blogs.length === 1 && blogs[0].likes === 0)){
    return {}
  }
  const formattedBlogs = []
  blogs.map(blog=>{
    // Create a sample formatted result
    const author = {author: blog.author, likes: blog.likes}
    formattedBlogs.push(author)
  })
  if(formattedBlogs.length>0){
    const highest = Math.max(...formattedBlogs.map(blog=>blog.likes))
    const mostLikes = formattedBlogs.find(blog=>blog.likes === highest)
    return mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}