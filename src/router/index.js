import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Publicaciones from "../views/Publicaciones.vue"
import Carrito from "../views/Carrito.vue"
import PlantillaPagina from "../plantilla/PlantillaPagina.vue"
import PlantillaAdmin from "../plantilla/PlantillaAdmin.vue"
import Admin from "../views/admin/Admin.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: PlantillaPagina,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/publicaciones',
        name: 'publicacion',
        component: Publicaciones
      },
      {
        path: '/carrito',
        name: 'Carrito',
        component: Carrito
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/admin',
    component: PlantillaAdmin,
    children: [
      {
        path: '/',
        name: 'Admin',
        component: Admin
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
