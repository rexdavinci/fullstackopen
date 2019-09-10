import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props)=>{
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props)=>{
  const {part, exercise} = props
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  )
}

const Content = (props)=>{
  const {exercises1, exercises2, exercises3} = props.exercises
  const {part1, part2, part3} = props.parts
  return(
    <>
      <Part part={part1} exercise={exercises1}/>
      <Part part={part2} exercise={exercises2}/>
      <Part part={part3} exercise={exercises3}/>
    </>
  )
}

const Total = (props)=>{
  return(
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content exercises={{exercises1, exercises2, exercises3}} parts={{part1, part2, part3}}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
