const { 
  ApolloServer, gql, UserInputError, AuthenticationError, PubSub 
} = require('apollo-server')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const mongoose = require('mongoose')
const User = require('./models/user')
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
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
    me: User
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]!
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
  type Subscription {
    bookAdded: Book!
  }
`

const pubsub = new PubSub()

const createUser = (root, args) => {
  const user = new User({
    username: args.username,
    favoriteGenre: args.favoriteGenre
  })
  return user.save()
}

const login = async (root, args) => {
  const user = await User.findOne({ username: args.username })
  if (!user || args.password !== 'secred') {
    throw new UserInputError("wrong credentials")
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  return { value: jwt.sign(userForToken, config.SECRET) }
}

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

const addBook = async (root, args, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("not authenticated")
  }
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
    const bookSaved = book.save()
    pubsub.publish('BOOK_ADDED', { bookAdded: bookSaved })
    return bookSaved
  } catch (error) {
    console.log(error.message)
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
}

const editAuthor = async (root, args, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("not authenticated")
  }
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
    me: (root, args, context) => {
      const usr = context.currentUser
      if (!usr) {
        throw new AuthenticationError("not authenticated")
      }
      return usr
    },
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => findBooks(root, args),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({})
  },
  Mutation: {
    createUser: (root, args) => createUser(root, args),
    login: (root, args) => login(root, args),
    addBook: (root, args, context) => addBook(root, args, context),
    editAuthor: (root, args, context) => editAuthor(root, args, context)
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
  Author: {
    bookCount: (root) => Book.where({ author: root._id }).countDocuments()
  },
  Book: {
    author: (root) => Author.findById(root.author)
  }
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    } catch (error) {
      return {}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})