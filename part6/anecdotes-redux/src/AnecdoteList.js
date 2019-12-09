import React from 'react'
import { voteFor } from './reducers/anecdoteReducer';
import { voted } from './reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const { visibleAnecdotes } = props

  visibleAnecdotes.sort((a,b)=>{
    if(a.votes > b.votes) return -1
    if(b.votes > a.votes) return 1
    return 0
  })

  const vote = (id, content) => {
    props.voteFor(id)
    props.voted(`you voted "${content}"`, 10)
  }

  return (
    <div>
      {
        visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const anecdotesToShow = ({anecdotes, filters}) => {
  if(filters === 'ALL'){
    return anecdotes
  }
  return anecdotes.filter(anecdote=>anecdote.content.toLowerCase().includes(filters.toLowerCase()))
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filters: state.filters,
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voted, voteFor
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList
