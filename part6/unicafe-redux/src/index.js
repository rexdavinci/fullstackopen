import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import feedbackReducer from './reducer'

const store = createStore(feedbackReducer)

const Statistic =({text, value})=>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({handle, text})=>{
  return (
    <>
      <button onClick={handle}>
        {text}
      </button>
    </>
  )
}

const Statistics = (props) =>{
  const {good, ok, bad, reset} = props.statistics
  let all
  let average
  let positive

  const goodFeedback = store.getState().good
  const okFeedback = store.getState().ok
  const badFeedback = store.getState().bad

  const handleGood = ()=>{
    good()
  }

  const handleNeutral = () =>{
    ok()
  }

  const handleBad =()=>{
    bad()
  }

  const handleReset =()=>{
    reset()
  }

  const handleAll=()=>{
    all = goodFeedback + okFeedback + badFeedback
    return all
  }

  const handleAverage = ()=>{
    average = ((goodFeedback*1)+(okFeedback*0)+(badFeedback*-1))/all
    if(average > 0){
      return average
    }
    return 0
  }

  const handlePositive = () =>{
    positive = ((goodFeedback / (goodFeedback + okFeedback + badFeedback)) * 100).toFixed(2)
    if(!isNaN(positive)){
      return positive
    }
    return 0
  }

  const checkStat = () =>{
    return (goodFeedback === 0 && badFeedback === 0 && okFeedback === 0) ? (
      <p>No feedback given</p>
    ):(
      <>
        <table>
          <tbody>
            <Statistic text='good' value={goodFeedback}/>
            <Statistic text='neutral' value={okFeedback}/>
            <Statistic text='bad' value={badFeedback}/>
            <tr>
              <td>all</td>
              <td>{handleAll()}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{handleAverage()}</td>
            </tr>
            <tr>
              <td>postive</td>
              <td>{handlePositive()} %</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }

  return(
    <>
      <h1>give feedback</h1>
      <Button handle={handleGood} text='good' />
      <Button handle={handleNeutral} text='Neutral' />
      <Button handle={handleBad} text='Bad' />
      <Button handle={handleReset} text='Reset Stats' />
      {checkStat()} 
    </>
  )
}

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  return (
    <div>
      <Statistics statistics = {{ good, ok, bad, reset }}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)
