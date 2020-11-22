const { gql } = require('apollo-server');

module.exports = gql`
    scalar Date
    
    type User {
        id: ID
        name: String
        email: String
        password: String
        access: [String]
        role: String
    }
    
    type Group {
        id: ID
        name: String
        icon: String
    }
    
    type Budget {
        id: ID
        title: String
        user: ID
        people: People
        period: Period
        created: Date
    }
    
    type Cost {
        id: ID
        budget: ID
        title: String
        type: String
        when: String
        category: String
        comment: String
        amount: Float
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
`;