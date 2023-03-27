<script setup>

import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { ref,computed } from "vue";
//Объявляем переменную реактивной, это указатель для фокуса
const inputnumber = ref(null);
//объявляем переменную для хранения новой записи
const newPhone = ref({
  number: "",
  name: "",
});

//флаг режима, режим true - правка данных, false -ввод новых
const editmode = ref(false);
//индекс редактируемого элемента 
const index = ref(-1); 

const GET_PHONES = gql`
      query getPhones {
        Phones {
          number
          name
        }
      }
    `;
const { result,loading, error } = useQuery(GET_PHONES)

//массив с данными получаем с сервера  как результат выполнения запроса
const phones = computed(() => result.value?.Phones ?? [])

function addPhone() {
  //видимость переменных получаем без this
  phones.value.push(newPhone.value); //нам не надо заботится о выводе новых данных
  //как только элемент будет добавлен в массив, он появится в списке
  newPhone.value = { number: "", name: "" }; // затираем переменную ввода
  inputnumber.value.focus(); //переносим фокус в поле номер
}

function savePhone() {
  //сохраняем данные, только если индекс имеется, т.е. >-1
  if (index.value > -1) {
    Object.assign(phones.value[index.value], newPhone.value);
    resetPhone(); //очищаем все поля
  }
}

function resetPhone() {
  //тут обнуляем переменные и приводим все в исходное состояние
  newPhone.value = { number: "", name: "" }; // затираем переменную ввода
  inputnumber.value.focus();
  editmode.value = false; //выключаем режим редактирования
  index.value = -1;
}

function deletePhone(item) {
//описываем на gql языке запрос
const DELETE_PHONE = gql`
mutation deletePhone ($number: String!) {
  deletePhone (number: $number) {
          number,
          name
        }
}`
//создаем мутацию и функцию для вызова 
const { mutate:runDeletePhone } = useMutation(DELETE_PHONE);
//выполняем функцию мутацию
runDeletePhone({
    number: item.number,
  },{
    refetchQueries:[
      {
        query: GET_PHONES
    }
  ]
  }
)
}
function setPhone(item) {
  // данная функция при режиме редактирования устанавливает в полях данные для редактирования
  //вычисляем индекс и сохраняем в переменной
  index.value = phones.value.indexOf(item);
  //для вывода данных в полях, выводим их в связных переменных
  newPhone.value = Object.assign({}, item);
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
    <ul v-else-if="result && result.Phones">
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" :key="phone">
        <a href="#" @click="setPhone(phone)">{{ phone.number }}</a>
        {{ phone.name }}
        <button @click="deletePhone(phone)">x</button>
      </li>
    </ul>
  </div>
</template>
