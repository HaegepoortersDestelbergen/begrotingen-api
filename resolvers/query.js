const { User, Group, Budget, Cost } = require('../mongo/models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const budget = require('../mongo/schemas/budget');
require('dotenv/config');
const { TOKEN_SALT } = process.env;

module.exports = {
    Query: {
        login: async (parent, { user }, context) => {
            const { email, password } = user;
                        
            // does user exist?
            const foundUser = await User.findOne({ email: email });
            if (!foundUser) throw new Error('User does not exist');
            
            
            // check password
            const passwordEqual = bcrypt.compareSync(password, await foundUser.password);
            if (!passwordEqual) throw new Error('Password incorrect');
            
            
            const token = jwt.sign(
                { userId: foundUser._id, access: foundUser.access, role: foundUser.role },
                TOKEN_SALT,
                { expiresIn: '2h' }
            )
            
            return {
                userId: foundUser._id,
                token
            }
        },
        
        group: async (parent, { id, access }, context) => {            
            try {
                if (id) return await Group.find({ _id: id })
                else return await Group.find({})
            } catch (err) {
                throw new Error(err);
            }
        },
        
        user: async (parent, { id }, context) => {    
            // check if id === id loged in user                    
            try {
                if (id) return await User.find({ _id: id })
                else return await User.find({})
            } catch (err) {
                throw new Error(err);
            }
        },
        
        budget: async (parent, { id, groupId }, context) => {
            try {
                if (id) return await Budget.find({ _id: id });
                else if (groupId) return await Budget.find({ groupId: groupId });
                else return await Budget.find({});
            } catch (err) {
                throw new Error(err);
            }
        },
        
        cost: async (parent, {id, budgetId }, context) => {
            try {
                if (id) return await Cost.find({ _id: id })
                else if (budgetId) return await Cost.find({ budgetId: budgetId })
                else return await Cost.find({});
            } catch (err) {
                throw new Error(err);
            }
        }
    },
}