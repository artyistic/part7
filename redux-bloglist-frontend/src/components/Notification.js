import { useSelector } from "react-redux"

const Notification = () => {
  const notifcation = useSelector(state => state.notification)
  if (notifcation === "") return null
  else{
    return (
      <div>
        {notifcation}
      </div>
    )
  }
}

export default Notification