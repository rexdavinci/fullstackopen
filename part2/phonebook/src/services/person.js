import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () =>{
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const update = (id, updatePerson) => {
  return axios.put(`${baseUrl}/${id}`, updatePerson)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, del, update}