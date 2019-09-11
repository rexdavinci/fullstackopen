import React, {useState} from 'react';
import ReactDOM from 'react-dom';

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
        <table>
          <tbody>
            <Statistic text='good' value={good}/>
            <Statistic text='neutral' value={neutral}/>
            <Statistic text='bad' value={bad}/>
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
      <Button handle={handleNeutral} text='neutral' />
      <Button handle={handleBad} text='bad' />
      {/* <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button> */}
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

