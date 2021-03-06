const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: "Rex Baba",
    title: "NodeJS is easy",
    url: "https://googe.com"
  },
  {
    author: "Rex",
    title: 'Javascript now rules web development',
    url: "https://googe.com"
  }
]

const idExists = async()=>{
  const blogs =  await Blog.find({})
  return blogs.map(blog=>blog.id)
}

const blogsInDB = async () =>{
  const blogs = await Blog.find({})
  return blogs.map(blog=>blog.toJSON())
}

const blogByTitle = async title=>{
  const blog = await Blog.findOne({title})
  return blog
}

const usersInDB = async()=>{
  const users = await User.find({})
  return users.map(user=>user.toJSON())
}

module.exports = {
  initialBlogs, idExists, blogsInDB, blogByTitle, usersInDB
}