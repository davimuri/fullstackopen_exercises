const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v4')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int,
    bookCount: Int
  }
  type Query {
    hello: String!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]!
    booksByAuthor(name: String!): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!  
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const findBooks = (root, args) => {
  let filteredBooks = books
  if (args.author) {
    filteredBooks = filteredBooks.filter(b => b.author === args.author)
  }
  if (args.genre) {
    filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
  }
  return filteredBooks
}

const addBook = (root, args) => {
  const newBook = { ...args, id: uuid() }
  books = books.concat(newBook)
  if (authors.findIndex(a => a.name === args.author) < 0) {
    const newAuthor = {
      name: args.author,
      id: uuid()
    }
    authors = authors.concat(newAuthor)
  }
  return newBook
}

const editAuthor = (root, args) => {
  const index = authors.findIndex(a => a.name === args.name)
  if (index < 0) {
    return null
  }
  const updatedAuthor = { ...authors[index], born: args.setBornTo }
  authors = [
    ...authors.slice(0, index),
    updatedAuthor,
    ...authors.slice(index + 1, authors.length)
  ]
  return updatedAuthor
}

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => books.length,
    allBooks: (root, args) => findBooks(root, args),
    booksByAuthor: (root, args) => books.filter(b => b.author === args.name),
    authorCount: () => authors.length,
    allAuthors: () => authors
  },
  Mutation: {
    addBook: (root, args) => addBook(root, args),
    editAuthor: (root, args) => editAuthor(root, args)
  },
  Author: {
    bookCount: (root) => {
      return books.filter(b => b.author === root.name).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})