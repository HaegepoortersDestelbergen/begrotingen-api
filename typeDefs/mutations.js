const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    # mutate users
    register(user: UserInput): User
    deleteUser(id: String): User
    
    # mutate groups
    addGroup(name: String, icon: String, id: ID): Group
    deleteGroup(id: String): Group
    
    # mutate budgets
    addBudget(budget: BudgetInput, id: ID): Budget
    deleteBudget(id: String): Budget
    
    # mutate costs
    addCost(cost: CostInput, id: ID): Cost
    deleteCost(id: String): Cost
    
    # mutate shares
    addShare(share: ShareInput, id: ID): Share
    deleteShare(id: ID): Share
  }
`