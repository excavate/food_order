import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserManage from '../components/manage/UserManage.vue'
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
    component: UserManage,
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
