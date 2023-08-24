const ShowLoggedInUser = ({ name }) => {
  if (!name) return null
  else{
    return (
      <div>
        {name} is now logged in
      </div>
    )
  }
}

export default ShowLoggedInUser