const { User, Group, Budget, Cost, Share } = require('../mongo/models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const budget = require('../mongo/schemas/budget');
require('dotenv/config');
const dayjs = require('dayjs')
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
        
        cost: async (parent, { id, budgetId }, context) => {            
            try {
                if (id) return await Cost.find({ _id: id })
                else if (budgetId) return await Cost.find({ budgetId: budgetId })
                else return await Cost.find({});
            } catch (err) {
                throw new Error(err);
            }
        },
        
        share: async (parent, { id, budgetId }, context) => {
            const foundShare = await getShareByID(id);
            try {
                // get share and budgetId
                
                if (id) {
                    const foundShareBudgetId = foundShare[0].budgetId;
                    
                    // get budget data and all costs
                    const budgetFromShare = await Budget.find({ _id: foundShareBudgetId })
                    const costsFromShare = await Cost.find({ budgetId: foundShareBudgetId });
                    
                    // add budget data and costs to share data
                    foundShare[0].costs = costsFromShare;
                    foundShare[0].budget = budgetFromShare[0];
                }
                
                // return data based on used params
                if (id) return await checkShareExpireDate(foundShare);
                else if (budgetId) return await Share.find({ budgetId: budgetId });
                else return await Share.find({});
            } catch (err) {
                if (foundShare.length != 0) await Share.deleteOne({ _id: id }) && console.log('deleted')
                throw new Error(err);
            }
        }
    },
}

const getShareByID = async (id) => {
    const found = await Share.find({ _id: id })
    return await found;
}

const checkShareExpireDate = async (share) => {    
    // desctructure data
    const [{ expires, created }] = await share;
    const [ format, amount ] = await expires.split('_');
    
    // get max valid date
    const maxDate = dayjs(created).add(parseFloat(await amount), await format.toLowerCase());
    const diff = maxDate.diff(dayjs(), 'day');
    
    // return data
    if (diff >= 0) return await share
    else throw new Error('Share not valid anymore');
}