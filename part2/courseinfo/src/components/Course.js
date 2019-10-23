import React from 'react';

const Header = ({ name }) => (
    <h1>{name}</h1>
)
  
const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)
  
const Content = ({ parts }) => {

    const partList = parts.map(p => <Part key={p.id} part={p} />)

    return (
        <>
        {partList}
        </>
    )
}
  
const Total = ({ total }) => (
    <p><strong>Total of exercises {total} exercises</strong></p>
)
  
const Course = ({ course }) => {

    const totalExercises = course.parts
        .map(part => part.exercises)
        .reduce((prev, current) => prev + current)

    return (
        <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total total={totalExercises} />
        </>
    )
}

export default Course;