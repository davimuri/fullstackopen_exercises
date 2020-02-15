import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
  {
    allBooks {
      id
      title
      author
      published
    }
  }
`

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books