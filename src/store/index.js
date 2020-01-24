import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    listRoom: [],
    lobby: {},
    dataArena: {}
  },
  mutations: {
    setUsername(state,payload){
      state.username = payload
    },
    setListRoom(state,payload){
      state.listRoom = payload
    },
    setLobby(state,payload){
      state.lobby = payload
    },
    setDataArena(state,payload){
      state.dataArena = payload
      }
  },
  actions: {
    
  },
  modules: {
  }
})
