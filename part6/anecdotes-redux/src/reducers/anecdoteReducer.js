import anecdoteService from '../services/anecdotes'

export const create = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteFor = id => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteVoted = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer