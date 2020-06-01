import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '@/views/Goods.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import Mine from '../views/Mine.vue'
import Register from '../views/Register.vue'
import GoodDetail from '../views/GoodDetail.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'Goods',
    component:Goods,
  },
  {
    path: '/gooddetail/:id',
    name: 'Gooddetail',
    component:GoodDetail,
  },
  {
    path: '/cart',
    name: 'Cart',
    component:Cart,
  },
  {
    path: '/login',
    name: 'Login',
    component:Login,
  },
  {
    path: '/mine',
    name: 'Mine',
    component:Mine,
  },
  {
    path: '/register',
    name: 'Register',
    component:Register,
  },
 
]

const router = new VueRouter({
  // mode: 'history',
  routes
})


export default router