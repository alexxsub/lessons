import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//пример данных, массив с телефонами
var _phones = [
  { number: "5555", name: "John" },
  { number: "6666", name: "Bill" },
  { number: "7777", name: "Smith" },
  { number: "1234", name: "Sara" }
];
// Описываем схему, используя sgl язык
const typeDefs = `
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
  """
  Специальный тип данных для ввода
  """
  input inputPhone {
    number: String!
    name: String
  }

  type Mutation {
  """
  Добавить запись телефона 
  """
    addPhone(input: inputPhone): [Phone] #example with input type
  """
  Удалить запись о телефоне
  """
    deletePhone(number: String): [Phone]
  """
  Обновить запись о телефоне
  """
    updatePhone(number: String, name: String): [Phone] #example with separated params
  }
`;

// Описываем резолвер для метода просмотра
const resolvers = {
  Query: {
    Phones: () => _phones
  },
  Mutation: {
    addPhone: (_, { input }) => {
      _phones.push(input);
      return _phones;
    },
    deletePhone: (_, { number }) => {
      _phones.splice(_phones.findIndex(x => x.number === number), 1);
      return _phones;
    },
    updatePhone: (_, { number, name }) => {
      const numberi = _phones.findIndex(x => x.number === number);
      const namei = _phones.findIndex(x => x.name === name);
      const index = numberi > 0 ? numberi : namei;
      _phones.splice(index, 1, { number: number, name: name });
      return _phones;
    }
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
