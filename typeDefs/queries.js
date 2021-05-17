const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    login(user: Login): AuthData
    group(id: String, access: [AccessInput]): [Group]
    user(id: String): [User]
    budget(id: String, groupId: String): [Budget]
    budgetTotal(budgetId: ID, people: PeopleInput, days: Int ): Float
    cost(id: String, budgetId: String): [Cost]
    costAmount(budgetId: ID): Int
    share(id: String, budgetId: String): [Share]
  }
`