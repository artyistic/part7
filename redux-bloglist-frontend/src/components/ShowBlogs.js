import Togglable from "./Togglable"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import blogService from "../services/blogs"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { clearNotification, setNotification } from "../reducers/notificationReducer"
import { setAll, addBlog, removeBlog, changeBlog } from "../reducers/blogsReducer"
import { useSelector } from "react-redux"

const ShowBlogs = ({ username }) => {
  //const [blogs, setBlogs] = useState([])
  const createBlogRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => {return b.likes - a.likes})

  useEffect(() => {
    blogService.getAll().then((intialBlogs) => {
      //setBlogs(intialBlogs)
      dispatch(setAll(intialBlogs))
    })
  }, [dispatch])

  // slightly clunky since we are passing the whole blog objects now for create delete and update
  const createBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility()
    const addedBlog = await blogService.createNew(newBlog)
    dispatch(addBlog(addedBlog))
    dispatch(setNotification(`new blog ${addedBlog.title} by ${addedBlog.author} is added`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const deleteBlog = async (deletedBlog) => {
    if (
      window.confirm(
        `Do you really want to delete ${deletedBlog.title} by ${deletedBlog.author}`
      )
    ) {
      await blogService.deleteBlog(deletedBlog.id)
      // update blogs list
      //setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
      dispatch(removeBlog(deletedBlog.id))
      dispatch(setNotification(`new blog ${deletedBlog.title} by ${deletedBlog.author} is deleted`))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  const updateBlog = async (toUpdateBlog) => {
    const updatedBlog = {
      ...toUpdateBlog,
      likes: toUpdateBlog.likes + 1,
    }
    await blogService.updateBlog(updatedBlog.id, {
      ...updatedBlog,
      likes: updatedBlog.likes + 1,
    })
    dispatch(changeBlog(updatedBlog))
  }
  return (
    <div>
      <Togglable buttonLabel="new Blog" ref={createBlogRef}>
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          updateBlog={updateBlog}
          currUsername={username}
        />
      ))}
    </div>
  )
}

export default ShowBlogs
