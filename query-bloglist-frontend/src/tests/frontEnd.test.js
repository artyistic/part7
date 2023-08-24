import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"
import CreateBlog from "../components/CreateBlog"


describe("<Blog/> component", () => {
  test("blog's url and number of likes are not rendered by default", () => {
    const blog = {
      title: "test title",
      author: "test Author",
      url: "test url",
      user: "user",
      likes: 0,
      id: "id"
    }

    render(<Blog blog={blog}/>)
    const defaultElement = screen.getByText(`${blog.title} ${blog.author}`)
    const hidden = screen.queryByText("test url")
    expect(hidden === null).toBeTruthy()
    expect(defaultElement).toBeDefined()
  })

  test("blog's url and number of likes are rendered when the view button is clicked", async () => {
    const blog = {
      title: "test title",
      author: "test Author",
      url: "test url",
      user: "user",
      likes: 0,
      id: "id"
    }

    render(<Blog blog={blog}/>)
    const user = userEvent.setup()
    // this would break with multiple blogs rendered.
    const button = screen.getByText("view")

    const defaultElement = screen.getByText(`${blog.title} ${blog.author}`)
    const hidden = screen.queryByText("test url")
    expect(hidden === null).toBeTruthy()
    expect(defaultElement).toBeDefined()

    //click view button
    await user.click(button)

    //test if url and likes are shown
    const afterClick = screen.queryByText("test url")
    expect(afterClick).toBeDefined()
  })

  test("blog's updateBlog button is called when the like button is clicked", async () => {
    const blog = {
      title: "test title",
      author: "test Author",
      url: "test url",
      user: "user",
      likes: 0,
      id: "id"
    }

    const mockHandler = jest.fn()

    const container = render(<Blog blog={blog} updateBlog={mockHandler}/>).container
    const user = userEvent.setup()
    // this would break with multiple blogs rendered.
    const viewButton = screen.getByText("view")

    // const defaultElement = screen.getByText(`${blog.title} ${blog.author}`)
    // const hidden = screen.queryByText("test url")
    // expect(hidden === null).toBeTruthy()
    // expect(defaultElement).toBeDefined()

    //click view button
    await user.click(viewButton)

    //test if url and likes are shown
    const afterClick = container.querySelector(".hiddenByDefault")
    expect(afterClick).toBeDefined()

    //now click like button twice
    const likeButton = screen.getByText("like")

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test("testing the createBlog form", async () => {
    const testBlog = {
      title: "test title",
      author: "test Author",
      url: "test url",
      user: "user",
      likes: 0,
      id: "id"
    }
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<CreateBlog createBlog={mockHandler}/>)


    const titleInput = screen.getByPlaceholderText("write blog title here")
    const authorInput = screen.getByPlaceholderText("write blog author here")
    const urlInput = screen.getByPlaceholderText("write blog url here")
    const submitButton = screen.getByText("create")
    await user.type(titleInput, testBlog.title)
    await user.type(authorInput, testBlog.author)
    await user.type(urlInput, testBlog.url)
    await user.click(submitButton)

    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls[0][0].title).toBe(testBlog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(testBlog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(testBlog.url)

  })
})