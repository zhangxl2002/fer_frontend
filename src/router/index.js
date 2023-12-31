import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Gallery from '../views/Gallery.vue'
// import Login from '../views/Login.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  }
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
