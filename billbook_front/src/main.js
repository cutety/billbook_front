// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from "./store";

import qs from 'qs'
Vue.prototype.$qs = qs
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios,axios);

axios.defaults.baseURL="/api" //baseURL
axios.defaults.withCredentials=true //跨域请求是否提供凭证

router.beforeEach((to,from,next) =>{
  if(to.meta.requireAuth){
    if(store.state.currentUser !== null && store.state.currentUser){
      next()
    }
    else{
      next({
        path:'/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
