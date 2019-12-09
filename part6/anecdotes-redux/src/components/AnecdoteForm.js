import React from 'react'
import {connect} from 'react-redux'
import { create } from '../reducers/anecdoteReducer';
import { addedNew, addFailed } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async event => {
    event.preventDefault()
    event.persist()
    const content = event.target.anecdote.value
    if(content.length > 0){
      event.target.anecdote.value = ''
      props.create(content)
      props.addedNew(`New Anecdote "${content}" Added Successfully`, 10)
    }else{
      props.addFailed('There is nothing to add', 10)
    }
  }

  const style = {
    marginTop: 10,
    marginBottom: 10,
    border: 1.5,
    borderStyle: "solid",
    borderColor: "orange",
    padding: 8
  }

  return (
    <div style={style}>
      <h2>Add Anecdote</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>Create</button>
      </form>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = {
  create, addedNew, addFailed
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
