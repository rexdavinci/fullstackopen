import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const Statistics = (props) =>{
  const {good, setGood, neutral, setNeutral, bad, setBad} = props.statistics
  let all
  let average
  let positive      

  const handleGood = ()=>{
    setGood(good+1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1)
  }

  const handleBad =()=>{
    setBad(bad+1)
  }

  const handleAll=()=>{
    all = good+neutral+bad
    return all
  }

  const handleAverage = ()=>{
    average = ((good*1)+(neutral*0)+(bad*-1))/all
    if(!isNaN(average)){
      return average
    }
    return 0
  }

  const handlePositive = () =>{
    positive = (good/(good+neutral+bad))*100
    if(!isNaN(positive)){
      return positive
    }
    return 0
  }

  const checkStat = () =>{
    return (good === 0 && bad === 0 && neutral === 0) ? (
      <p>No feedback given</p>
    ):(
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {handleAll()}</p>
        <p>average {handleAverage()}</p>
        <p>positive {handlePositive()} %</p>
      </>
    )
  }

  return(
    <>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      {checkStat()}  
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Statistics statistics = {{good, setGood, neutral, setNeutral, bad, setBad}}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

