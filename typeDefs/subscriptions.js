/**
 * The GraphQL subscription
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Subscription {
    budgetAdded(groupId: ID): Budget
    costEdit(budgetId: ID): Cost
    costDelete(costId: ID): ID
  }
`