<template>
    <div class="lobby">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-5">
                    <h3>{{ lobby.name }}</h3>
                    <ul class="list-group list-group-flush">
                        <li v-for="(player, i) in lobby.players" :key="i" class="list-group-item">
                            {{ player }}
                        </li>
                    </ul>
                    <button @click.prevent="startArena" class="btn btn-warning btn-block mt-5">Enter</button>
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
</style>