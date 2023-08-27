import axios from "axios"
const baseUrl = "http://localhost:3003/api/users"

const getAllUsers = () => {
  return axios.get(baseUrl)
}

export default { getAllUsers }