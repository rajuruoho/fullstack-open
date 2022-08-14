import { useState } from 'react'

const Statistics = (props) => {

  const getTotal = () => {
    return (props.good + props.neutral + props.bad)
  }

  // weird average where good = 1, neutral = 0, bad = -1
  // I could only come up with calculating it through an offset
  const getAverage = () => {
    return (((props.good*3+props.neutral*2+props.bad*1) / (props.good+props.neutral+props.bad)) - 2)
  }

  const getPercentage = () => {
    return ((props.good / (props.good+props.neutral+props.bad) ) * 100)
  }

  return (
    <div>
        <h2>statistics</h2>
        <p>good {props.good} </p>
        <p>neutral {props.neutral} </p>
        <p>bad {props.bad} </p>
        <p>all {getTotal()} </p>
        <p>average {getAverage()}</p>
        <p>positive {getPercentage()} % </p>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

