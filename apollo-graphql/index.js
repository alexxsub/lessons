import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Описываем схему, используя sdl язык
const typeDefs = `#graphql
  type Phone {
    """
    Номмер телефона
    """
    number: String
    """
    Имя владельца телефона
    """
    name: String
  }
  """
  Получить список всех телефонов
  """
  type Query {
    Phones: [Phone]
  } 
`;

//пример данных, массив с телефонами
var _phones = [
  { number: "5555", name: "John" },
  { number: "6666", name: "Bill" },
  { number: "7777", name: "Smith" },
  { number: "1234", name: "Sara" }
];

// Описываем резолвер для метода просмотра
const resolvers = {
  Query: {
    Phones: () => _phones
  }
};

//регистрируем схему и резолверы
const server = new ApolloServer({
  typeDefs,
  resolvers
});

//создаем экземляр сервера
const HOST = process.argv[2];
const PORT = process.argv[3];
const { url } = await startStandaloneServer(server, {
  listen: { host:HOST,port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);