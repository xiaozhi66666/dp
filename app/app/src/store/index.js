import Vue from 'vue'
import Vuex from 'vuex'
import { setInfo, settoken, getInfo, gettoken } from '@/utils/storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userInfo:getInfo || {stuId:0},
    token:gettoken || 1,
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    },
    setToken (state, payload) {
      state.token = payload
      settoken(payload)
    }
  },
  // getters:{
  //   getToken(state){
  //     return state.token;
  //   }
  // }
})

export default store;