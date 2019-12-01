import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const asObject = (text) => {
  return {
    content: text,
    votes: 0
  }
}
  
const create = async (text) => {
  const anecdote = asObject(text)
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await getById(id)
  const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, getById, create, vote }