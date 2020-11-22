const  { gql } = require('apollo-server');

module.exports = gql`   
    input Login {
        email: String
        password: String
    }
    
    input UserInput {
        name: String
        email: String
        access: [String]
        role: String
        password: String
    }
    
    input GroupInput {
        name: String
        icon: String
    }
    
    input BudgetInput {
        title: String
        user: ID
        people: [PeopleInput]
        period: [PeriodInput]
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
        title: String
        type: String
        when: String
        category: String
        comment: String
        amount: Float
    }
`;