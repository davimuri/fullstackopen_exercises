import React from 'react'

const RecommendedBooks = (props) => {
  if (!props.show) {
    return null
  }
  const { loading, error, data } = props.allBooksResultQuery
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const favoriteGenre = props.meResultQuery.data.me.favoriteGenre
  const booksToShow = data.allBooks.filter(b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favoriteGenre}</p>
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

export default RecommendedBooks