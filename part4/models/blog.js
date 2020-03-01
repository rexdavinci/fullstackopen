const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  author: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String, required: true},
  likes: {type: Number, default:0},
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{ type: Object }]
})

blogSchema.set('toJSON', {
  transform: (document, transformed)=>{
    transformed.id = transformed._id.toString()
    delete transformed._id
    delete transformed.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)