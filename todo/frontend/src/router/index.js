import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList.vue'
import TodoCreate from '../views/TodoCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'todo-list',
    component: TodoList
  },
  {
    path: '/create',
    name: 'todo-create',
    component: TodoCreate
  },
  {
    path: '/update/:id',
    name: 'todo-update',
    component: TodoCreate,
    props: true
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
