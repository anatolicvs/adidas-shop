const mongoose = require("mongoose")
const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore, textLogoAdidas } = require('./utils');

mongoose.connect("mongodb://adidas:adidas06@ds125525.mlab.com:25525/adidas-products", { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log("connected to database.");
});

const ProductAPI = require("./datasources/product");
const UserAPI = require('./datasources/user');

const internalEngine = require('./engine-adidas');

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
    ProductAPI: new ProductAPI(),
    userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] ? users[0] : null;

    console.log(user);

    return { user: { ...user.dataValues } };
};

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
        ...internalEngine,
    },
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test')
    server
        .listen({ port: 4000 })
        .then(({ url }) => (console.log(`🚀 app running at ${url}`),
            console.log(textLogoAdidas))
        );

// export all the important pieces for integration/e2e tests to use
module.exports = {
    dataSources,
    context,
    typeDefs,
    resolvers,
    ApolloServer,
    ProductAPI,
    UserAPI,
    store,
    server,
};
