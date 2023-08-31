import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const CreateBlog = ({ createBlog }) => {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ url, setUrl ] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }


  return (
    <>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write blog title here"
            id="title"
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write blog author here"
            id="author"
          />
          <Form.Label>input</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write blog url here"
            id="url"
          />
        </Form.Group>
        <Button type="submit" id="create">create</Button>
      </Form>
    </>
  )
}

export default CreateBlog
