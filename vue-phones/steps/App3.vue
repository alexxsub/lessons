<template>
  <div>
    <!-- Описываем поле вводы и вешаем обработчик на нажатие клавиши Enter -->
    <input placeholder="Введите номер" v-model="newPhone" @keyup.enter="addPhone" />
    <ul>
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" v-bind:key="phone">{{phone}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newPhone: "",
      //массив с данными, обычный массив
      phones: []
    };
  },
  //раздел методов, описываем объектом methods , https://ru.vuejs.org/v2/api/#methods
  methods: {
    //фцнкция добавления в массив нового элемента
    addPhone: function() {
      //видимость переменных получаем через this
      this.phones.push(this.newPhone); //нам не надо заботится о выводе новых данных
      //как только элемент будет добавлен в массив, он появится в списке
      this.newPhone = ""; // затираем переменную ввода
    }
  }
};
</script>