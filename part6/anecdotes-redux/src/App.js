import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = props => {

  useEffect(()=>{
    props.initializeAnecdotes()
  }, [])

  return (
    <div>
      <h1>Programming Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}


const connectedApp = connect(null, { initializeAnecdotes })(App)

export default connectedApp