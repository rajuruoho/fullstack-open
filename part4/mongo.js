const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')

if (process.argv.length > 2 && process.argv.length < 5) {
  error('give all arguments')
  process.exit(1)
}

const bTitle = process.argv[2]
const bAuthor = process.argv[3]
const bUrl = process.argv[4]
const bLikes = process.argv[5]

mongoose.connect(MONGODB_URI)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: bTitle,
  author: bAuthor,
  url: bUrl,
  likes: bLikes
})

if (process.argv.length === 2) {
  info('bloglist:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      info(`${blog.title} ${blog.author} ${blog.url} ${blog.likes} `)
    })
    mongoose.connection.close()
    //Most likely not the smarterst solution, but otherwise it will add new blog anyway with no arguments
    process.exit(0)
  })
} else {
  blog.save().then(result => {
    info(`added ${bTitle} ${bAuthor} ${bUrl} ${bLikes} to bloglist`)
    mongoose.connection.close()
  })
}
