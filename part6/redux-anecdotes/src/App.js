import './App.css'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initializeAnecdotesAction } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => { props.initializeAnecdotesAction() } ,[])

  return (
    <div>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { initializeAnecdotesAction })(App)