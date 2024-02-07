import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import UserInsertView from '../views/UserInsertView.vue'
import UserUpdateView from '../views/UserUpdateView.vue'
import UserFormView from '../views/UserFormView.vue'
const routes = [
  {
    path: '/',
    name: 'userList',
    component: UserListView
  },
  {
    path: '/userInfo',
    name: 'userInfo', //name 유니크해야함
    component: UserInfoView
  },
  {
    path: '/userInsert',
    name: 'userInsert', 
    component: UserInsertView
  },
  {
    path: '/userUpdate',
    name: 'userUpdate', 
    component: UserUpdateView
  },
  {
    path: '/userForm',
    name: 'userForm', 
    component: UserFormView
  }

//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router