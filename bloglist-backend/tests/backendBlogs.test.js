const testBlogs = require("./testBlogs");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user")
const api = supertest(app);
const helper = require("./backendTestHelper")
const more = testBlogs.listWithMoreBlog.array;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
let rootUserToken

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const rootUser = {
    "username": "root",
    "password": "root_pw",
    "name": "root",
    "passwordHash": await bcrypt.hash("root_pw", 10) 
  }
  const savedRoot = await (new User(rootUser)).save()
  const userForToken = {
    username: rootUser.username,
    id: rootUser._id,
  }
  //rootUserToken = jwt.sign(userForToken, process.env.SECRET)
  rootUserToken = (await api.post("/api/login").send({username: rootUser.username, password: rootUser.password})).body.token
  const promises = more.map((blog) => new Blog({
    ...blog,
    user: savedRoot.id
  }).save());
  await Promise.all(promises);
  
});

test("testing get route", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const contents = res.body
  expect(contents).toHaveLength(more.length)
});

test("testing existence of id attribute", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const contents = res.body
  expect(contents[0].id).toBeDefined()
})

test("testing post route", async () => {
  const newBlog = {
      title: "test",
      author: "author test",
      url: "testurl",
      likes: 0
  }
  const before = await helper.blogsInDb()

  await api
    .post("/api/blogs")
    .send(newBlog)
    .auth(`${rootUserToken}`, {type: "bearer"})
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await helper.blogsInDb()
  
  expect(before.length).toBe(after.length - 1)
  const urls = after.map(blog => blog.url)
  expect(urls).toContain(newBlog.url)
})

test("testing missing likes attribute for post", async () => {
  const newBlog = {
      title: "test",
      author: "author test",
      url: "testurl"
  }
  const before = await helper.blogsInDb()

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${rootUserToken}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await helper.blogsInDb()
  
  expect(before.length).toBe(after.length - 1)
  expect(after.filter(blog => blog.title === "test")[0].likes).toBe(0)
})


test("testing missing url and title attributes for post", async () => {
  const missingTitle = {
      author: "author test",
      url: "testurl"
  }

  const missingURL = {
    title: "test",
    author: "author test"
  }
  const before = await helper.blogsInDb()

  await api
    .post("/api/blogs")
    .send(missingTitle)
    .set("Authorization", `Bearer ${rootUserToken}`)
    .expect(400)

  const afterTitle = await helper.blogsInDb()
  expect(afterTitle).toEqual(before)

    await api
    .post("/api/blogs")
    .send(missingURL)
    .set("Authorization", `Bearer ${rootUserToken}`)
    .expect(400)

  const afterURL = await helper.blogsInDb()
  expect(afterURL).toEqual(before)
})

test("testing deletion of an element using id", async () => {
  const before = await helper.blogsInDb()
  // console.log(before)
  const promises = before.map(async (blog) => {
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set("Authorization", `Bearer ${rootUserToken}`)
      .expect(204)
  })
  await Promise.all(promises)
  const after = await helper.blogsInDb()
  expect(after.length).toBe(0)
})

test("testing update of an element using id", async () => {
  const hardcodedLikes = 1000
  const before = await helper.blogsInDb()
  const promises = before.map(async (blog) => {
    await api
      .put(`/api/blogs/${blog.id}`)
      .send({
        ...blog,
        likes: hardcodedLikes
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  await Promise.all(promises)
  const after = await helper.blogsInDb()
  after.map(blog => expect(blog.likes).toBe(hardcodedLikes))
})