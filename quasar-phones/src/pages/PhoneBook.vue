<script setup>

import { reactive } from 'vue';

import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { ref,computed} from "vue";
//Объявляем переменную реактивной, это указатель для фокуса
const inputnumber = ref(null);

const state = reactive({
      
      loading: false,
      filter:''
  });
//объявляем переменную для хранения новой записи
const newPhone = ref({
  id:"",
  number: "",
  name: "",
});

const GET_PHONES = gql`
      query getPhones {
        Phones {
          id,
          number
          name
        }
      }
    `;

const { result,loading } = useQuery(GET_PHONES)




    //массив с данными получаем с сервера  как результат выполнения запроса
const phones = computed(() => result.value?.Phones ?? [])

    const columns = [
 
        {
            align: 'left',
            field: 'number',
            label: 'Телефон',
            name: 'number',
        
            style: 'width: 200px;',
            sortable: true
        },
        {
            align: 'left',
            field: 'name',
            label: 'Имя',
            name: 'name',
            style: 'width: 0;',
            sortable: true
        },
    ];
const rows = [
  {
    phone:"89102333040",
    name:"Jhon Dow"
  },
  {
    phone:"89993002021",
    name:"Piter Parker"
  }
]

</script>
<template>
<div class="q-pa-md">
 <q-layout view="lhh LpR lff" container style="height: 600px" class="shadow-2 rounded-borders">

        
  <q-page-container>
   <q-page padding>
      <q-table
      title="Телефонная книга"
      :loading="state.loading"
      :filter="state.filter"
      :rows="phones"
      :columns="columns"
      row-key="id"
    >
    <template v-slot:top>
      <q-toolbar-title>Телефонная книга</q-toolbar-title>
          <q-input  dense debounce="300" color="primary" v-model="state.filter">
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
    </template>

  </q-table>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" />
          </q-page-sticky>
</q-page>
</q-page-container>
</q-layout>
</div>
</template>
  
 
  