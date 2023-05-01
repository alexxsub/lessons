<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

//переменная для открывания или закрывания меню
const leftDrawerOpen = ref(false)

//функция - переключатель меню
function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

//массив с данными меню слева      
const linksList = [
{
    title: 'В начало',
    caption: '',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Документация',
    caption: 'Сайт разработчиков quasar',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github Lessons',
    caption: 'Репозиторий с примером',
    icon: 'code',
    link: 'https://github.com/alexxsub/lessons.git'
  },
  {
    title: 'План',
    caption: 'План уроков',
    icon: 'menu_book',
    link: 'plan'
  },
  {
    title: 'Приложение',
    caption: 'Quasar phonebook',
    icon: 'call',
    link: 'phonebook'
  }
]
   
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar single page application (SPA) PhoneBook
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Меню
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

