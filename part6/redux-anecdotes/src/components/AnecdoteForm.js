import React from 'react'
import { connect } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { notifyAction } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdoteAction(text)
    props.notifyAction({
      message: 'Your anecdote was added',
      type: 'info'
    }, 10)
  }
    
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdoteAction,
  notifyAction
}

const ConnectedAnecdoteForm = connect(
  null, mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
