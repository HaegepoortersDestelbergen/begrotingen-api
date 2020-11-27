const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    # mutate users
    register(user: UserInput): User
    deleteUser(id: String): User
    
    # mutate groups
    addGroup(name: String, icon: String, id: String): Group
    deleteGroup(id: String): Group
    
    # mutate budgets
    addBudget(budget: BudgetInput, id: String): Budget
    deleteBudget(id: String): Budget
    
    # mutate costs
    addCost(cost: CostInput, id: String): Cost
    deleteCost(id: String): Cost
  }
`