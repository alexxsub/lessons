<template>
  <div>
    <!-- Описываем поле вводы и вешаем обработчик на нажатие клавиши Enter -->
    <input placeholder="Введите номер" ref="number" v-model="newPhone.number" />
    <input placeholder="Введите имя" v-model="newPhone.name" @keyup.enter="addPhone" />
    <button v-show="editmode" @click="savePhone">Сохранить</button>
    <button v-show="editmode" @click="resetPhone">Отмена</button>
    <ul>
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" v-bind:key="phone.number">
        <a href="#" @click="setPhone(phone)">{{phone.number}}</a>
        {{phone.name}}
        <button @click="deletePhone(phone)">x</button>
      </li>
      <!-- Номер используем в качестве ключа-->
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editmode: false, //флаг режима, режим true - правка данных, false -ввод новых
      newPhone: {
        //элмент данных, запись в массиве
        number: "",
        name: ""
      },
      index: -1, //индекс редактируемого элемента
      //массив с данными, обычный массив
      phones: []
    };
  },
  created() {
    //метод вызывается при создании приложения
    this.initialize();
  },
  //раздел методов, описываем объектом methods , https://ru.vuejs.org/v2/api/#methods
  methods: {
    initialize() {
      // инициализация демо данными
      this.phones = [
        {
          number: "8903888777666",
          name: "Петя"
        },
        {
          number: "8920888333222",
          name: "Вася"
        },
        {
          number: "8909222333888",
          name: "Маша"
        }
      ];
    },
    //фцнкция добавления в массив нового элемента
    addPhone() {
      //видимость переменных получаем через this
      this.phones.push(this.newPhone); //нам не надо заботится о выводе новых данных
      //как только элемент будет добавлен в массив, он появится в списке
      this.newPhone = { number: "", name: "" }; // затираем переменную ввода
      //передаем фокус на первое поле ввода
      this.$refs.number.focus();
    },
    savePhone() {
      //сохраняем данные, только если индекс имеется, т.е. >-1
      if (this.index > -1) {
        Object.assign(this.phones[this.index], this.newPhone);
        this.resetPhone(); //очищаем все поля
      }
    },
    deletePhone(item) {
      //ищем выбранный элемент массива и удаляем
      const index = this.phones.indexOf(item);
      this.phones.splice(index, 1);
    },
    setPhone(item) {
      //вычисляем индекс и сохраняем в переменной
      this.index = this.phones.indexOf(item);
      //для вывода данных в полях, выводим их в связных переменных
      this.newPhone = Object.assign({}, item);
      //включаем режим редактирования, появляются кнопки
      this.editmode = true;
    },

    resetPhone() {
      //тут обнуляем переменные и приводим все в исходное состояние
      this.newPhone = { number: "", name: "" }; // затираем переменную ввода
      this.$refs.number.focus();
      this.editmode = false;
      this.index = -1;
    }
  }
};
</script>