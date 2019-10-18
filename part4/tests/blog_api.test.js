const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async ()=>{
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs
  .map(blog=>new Blog(blog))
  const promiseArray = blogObjects.map(blog=>blog.save())
  await Promise.all(promiseArray)
})

<<<<<<< HEAD
describe('where some blogs were initially saved', ()=>{
=======
describe('where there were some blogs were saved initially', ()=>{
>>>>>>> aa3e43535c592656326af501a2529064e39bc576

  // 4.8 Blog list tests, step 1
  test('all notes are returned as json', async()=>{
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('handling specific blogs', ()=>{
  // 4.9*: Blog list tests, step 2
  test('unique identifier "id" is defined', async()=>{
    const blogs = await helper.blogsInDB()
    for(let blog of blogs){
      expect(blog['id']).toBeDefined()
    }
  })

  // 4.10: Blog list tests, step 3
  test('a valid blog is created', async()=>{
    const newBlog = {
      author: "Abdulhafiz Ahmed",
      title: "The Javascript Big Bang",
      url: "https://google.com",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)
  
      const titles = blogsAtEnd.map(b=>b.title)
      expect(titles).toContain(
        'The Javascript Big Bang'
      )
  })

  test('a specific blog is within the returned blog', async()=>{
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r=>r.title)
  
    expect(titles).toContain(
      'Javascript now rules web development'
    )
  })

  test('a specific blog can be viewed', async()=>{
    const blogsAtStart = await helper.blogsInDB()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(resultBlog.body).toEqual(blogToView)
  })
  
  // 4.11*: Blog list tests, step 4
  test('a blog created without "likes" property defaults likes to 0', async()=>{
    const newBlog = {
      author: "Abdulhafiz Ahmed",
      title: "Fresh air with Javascript",
      url: "https://google.com",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const getBlog = await helper.blogByTitle(newBlog.title)
    expect(getBlog.likes).toBe(0)
  })

    // 4.12*: Blog list tests, step 5
    test('blog without title is not added', async()=>{
      const newBlog = {
        author: "Rex Baba",
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
        const blogsAtEnd = await helper.blogsInDB()
    
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('a blog can be deleted', async()=>{
      const blogAtStart = await helper.blogsInDB()
      const blogToDelete = blogAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDB()
    
      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )
    
      const titles = blogsAtEnd.map(r=>r.title)
      expect(titles).not.toContain(blogToDelete.title)
    })  
})

describe('when there is initially one user in the db', ()=>{
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({username: 'rexdavinci', password: 'secret', name: 'Abdulhafiz Ahmed'})
    await user.save()
  })

  test('creation succeeds with a new username', async()=>{
    const usersAtStart = await helper.usersInDBb()

    const newUser = {
      username: 'neebootoo',
      name: 'Rex DaVinci',
      password: 'super-secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'neebootoo',
      name: 'Admin',
      password: 'secretive',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})


afterAll(()=>{
  mongoose.connection.close()
})