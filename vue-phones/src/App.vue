<script setup>
import { ref } from "vue";
//Объявляем переменную реактивной
const inputnumber = ref(null);
//объявляем переменную для хранения новой записи
const newPhone = ref({
  number: "",
  name: "",
});
//массив с данными, обычный массив и его тоже объявляем реактивным
const phones = ref([]);
function addPhone() {
  //видимость переменных получаем без this
  phones.value.push(newPhone.value); //нам не надо заботится о выводе новых данных
  //как только элемент будет добавлен в массив, он появится в списке
  newPhone.value = { number: "", name: "" }; // затираем переменную ввода
  inputnumber.value.focus(); //переносим фокус в поле номер
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
    <ul>
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" :key="phone">
        {{ phone.number }} {{ phone.name }}</li>
    </ul>
  </div>
</template>
