import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notifyAction } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
    <div>
        {anecdote.content}
    </div>
    <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
    </div>
    </div>
  )
}

const AnecdoteList = (props) => {
 
  const vote = (id) => {
    props.voteAction(id)
    props.notifyAction({
        message: 'You voted',
        type: 'info'
    }, 10)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id)} />
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === '') {
      return anecdotes
  }

  const lowerCaseFilter = filter.toLowerCase()

  return anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .startsWith(lowerCaseFilter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
    voteAction,
    notifyAction
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
