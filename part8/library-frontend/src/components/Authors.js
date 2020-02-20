import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }
  if (props.allAuthorsResultQuery.loading) return <p>Loading...</p>
  if (props.allAuthorsResultQuery.error) return <p>Error</p>

  const authors = props.allAuthorsResultQuery.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    props.updateAuthor({
      variables: {
        name: name,
        setBornTo: parseInt(born)
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map(a =>
                <option key={a.id} value={a.name}>{a.name}</option>
              )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors