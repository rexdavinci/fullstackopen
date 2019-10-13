const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  author: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String, require: true},
  upvotes: Number
})

blogSchema.set('toJSON', {
  transform: (document, transformed)=>{
    transformed.id = transformed._id.toString()
    delete transformed._id
    delete transformed.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)