const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const decodedToken = (token)=>jwt.verify(token, config.SECRET)

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', {name: 1, username: 1})
  response.status(200).json(blogs.map(blog=>blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const { body, token } = request
  const { author, title, url } = body
  try{
  const verifiedToken = decodedToken(token)
  if(!token || !verifiedToken.id){
    return response.status(401).send({error: 'token is missing or is invalid'})
  }
  // Get user info from the supplied token
  const user = await User.findById(verifiedToken.id)
  // Ensure no empty blog is saved to the DB
  if(!author || !title || !url || !user){
    return response.status(400).send({error: 'enter all fields to create a blog'})
  }
  // Create new record
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: user._id
  })
  // Save record to DB
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.json(newBlog.toJSON())
  }catch(exception){
    next(exception)
  }
})

blogsRouter.get('/:id', async(request, response, next)=>{
  try{
    const blog = await Blog.findById(request.params.id)
      if(blog){
        response.status(200).json(blog.toJSON())
      }else{
        response.status(404).end()
      }
  }catch(exception){
    next(exception)
  }
})

// 4.14 Blog list expansions, step 2
blogsRouter.put('/:id', async (request, response, next)=>{
  const { body } = request
  const blogUpdate = {
    ...body,
    likes: Number(body.likes)
  }

  try{
    const blog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, {new: true})
    response.json(blog.toJSON())
  }catch(exception){
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { comment } = request.body
  try{
    const blog = await Blog.findById(request.params.id)
    blog.comments.push(comment)
    blog.save()
    response.json(blog.toJSON())
  }catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async(request, response, next)=>{
  try{
    const { token, params } = request
    // Confirm if the blog exists 
    const blog = await Blog.findById(params.id)
    if(!blog) return next()
    if(!token){
      return response.status(401).json({error: 'Invalid or missing token'})
    }
    const verifiedToken = decodedToken(token)
    if(!verifiedToken){
      return response.status(401).json({error: 'Invalid or missing token'})
    }
    const isOwner = blog.user.toString() === verifiedToken.id.toString()
    if(!isOwner){
      return response.status(401).json({error: 'You do not have permission to delete this blog'})
    }
    await Blog.findByIdAndRemove(params.id)
    response.status(204).end()
  }catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter;