import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

var _phones = [
  { number: "5555", name: "John" },
  { number: "6666", name: "Bill" },
  { number: "7777", name: "Smith" },
  { number: "1234", name: "Sara" }
];
// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Phone {
    number: String
    name: String
  }
  type Query {
    Phones: [Phone]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    Phones: () => _phones
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});


const { url } = await startStandaloneServer(server, {
  listen: { host:"localhost",port: 9000 },
});

console.log(`🚀  Server ready at: ${url}`);
