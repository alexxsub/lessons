# vue3 apollo4 phonebook 
## Уроки по изучению vue и GraphQL

### Vue3 phonebook  CRUD приложение
Реализация простого интерфейса vue телефонного справочника без дизайна.
Стек технологий
[VUE](https://vuejs.org/)
[Apollo VUE client](https://apollo.vuejs.org/)
[GraphQL](https://graphql.org/)
[ApolloGraphQL](https://www.apollographql.com/)
[MongoDB](https://www.mongodb.com/)
[Mongoose](https://mongoosejs.com/)



## IDE настройки

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (если был Vetur, выключить)


## Установка проекта

```sh
git clone https://github.com/alexxsub/lessons.git
cd lessons
npm install
```

### Запуск backend

```sh
cd apollo-graphql
npm run start
```
Открыть http://localhost:9000

### Запуск frontend 

```sh
cd ..
cd vue-phones
npm run serve
```
открыть http://localhost:8080

## Описание ветвей из каталога lessons

### окончательное приложение
```sh
git checkout master
```

### примеры vue2 options API
можно копировать код из steps/App*.vue в App.vue
```sh
git checkout vue2
```
### примеры vue3 composition API

```sh
git checkout vue3
```

### Мутации на бэкенде

```sh
git checkout mutation
```

### пример добавления записи на фронте

```sh
git checkout addphone
```

### CRUD
Create Read Update Delete на фронте
```sh
git checkout CRUD
```

### строим backend

```sh
git checkout backend
```
### описываем мутации

```sh
git checkout mutation
```
### строим мутации на backend
окончательная реализация методов
```sh
git checkout backend-mutation
```

### подключаем mongodb через ORM mongoose

```sh
git checkout mongodb
```
Запуск MongoDB сервера (требуется docker и docker compose) 
```sh
docker compose up -d
```

### адаптируем apolloclient в vue для работы с Apollo API + MoongoDB

```sh
git checkout vuemongo
```

### фронтенд на Quasar - material design

```sh
git checkout quasar
```
