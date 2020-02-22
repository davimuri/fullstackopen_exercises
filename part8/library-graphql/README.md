# library-graphql
This is a simple GraphQL server endpoint using [Apollo GraphQL](https://www.apollographql.com/docs/).
Solution to exercises of https://fullstackopen.com/en/part8/graph_ql_server#exercises

## Key features

* Login mutation that returns a token
* Add book mutation which creates author if it doesn't exist
* Edit author mutation to update born date
* Subscription that notifies to clients when a book is created

## Main libs used

* Apollo GraphQL
* Mongoose for MongoDB
* JSON web token