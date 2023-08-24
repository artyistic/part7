import { useEffect } from "react"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import ShowLoggedInUser from "./components/ShowLoggedInUser"
import LoginForm from "./components/LoginForm"
import ShowBlogs from "./components/ShowBlogs"
import { useSelector, useDispatch } from "react-redux"
import { setUser, removeUser } from "./reducers/userReducer"

const App = () => {
  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  //const [message, setMessage] = useState("")

  useEffect(() => {
    //check for cached in user
    const cachedUser = window.localStorage.getItem("loggedInUser")
    if (cachedUser) {
      const user = JSON.parse(cachedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    document.title = "Blogs"
  })

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedInUser")
    dispatch(removeUser(user))
  }

  return (
    <div>
      <Notification/>
      <h1>Blogs</h1>
      {user === null ? (
        <LoginForm setUser={setUser}/>
      ) : (
        <>
          <ShowLoggedInUser name={user.name} />
          <button onClick={handleLogout}>Logout</button>
          <ShowBlogs username={user.username} />
        </>
      )}
    </div>
  )
}

export default App
