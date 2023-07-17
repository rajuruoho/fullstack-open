const supertest = require("supertest");
const mongoose = require("mongoose");
const { manyBlogs, blogsInDb } = require("./blogstest_helper.js");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(manyBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(manyBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(manyBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(manyBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(manyBlogs[4]);
  await blogObject.save();
  blogObject = new Blog(manyBlogs[5]);
  await blogObject.save();
});

//Assignment 4.8
test("blogs are returned as json and have 6 in total", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(6);
});

//Assignment 4.9
test("blog has id and its in right form", async () => {
  const response = await api.get("/api/blogs");

  response.body.map((blog) => expect(blog.id).toBeDefined());
  response.body.map((blog) => expect(blog._id).toBeUndefined());
});

//Assignment 4.10-4.11
test("blog without likes will get 0 likes automatically", async () => {
  const newBlog = {
    title: "rahkaa jalleen",
    author: "minahan se",
    url: "testi.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(manyBlogs.length + 1);

  const likes = blogsAtEnd.map((r) => r.likes);
  expect(likes[manyBlogs.length + 1]) === 0;
});

//Assignment 4.12
test("blogs must have fields title, author and url", async () => {
  //uriless
  let newBlog = {
    title: "rahkaa todellakin",
    author: "minahan se",
    likes: 69,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  //authorless
  newBlog = {
    title: "rahkaa todellakin",
    url: "rahka.com",
    likes: 69,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  //titleless
  newBlog = {
    author: "minahan se",
    url: "rahka.com",
    likes: 69,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

//Assignment 4.13
test("can delete blogs", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[5];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(manyBlogs.length - 1);

  const likes = blogsAtEnd.map((r) => r.title);
  expect(likes).not.toContain(blogToDelete.title);
});

//Assignment 4.14
test("can alter the amount of likes of a blog", async () => {
  const blogsAtStart = await blogsInDb();
  const blogWithAlteredLikes = blogsAtStart[4];
  blogWithAlteredLikes.likes = 2;

  await api.put(`/api/blogs/${blogWithAlteredLikes.id}`)
  .send(blogWithAlteredLikes).expect(200);

  const blogsNow = await blogsInDb();
  expect(blogsNow[4].likes).toEqual(2);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(manyBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const likes = response.body.map((r) => r.title);

  expect(likes).toContain("Type wars");
});

afterAll(async () => {
  await mongoose.connection.close();
});
