const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 5) {
  console.log('give all arguments')
  process.exit(1)
}

const bTitle = process.argv[2]
const bAuthor = process.argv[3]
const bUrl = process.argv[4]
const bLikes = process.argv[5]

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

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
  console.log('bloglist:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes} `)
    })
    mongoose.connection.close()
    //Most likely not the smarterst solution, but otherwise it will add new blog anyway with no arguments
    process.exit(1)
  })
}

blog.save().then(result => {
  console.log(`added ${bTitle} ${bAuthor} ${bUrl} ${bLikes} to bloglist`)
  mongoose.connection.close()
})