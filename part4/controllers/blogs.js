const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      if (blogs){
        response.status(200).json(blogs)
      } else {
        response.status(404).end()
      }
    })
    .catch(error=>next(error))
})


blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  
  blog
  .save()
  .then(newBlog => {
    response.status(201).json(newBlog.toJSON())
  })
  .catch(error => next(error))
})

blogsRouter.get('/:id', (request, response, next)=>{
  Blog
    .findById(request.params.id)
    .then(blog=>{
      if(!blog){
        response.status(404).send(`The item does not exist`)
      }else{
        response.status(200).json(blog.toJSON())
      }
    })
    .catch(error=>next(error))
})

blogsRouter.put('/:id', (request, response, next)=>{
  const { body } = request

  const blog = {
    author: body.author,
    title: body.title,
    upvotes: Number(body.upvotes)
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error=>next(error))
})

blogsRouter.delete('/:id', (request, response, next)=>{
  Blog
  .findByIdAndRemove(request.params.id)
  .then(()=>{
    response.status(204).end()
  })
  .catch(error=>next(error))
})

module.exports = blogsRouter