import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (1000000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async content => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

// const updateLikes = (id, updateBlog) => {
//   return axios.put(`${baseUrl}/${id}`, updateBlog)
// }

const vote = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  const upvoteObject = {...request.data, votes: request.data.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, upvoteObject)
  return response.data
}

export default { getAll, addNew, vote }