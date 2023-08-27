import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import ShowLoggedInUser from "./components/ShowLoggedInUser"
import LoginForm from "./components/LoginForm"
import ShowBlogs from "./components/ShowBlogs"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./reducers/userReducer"
import UsersView from "./components/UsersView"
import usersService from "./services/users"
import {
  Routes, Route, Link, useMatch
} from "react-router-dom"
import UserStats from "./components/UserStats"
import BlogDetail from "./components/BlogDetail"

const App = () => {
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {
    usersService.getAllUsers().then(res => setAllUsers(res.data))
  }, [])

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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

  const padding = {
    padding: 5
  }

  const match = useMatch("/users/:id")
  const userChosen = match
    ? allUsers.find(user => {
      return user.id === (match.params.id)
    })
    : null
  return (
    <>
      <div>
        <Notification/>
        {user === null ? (
          <>
            <h1>Blogs app</h1>
            <LoginForm setUser={setUser}/>
          </>
        ) : (
          <>
            <div>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              <ShowLoggedInUser/>
            </div>
            <h1>Blogs app</h1>
            <Routes>
              <Route path="/users" element={<UsersView users={allUsers}/>} />
              <Route path="/" element={<ShowBlogs username={user.username} />} />
              <Route path="/users/:id" element={
                <>
                  <UserStats userChosen={userChosen}/>
                </>
              }/>
              <Route path="/blogs/:id" element={<BlogDetail/>}/>
            </Routes>
          </>
        )}
      </div>
    </>
  )
}

export default App


