import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getBlogs = async () => {
  const request = await axios(baseUrl)
  const response = request.data
  return response
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = (id, updateBlog) => {
  return axios.put(`${baseUrl}/${id}`, updateBlog)
}

const del = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getBlogs, setToken, token, create, updateLikes, del }