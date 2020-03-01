const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

usersRouter.post('/', async(request, response, next) => {
  try {
    const {body} = request
    if(!body.username || !body.password){
      return response.status(400).json({
        error: "username and password fields cannot be empty"
      })
    }
    if(body.password.length<3){
      return response.status(400).json({
        error: "Password must be at least 3 characters long"
      })
    }

    // Handle password hashing
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    // Create a newUser object
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    // Save and return new User 
    const savedUser = await user.save()
    const encodeUser = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(encodeUser, config.SECRET)
    response.json({token, username: savedUser.username, name: savedUser.name})
  } catch (exception) {
    next(exception)
  }
})

// 4.15: bloglist expansion, step 4
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1})
  response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async(request, response)=>{
  const {params} = request 
  const user = await User
    .findById(params.id).populate('blogs', {title: 1})
  response.json(user)
})

module.exports = usersRouter