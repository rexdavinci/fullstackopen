const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.post('/', async(request, response, next)=>{
  try{
    const body = request.body
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }catch(exception){
    next(exception)
  }
})

usersRouter.get('/', async(request, response)=>{
  const users = await User.find({})
  response.json(users.json(user=>user.toJSON()))
})


module.exports = usersRouter