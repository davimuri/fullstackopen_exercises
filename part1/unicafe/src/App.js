import React, { useState } from 'react';

const Button = (props) => (
  <>
    <button onClick={props.onClick} >{props.text}</button>
  </>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td><td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <table>
          <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.total} />
            <Statistic text="average" value={props.average} />
            <Statistic text="positive" value={props.positive + " %"} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Statistics</h3>
        No feedback given <br />
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h3>Give feedback</h3>
      <Button text="good" onClick={() => setGood(good+1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral+1)} />
      <Button text="bad" onClick={() => setBad(bad+1)} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App;
