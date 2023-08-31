import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
const Blog = ({ blog, currUsername }) => {

  return (
    <ListGroup.Item className="blog">
      <Link to={`/blogs/${blog.id}`} state={ { blog, currUsername } }>{blog.title}</Link>
      {/* <Togglable buttonLabel="view">
        <div className="hiddenByDefault">
          {blog.url} <br></br>
          {`likes ${blog.likes}`} <button onClick={handleLike}>like</button><br></br>
          {blog.user.username} <br></br>
          {currUsername === blog.user.username && (<button onClick={(event) => handleDelete(event)}>delete</button>)}
        </div>
      </Togglable> */}
      {/* <Route path="/blogs/:id" element={
        <div>
          {blog.url} <br></br>
          {`likes ${blog.likes}`} <button onClick={handleLike}>like</button><br></br>
          {blog.user.username} <br></br>
          {currUsername === blog.user.username && (<button onClick={(event) => handleDelete(event)}>delete</button>)}
        </div>
      }>
      </Route> */}
    </ListGroup.Item>

  )
}

export default Blog