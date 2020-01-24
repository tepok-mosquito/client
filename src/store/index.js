import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    listRoom: [],
    lobby: {},
    dataArena: {},
    pointsList: []
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
      },
    setWinner(state, payload){
      let winner =  null
      let winnerPoint = 0
      console.log(payload,'ini payload')
      payload.forEach(element => {
        if(element[1] > winnerPoint){
          winner = element
        }
      }); 
      console.log(winner, 'the winner')
      state.pointsList = winner
    }
  },
  actions: {
    
  },
  modules: {
  }
})
