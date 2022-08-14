import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selectedAnecdote, setAnecdote] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleRandomAnecdote = () => {
    setAnecdote(Math.floor(Math.random() * (anecdotes.length)))
  }

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => handleGoodClick()} text="good" />
        <Button handleClick={() => handleNeutralClick()} text="neutral" />
        <Button handleClick={() => handleBadClick()} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
        <h2>Ahecdote of the day</h2>
	<p>{anecdotes[selectedAnecdote]}</p>
        <Button handleClick={() => handleRandomAnecdote()} text="random anecdote" />
    </div>
  )
}

export default App

