const { gql } = require('apollo-server');

module.exports = gql`
    scalar Date
    
    type User {
        id: ID
        name: String
        email: String
        password: String
        access: [Access]
        role: Int
    }
    
    type Access {
        groupId: String
        type: String
    }
    
    type Group {
        id: ID
        name: String
        icon: String
    }
    
    type Budget {
        id: ID
        title: String
        comment: String
        groupId: ID
        people: People
        period: Period
        created: Date
    }
    
    type Cost {
        id: ID
        budgetId: ID
        title: String
        comment: String
        category: CostCategory
        type: CostType
        when: CostWhen
        amount: Float
        created: Date
        order: Int
    }
    
    type People {
        free: Int
        paying: Int
    }
    
    type Period {
        start: Date
        end: Date
    }
    
    type AuthData {
        userId: String,
        token: String
    }
    
    type Share {
        id: ID
        budgetId: ID
        budget: Budget
        costs: [Cost]
        expires: ShareValid
        rights: String
        label: String
        created: Date
    }
`;