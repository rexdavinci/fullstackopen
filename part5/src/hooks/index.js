import axios from 'axios'
import { useState } from 'react'

export const useField = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const bind = {
    value,
    onChange: e => {
      setValue(e.target.value)
    }
  }

  const reset = () => {
    setValue(initialValue)
  }
  return [value, bind, reset]
}

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getResource = async () => {
    const request = await axios(baseUrl)
    const response = request.data
    setResources(response)
  }

  const create = async (resource, token) => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, resource, config)
    return response.data
  }

  const service = {
    getResource, create
  }

  return [
    resources, service
  ]
}
