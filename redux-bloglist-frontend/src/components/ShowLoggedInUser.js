import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { removeUser } from "../reducers/userReducer"
const ShowLoggedInUser = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedInUser")
    dispatch(removeUser(user))
  }
  if (!user.name) return null
  else{
    return (
      <>
        {user.name} is now logged in <button onClick={handleLogout}>Logout</button>
      </>
    )
  }
}

export default ShowLoggedInUser