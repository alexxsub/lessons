<script setup>

import { reactive,computed,watch } from 'vue';
import { useQuasar, useDialogPluginComponent,Notify } from 'quasar'
//клиент Apollo вариант 1
import {apolloClient} from 'boot/apollo'

//клиент Apollo  в варианте 2 
import { useQuery } from '@vue/apollo-composable'
//для языка sdl
import gql from 'graphql-tag'

//глобальная переменная на простраство квазар
const $q = useQuasar()

//состояние приложения
const state = reactive({     
      loading: false,
      filter:'',
      formTitle:'Добавить телефон',
      editedItem:{
        id:'',
        number:'',
        name:''
      }
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
 //описываем на gsdl языке запрос на добавление
const ADD_PHONE = gql`
mutation addPhone ($input:inputPhone!) {
  addPhone (input: $input) {
          id,
          number,
          name
        }
}`;
//описываем на sdl языке запрос на обновление
//в качестве входного параметра объект по структуре как state.editedItem
const UPDATE_PHONE = gql`
mutation updatePhone ($input:inputPhone!) {
  updatePhone (input: $input) {
          id,
          number,
          name
        }
}`;



const { result,loading } = useQuery(GET_PHONES)
watch(loading,(value) =>{
  state.loading=value
})


//массив с данными получаем с сервера  как результат выполнения запроса
const phones = computed(() => result.value?.Phones ?? [])

    const columns = [
 
        {
            align: 'left',
            field: 'number',
            label: 'Телефон',
            name: 'number',
        
            style: 'width: 40%;',
            sortable: true
        },
        {
            align: 'left',
            field: 'name',
            label: 'Имя',
            name: 'name',
            style: 'width: 40%;',
            sortable: true
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
          style: 'width: 20%'
        }
    ];


//описываем на sdl языке запрос на удаление
const DELETE_PHONE = gql`
mutation deletePhone ($id: ID!) {
  deletePhone (id: $id) {
          id,
          number,
          name
        }
}`;

//запрос к бэкенду через Apollo клиент
const deletePhone = async (variables) =>
    apolloClient
        .mutate({
            mutation: DELETE_PHONE,
            variables,
            update: (cache, {data}) => {
                //читаем кэш   
                const {Phones} = cache.readQuery({ query: GET_PHONES })
                //удаляем запись из кэша
                cache.writeQuery({ query: GET_PHONES,
                data:{
                    //перебираем массив и при совпадении id удаляем элемент из массива кэша
                    Phones: Phones.filter(phone=>phone.id!==data.deletePhone.id)
                    }
                      })
                  }
            })
        .then((response) => 
              $q.notify({
              message: `Запись ${response.data?.deletePhone.number} удалена!`,
              color: 'positive',
              icon: 'done'
              })
        )
        .catch(error => {
              $q.notify({
              message: error.message,
              color: 'negative',
              icon: 'error'
            })
          });


function deleteRow(id){

  $q.dialog({
        title:'Удаление записи',
        message: 'Уверены, что хотите удалить запись?',
        ok:'Да',
        cancel: true,
        //persistent: true //выключить закрытие диалога по esc
      }).onOk(() => deletePhone({id}))
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
   
 

  const handleClickOk = () => {
  
    if (state.editedItem.id=='') 
      addPhone(
          {
            input:state.editedItem
          }
            );
    else 
      updatePhone(
          {
            input:state.editedItem
          }
            );

      
    };
    const handleClickCancel = () => {
      onDialogCancel()
      //вариант создания уведомление через экземпляр класса
      Notify.create({
              message: 'Заапись не сохранена!',
              color: 'negative',
              icon: 'done'
            })
   
      };


const addPhone = async (variables) =>
    apolloClient
        .mutate({
            mutation: ADD_PHONE,
            variables,
            update: (cache,{ data: {addPhone } }) => {
              let data = cache.readQuery({ query: GET_PHONES })

                  data = {
                  ...data,
                  Phones: [
                    ...data.Phones,
                    addPhone,
                  ],
                  }
                  cache.writeQuery({ query: GET_PHONES, data }) 

                }
            })
        .then((response) =>{ 
              $q.notify({
             
              message: `Запись ${response.data?.addPhone.number} добавлена!`,
              color: 'positive',
              icon: 'done'
              })
              onDialogOK();
            }
        )
        .catch(error => {
              $q.notify({
              message: error.message,
              color: 'negative',
              icon: 'error'
            })
          });

const updatePhone = async (variables) =>
    apolloClient
        .mutate({
            mutation: UPDATE_PHONE,
            variables,
            })
        .then((response) =>{
              $q.notify({
              message: `Запись ${response.data?.updatePhone.number} изменена!`,
              color: 'positive',
              icon: 'done'
              });
              onDialogOK();
            }
        )
        .catch(error => {
              $q.notify({
              message: error.message,
              color: 'negative',
              icon: 'error'
            })
          });

function addRow(){
  //обнуляем данные редактирования
  resetPhone()
  //меняем подпись диалога
  state.formTitle = 'Добавить запись'
  dialogRef.value.show()
};

function editRow(row){
  //передаем в объект редактирования запись из таблицы, что параметром прила
  state.editedItem=Object.assign({}, row);
  //удаляем лишнее поле, которое служебное, но не описано в типе ввода input
  delete  state.editedItem.__typename
  //меняем подпись диалога
  state.formTitle = 'Редактировать запись'
  dialogRef.value.show()
};
function resetPhone() {
  for (var key in state.editedItem) { // затираем объект редактирования , перебирая все элементы
      state.editedItem[key]=""
    }

};
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
      no-data-label="Нет даттых"
      no-results-label = "Ничего не найдено"
    >
    <!--кастомный заголовок таблицы, чтобы вставить поле поиска-->
    <template v-slot:top>
      <q-toolbar-title>Телефонная книга</q-toolbar-title>
          <q-input  dense debounce="300" color="primary" v-model="state.filter">
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
    </template>
  <!--кастомный шаблон заголовков таблицы, чтобы вставить столбец с кнопкой удалить-->
    <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <!--кастомный шаблон тела таблицы, чтобы сделать в ячейке телефона ссылку-->
      <template v-slot:body="props">
      <q-tr :props="props">
         <q-td key="number" :props="props">
             <a href="javascript:" @click="editRow(props.row)"> {{ props.row.number }}</a>
        </q-td>
         <q-td key="name" :props="props">
              {{ props.row.name }}
        </q-td>
         <q-td key="actions" :props="props">
              <q-btn size="sm" color="red" round icon="delete" @click="deleteRow(props.row.id)"></q-btn>
            </q-td>
        </q-tr>
       
    </template>
  </q-table>
  <!--круглая кнопка в правом углу с отступом offset-->
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" @click="addRow" />
          </q-page-sticky>
</q-page>
</q-page-container>
</q-layout>

</div>
<!--Шаблон диалога скрыт и не рендирится при визуализации, вызывается из кода-->
<q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 500px">
        <q-toolbar class="bg-grey-2">
          <q-toolbar-title>{{state.formTitle}}</q-toolbar-title>
        </q-toolbar>
              <q-input
                       square
                       clearable
                       v-model="state.editedItem.number"
                       lazy-rules
                       :rules="[]"
                       label="Телефон">
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
               <q-input
                       square
                       clearable
                       v-model="state.editedItem.name"
                       lazy-rules
                       :rules="[]"
                       label="Имя">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
      </div>

      <q-card-actions align="right">
        <q-btn color="positive" label="Сохранить" @click="handleClickOk" />
        <q-btn color="negative" label="Отмена" @click="handleClickCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>
  
 
  