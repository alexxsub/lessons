<template>
  <div>
    <h2>Выводим список дел</h2>
    <br />
    <ul>
      <li v-for="todo in todos" v-bind:key="todo">{{ todo }}</li>
      <!-- Перебираем массив todos и каждый элемент доступенв todo,
      вы водим в шаблон-->
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //массив с данными, обычный массив
      todos: [
        "Сходить за хлебом",
        "Купить воблы",
        "Не забыть про пивасик",
        "А! еще колбаски"
      ]
    };
  }
};
</script>