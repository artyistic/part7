import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const deleteBlog = async (deleteId) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${deleteId}`, config)

}

const updateBlog = async (updatedId, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.put(`${baseUrl}/${updatedId}`, updatedBlog, config)
}

const setToken = (updateToken) => {
  token = `Bearer ${updateToken}`
}


export default { getAll, createNew, deleteBlog, updateBlog, setToken }