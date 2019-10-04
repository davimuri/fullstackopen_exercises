import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const random = (min, max) =>  Math.floor(Math.random() * (max - min)) + min

const Button = ({onClick, text}) => (
    <>
      <button onClick={onClick} >{text}</button>
    </>
)

const Anecdote = ({title, anecdote, votes}) => (
    <>
        <h3>{title}</h3>
        {anecdote} <br />
        has {votes} votes <br />
    </>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const initialVotes = []
    anecdotes.forEach( e => initialVotes.push(0) )
    const [votes, setVotes] = useState(initialVotes)
  
    const addVote = () => () => {
        const newVotes = [ ...votes ]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    const getMostVotedIndex = () =>  {
        let mostVotedIndex = -1
        votes.forEach( (v, i) => {
            if (v > mostVotedIndex) {
                mostVotedIndex = i
            }
        })
        return mostVotedIndex
    }

    return (
      <div>
        <Anecdote title="Anecdote of the day" anecdote={props.anecdotes[selected]} votes={votes[selected]} />
        <Button text="vote" onClick={addVote()} />
        <Button text="next anecdote" onClick={() => setSelected(random(0, anecdotes.length))} />
        <Anecdote title="Anecdote with most votes" anecdote={props.anecdotes[getMostVotedIndex()]} 
            votes={votes[getMostVotedIndex()]} />
      </div>
    )
}
  
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
