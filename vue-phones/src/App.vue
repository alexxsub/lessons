<script setup>
import { ref, onMounted } from "vue";
//Объявляем переменную реактивной
const inputnumber = ref(null);
//объявляем переменную для хранения новой записи
const newPhone = ref({
  number: "",
  name: "",
});
//массив с данными, обычный массив и его тоже объявляем реактивным
const phones = ref([]);
//флаг режима, режим true - правка данных, false -ввод новых
const editmode = ref(false);
//индекс редактируемого элемента 
const index = ref(-1); 

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
  //ищем выбранный элемент массива и удаляем
  const index = phones.value.indexOf(item);
  phones.value.splice(index, 1);
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
//первичная инициализация
onMounted(() => {
  // инициализация демо данными
  phones.value = [
    {
      number: "8903888777666",
      name: "Петя",
    },
    {
      number: "8920888333222",
      name: "Вася",
    },
    {
      number: "8909222333888",
      name: "Маша",
    },
  ];
});
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
    <ul>
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" :key="phone">
        <a href="#" @click="setPhone(phone)">{{ phone.number }}</a>
        {{ phone.name }}
        <button @click="deletePhone(phone)">x</button>
      </li>
    </ul>
  </div>
</template>
