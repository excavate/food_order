import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserManage from '../components/manage/UserManage.vue'
import DishManage from '../components/manage/DishManage.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/manage_test',
    name:'ManageTest',
    component:UserManage
  },
  {
    path: '/manage/users',
    name: 'UserManage',
    component: UserManage,
  },
  {
    path:'/manage/dishes',
    name:'DishManage',
    component: DishManage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
