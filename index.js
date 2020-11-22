const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

require('dotenv/config');
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, MONGO_DBNAME, TOKEN_SALT } = process.env;

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: (({ req }) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            const decodedToken = jwt.verify(token, TOKEN_SALT);
            
            return decodedToken && decodedToken.userId ? { 
                userId: decodedToken.userId, 
                admin: decodedToken.admin 
            } : null
        } catch (err) {
            return err
        }
    })
});

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('database connected')

    server
        .listen({
            port: process.env.PORT || process.env.GRAPHQL_PORT || 4000
        })
        .then(({ url }) => {
            console.log(`Server started at ${url}`);
        });
})