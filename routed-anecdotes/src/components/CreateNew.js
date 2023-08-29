import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => props.setNotification(""), 5000)
    navigate("/")
  }

  const resetAllFields = () => {
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

//  {...(({resetValue, ...rest}) => rest)(content)} creates a new object excluding the resetValue attribute of the useField object 

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...(({resetValue, ...rest}) => rest)(content)} />
        </div>
        <div>
          author
          <input name='author' {...(({resetValue, ...rest}) => rest)(author)}/>
        </div>
        <div>
          url for more info
          <input name='info' {...(({resetValue, ...rest}) => rest)(info)} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetAllFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
