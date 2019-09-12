import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text})=>{
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const MostVotes = ({anecdotes, votes, highestVote}) => {
  const pos = votes.indexOf(highestVote)
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[pos]}
      <p>has {highestVote} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(()=>Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const highestVote = Math.max(...votes)

  const handleClick =()=>{
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const handleVotes =()=>{
    const newVal = [...votes]
    newVal[selected]+=1
    setVotes(newVal)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <p>has {votes[selected]} votes</p>
        <Button handleClick={handleClick} text='next anecdote'/>
        <Button handleClick={handleVotes} text='vote' />
      </div>
      <div>
      {
        highestVote > 0 ? <MostVotes anecdotes={props.anecdotes} votes={votes} highestVote={highestVote}/> : (null)
      }
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)