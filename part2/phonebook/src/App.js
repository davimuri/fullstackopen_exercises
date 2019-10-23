import React, { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification ] = useState({ message: null , type: null })

  useEffect(() => {
    console.log('effect')
    getPersons()
  }, [])

  const getPersons = () => {
    personsService
      .getAll()
      .then(personList => {
        console.log('promise fulfilled')
        setPersons(personList)
      })
  }

  console.log('render', persons.length, 'persons')

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(p => nameFilter ? 
    p.name.toLowerCase().startsWith(nameFilter.toLowerCase()) : true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletePerson = personToDelete => () => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personsService
        .remove(personToDelete.id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== personToDelete.id))
          sendNotification({ message: `${personToDelete.name} was deleted`, type: 'info'})
        })
        .catch(error => {
          sendNotification({ message: `Error: ${personToDelete.name} was alreaday deleted`, type: 'error'})
          getPersons()
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personWithSameName = persons.find(p => p.name === newName)
    if (personWithSameName !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        const newPerson = { name: newName, number: newNumber }
        personsService
          .update(personWithSameName.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === personWithSameName.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
            sendNotification({ message: `${updatedPerson.name}'s number was updated`, type: 'info'})
          })
          .catch(error => {
            sendNotification({ message: `Error: ${personWithSameName.name} couldn't be updated`, type: 'error'})
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          sendNotification({ message: `${createdPerson.name} was added`, type: 'info'})
        })
        .catch(error => {
          sendNotification({ message: `Error: ${newPerson.name} couldn't be added`, type: 'error'})
        })
    }
  }

  const sendNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification({ message: null , type: null })
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />
      <Filter nameFilter={nameFilter} eventHandler={handleNameFilterChange} />
      <h2>Add contact</h2>
      <PersonForm onSubmit={addPerson} name={newName} onChangeName={handleNameChange} 
        number={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteHandler={handleDeletePerson}/>
    </div>
  )
}

export default App;
