const { withFilter } = require("apollo-server");
const pubsub = require("./pubsub");

module.exports = {
    Subscription: {
        budgetAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('BUDGET_ADDED'),
                ({ budgetAdded: payload }, params) => payload.groupId === params.groupId
            )
        },
        costAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('COST_ADDED'),
                ({ costAdded: payload }, params) => payload.budgetId === params.budgetId
            )
        }
    }
}