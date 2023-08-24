import loginService from "../services/login"
import blogService from "../services/blogs"
import { useState } from "react"
const LoginForm = ({ setUser, setMessage }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(username, password)
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")

      // cache in local storage
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      setMessage("you are logged in")
      setTimeout(() => setMessage(), 5000)
    } catch (exception) {
      setMessage("wrong login credentials")
      setTimeout(() => setMessage(), 5000)
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