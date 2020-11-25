const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    # mutate users
    register(user: UserInput): User
    deleteUser(id: String): User
    
    # mutate groups
    addGroup(name: String, icon: String): Group
    deleteGroup(id: String): Group
    
    # mutate budgets
    addBudget(budget: BudgetInput): Budget
    deleteBudget(id: String): Budget
    
    # mutate costs
    addCost(cost: CostInput): Cost
    deleteCost(id: String): Cost
  }
`