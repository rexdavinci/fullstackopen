const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when there is one initial user in the DB', ()=>{
  beforeEach(async()=>{
    await User.deleteMany({})
    const user = new User({username: 'rexdavinci', name:'Abdulhafiz Ahmed', password: 'secretpassword'})
    await user.save()
  })

  test('creation succeeds with a new username', async()=>{
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Supreme Admin',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd.length).toBe(usersAtStart.length+1)
  
      const usernames = usersAtEnd.map(user=>user.username)
      expect(usernames).toContain(newUser.username)
  })

  test('creation fails with already taken username', async()=>{
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Admin 78',
      password: 'secure-password'
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