const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { manyBlogs } = require('./blogsForTesting.js')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(manyBlogs[0])
    await blogObject.save()
    blogObject = new Blog(manyBlogs[1])
    await blogObject.save()
    blogObject = new Blog(manyBlogs[2])
    await blogObject.save()
    blogObject = new Blog(manyBlogs[3])
    await blogObject.save()
    blogObject = new Blog(manyBlogs[4])
    await blogObject.save()
    blogObject = new Blog(manyBlogs[5])
    await blogObject.save()
})

//Assignment 4.8
test('blogs are returned as json and have 6 in total', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body).toHaveLength(6)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(manyBlogs.length)
})

test('a specific note is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Type wars'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})