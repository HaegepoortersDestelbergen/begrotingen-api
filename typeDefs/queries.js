const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    login(user: Login): AuthData
    group(id: String): [Group]
    user(id: String): [User]
  }
`