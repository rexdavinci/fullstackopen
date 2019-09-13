import React from 'react'

const Course = ({courses}) =>{
  return courses.map(course=>{
    return (
      <div key={course.id}>
        <Header header={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
  })
}

const Header = ({header})=>{
  return(
    <h2>{header}</h2>
  )
}

const Content = ({parts})=>{
  const part = parts.map(part=><Part key={part.id} part={part}/>)
  const exercises = parts.map(part=>part.exercises)
  const total = exercises.reduce((sum, current)=>sum+current, 0)
  return (
    <>
      {part}
      <Total total={total}/>
    </>
  )
}
const Part = ({part})=>{
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({total})=><p><b>total of {total} exercises</b></p>

export default Course