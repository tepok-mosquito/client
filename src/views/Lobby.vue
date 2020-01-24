<template>
    <div class="lobby">
        <div class="container">
            <div class="row justify-content-center pt-5">
                <div class="col-5 bg-outside">
                    <div class="p-3">
                        <h2 class="room-name py-3">{{ lobby.name }}</h2>
                        <div class="scrool">
                            <table class="table table-borderless bg-inside">
                                <thead class="text-white">
                                    <tr><th scope="col">Player Name</th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(player, i) in lobby.players" :key="i">
                                        <td><img src="../assets/user.png" alt="" width="32"><span class="pl-3 text-white">{{ player }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                       <button @click.prevent="startArena" class="btn btn-warning btn-block mt-5">Enter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import socket from '../config/socket'
export default {
    name: 'lobby',
    computed: {
        ...mapState(['lobby','username'])
    },
    mounted() {
        socket.on('setDataArena', data => {
              this.$store.commit('setDataArena', data)
        })
    },
    methods: {
        startArena(){
            socket.emit('joinArena', this.lobby)
            this.$router.push('/arena')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lobby {
  background-color: #ffeaa7;
  background-image: url('https://images.pexels.com/photos/1831119/pexels-photo-1831119.jpeg');
  background-size: cover;
  min-height: 800px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}
.list-group-item {
  background-color: rgba(0, 0, 0, 0.25);
}
.room-name {
    text-align: center;
    color: #fff;
    font-family: 'Roboto', sans-serif;
}
.btn {
  border-radius: unset;
}
.btn:hover {
  color: #fff;
}
.btn-username {
  background-color: #ff9c00;
  border-color: #ff9c00;
  color: #fff;
  font-weight: 500;
}
.bg-outside {
    background-color: rgba(251, 197, 49, .8);
    border-radius: 10px;
}
.bg-inside {
    background-color: rgba(225, 177, 44, .85);
}
.scrool {
    height: 300px;
    overflow: scroll;
}
</style>