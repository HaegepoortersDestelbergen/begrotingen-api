const pubsub = require('./pubsub');
const { User, Group } = require('../mongo/models');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {    
        register: async (parent, { user }, context) => {
            const { email, password } = user;
            
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
                return await {id: id};
            } catch (err) {
                console.log(err)
            }
        }
    }
}