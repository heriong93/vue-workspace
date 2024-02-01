import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataBinding from '../views/DataBinding.vue'
import DataBinding2 from '../views/DataBinding2.vue'
import DataBinding3 from '../views/DataBinding3.vue'
import DataBinding4 from '../views/DataBinding4.vue'
import DataBinding5 from '../views/DataBindingList.vue'
import EventClick from '../views/EventClick.vue'
import EventTodo from '../views/EventTodo.vue'
import ComputedView from '../views/ComputedView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/binding',
    name: 'binding',
    component: DataBinding
  },
  {
    path: '/binding2',
    name: 'binding2',
    component: DataBinding2
  },
  {
    path: '/binding3',
    name: 'binding3',
    component: DataBinding3
  },
  {
    path: '/binding4',
    name: 'binding4',
    component: DataBinding4
  },
  {
    path: '/binding5',
    name: 'binding5',
    component: DataBinding5
  },
  {
    path: '/eventclick',
    name: 'EventClick',
    component: EventClick
  },
  {
    path: '/eventtodo',
    name: 'EventTodo',
    component: EventTodo
  },
  {
    path: '/computedview',
    name: 'ComputedView',
    component: ComputedView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
