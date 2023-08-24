import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import ShowLoggedInUser from "./components/ShowLoggedInUser"
import LoginForm from "./components/LoginForm"
import ShowBlogs from "./components/ShowBlogs"
const App = () => {
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState("")

  useEffect(() => {
    //check for cached in user
    const cachedUser = window.localStorage.getItem("loggedInUser")
    if (cachedUser) {
      const user = JSON.parse(cachedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    document.title = "Blogs"
  })

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} />
      <h1>Blogs</h1>
      {user === null ? (
        <LoginForm setUser={setUser} setMessage={setMessage} />
      ) : (
        <>
          <ShowLoggedInUser name={user.name} />
          <button onClick={handleLogout}>Logout</button>
          <ShowBlogs setMessage={setMessage} username={user.username} />
        </>
      )}
    </div>
  )
}

export default App
