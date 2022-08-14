import { useState } from 'react'

const StatisticLine = (props) => {
  return <p>{props.text} {props.value} </p>
}
const Statistics = (props) => {

  const getTotal = () => {
    return (props.good + props.neutral + props.bad)
  }

  // Weird average where good = 1, neutral = 0, bad = -1
  // I could only come up with calculating it through an offset
  const getAverage = () => {
    return (((props.good*3+props.neutral*2+props.bad*1) / (props.good+props.neutral+props.bad)) - 2)
  }

  const getPercentage = () => {
    return ((props.good / (props.good+props.neutral+props.bad) ) * 100) + "%"
  }

  // Check if we have any feedback or not
  if (props.good + props.neutral + props.bad)
  {
    return (
      <div>
          <h2>statistics</h2>
          <StatisticLine text={"good"} value={props.good} />
          <StatisticLine text={"neutral"} value={props.neutral} />
          <StatisticLine text={"bad"} value={props.bad} />
          <StatisticLine text={"all"} value={getTotal()} />
          <StatisticLine text={"average"} value={getAverage()} />
          <StatisticLine text={"positive"} value={getPercentage()} />
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
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
        <Button handleClick={() => handleGoodClick()} text="good" />
        <Button handleClick={() => handleNeutralClick()} text="neutral" />
        <Button handleClick={() => handleBadClick()} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

