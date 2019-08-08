<template>
  <div id="app">
    <input v-model="name" />
    <span>Привет,{{name}}!</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "неизвестный"
    };
  }
};
</script>