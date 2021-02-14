const { gql } = require('apollo-server');

module.exports = gql`   
    input Login {
        email: String
        password: String
    }
    
    input UserInput {
        name: String
        email: String
        role: Int
        password: String
        access: [AccessInput]
    }
    
    input AccessInput {
        groupId: String
        type: String
    }
    
    input GroupInput {
        name: String
        icon: String
    }
    
    input BudgetInput {
        title: String
        comment: String
        groupId: ID
        people: PeopleInput
        period: PeriodInput
        created: Date
    }
    
    input PeriodInput {
        start: Date
        end: Date
    }
    
    input PeopleInput {
        free: Int
        paying: Int
    }
    
    input CostInput {
        id: ID
        budgetId: ID
        title: String
        comment: String
        category: CostCategory
        type: CostType
        when: CostWhen
        amount: Float
        created: Date
    }
    
    input ShareInput {
        budgetId: ID
        expires: ShareValid
        rights: String
        label: String
        created: Date
    }
`;