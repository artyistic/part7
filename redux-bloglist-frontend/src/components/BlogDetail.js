import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import blogService from "../services/blogs"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { removeBlog, changeBlog } from "../reducers/blogsReducer"
import { useState } from "react"
const BlogDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  //const { test } = location.state
  const blog = location.state.blog
  const [currBlog, setCurrBlog] = useState(blog)
  const [comment, setComment] = useState("")
  const currUsername = location.state.currUsername
  const dispatch = useDispatch()

  const deleteBlog = async (deletedBlog) => {
    if (
      window.confirm(
        `Do you really want to delete ${deletedBlog.title} by ${deletedBlog.author}`
      )
    ) {
      await blogService.deleteBlog(deletedBlog.id)
      dispatch(removeBlog(deletedBlog.id))
      dispatch(setNotification(`new blog ${deletedBlog.title} by ${deletedBlog.author} is deleted`))
      setTimeout(() => dispatch(clearNotification()), 5000)
      navigate("/")
    }
  }

  const likeBlog = async (toUpdateBlog) => {
    console.log("liked")
    const updatedBlog = {
      ...toUpdateBlog,
      likes: toUpdateBlog.likes + 1,
    }
    setCurrBlog(updatedBlog)
    await blogService.updateBlog(updatedBlog.id, updatedBlog)
    dispatch(changeBlog(updatedBlog))
  }

  const handleLike = async (event) => {
    event.preventDefault()
    await likeBlog(currBlog)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    await deleteBlog(currBlog)
  }

  const submitComment = async (event) => {
    event.preventDefault()
    await blogService.commentBlog(currBlog.id, comment)
    setCurrBlog({ ...currBlog, comments: currBlog.comments.concat(comment) })
  }
  return (
    <div>
      <h1>{currBlog.title}</h1>
      {currBlog.url} <br></br>
      {`likes ${currBlog.likes}`} <button onClick={handleLike}>like</button><br></br>
      added by {currBlog.user.username} <br></br>
      {currUsername === currBlog.user.username && (<button onClick={(event) => handleDelete(event)}>delete</button>)}
      <h2>Comments</h2>
      <form onSubmit={submitComment}>
        <input type="text" onChange={({ target }) => setComment(target.value)}></input>
      </form>
      {currBlog.comments.map((comment, index) => <li key={`${currBlog.id}${index}`}>{comment}</li>)}
    </div>
  )
}

export default BlogDetail