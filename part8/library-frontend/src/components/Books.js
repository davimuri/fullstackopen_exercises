import React, { useState } from 'react'

const ALL_GENRES = 'all genres'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(ALL_GENRES)
  if (!props.show) {
    return null
  }
  const { loading, error, data } = props.allBooksResultQuery
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const books = data.allBooks

  const genres = new Set()
  books.forEach(b => {
    b.genres.forEach(g => genres.add(g))
  })
  genres.add(ALL_GENRES)

  const genreFilters = Array.from(genres).map(g => 
    <button key={g} onClick={() => setGenreFilter(g)}>{g}</button>
  )

  const booksToShow = genreFilter === ALL_GENRES ? books 
    : books.filter(b => b.genres.includes(genreFilter))

  return (
    <div>
      <h2>books</h2>
      {genreFilters}
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
          {booksToShow.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books