const { model } = require('mongoose');

const UserSchema = require('./schemas/user');
const GroupSchema = require('./schemas/group');
const BudgetSchema = require('./schemas/budget');
const CostSchema = require('./schemas/cost');
const ShareSchema = require('./schemas/share');

module.exports = {
    User: model('User', UserSchema),
    Group: model('Group', GroupSchema),
    Budget: model('Budget', BudgetSchema),
    Cost: model('Cost', CostSchema),
    Share: model('Share', ShareSchema)
}