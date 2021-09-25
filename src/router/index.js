import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Publicaciones from "../views/Publicaciones.vue"
import Carrito from "../views/Carrito.vue"
import PlantillaPagina from "../plantilla/PlantillaPagina.vue"
import PlantillaAdmin from "../plantilla/PlantillaAdmin.vue"
import Admin from "../views/admin/Admin.vue"
import Login from "../views/Login.vue"

import Producto from "../views/admin/Producto.vue"
import Categoria from "../views/admin/Categoria.vue"
import SucursalList from "../views/admin/sucursal/SucursalList.vue"
import SucursalNuevo from "../views/admin/sucursal/SucursalNuevo.vue"
import SucursalEditar from "../views/admin/sucursal/SucursalEditar.vue"
import Usuario from "../views/admin/Usuario.vue"

import {authGuard} from "./../guards/authGuard"

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
        beforeEnter: authGuard,
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
    beforeEnter: authGuard,
    children: [
      {
        path: '/',
        name: 'Admin',
        component: Admin
      },
      {
        path: 'producto',
        name: 'Producto',
        component: Producto
      },
      {
        path: 'categoria',
        name: 'Categoria',
        component: Categoria
      },
      {
        path: 'sucursal',
        name: 'SucursalLista',
        component: SucursalList
      },
      {
        path: 'sucursal/nuevo',
        name: 'SucursalNuevo',
        component: SucursalNuevo
      },
      {
        path: 'sucursal/:id/editar',
        name: 'SucursalEdit',
        component: SucursalEditar
      },
      {
        path: 'usuario',
        name: 'Usuario',
        component: Usuario
      }
    ]
  }
  
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*
const isAuthenticated = function(){
  try {
      const authUser = JSON.parse(localStorage.getItem("authUser"))
      if(authUser && authUser.access_token){
          return true
      }else{
          return false
      }
  }catch(error){
      return false
  }
}

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.name !== 'Login' && !isAuthenticated){
    next({ name: 'Login' })
  }else{
    next()
  }
})
*/
export default router
