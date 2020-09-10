import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from "../components/Register";
import Login from "../components/Login"
import Index from "../components/Index";
import Home from "../components/home/Home";
import KeepAccounts from "../components/KeepAccounts/KeepAccounts";
import ChargeUp from "../components/KeepAccounts/ChargeUp";
Vue.use(Router)

export default new Router({
  routes: [
   /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:'/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        {
          path:'/keepAccounts',
          name:'KeepAccounts',
          component: KeepAccounts,
        },
        {
          path: '/chargeUp',
          name:'ChargeUp',
          component: ChargeUp,
        }

      ]
    },
  ]
})

