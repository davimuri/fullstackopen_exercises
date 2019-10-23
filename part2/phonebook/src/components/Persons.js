import React from 'react';

const Person = ({ person, deleteHandler }) => {
  return (
    <>
      {person.name} {person.number}
      <button onClick={deleteHandler(person)}>Delete</button><br />
    </>
  )
}

const Persons = ({ persons, deleteHandler }) => (
    persons.map(p => <Person key={p.id} person={p} deleteHandler={deleteHandler} />)
)

export default Persons;
