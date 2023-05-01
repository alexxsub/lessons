<script setup>

import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { ref,computed} from "vue";
//Объявляем переменную реактивной, это указатель для фокуса
const inputnumber = ref(null);
//объявляем переменную для хранения новой записи
const newPhone = ref({
  id:"",
  number: "",
  name: "",
});

//флаг режима, режим true - правка данных, false -ввод новых
const editmode = ref(false);


const GET_PHONES = gql`
      query getPhones {
        Phones {
          id,
          number
          name
        }
      }
    `;
const { result,loading, error } = useQuery(GET_PHONES)

//массив с данными получаем с сервера  как результат выполнения запроса
const phones = computed(() => result.value?.Phones ?? [])

function addPhone() {
 if (editmode.value) return; // отключаем просто добавление в режиме редактиварония
 //описываем на gql языке запрос на добавление
const ADD_PHONE = gql`
mutation addPhone ($input:inputPhone!) {
  addPhone (input: $input) {
          id,
          number,
          name
        }
}`
const { mutate:runAddPhone,onDone,onError } = useMutation(ADD_PHONE,
{
  update: (cache, { data: {addPhone } }) => {
       
    let data = cache.readQuery({ query: GET_PHONES })

        data = {
          ...data,
          Phones: [
            ...data.Phones,
            addPhone,
          ],
        }

        cache.writeQuery({ query: GET_PHONES, data })
  }
}
);
runAddPhone({
    input:newPhone.value
  },/*{
    refetchQueries:[
      {
        query: GET_PHONES
    }
  ]
  }*/
)
  onError((e)=>{
    console.log(e.message)
  })
//Обрабатываем событие успешного действия
  onDone(() => {
      resetPhone(); //очищаем все поля
    })
    
}


function savePhone() {
//описываем на gql языке запрос на обновление
const UPDATE_PHONE = gql`
mutation updatePhone ($input:inputPhone!) {
  updatePhone (input: $input) {
          id,
          number,
          name
        }
}`
const { mutate:runUpdatePhone,onDone } = useMutation(UPDATE_PHONE);
runUpdatePhone({
    input: newPhone.value,
  }
)
//Обрабатываем событие успешного действия
  onDone(() => {
      resetPhone(); //очищаем все поля
    })
    
  
}

function resetPhone() {
  //тут обнуляем переменные и приводим все в исходное состояние
  for (var key in newPhone.value) { // затираем переменную ввода , перебирая все элементы
    newPhone.value[key]=""
    }
  
  inputnumber.value.focus();
  editmode.value = false; //выключаем режим редактирования

}

function deletePhone(id) {
//описываем на gql языке запрос на удаление
const DELETE_PHONE = gql`
mutation deletePhone ($id: ID!) {
  deletePhone (id: $id) {
          id,
          number,
          name
        }
}`
//создаем мутацию и функцию для вызова 
const { mutate:runDeletePhone,onError  } = useMutation(DELETE_PHONE,
{
  update: (cache, {data}) => {
    //читаем кэш   
    const {Phones} = cache.readQuery({ query: GET_PHONES })
   //удаляем запись из кэша
    cache.writeQuery({ query: GET_PHONES,
        data:{
          Phones: Phones.filter(phone=>phone.id!==data.deletePhone.id)
        }
        } )
  }
}
);

//выполняем функцию мутацию
runDeletePhone({
    id
  },/*{
    refetchQueries:[
      {
        query: GET_PHONES
    }
  ]
  }*/
)

onError((e)=>{
    console.log(e.message)
  })
}
function setPhone(item) {
  // данная функция при режиме редактирования устанавливает в полях данные для редактирования

  //для вывода данных в полях, выводим их в связных переменных
  newPhone.value = Object.assign({}, item);
  delete  newPhone.value.__typename
  //включаем режим редактирования, появляются кнопки
  editmode.value = true;
}

</script>

<template>
  <div>
    <!-- Описываем поле ввода номера -->
    <input
      ref="inputnumber"
      v-model="newPhone.number"
      placeholder="Введите номер"

    />
     <!--Добавляем еще одно поле ввода данных - имя и вешаем обработчик на нажатие клавиши Enter-->
     <input
      placeholder="Введите имя"
      v-model="newPhone.name"
      @keyup.enter="addPhone"
    />
    <button v-show="editmode" @click="savePhone">Сохранить</button>
    <button v-show="editmode" @click="resetPhone">Отмена</button>
    <!--вывод сообщения, если загрузка-->
    <div v-if="loading">Загрузка...</div>
    <!--Вывод сообщения, если ошибка-->
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <table width="350px" v-else-if="result && result.Phones">
      <!-- Уже знакомый вывод списком-->
      <tr v-for="phone in phones" :key="phone.id">
        <td><a href="#" @click="setPhone(phone)">{{ phone.number }}</a></td>
        <td>{{ phone.name }}</td>
        <td><button @click="deletePhone(phone.id)">x</button></td>
      </tr>
    </table>
  </div>
</template>
