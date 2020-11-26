const pubsub = require('./pubsub');
const { User, Group, Budget, Cost } = require('../mongo/models');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {    
        register: async (parent, { user }, context) => {
            const { email, password } = user;
            
            console.log(user);
            
            // check if user exists
            if (await User.exists({ email })) throw new Error('User already exists')
            
            // hash password
            const hashedPassword = bcrypt.hashSync(password, 12);
            
            // create user
            const newUser = await User.create({ 
                ...user,
                password: hashedPassword
            });
            
            console.log(newUser)
            
            // reset password for security
            newUser.password = null;
            
            return newUser
        },
        
        deleteUser: async (parent, { id }, context) => {
            try {
                const deleted = await User.deleteOne({ _id: id })
                return await deleted;
            } catch (err) {
                console.log(err)
            }
        },
        
        addGroup: async (parent, { name, icon }, context) => {
            try {
                const added = await Group.create({ name, icon })
                return await added;
            } catch (err) {
                console.log(err)
            }
        },
        
        deleteGroup: async (parent, { id }, context) => {
            try {
                const deleted = await Group.deleteOne({ _id: id })
                return await deleted;
            } catch (err) {
                throw new Error(err);
            }
        },
        
        addBudget: async (parent, { budget }, context) => {            
            try {
                const added = await Budget.create({...budget, created: new Date()});
                return await added;
            } catch (err) {
                throw new Error(err);
            }
        },
        
        deleteBudget: async (parent, { id }, context) => {
            try {
                const deleted = await Budget.deleteOne({ _id: id })
                return await deleted;
            } catch (err) {
                throw new Error(err);
            }
        },
        
        addCost: async (parent, { cost }, context) => {
            try {
                const added = await Cost.create({...cost, created: new Date()});
                return await added;
            } catch (err) {
                throw new Error(err);
            }
        },
        
        deleteCost: async (parent, { id }, context) => {
            try {
                const deleted = await Cost.deleteOne({ _id: id })
                return await deleted;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}