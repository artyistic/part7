const Notification = ({ message }) => {
  if (message === "") return null
  else{
    return (
      <div>
        {message}
      </div>
    )
  }
}

export default Notification