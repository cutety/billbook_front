import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    currentUser:window.localStorage.getItem('token') === null?'':JSON.parse(window.localStorage.getItem('token'))
  },
  mutations:{
    login(state,token){
      state.currentUser = token
      window.localStorage.setItem("token",JSON.stringify(token))
    },
    logout(state) {
      state.currentUser = null
      window.localStorage.removeItem("token")
    }
  }
})

export default store
