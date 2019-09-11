import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (feedback) => ()=>{
    if(feedback === 'good'){
      setGood(good+1)
    } else if(feedback==='neutral'){
      setNeutral(neutral+1)
    } else{
      setBad(bad+1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClick('good')}>good</button>
      <button onClick={handleClick('neutral')}>neutral</button>
      <button onClick={handleClick('bad')}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

