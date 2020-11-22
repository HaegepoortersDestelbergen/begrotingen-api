const { User, Group } = require('../mongo/models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
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
        
        group: async (parent, { id }, context) => {
            if (id) return await Group.find({ _id: id })
            else return await Group.find({})
        },
        
        user: async (parent, { id }, context) => {
            if (id) return await User.find({ _id: id })
            else return await User.find({})
        }
    },
}