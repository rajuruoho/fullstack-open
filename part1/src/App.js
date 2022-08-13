import { useState } from 'react'

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

  const getTotal = () => {
    return (good + neutral + bad)
  }

  // weird average where good = 1, neutral = 0, bad = -1
  // I could only come up with calculating it through an offset
  const getAverage = () => {
    return (((good*3+neutral*2+bad*1) / (good+neutral+bad)) - 2)
  }

  const getPercentage = () => {
    return ((good / (good+neutral+bad) ) * 100)
  }

  return (
    <div>
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <h2>statistics</h2>
        <p>good {good} </p>
        <p>neutral {neutral} </p>
        <p>bad {bad} </p>
        <p>all {getTotal()} </p>
        <p>average {getAverage()}</p>
        <p>positive {getPercentage()} % </p>
    </div>
  )
}

export default App

