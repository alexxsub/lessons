<script setup>

const props = defineProps( {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
)


//функция проверки на интернет ссылку либо ссылка, либо переход по роутингу
function  CheckLink(link) {    
     return (link.indexOf("http") === 0) 
  }

</script>
<template>
  <q-item v-if="CheckLink(link)"
    clickable
    :href="link"
  >

  <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>    

  </q-item >
  <q-item v-else
    clickable
    :to="link"
  >

  <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>    
  </q-item >

</template>


