const { model } = require('mongoose');

const UserSchema = require('./schemas/user');
const GroupSchema = require('./schemas/group');
const BudgetSchema = require('./schemas/budget');
const CostSchema = require('./schemas/cost');

module.exports = {
    User: model('User', UserSchema),
    Group: model('Group', GroupSchema),
    Budget: model('Budget', BudgetSchema),
    Cost: model('Cost', CostSchema)
}