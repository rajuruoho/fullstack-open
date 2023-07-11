const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const { info, error } = require('../utils/logger')

//info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(result => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  author: {
    type: String,
    minlength: 1,
    required: true
  },
  url: {
    type: String,
    minlength: 1,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
