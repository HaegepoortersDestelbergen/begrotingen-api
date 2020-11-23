const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    register(user: UserInput): User
    deleteUser(id: String): User
    addGroup(name: String, icon: String): Group
    deleteGroup(id: String): Group
  }
`