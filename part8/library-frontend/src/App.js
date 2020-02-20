import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import './App.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/RecommendedBooks'
import LoginForm from './components/LoginForm'

const ME = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    id
    title
    published
    genres
    author {
      id
      name
      born
      bookCount
    }
  }
}`

const ALL_AUTHORS = gql`
  {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const UPDATE_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    id,
    name,
    born,
    bookCount
  }
}`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setToken(window.localStorage.getItem('library-user-token'))
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const client = useApolloClient()
  const meResultQuery = useQuery(ME)
  const allBooksResultQuery = useQuery(ALL_BOOKS)
  const allAuthorsResultQuery = useQuery(ALL_AUTHORS)
  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      const allBooksInStore = store.readQuery({ query: ALL_BOOKS })
      allBooksInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: allBooksInStore
      })
      const allAuthorsInStore = store.readQuery({ query: ALL_AUTHORS })
      allAuthorsInStore.allAuthors.push(response.data.addBook.author)
      store.writeQuery({
        query: ALL_AUTHORS,
        data: allAuthorsInStore
      })
    }
  })
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: handleError,
    update: (store, response) => {
      const allAuthorsInStore = store.readQuery({ query: ALL_AUTHORS })
      allAuthorsInStore.allAuthors = allAuthorsInStore.allAuthors.map(
        a => a.id === response.data.editAuthor.id ? response.data.editAuthor : a
      )
      store.writeQuery({
        query: ALL_AUTHORS,
        data: allAuthorsInStore
      })
    }
  })

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  const loginOrLogout = token 
    ? <button onClick={() => logout()}>logout</button> 
    : <button onClick={() => setPage('login')}>login</button>

  const displayError = errorMessage
    ? <div style={{ color: 'red' }}>
        {errorMessage}
      </div>
    : null

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
          </>
        }
        {loginOrLogout}
      </div>

      {displayError}

      <Authors
        show={page === 'authors'}
        allAuthorsResultQuery={allAuthorsResultQuery}
        updateAuthor={updateAuthor}
      />

      <Books
        show={page === 'books'}
        allBooksResultQuery={allBooksResultQuery}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        meResultQuery={meResultQuery}
        allBooksResultQuery={allBooksResultQuery}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        handleError={handleError}
      />
    </div>
  )
}

export default App
