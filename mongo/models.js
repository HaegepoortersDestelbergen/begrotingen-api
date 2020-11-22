const { model } = require('mongoose');

const UserSchema = require('./schemas/user');
const GroupSchema = require('./schemas/group');

module.exports = {
    User: model('User', UserSchema),
    Group: model('Group', GroupSchema),
}