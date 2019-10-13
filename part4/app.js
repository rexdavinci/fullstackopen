const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(()=>{
    console.log(`Connected to MongoDB database successfully!`)
  })
  .catch(error=>{
    console.log(`Error connecting to mongoDB:`, error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
