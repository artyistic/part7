import loginService from "../services/login"
import blogService from "../services/blogs"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { clearNotification, setNotification } from "../reducers/notificationReducer"
import { setUser } from "../reducers/userReducer"

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(username, password)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")

      // cache in local storage
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      dispatch(setNotification("you are logged in"))
      setTimeout(() => dispatch(clearNotification()), 5000)
    } catch (exception) {
      dispatch(setNotification("wrong login credentials"))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm