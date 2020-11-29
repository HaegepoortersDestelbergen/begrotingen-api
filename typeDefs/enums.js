const { gql } = require('apollo-server');

module.exports = gql`
    enum CostType {
        FIXED
        PER_PERSON
        PER_PAYER
        PER_FREE
        INCOME
    }
    
    enum CostWhen {
        ONETIME
        PER_DAY
        PER_NIGHT
    }
    
    enum CostCategory {
        SHOPPING
        FOOD
        LOCATION
        DRINKS
        TRANSPORT
        NIGHT
        INSURANCE
        GWE
        GIFT
        BENEFIT
        OTHER
    }
    
    enum ShareValid {
        NEVER
        WEEK_2
        WEEK_4
        MONTH_3
        MONTH_6
    }
`;