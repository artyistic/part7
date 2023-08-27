
const UserStats = ({ userChosen }) => {
  if (!userChosen) {
    return null
  }
  return (
    <>
      <h2>{userChosen.name}</h2>
      {userChosen.blogs.map(blog => {
        return (
          <li key={blog.id}>{blog.title}</li>
        )
      })}
    </>
  )
}

export default UserStats