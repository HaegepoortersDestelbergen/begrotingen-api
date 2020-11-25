const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    login(user: Login): AuthData
    group(id: String, access: [AccessInput]): [Group]
    user(id: String): [User]
    budget(id: String, groupId: String): [Budget]
    cost(id: String, budgetId: String): [Cost]
  }
`