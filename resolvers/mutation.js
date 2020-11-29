const pubsub = require('./pubsub');
const { User, Group, Budget, Cost, Share } = require('../mongo/models');
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
               throw new Error(err);
            }
        },
        
        addGroup: async (parent, { name, icon , id}, context) => {
            try {
                if (!id) {
                    const added = await Group.create({ name, icon })
                    return await added;
                } else {
                    const added = await Group.findOneAndUpdate({ _id: id}, { name, icon }, { new: true });
                    return await added;
                }
            } catch (err) {
                throw new Error(err);
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
        
        addBudget: async (parent, { budget, id }, context) => {  
            try {
                if (!id) {
                    const added = await Budget.create({...budget, created: new Date()});
                    return await added;
                } else {
                    const added = await Budget.findOneAndUpdate({ _id: id}, { ...budget }, { new: true });
                    return await added;
                }
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
        
        addCost: async (parent, { cost, id }, context) => {   
            try {
                if (!id) {
                    const added = await Cost.create({ ...cost, created: new Date() });
                    return await added;
                } else {
                    const added = await Cost.findOneAndUpdate({ _id: id }, { ...cost }, { new: true });
                    return await added;
                }
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
        },
        
        addShare: async (parent, { share, id}, context) => {
            try {
                if (!id) {
                    const added = await Share.create({ ...share, created: new Date() });
                    return await added;
                } else {
                    const added = await Share.findOneAndUpdate({ _id: id }, { ...share, created: new Date() }, { new: true })
                    return await added;
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        
        deleteShare: async (parent, { id }, context) => {
            try {
                const deleted = await Share.findOneAndDelete({ _id: id })
                return await deleted;
            } catch (err) {
                throw new Error(err);
                
            }
        }
    }
}