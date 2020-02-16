const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v4')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

// deprecation warnings https://mongoosejs.com/docs/deprecations.html
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(config.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(result => {
      console.log('connected to MongoDB')
  })
  .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
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

const findBooks = async (root, args) => {
  const query = Book.find()
  /*if (args.author) {
    filteredBooks = filteredBooks.filter(b => b.author === args.author)
  }*/
  if (args.genre) {
    query.where('genres').in(args.genre)
  }
  return query.exec()
}

const addBook = async (root, args) => {
  let author = await Author.findOne({ name: args.author })
  try {
    if (!author) {
      author = new Author({ name: args.author })
      author = await author.save()
    }
    const book = new Book({
      ...args,
      author: author._id
    })
    return book.save()
  } catch (error) {
    console.log(error.message)
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
}

const editAuthor = async (root, args) => {
  const author = await Author.findOne({ name: args.name })
  author.born = args.setBornTo
  try {
    await author.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
  return author
}

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => findBooks(root, args),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: (root, args) => addBook(root, args),
    editAuthor: (root, args) => editAuthor(root, args)
  },
  Author: {
    bookCount: (root) => Book.where({ author: root._id }).countDocuments()
  },
  Book: {
    author: (root) => Author.findById(root.author)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})