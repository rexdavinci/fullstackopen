import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { signup, getUsers }