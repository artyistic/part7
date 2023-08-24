const userA = {
  name: "Cypress Testing A",
  username: "cypressA",
  password: "123"
}

const userB = {
  name: "Cypress Testing B",
  username: "cypressB",
  password: "123"
}

describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userA)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.get("#username")
    cy.get("#password")
  })

  it("Correct Login", function () {
    cy.get("#username").type(userA.username)
    cy.get("#password").type(userA.password)
    cy.get("#login-button").click()
    cy.contains(`${userA.name} is now logged in`)
  })

  it("login fails with wrong password", function() {
    cy.get("#username").type("wrong")
    cy.get("#password").type("wrong")
    cy.get("#login-button").click()

    cy.contains("wrong login credentials")
  })
})

describe("when logged in", function () {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userA)
    cy.visit("http://localhost:3000")
  })

  it("Logged in userA can create a new blog", function () {
    cy.get("#username").type(userA.username)
    cy.get("#password").type(userA.password)
    cy.get("#login-button").click()
    cy.contains(`${userA.name} is now logged in`)
    const newBlog = {
      title: "test",
      author: "testAuthor",
      url: "testURL"
    }

    cy.contains("new Blog").click()
    // typing in the new blog
    cy.get("#title").type(newBlog.title)
    cy.get("#author").type(newBlog.author)
    cy.get("#url").type(newBlog.url)
    cy.get("#create").click()

    // checking if the newBlog is succesfully created
    // when the blog is not expanded, the url should not be in the DOM
    cy.contains(`${newBlog.title} by ${newBlog.author}`)
    cy.contains(newBlog.url).should("not.exist")

    cy.contains("view").click()
    // now the blog url should be displayed
    cy.contains(newBlog.url)
  })
})

describe("when there is two users A, B, and one blog belonging to userB", function () {
  const newBlog = {
    title: "test",
    author: "testAuthor",
    url: "testURL"
  }

  beforeEach(function() {

    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userA)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userB)
    cy.request("POST", `${Cypress.env("BACKEND")}/login`, { username: userB.username, password: userB.password })
      .then(response => {
        const options = {
          method: "POST",
          url: `${Cypress.env("BACKEND")}/blogs`,
          headers:{
            authorization:`Bearer ${response.body.token}`,
          },
          body: newBlog
        }
        cy.request(options)
        cy.visit("http://localhost:3000")
      })
  })

  it("Any Logged in user can like a blog", function () {
    // user a log in
    cy.get("#username").type(userA.username)
    cy.get("#password").type(userA.password)
    cy.get("#login-button").click()
    cy.contains(`${userA.name} is now logged in`)

    cy.contains("view").click()
    cy.contains("like").click()
    cy.contains("likes 1")

    // logging out user a and log in user b
    cy.contains("Logout").click()
    cy.get("#username").type(userB.username)
    cy.get("#password").type(userB.password)
    cy.get("#login-button").click()

    // user B logged in
    cy.contains(`${userB.name} is now logged in`)
    cy.contains("view").click()
    cy.contains("like").click()
    cy.contains("likes 2")
  })

  it("only the creator can delete a blog", function () {
    // test delete
    cy.get("#username").type(userB.username)
    cy.get("#password").type(userB.password)
    cy.get("#login-button").click()
    cy.contains(`${userB.name} is now logged in`)

    cy.contains("view").click()
    cy.contains("delete").click()
    cy.on("window:confirm", () => true)

    // check that the blog is being deleted
    cy.contains("view").should("not.exist")
  })

  it("user A cannot see the delete button bc they are not the owner", function () {
    cy.get("#username").type(userA.username)
    cy.get("#password").type(userA.password)
    cy.get("#login-button").click()

    // user B logged in
    cy.contains(`${userA.name} is now logged in`)
    cy.contains("view").click()
    cy.contains("delete").should("not.exist")
  })
})


describe("when there one user and two blogs with different likes", function () {
  const worseBlog = {
    title: "worse",
    author: "worseBlogAuthor",
    url: "worseBlogURL",
    likes: 0
  }

  const betterBlog = {
    title: "better",
    author: "betterBlogAuthor",
    url: "betterBlogURL",
    likes: 100
  }

  beforeEach(function() {

    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userA)
    cy.request("POST", `${Cypress.env("BACKEND")}/login`, { username: userA.username, password: userA.password })
      .then(response => {
        const worseBlogOptions = {
          method: "POST",
          url: `${Cypress.env("BACKEND")}/blogs`,
          headers:{
            authorization:`Bearer ${response.body.token}`,
          },
          body: worseBlog
        }
        const betterBlogOptions = {
          method: "POST",
          url: `${Cypress.env("BACKEND")}/blogs`,
          headers:{
            authorization:`Bearer ${response.body.token}`,
          },
          body: betterBlog
        }
        cy.request(worseBlogOptions)
        cy.request(betterBlogOptions)
      })
    cy.visit("http://localhost:3000")
  })

  it("then the blogs are ordered base on the number of likes", function () {
    cy.get("#username").type(userA.username)
    cy.get("#password").type(userA.password)
    cy.get("#login-button").click()

    cy.get(".blog").eq(0).should("contain", betterBlog.title)
    cy.get(".blog").eq(1).should("contain", worseBlog.title)
  })
})