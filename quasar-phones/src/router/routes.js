
import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue' 
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { 
        path: '',
        name:'Home',     
        component: IndexPage
      },
      { 
        path: 'plan',
        name:'Plan',
        component: () => import('pages/PlanPage.vue') 
      },
      { 
        path: '/phonebook', 
        name:'PhoneBook',
        component: () => import('pages/PhoneBook.vue') 
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name:'NotFound',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
