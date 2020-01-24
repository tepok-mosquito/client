<template >
  <div class="home">
    <div class="container-fluid">
      <div class="row" id="row-username" v-if="rowUsername">
        <div class="col-5">
          <form @submit.prevent="submitUsername">
            <h2 class="player-title">PLAYER NAME</h2>
            <div class="form-group row justify-content-end">
                <div class="col-8">
                  <input type="text" class="form-control" placeholder="" v-model="username">
                </div>
                <div class="col-3">
                  <button type="submit" class="btn btn-success btn-block">Ready</button>
                </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-5" id="platform" v-if="rowUsername">
        <div class="col">
          <p class="title">PLATFORM: <span class="pl-3">WEB BROWSER</span></p>
          <hr class="hr">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's<br>standard dummy text ever since the 1500s</p>
        </div>
      </div>
      <div class="row justify-content-center" id="row-room" v-if="rowRoom">
        <div class="col-4">
          <h3 class="text-center">Tepok Mosquito</h3>
          <button type="button" class="btn btn-primary btn-block mt-3" data-toggle="modal" data-target="#roomModal">
          Create a room
          </button>

          <div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Create a room</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <form>
                              <div class="form-group">
                                  <label for="roomName">Room Name</label>
                                  <input type="text" class="form-control" placeholder="Enter room name" v-model="roomName">
                              </div>
                              <button @click.prevent="submitRoom" class="btn btn-primary" data-dismiss="modal">Create</button>
                              <button class="btn btn-danger ml-3" data-dismiss="modal">Close</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div class="col-4">
          <p>Select a room</p>
          <ul class="list-group list-group-flush">
            <li v-for="(room, i) in listRoom" :key="i" class="list-group-item">
              {{ room.name }}
              <button class="btn btn-warning float-right" v-on:click.prevent="enterRoom(room._id)">Enter</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      username: null,
      roomName:null,
      rowUsername: true,
      rowRoom: false,
    }
  },
  methods: {
    submitUsername () {
      localStorage.setItem('username', this.username)
      this.rowUsername = false
      this.rowRoom = true
      this.$store.commit('setUsername',this.username)
    },
    getAllRoom(){
      socket.on('getRooms', data =>{
        this.$store.commit('setListRoom', data)
      })

    },
    submitRoom () {
      socket.emit('createRoom',this.roomName,this.username)
      socket.on('connectRoom', roomData =>{
         this.$store.commit('setLobby', roomData)
         this.$router.push('/lobby')
      })
    },
    enterRoom (id) {
      socket.emit('joinRoom',id,this.username)
      socket.on('connectRoom', roomData =>{
         this.$store.commit('setLobby', roomData)
         this.$router.push('/lobby')
      })
    }
  },
  mounted () {
     this.getAllRoom()
  },
  computed: {
    ...mapState(['listRoom'])
  },
}
</script>

<style scoped>
.home {
  background-color: #edd9e0;
  background-image: url('https://static.playoverwatch.com/img/ow-fractal-bg-a5992cc2ba.jpg');
  background-size: cover;
  min-height: 800px;
  color: #333;
}
.player-title {
  font-family: 'Bangers', cursive;
  font-weight: 400;
  font-size: 2.5rem;
  letter-spacing: .1rem;
  padding-left: 55px;
}
#row-username {
  padding-top: 150px
}
#platform {
  padding-left: 55px;
  padding-right: 55px;
  font-family: 'Roboto', sans-serif;
}
hr {
  border-top: 10px solid rgba(0, 0, 0, 0.3);
}
#platform .title {
  font-weight: 700
}
</style>
