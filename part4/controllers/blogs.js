const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs.map(blog=>blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  
  const { body } = request
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url
  })
  try{

    const newBlog = await blog.save()
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
    likes: Number(body.likes)
  }

  try{
    const blog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, {new: true})
    response.json(blog.toJSON())
  }catch(exception){
    next(exception)
  }
})

// 4.13 Blog list expansions, step 1
blogsRouter.delete('/:id', async(request, response, next)=>{
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter