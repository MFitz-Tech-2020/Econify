const { GraphQLServer } = require("graphql-yoga");
const connectDB = require("./database/connect");
//dotenv
require("dotenv").config();

// Coneect Database
connectDB();

const resolvers = require("./src/resolver");

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
