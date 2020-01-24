<template>
    <div>
        <h1>{{lobby.name}}</h1>
        <p>{{lobby.players}}</p>
        <button class="btn btn-warning float-right" v-on:click.prevent="startArena">Enter</button>
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
.min-height {
    min-height: 500px;
}
#billboard .bb-name {
    color: #fff;
    font-size: 36px;
    text-align: center;
    font-weight: 400;
    min-height: 100px;
    max-height: 100px;
    background-image: url('https://images.pexels.com/photos/2505693/pexels-photo-2505693.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    line-height: 100px;
    border-radius: 8px;
}
.room-btn {
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: url('https://images.pexels.com/photos/2505693/pexels-photo-2505693.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 1rem;
    border-radius: 8px;
    min-height: 400px;
    max-height: 400px;
    width: 100%;
}
.room-title {
    border: 1px solid #fff;
    padding: 5px 25px;
    text-transform: uppercase;
    font-weight: 400;
}

.bg-lobby {
    background-image: url('https://images.pexels.com/photos/532563/pexels-photo-532563.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.list-room {
    color: #fff;
}
</style>