import anecdoteService from '../services/anecdotes'

const reduceVote = (state, action) => {
  const index = state.findIndex(anecdote => anecdote.id === action.data.id)
  const votedAnecdote = action.data
  const newState = [
    votedAnecdote,
    ...state.slice(0, index),
    ...state.slice(index+1, state.size)
  ]
  newState.sort((a, b) => b.votes - a.votes)
  return newState
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return reduceVote(state, action)
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotesAction = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAction = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const addAnecdoteAction = (text) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(text)
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

export default anecdoteReducer