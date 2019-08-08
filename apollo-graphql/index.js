const { ApolloServer, gql } = require("apollo-server");

var _phones = [
  { number: "5555", name: "John" },
  { number: "6666", name: "Bill" },
  { number: "7777", name: "Smith" },
  { number: "1234", name: "Sara" }
];
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
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

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
