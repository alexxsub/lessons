<script setup lang="js">
import { ref,reactive} from "vue";


//Объявляем переменную реактивной
const inputnumber = ref(null);
//объявляем переменную для хранения новой записи
let inputPhone = reactive({
  number: "",
  name: "",
  id:""
});
//массив с данными, обычный массив и его тоже объявляем реактивным
const phones = reactive( [
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
  ]);
//флаг режима, режим true - правка данных, false -ввод новых
const editmode = ref(false);



  //доббавляем в демо данные id
phones.map(i=>i.id=getID());

function getID(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function addPhone() {
  
  let newPhone=inputPhone
  newPhone.id=getID()
  //видимость переменных получаем без this
  phones.push(newPhone); //нам не надо заботится о выводе новых данных
  //как только элемент будет добавлен в массив, он появится в списке
  resetPhone()
}

function savePhone() {
  //сохраняем данные, только если id не пустой
  if (inputPhone.id != '') {
    const index=phones.findIndex(x => x.id === inputPhone.id)
    phones.splice(index, 1, inputPhone);
    resetPhone(); //очищаем все поля
  }
}

function resetPhone() {
  //тут обнуляем переменные и приводим все в исходное состояние
  inputPhone={
  number: "",
  name: "",
  id:""
}
  inputnumber.value.focus();
  editmode.value = false; //выключаем режим редактирования

}

function deletePhone(item) {
  //ищем выбранный элемент массива и удаляем
  const index = phones.indexOf(item);
  
  phones.splice(index, 1);
}

function setPhone(item) {
  // данная функция при режиме редактирования устанавливает в полях данные для редактирования
 
  //для вывода данных в полях, выводим их в связных переменных
  inputPhone = Object.assign({}, item);
  //включаем режим редактирования, появляются кнопки
  editmode.value = true;
}

</script>

<template>
  <div>
    <!-- Описываем поле ввода номера -->
    <input
      ref="inputnumber"
      v-model="inputPhone.number"
      placeholder="Введите номер"

    />
     <!--Добавляем еще одно поле ввода данных - имя и вешаем обработчик на нажатие клавиши Enter-->
     <input
      placeholder="Введите имя"
      v-model="inputPhone.name"
      @keyup.enter="addPhone"
    />
    <button v-show="editmode" @click="savePhone">Сохранить</button>
    <button v-show="editmode" @click="resetPhone">Отмена</button>
    <table width="350px">
      <tr v-for="phone in phones" :key="phone.id">
        <td><a href="#" @click="setPhone(phone)">{{ phone.number }}</a></td>
        <td>{{ phone.name }}</td>
        <td><button @click="deletePhone(phone)">x</button></td>
      </tr>
    </table>
  </div>
</template>
