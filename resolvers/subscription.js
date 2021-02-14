const { withFilter } = require("apollo-server");
const pubsub = require("./pubsub");

module.exports = {
    Subscription: {
        budgetAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('BUDGET_EDIT'),
                ({ budgetAdded: payload }, params) => payload.groupId === params.groupId
            )
        },
        costEdit: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('COST_EDIT'),
                (payload, params) => payload.budgetId === params.budgetId
            )
        },
        costDelete: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('COST_DELETE'),
                (payload, params) => params.budgetId === payload.budgetId
            )
        }
    }
}