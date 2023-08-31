import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notifcation = useSelector(state => state.notification)
  if (notifcation === "") return null
  else{
    return (
      <Alert variant="success">
        {notifcation}
      </Alert>
    )
  }
}

export default Notification